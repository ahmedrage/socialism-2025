-- =====================================================
-- Socialism 2026 — allow a talk to belong to several streams
-- =====================================================
-- Replaces the singular `stream` column with a `streams` array.
-- A talk can belong to zero, one, or many streams.

alter table public.talks
  add column if not exists streams text[] not null default '{}';

-- Carry across the existing single-stream assignments.
update public.talks
set streams = array[stream]
where stream is not null and streams = '{}';

-- Retire the singular column and its constraint/index.
alter table public.talks drop constraint if exists talks_stream_check;
drop index if exists public.talks_stream_idx;
alter table public.talks drop column if exists stream;

-- Every element must be one of the known streams; an empty array is allowed.
alter table public.talks drop constraint if exists talks_streams_check;

alter table public.talks
  add constraint talks_streams_check
  check (
    streams <@ array[
      'Marxist Foundations',
      'Chile 1972',
      'Fighting Sexism',
      'The Far-Right'
    ]::text[]
  );

create index if not exists talks_streams_idx on public.talks using gin (streams);
