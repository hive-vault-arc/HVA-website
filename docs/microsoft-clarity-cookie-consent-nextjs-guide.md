# Microsoft Clarity and Cookie Consent for the Hive Vault Arc Website

> Implementation and compliance handoff for the co-founder maintaining `hivevaultarc.com`
>
> Last researched: 12 August 2026
>
> Status: Implementation and account configuration completed on `feature/seo-analytics-foundations` on 3 September 2026. The company Vercel Production environment is configured, but the code must pass the contributor-review/release workflow before it collects live data. Local and preview collection remain disabled. See the [current setup and release record](clarity-setup-2026-09-03.md); the sections below retain the original engineering plan.

## Implementation status — 3 September 2026

Completed locally:

- installed `@microsoft/clarity` and dynamically import it only after an explicit analytics opt-in;
- implemented Consent V2 with `analytics_Storage: 'granted'` and `ad_Storage: 'denied'` only;
- added an equal-prominence reject/customise/accept banner, a reopenable settings dialog, and withdrawal handling;
- added an indexable, localized cookie-policy route for English, French, Spanish, and Arabic;
- added the Cookie Policy and Cookie settings controls to the global footer;
- explicitly applied `data-clarity-mask="true"` to the contact-form panel;
- added only the required Clarity script origins to the Content Security Policy;
- saved the public Clarity project identifier in the gitignored local environment file, with the production flag still `false`.

Completed in the company accounts:

- Clarity **Cookies** off, **Strict** masking selected, bot detection on; advertising and Google Analytics integrations disconnected.
- The setup connection's current public IP excluded from production analytics. Other team networks and changing IPs are not automatically excluded.
- Both public Clarity variables saved in the company Vercel project's **Production** environment only. A new deployment is required for them to take effect.

Remaining release work:

1. Review the feature pull request into `staging`, then approve the release pull request into `main` under the repository's contribution workflow.
2. After deployment, check a real opt-in visit from a non-excluded network and confirm masking, recordings, and heatmap availability in Clarity. Local tests use a mocked tracker and are not proof of live ingestion.
3. Complete company privacy/legal review where applicable; this engineering work does not certify CNDP formalities, international transfers, contracts, or existing policy claims.
4. Use a separate QA project if preview telemetry is later required; previews currently do not load Clarity.

Verification already completed on this branch:

- `npm run i18n:validate -- fr`, `-- es`, and `-- ar` (separate runs)
- `npm test -- --maxWorkers=2`: 33 files and 180 tests passed, including 10 consent/tracker tests
- `npm run lint`
- `npm run build`
- Isolated Playwright CLI checks against a production build, with the production hostname routed to localhost and all Clarity requests mocked: pre-consent blocking, rejection persistence, analytics-only consent signals, single initialization across client navigation, withdrawal cleanup, keyboard focus/Escape, responsive layouts, and all four policy routes.

## Important legal note

This is an engineering and operational guide, not legal advice. Cookie and privacy obligations depend on where Hive Vault Arc is established, which visitors it targets or monitors, what Microsoft features are enabled, and the current wording of vendor contracts and laws. Before production activation, the company must have the final notices, CNDP formalities, international-transfer position, and Microsoft contract reviewed by a qualified Moroccan privacy adviser. EU/EEA, French, Spanish, UK, Swiss, and other applicable requirements must also be reviewed when visitors in those markets are targeted or monitored.

The safest technical baseline for HVA is intentionally stricter than Microsoft Clarity's optional cookieless mode:

- apply the same opt-in experience worldwide;
- do not download or initialize Clarity before the visitor grants analytics consent;
- keep advertising storage denied unless Microsoft Advertising is separately introduced and separately consented to;
- make rejection as easy and prominent as acceptance;
- keep the site fully usable when analytics is rejected;
- mask conservatively and never send form content or identifiers to Clarity;
- let the visitor reopen settings and withdraw consent at any time.

## Table of contents

