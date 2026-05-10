-- =====================================================
-- Socialism 2026 — initial schema
-- =====================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- =====================================================
-- talks table
-- =====================================================
create table if not exists public.talks (
  id            uuid primary key default uuid_generate_v4(),
  title         text not null,
  speaker       text,
  image_url     text,
  description   text,
  day           smallint not null check (day in (1, 2)),       -- 1 = Saturday, 2 = Sunday
  timeslot      smallint not null check (timeslot in (1, 2, 3, 4)), -- 1=10AM, 2=12PM, 3=2:30PM, 4=4:30PM
  readings      jsonb default '[]'::jsonb,
  created_at    timestamptz not null default now()
);

create index if not exists talks_day_timeslot_idx on public.talks (day, timeslot);

-- =====================================================
-- config table (key/value)
-- =====================================================
create table if not exists public.config (
  key    text primary key,
  value  jsonb not null
);

-- Seed: site is not released yet
insert into public.config (key, value)
values ('is_released', 'false'::jsonb)
on conflict (key) do nothing;

-- =====================================================
-- Row Level Security
-- =====================================================
alter table public.talks  enable row level security;
alter table public.config enable row level security;

-- Public read access on both tables
drop policy if exists "talks_public_select"  on public.talks;
create policy "talks_public_select"  on public.talks  for select using (true);

drop policy if exists "config_public_select" on public.config;
create policy "config_public_select" on public.config for select using (true);

-- Authenticated users can write talks
drop policy if exists "talks_auth_insert" on public.talks;
create policy "talks_auth_insert" on public.talks for insert
  to authenticated with check (true);

drop policy if exists "talks_auth_update" on public.talks;
create policy "talks_auth_update" on public.talks for update
  to authenticated using (true) with check (true);

drop policy if exists "talks_auth_delete" on public.talks;
create policy "talks_auth_delete" on public.talks for delete
  to authenticated using (true);

-- Authenticated users can update config
drop policy if exists "config_auth_update" on public.config;
create policy "config_auth_update" on public.config for update
  to authenticated using (true) with check (true);
