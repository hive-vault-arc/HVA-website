# HVA development workflow

This repository is a writable working copy of the supplied OneDrive export.
`main` records the original export baseline. All changes are committed to `dev`.
Origin: https://github.com/hive-vault-arc/HVA-website.git
Requested integration base: develop-nextjs-migration.
Nothing has been pushed or deployed; remote history is not yet verified.

A tracked pre-push hook permits only `dev` -> `dev` updates. The repository is
configured with `core.hooksPath=.githooks` and `push.default=current`.
When cloning this repository elsewhere, enable the tracked hook again:

```powershell
git config core.hooksPath .githooks
```

Once the correct remote URL is known, inspect its branch history before connecting
this newly initialized repository. If it already contains history, port the changes
onto a dev branch of that history; do not force-push or replace it. Confirm that
Vercel uses another branch for production before pushing dev. Use preview deployments
for validation and merge to production only when explicitly requested.

Continue work with the checklist in plans/SPRINTS.md. Browser verification and
recovery of missing source assets are still pending.

Remote inspection attempted on 2026-10-28. Git transport failed with
`getaddrinfo() thread failed to start`; GitHub connection is needed to continue.
Do not push this independently initialized history. First fetch/inspect the existing
migration branch, create dev from it, and port the optimization commits with review.

The GitHub connection now permits repository reads. Remote baseline verified at
bc6b7423aa741d039699e15dd176303c65cd486c; only plans/README.md differs from the
original local snapshot. Creating remote dev returned 403 (Resource not accessible
by integration). No remote write succeeded. Repository Contents write permission
is needed. Vercel production settings remain unverified.
