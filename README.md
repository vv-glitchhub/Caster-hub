# Caster OS

Caster OS is a premium AI operating system prototype for decisions, markets and personal intelligence.

It is not just a landing page. It is a connected product demo that brings together a dashboard, AI agent, system health, product modules, business story, pricing concept and launch-ready trust pages.

## Status

**Public Alpha**

Caster OS is ready for public preview, feedback, product direction discussions and early business conversations.

Scorecaster is the first connected production-alpha application. Its module page reads the live Scorecaster health endpoint and links directly to account, cloud sync and production tools.

## Start using

Open the new start page:

- `/start`

Fastest local usage center:

- `/quick-use`

Local operations runbook:

- `/runbook`

Recommended first route:

1. `/start` — choose app
2. `/quick-use` — see every usable local mode
3. `/apps/scorecaster` — view the first live production app
4. `/apps/scorecaster/setup` — complete the Scorecaster cloud checklist
5. `/runbook` — check commands and smoke test steps
6. `/backup` — export local data
7. `/dashboard` — Caster command center
8. `/modules` — full module map

Direct usable workspace pages:

- `/quick-use`
- `/runbook`
- `/backup`
- `/apps/scorecaster`
- `/apps/scorecaster/setup`
- `/apps/carcaster`
- `/apps/travelcaster`
- `/apps/carcaster/faults`
- `/apps/carcaster/maintenance`
- `/apps/travelcaster/itinerary`
- `/apps/travelcaster/budget`

Other app repos also have quick-use modes:

- Scorecaster: `https://scorecaster.vercel.app/quick-use`
- Scorecaster login: `https://scorecaster.vercel.app/login`
- Scorecaster cloud sync: `https://scorecaster.vercel.app/cloud-sync`
- Stockcaster: `/quick-use` in the Stockcaster project

Run locally:

```bash
npm install --no-audit --no-fund
npm run build
npm run dev
```

Then open:

```text
http://localhost:3000/start
http://localhost:3000/quick-use
http://localhost:3000/apps/scorecaster
http://localhost:3000/runbook
```

## Production guardrails

- GitHub Actions runs `npm run build` on pull requests and `main` pushes.
- Runtime is pinned to Node.js 22 through `.nvmrc`.
- `/api/health` reports the Caster Hub deployment and module state.
- The Scorecaster module reads `https://scorecaster.vercel.app/api/health` server-side with no cache.

## Scorecaster production integration

Scorecaster now contains:

- email/password account flow
- confirmation callback and secure signout
- protected cloud bets API
- local-to-cloud sync workspace
- Supabase Row Level Security migration
- production health endpoint
- GitHub CI and successful Vercel deployment

The remaining activation work is manual Supabase setup and a real two-user isolation test. See:

- [`docs/SCORECASTER_PRODUCTION_INTEGRATION.md`](docs/SCORECASTER_PRODUCTION_INTEGRATION.md)

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
- `/runbook` — Local runbook and smoke test
- `/backup` — Local backup and restore
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
- `/api/health` — Caster Hub JSON health endpoint

## Development

```bash
npm install --no-audit --no-fund
npm run build
npm run dev
npm run lint
```
