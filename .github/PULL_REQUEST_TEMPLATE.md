## Summary

Describe the user-visible change and why it is needed.

## Branch flow

- Feature work targets `staging`.
- `staging` is the shared review and integration branch.
- Only reviewed, green `staging` changes move to `main`.

## Verification

- [ ] `npm run lint`
- [ ] `npm test`
- [ ] `npm run i18n:validate -- fr`, `-- es`, and `-- ar` when copy or routes changed
- [ ] `npm run check:webp` when images changed
- [ ] `npm run build`
- [ ] Desktop and mobile paths affected by this change were checked

## Review notes

List migrations, environment-variable changes, CMS changes, redirects, analytics events, or rollback concerns.
