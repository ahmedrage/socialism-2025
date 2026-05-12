-- =====================================================
-- Socialism 2026 — add `show_speaker` flag to talks
-- Defaults to false: speaker name is hidden in the public modal
-- unless an admin explicitly opts in per-talk.
-- =====================================================

alter table public.talks
  add column if not exists show_speaker boolean not null default false;
