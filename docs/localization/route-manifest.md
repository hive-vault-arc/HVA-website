# Localized route manifest

The route key and internal pathname are canonical implementation identifiers. English and French
public pathnames are generated through `src/i18n/routing.ts`.

| Route key | English | French | Content owner |
|---|---|---|---|
| home | `/` | `/fr` | Git + CMS rails |
| arc | `/arc` | `/fr/arc` | Git |
| capabilities | `/capabilities` | `/fr/expertises` | Git + Sanity |
| capabilitiesDetail | `/capabilities/in-detail` | `/fr/expertises/en-detail` | Git |
| capabilitiesPrograms | `/capabilities/solution-programs` | `/fr/expertises/programmes-solutions` | Git |
| capability | `/capabilities/[slug]` | `/fr/expertises/[french-slug]` | Sanity |
| industries | `/industries` | `/fr/secteurs` | Git |
| about | `/aboutus` | `/fr/qui-sommes-nous` | Git + Sanity |
| employee | `/aboutus/our-people/[employee]` | `/fr/qui-sommes-nous/equipe/[french-slug]` | Sanity |
| portfolio | `/whoarewe/portfolio` | `/fr/qui-sommes-nous/portfolio` | Git |
| insights | `/insights` | `/fr/publications` | Git + Sanity |
| blog | `/blog` | `/fr/blog` | Sanity |
| blogDetail | `/blog/[slug]` | `/fr/blog/[french-slug]` | Sanity |
| caseStudies | `/case-studies` | `/fr/etudes-de-cas` | Sanity |
| caseStudy | `/case-studies/[slug]` | `/fr/etudes-de-cas/[french-slug]` | Sanity |
| news | `/insights/news-articles` | `/fr/publications/actualites` | Sanity |
| newsDetail | `/insights/news-articles/[slug]` | `/fr/publications/actualites/[french-slug]` | Sanity |
| perspectives | `/insights/perspectives` | `/fr/publications/perspectives` | Sanity |
| perspectiveDetail | `/insights/perspectives/[slug]` | `/fr/publications/perspectives/[french-slug]` | Sanity |
| research | `/insights/research-reports` | `/fr/publications/rapports-de-recherche` | Sanity |
| researchDetail | `/insights/research-reports/[slug]` | `/fr/publications/rapports-de-recherche/[french-slug]` | Sanity |
| contact | `/contact` | `/fr/contact` | Git |
| privacy | `/privacy-policy` | `/fr/politique-de-confidentialite` | Git / legal review |
| legal | `/mentions-legales` | `/fr/mentions-legales` | Git / legal review |
| links | `/links` | `/fr/liens` | Git |
| aiAgentsTangier | `/ai-agents-tangier` | `/fr/agents-ia-tanger` | Git |
| aiAgentsMorocco | `/ai-agents-morocco` | `/fr/agents-ia-maroc` | Git |
| itConsultingTangier | `/it-consulting-tangier` | `/fr/conseil-informatique-tanger` | Git |
| customSoftwareMorocco | `/custom-software-morocco` | `/fr/logiciels-sur-mesure-maroc` | Git |
| digitalServicesTangier | `/digital-services-tangier` | `/fr/services-digitaux-tanger` | Git |

## Redirect policy

- `/en` → `/`
- `/en/:path*` → `/:path*`
- `/services-digitaux-tanger` → `/fr/services-digitaux-tanger`
- Legacy `/fr/capabilities/**` → `/fr/expertises/**`
- Legacy service aliases preserve locale when a French equivalent exists.
- `/ar/**` and `/es/**` return a controlled 404.
