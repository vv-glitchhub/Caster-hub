# Stockcaster Production Integration

Caster Hub treats Stockcaster as the second running production-alpha application.

## Live integration

The Stockcaster module page reads:

```text
https://stockcaster.vercel.app/api/health
```

The request is made server-side with `cache: no-store`, so the Hub receives the current deployed state without browser CORS dependencies.

An alternative deployment URL can be configured for Caster Hub with:

```text
STOCKCASTER_URL=
```

## Current live capability

Stockcaster currently provides:

- browser-local portfolio holdings
- browser-local watchlist
- portfolio value and P/L calculation
- portfolio concentration and risk warnings
- market brief engine foundation
- production health endpoint
- production status page
- Caster Core contract
- GitHub build CI
- Vercel deployment

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

A configured provider key alone is not proof that the displayed data is current or correctly licensed.

## Account roadmap

Stockcaster should reuse the validated Scorecaster account pattern rather than create a second auth system:

1. Supabase browser and server clients
2. validated user session
3. user-specific holdings and watchlist tables
4. Row Level Security using `auth.uid()`
5. duplicate-safe local-to-cloud migration
6. two-user isolation test

Do not expose a service-role key in browser code.

## Definition of done

Stockcaster cloud activation is complete when:

- two accounts cannot see each other’s data
- local holdings migrate without duplication
- signout prevents cloud access
- quotes expose source and freshness
- stale or unavailable data is clearly labelled
- investment analysis does not promise returns

## Hub routes

- `/apps/stockcaster` — module and live status
- `/apps/stockcaster/setup` — activation checklist

## Stockcaster routes

- `/quick-use`
- `/production-status`
- `/core-status`
- `/api/health`
