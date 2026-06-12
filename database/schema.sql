-- Caster OS Supabase schema
-- Run this in the Supabase SQL editor when you are ready to connect real memory.

create table if not exists public.caster_profiles (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.caster_goals (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references public.caster_profiles(id) on delete cascade,
  title text not null,
  description text,
  status text not null default 'active',
  priority integer not null default 2,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.caster_projects (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references public.caster_profiles(id) on delete cascade,
  title text not null,
  description text,
  area text,
  status text not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.caster_preferences (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references public.caster_profiles(id) on delete cascade,
  key text not null,
  value text not null,
  confidence numeric not null default 0.75,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.caster_memories (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references public.caster_profiles(id) on delete cascade,
  category text not null,
  title text not null,
  value text not null,
  confidence numeric not null default 0.75,
  source text not null default 'manual',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists caster_goals_profile_id_idx on public.caster_goals(profile_id);
create index if not exists caster_projects_profile_id_idx on public.caster_projects(profile_id);
create index if not exists caster_preferences_profile_id_idx on public.caster_preferences(profile_id);
create index if not exists caster_memories_profile_id_idx on public.caster_memories(profile_id);
create index if not exists caster_memories_category_idx on public.caster_memories(category);

-- Optional seed profile for local testing.
insert into public.caster_profiles (name, role)
values ('Vikke', 'Founder')
on conflict do nothing;
