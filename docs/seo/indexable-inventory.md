# Indexable inventory

Decision date: 2026-09-13  
Canonical origin: `https://hivevaultarc.com`  
Policy owner: Company leadership  
Implementation owner: Website engineering

| Route family | Index | Sitemap | Implementation |
|---|---:|---:|---|
| Core company, capability, industry, portfolio, insight-index, contact, and approved commercial pages | Yes | Yes | `ROUTE_MANIFEST.indexable` and `src/app/sitemap.ts` |
| Approved native-language dynamic articles, capability profiles, people profiles, case studies, news, perspectives, and research reports | Yes | Yes | Published locale records only; actual content dates are used when present |
| Missing or unapproved translations | No | No | Detail lookup returns not found; no fallback-only alternate is emitted |
| English source cards shown in a French collection while translation is pending | English source only | English source only | Card links to its source locale; no French detail URL is created |
| Privacy, cookie, and legal pages | Yes | Yes | Public compliance documents and useful navigational destinations |
| `/links` | No | No | Utility destination, excluded by `ROUTE_MANIFEST` |
| `/ai/company` | No Google result target | No | Machine-readable auxiliary endpoint; discoverable through direct documentation only |
| `robots.txt`, `sitemap.xml`, and optional `llms.txt` files | No | No | Protocol or auxiliary resources, not landing pages |
| Redirect sources and Vercel aliases | No | No | Permanent one-hop redirects to the canonical apex equivalent |
| Preview deployments | No | No | Must remain protected from public indexing by platform policy |

The inventory is intentionally based on page purpose and review state, not on maximizing URL count. A route is added to the sitemap only when it can return a direct `200`, declare itself canonical, and provide native or explicitly approved content for its locale.
