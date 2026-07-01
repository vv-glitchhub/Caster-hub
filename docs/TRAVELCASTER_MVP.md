# Travelcaster MVP

Travelcaster is the Caster app for trip planning, budgets, routes and daily travel decisions.

## Goal

Make trips easier to plan and execute. The app should remember destination, hotel, budget, mood, saved places and practical details.

## MVP features

- Trip profile
- Destination dashboard
- Itinerary builder
- Budget calculator
- Packing checklist
- Saved places and links
- Hotel notes
- Restaurant shortlist
- Activity shortlist
- AI day planner
- Local practical tips

## Engine file

`lib/travelcaster-engine.ts`

Includes:

- `createTripProfile`
- `calculateTripBudget`
- `buildDayPlan`
- `generatePackingList`
- `createPracticalTips`

## Pages to build next

- `/apps/travelcaster/trips`
- `/apps/travelcaster/itinerary`
- `/apps/travelcaster/budget`
- `/apps/travelcaster/packing`
- `/apps/travelcaster/places`

## First real case

Warsaw trip style:

- Relaxed but premium
- Hotel-based planning
- Tasting menu / wine pairing / cocktail interest
- Cat café, zoo, museum, shopping and cigar lounge type interests
- Easy routes and practical tips

## Database plan

Tables later:

- `trip_profiles`
- `trip_days`
- `trip_items`
- `trip_budget_items`
- `packing_items`
- `saved_places`
- `travel_notes`

## AI agent behavior

The agent should:

- Build realistic day plans.
- Avoid overloading the itinerary.
- Respect budget and mood.
- Explain routes simply.
- Keep practical reminders visible.
- Use live data only when connected sources are available.

## Safety

Travelcaster should show data freshness, booking assumptions and local practical notes. It should not claim live opening hours, prices or availability unless connected to live data.
