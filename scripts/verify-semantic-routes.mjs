import {mkdir, writeFile} from 'node:fs/promises';
import path from 'node:path';
import {chromium} from '@playwright/test';

const baseURL = process.env.HVA_QA_BASE_URL ?? 'http://localhost:3102';
const outputDir = path.join(process.cwd(), 'test-results', 'semantic-media');
const viewports = [
  {width: 390, height: 844},
  {width: 820, height: 1180},
  {width: 1440, height: 1000},
  {width: 1920, height: 1080},
];
const routes = [
  {name: 'home', en: '/', fr: '/fr'},
  {name: 'arc', en: '/arc', fr: '/fr/arc'},
  {name: 'about', en: '/aboutus', fr: '/fr/qui-sommes-nous'},
  {name: 'capabilities', en: '/capabilities', fr: '/fr/expertises'},
  {
    name: 'capabilities-detail',
    en: '/capabilities/in-detail',
    fr: '/fr/expertises/en-detail',
  },
  {
    name: 'solution-programs',
    en: '/capabilities/solution-programs',
    fr: '/fr/expertises/programmes-solutions',
  },
  {name: 'industries', en: '/industries', fr: '/fr/secteurs'},
];

await mkdir(outputDir, {recursive: true});
const browser = await chromium.launch({headless: true});
const results = [];

for (const locale of ['en', 'fr']) {
  for (const route of routes) {
    for (const viewport of viewports) {
      const page = await browser.newPage({viewport});
      const consoleErrors = [];
      page.on('console', (message) => {
        if (message.type() === 'error') consoleErrors.push(message.text());
      });
      page.on('pageerror', (error) => consoleErrors.push(error.message));

      const routePath = route[locale];
      const response = await page.goto(`${baseURL}${routePath}`, {
        waitUntil: 'networkidle',
        timeout: 30_000,
      });

      await page.evaluate(async () => {
        const step = Math.max(window.innerHeight * 0.8, 400);
        for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
          window.scrollTo(0, y);
          await new Promise((resolve) => setTimeout(resolve, 90));
        }
        const semanticFrames = [...document.querySelectorAll('[data-alt-key]')];
        for (const frame of semanticFrames) {
          frame.scrollIntoView({block: 'center'});
          await new Promise((resolve) => setTimeout(resolve, 100));
          const image = frame.querySelector('img');
          if (image?.decode) {
            await Promise.race([
              image.decode().catch(() => undefined),
              new Promise((resolve) => setTimeout(resolve, 2_000)),
            ]);
          }
        }
        window.scrollTo(0, 0);
        await document.fonts.ready;
      });

      const audit = await page.evaluate(() => {
        const semanticImages = [...document.querySelectorAll('[data-alt-key] img')].map(
          (image) => ({
            key: image.closest('[data-alt-key]')?.getAttribute('data-alt-key'),
            src: image.currentSrc || image.getAttribute('src'),
            naturalWidth: image.naturalWidth,
            naturalHeight: image.naturalHeight,
            alt: image.getAttribute('alt'),
          }),
        );
        return {
          documentWidth: document.documentElement.scrollWidth,
          viewportWidth: window.innerWidth,
          overflow: document.documentElement.scrollWidth > window.innerWidth + 1,
          semanticImages,
          failedSemanticImages: semanticImages.filter(
            (image) => image.naturalWidth === 0 || image.naturalHeight === 0,
          ),
        };
      });

      const filename = `${locale}-${route.name}-${viewport.width}x${viewport.height}.png`;
      await page.screenshot({
        path: path.join(outputDir, filename),
        fullPage: true,
      });

      results.push({
        locale,
        route: routePath,
        viewport,
        status: response?.status() ?? 0,
        consoleErrors,
        ...audit,
      });
      await page.close();
      process.stdout.write(`Verified ${locale} ${route.name} ${viewport.width}x${viewport.height}\n`);
    }
  }
}

await browser.close();
await writeFile(
  path.join(outputDir, 'report.json'),
  `${JSON.stringify(results, null, 2)}\n`,
  'utf8',
);

const failures = results.filter(
  (result) =>
    result.status >= 400 ||
    result.overflow ||
    result.failedSemanticImages.length > 0 ||
    result.consoleErrors.length > 0,
);

if (failures.length > 0) {
  console.error(JSON.stringify(failures, null, 2));
  process.exitCode = 1;
} else {
  console.log(`Semantic route verification passed (${results.length} route/viewport combinations).`);
}
