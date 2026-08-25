import {expect, test} from '@playwright/test';

const ENGLISH_CASE_STUDY =
  '/case-studies/top-tier-crm-transformation-program-real-estate-operations';

test.describe('localized public routes', () => {
  test.beforeEach(({page}, testInfo) => {
    void page;
    test.skip(testInfo.project.name !== 'desktop-chromium');
  });

  test('serves reciprocal English, French, Spanish, and Arabic static pages', async ({page}) => {
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
    await expect(page.locator('link[hreflang="es"]')).toHaveAttribute(
      'href',
      /\/es\/capacidades$/,
    );
    await expect(page.locator('link[hreflang="ar"]')).toBeAttached();

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

  test('Spanish and Arabic static routes use their own locale contract', async ({page}) => {
    await page.goto('/es/capacidades');
    await expect(page.locator('html')).toHaveAttribute('lang', 'es');
    await expect(page.getByRole('heading', {level: 1})).toContainText(/seis pilares/i);

    await page.goto('/ar/القدرات');
    await expect(page.locator('html')).toHaveAttribute('lang', 'ar');
    await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
    await expect(page.getByRole('heading', {level: 1})).toContainText(/ستة ركائز/);
  });

  test('language switcher preserves the exact route and query parameters', async ({page}) => {
    await page.goto('/capabilities?source=e2e');
    await page.getByRole('button', {name: 'Current language: English'}).click();
    await page.getByRole('menuitem', {name: 'View this page in Français'}).click();
    await expect(page).toHaveURL(/\/fr\/expertises\?source=e2e$/);
    await expect(page.locator('html')).toHaveAttribute('lang', 'fr');

    await page.getByRole('button', {name: 'Langue actuelle : Français'}).click();
    await page.getByRole('menuitem', {name: 'Afficher cette page en English'}).click();
    await expect(page).toHaveURL(/\/capabilities\?source=e2e$/);
  });

  test('language control stays legible on ARC and light-page navigation surfaces', async ({
    browser,
    page,
  }) => {
    for (const pathname of ['/es/arc', '/es']) {
      await page.goto(pathname);
      const control = page.getByRole('button', {
        name: 'Idioma actual: Español',
      });

      await expect(control).toBeVisible();
      await expect(control).toHaveText('Español');
      await expect(control).toHaveCSS('background-color', 'rgb(255, 255, 255)');
      const primaryAction = page
        .locator('[data-navbar-actions]')
        .getByRole('link', {name: 'Reservar una llamada'});
      await expect(primaryAction).toBeVisible();

      await control.hover();
      await expect(control).toHaveCSS('background-color', 'rgb(248, 233, 200)');
      await expect(control).toHaveCSS('color', 'rgb(26, 37, 53)');

      await primaryAction.hover();
      await expect(primaryAction).toHaveCSS('background-color', 'rgb(13, 24, 36)');
      await expect(primaryAction).toHaveCSS('color', 'rgb(255, 255, 255)');
    }

    const noScriptContext = await browser.newContext({
      baseURL: 'http://localhost:3101',
      javaScriptEnabled: false,
      viewport: {width: 1440, height: 1000},
    });
    const noScriptPage = await noScriptContext.newPage();

    try {
      for (const pathname of ['/es/arc', '/es']) {
        await noScriptPage.goto(pathname);
        const fallback = noScriptPage.locator(
          '[data-locale-switcher-fallback="desktop"]',
        );

        await expect(fallback).toHaveText('Español');
        await expect(fallback).toHaveCSS('background-color', 'rgb(255, 255, 255)');
        await expect(
          noScriptPage.locator('[data-navbar-actions]').getByRole('link', {
            name: 'Reservar una llamada',
          }),
        ).toBeVisible();
      }
    } finally {
      await noScriptContext.close();
    }
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

  test('launched Spanish and Arabic home routes return indexable documents', async ({request}) => {
    for (const pathname of ['/ar', '/es']) {
      const response = await request.get(pathname, {maxRedirects: 0});
      expect(response.status()).toBe(200);
      const document = await response.text();
      expect(document).toContain('hrefLang="ar"');
      expect(document).toContain('hrefLang="es"');
    }
  });

  test('Spanish and Arabic homes retain the complete localized Client Evidence board', async ({
    page,
  }) => {
    const locales = [
      {
        path: '/es',
        sourceDisclosure: /Fuente original: francés/i,
        caseStudyPath: '/es/casos-de-estudio/',
      },
      {
        path: '/ar',
        sourceDisclosure: /المصدر الأصلي: الفرنسية/i,
        caseStudyPath: '/ar/دراسات-الحالة/',
      },
    ] as const;

    for (const locale of locales) {
      await page.goto(locale.path);
      const proof = page.locator('.decision-proof');
      await proof.scrollIntoViewIfNeeded();
      await expect(proof.locator('.decision-proof-card')).toHaveCount(3);
      await expect(proof.locator('.decision-proof-card--featured')).toHaveCount(1);
      for (let index = 0; index < 3; index += 1) {
        await expect(proof.locator('.decision-proof-card').nth(index)).toHaveCSS(
          'opacity',
          '1',
        );
      }
      await expect(proof.getByText(locale.sourceDisclosure)).toBeVisible();
      await expect(
        proof.locator('.decision-proof-card--featured a').first(),
      ).toHaveAttribute('href', new RegExp(`^${locale.caseStudyPath}`));
    }
  });

  test('trusted client logos reveal their supplied colour on hover in every locale', async ({
    page,
  }) => {
    await page.emulateMedia({reducedMotion: 'no-preference'});
    let referenceLogoSizes: Record<string, {width: number; height: number}> | undefined;

    for (const pathname of ['/', '/es', '/ar']) {
      await page.goto(pathname);
      const logos = page.locator('.home-trusted-logo');
      const logoCount = await logos.count();
      expect(logoCount).toBeGreaterThan(0);
      await logos.first().scrollIntoViewIfNeeded();
      await page.mouse.move(0, 0);
      const partnerIds = await logos.evaluateAll((nodes) =>
        nodes.map((node) => node.getAttribute('data-partner')),
      );
      expect(new Set(partnerIds).size).toBe(logoCount);
      expect(partnerIds.sort()).toEqual([
        'immoworld',
        'premium-advice-training',
        'tarik-rami-immobilier',
      ]);
      const logoSizes = await logos.evaluateAll((nodes) =>
        Object.fromEntries(
          nodes.map((node) => {
            const media = node.querySelector('.home-trusted-logo__media');
            const rect = media?.getBoundingClientRect();

            return [node.getAttribute('data-partner') ?? '', {
              width: rect?.width ?? 0,
              height: rect?.height ?? 0,
            }];
          }),
        ),
      );

      if (referenceLogoSizes) {
        expect(logoSizes).toEqual(referenceLogoSizes);
      } else {
        referenceLogoSizes = logoSizes;
      }

      for (let index = 0; index < logoCount; index += 1) {
        const layers = logos.nth(index).locator('.home-trusted-logo__layer');
        await expect(layers).toHaveCount(2);
        await expect(layers.locator('img')).toHaveCount(2);
      }

      const logo = logos.first();
      const monochrome = logo.locator('.home-trusted-logo__layer--monochrome');
      const color = logo.locator('.home-trusted-logo__layer--color');
      await expect(monochrome.locator('img')).toHaveCSS('filter', /grayscale/);
      await expect(monochrome).toHaveCSS('opacity', '1');
      await expect(color).toHaveCSS('opacity', '0');

      await logo.hover();
      await page.waitForTimeout(900);
      await expect(monochrome).toHaveCSS('opacity', '0');
      await expect(color).toHaveCSS('opacity', '1');
    }
  });

  test('published CMS case studies expose complete reciprocal locale routes', async ({
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
      page.getByRole('menuitem', {name: 'View this page in Français'}),
    ).toHaveAttribute(
      'href',
      '/fr/etudes-de-cas/top-tier-crm-transformation-program-real-estate-operations',
    );
    await expect(
      page.getByRole('menuitem', {name: 'View this page in Español'}),
    ).toHaveAttribute(
      'href',
      '/es/casos-de-estudio/operaciones-inmobiliarias-del-programa-de-transformacion-crm-de-primer-nivel',
    );
    await expect(
      page.getByRole('menuitem', {name: 'View this page in العربية'}),
    ).toHaveAttribute('href', /\/ar\/دراسات-الحالة\//);

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

    await page.goto(
      '/es/casos-de-estudio/operaciones-inmobiliarias-del-programa-de-transformacion-crm-de-primer-nivel',
    );
    await expect(page.locator('html')).toHaveAttribute('lang', 'es');
    await expect(page.getByRole('heading', {level: 1})).toContainText(
      /Sistema operativo ImmoWorld CRM/i,
    );

    await page.goto(
      '/ar/دراسات-الحالة/برنامج-تحويل-ا-دارة-علاقات-العملاء-من-الدرجة-الا-ولى-للعمليات-العقارية',
    );
    await expect(page.locator('html')).toHaveAttribute('lang', 'ar');
    await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
    await expect(page.getByRole('heading', {level: 1})).toContainText(
      /نظام التشغيل ImmoWorld CRM/i,
    );
  });

  test('Spanish and Arabic insight detail routes render their approved CMS content', async ({
    page,
  }) => {
    const detailRoutes = [
      {
        locale: 'es',
        path: '/es/blog/por-que-las-empresas-deben-integrar-agentes-de-ia-2025',
        heading: /Por qué todas las empresas deben empezar a integrar agentes de IA ahora/i,
      },
      {
        locale: 'ar',
        path: '/ar/المدونة/لماذا-يجب-على-الشركات-دمج-وكلاء-الذكاء-الاصطناعي-2025',
        heading: /لماذا يجب على كل شركة أن تبدأ في دمج وكلاء الذكاء الاصطناعي الآن/i,
      },
      {
        locale: 'es',
        path: '/es/publicaciones/noticias/agentes-privados-nvidia-rtx-spark-local-ai-superchip',
        heading: /NVIDIA RTX Spark: el superchip de IA local/i,
      },
      {
        locale: 'ar',
        path: '/ar/الرؤى/الأخبار/nvidia-rtx-spark-local-ai-superchip-private-agents',
        heading: /NVIDIA RTX Spark: شريحة الذكاء الاصطناعي المحلية الفائقة/i,
      },
      {
        locale: 'es',
        path: '/es/publicaciones/perspectivas/arreglar-el-flujo-de-trabajo-antes-ai',
        heading: /Corrija el flujo de trabajo antes de agregar IA/i,
      },
      {
        locale: 'ar',
        path: '/ar/الرؤى/وجهات-نظر/ا-صلاح-سير-العمل-قبل-منظمة-العفو-الدولية',
        heading: /أصلح سير العمل قبل إضافة الذكاء الاصطناعي/i,
      },
      {
        locale: 'es',
        path: '/es/publicaciones/informes-de-investigacion/indice-de-preparacion-de-confiabilidad-de-la-nube-2026',
        heading: /Índice de preparación de confiabilidad de la nube 2026/i,
      },
      {
        locale: 'ar',
        path: '/ar/الرؤى/تقارير-بحثية/مو-شر-الجاهزية-السحابية-2026',
        heading: /مؤشر جاهزية موثوقية السحابة 2026/i,
      },
    ] as const;

    for (const detail of detailRoutes) {
      await page.goto(detail.path);
      await expect(page.locator('html')).toHaveAttribute('lang', detail.locale);
      await expect(page.getByRole('heading', {level: 1})).toContainText(
        detail.heading,
      );
      await expect(page.locator('h1')).not.toContainText(
        /This page is no longer|لم تعد هذه الصفحة متاحة/,
      );
    }
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
    await expect(page.locator('article')).toHaveCount(10);
    await expect(page.getByRole('heading', {level: 1})).toContainText(/Hive Vault Arc/i);

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
        'a[href="/fr/expertises/strategy-business"]',
      ).first(),
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
    const firstPublication = page.locator('article a[href]').first();
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
    expect(xml).toMatch(/<loc>[^<]*\/es(?:\/|<)/);
    expect(xml).toMatch(/<loc>[^<]*\/ar(?:\/|<)/);
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
  test('Spanish and Arabic capability pages keep their locale direction without overflow', async ({
    page,
  }, testInfo) => {
    test.skip(testInfo.project.name !== 'mobile-chromium');

    for (const [path, locale, direction] of [
      ['/es/capacidades', 'es', 'ltr'],
      ['/ar/القدرات', 'ar', 'rtl'],
    ] as const) {
      for (const width of [390, 820]) {
        await page.setViewportSize({width, height: width === 390 ? 844 : 1180});
        await page.goto(path);
        await expect(page.locator('html')).toHaveAttribute('lang', locale);
        await expect(page.locator('html')).toHaveAttribute('dir', direction);
        expect(
          await page.evaluate(
            () => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1,
          ),
          `${path} at ${width}px`,
        ).toBe(true);
      }
    }
  });

  test('mobile navigation is keyboard-safe and localized without horizontal overflow', async ({
    page,
  }, testInfo) => {
    test.skip(testInfo.project.name !== 'mobile-chromium');

    await page.emulateMedia({reducedMotion: 'reduce'});

    for (const [path, navigationLabel, capabilitiesLabel] of [
      ['/', /mobile navigation/i, 'Capabilities'],
      ['/fr', /navigation mobile/i, 'Expertises'],
    ] as const) {
      for (const width of [390, 820]) {
        await page.setViewportSize({width, height: width === 390 ? 844 : 1180});
        await page.goto(path);

        const trigger = page.getByRole('button', {
          name: /open navigation menu|ouvrir le menu de navigation/i,
        });
        await trigger.click();

        const panel = page.getByRole('dialog', {name: navigationLabel});
        await expect(panel).toBeVisible();
        await expect(panel).toHaveCSS('animation-name', 'none');
        await expect(panel.getByRole('button', {
          name: /close navigation menu|fermer le menu de navigation/i,
        })).toBeFocused();
        await expect(
          panel.getByRole('link', {name: capabilitiesLabel, exact: true}),
        ).toBeVisible();

        const capabilitiesToggle = panel.locator(
          'button[aria-controls="mobile-navigation-capabilities"]',
        );
        await capabilitiesToggle.click();
        await expect(capabilitiesToggle).toHaveAttribute('aria-expanded', 'true');
        await expect(panel.locator('[data-locale-switcher="mobile"] a')).toHaveCount(4);
        await expect(panel.getByRole('link', {name: /book a call|réserver un appel/i})).toHaveAttribute(
          'href',
          /\/contact$/,
        );

        const overflows = await page.evaluate(
          () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
        );
        expect(overflows, `${path} at ${width}px`).toBe(false);

        await page.keyboard.press('Escape');
        await expect(panel).toBeHidden();
        await expect(trigger).toBeFocused();
      }
    }
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
