-- =====================================================
-- Socialism 2026 — optional stream tag on talks
-- =====================================================
-- Streams are optional: sessions that don't belong to a stream leave this null.

alter table public.talks
  add column if not exists stream text;

alter table public.talks
  drop constraint if exists talks_stream_check;

alter table public.talks
  add constraint talks_stream_check
  check (
    stream is null
    or stream in (
      'Marxist Foundations',
      'Chile 1972',
      'Fighting Sexism',
      'The Far-Right'
    )
  );

create index if not exists talks_stream_idx on public.talks (stream);
