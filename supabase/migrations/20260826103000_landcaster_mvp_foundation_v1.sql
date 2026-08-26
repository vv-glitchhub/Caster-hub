-- Landcaster MVP 0.1 data foundation.
-- Production migration has already been applied to the connected Supabase project.

create table if not exists public.landcaster_data_sources_v1 (
  id text primary key,
  provider text not null,
  dataset text not null,
  source_url text not null,
  license text,
  geographic_scope text not null default 'Finland',
  refresh_cadence text,
  status text not null default 'planned' check (status in ('planned','active','degraded','disabled')),
  last_success_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.landcaster_municipalities_v1 (
  municipality_code text primary key,
  name_fi text not null,
  region_code text,
  asp_interest_support_cap_eur integer not null default 160000,
  population integer,
  population_as_of date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists landcaster_municipalities_name_idx on public.landcaster_municipalities_v1 (name_fi);

create table if not exists public.landcaster_postal_areas_v1 (
  postal_code text primary key,
  name_fi text not null,
  municipality_code text references public.landcaster_municipalities_v1(municipality_code) on delete set null,
  valid_from date,
  valid_to date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists landcaster_postal_municipality_idx on public.landcaster_postal_areas_v1 (municipality_code);

create table if not exists public.landcaster_market_snapshots_v1 (
  id uuid primary key default gen_random_uuid(),
  geography_level text not null check (geography_level in ('country','region','municipality','postal_area')),
  geography_code text not null,
  property_type text not null,
  metric text not null,
  period_start date not null,
  period_end date not null,
  value numeric not null,
  unit text not null,
  sample_size integer,
  source_id text references public.landcaster_data_sources_v1(id) on delete restrict,
  as_of date not null,
  provenance jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  unique (geography_level, geography_code, property_type, metric, period_start, period_end, source_id)
);
create index if not exists landcaster_market_geo_period_idx on public.landcaster_market_snapshots_v1 (geography_level, geography_code, period_end desc);
create index if not exists landcaster_market_property_metric_idx on public.landcaster_market_snapshots_v1 (property_type, metric, period_end desc);

create table if not exists public.landcaster_interest_rate_snapshots_v1 (
  snapshot_date date not null,
  rate_type text not null,
  rate_pct numeric not null,
  source_id text references public.landcaster_data_sources_v1(id) on delete restrict,
  created_at timestamptz not null default now(),
  primary key (snapshot_date, rate_type)
);

create table if not exists public.landcaster_asp_rules_v1 (
  effective_from date primary key,
  effective_to date,
  high_cap_cities text[] not null default array['Espoo','Helsinki','Kauniainen','Oulu','Tampere','Turku','Vantaa'],
  high_cap_eur integer not null,
  standard_cap_eur integer not null,
  joint_high_cap_eur integer not null,
  joint_standard_cap_eur integer not null,
  savings_multiplier numeric not null,
  max_financing_share numeric not null,
  interest_support_threshold_pct numeric,
  source_id text references public.landcaster_data_sources_v1(id) on delete restrict,
  created_at timestamptz not null default now(),
  check (max_financing_share > 0 and max_financing_share <= 1)
);

create table if not exists public.landcaster_user_plans_v1 (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null default 'My home plan',
  municipality text,
  target_price_eur numeric not null default 0,
  asp_savings_eur numeric not null default 0,
  monthly_asp_saving_eur numeric not null default 0,
  other_savings_eur numeric not null default 0,
  max_monthly_housing_cost_eur numeric,
  target_review_date date,
  assumptions jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists landcaster_user_plans_user_idx on public.landcaster_user_plans_v1 (user_id, updated_at desc);

create table if not exists public.landcaster_saved_properties_v1 (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  municipality text,
  postal_code text,
  address_label text,
  property_type text,
  asking_price_eur numeric,
  debt_free_price_eur numeric,
  area_m2 numeric,
  build_year integer,
  lot_type text,
  notes text,
  source_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists landcaster_saved_properties_user_idx on public.landcaster_saved_properties_v1 (user_id, updated_at desc);

create table if not exists public.landcaster_valuation_runs_v1 (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  saved_property_id uuid references public.landcaster_saved_properties_v1(id) on delete cascade,
  model_version text not null,
  fair_value_low_eur numeric,
  fair_value_mid_eur numeric,
  fair_value_high_eur numeric,
  confidence_pct numeric,
  area_score numeric,
  affordability_score numeric,
  risk_score numeric,
  decision_label text,
  evidence jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now()
);
create index if not exists landcaster_valuation_user_idx on public.landcaster_valuation_runs_v1 (user_id, created_at desc);

alter table public.landcaster_data_sources_v1 enable row level security;
alter table public.landcaster_municipalities_v1 enable row level security;
alter table public.landcaster_postal_areas_v1 enable row level security;
alter table public.landcaster_market_snapshots_v1 enable row level security;
alter table public.landcaster_interest_rate_snapshots_v1 enable row level security;
alter table public.landcaster_asp_rules_v1 enable row level security;
alter table public.landcaster_user_plans_v1 enable row level security;
alter table public.landcaster_saved_properties_v1 enable row level security;
alter table public.landcaster_valuation_runs_v1 enable row level security;

revoke all on public.landcaster_data_sources_v1, public.landcaster_municipalities_v1, public.landcaster_postal_areas_v1, public.landcaster_market_snapshots_v1, public.landcaster_interest_rate_snapshots_v1, public.landcaster_asp_rules_v1, public.landcaster_user_plans_v1, public.landcaster_saved_properties_v1, public.landcaster_valuation_runs_v1 from anon, authenticated;
grant select on public.landcaster_data_sources_v1, public.landcaster_municipalities_v1, public.landcaster_postal_areas_v1, public.landcaster_market_snapshots_v1, public.landcaster_interest_rate_snapshots_v1, public.landcaster_asp_rules_v1 to anon, authenticated;
grant select, insert, update, delete on public.landcaster_user_plans_v1, public.landcaster_saved_properties_v1 to authenticated;
grant select on public.landcaster_valuation_runs_v1 to authenticated;
grant all on public.landcaster_data_sources_v1, public.landcaster_municipalities_v1, public.landcaster_postal_areas_v1, public.landcaster_market_snapshots_v1, public.landcaster_interest_rate_snapshots_v1, public.landcaster_asp_rules_v1, public.landcaster_user_plans_v1, public.landcaster_saved_properties_v1, public.landcaster_valuation_runs_v1 to service_role;

create policy "landcaster public data sources read" on public.landcaster_data_sources_v1 for select to anon, authenticated using (true);
create policy "landcaster municipalities read" on public.landcaster_municipalities_v1 for select to anon, authenticated using (true);
create policy "landcaster postal areas read" on public.landcaster_postal_areas_v1 for select to anon, authenticated using (true);
create policy "landcaster market snapshots read" on public.landcaster_market_snapshots_v1 for select to anon, authenticated using (true);
create policy "landcaster rates read" on public.landcaster_interest_rate_snapshots_v1 for select to anon, authenticated using (true);
create policy "landcaster asp rules read" on public.landcaster_asp_rules_v1 for select to anon, authenticated using (true);

create policy "landcaster users read own plans" on public.landcaster_user_plans_v1 for select to authenticated using ((select auth.uid()) is not null and (select auth.uid()) = user_id);
create policy "landcaster users insert own plans" on public.landcaster_user_plans_v1 for insert to authenticated with check ((select auth.uid()) is not null and (select auth.uid()) = user_id);
create policy "landcaster users update own plans" on public.landcaster_user_plans_v1 for update to authenticated using ((select auth.uid()) is not null and (select auth.uid()) = user_id) with check ((select auth.uid()) is not null and (select auth.uid()) = user_id);
create policy "landcaster users delete own plans" on public.landcaster_user_plans_v1 for delete to authenticated using ((select auth.uid()) is not null and (select auth.uid()) = user_id);
create policy "landcaster users read own properties" on public.landcaster_saved_properties_v1 for select to authenticated using ((select auth.uid()) is not null and (select auth.uid()) = user_id);
create policy "landcaster users insert own properties" on public.landcaster_saved_properties_v1 for insert to authenticated with check ((select auth.uid()) is not null and (select auth.uid()) = user_id);
create policy "landcaster users update own properties" on public.landcaster_saved_properties_v1 for update to authenticated using ((select auth.uid()) is not null and (select auth.uid()) = user_id) with check ((select auth.uid()) is not null and (select auth.uid()) = user_id);
create policy "landcaster users delete own properties" on public.landcaster_saved_properties_v1 for delete to authenticated using ((select auth.uid()) is not null and (select auth.uid()) = user_id);
create policy "landcaster users read own valuations" on public.landcaster_valuation_runs_v1 for select to authenticated using ((select auth.uid()) is not null and (select auth.uid()) = user_id);

insert into public.landcaster_data_sources_v1 (id, provider, dataset, source_url, license, geographic_scope, refresh_cadence, status)
values
  ('mml_property_trade_stats','Maanmittauslaitos','Kiinteistökauppojen tilastopalvelu','https://www.maanmittauslaitos.fi/kiinteistotietojen-rajapintapalvelut/kiinteistokauppojen-tilastopalvelu-rest','CC BY 4.0','Finland','monthly','planned'),
  ('statfin_housing_prices','Tilastokeskus','Asuntojen hinnat / StatFin','https://stat.fi/tilasto/ashi','Official statistics','Finland','quarterly','planned'),
  ('statfin_pafi','Tilastokeskus','Paavo postinumeroalueittainen avoin tieto','https://stat.fi/tup/paavo/index.html','CC BY 4.0','Finland','annual','planned'),
  ('bof_housing_rates','Suomen Pankki','Asuntolainojen korot','https://www.suomenpankki.fi/fi/tilastot/','Official statistics','Finland','monthly','planned'),
  ('state_treasury_asp','Valtiokonttori','ASP-järjestelmän säännöt','https://www.valtiokonttori.fi/palvelut/rahoitus-ja-lainapalvelut/asp-saastaminen-ja-asp-laina/','Public authority guidance','Finland','on-change','active')
on conflict (id) do update set provider = excluded.provider, dataset = excluded.dataset, source_url = excluded.source_url, license = excluded.license, geographic_scope = excluded.geographic_scope, refresh_cadence = excluded.refresh_cadence, status = excluded.status, updated_at = now();

insert into public.landcaster_asp_rules_v1 (effective_from, high_cap_cities, high_cap_eur, standard_cap_eur, joint_high_cap_eur, joint_standard_cap_eur, savings_multiplier, max_financing_share, interest_support_threshold_pct, source_id)
values (date '2026-06-01', array['Espoo','Helsinki','Kauniainen','Oulu','Tampere','Turku','Vantaa'], 230000, 160000, 345000, 240000, 9, 0.90, 3.8, 'state_treasury_asp')
on conflict (effective_from) do update set high_cap_cities = excluded.high_cap_cities, high_cap_eur = excluded.high_cap_eur, standard_cap_eur = excluded.standard_cap_eur, joint_high_cap_eur = excluded.joint_high_cap_eur, joint_standard_cap_eur = excluded.joint_standard_cap_eur, savings_multiplier = excluded.savings_multiplier, max_financing_share = excluded.max_financing_share, interest_support_threshold_pct = excluded.interest_support_threshold_pct, source_id = excluded.source_id;
