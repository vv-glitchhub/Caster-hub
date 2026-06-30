# Caster App Roadmap

This document defines the first production roadmap for the Caster ecosystem.

## Goal

Build four connected AI applications under the Caster ecosystem:

1. **Scorecaster** — sports odds, betting intelligence, edge detection and responsible risk control.
2. **Stockcaster** — investing dashboard, portfolio intelligence, market/news analysis and AI explanations.
3. **Carcaster** — car diagnostics, fault code memory, maintenance planning and ownership cost tracking.
4. **Travelcaster** — travel planning, routes, hotels, budgets, activities and personal trip assistant.

The shared long-term product layer is **Caster OS**: one account, one dashboard, shared AI memory, shared user profile and multiple focused Caster modules.

---

## Product structure

### Caster OS / Caster-hub

Role: central dashboard and public product shell.

Core responsibilities:

- User dashboard
- Module launcher
- Shared AI agent
- Shared account and onboarding
- Shared pricing/business pages
- Shared trust, privacy and disclaimers
- Cross-app memory and user preferences

Recommended repo: `vv-glitchhub/Caster-hub`

---

## App 1: Scorecaster

Recommended repo: `vv-glitchhub/scorecaster`

### Purpose

AI-powered sports intelligence and betting analysis platform.

### MVP features

- Live odds feed
- Sports and league selector
- Best odds finder
- Implied probability
- Model probability
- Edge calculation
- Expected value calculation
- Confidence score
- Kelly stake suggestion
- Top picks
- Bet tracking
- Market movement history
- Responsible betting warnings

### V1 production tasks

- Stabilize live odds API
- Add saved bet slip
- Add user bankroll setting
- Add tracking history in Supabase
- Add CLV tracking
- Add daily Top 3 picks page
- Add sport filters: NHL, NBA, EPL, La Liga, Liiga, SHL
- Add trust score for each pick
- Add disclaimer and responsible gambling controls

### AI Agent role

The Scorecaster agent explains:

- Why a pick exists
- What the risk is
- Whether the odds moved
- Whether the bet should be skipped
- Suggested stake based on bankroll and confidence

---

## App 2: Stockcaster

Recommended repo: `vv-glitchhub/Stockcaster-`

### Purpose

AI-powered investing and market intelligence platform.

### MVP features

- Watchlist
- Portfolio input
- Stock search
- Price overview
- AI stock summary
- News sentiment
- Risk rating
- Valuation notes
- Buy / hold / sell reasoning
- Market trend dashboard

### V1 production tasks

- Add portfolio database
- Add watchlist database
- Add stock detail pages
- Add financial data provider
- Add market news provider
- Add news reliability scoring
- Add AI stock analysis endpoint
- Add sector trend engine
- Add risk engine
- Add daily market brief

### AI Agent role

The Stockcaster agent explains:

- What happened in the market
- Why a stock moved
- Whether the move is noise or signal
- What risks matter
- What to watch next

---

## App 3: Carcaster

Recommended repo: new repo or Caster-hub module first.

### Purpose

AI car ownership, diagnostics and maintenance assistant.

### MVP features

- Car profile
- Fault code history
- Symptom log
- Maintenance timeline
- Cost tracker
- Fuel / CNG cost calculator
- Repair shop notes
- Part checklist
- AI fault explanation

### V1 production tasks

- Create car profile schema
- Create maintenance event schema
- Create fault code schema
- Add first car profile UI
- Add OBD fault code explanation page
- Add cost calculator
- Add repair message generator
- Add service history upload/manual entry
- Add reminders for inspection, oil, tires and insurance

### AI Agent role

The Carcaster agent explains:

- What a fault code may mean
- What to check first
- What is urgent vs not urgent
- What to ask the repair shop
- How much a repair could roughly cost

### First real user case

VW Passat Variant 2012 1.4 TSI bensiini/kaasu automatic:

- Fault code: P2177, system too lean off idle bank 1
- Symptoms: hesitation, rough idle, low-RPM jerking
- Parking sensor issues
- Reverse camera issue
- Lane assist issue
- CNG fuel cost tracking

---

## App 4: Travelcaster

Recommended repo: new repo or Caster-hub module first.

### Purpose

AI travel planning and trip assistant.

### MVP features

- Trip profile
- Destination planning
- Hotel notes
- Flight/train schedule
- Route planning
- Budget tracker
- Restaurant and activity shortlist
- Packing list
- Local practical tips
- AI day planner

### V1 production tasks

- Create trip schema
- Create itinerary schema
- Add destination dashboard
- Add budget calculator
- Add packing checklist
- Add map/link storage
- Add activity shortlist
- Add restaurant shortlist
- Add day-by-day itinerary generator
- Add local rules and safety notes

### AI Agent role

The Travelcaster agent explains:

- What to do today
- How to get from A to B
- What to book next
- What is nearby
- What fits the budget and mood

---

## Shared technical architecture

### Frontend

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- Vercel deployment

### Backend

- Next.js API routes or server actions
- Supabase database
- Supabase Auth
- OpenAI API for AI reasoning
- External APIs per app

### Shared database areas

- `users`
- `profiles`
- `caster_modules`
- `ai_memories`
- `user_preferences`
- `events`
- `notes`
- `tasks`

### Shared AI services

- AI explanation engine
- Risk engine
- Trust score engine
- Memory engine
- Notification engine
- Daily brief generator

---

## Build order

### Phase 1 — Control center

1. Use `Caster-hub` as the main ecosystem shell.
2. Add app cards for Scorecaster, Stockcaster, Carcaster and Travelcaster.
3. Add `/apps/scorecaster`, `/apps/stockcaster`, `/apps/carcaster`, `/apps/travelcaster` landing pages.
4. Add shared product roadmap page.

### Phase 2 — Scorecaster production

1. Stabilize current live odds and analysis flow.
2. Add bet slip.
3. Add bankroll and staking controls.
4. Add Supabase tracking.
5. Add daily Top 3 picks.

### Phase 3 — Stockcaster production

1. Add watchlist.
2. Add portfolio.
3. Add stock detail pages.
4. Add market news and AI summaries.
5. Add daily market brief.

### Phase 4 — Carcaster MVP

1. Build car profile.
2. Add fault code history.
3. Add maintenance and repair tracker.
4. Add first AI fault explainer.

### Phase 5 — Travelcaster MVP

1. Build trip profile.
2. Add itinerary builder.
3. Add budget and route planning.
4. Add day planner.

---

## Immediate next coding tasks

1. Add Caster app module config file.
2. Add app cards to Caster-hub UI.
3. Add route pages for all four apps.
4. Create GitHub issues for each MVP.
5. Start Scorecaster production sprint.
