-- =====================================================
-- Socialism 2026 — fix speakers
-- The first seed used the organising-tab names (people responsible
-- for following up); these are the actual speakers from the program tab.
-- =====================================================

update public.talks set speaker = 'Greta'  where title = 'Masters of the Universe: Understanding the Capitalist Class';
update public.talks set speaker = 'Harvey' where title = 'The Capitalist State: Power, Coercion, and Class Rule';
update public.talks set speaker = 'Ahmed'  where title = 'Revolution: How We Can Change the World';
update public.talks set speaker = 'Alex'   where title = 'Understanding Imperialism: Capitalism and War';
update public.talks set speaker = 'Grace'  where title = 'Women''s Oppression and Liberation';
update public.talks set speaker = 'Raph'   where title = 'The Real Story of the Russian Revolution';
update public.talks set speaker = 'Phoebe' where title = 'Revolution Betrayed: Understanding Stalin''s Counter-Revolution';
update public.talks set speaker = 'Tom'    where title = 'Why Do We Need Socialist Organisation?';
update public.talks set speaker = 'Grace'  where title = 'Why Identity Politics Isn''t Liberating';
update public.talks set speaker = 'Kalesh' where title = 'Occupation, Colonialism and Imperialism: Why Capitalism Oppresses Palestine';
update public.talks set speaker = 'Jaan'   where title = 'Fascism, Capitalism and Class Struggle';
