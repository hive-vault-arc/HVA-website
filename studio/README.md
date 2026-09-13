# Hive Vault Arc Content Studio

This Sanity Studio is part of the company website repository but installs and deploys independently.

```text
npm ci --prefix studio
npm run studio:dev
npm run studio:verify
npm run studio:build
```

Deployment must use the company-controlled Sanity account:

```text
npm run studio:deploy
```

Do not deploy or run a dataset mutation while authenticated with a personal account. See [`../docs/sanity-content-program.md`](../docs/sanity-content-program.md) for localization, evidence, migration, release, and verification rules.
