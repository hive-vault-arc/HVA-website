# Insights Editorial Rebuild

## Review State

This pack is local-only. It does not authorize publishing, unpublishing, deleting,
deploying, redirecting, or mutating the production Sanity dataset.

The website frontend now accepts the proposed editorial fields as optional values and
falls back to deterministic slug mappings for the current library. Existing document
types, slugs, translations, and public routes remain unchanged.

## Studio Blocker

The original `hva-website-studio` source is not present in this repository or the
available local workspace. The hosted Studio and public dataset were audited read-only,
but the schema source was not reconstructed. Schema implementation and Studio deployment
remain blocked until the original repository is recovered.

When the Studio source is recovered, add these optional fields to `post`, `newsArticle`,
`perspective`, `researchReport`, and `caseStudy`:

- `editorialFormat`: `operating-note`, `evidence-brief`, `industry-guide`, `case`, or
  `founder-view`.
- `topics`: stable keys defined in `src/lib/editorial-taxonomy.ts`.
- `directAnswer`, `keyTakeaways`, and `evidenceType`.
- `reviewers`, `relatedCases`, `relatedCapabilities`, `methodology`, `limitations`, and
  one `primaryCta`.
- Cover image metadata: role, caption, credit, rights status, evidence status,
  AI-generation disclosure, prompt record, crop, and hotspot.

Use validation warnings first. Require fields only after all retained records pass the
migration inventory. `founder-view` requires a named founder. Evidence briefs making
benchmark or research claims require sources, methodology, and limitations.

## Local Deliverables

- `migration-inventory.md`: all 15 English records and 15 French counterparts.
- `library-rewrite-briefs.md`: rewrite directions and research-report evidence holds.
- `the-four-conditions-for-operational-value.md`: flagship Operating Note draft.
- `image-manifest.md`: editorial image requirements and provenance status.
- `public/Images/insights/editorial/`: five AI-disclosed topic cover families with
  editorial and Open Graph derivatives.

## Approval Gate

Before any CMS migration:

1. Recover and verify the original Studio git history.
2. Review every English draft and evidence classification.
3. Approve the flagship note and visual.
4. Confirm named authors and reviewers.
5. Approve French editorial work separately; do not publish machine translations.
6. Run a dry-run migration against a non-production dataset.
