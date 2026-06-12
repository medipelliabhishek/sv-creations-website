# Project Context: SV Creations Architecture Website

A Next.js site for **SV Creations** — an architect who designs civil plans,
builds houses end to end and does interiors. Same architecture as the ADB
Events photography site (JSON content + `/admin` editor + Railway volume),
but a completely original UI theme (light "drafting paper" look, terracotta
accent, Fraunces/Manrope fonts, arch-shaped images, numbered sections).

## Live deployment

- URL: https://sv-creations-website-production.up.railway.app
  (no custom domain yet — buy one and add it in Railway when the client decides)
- GitHub: https://github.com/medipelliabhishek/sv-creations-website (branch `main`)
- Client: non-technical architect/builder — explain things in plain terms.

## Railway details (IMPORTANT: shares a project with the photography site)

The Railway **free plan refused a second project** ("resource provision
limit exceeded"), so this site runs as a **second service inside the
photography-website project**. Don't delete or "clean up" the other service —
it's the live adbevents.in site.

- Project: `photography-website` (id `512e072a-41b5-4654-94eb-d5ad58ef44b1`)
- Environment: `production` (id `9c8b49b4-8623-4039-9cdb-cf8602626ea4`)
- This service: `sv-creations-website` (id `27690d24-86a0-42f0-9df0-e41ffff5182c`)
- Volume: `sv-creations-website-volume` (id `31aab187-7632-4734-8c3d-4d2b944084c3`),
  mounted at **`/data`** (separate from the photography site's volume)
- Service domain id: created via `railway domain`, see URL above

## Deploying

The service is **connected to the GitHub repo** — every push to `main`
auto-builds and deploys on Railway. No `railway up` needed:

```bash
git add -A && git commit -m "..."
git push
```

### Railway auth gotchas (learned the hard way)

- The CLI session token expires; when CLI commands say "Unauthorized", run
  `npx @railway/cli@latest login --browserless` and have the user click the
  link.
- The `accessToken` in `~/.railway/config.json` works for GraphQL
  *management* calls (projectCreate, volumeCreate, domains) but is rejected
  by all *deploy*-class operations ("You must be logged in to deploy").
- Projects created via raw GraphQL with that token land outside the CLI's
  workspace and become undeployable — create projects/services with the CLI
  (`railway init` / `railway add`), use GraphQL only for queries and volumes.
- `railway volume add` (CLI v4) panics; create volumes via GraphQL
  `volumeCreate` instead.

## Persistence architecture (same as photography site — don't simplify)

- `scripts/start.sh` seeds `/data/gallery` from bundled `public/gallery` on
  first boot, then symlinks `public/gallery -> /data/gallery` before
  `next start`, so admin uploads + content edits survive redeploys.
- `src/app/gallery/[filename]/route.ts` serves files uploaded after boot
  (Next's static scan only runs once at startup).
- `/admin` saves `site.json`/`contact.json` into `public/gallery` (the
  volume); `content/*.json` are defaults only. See `src/lib/content.ts`.
- All content pages export `dynamic = "force-dynamic"` so admin edits show
  immediately.

## Content notes

- Gallery has 9 placeholder Unsplash architecture/interior photos
  (`project-01..09.jpg`) — the client should replace them via `/admin`.
- `content/contact.json` has placeholder phone/email/Instagram — get real
  details from the client and update via `/admin`.
- Site URL for sitemap/robots comes from `SITE_URL` env var, falling back to
  the Railway URL (`src/app/sitemap.ts`, `src/app/robots.ts`). When a custom
  domain is added, set `SITE_URL` on the Railway service.
