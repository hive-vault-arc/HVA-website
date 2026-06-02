# Sprint 01 - Baseline Cleanup

Priority: Critical
Depends on: none
Primary spec: `../../docs/specs/seo-ai-discovery/00-research-audit.md`

## Goal

Clean the research and planning baseline so later SEO/AI implementation sprints do not follow stale assumptions, broken encoding, or old brand naming.

## Context

The current repo already has `robots.txt`, `sitemap.xml`, `llms.txt`, `llms-full.txt`, global Organization/ProfessionalService JSON-LD, and FAQ schema. Older docs still describe some of those as missing, and several files contain mojibake from pasted smart quotes, dashes, arrows, and emoji bytes.

## Files To Review

- `research.md` in the workspace root if it is intentionally kept as source research.
- `docs/seo-growth-playbook-tangier-morocco.md`
- `docs/full-seo-technical-audit-hva.md`
- `docs/brand-copy-checklist.md`
- `sprints/README.md`
- `sprints/sprint-08-llms-txt-aeo.md`
- `sprints/sprint-15-seo-metadata-update.md`
- `sprints/sprint-17-about-page-remake.md`
- `public/llms.txt`
- `public/llms-full.txt`

## Tasks

1. Fix encoding artifacts in docs and public text files that will be used as current guidance.
   - Replace mojibake with plain ASCII equivalents.
   - Prefer ASCII punctuation in docs.

2. Update stale current-state claims.
   - Do not say `robots.txt`, `sitemap.xml`, `llms.txt`, or `llms-full.txt` are missing.
   - Do state that `/ai/company` is missing and currently returns `404`.
   - Do state that the public sitemap needs route and hreflang hardening.

3. Normalize brand guidance.
   - Public prose: `Hive Vault Arc`.
   - Uppercase design labels: `HIVE VAULT ARC`.
   - Aliases/search variants: `H.V.A`, `HVA`, `HiveVaultArc`, `hivevaultarc`, `Hive Vault ARC`, `Hive Vault`, `Vault Arc`.

4. Classify remaining abbreviations.
   - Every remaining `H.V.A` / `HVA` in current docs should be one of:
     - alias/search variant
     - historical sprint content
     - code identifier
     - manifest short name
     - intentional SEO keyword

5. Leave historical sprint files intact unless they are actively misleading future execution.
   - If a historic sprint is outdated, add a short note pointing to this new sprint pack instead of rewriting the entire old sprint.

## Acceptance Criteria

- No current guidance file used by this sprint pack contains mojibake.
- `docs/brand-copy-checklist.md` aligns with the `Hive Vault Arc` primary-name rule.
- Current docs no longer claim root SEO files are missing.
- `/ai/company` is documented as the missing machine-readable endpoint.
- Stale Vercel/staging domain risk is documented.

## Verification

```powershell
rg "hiva-nine|Something went wrong|H\\.V\\.A|HVA" docs public sprints
```

The second scan may return results, but each result must be intentional and classified in the sprint notes or updated docs.
