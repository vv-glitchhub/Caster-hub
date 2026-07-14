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

Caster Hub adds:

- `/apps/stockcaster` — live module and health panel
- `/apps/stockcaster/setup` — activation and data-trust checklist

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

## Local storage

```text
stockcaster.quickUse.holdings
stockcaster.quickUse.watchlist
```

Caster Hub backup tooling already recognizes these keys.

## Data-trust requirement

Before any price is called live or delayed, Stockcaster must show:

- provider name
- quote timestamp
- currency
- instrument identity
- market-open or market-closed state
- stale-data state
- provider error state

A configured provider key alone is not proof that displayed data is current, correctly mapped or correctly licensed.

Provider validation must cover:

- stocks
- ETFs
- mutual funds
- missing or delisted symbols
- split-adjusted values
- different currencies
- closed markets and holidays
- delayed versus real-time entitlements

## Next cloud phase

Reuse the validated Scorecaster pattern:

1. Add Supabase authentication.
2. Create user-specific holdings and watchlist tables.
3. Add Row Level Security using `auth.uid()`.
4. Build duplicate-safe local-to-cloud migration.
5. Keep the local copy until cloud verification succeeds.
6. Test two isolated user accounts.
7. Connect verified market data.
8. Add portfolio history and daily briefs.

Do not expose a Supabase service-role key in browser code.

## Definition of done

Stockcaster cloud and live-data activation is complete when:

- two accounts cannot see or alter each other’s data
- local holdings migrate without duplication
- signout prevents cloud access
- quotes expose source and freshness
- stale or unavailable data is clearly labelled
- the app does not silently replace missing data with invented values
- investment analysis explains uncertainty and never promises returns

## Safety

Stockcaster must remain analysis and learning software. It must not promise returns or present generic output as personal financial advice.
