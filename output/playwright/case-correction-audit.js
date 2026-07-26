async (page) => {
  const premiumUrl =
    'http://localhost:3000/case-studies/premium-advice-training-keepzen-digital-academy';
  const immoWorldUrl =
    'http://localhost:3000/case-studies/top-tier-crm-transformation-program-real-estate-operations';
  const noMediaUrl =
    'http://localhost:3000/case-studies/multilingual-whatsapp-ai-agent';

  await page.setViewportSize({width: 1600, height: 1000});
  await page.goto(premiumUrl, {waitUntil: 'networkidle'});
  await page.screenshot({
    path: 'output/playwright/case-correction-premium-desktop.png',
    fullPage: true,
  });
  await page.locator('.case-study-story__opening').screenshot({
    path: 'output/playwright/case-correction-premium-opening.png',
  });
  await page
    .locator('.case-study-story__modules, .case-study-story__chapter--closing')
    .first()
    .screenshot({
      path: 'output/playwright/case-correction-premium-modules.png',
    });

  const premiumMetrics = await page.evaluate(() => {
    const opening = document.querySelector('.case-study-story__opening');
    const copy = document.querySelector('.case-study-story__narrative-stack');
    const media = document.querySelector('.case-study-story__media--primary');
    const brokenImages = Array.from(document.images)
      .filter((image) => image.complete && image.naturalWidth === 0)
      .map((image) => image.currentSrc || image.src);

    return {
      brokenImages,
      horizontalOverflow: document.documentElement.scrollWidth - window.innerWidth,
      openingDisplay: opening ? getComputedStyle(opening).display : null,
      openingColumns: opening ? getComputedStyle(opening).gridTemplateColumns : null,
      copyTop: copy?.getBoundingClientRect().top ?? null,
      mediaTop: media?.getBoundingClientRect().top ?? null,
      projectMediaCount: document.querySelectorAll('.case-study-project-media__figure').length,
      bodySidebarCount: document.querySelectorAll('.case-study-detail__sidebar').length,
    };
  });

  await page.goto(immoWorldUrl, {waitUntil: 'networkidle'});
  await page.locator('.case-study-story').screenshot({
    path: 'output/playwright/case-correction-immoworld-story.png',
  });
  const immoWorldMetrics = await page.evaluate(() => ({
    brokenImages: Array.from(document.images)
      .filter((image) => image.complete && image.naturalWidth === 0)
      .map((image) => image.currentSrc || image.src),
    horizontalOverflow: document.documentElement.scrollWidth - window.innerWidth,
    desktopMedia: document.querySelectorAll('[data-device="desktop"]').length,
    phoneMedia: document.querySelectorAll('[data-device="phone"]').length,
  }));

  await page.goto(noMediaUrl, {waitUntil: 'networkidle'});
  await page.locator('.case-study-story').screenshot({
    path: 'output/playwright/case-correction-no-media-story.png',
  });
  const noMediaMetrics = await page.evaluate(() => ({
    brokenImages: Array.from(document.images)
      .filter((image) => image.complete && image.naturalWidth === 0)
      .map((image) => image.currentSrc || image.src),
    horizontalOverflow: document.documentElement.scrollWidth - window.innerWidth,
    projectMediaCount: document.querySelectorAll('.case-study-project-media__figure').length,
    emptyMediaWrappers: document.querySelectorAll('.case-study-project-media:empty').length,
    openingColumns:
      getComputedStyle(document.querySelector('.case-study-story__opening')).gridTemplateColumns,
  }));

  await page.setViewportSize({width: 390, height: 844});
  await page.goto(premiumUrl, {waitUntil: 'networkidle'});
  await page.screenshot({
    path: 'output/playwright/case-correction-premium-mobile.png',
    fullPage: true,
  });
  const mobileMetrics = await page.evaluate(() => ({
    brokenImages: Array.from(document.images)
      .filter((image) => image.complete && image.naturalWidth === 0)
      .map((image) => image.currentSrc || image.src),
    horizontalOverflow: document.documentElement.scrollWidth - window.innerWidth,
    openingColumns:
      getComputedStyle(document.querySelector('.case-study-story__opening')).gridTemplateColumns,
    minimumActionHeight: document
      .querySelector('.case-study-lead-card__action')
      ?.getBoundingClientRect().height,
  }));

  return {premiumMetrics, immoWorldMetrics, noMediaMetrics, mobileMetrics};
}
