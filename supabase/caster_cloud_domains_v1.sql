create table if not exists public.caster_vehicle_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  make text not null,
  model text not null,
  model_year integer check (model_year between 1900 and 2100),
  registration_number text,
  vin text,
  odometer_km numeric not null default 0 check (odometer_km >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, name)
);

create table if not exists public.caster_vehicle_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  vehicle_id uuid not null references public.caster_vehicle_profiles(id) on delete cascade,
  event_type text not null check (event_type in ('fault','service','inspection','expense','note')),
  title text not null,
  description text not null default '',
  occurred_on date,
  odometer_km numeric check (odometer_km >= 0),
  amount numeric check (amount is null or amount >= 0),
  currency text not null default 'EUR',
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.caster_trips (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  destination text not null,
  start_date date,
  end_date date,
  budget numeric not null default 0 check (budget >= 0),
  currency text not null default 'EUR',
  status text not null default 'planning' check (status in ('planning','booked','active','completed','archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, name)
);

create table if not exists public.caster_trip_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  trip_id uuid not null references public.caster_trips(id) on delete cascade,
  item_type text not null check (item_type in ('flight','hotel','transport','activity','restaurant','note','expense')),
  title text not null,
  details text not null default '',
  starts_at timestamptz,
  ends_at timestamptz,
  amount numeric check (amount is null or amount >= 0),
  currency text not null default 'EUR',
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.caster_vehicle_profiles enable row level security;
alter table public.caster_vehicle_events enable row level security;
alter table public.caster_trips enable row level security;
alter table public.caster_trip_items enable row level security;

create policy "caster vehicle profiles own rows" on public.caster_vehicle_profiles
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "caster vehicle events own rows" on public.caster_vehicle_events
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "caster trips own rows" on public.caster_trips
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "caster trip items own rows" on public.caster_trip_items
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create or replace function public.caster_touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger caster_vehicle_profiles_touch_updated_at
before update on public.caster_vehicle_profiles
for each row execute function public.caster_touch_updated_at();
create trigger caster_vehicle_events_touch_updated_at
before update on public.caster_vehicle_events
for each row execute function public.caster_touch_updated_at();
create trigger caster_trips_touch_updated_at
before update on public.caster_trips
for each row execute function public.caster_touch_updated_at();
create trigger caster_trip_items_touch_updated_at
before update on public.caster_trip_items
for each row execute function public.caster_touch_updated_at();
