# Landcaster

Landcaster is an independent Finland housing-intelligence product extracted from CasterHub.

## Product layers

- Market Intelligence: Statistics Finland realised housing prices and transaction depth
- Area Score V2: market + Statistics Finland Paavo fundamentals
- Fair Value V2: area benchmark + condition + company debt + known renovations + charges
- Finance: ASP, mortgage payment, interest stress and true housing cost
- Decision: Buy vs Rent scenarios and the future BUY / WAIT / RENT / BUILD engine

## Architecture

This standalone tree has no dependency on Caster OS pages, navigation, agents, Scorecaster, Stockcaster, Carcaster or other CasterHub modules.

Public data:
- Statistics Finland StatFin housing-price API
- Statistics Finland Paavo fundamentals
- current sanitized Landcaster V2 read endpoint in Supabase

## Migration state

The standalone code is prepared on `split/landcaster-standalone` as a clean repository root. The next infrastructure boundary is a dedicated GitHub repository and dedicated Vercel project. Database isolation can follow as a separate migration because creating another Supabase project changes billing/resources.
