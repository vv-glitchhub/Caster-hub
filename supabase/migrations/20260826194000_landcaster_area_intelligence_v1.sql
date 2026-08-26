-- Landcaster Area Intelligence V1.
-- Adds persisted, explainable area scores and ingestion audit runs for official housing data.

create table if not exists public.landcaster_area_score_snapshots_v1 (
  id uuid primary key default gen_random_uuid(),
  postal_code text not null references public.landcaster_postal_areas_v1(postal_code) on delete cascade,
  property_type text not null,
  period_end date not null,
  area_score numeric not null check (area_score >= 0 and area_score <= 100),
  confidence_pct numeric not null check (confidence_pct >= 0 and confidence_pct <= 100),
  latest_price_per_sqm numeric,
  sample_size integer,
  observed_price_level_shift_pct numeric,
  momentum_score numeric not null check (momentum_score >= 0 and momentum_score <= 100),
  liquidity_score numeric not null check (liquidity_score >= 0 and liquidity_score <= 100),
  stability_score numeric not null check (stability_score >= 0 and stability_score <= 100),
  depth_score numeric not null check (depth_score >= 0 and depth_score <= 100),
  model_version text not null default 'area_score_v1',
  source_id text references public.landcaster_data_sources_v1(id) on delete restrict,
  evidence jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  unique (postal_code, property_type, period_end, model_version, source_id)
);

create index if not exists landcaster_area_score_rank_idx
  on public.landcaster_area_score_snapshots_v1 (property_type, period_end desc, area_score desc);
create index if not exists landcaster_area_score_postal_idx
  on public.landcaster_area_score_snapshots_v1 (postal_code, property_type, period_end desc);
create index if not exists landcaster_area_score_source_idx
  on public.landcaster_area_score_snapshots_v1 (source_id);

create table if not exists public.landcaster_ingestion_runs_v1 (
  id uuid primary key default gen_random_uuid(),
  source_id text not null references public.landcaster_data_sources_v1(id) on delete restrict,
  dataset_version text,
  status text not null check (status in ('running','success','partial','failed')),
  started_at timestamptz not null default now(),
  finished_at timestamptz,
  municipalities_upserted integer not null default 0,
  postal_areas_upserted integer not null default 0,
  market_rows_upserted integer not null default 0,
  area_scores_upserted integer not null default 0,
  error_message text,
  metadata jsonb not null default '{}'::jsonb
);

create index if not exists landcaster_ingestion_runs_source_idx
  on public.landcaster_ingestion_runs_v1 (source_id, started_at desc);

alter table public.landcaster_area_score_snapshots_v1 enable row level security;
alter table public.landcaster_ingestion_runs_v1 enable row level security;

revoke all on public.landcaster_area_score_snapshots_v1, public.landcaster_ingestion_runs_v1 from anon, authenticated;
grant select on public.landcaster_area_score_snapshots_v1 to anon, authenticated;
grant all on public.landcaster_area_score_snapshots_v1, public.landcaster_ingestion_runs_v1 to service_role;

create policy "landcaster area scores read"
  on public.landcaster_area_score_snapshots_v1
  for select to anon, authenticated
  using (true);

update public.landcaster_data_sources_v1
set
  dataset = '13mt — old dwelling prices and transactions by postal code, quarterly',
  source_url = 'https://pxweb2.stat.fi/PxWeb/pxweb/en/StatFin/StatFin__ashi/13mt.px/',
  refresh_cadence = 'quarterly',
  updated_at = now()
where id = 'statfin_housing_prices';
