# Scorecaster Production Integration

Caster Hub treats Scorecaster as the first running production-alpha application.

## Live integration

The Scorecaster module page reads:

```text
https://scorecaster.vercel.app/api/health
```

The request is made server-side with `cache: no-store`, so browser CORS rules do not block the status panel.

## Direct production routes

- `/quick-use` — local-first manual bet slip
- `/login` — create an account or sign in
- `/profile` — authenticated account and cloud history
- `/cloud-sync` — copy local bets to the authenticated cloud account
- `/production-status` — deployment and integration readiness
- `/api/health` — machine-readable health response

## Cloud activation requirement

The Scorecaster application code now contains:

- Supabase browser and server clients
- Next.js session proxy
- email/password authentication
- email confirmation callback
- protected cloud bets API
- local-to-cloud sync UI
- Row Level Security migration

To activate the database layer:

1. Run `supabase/scorecaster_auth_cloud.sql` in Supabase SQL Editor.
2. Configure the production Site URL and confirmation redirect URL.
3. Create a first account and sync a local bet.
4. Create a second account and confirm data isolation.

## Shared Caster Core direction

After Scorecaster authentication and RLS are verified with real accounts, the same account pattern can be extracted into Caster Hub and reused by Stockcaster, Carcaster and Travelcaster.
