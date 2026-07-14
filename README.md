# Caster OS

Caster OS is a premium AI operating system prototype for decisions, markets and personal intelligence.

It is not just a landing page. It is a connected product demo that brings together a dashboard, AI agent, system health, product modules, business story, pricing concept and launch-ready trust pages.

## Status

**Public Alpha**

Caster OS is ready for public preview, feedback, product direction discussions and early business conversations.

Scorecaster is now the first connected production app:

- live app: `https://scorecaster.vercel.app`
- account: `https://scorecaster.vercel.app/profile`
- Cloud Sync: `https://scorecaster.vercel.app/cloud-sync`
- health API: `https://scorecaster.vercel.app/api/health`
- Hub status page: `/apps/scorecaster/status`

## Start using

Open the start page:

- `/start`

Fastest usage center:

- `/quick-use`

Operations runbook:

- `/runbook`

Recommended first route:

1. `/start` — choose app
2. `/apps/scorecaster` — open the first connected production app
3. `/apps/scorecaster/status` — read live Scorecaster health
4. `/quick-use` — see every usable local mode
5. `/runbook` — check commands and smoke-test steps
6. `/backup` — export local data
7. `/dashboard` — Caster command center
8. `/modules` — full module map

Direct usable workspace pages:

- `/apps/scorecaster`
- `/apps/scorecaster/status`
- `/quick-use`
- `/runbook`
- `/backup`
- `/apps/carcaster`
- `/apps/travelcaster`
- `/apps/carcaster/faults`
- `/apps/carcaster/maintenance`
- `/apps/travelcaster/itinerary`
- `/apps/travelcaster/budget`

Other app repos also have local quick-use modes:

- Scorecaster: `/quick-use`, `/login`, `/profile`, `/cloud-sync`
- Stockcaster: `/quick-use`

Run locally:

```bash
npm install --no-audit --no-fund
npm run build
npm run dev
```

Then open:

```text
http://localhost:3000/start
http://localhost:3000/apps/scorecaster
http://localhost:3000/apps/scorecaster/status
http://localhost:3000/quick-use
http://localhost:3000/runbook
```

## Production guardrails

- Node.js 22 is pinned through `.nvmrc`.
- GitHub Actions runs a production build for pull requests and `main` pushes.
- CI uploads the build log as a short-lived artifact for diagnostics.
- The Scorecaster status page uses a no-cache server request to the live health API.
- External Scorecaster links open the real deployed app instead of a duplicate Hub implementation.

## Product vision

Caster OS is designed as one intelligent layer for the decisions that matter:

- **Dashboard** — daily focus, widgets, memory, profiles and command center.
- **Caster AI Agent** — context-aware recommendations and next actions.
- **System Health** — core status, product readiness and platform overview.
- **Modules Map** — full OS structure and shared intelligence layers.
- **Stockcaster** — wealth, portfolio and market intelligence.
- **Scorecaster** — sports signals, edge, odds movement, accounts, cloud history and risk control.
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
- `/apps/scorecaster/status` — live Scorecaster service health
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

## Development

```bash
npm install --no-audit --no-fund
npm run build
npm run dev
npm run lint
```
