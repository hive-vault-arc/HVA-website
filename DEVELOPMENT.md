# HVA development workflow

Remote repository: https://github.com/hive-vault-arc/HVA-website.git
Development branch: dev, created from develop-nextjs-migration at
bc6b7423aa741d039699e15dd176303c65cd486c. Keep all work on dev.

The original local snapshot matched the migration tree except plans/README.md.
A separate local dev history holds the original sprint commits; GitHub browser
uploads preserve the existing remote migration history. Do not force-push the
independently initialized local history onto GitHub. Clone the remote dev branch
for future normal Git work once command-line networking is available.

The authenticated browser can write. The GitHub connection is read-only for Git
ref creation (403), and this session's Git CLI cannot reach GitHub. Browser uploads
are being used to transfer the tested changes. Main and the migration branch must
remain unchanged. Verify Vercel preview deployment before any production merge.

## Local push guard

The local working copy uses .githooks/pre-push with core.hooksPath=.githooks and
push.default=current. The guard allows only dev -> dev pushes. When setting up a
new clone, install an executable copy of that hook and configure hooksPath before
pushing. Browser commits are not governed by local Git hooks; always inspect the
selected branch before committing.

See plans/SPRINTS.md for progress and remaining validation. Production-branch
settings in Vercel have not yet been inspected; no production merge is authorized.

## Synchronization result

The tested source tree is now synchronized on remote dev and both Vercel preview
checks pass. Source verification is recorded in plans/github-sync-verification.json.
Browser visual checks still require Vercel login. Original OneDrive files remain
unchanged. Clone the remote dev branch to continue with the real Git history.

The browser-created hook has file mode 100644. On a new clone, make it executable
and configure the hook before pushing:

```sh
chmod +x .githooks/pre-push
git config core.hooksPath .githooks
git config push.default current
```

On Windows, use Git Bash for the chmod command. Local Git hooks do not control
GitHub browser commits, which must always explicitly target dev.
