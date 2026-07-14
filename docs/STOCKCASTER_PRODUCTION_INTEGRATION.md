# Stockcaster Production Integration

Caster Hub treats Stockcaster as the second running production-alpha application.

## Live integration

The Stockcaster module page reads:

```text
${STOCKCASTER_URL}/api/health
```

`STOCKCASTER_URL` defaults to:

```text
https://stockcaster.vercel.app
```

The request is server-side and uses `cache: no-store`, so browser CORS rules do not block the status panel.

## Direct production routes

- `/quick-use` — browser-local portfolio and watchlist
- `/production-status` — deployment and service readiness
- `/core-status` — shared Caster Core state
- `/market-brief` — market brief workspace
- `/api/health` — machine-readable health response

## Current production capability

Stockcaster contains:

- local holdings and watchlist storage
- portfolio value and P/L calculation
- risk label and concentration warnings
- market brief engine
- GitHub Actions build CI
- Vercel production deployment
- health endpoint and production status UI
- Caster Core contract

## Next cloud phase

Reuse the validated Scorecaster pattern:

1. Add Supabase authentication.
2. Create user-specific holdings and watchlist tables.
3. Add Row Level Security.
4. Build duplicate-safe local-to-cloud migration.
5. Connect live market data.
6. Add portfolio history and daily briefs.

## Safety

Stockcaster must remain analysis and learning software. It must not promise returns or present generic output as personal financial advice.
