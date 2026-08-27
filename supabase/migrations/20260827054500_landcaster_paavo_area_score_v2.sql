-- Landcaster Area Intelligence V2.
-- Adds Statistics Finland Paavo fundamentals and a persisted market + fundamentals score.

insert into public.landcaster_data_sources_v1 (
  id, provider, dataset, source_url, license, geographic_scope, refresh_cadence, status, updated_at
) values (
  'statfin_paavo',
  'Statistics Finland',
  'Paavo — Open data by postal code area, latest annual fundamentals',
  'https://pxdata.stat.fi/PxWeb/pxweb/en/Postinumeroalueittainen_avoin_tieto/',
  'Statistics Finland open data terms',
  'Finland',
  'annual',
  'active',
  now()
)
on conflict (id) do update set
  provider = excluded.provider,
  dataset = excluded.dataset,
  source_url = excluded.source_url,
  license = excluded.license,
  geographic_scope = excluded.geographic_scope,
  refresh_cadence = excluded.refresh_cadence,
  status = excluded.status,
  updated_at = now();

create table if not exists public.landcaster_paavo_fundamentals_v1 (
  id uuid primary key default gen_random_uuid(),
  postal_code text not null references public.landcaster_postal_areas_v1(postal_code) on delete cascade,
  statistical_year integer not null check (statistical_year >= 2000 and statistical_year <= 2100),
  population integer,
  average_age numeric,
  young_adults_20_39 integer,
  working_age_20_64 integer,
  seniors_65_plus integer,
  adults_18_plus integer,
  average_income_eur numeric,
  median_income_eur numeric,
  purchasing_power_eur numeric,
  employed integer,
  unemployed integer,
  students integer,
  pensioners integer,
  workplaces_total integer,
  services_workplaces integer,
  employment_rate_pct numeric,
  unemployment_rate_pct numeric,
  young_adult_share_pct numeric,
  working_age_share_pct numeric,
  workplace_per_100_residents numeric,
  source_id text not null default 'statfin_paavo' references public.landcaster_data_sources_v1(id) on delete restrict,
  source_tables text[] not null default array['12ey','12f1','12f5','12f6'],
  provenance jsonb not null default '{}'::jsonb,
  as_of date not null default current_date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (postal_code, statistical_year, source_id)
);

create index if not exists landcaster_paavo_year_postal_idx
  on public.landcaster_paavo_fundamentals_v1 (statistical_year desc, postal_code);
create index if not exists landcaster_paavo_income_idx
  on public.landcaster_paavo_fundamentals_v1 (statistical_year desc, median_income_eur desc);
create index if not exists landcaster_paavo_employment_idx
  on public.landcaster_paavo_fundamentals_v1 (statistical_year desc, employment_rate_pct desc);

create table if not exists public.landcaster_area_score_v2_snapshots (
  id uuid primary key default gen_random_uuid(),
  postal_code text not null references public.landcaster_postal_areas_v1(postal_code) on delete cascade,
  property_type text not null,
  market_period_end date not null,
  fundamentals_year integer not null,
  market_score numeric not null check (market_score between 0 and 100),
  fundamentals_score numeric not null check (fundamentals_score between 0 and 100),
  income_score numeric not null check (income_score between 0 and 100),
  employment_score numeric not null check (employment_score between 0 and 100),
  demographic_score numeric not null check (demographic_score between 0 and 100),
  workplace_score numeric not null check (workplace_score between 0 and 100),
  area_score_v2 numeric not null check (area_score_v2 between 0 and 100),
  confidence_pct numeric not null check (confidence_pct between 0 and 100),
  latest_price_per_sqm numeric,
  sample_size integer,
  model_version text not null default 'area_score_v2_paavo_2026_01',
  market_source_id text not null default 'statfin_housing_prices' references public.landcaster_data_sources_v1(id) on delete restrict,
  fundamentals_source_id text not null default 'statfin_paavo' references public.landcaster_data_sources_v1(id) on delete restrict,
  evidence jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  unique (postal_code, property_type, market_period_end, fundamentals_year, model_version)
);

create index if not exists landcaster_area_score_v2_rank_idx
  on public.landcaster_area_score_v2_snapshots (property_type, market_period_end desc, area_score_v2 desc);
create index if not exists landcaster_area_score_v2_postal_idx
  on public.landcaster_area_score_v2_snapshots (postal_code, property_type, market_period_end desc);

alter table public.landcaster_paavo_fundamentals_v1 enable row level security;
alter table public.landcaster_area_score_v2_snapshots enable row level security;

revoke all on public.landcaster_paavo_fundamentals_v1, public.landcaster_area_score_v2_snapshots from anon, authenticated;
grant select on public.landcaster_paavo_fundamentals_v1, public.landcaster_area_score_v2_snapshots to anon, authenticated;
grant all on public.landcaster_paavo_fundamentals_v1, public.landcaster_area_score_v2_snapshots to service_role;

create policy "landcaster paavo fundamentals read"
  on public.landcaster_paavo_fundamentals_v1
  for select to anon, authenticated
  using (true);

create policy "landcaster area score v2 read"
  on public.landcaster_area_score_v2_snapshots
  for select to anon, authenticated
  using (true);

alter table public.landcaster_ingestion_runs_v1
  add column if not exists fundamentals_upserted integer not null default 0,
  add column if not exists area_scores_v2_upserted integer not null default 0;
