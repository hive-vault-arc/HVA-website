# Website contribution workflow

The simpler website is developed on `site/simple-v1`, while the current full website remains deployed from `main`. Keep the full version maintained on `site/enterprise-maintained` so it can be used again when the company is ready.

## Branches

| Branch | Purpose | Integration during the redesign |
| --- | --- | --- |
| `site/simple-v1` | The simpler 11-page website. | Review simpler-site work here; upstream `origin/site/simple-v1`. |
| `site/enterprise-maintained` | The preserved full website and its ongoing maintenance. | Review full-site fixes here; upstream `origin/site/enterprise-maintained`. |
| `main` | Current deployed full website. | Keep it in place until the simpler version is ready and its release is requested. |
| `staging` | Existing integration/release branch. | Use only for an agreed release after the two development versions have been reviewed. |

The preservation point for the full website is `304f39c45c597cda7201babd40fd536f611523ac`. The active scope is the [simpler site plan](simple-v1-site-plan.md). The earlier feature-to-staging sequence does not require redesign work to start from `staging` or merge into production while it is unfinished.

## Local work

Use the `site-simple-v1` checkout for the simpler version and the `site-enterprise-maintained` checkout for the full version. Each is a separate working directory; check the branch before edits.

```powershell
git branch --show-current
git status --short
```

Preserve uncommitted work. Fetch before updating from the remote, inspect incoming changes, and use a fast-forward pull when the checkout is ready. Do not reset, force-push or switch a dirty checkout to move between versions. Focused feature branches may branch from the relevant version and return to that version through review.

## Maintaining both versions

Shared corrections include company facts, service definitions, reviewed legal requirements, approved translations, consent behavior and integration contracts. Compare the two implementations and transfer only the applicable change. A reviewed isolated commit may be cherry-picked; otherwise adapt the patch and verify it in each version.

Track the originating change and its corresponding commit or review on the other branch. Record when a change applies to only one version. Avoid merging all simpler-site work into the full branch, since page consolidation and reference-driven layouts belong to the simpler experience.

## Review expectations

- Keep each change coherent and reviewable.
- Describe its effect on pages, routes, CMS contracts, environment variables and the other maintained version.
- Include screenshots or a local preview for visual changes.
- Preserve approved facts, real client evidence and legal text.
- Keep secrets and local environment files out of commits.
- Keep unrelated formatting and refactoring out of focused changes.

The company GitHub organization and company hosting project remain the only delivery destinations.

## Verification

Documentation-only changes require link and factual consistency checks plus `git diff --check`.

For implementation changes, use the relevant checks in [AGENTS.md](../AGENTS.md). The existing CI workflow runs on pull requests and pushes to `staging` and `main`; it does not currently list the two site branches as triggers. Therefore, run the appropriate checks locally while developing either version.

Frontend release verification includes lint, type checking, route-contract drift, tests, all three translated message catalogs, WebP assets and a production build. Studio changes also require its lint, formatting, type generation and build checks. Existing brand, responsive and publishing-evidence debt is reported separately by CI; a reported baseline is not a passed migration.

Visual changes also require browser and responsive review. Route changes must preserve localized destinations, metadata, canonicals, sitemap behavior and functioning contact paths.

## Eventual production change

1. Complete and review the simpler site's core pages and shared shell.
2. Reconcile applicable maintenance fixes between the two versions.
3. Confirm the full version is preserved locally and on `origin/site/enterprise-maintained`.
4. Verify the proposed release and its production integrations, legal requirements and rollback path.
5. When the user requests the production change, use the agreed release review to bring the ready simpler version to `main`.
6. Continue maintaining both versions and review any later return to the full website as a separate release.

No development task, documentation update or feature-branch push implies approval to change production, hosting settings or CMS publication.

## Rollback

Preserve the full version before any eventual cutover. Use the company hosting project's approved rollback path and a corrective reviewed change if a release regresses. Do not rewrite `main` history or force-push to undo a release.
