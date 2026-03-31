# French Translation Sprints — H.V.A Website

All sprint files for the French (`fr`) locale. Read `translation-guide.md` in the project root before starting.

---

## Sprint order

Run FR-00 and FR-16 first. All other sprints are independent of each other after that.

| Sprint | Page / Scope | View file | Lines | Priority |
|---|---|---|---|---|
| [FR-00](./FR-00-setup.md) | Infrastructure setup | `next.config.ts`, middleware, routing | — | **Do first** |
| [FR-16](./FR-16-shared-components.md) | Navbar, Footer, BottomCTA, FAQ, Carousel | Shared components | — | **Do second** |
| [FR-01](./FR-01-home.md) | Home | `views/Home.tsx` | 564 | High |
| [FR-02](./FR-02-services.md) | Services | `views/Services.tsx` + `lib/services-content.ts` | 225 | High |
| [FR-05](./FR-05-contact.md) | Contact | `views/Contact.tsx` | 320 | High |
| [FR-06](./FR-06-about.md) | About HVA | `views/About.tsx` | 451 | High |
| [FR-10](./FR-10-arc.md) | Arc | `views/Arc.tsx` | 559 | High |
| [FR-03](./FR-03-services-in-detail.md) | Services In Detail | `views/ServicesInDetail.tsx` | 211 | Medium |
| [FR-04](./FR-04-solution-programs.md) | Solution Programs | `views/ServicesSolutionPrograms.tsx` | 92 | Medium |
| [FR-07](./FR-07-portfolio.md) | Portfolio | `views/Portfolio.tsx` | 361 | Medium |
| [FR-08](./FR-08-industries.md) | Industries | `views/Industries.tsx` | 176 | Medium |
| [FR-09](./FR-09-products-systems.md) | Products & Systems | `views/ProductsSystems.tsx` | 208 | Medium |
| [FR-11](./FR-11-blog-index.md) | Blog Index | `views/BlogIndex.tsx` | 253 | Low |
| [FR-12](./FR-12-blog-post.md) | Blog Post | `views/BlogPost.tsx` | 413 | Low |
| [FR-13](./FR-13-case-studies.md) | Case Studies | `views/CaseStudies.tsx` | 161 | Low |
| [FR-14](./FR-14-insights-hub.md) | Insights Hub | `views/InsightsHub.tsx` | 193 | Low |
| [FR-15](./FR-15-insights-collections.md) | Insights Sub-collections (×5) | `views/InsightsCollection.tsx` | 105 | Low |

---

## Dependency graph

```
FR-00 (setup)
  └── FR-16 (shared components)  ← unblocks all page sprints
        ├── FR-01 (home)
        ├── FR-02 (services) ──── FR-03 (in detail)
        │                    └── FR-04 (solution programs)
        ├── FR-05 (contact)
        ├── FR-06 (about)
        ├── FR-07 (portfolio)
        ├── FR-08 (industries)
        ├── FR-09 (products)
        ├── FR-10 (arc)
        ├── FR-11 (blog index) ── FR-12 (blog post)
        ├── FR-13 (case studies)
        └── FR-14 (insights hub) ── FR-15 (collections ×5)
```

---

## Shared rules across all sprints

1. **Brand names never translated:** `H.V.A`, `Hive Vault Arc`, `Arc`, product names, client names.
2. **Tech names never translated:** React, Python, Docker, AWS, etc.
3. **URLs and anchor IDs never translated:** `/services`, `#solution-programs`, etc.
4. **Numbers and data values never translated:** only surrounding labels.
5. **Dates use `Intl.DateTimeFormat('fr-FR')`** — never hardcode French month names.
6. **All copy reviewed against `docs/brand-copy-checklist.md`** before sign-off.
7. **No `direction` changes for French** — French is LTR. `dir="rtl"` is only for `ar` locale.
