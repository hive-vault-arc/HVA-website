# Company-account release runbook

All website administration must use organization-controlled identities. Do not use a personal GitHub, Vercel, Google, analytics, Search Console, DNS, or outreach account as an operating shortcut.

## 1. Company Vercel project

1. Confirm the project belongs to the Hive Vault Arc organization/team.
2. Set Production only: `NEXT_PUBLIC_SITE_URL=https://hivevaultarc.com`.
3. Confirm Production contains the company-owned GA4 measurement ID in `NEXT_PUBLIC_GA_MEASUREMENT_ID` and the approved Clarity settings.
4. Keep Preview deployments out of production reporting and protect them from public indexing.
5. Redeploy the reviewed company GitHub commit. The production build now fails when the canonical URL is not the apex domain.
6. Confirm all known aliases redirect in one hop to the same apex path.

## 2. Company Search Console ownership

1. Sign in with the company Google account.
2. Add `sc-domain:hivevaultarc.com` and choose DNS verification.
3. Add the generated TXT record in the company-controlled DNS account; never store the token in this repository.
4. Confirm the company account appears as an Owner and record a company recovery owner in the private credential register.
5. Submit only `https://hivevaultarc.com/sitemap.xml`.
6. Export current Page indexing issue groups and 16-month, 90-day, and 28-day query/page data into company-controlled storage.
7. Inspect the homepage, capabilities index, one commercial service, one approved case, and one recent insight.

## 3. GA4 and Search Console link

1. In GA4 Admin, use a company account with Editor access.
2. Open Product links → Search Console Links → Link.
3. Select the verified `hivevaultarc.com` domain property and the production web stream.
4. Submit and verify Organic Search Queries and Organic Search Traffic reports.
5. Mark `generate_lead` as a key event only after DebugView and Realtime confirm the production trigger once and without personal parameters.

## 4. Production verification

Run:

```powershell
npm run audit:seo -- --base https://hivevaultarc.com
```

Then verify in a clean browser for each locale root:

- no decision or reject: no GA4 or Clarity requests and no analytics cookies;
- accept cookies: one GA4 configuration and one Clarity initialization;
- one client-side route transition: one history-based page view, with no manual duplicate page-view code;
- revoke: analytics state is denied and known analytics cookies are expired.

After the smoke test passes, submit only materially changed canonical URLs through IndexNow. Archive the report, Search Console exports, and consent evidence with the release record.
