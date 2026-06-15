# Exterior Configurator (MVP)

Design a property's exterior renovation in a car-configurator–style UI, then
save the selection as a structured "scoped job" that becomes a contractor lead.

- **Buyer configurator** — render on the left, tappable swatches/arrows on the
  right (siding, siding color, roof, shutters, trim, garage, landscaping). Tap an
  option and the render updates instantly (pre-generated layers, no per-tap AI).
- **Operator tool** — create a property and generate its render variants.
- **Phase 2 (scaffolded)** — `Contractor` / `Lead` / `User` tables exist so a
  saved configuration can later be routed to a local contractor.

## Stack

- **Web:** React + TypeScript + Vite + Tailwind (mobile-first) — `apps/web`
- **API:** Node + Express + TypeScript — `apps/api`
- **DB:** Postgres via Prisma — `apps/api/prisma/schema.prisma`
- **Shared types:** `packages/shared`
- **Renders:** swappable `RenderProvider`. Ships with a **mock** provider that
  generates placeholder layers (no API key). Replicate/Stability drop in later.

## Run it locally

```bash
# 1. Start Postgres (or point DATABASE_URL at your own)
docker compose up -d

# 2. Configure env
cp .env.example .env            # API reads apps/api/.env or root .env

# 3. Install
npm install

# 4. Create schema + seed catalog + a ready-to-demo property
npm run db:migrate              # first run: name the migration "init"
npm run db:seed

# 5. Run API (:4000) and web (:5173)
npm run dev
```

Open http://localhost:5173 — the seeded **Demo — 12 Maple St** property is ready
to configure. Use the **Operator tool** to add your own property and generate its
variants.

> The API loads env from `apps/api/.env`. The repo's `.env.example` lives at the
> root for reference; copy it to `apps/api/.env` (or export the vars) so Prisma
> and the server see `DATABASE_URL`.

## Swapping in a real render provider

The mock provider just writes SVG overlays. To use a geometry-preserving image
model (img2img / ControlNet so the house structure is preserved and only the
targeted element changes):

1. Add `apps/api/src/render/replicateProvider.ts` implementing `RenderProvider`
   (`render(req) => { imageUrl }`), uploading the result via `storage.save`.
2. Register it in `apps/api/src/render/index.ts`.
3. Set `RENDER_PROVIDER=replicate` and the provider's API key in `.env`.

Nothing else changes — the job queue, storage, DB, and UI are provider-agnostic.

## Deploy targets

- Web → Vercel. API → Railway/Render (long-running). DB + storage → Supabase
  (swap `LocalStorage` in `apps/api/src/storage/storage.ts` for Supabase
  Storage and have `save` return the public URL).
