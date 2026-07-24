import {expect, test} from '@playwright/test';

const ENGLISH_CASE_STUDY =
  '/case-studies/top-tier-crm-transformation-program-real-estate-operations';

test.describe('localized public routes', () => {
  test.beforeEach(({page}, testInfo) => {
    void page;
    test.skip(testInfo.project.name !== 'desktop-chromium');
  });

  test('serves reciprocal English and French static pages', async ({page}) => {
    await page.goto('/capabilities');
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(page).toHaveURL(/\/capabilities$/);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      /\/capabilities$/,
    );
    await expect(page.locator('link[hreflang="fr"]')).toHaveAttribute(
      'href',
      /\/fr\/expertises$/,
    );

    await page.goto('/fr/expertises');
    await expect(page.locator('html')).toHaveAttribute('lang', 'fr');
    await expect(page.getByRole('heading', {level: 1})).toContainText(
      /six piliers/i,
    );
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      /\/fr\/expertises$/,
    );
    await expect(page.locator('link[hreflang="en"]')).toHaveAttribute(
      'href',
      /\/capabilities$/,
    );
  });

  test('language switcher preserves the exact route and query parameters', async ({page}) => {
    await page.goto('/capabilities?source=e2e');
    await page.locator('a[hreflang="fr"]').first().click();
    await expect(page).toHaveURL(/\/fr\/expertises\?source=e2e$/);
    await expect(page.locator('html')).toHaveAttribute('lang', 'fr');

    await page.locator('a[hreflang="en"]').first().click();
    await expect(page).toHaveURL(/\/capabilities\?source=e2e$/);
  });

  test('French internal links use the localized route map', async ({page}) => {
    await page.goto('/fr');
    const internalHrefs = await page
      .locator('a[href^="/fr"]')
      .evaluateAll((links) => links.map((link) => link.getAttribute('href') ?? ''));

    expect(internalHrefs).not.toContain('/fr/capabilities');
    expect(internalHrefs).not.toContain('/fr/industries');
    expect(internalHrefs).not.toContain('/fr/aboutus');
    expect(internalHrefs).not.toContain('/fr/insights');
    expect(internalHrefs.some((href) => href.startsWith('/fr/expertises'))).toBe(
      true,
    );
    expect(internalHrefs.some((href) => href.startsWith('/fr/secteurs'))).toBe(
      true,
    );
  });

  test('legacy locale URLs redirect to launched canonical routes', async ({page}) => {
    await page.goto('/en/capabilities');
    await expect(page).toHaveURL(/\/capabilities$/);

    await page.goto('/fr/capabilities');
    await expect(page).toHaveURL(/\/fr\/expertises$/);

    await page.goto('/fr/capabilities/technology-consulting');
    await expect(page).toHaveURL(/\/fr\/expertises\/technology-consulting$/);

    await page.goto('/services-digitaux-tanger');
    await expect(page).toHaveURL(/\/fr\/services-digitaux-tanger$/);
  });

  test('paused locales return controlled 404 responses', async ({request}) => {
    for (const pathname of ['/ar', '/es']) {
      const response = await request.get(pathname, {maxRedirects: 0});
      expect(response.status()).toBe(404);
      expect(await response.text()).not.toContain('hreflang="ar"');
      expect(await response.text()).not.toContain('hreflang="es"');
    }
  });

  test('unapproved CMS translations are unavailable rather than falling back', async ({page}) => {
    await page.goto(ENGLISH_CASE_STUDY);
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(page.locator('[aria-disabled="true"]')).toContainText('fr');
    await expect(page.locator('link[hreflang="fr"]')).toHaveCount(0);

    await page.goto(
      '/fr/etudes-de-cas/top-tier-crm-transformation-program-real-estate-operations',
    );
    await expect(page.locator('html')).toHaveAttribute('lang', 'fr');
    expect(
      await page.locator('meta[name="robots"][content*="noindex"]').count(),
    ).toBeGreaterThan(0);
    await expect(
      page.locator('meta[name="robots"][content^="index"]'),
    ).toHaveCount(0);
    await expect(page.getByRole('heading', {level: 1})).toContainText(
      /plus disponible à cette adresse/i,
    );
    await expect(page.getByText(/ImmoWorld CRM Operating System/i)).toHaveCount(
      0,
    );
  });

  test('French contact and legal routes remain fully localized', async ({page}) => {
    await page.goto('/fr/contact');
    await expect(page.locator('html')).toHaveAttribute('lang', 'fr');
    await expect(page.getByRole('heading', {level: 1})).not.toContainText(
      /start|contact us/i,
    );

    await page.goto('/fr/politique-de-confidentialite');
    await expect(page.locator('html')).toHaveAttribute('lang', 'fr');
    await expect(page.getByRole('heading', {level: 1})).toContainText(
      /confidentialité/i,
    );
  });

  test('sitemap contains only launched canonical URLs that resolve directly', async ({
    request,
  }) => {
    const sitemapResponse = await request.get('/sitemap.xml');
    expect(sitemapResponse.status()).toBe(200);
    const xml = await sitemapResponse.text();

    expect(xml).not.toMatch(/<loc>[^<]*\/en(?:\/|<)/);
    expect(xml).not.toMatch(/<loc>[^<]*\/(?:ar|es)(?:\/|<)/);
    expect(xml).not.toContain('/fr/capabilities');

    const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
      (match) => match[1],
    );
    expect(urls.length).toBeGreaterThan(20);
    expect(
      urls.some((url) => new URL(url).pathname === '/services-digitaux-tanger'),
    ).toBe(false);

    for (const url of urls) {
      const parsed = new URL(url);
      const response = await request.get(`${parsed.pathname}${parsed.search}`, {
        maxRedirects: 0,
      });
      expect(response.status(), url).toBe(200);
    }
  });
});

test.describe('responsive navigation', () => {
  test('mobile navigation exposes localized routes without horizontal overflow', async ({
    page,
  }, testInfo) => {
    test.skip(testInfo.project.name !== 'mobile-chromium');

    await page.goto('/fr');
    await page.getByRole('button', {name: /ouvrir le menu de navigation/i}).click();
    const mobileNavigation = page.getByRole('navigation', {
      name: /navigation mobile/i,
    });
    await expect(mobileNavigation).toBeVisible();
    await expect(
      mobileNavigation.getByRole('link', {name: 'Expertises', exact: true}),
    ).toBeVisible();

    const overflows = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
    );
    expect(overflows).toBe(false);
  });

  test('representative French page does not overflow at target breakpoints or 200% zoom', async ({
    page,
  }, testInfo) => {
    test.skip(testInfo.project.name !== 'mobile-chromium');

    for (const width of [320, 390, 768, 1440]) {
      await page.setViewportSize({width, height: 900});
      await page.goto('/fr/expertises');
      const overflows = await page.evaluate(
        () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
      );
      expect(overflows, `${width}px viewport`).toBe(false);
    }

    await page.setViewportSize({width: 1280, height: 900});
    await page.goto('/fr/expertises');
    await page.evaluate(() => {
      document.documentElement.style.zoom = '2';
    });
    const zoomOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
    );
    expect(zoomOverflow, '200% zoom').toBe(false);
  });
});
