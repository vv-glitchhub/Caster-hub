# Caster OS

Caster OS is a premium AI operating system prototype for decisions, markets and personal intelligence.

It is not just a landing page. It is a connected product demo that brings together a dashboard, AI agent, system health, product modules, business story, pricing concept and launch-ready trust pages.

## Status

**Public Alpha**

Caster OS is ready for public preview, feedback, product direction discussions and early business conversations.

## Start using

Open the new start page:

- `/start`

Recommended first route:

1. `/start` — choose app
2. `/dashboard` — Caster command center
3. `/modules` — full module map
4. `/apps/carcaster` — car assistant demo
5. `/apps/travelcaster` — travel assistant demo

Direct usable workspace pages:

- `/apps/carcaster/faults`
- `/apps/carcaster/maintenance`
- `/apps/travelcaster/itinerary`
- `/apps/travelcaster/budget`

Run locally:

```bash
npm install
npm run dev
```

Then open:

```text
http://localhost:3000/start
```

## Product vision

Caster OS is designed as one intelligent layer for the decisions that matter:

- **Dashboard** — daily focus, widgets, memory, profiles and command center.
- **Caster AI Agent** — context-aware recommendations and next actions.
- **System Health** — core status, product readiness and platform overview.
- **Modules Map** — full OS structure and shared intelligence layers.
- **Stockcaster** — wealth, portfolio and market intelligence.
- **Scorecaster** — sports signals, edge, odds movement and risk control.
- **Relaxcaster** — calm, clarity, recovery and human decision control.
- **Carcaster** — car diagnostics, maintenance, ownership costs and repair guidance.
- **Travelcaster** — trips, hotels, routes, budgets, activities and local planning.

## Caster app roadmap

The first app roadmap for Scorecaster, Stockcaster, Carcaster and Travelcaster is available here:

- [`docs/CASTER_APP_ROADMAP.md`](docs/CASTER_APP_ROADMAP.md)

## Launch pages

The prototype includes the public-facing pages needed for public alpha launch:

- `/` — Home
- `/start` — Start using Caster apps
- `/dashboard` — Control Center
- `/agent` — AI Decision Interface
- `/system` — System Health
- `/modules` — OS Map
- `/demo` — Investor Demo Flow
- `/roadmap` — Product Roadmap
- `/pitch` — Pitch Page
- `/business` — Business Model
- `/pricing` — Pricing Concept
- `/launch` — Public Alpha Launch Checklist
- `/privacy` — Privacy Notes
- `/terms` — Prototype Terms
- `/disclaimer` — Responsible Use Disclaimer
- `/contact` — Contact / Discussion Paths

## Tech stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- Vercel Analytics
- Framer Motion ready

## Launch readiness

Implemented:

- Metadata / SEO
- OpenGraph and Twitter metadata
- OpenGraph image
- Sitemap
- Robots file
- Web app manifest
- App icon
- Loading screen
- Custom 404 page
- Footer with legal and launch links
- Product, business, pricing and demo flows
- Start page for using apps
- Carcaster workspaces
- Travelcaster workspaces

## Public demo path

1. Start
2. Dashboard
3. Modules
4. Carcaster
5. Travelcaster
6. Demo
7. Agent
8. System
9. Pitch
10. Business

## Next production steps

1. Verify production build and deployment logs.
2. Check mobile navigation on real devices.
3. Connect accounts and Supabase memory.
4. Add saved dashboard layouts.
5. Replace seed/demo content with real integrations.
6. Add real Caster AI actions with confirmation and safety controls.
7. Add billing, onboarding and production support pages.
8. Build persistent forms for Carcaster and Travelcaster.

## Development

```bash
npm install
npm run dev
npm run build
npm run lint
```
