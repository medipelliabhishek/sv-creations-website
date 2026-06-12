# SV Creations — Architecture, Construction & Interiors

Website for **SV Creations**, an architecture studio that designs civil plans,
builds houses end to end and does complete home interiors.

Built with Next.js + Tailwind. No database — all content lives in JSON files
and images on disk, edited through the built-in editor at **`/admin`**.

## Editing the website (for the owner)

1. Open `https://<your-site>/admin` in a browser.
2. Upload project photos, edit any text (services, prices, about, contact…).
3. Press **Save changes** — edits are live immediately.

There is no login on `/admin` by design: the page is not linked anywhere on
the site and is excluded from search engines (`robots.txt` + noindex). Anyone
with the exact URL could edit the site, so don't share the `/admin` link.

## How content is stored

- Defaults ship in `content/site.json` and `content/contact.json`.
- Once edited via `/admin`, the live copies are written to `public/gallery/`
  (`site.json` / `contact.json`), alongside uploaded photos.
- On Railway, `scripts/start.sh` moves `public/gallery` onto the persistent
  volume mounted at `/data` (seeding it on first boot), so photos and edits
  survive restarts and redeploys. `src/app/gallery/[filename]/route.ts` serves
  photos uploaded after server boot, which Next's static scan doesn't know about.

If you change where the gallery or content files live, keep `scripts/start.sh`,
`src/lib/content.ts` and the fallback route in sync — otherwise images or
edits will silently disappear on the next redeploy.

## Local development

```bash
npm install
npm run dev
```

## Deploying

```bash
git add -A && git commit -m "..."
git push
npx @railway/cli@latest up --detach
```
