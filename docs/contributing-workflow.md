# Website contribution workflow

This repository uses a short, reviewable path from focused work to production.

## Branches

| Branch | Purpose | Merge destination |
| --- | --- | --- |
| `feature/seo-analytics-foundations` | Cookie consent, analytics, Bing Webmaster Tools, and SEO/GEO/AEO work. | `staging` |
| `feature/ui-ux-improvements` | Deliberate UI, UX, accessibility, responsive, and interaction improvements. | `staging` |
| `staging` | Shared integration and contributor-review environment. It must remain deployable. | `main` |
| `main` | Production source of truth. | None |

Create any additional work as a narrowly named feature branch from the latest `staging`, then open a pull request back into `staging`.

## Required delivery path

1. Start from current `staging`.
2. Make one coherent change in a feature branch.
3. Open a pull request into `staging`; never push a feature directly to `main`.
4. Address contributor feedback and ensure the **Verify website** check is green.
5. Merge into `staging` after review.
6. Test the staging deployment and open a release pull request from `staging` to `main`.
7. Merge to `main` only when the release is approved and the same checks are green.

## Pull-request expectations

- Keep changes small enough to review meaningfully.
- State user impact, affected routes, CMS/schema changes, environment-variable changes, and rollback considerations.
- Use the pull-request checklist for every change.
- Include screenshots or a preview URL for visual work.
- Do not commit `.env*`, tokens, API keys, DNS values, or credentials.
- Do not make unrelated formatting or refactoring changes in a focused pull request.

## Required checks

The repository workflow runs the following on pull requests into `staging` and `main` and on pushes to either branch:

```text
npm run lint
npm test
npm run i18n:validate -- fr
npm run i18n:validate -- es
npm run i18n:validate -- ar
npm run check:webp
npm run build
```

Run the relevant commands locally before requesting review. Browser and visual checks remain required for layout, interaction, navigation, and responsive changes.

## GitHub and deployment settings to configure

Configure these in the company GitHub organization after this workflow is merged:

1. Protect `main` and `staging`.
2. Require pull requests before merging; disallow direct pushes and force pushes.
3. Require the **Verify website / Lint, test, and build** status check.
4. Require at least one approving review for `staging` and two for `main` when the contributor group supports it.
5. Require branches to be current before merge, and dismiss stale approvals after new commits.
6. Restrict production deployment in Vercel to `main`; use preview deployments for pull requests and staging work.
7. Keep production secrets only in the company Vercel project and rotate any credential that was ever exposed outside a secure secret manager.

## Rollback

If a production release causes a regression, use Vercel's approved production rollback first, then open a corrective pull request. Do not rewrite `main` history or force-push to undo a release.