1. [What is being added](#1-what-is-being-added)
2. [Current HVA frontend reality](#2-current-hva-frontend-reality)
3. [The recommended privacy model](#3-the-recommended-privacy-model)
4. [Legal and regulatory baseline](#4-legal-and-regulatory-baseline)
5. [Before writing code: company and Clarity setup](#5-before-writing-code-company-and-clarity-setup)
6. [Consent UX and content requirements](#6-consent-ux-and-content-requirements)
7. [Recommended Next.js architecture](#7-recommended-nextjs-architecture)
8. [Implementation sequence](#8-implementation-sequence)
9. [Clarity masking and data-minimization rules](#9-clarity-masking-and-data-minimization-rules)
10. [Cookies and similar technologies inventory](#10-cookies-and-similar-technologies-inventory)
11. [Privacy policy, legal notice, and cookie-policy changes](#11-privacy-policy-legal-notice-and-cookie-policy-changes)
12. [Security and Content Security Policy](#12-security-and-content-security-policy)
13. [Performance rules](#13-performance-rules)
14. [Testing plan](#14-testing-plan)
15. [Deployment and verification](#15-deployment-and-verification)
16. [Ongoing governance](#16-ongoing-governance)
17. [Common mistakes](#17-common-mistakes)
18. [Definition of done](#18-definition-of-done)
19. [Primary sources](#19-primary-sources)

---

## 1. What is being added

Microsoft Clarity is a behavioral analytics service. It can provide:

- aggregated interaction analytics;
- heatmaps;
- session recordings;
- signals such as clicks, scrolling, mouse movement, and page rendering behavior;
- information that helps identify confusing or ineffective website interactions.

Microsoft states that Clarity captures page rendering and user interactions such as mouse movement, clicks, and scrolling. Clarity data is stored in Microsoft Azure. See the [Microsoft Clarity FAQ](https://learn.microsoft.com/en-us/clarity/faq).

Clarity is different from the Vercel Web Analytics already present in the HVA frontend:

- Vercel Web Analytics is currently mounted in the locale layout only on Vercel deployments.
- The current HVA privacy copy describes Vercel analytics as anonymized, aggregated, and cookieless.
- Clarity adds behavioral analytics, heatmaps, and session replay and can set both first-party and Microsoft-domain cookies when analytics consent is granted.
- Clarity therefore cannot be silently added under the current policy text.

Clarity is supplemental. It does not automatically replace Vercel Web Analytics. The company may keep both after documenting the separate purposes and legal bases. That decision must be recorded.

## 2. Current HVA frontend reality

The current frontend uses:

- Next.js 16 App Router;
- React 19;
- `next-intl` with English, French, Spanish, and Arabic locale content;
- Vercel hosting and `@vercel/analytics`;
- a global layout at `src/app/[locale]/layout.tsx`;
- security headers and a Content Security Policy in `next.config.ts`;
- localized privacy, legal, and cookie-policy copy in `messages/en.json`, `messages/fr.json`, `messages/es.json`, and `messages/ar.json`.

The current layout contains:

```tsx
{process.env.VERCEL === '1' && <Analytics />}
```

The existing policy currently says the public website does **not** use analytics or advertising cookies. That statement appears in both English and French under:

- `Privacy.collection.analytics`;
- `Privacy.legalBasis`;
- `Privacy.cookies`;
- `Privacy.retention`;
- `Privacy.sharing`;
- `Privacy.transfers`;
- `Legal.cookies`.

Those claims become inaccurate as soon as cookie-enabled Clarity is activated. Update and legally review both locales **before** the production Clarity flag is enabled.

The current CSP allows Vercel's analytics script but does not allow the Clarity script in `script-src`. The implementation will therefore require a deliberate CSP change and browser-console testing.

The consent store, banner, preferences dialog, Clarity loader, and cookie-policy route now exist as standalone privacy components. Keep tracking logic out of page components and retain the production flag off until the remaining gates above are completed.

## 3. The recommended privacy model

### 3.1 Use strict consent-gated loading

For HVA, the recommended flow is:

1. A new visitor receives only the HVA consent-preference interface.
2. No Clarity package, tag, request, cookie, cookieless telemetry, or Microsoft tracking endpoint is loaded before a choice.
3. If the visitor rejects optional analytics, save only the necessary HVA consent-preference cookie. Do not initialize Clarity.
4. If the visitor grants analytics, initialize Clarity and pass Consent V2 with analytics granted and advertising denied.
5. If the visitor withdraws analytics consent, pass a denied Consent V2 state, invoke Microsoft's documented cookie-erasure call, save the new preference, and reload the page so the application returns to a clean no-Clarity state.

This approach deliberately gives up Clarity's denied-consent cookieless measurements. Microsoft documents that, with analytics storage denied, Clarity can load and collect limited cookieless data. That mode produces pageview-scoped identifiers and reduced reporting, but it is still data processing and must not be described as “nothing is collected.” See [Consent Management](https://learn.microsoft.com/en-us/clarity/setup-and-installation/consent-management) and [reporting without cookie consent](https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-without-cookie-consent).

Strict gating is easier to explain, test, and audit for this website.

### 3.2 Keep advertising denied

Clarity Consent V2 has independent purposes:

- `analytics_Storage`: behavioral analytics, site usage, and interaction patterns;
- `ad_Storage`: advertising data, retargeting, conversions, and campaign performance.

Microsoft says `ad_Storage: "granted"` allows Clarity data to be shared with Microsoft Ads, while `ad_Storage: "denied"` prevents that sharing. HVA has not requested a Microsoft Advertising integration. Therefore:

```ts
{
  ad_Storage: 'denied',
  analytics_Storage: 'granted',
}
```

is the only granted state that should be used initially.

Never call `Clarity.consentV2()` with no object. The official package's no-argument default grants both advertising and analytics storage, which is not appropriate for the planned HVA setup. Always pass both values explicitly. See the official [`@microsoft/clarity` package](https://www.npmjs.com/package/@microsoft/clarity).

If Microsoft Ads is introduced later:

1. add a separate “Advertising” category;
2. update all policies and the cookie table;
3. assess controller/processor roles and international transfers again;
4. increment the HVA consent version;
5. re-prompt every visitor;
6. grant `ad_Storage` only to visitors who explicitly accept advertising.

### 3.3 Apply opt-in globally

Do not weaken the banner based on an unreliable client-side location guess. Morocco's CNDP guidance requires prior consent for cookies involving personal data, while explicit consent signals are also required for full Clarity functionality in the EEA, UK, and Switzerland. A single worldwide opt-in model is simpler and more defensible than regional behavior.

## 4. Legal and regulatory baseline

### 4.1 Morocco: Law 09-08 and CNDP guidance

The HVA company is in Morocco, so Moroccan requirements are the starting point.

The CNDP's [website compliance guidance](https://www.cndp.ma/conformite-des-sites-web/) states, among other things, that:

- a website controller collecting and processing personal data must notify the CNDP of the processing implemented on the site;
- a website using cookies involving personal data must obtain the visitor's consent before depositing those cookies;
- the website must state the cookies' purposes and explain how a visitor can oppose their use;
- collected data must be proportionate to the purpose;
- processors must provide sufficient security guarantees and be governed by a contract or legal act;
- personal data must not be retained longer than necessary for the purpose.

The CNDP published a recent simplified declaration model for terminal cookies in [Délibération D-939-2025](https://www.cndp.ma/wp-content/uploads/2025/12/Deliberation-N%C2%B0-D-939-2025-du-28112025-relative-au-modele-de-declaration-simplifiee-relative-au-traitement-des-donnees-a-caractere-personnel-de-cookies-sur-un-terminal.pdf). Before activation, the company should contact the CNDP or Moroccan counsel to determine the exact declaration/authorization route and obtain the correct receipt or authorization wording for the policy.

Clarity data is stored in Microsoft Azure, and Microsoft has access to it according to the [Clarity FAQ](https://learn.microsoft.com/en-us/clarity/faq). This raises an international-transfer assessment. Articles 43 and 44 of Morocco's [Law 09-08](https://www.cndp.ma/images/lois/Loi-09-08-Fr.pdf) govern foreign transfers and permitted derogations/safeguards. Before release:

- identify the Microsoft contracting entity and actual data locations under the current terms;
- determine the roles of HVA and Microsoft for each processing purpose;
- update the existing CNDP filing if required;
- complete any applicable foreign-transfer declaration/authorization process;
- document the contract and safeguards relied on;
- do not assume that consent alone resolves every transfer or controller obligation.

### 4.2 European Union and EEA

If HVA offers services to or monitors visitors in the EU/EEA, the GDPR's territorial and consent requirements and the ePrivacy cookie rules may apply.

The practical engineering standard is:

- no non-essential analytics cookie before consent;
- consent is freely given, specific, informed, and unambiguous;
- no pre-ticked analytics toggle;
- continued browsing or scrolling is not consent;
- rejection does not block the site;
- withdrawal is as easy as giving consent;
- categories are separated by purpose;
- purposes and third parties are named;
- the selected state is accurately passed to Clarity.

Use the [EDPB Guidelines 05/2020 on consent](https://www.edpb.europa.eu/documents/guideline/guidelines-052020-on-consent-under-regulation-2016679_en) when finalizing the UX. The French CNIL has repeatedly emphasized that [refusing cookies should be as easy as accepting them](https://www.cnil.fr/en/refusing-cookies-should-be-easy-accepting-them-cnil-continues-its-action-and-issues-new-orders). Because HVA has a French site and plans Spanish localization, an EU-grade design is appropriate.

### 4.3 United Kingdom

The UK ICO explains that users must be told what storage/access technologies do and why, and must actively consent unless a strict exception applies. Analytics done for the website owner's benefit is generally not strictly necessary to deliver the service requested by the visitor. Consult the ICO's current [storage and access technologies guidance](https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/guidance-on-the-use-of-storage-and-access-technologies/) because it was finalized in April 2026 and reflects recent UK changes.

### 4.4 Switzerland and other markets

Microsoft began enforcing consent-signal requirements for Clarity page visits from the EEA, UK, and Switzerland on 31 October 2025. That vendor enforcement does not replace HVA's legal analysis. If HVA materially targets California or other US states, Canada, or additional countries, conduct a separate jurisdiction review before treating this guide as complete.

### 4.5 Rights and deletion limitation

Microsoft currently states that deleting data for one specific Clarity user is not available; deleting the entire project is required. That is a significant operational fact for access or erasure requests. Before enabling Clarity:

- get a legal decision on how HVA will handle a Clarity-related data-subject request;
- do not use `Clarity.identify` with a name, email, phone number, contact-form value, CRM ID, Sanity author ID, or any directly linkable customer identifier;
- keep the service pseudonymous and consent gated;
- maintain an escalation contact and decision record;
- reassess this limitation whenever Microsoft updates its product or terms.

## 5. Before writing code: company and Clarity setup

### 5.1 Company decisions

Record these decisions in the internal privacy register:

- Controller: exact Hive Vault Arc legal entity name and address.
- Privacy contact: the monitored email/address used for rights requests.
- Purpose: site usability research and optimization, not employee monitoring, lead scoring, or advertising.
- Product scope: public `hivevaultarc.com` routes only.
- Advertising: disabled.
- Legal basis: consent for optional Clarity analytics/cookies.
- Vercel Analytics: retained or removed, with a separately documented purpose and legal assessment.
- Consent duration: HVA recommends six months as a conservative product setting, subject to legal approval and earlier re-consent when purposes/vendors change.
- Masking level: Strict initially, or Balanced only after a reviewed recording confirms that no sensitive or client data appears.
- Access: named company administrators only.
- Internal traffic: excluded.
- Children: confirm that the site is not directed to anyone under 18; Microsoft says Clarity should not be used on sites/apps targeting users under 18.

### 5.2 Contract and transfer review

Before the tag exists in production:

- read and archive the then-current [Clarity Terms](https://clarity.microsoft.com/terms);
- read the [Microsoft Privacy Statement](https://www.microsoft.com/privacy/privacystatement);
- determine whether a DPA, Microsoft Products and Services Data Protection Addendum, Standard Contractual Clauses, or another instrument applies;
- identify HVA's and Microsoft's roles instead of assuming that Microsoft is only an HVA processor;
- document Azure/data location and foreign-transfer safeguards;
- complete the relevant CNDP work;
- store the review date and owner.

Terms and privacy statements change. Microsoft's privacy statement was updated in July 2026 when this guide was researched. Recheck the live documents, not a saved memory of them.

### 5.3 Create the Clarity project

1. Sign in to [Microsoft Clarity](https://clarity.microsoft.com/) with a company-controlled account.
2. Create one production project for `https://hivevaultarc.com`.
3. Do not create the only owner under a personal account.
4. Add at least two authorized company administrators.
5. Enable MFA on the Microsoft accounts.
6. In project settings, enable Consent Mode and configure analytics and advertising defaults as denied for explicit-consent operation. Microsoft documents Consent Mode as a prerequisite before passing consent signals.
7. Do not connect Microsoft Advertising.
8. Set masking to Strict initially.
9. Add internal office/developer IP exclusions. Microsoft documents IP blocking in [Blocking IP Addresses](https://learn.microsoft.com/en-us/clarity/setup-and-installation/ip-exclusion); allow time for changes to apply.
10. Copy the project ID only after these controls are configured.

### 5.4 Environment variables

Add placeholders to `.env.example`:

```dotenv
# Microsoft Clarity is opt-in only. Enable in Vercel Production after legal and QA approval.
NEXT_PUBLIC_MICROSOFT_CLARITY_PROJECT_ID=
NEXT_PUBLIC_ENABLE_MICROSOFT_CLARITY=false
```

Set them as follows:

| Environment | Project ID | Enable flag |
| --- | --- | --- |
| Local development | optional test project only | `false` by default |
| Vercel Preview | production ID should not be used | `false` |
| Vercel Production before approval | configured but inactive | `false` |
| Vercel Production after approval | production project ID | `true` |

The project ID is a public browser configuration value, not a secret, but keeping it in environment configuration avoids accidental activation and keeps preview environments out of production reports.

Use a separate Clarity test project if real integration testing is required locally. Never contaminate the production project with localhost or preview sessions.

## 6. Consent UX and content requirements

### 6.1 First-layer banner

The first layer must explain, in plain language:

- that HVA uses one necessary preference cookie to remember the visitor's choice;
- that Microsoft Clarity is optional;
- that consent enables behavioral analytics, heatmaps, and session replay;
- that rejection does not affect website access;
- where the privacy/cookie details can be read.

Show three actions:

1. **Reject optional cookies**
2. **Customize**
3. **Accept analytics**

Reject and accept must be equally easy and comparably prominent. Do not make “Reject” a faint text link while “Accept” is the only strong button. Do not close the banner and interpret the close as acceptance. A close action, if present at all, should mean reject or leave the banner unresolved without tracking.

### 6.2 Preferences dialog

The dialog should show:

#### Strictly necessary — always active

- `hva_consent_v1`
- Purpose: remembers the privacy choice and consent schema version.
- It contains no name, email, contact details, or behavioral history.
- It cannot be disabled because otherwise the site would ask on every page/visit and could not honor the stored refusal.

#### Analytics — off by default

- Microsoft Clarity.
- Purpose: understand page interaction, usability issues, heatmaps, and session replay to improve the website.
- Vendor: Microsoft.
- Data examples: page URL, device/browser information, approximate location derived from network data, page rendering, clicks, pointer movement, and scrolling, subject to masking.
- Storage: Microsoft Azure, under then-current Microsoft terms.
- Cookies: `_clck`, `_clsk`, and potentially Microsoft-domain cookies as documented by Microsoft when relevant permissions are granted.
- Link to HVA's cookie/privacy details and Microsoft's privacy statement.

#### Advertising — not active

Do not show a working advertising toggle while HVA does not use an advertising vendor. Internally keep `ad_Storage` hard-coded to denied. If advertising is introduced later, it must become a distinct, default-off category with re-consent.

### 6.3 Persistent settings access

Add a **Cookie settings** / **Paramètres des cookies** button to `SiteFooter.tsx`. It must reopen the preferences dialog on every page after the initial banner disappears.

This must be a button because it performs an action, not a fake link to `#`.

### 6.4 Accessible behavior

- Banner controls must be keyboard reachable in a logical order.
- Use visible focus styles.
- Every toggle needs a programmatic label and description.
- The settings dialog must have an accessible name, focus trap, close button, and focus restoration.
- Escape should close settings without silently changing preferences.
- Saving should occur only when the visitor activates the save button.
- Status updates should be announced without excessive screen-reader interruption.
- Respect reduced-motion preferences.
- Test at 320px width and with text zoomed to 200%.
- Do not block the footer or primary CTA permanently on short screens; the banner body can scroll while actions remain reachable.

### 6.5 Suggested English copy

**Title:** Cookies and privacy

**Body:** We use one necessary cookie to remember your privacy choice. With your permission, Microsoft Clarity uses analytics cookies and session replay to help us understand how the site is used and improve it. Rejecting analytics will not affect access to the website.

**Actions:** Reject optional cookies · Customize · Accept analytics

**Settings analytics description:** Allows Microsoft Clarity to record masked interaction data, produce heatmaps, and connect page views into sessions so we can identify usability problems. Off by default.

### 6.6 Suggested French copy

**Titre :** Cookies et confidentialité

**Texte :** Nous utilisons un cookie nécessaire pour mémoriser votre choix de confidentialité. Avec votre accord, Microsoft Clarity utilise des cookies d'analyse et la relecture de sessions afin de nous aider à comprendre l'utilisation du site et à l'améliorer. Le refus des cookies d'analyse n'empêche pas l'accès au site.

**Actions :** Refuser les cookies facultatifs · Personnaliser · Accepter l'analyse

**Description de la catégorie Analyse :** Autorise Microsoft Clarity à enregistrer des interactions masquées, à produire des cartes de chaleur et à relier les pages consultées au sein d'une session afin d'identifier les problèmes d'utilisabilité. Désactivé par défaut.

Have both drafts legally and linguistically reviewed. Add the same namespace to Spanish when Spanish goes live, following `docs/spanish-localization-implementation-guide.md`.

## 7. Recommended Next.js architecture

### 7.1 Component and file map

Create a standalone privacy boundary:

```text
src/
├── components/
│   └── privacy/
│       ├── CookieConsentProvider.tsx
│       ├── CookieBanner.tsx
│       ├── CookiePreferencesDialog.tsx
│       ├── CookieSettingsButton.tsx
│       └── MicrosoftClarity.tsx
├── lib/
│   └── privacy/
│       ├── consent.ts
│       └── clarity.ts
└── app/
    └── [locale]/
        └── cookie-policy/
            └── page.tsx
```

The responsibilities are:

- `consent.ts`: versioned preference type, cookie read/write, expiration, validation.
- `clarity.ts`: the only module allowed to import and call the Clarity SDK.
- `CookieConsentProvider.tsx`: in-memory state and actions for accept, reject, save, withdraw, and open settings.
- `CookieBanner.tsx`: first-layer notice only.
- `CookiePreferencesDialog.tsx`: granular settings and details.
- `CookieSettingsButton.tsx`: footer action.
- `MicrosoftClarity.tsx`: conditional client-only activation after consent.

Do not call Clarity from page components, buttons, or `instrumentation-client.ts`. Next.js instrumentation runs very early and is the wrong place for consent-gated analytics.

### 7.2 Consent data model

Use a versioned model:

```ts
export type ConsentPreferences = {
  version: 1;
  necessary: true;
  analytics: boolean;
  advertising: false;
  decidedAt: string;
};
```

Do not include:

- locale;
- email;
- IP address;
- user name;
- account ID;
- full consent-text HTML;
- tracking identifiers.

`version` is essential. Increment it when a new vendor, purpose, data use, or category is introduced. A stored record with an older version must be treated as undecided and the visitor must be asked again.

### 7.3 Preference-cookie helper

The following is an implementation pattern, not a substitute for tests:

```ts
// src/lib/privacy/consent.ts
export const CONSENT_COOKIE_NAME = 'hva_consent_v1';
export const CONSENT_VERSION = 1 as const;
export const CONSENT_MAX_AGE_SECONDS = 60 * 60 * 24 * 180;

export type ConsentPreferences = {
  version: typeof CONSENT_VERSION;
  necessary: true;
  analytics: boolean;
  advertising: false;
  decidedAt: string;
};

export function createConsentPreferences(
  analytics: boolean,
): ConsentPreferences {
  return {
    version: CONSENT_VERSION,
    necessary: true,
    analytics,
    advertising: false,
    decidedAt: new Date().toISOString(),
  };
}

export function readConsentCookie(): ConsentPreferences | null {
  if (typeof document === 'undefined') return null;

  const raw = document.cookie
    .split('; ')
    .find((part) => part.startsWith(`${CONSENT_COOKIE_NAME}=`))
    ?.slice(CONSENT_COOKIE_NAME.length + 1);

  if (!raw) return null;

  try {
    const value: unknown = JSON.parse(decodeURIComponent(raw));

    if (
      typeof value !== 'object' ||
      value === null ||
      !('version' in value) ||
      !('necessary' in value) ||
      !('analytics' in value) ||
      !('advertising' in value) ||
      !('decidedAt' in value) ||
      value.version !== CONSENT_VERSION ||
      value.necessary !== true ||
      typeof value.analytics !== 'boolean' ||
      value.advertising !== false ||
      typeof value.decidedAt !== 'string'
    ) {
      return null;
    }

    return value as ConsentPreferences;
  } catch {
    return null;
  }
}

export function writeConsentCookie(value: ConsentPreferences): void {
  if (typeof document === 'undefined') return;

  const secure = window.location.protocol === 'https:' ? '; Secure' : '';
  document.cookie = [
    `${CONSENT_COOKIE_NAME}=${encodeURIComponent(JSON.stringify(value))}`,
    'Path=/',
    `Max-Age=${CONSENT_MAX_AGE_SECONDS}`,
    'SameSite=Lax',
  ].join('; ') + secure;
}
```

Why this cookie is not `HttpOnly`: the browser-side consent provider must read it before deciding whether to load a browser analytics SDK. It contains only privacy preferences. Keep it small, signed or validated defensively if server-side decisions later rely on it, and never treat it as authentication or security authorization.

Do not use `cookies()` in every Next.js server layout only to render the banner. That can make the route depend on request-time data and reduce static/cached rendering benefits. A client provider can read the preference after hydration while keeping Clarity unloaded in the meantime.

### 7.4 Official Clarity SDK helper

Install the official package only when implementation begins:

```powershell
npm install @microsoft/clarity
```

Use a dynamic import so rejected and undecided visitors do not download the SDK code:

```ts
// src/lib/privacy/clarity.ts
type ConsentValue = 'granted' | 'denied';

let initialized = false;
let sdkPromise: Promise<typeof import('@microsoft/clarity')['default']> | null = null;

async function getClarity() {
  sdkPromise ??= import('@microsoft/clarity').then((module) => module.default);
  return sdkPromise;
}

export async function enableClarity(projectId: string): Promise<void> {
  const Clarity = await getClarity();

  if (!initialized) {
    Clarity.init(projectId);
    initialized = true;
  }

  Clarity.consentV2({
    ad_Storage: 'denied' satisfies ConsentValue,
    analytics_Storage: 'granted' satisfies ConsentValue,
  });
}

export async function revokeClarity(): Promise<void> {
  if (!initialized) return;

  const Clarity = await getClarity();
  Clarity.consentV2({
    ad_Storage: 'denied',
    analytics_Storage: 'denied',
  });

  // Microsoft currently documents this older call specifically for erasing
  // existing Clarity cookies. Consent decisions still use Consent V2 above.
  Clarity.consent(false);
}
```

Microsoft recommends Consent V2 and plans to deprecate the older consent API. However, Microsoft's current Consent V2 page still documents `window.clarity('consent', false)` as the cookie-erasure action. Use it only for that documented erasure purpose, keep the comment, and recheck the vendor documentation during dependency upgrades. See [Clarity Consent API V2](https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-consent-api-v2).

### 7.5 Conditional Clarity component

```tsx
// src/components/privacy/MicrosoftClarity.tsx
'use client';

import {useEffect} from 'react';
import {enableClarity} from '@/lib/privacy/clarity';
import {useCookieConsent} from './CookieConsentProvider';

const projectId = process.env.NEXT_PUBLIC_MICROSOFT_CLARITY_PROJECT_ID;
const enabled =
  process.env.NEXT_PUBLIC_ENABLE_MICROSOFT_CLARITY === 'true';

export default function MicrosoftClarity() {
  const {isReady, preferences} = useCookieConsent();

  useEffect(() => {
    if (
      !enabled ||
      !projectId ||
      !isReady ||
      preferences?.analytics !== true
    ) {
      return;
    }

    let cancelled = false;

    void enableClarity(projectId).catch((error: unknown) => {
      if (!cancelled && process.env.NODE_ENV !== 'production') {
        console.error('Microsoft Clarity initialization failed', error);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [isReady, preferences?.analytics]);

  return null;
}
```

Production code should route initialization failures through the existing observability strategy without leaking visitor information. Do not log preference-cookie contents.

### 7.6 Withdrawal action

The provider's save action must compare the old and new preferences:

```ts
const wasEnabled = previous?.analytics === true;
const willBeEnabled = next.analytics === true;

writeConsentCookie(next);
setPreferences(next);

if (wasEnabled && !willBeEnabled) {
  await revokeClarity();
  window.location.reload();
}
```

Reloading is intentional. An external script cannot be reliably “un-downloaded” from the current document. After reload, the provider reads the rejected preference and the Clarity module is not imported or initialized.

The preference change stops future HVA collection. It does not selectively erase historical Microsoft records. Explain the rights limitation in the privacy process.

### 7.7 Mounting in the locale layout

Mount the provider inside `NextIntlClientProvider` so all banner/dialog copy can use `next-intl`. A representative order is:

```tsx
<NextIntlClientProvider messages={messages}>
  <CookieConsentProvider>
    <JsonLd data={organizationSchema} />
    <JsonLd data={websiteSchema} />
    <JsonLd data={navigationSchema} />
    <TranslationAvailabilityProvider>
      <Layout>{children}</Layout>
    </TranslationAvailabilityProvider>
    <EmployeeHashScroller />
    <MicrosoftClarity />
    <CookieBanner />
    <CookiePreferencesDialog />
    {process.env.VERCEL === '1' && <Analytics />}
  </CookieConsentProvider>
</NextIntlClientProvider>
```

The exact composition may differ, but there must be one provider for the entire locale tree and one Clarity component.

### 7.8 Why not paste the tag into `<head>`?

A static script in `<head>` runs before the custom consent state is known. That is incompatible with the strict HVA design. Do not paste Microsoft's generic snippet into `layout.tsx`, `head.tsx`, a tag manager, or `instrumentation-client.ts`.

If the official package is not used, use `next/script` conditionally **after** analytics consent. Next.js identifies `afterInteractive` as suitable for analytics and `lazyOnload` for low-priority background scripts. See the [Next.js Script component](https://nextjs.org/docs/app/api-reference/components/script) and [scripts guide](https://nextjs.org/docs/app/guides/scripts). Never render the Script component at all on the undecided/rejected path.

### 7.9 When to use a real CMP instead

The custom HVA provider is reasonable for one optional analytics vendor and no advertising. Adopt an established Consent Management Platform before the scope expands to:

- multiple analytics/marketing vendors;
- Microsoft Ads or Google Ads;
- IAB Transparency and Consent Framework strings;
- regional vendor lists;
- server-side consent evidence/audit logs;
- consent syncing across domains;
- many independently managed trackers;
- formal proof-of-consent requirements the custom cookie cannot satisfy.

If a CMP is adopted, follow the CMP's Microsoft Clarity integration and map analytics and advertising independently. Microsoft explicitly warns CMPs not to grant both purposes when the visitor accepted only one. See the [Clarity CMP Integration Guide](https://learn.microsoft.com/en-us/clarity/setup-and-installation/cmp-integration-guide).

## 8. Implementation sequence

Follow this order. Do not enable tracking halfway through it.

### Phase 1 — legal and vendor preparation

1. Confirm the controller identity and privacy contact.
2. Confirm HVA is not using Microsoft Ads.
3. Review current Microsoft terms, roles, retention, storage, and transfer safeguards.
4. Confirm CNDP notification/declaration/authorization and foreign-transfer requirements.
5. Decide the consent duration and policy wording.
6. Archive the decision record.

### Phase 2 — localized policy content

1. Draft English and French cookie-banner copy.
2. Draft an HVA Cookie Policy or full cookie table.
3. Update English and French privacy-policy content.
4. Update English and French legal notices.
5. Add the persistent footer settings label.
6. Have all copy legally reviewed.

### Phase 3 — code with tracking disabled

1. Add the consent namespace to both locale message files.
2. Build the versioned consent helper.
3. Build provider, banner, dialog, and footer settings button.
4. Add unit and accessibility tests.
5. Install the official Clarity SDK.
6. Add the isolated Clarity helper and component.
7. Add environment placeholders with the enable flag false.
8. Update the CSP.
9. Add network/cookie E2E tests.

### Phase 4 — Clarity project safety

1. Create the production project.
2. Set Consent Mode/defaults to denied.
3. Set masking to Strict.
4. Block internal IPs.
5. Do not connect advertising.
6. Use a test project for QA.

### Phase 5 — production release

1. Deploy all consent controls and policy changes while Clarity remains disabled.
2. Verify the public policy and footer settings controls.
3. Complete final legal approval.
4. Add the production project ID in Vercel.
5. Enable Clarity only in Production.
6. run the full clean-browser consent matrix.
7. Inspect sample recordings for masking before allowing normal analytics use.

## 9. Clarity masking and data-minimization rules

Microsoft says masked content is not uploaded to Clarity. Inputs and dropdowns are masked in every mode, and masking-setting changes are not retroactive. See [Masking Content](https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-masking).

### 9.1 Start strict

- Start with Strict masking.
- Review safe public pages and recordings.
- Move to Balanced only if the company can justify the extra visibility and a privacy reviewer approves it.
- Never use Relaxed as an unreviewed default.
- Never unmask a contact form.

### 9.2 Explicitly mask sensitive regions

Add `data-clarity-mask="true"` to the outer container of:

- the contact form;
- form validation and confirmation messages;
- any future authenticated/client area;
- any element that might render an email, telephone number, form payload, account reference, or customer-specific content;
- any preview/admin-only UI accidentally served on the public domain.

Example:

```tsx
<section data-clarity-mask="true" aria-labelledby="contact-heading">
  <ContactForm />
</section>
```

### 9.3 Do not put sensitive data where masking may miss it

Never expose personal data in:

- URLs or query parameters;
- route slugs;
- CSS generated content;
- data attributes;
- element IDs or class names;
- analytics events;
- Clarity custom tags;
- console output.

Microsoft specifically notes that CSS-generated content is not protected by DOM masking in the same way. Keep personal data out of CSS content entirely.

### 9.4 Do not identify visitors

Do not call Clarity's identify API for HVA public visitors. Do not send Sanity IDs, contact-form details, calendar-booking data, CRM lead identifiers, or hashed emails. Hashing an email does not automatically make it anonymous.

### 9.5 Review recordings safely

- Limit portal access to staff who need it.
- Do not download/share recordings casually.
- Do not use recordings for employee performance monitoring.
- Do not label recordings with personal data.
- Create a short internal handling rule.
- Revoke access promptly when a person changes roles.
- Audit project members quarterly.

## 10. Cookies and similar technologies inventory

The policy must cover cookies **and similar technologies**, including local storage, pixels, tags, and device storage/access. Do not title a policy “Cookies” and omit equivalent tracking technology.

### 10.1 HVA necessary preference cookie

| Field | Value |
| --- | --- |
| Name | `hva_consent_v1` |
| Provider | Hive Vault Arc |
| Type | First-party, strictly necessary preference cookie |
| Purpose | Stores the visitor's optional analytics choice and consent schema version |
| Data | Version, analytics boolean, advertising false, decision timestamp |
| Lifetime | 180 days, subject to legal approval |
| Set before optional consent? | Yes, only after a consent choice, to remember that choice |
| Contains PII? | No |

If the visitor never chooses, do not set a “consent” value that pretends they rejected or accepted. Keep them undecided and keep Clarity unloaded.

### 10.2 Clarity cookies documented by Microsoft

Microsoft currently documents these names in [Clarity Cookies](https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-cookies):

| Name | Documented purpose | Type |
| --- | --- | --- |
| `_clck` | Persists the site-specific Clarity user ID and preferences | First-party |
| `_clsk` | Connects multiple page views into one Clarity session recording | First-party |
| `CLID` | Identifies the first time Clarity saw the browser on a site using Clarity | Third-party |
| `ANONCHK` | Indicates whether MUID is transferred to ANID; Microsoft says Clarity does not use ANID and the flag is 0 | Third-party |
| `MR` | Indicates whether MUID should be refreshed | Third-party |
| `MUID` | Identifies unique browsers visiting Microsoft sites for advertising, site analytics, and operational purposes | Third-party |
| `SM` | Synchronizes MUID across Microsoft domains | Third-party |

Under Consent Mode, Microsoft currently maps `_clck` and `_clsk` to analytics storage and MUID to advertising storage. HVA must keep advertising storage denied.

Microsoft's current cookie overview does not provide a duration for every listed cookie. Do not invent fixed lifetimes in the public policy. Before publishing the final table:

1. accept analytics in a clean production browser;
2. inspect Application → Cookies for the HVA and Microsoft domains;
3. record the observed expiration/session status;
4. compare it with the then-current Microsoft documentation;
5. publish the observed/vendor-defined duration with a “vendor may update” review process.

### 10.3 Vercel analytics

Keep Vercel Web Analytics in the inventory even when it sets no cookie. The current HVA policy states that it uses anonymized aggregated data without a persistent identifier. Revalidate that statement against the current Vercel service configuration and documentation during the same audit.

### 10.4 Run a real production inventory

The source code is not the complete inventory. Browser behavior, hosting, embedded media, CDN changes, calendar links, social embeds, and future packages can add storage or requests.

Audit at minimum:

- fresh incognito visit before choice;
- reject path;
- analytics accept path;
- English and French routes;
- homepage, contact, case study, insight, and legal pages;
- mobile browser;
- after changing preferences;
- after a Vercel production deployment.

Record every cookie/storage key, provider, host, purpose, type, expiration, and consent category.

## 11. Privacy policy, legal notice, and cookie-policy changes

### 11.1 Existing statements that must change

The current English and French messages say no analytics/advertising cookies are used. Before activation, update every relevant field in both files:

| Message area | Required update |
| --- | --- |
| `Privacy.collection.analytics` | Add Clarity rendering/interaction data, masked session replay, heatmaps, device/browser and approximate location information; retain a distinct Vercel entry |
| `Privacy.purposes` | Add usability analysis and site optimization; do not add advertising if it is disabled |
| `Privacy.legalBasis` | Add consent for optional Clarity analytics/cookies; do not group Clarity under cookieless legitimate interest |
| `Privacy.cookies` | Replace “no analytics cookies” with accurate opt-in behavior and settings/withdrawal information |
| `Privacy.retention` | Add Clarity retention categories and the HVA consent preference lifetime |
| `Privacy.sharing.recipients` | Add the correct Microsoft entity and Clarity purpose |
| `Privacy.sharing.closing` | Ensure “no advertising sharing” remains true only while `ad_Storage` is denied and no ads integration exists |
| `Privacy.transfers` | Add Microsoft/Azure transfer facts and the actual safeguards approved by counsel/CNDP |
| `Privacy.rights` | Explain withdrawal and how to contact HVA; document Clarity deletion limitations internally |
| `Legal.cookies` | Replace the current “does not use analytics cookies” statement |
| Policy date | Update the effective/last-modified date |

Do not enable Clarity while even one published locale still says it is absent.

### 11.2 Dedicated Cookie Policy

Create a localized `/cookie-policy` route, or expand the Privacy Policy with an equivalently complete section. A dedicated route is easier to maintain and link from the banner.

It should include:

- what cookies and similar technologies are;
- controller identity and privacy contact;
- necessary HVA preference cookie;
- Microsoft Clarity description;
- separate analytics and advertising purposes;
- explicit statement that advertising storage is denied/not used;
- cookie/storage table;
- data categories;
- provider and Microsoft privacy link;
- retention;
- international transfers;
- how to accept, reject, and reopen settings;
- effect of rejection (site continues; Clarity features unavailable);
- policy version/effective date;
- CNDP receipt/authorization wording once confirmed.

### 11.3 Draft Clarity privacy paragraph

This is a starting draft, not approved legal text:

> With your consent, Hive Vault Arc uses Microsoft Clarity to understand how visitors interact with this website through behavioral measurements, masked session recordings, and heatmaps. Clarity may process page and device information and interactions such as page rendering, clicks, pointer movement, and scrolling. When analytics consent is granted, Clarity may use first-party analytics cookies to connect page views into sessions. Advertising storage and sharing with Microsoft Advertising are disabled. You may reject or withdraw analytics consent at any time through Cookie settings without losing access to the website. Microsoft processes information under its applicable terms and privacy statement.

Link “Microsoft privacy statement” to [Microsoft's current Privacy Statement](https://www.microsoft.com/privacy/privacystatement).

Do not copy Microsoft's generic sample sentence “By using our site, you agree…” into an opt-in implementation. Continued site use is not the affirmative consent model HVA is adopting. Tailor the disclosure to the real consent flow. Microsoft's [privacy disclosure guidance](https://learn.microsoft.com/en-us/clarity/setup-and-installation/privacy-disclosure) explicitly says its sample must be tailored.

### 11.4 Clarity retention to disclose

Microsoft currently documents:

- click/aggregated page data: 9 months;
- playback/session recording data: 30 days;
- labeled or favorited sessions: 9 months;
- heatmap data: 9 months;
- deletion from servers/backups after the retention period.

Verify the current [Clarity Data Retention](https://learn.microsoft.com/en-us/clarity/setup-and-installation/data-retention) page at implementation time.

## 12. Security and Content Security Policy

### 12.1 Current HVA CSP impact

The current `next.config.ts` has directive-specific rules, including:

```text
script-src 'self' 'unsafe-inline' 'unsafe-eval' https://va.vercel-scripts.com
connect-src 'self' https:
img-src 'self' data: blob: https:
```

`script-src` will block Clarity until Microsoft domains are allowed. Microsoft's [Clarity CSP guidance](https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-csp) identifies `https://*.clarity.ms` and `https://c.bing.com` as required domains and notes that Clarity load-balances across lettered Clarity hosts.

For HVA's directive-specific policy, update only the directives actually required, for example:

```ts
"script-src 'self' 'unsafe-inline' 'unsafe-eval' https://va.vercel-scripts.com https://www.clarity.ms https://*.clarity.ms",
"connect-src 'self' https: https://*.clarity.ms https://c.bing.com",
```

Because the current `connect-src` already allows all HTTPS endpoints, adding named hosts there does not tighten it. A later security task should consider reducing broad `https:` allowances, but do not combine that unrelated hardening with the initial analytics release unless it is fully tested.

Do not add a new `unsafe-inline` or broaden `default-src` merely by copying Microsoft's generic CSP example. HVA already has a more specific policy. Use browser console errors and production network traces to determine the minimum required domains.

### 12.2 Other security requirements

- Keep the Clarity package version reviewed and committed in `package-lock.json`.
- Use the official `@microsoft/clarity` package, not an unmaintained React wrapper.
- Never place secrets in `NEXT_PUBLIC_*` values.
- Do not proxy or rewrite Clarity requests to disguise their destination.
- Do not suppress CSP errors without understanding them.
- Restrict Clarity account access and enable MFA.
- Document who can view recordings.
- Do not expose the consent cookie to server authorization logic.

## 13. Performance rules

Clarity is third-party JavaScript. Microsoft calls it asynchronous, but any third-party script still creates network, parsing, execution, and privacy costs. HVA's implementation must preserve the current fast rejected path.

Rules:

- Dynamically import `@microsoft/clarity` only after analytics consent.
- Never import it at the top level of the global layout or provider.
- Do not preconnect to Clarity before consent; a preconnect itself communicates with a third party.
- Do not add Clarity domains to `<head>` as `preconnect`/`dns-prefetch` for all visitors.
- Do not load in Vercel Preview or local development by default.
- Keep the consent UI lightweight; no animation or modal library is needed solely for it.
- Avoid a server `cookies()` dependency in the global layout unless the caching tradeoff is deliberately accepted.
- Run Lighthouse/Web Vitals on accept and reject paths separately.
- Track bundle changes and confirm the Clarity package is absent from initial page JavaScript for rejected visitors.
- If using `next/script` rather than the package, conditionally render it after consent and use `afterInteractive` or `lazyOnload`; never `beforeInteractive` for this custom opt-in flow.

The rejection path should have essentially the same performance as the website before Clarity, apart from the small HVA consent component.

## 14. Testing plan

### 14.1 Unit tests

Test `consent.ts`:

- valid current-version cookie parses;
- malformed JSON returns null;
- missing fields return null;
- wrong version returns null;
- advertising true is rejected by the initial schema;
- write includes `Path=/`, `SameSite=Lax`, expected max age, and `Secure` on HTTPS;
- no browser globals are accessed during server rendering.

Test the provider:

- starts as loading, then undecided when no cookie exists;
- stored rejection does not call `enableClarity`;
- stored acceptance calls it once;
- accept saves analytics true/advertising false;
- reject saves analytics false/advertising false;
- withdrawal calls revocation before reload;
- locale navigation does not reset the preference;
- old consent version reopens the banner.

### 14.2 Component and accessibility tests

- Banner appears only when undecided.
- Reject, Customize, and Accept are all reachable by keyboard.
- Reject and Accept are visible without horizontal scrolling.
- Settings button reopens the dialog.
- Necessary is shown on and cannot be disabled.
- Analytics starts off.
- Closing without saving does not grant consent.
- Focus enters and leaves the dialog correctly.
- Labels and descriptions are announced.
- English and French messages have matching keys.
- Long French text works at mobile widths and 200% zoom.

### 14.3 Playwright network and cookie matrix

Automate at least these scenarios in a clean context:

| Scenario | Expected Clarity request | `_clck` / `_clsk` | HVA preference cookie |
| --- | --- | --- | --- |
| Fresh visit, no choice | None | Absent | Absent |
| Reject optional | None | Absent | Present, analytics false |
| Reload after reject | None | Absent | Present, analytics false |
| Accept analytics | Present | Present when Consent Mode works | Present, analytics true |
| Reload after accept | Present | Present | Present, analytics true |
| Withdraw analytics | Consent denied/erase then reload | Removed | Present, analytics false |
| Navigate EN → FR | Follows saved state | Follows saved state | Same first-party cookie |

Intercept or inspect:

- `https://www.clarity.ms/**`;
- `https://*.clarity.ms/**`;
- `https://c.bing.com/**`;
- cookies on `hivevaultarc.com` and relevant Microsoft domains.

When running automated tests, use a test project and block outbound collection where possible. The objective is consent behavior, not sending test sessions to the production portal.

### 14.4 Manual browser tests

Use a fresh Incognito/InPrivate window and DevTools:

1. Clear cookies and site data.
2. Open Network before navigating.
3. Load the homepage.
4. Search Network for `clarity`, `bing`, and `collect`.
5. Confirm no request before consent.
6. Inspect Application → Cookies and Local Storage.
7. Reject; reload; navigate several pages; confirm Clarity is still absent.
8. Clear site data; accept analytics.
9. Confirm the script/collection requests and expected cookies.
10. Confirm advertising is denied and no Microsoft Ads integration is active.
11. Reopen settings; withdraw; confirm cookies are removed and no future Clarity load occurs after reload.
12. Repeat on `/fr` and a localized inner route.
13. Test Safari/WebKit, Firefox, Chromium, and a mobile browser.
14. Test with tracking protection and an ad blocker; the site must continue working if Clarity fails.
15. Check the browser console for CSP, hydration, and SDK errors.

### 14.5 Masking review

With approved test data only:

- submit the contact form using obviously fake values;
- review the recording;
- confirm input values, validation messages, and confirmation content are not readable;
- inspect headers/navigation for accidental contact values;
- inspect query strings and URLs;
- confirm no email/phone/CRM ID appears in tags or recordings;
- do not activate normal collection if any sensitive value is visible.

Masking changes are not retroactive. Delete the test project if a serious test disclosure occurs; Microsoft says individual-user deletion is not available.

### 14.6 Reporting behavior

After an accepted test:

- confirm a session appears in the correct test/production project;
- confirm page titles and locale routes are legible;
- confirm SPA/App Router navigation produces expected page views;
- confirm recordings do not show private content;
- confirm internal traffic exclusion works;
- confirm rejected users do not appear because HVA uses strict gating.

Do not “fix” missing rejected-user funnels by loading cookieless Clarity without updating this architecture and its legal disclosure.

## 15. Deployment and verification

### 15.1 Safe release order

1. Merge policy, banner, settings, tests, CSP, and inactive Clarity code.
2. Deploy with `NEXT_PUBLIC_ENABLE_MICROSOFT_CLARITY=false`.
3. Verify the production banner and policies.
4. Complete legal/CNDP approval.
5. Configure project ID in Vercel Production.
6. Set the Production enable flag to true.
7. Deploy.
8. Run the clean-browser matrix immediately.
9. If any tracking occurs before consent, disable the flag and redeploy/rollback.
10. Review the first approved recordings for masking.

### 15.2 Do not enable from local `.env` alone

The deployment source of truth is Vercel's environment configuration. A local value does not prove Production is configured, and a Production value should not leak into Preview. Verify all three Vercel scopes explicitly.

### 15.3 Post-release evidence

Store:

- release commit and date;
- screenshots of English/French banner and settings;
- clean-browser request/cookie evidence for reject and accept;
- policy version and legal approval;
- Clarity project settings screenshot (Consent Mode, masking, admins, Ads disconnected);
- CNDP receipt/authorization references;
- transfer/contract review record;
- Playwright and build results;
- rollback owner.

## 16. Ongoing governance

### Monthly

- Inspect a sample of recordings for masking regressions.
- Check that contact forms and new components remain masked.
- Check the Clarity project for unfamiliar admins/integrations.
- Confirm internal traffic is not distorting reports.

### Quarterly

- Audit all cookies/storage in production.
- Review Microsoft and Vercel subprocessor/terms changes.
- Review Clarity portal access.
- Confirm advertising remains disconnected.
- Recheck consent behavior in current browsers.
- Confirm policy tables match observed cookies and retention.

### Before every new third-party script

- record the vendor and purpose;
- decide its consent category;
- review contracts/transfers;
- update policies;
- update CSP;
- increment consent version if the purpose/vendor changes;
- re-prompt visitors where required;
- add tests before enabling.

### When the policy or purpose changes

Increment:

```ts
export const CONSENT_VERSION = 2 as const;
export const CONSENT_COOKIE_NAME = 'hva_consent_v2';
```

Treat the previous cookie as stale, show the new explanation, and obtain a new choice. Do not silently migrate a previous “analytics” yes into consent for advertising or a materially different vendor use.

## 17. Common mistakes

Do not:

- paste Clarity into `<head>` before building consent;
- treat scrolling or continued use as consent;
- set analytics on by default;
- hide rejection behind a second screen;
- make Accept much more visually prominent than Reject;
- call `Clarity.consentV2()` without explicit values;
- grant `ad_Storage` merely because analytics was accepted;
- call Clarity before project Consent Mode is configured;
- claim “no cookies” while `_clck`/`_clsk` are set;
- claim “no data” when using denied-consent cookieless mode;
- assume Microsoft's compliance statement makes HVA automatically compliant;
- identify visitors using email, phone, CRM ID, or form data;
- rely only on automatic input masking;
- add a preconnect to Clarity before consent;
- load the production project on localhost or Preview;
- forget the French policy/banner;
- use local storage as an undocumented tracking mechanism;
- omit the footer settings/withdrawal action;
- manually delete only first-party Clarity cookies and assume third-party/vendor state is handled;
- promise per-user Clarity deletion that Microsoft does not currently provide;
- enable Microsoft Advertising without a new purpose, category, policy, and consent;
- invent cookie expiration values instead of checking the live browser/vendor documentation;
- enable the production flag before CNDP/legal and masking approval.

## 18. Definition of done

Clarity is ready only when every box is checked.

### Governance

- [ ] Controller and privacy contact confirmed.
- [ ] Current Microsoft terms/privacy statement reviewed.
- [ ] Roles, DPA/contract, and international transfers documented.
- [ ] CNDP declaration/authorization requirements completed or formally confirmed.
- [ ] Advertising disabled and decision recorded.
- [ ] Data-subject request process accounts for Clarity deletion limitations.

### Content

- [ ] English banner and settings approved.
- [ ] French banner and settings approved.
- [ ] Privacy Policy updated in both locales.
- [ ] Legal notice updated in both locales.
- [ ] Cookie Policy/table published in both locales.
- [ ] Microsoft Privacy Statement linked.
- [ ] Cookie settings action present in the footer.
- [ ] Current effective dates and CNDP references shown.

### Clarity project

- [ ] Company-controlled project and two admins.
- [ ] MFA enabled.
- [ ] Consent Mode/default denied configured.
- [ ] Strict masking configured and reviewed.
- [ ] Internal IPs excluded.
- [ ] Microsoft Advertising not connected.
- [ ] Production and test projects separated.

### Code

- [ ] Versioned necessary preference cookie.
- [ ] Analytics off by default.
- [ ] Clarity dynamically imported only after consent.
- [ ] `ad_Storage` always denied.
- [ ] Withdrawal denies consent, erases cookies, and reloads.
- [ ] No Clarity call in head, server layout, or instrumentation client.
- [ ] CSP updated minimally.
- [ ] Production-only environment flag.
- [ ] Contact and sensitive regions explicitly masked.
- [ ] No visitor-identification API.

### Tests

- [ ] Unit tests pass.
- [ ] Accessibility tests pass.
- [ ] Playwright consent matrix passes.
- [ ] No Clarity request/cookie before consent.
- [ ] Reject path stays free of Clarity requests/cookies.
- [ ] Accept path initializes analytics with ads denied.
- [ ] Withdrawal removes cookies and prevents reload initialization.
- [ ] Locale navigation preserves preference.
- [ ] CSP has no production errors.
- [ ] Masking review shows no sensitive data.
- [ ] Performance comparison is acceptable.
- [ ] Build, lint, and relevant site tests pass.

## 19. Primary sources

The links below were checked while preparing this guide. Recheck them before implementation because vendor guidance and law change.

### Microsoft Clarity

- [Consent Management](https://learn.microsoft.com/en-us/clarity/setup-and-installation/consent-management)
- [Clarity Consent API V2](https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-consent-api-v2)
- [Clarity Cookies](https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-cookies)
- [CMP Integration Guide](https://learn.microsoft.com/en-us/clarity/setup-and-installation/cmp-integration-guide)
- [Privacy Disclosure Guidance](https://learn.microsoft.com/en-us/clarity/setup-and-installation/privacy-disclosure)
- [Masking Content](https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-masking)
- [Data Retention](https://learn.microsoft.com/en-us/clarity/setup-and-installation/data-retention)
- [Reporting Without Cookie Consent](https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-without-cookie-consent)
- [Clarity Content Security Policy](https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-csp)
- [Blocking IP Addresses](https://learn.microsoft.com/en-us/clarity/setup-and-installation/ip-exclusion)
- [Clarity FAQ](https://learn.microsoft.com/en-us/clarity/faq)
- [Official `@microsoft/clarity` package](https://www.npmjs.com/package/@microsoft/clarity)
- [Microsoft Privacy Statement](https://www.microsoft.com/privacy/privacystatement)
- [Clarity Terms](https://clarity.microsoft.com/terms)

### Next.js

- [Next.js Script Component](https://nextjs.org/docs/app/api-reference/components/script)
- [Next.js Scripts Guide](https://nextjs.org/docs/app/guides/scripts)
- [Next.js Production Checklist](https://nextjs.org/docs/app/guides/production-checklist)

### Morocco

- [CNDP Website Compliance Guidance](https://www.cndp.ma/conformite-des-sites-web/)
- [CNDP Notification Procedures](https://www.cndp.ma/procedures-de-notification-process/)
- [Moroccan Law 09-08](https://www.cndp.ma/images/lois/Loi-09-08-Fr.pdf)
- [CNDP Délibération D-939-2025 — simplified terminal-cookie declaration model](https://www.cndp.ma/wp-content/uploads/2025/12/Deliberation-N%C2%B0-D-939-2025-du-28112025-relative-au-modele-de-declaration-simplifiee-relative-au-traitement-des-donnees-a-caractere-personnel-de-cookies-sur-un-terminal.pdf)

### EU and UK

- [EDPB Guidelines 05/2020 on Consent](https://www.edpb.europa.eu/documents/guideline/guidelines-052020-on-consent-under-regulation-2016679_en)
- [CNIL — Refusing Cookies Should Be as Easy as Accepting Them](https://www.cnil.fr/en/refusing-cookies-should-be-easy-accepting-them-cnil-continues-its-action-and-issues-new-orders)
- [ICO Guidance on Storage and Access Technologies](https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/guidance-on-the-use-of-storage-and-access-technologies/)
- [GDPR text on EUR-Lex](https://eur-lex.europa.eu/eli/reg/2016/679/oj)

---

## Final operational rule

The Clarity production flag stays `false` until the company can prove all of the following at the same time:

1. the notices are accurate in every published locale;
2. the required CNDP/legal work is complete;
3. Clarity cannot load before analytics consent;
4. rejection works without degrading the site;
5. advertising storage remains denied;
6. withdrawal is available from every page;
7. sensitive content is masked;
8. the clean-browser request and cookie evidence passes.

If any of those conditions later becomes false, disable Clarity first and investigate second.
