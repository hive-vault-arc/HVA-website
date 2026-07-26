async (page) => {
  const routes = [
    {
      locale: 'en',
      url: 'http://localhost:3000/case-studies/tarik-rami-immobilier',
      expectedTitle: 'Tarik Rami Immobilier: Centralized Project and Client Platform',
      screenshot: 'output/playwright/tarik-rami-case-study-en.png',
    },
    {
      locale: 'fr',
      url: 'http://localhost:3000/fr/etudes-de-cas/tarik-rami-immobilier',
      expectedTitle: 'Tarik Rami Immobilier : plateforme centralisée projets et clients',
      screenshot: 'output/playwright/tarik-rami-case-study-fr.png',
    },
  ];

  const results = [];
  await page.setViewportSize({width: 1600, height: 1000});

  for (const route of routes) {
    await page.goto(route.url, {waitUntil: 'networkidle'});
    await page.locator('.case-study-story').scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    await page.screenshot({path: route.screenshot, fullPage: true});

    results.push(
      await page.evaluate(
        ({locale, expectedTitle}) => {
          const heading = document.querySelector('h1');
          const images = Array.from(
            document.querySelectorAll('.case-study-detail img'),
          );
          const projectImages = Array.from(
            document.querySelectorAll('.case-study-project-media img'),
          );

          return {
            locale,
            heading: heading?.textContent?.trim(),
            headingMatches: heading?.textContent?.trim() === expectedTitle,
            htmlLanguage: document.documentElement.lang,
            projectImageCount: projectImages.length,
            projectImageWidths: projectImages.map((image) => image.naturalWidth),
            brokenImages: images
              .filter((image) => image.complete && image.naturalWidth === 0)
              .map((image) => image.currentSrc || image.src),
            webpImageCount: images.filter((image) =>
              (image.currentSrc || image.src).includes('.webp'),
            ).length,
            horizontalOverflow:
              document.documentElement.scrollWidth - window.innerWidth,
            hasDisclosure:
              document.body.textContent?.includes(
                locale === 'fr'
                  ? 'Les interfaces utilisent des données illustratives'
                  : 'The interfaces use illustrative data',
              ) ?? false,
          };
        },
        {locale: route.locale, expectedTitle: route.expectedTitle},
      ),
    );
  }

  await page.setViewportSize({width: 390, height: 844});
  await page.goto(routes[0].url, {waitUntil: 'networkidle'});
  await page.locator('.case-study-story').scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  await page.screenshot({
    path: 'output/playwright/tarik-rami-case-study-mobile.png',
    fullPage: true,
  });
  const mobile = await page.evaluate(() => ({
    horizontalOverflow: document.documentElement.scrollWidth - window.innerWidth,
    projectImageCount: document.querySelectorAll(
      '.case-study-project-media img',
    ).length,
    brokenImages: Array.from(document.querySelectorAll('.case-study-detail img'))
      .filter((image) => image.complete && image.naturalWidth === 0)
      .map((image) => image.currentSrc || image.src),
  }));

  return {routes: results, mobile};
}
