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
    await page.getByRole('button', {name: 'Current language: English'}).click();
    await page.getByRole('menuitem', {name: 'View this page in French'}).click();
    await expect(page).toHaveURL(/\/fr\/expertises\?source=e2e$/);
    await expect(page.locator('html')).toHaveAttribute('lang', 'fr');

    await page.getByRole('button', {name: 'Langue actuelle : Français'}).click();
    await page.getByRole('menuitem', {name: 'Afficher cette page en Anglais'}).click();
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

  test('published CMS translations expose complete reciprocal English and French routes', async ({
    page,
  }) => {
    await page.goto(ENGLISH_CASE_STUDY);
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(page.locator('link[hreflang="fr"]')).toHaveAttribute(
      'href',
      /\/fr\/etudes-de-cas\/top-tier-crm-transformation-program-real-estate-operations$/,
    );
    await page.getByRole('button', {name: 'Current language: English'}).click();
    await expect(
      page.getByRole('menuitem', {name: 'View this page in French'}),
    ).toHaveAttribute(
      'href',
      '/fr/etudes-de-cas/top-tier-crm-transformation-program-real-estate-operations',
    );

    await page.goto(
      '/fr/etudes-de-cas/top-tier-crm-transformation-program-real-estate-operations',
    );
    await expect(page.locator('html')).toHaveAttribute('lang', 'fr');
    await expect(page.getByRole('heading', {level: 1})).toContainText(
      /Système d’exploitation CRM ImmoWorld/i,
    );
    await expect(page.locator('link[hreflang="en"]')).toHaveAttribute(
      'href',
      /\/case-studies\/top-tier-crm-transformation-program-real-estate-operations$/,
    );
  });

  test('French CMS routes keep full homepage, publication, capability, and people content', async ({
    page,
  }) => {
    await page.goto('/fr');
    await expect(page.locator('.decision-proof')).toHaveCount(1);
    await expect(page.locator('.decision-proof-card')).toHaveCount(3);
    await expect(page.locator('.home-trusted-logo')).toHaveCount(3);
    await expect(
      page.locator('a[href^="/fr/blog/"], a[href^="/fr/etudes-de-cas/"]').first(),
    ).toBeAttached();

    await page.goto('/fr/publications');
    await expect(page.locator('.insights-empty-state')).toHaveCount(0);
    await expect(page.locator('.insights-slide-card')).toHaveCount(6);
    await expect(page.getByText(/Tout ce que nous avons publié/i)).toBeVisible();

    await page.goto('/fr/expertises');
    await expect(page.locator('a[href^="/fr/expertises/"]').filter({
      has: page.getByRole('heading', {level: 2}),
    })).toHaveCount(6);

    await page.goto('/fr/qui-sommes-nous');
    await expect(
      page.locator('a[href^="/fr/qui-sommes-nous/equipe/"]'),
    ).toHaveCount(3);
  });

  test('French detail routes render complete CMS bodies and localized related links', async ({
    page,
  }) => {
    await page.goto('/fr/expertises/ai-data-analytics');
    await expect(page.getByRole('heading', {level: 1})).toContainText(
      /IA, données et analytique/i,
    );
    await expect(page.getByText(/Conception et déploiement d’agents IA/i)).toBeVisible();
    await expect(
      page.locator(
        '.capability-profile-related-card[href="/fr/expertises/strategy-business"]',
      ),
    ).toBeAttached();
    await expect(page.locator('link[hreflang="en"]')).toHaveAttribute(
      'href',
      /\/capabilities\/ai-data-analytics$/,
    );

    await page.goto('/fr/qui-sommes-nous/equipe/khalid-chalhi');
    await expect(page.getByRole('heading', {level: 1})).toContainText(
      /Khalid Chalhi/i,
    );
    await expect(page.getByText(/Cofondateur et CEO/i).first()).toBeVisible();
    await expect(
      page.getByRole('link', {name: 'Retour à l’équipe'}),
    ).toHaveAttribute('href', '/fr/qui-sommes-nous#khalid-chalhi');
    await expect(page.locator('link[hreflang="en"]')).toHaveAttribute(
      'href',
      /\/aboutus\/our-people\/khalid-chalhi$/,
    );
  });

  test('French routes expose published localized CMS presentation', async ({
    page,
  }) => {
    const clientWarnings: string[] = [];
    page.on('console', (message) => {
      if (message.type() === 'error' || message.type() === 'warning') {
        const text = message.text();
        if (!text.includes('GL Driver Message')) {
          clientWarnings.push(text);
        }
      }
    });

    await page.goto('/fr/publications');
    const firstPublication = page.locator('.insights-slide-card a').first();
    await expect(firstPublication).toHaveAttribute(
      'href',
      /^\/fr\/(?:blog|etudes-de-cas|publications)\//,
    );

    await page.goto('/fr/expertises');
    const discoveryLink = page.locator('.capabilities-depth-cta-secondary');
    await expect(discoveryLink).toBeVisible();
    const textLineCount = await discoveryLink.evaluate((element) => {
      const textNode = Array.from(element.childNodes).find(
        (node) => node.nodeType === Node.TEXT_NODE && node.textContent?.trim(),
      );
      if (!textNode) return 0;
      const range = document.createRange();
      range.selectNode(textNode);
      return new Set(
        Array.from(range.getClientRects()).map((rect) => Math.round(rect.y)),
      ).size;
    });
    expect(textLineCount).toBe(1);
    expect(clientWarnings).toEqual([]);
  });

  test('every French publication collection keeps its full catalogue on French routes', async ({
    page,
  }) => {
    const collectionRoutes = [
      {path: '/fr/blog', href: /^\/fr\/blog\//},
      {path: '/fr/etudes-de-cas', href: /^\/fr\/etudes-de-cas\//},
      {path: '/fr/publications/actualites', href: /^\/fr\/publications\/actualites\//},
      {path: '/fr/publications/perspectives', href: /^\/fr\/publications\/perspectives\//},
      {
        path: '/fr/publications/rapports-de-recherche',
        href: /^\/fr\/publications\/rapports-de-recherche\//,
      },
    ];

    for (const collection of collectionRoutes) {
      await page.goto(collection.path);
      await expect(page.locator('.insight-index-empty')).toHaveCount(0);
      await expect(
        page.locator('a[href]').filter({has: page.locator('h2')}).first(),
      ).toHaveAttribute('href', collection.href);
    }
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
