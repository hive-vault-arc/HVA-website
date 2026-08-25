# Spanish and Arabic route manifest

Status: approved planning vocabulary. The internal pathname remains the code-level identifier; public paths are generated from `src/i18n/routing.ts` after the locale is launched.

English remains unprefixed. French remains unchanged. Spanish and Arabic receive the prefixes `/es` and `/ar` respectively. Dynamic `[slug]` and `[employee]` values come only from approved translated Sanity documents.

| Internal pathname | Spanish public pathname | Arabic public pathname |
| --- | --- | --- |
| `/` | `/es` | `/ar` |
| `/arc` | `/es/arc` | `/ar/arc` |
| `/capabilities` | `/es/capacidades` | `/ar/القدرات` |
| `/capabilities/in-detail` | `/es/capacidades/en-detalle` | `/ar/القدرات/بالتفصيل` |
| `/capabilities/solution-programs` | `/es/capacidades/programas-de-soluciones` | `/ar/القدرات/برامج-الحلول` |
| `/capabilities/[slug]` | `/es/capacidades/[slug]` | `/ar/القدرات/[slug]` |
| `/industries` | `/es/sectores` | `/ar/القطاعات` |
| `/aboutus` | `/es/quienes-somos` | `/ar/من-نحن` |
| `/aboutus/our-people/[employee]` | `/es/quienes-somos/equipo/[employee]` | `/ar/من-نحن/الفريق/[employee]` |
| `/whoarewe/portfolio` | `/es/quienes-somos/portfolio` | `/ar/من-نحن/أعمالنا` |
| `/insights` | `/es/publicaciones` | `/ar/الرؤى` |
| `/blog` | `/es/blog` | `/ar/المدونة` |
| `/blog/[slug]` | `/es/blog/[slug]` | `/ar/المدونة/[slug]` |
| `/case-studies` | `/es/casos-de-estudio` | `/ar/دراسات-الحالة` |
| `/case-studies/[slug]` | `/es/casos-de-estudio/[slug]` | `/ar/دراسات-الحالة/[slug]` |
| `/insights/news-articles` | `/es/publicaciones/noticias` | `/ar/الرؤى/الأخبار` |
| `/insights/news-articles/[slug]` | `/es/publicaciones/noticias/[slug]` | `/ar/الرؤى/الأخبار/[slug]` |
| `/insights/perspectives` | `/es/publicaciones/perspectivas` | `/ar/الرؤى/وجهات-نظر` |
| `/insights/perspectives/[slug]` | `/es/publicaciones/perspectivas/[slug]` | `/ar/الرؤى/وجهات-نظر/[slug]` |
| `/insights/research-reports` | `/es/publicaciones/informes-de-investigacion` | `/ar/الرؤى/تقارير-بحثية` |
| `/insights/research-reports/[slug]` | `/es/publicaciones/informes-de-investigacion/[slug]` | `/ar/الرؤى/تقارير-بحثية/[slug]` |
| `/contact` | `/es/contacto` | `/ar/تواصل-معنا` |
| `/privacy-policy` | `/es/politica-de-privacidad` | `/ar/سياسة-الخصوصية` |
| `/mentions-legales` | `/es/avisos-legales` | `/ar/إشعارات-قانونية` |
| `/links` | `/es/enlaces` | `/ar/روابط` |
| `/ai-agents-tangier` | `/es/agentes-ia-tanger` | `/ar/وكلاء-الذكاء-الاصطناعي-طنجة` |
| `/ai-agents-morocco` | `/es/agentes-ia-marruecos` | `/ar/وكلاء-الذكاء-الاصطناعي-المغرب` |
| `/it-consulting-tangier` | `/es/consultoria-informatica-tanger` | `/ar/استشارات-تقنية-طنجة` |
| `/custom-software-morocco` | `/es/software-a-medida-marruecos` | `/ar/برمجيات-مخصصة-المغرب` |
| `/digital-services-tangier` | `/es/servicios-digitales-tanger` | `/ar/خدمات-رقمية-طنجة` |

## Dynamic slugs

- Spanish slugs use reviewed Spain-oriented SEO phrases.
- Arabic slugs use reviewed Arabic-script phrases without diacritics. They are stored in the Arabic Sanity document and are never derived from English or French slugs.
- Slugs remain unique per document type and language. Route switching uses the approved target slug from `translation.metadata`.
- URLs, code, assets, external links, and source-language evidence retain their original identifiers.

## Redirect and indexing policy

- `/en` and `/en/:path*` continue redirecting to unprefixed English.
- Existing French redirects remain unchanged.
- There are no speculative redirects from English/French paths to Spanish/Arabic equivalents.
- Until a complete locale is launched, `/es/**` and `/ar/**` remain controlled 404 routes and do not appear in sitemaps, canonicals, alternates, or the language switcher.
- Once launched, every mapped static route has a self-canonical and reciprocal alternates; dynamic alternates exist only for approved translated records.
