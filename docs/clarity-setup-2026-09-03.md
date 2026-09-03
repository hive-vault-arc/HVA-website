# Clarity setup and release record — 3 September 2026

## Status

Code is prepared on `feature/seo-analytics-foundations`. Company account settings are saved. Live ingestion is **not yet verified**: production still runs the earlier `main` deployment. Release through feature → `staging` review → approved `main` release; do not redeploy the old code expecting it to install Clarity.

## Company account configuration

### Microsoft Clarity

- Project: **Hive Vault Arc — Production**, public project ID `ycn3r8by3t`.
- Cookies: **Off**. The website explicitly grants analytics storage only after opt-in.
- Masking: **Strict**, saved. Changes can take up to an hour and do not retroactively mask earlier recordings.
- Bot detection: **On**.
- Microsoft Ads, Google Ads, and Google Analytics: not connected.
- IP blocking: added the setup connection using **Block my current IP**, labelled `Khalid setup connection - 2026-09-03`. Its value is kept in the Clarity console, not this repository. A changing IP or a different office/home network needs separate review.
- Two active company administrators were visible; Ali's invitation remains pending. Account MFA was not verified.
- No QA project is configured. Local/preview analytics are intentionally disabled, and browser QA sends no real telemetry.

### Vercel

Company project: [hive-vault-arc-website](https://vercel.com/hive-vault-arc/hive-vault-arc-website), connected to `hive-vault-arc/HVA-website`, production branch `main`, domain `hivevaultarc.com`.

Saved as public configuration, **Production only**:

```dotenv
NEXT_PUBLIC_MICROSOFT_CLARITY_PROJECT_ID=ycn3r8by3t
NEXT_PUBLIC_ENABLE_MICROSOFT_CLARITY=true
```

These are build-time public values, not API credentials. Existing Sanity/site settings were not changed. Vercel confirmed a new deployment is required. Preview/Development have no Clarity configuration; the gitignored local file keeps the enable flag `false`.

## Implementation map

- `src/lib/privacy/consent.ts`: versioned, validated 180-day preference cookie; necessary storage always on, analytics opt-in, advertising always off.
- `src/lib/privacy/clarity.ts`: lazy SDK import, consent recheck during loading, single initialization, consent withdrawal and first-party cookie/session cleanup.
- `src/components/privacy/`: global provider, banner, native settings dialog, footer control, and hostname/build-flag guarded tracker. Withdrawal unloads the recorder via reload and synchronizes other open tabs. Focus/periodic checks detect changed or expired consent.
- `src/app/[locale]/layout.tsx`: mounts the shared controls once. Existing Vercel Analytics remains unchanged.
- `src/views/CookiePolicy.tsx` and the matching localized route: cookie/storage inventory, settings control, vendor disclosure. `PrivacyPolicy.tsx` and `LegalMentions.tsx` link to the updated policy.
- `messages/{en,fr,es,ar}.json`: localized controls and policy copy.
- `src/i18n/{routing,route-manifest}.ts`: localized cookie-policy paths, alternates, and sitemap inclusion.
- `next.config.ts`: adds only Clarity's script origins to the existing CSP.
- `src/views/Contact.tsx`: explicitly masks the contact form panel.
- `.env.example`: documents the disabled-by-default switch and public project identifier.

No Identify API, personal identifiers, form payloads, custom events, advertising connection, or Clarity API token was added. Hostname checks allow only the apex and `www` production domains, even if somebody mistakenly enables the flag on localhost or a Vercel preview URL.

## Verification

- `npm run lint`: pass.
- `npm test -- src/lib/privacy`: 10 tests pass.
- `npm test -- --maxWorkers=2`: 33 test files / 180 tests pass. The default parallel run previously hit an existing Arabic ICU test's 5-second timeout while builds were also running; the bounded-concurrency rerun passed.
- `npm run i18n:validate -- fr`, `-- es`, `-- ar`: each passed separately. Microsoft Clarity is treated as a protected brand name, not an untranslated sentence.
- `npm run build`: pass, including TypeScript, 108 generated static pages, and the WebP asset check (358 public files).
- Playwright CLI: exercised the built site in an isolated browser, routing the production hostname to localhost and intercepting every Clarity request. Checked no request/cookie before opt-in or after rejection; explicit analytics-granted/ads-denied signals; no duplicate tracker on client navigation; returning consent; withdrawal deletion/reload in both the active and another open tab; visible-label and keyboard toggle interaction; dialog keyboard containment/Escape/focus return; 44px controls; 320/390/820/1440/1920px layouts; French, Spanish, and Arabic routes. Localhost stayed untracked even with an enabled build and saved consent.
- Local-only screenshots: `output/playwright/clarity-*.png` (gitignored). The CLI runner is `.codex/clarity-qa.js` (gitignored). These are mocked integration checks, not a live recording test.
- `git diff --check`: pass. Local env files and browser artifacts are ignored.

Existing quality debt is not hidden by this change: the repository-wide brand audit reports 174 existing color findings, and the responsive audit reports 54 existing viewport/font-clamp findings outside the new consent styles. Dependency installation reported 18 audit findings; no unrelated dependency upgrade was attempted. This work does not certify existing legal notices or privacy compliance.

## Release and live verification

1. Review/merge the feature PR into `staging` after green CI and contributor approval. Preview should display the consent UI but intentionally send no Clarity data.
2. Review and approve `staging` → `main`; let the company Vercel integration build the new production code with the saved variables. If Vercel blocks an author's deployment, resolve company access through an authorized administrator; do not change commit authors or upgrade plans to bypass it.
3. On the live domain, use a non-excluded connection and a fresh browser session without analytics blockers. Before consent, verify no `clarity.ms` request and no `_clck`/`_clsk` cookies.
4. Accept analytics, browse a few public pages, and confirm one tracker installation and successful collection requests. Do not submit real sensitive form data for this test.
5. Reopen Cookie settings, withdraw analytics, and confirm reload, cookie/session cleanup, and no restarted tracker. Check another open tab also stops.
6. In Clarity, confirm the test session reaches the correct project, Strict masking is applied, and heatmaps become available after processing sufficient visits. Do not interpret an empty dashboard immediately after deployment as proof of failure.
7. Recheck internal IP exclusions, the pending team invitation, account MFA, and company privacy review separately. No real production session or heatmap has been verified as part of the mocked local tests.

## Rollback

Set `NEXT_PUBLIC_ENABLE_MICROSOFT_CLARITY=false` in Vercel Production and deploy again (the flag is compiled at build time), or use the approved Vercel rollback to the previous release. Keep the cookie/privacy routes available for users. Never commit local environment files or rewrite `main` history.

## Primary references

- [Clarity Consent V2](https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-consent-api-v2)
- [Clarity cookies](https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-cookies)
- [Clarity FAQ](https://learn.microsoft.com/en-us/clarity/faq)
- [Clarity source: cookie lifetime and storage keys](https://github.com/microsoft/clarity/blob/master/packages/clarity-js/types/data.d.ts)
- [Repository contribution workflow](contributing-workflow.md)
