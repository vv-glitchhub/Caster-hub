# Caster Autonomous Command

Caster Hub contains a safe autonomy layer at:

- `/autonomy` — live operating view
- `/api/autonomy` — machine-readable snapshot

## What runs automatically

- Scorecaster and Stockcaster production health checks
- five-second timeout and graceful failure handling
- stale health detection
- readiness scoring
- action priority ranking
- 30-second page refresh while the command view is open

## What requires approval

- credentials and provider activation
- database migrations
- cloud data migration
- external writes or messages
- purchases, subscriptions or financial actions
- destructive changes

## Decision policy

Caster uses four rules:

1. Never present unavailable data as healthy.
2. Restore critical production visibility before adding optional features.
3. Preserve local data until cloud migration is verified and duplicate-safe.
4. Keep high-impact actions behind explicit user approval.

## App roles

- Scorecaster: sports intelligence, paper tracking and risk control. It does not execute real-money bets.
- Stockcaster: portfolio and market intelligence with visible source and freshness requirements.
- Carcaster: local-first car profile, fault and service workspace.
- Travelcaster: local-first trip, budget and itinerary workspace.

## Next production phase

After Scorecaster authentication and Row Level Security pass a real two-user isolation test, the same account pattern can be reused for Stockcaster, Carcaster and Travelcaster. The autonomy layer should then monitor migration status and surface only actions that are safe for the current account and application state.
