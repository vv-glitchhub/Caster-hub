# Caster OS

Caster OS is a premium AI operating system prototype for decisions, markets and personal intelligence.

It is not just a landing page. It is a connected product demo that brings together a dashboard, AI agent, system health, product modules, business story, pricing concept and launch-ready trust pages.

## Status

**Public Alpha**

Caster OS is ready for public preview, feedback, product direction discussions and early business conversations.

## Start using

Open the new start page:

- `/start`

Fastest local usage center:

- `/quick-use`

Recommended first route:

1. `/start` — choose app
2. `/quick-use` — see every usable local mode
3. `/dashboard` — Caster command center
4. `/modules` — full module map
5. `/apps/carcaster` — car assistant with local forms
6. `/apps/travelcaster` — travel assistant with local forms

Direct usable workspace pages:

- `/quick-use`
- `/backup`
- `/apps/carcaster`
- `/apps/travelcaster`
- `/apps/carcaster/faults`
- `/apps/carcaster/maintenance`
- `/apps/travelcaster/itinerary`
- `/apps/travelcaster/budget`

Other app repos now also have local quick-use modes:

- Scorecaster: `/quick-use`
- Stockcaster: `/quick-use`

Run locally:

```bash
npm install
npm run dev
```

Then open:

```text
http://localhost:3000/start
http://localhost:3000/quick-use
```

## Product vision

Caster OS is designed as one intelligent layer for the decisions that matter:

- **Dashboard** — daily focus, widgets, memory, profiles and command center.
- **Caster AI Agent** — context-aware recommendations and next actions.
- **System Health** — core status, product readiness and platform overview.
- **Modules Map** — full OS structure and shared intelligence layers.
- **Stockcaster** — wealth, portfolio and market intelligence.
- **Scorecaster** — sports signals, edge, odds movement and risk control.
- **Relaxcaster** — calm, recovery and human decision control.
- **Carcaster** — car diagnostics, maintenance, ownership costs and repair guidance.
- **Travelcaster** — trips, hotels, routes, budgets, activities and local planning.

## Caster app roadmap

The first app roadmap for Scorecaster, Stockcaster, Carcaster and Travelcaster is available here:

- [`docs/CASTER_APP_ROADMAP.md`](docs/CASTER_APP_ROADMAP.md)

## Launch pages

The prototype includes the public-facing pages needed for public alpha launch:

- `/` — Home
- `/start` — Start using Caster apps
- `/quick-use` — Quick Use Center
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
- Quick Use Center
- Carcaster local forms
- Travelcaster local forms
- Carcaster workspaces
- Travelcaster workspaces

## Public demo path

1. Start
2. Quick Use
3. Dashboard
4. Modules
5. Carcaster
6. Travelcaster
7. Demo
8. Agent
9. System
10. Pitch
11. Business

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
