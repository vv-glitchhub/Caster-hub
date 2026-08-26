-- Cover Landcaster foreign keys used by joins and cleanup paths.
create index if not exists landcaster_asp_rules_source_idx
  on public.landcaster_asp_rules_v1 (source_id);

create index if not exists landcaster_rates_source_idx
  on public.landcaster_interest_rate_snapshots_v1 (source_id);

create index if not exists landcaster_market_source_idx
  on public.landcaster_market_snapshots_v1 (source_id);

create index if not exists landcaster_valuation_property_idx
  on public.landcaster_valuation_runs_v1 (saved_property_id);
