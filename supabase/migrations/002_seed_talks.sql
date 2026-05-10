-- =====================================================
-- Socialism 2026 — seed talks from the planning doc
-- Day: 1 = Saturday, 2 = Sunday
-- Timeslot: 1 = 10 AM, 2 = 12 PM, 3 = 2:30 PM, 4 = 4:30 PM
-- =====================================================

-- Clear any existing talks before re-seeding
delete from public.talks;

insert into public.talks (title, speaker, day, timeslot, description, readings) values
-- Saturday 10 AM ------------------------------------------------
(
  'Masters of the Universe: Understanding the Capitalist Class',
  'Tom and Ahmed',
  1, 1,
  null,
  '[]'::jsonb
),
(
  'Early Marxists on Women''s Oppression',
  'Shirley',
  1, 1,
  'Marxists are among some of the earliest proponents of women''s rights. The positions adopted and advocated by Marx and Engels themselves, as well as some of their most high profile adherents in the nineteenth century, stand the test of time better than many of their contemporaries'' positions. This talk will look at what these positions were, how the radical approach of the early Marxist movement underpinned them and why they still provide an important guide for women''s liberation today.',
  '[]'::jsonb
),

-- Saturday 12 PM ------------------------------------------------
(
  'The Capitalist State: Power, Coercion, and Class Rule',
  'Tom and Ahmed',
  1, 2,
  null,
  '[]'::jsonb
),
(
  'Why Identity Politics Isn''t Liberating',
  'Jack Crawford',
  1, 2,
  'Identity politics is the dominant framework on the left for fighting for oppressed groups. Core assumptions include the idea that people from different oppressed identities have separate interests and should organise autonomously from each other, and that people who don''t experience a particular oppression have no role to play in fighting it, or worse, they benefit from it. This session will argue why this approach is disastrous, and how we should actually organise to fight against racism, transphobia, sexism and all the other shit this system throws at us.',
  '[]'::jsonb
),
(
  'Reform or Revolution: The Allende Government and the Workers'' Movement in Chile',
  'Jacob',
  1, 2,
  'This session forms part of the ''Revolutionary process in Allende''s Chile (1970–1973)'' series. It examines critically the compromises Allende made, the positions the radical left took in response, and the potential for socialism in Chile 1973 — through revolution, not reform of the capitalist state.',
  '[]'::jsonb
),

-- Saturday 2:30 PM ----------------------------------------------
(
  'Revolution: How We Can Change the World',
  'Tom and Ahmed',
  1, 3,
  null,
  '[]'::jsonb
),
(
  'War, Racism and Authoritarianism: Understanding Trump''s America',
  'Jack Crawford',
  1, 3,
  'From the Minneapolis general strike against ICE terror to the wider authoritarian project of the Trump administration — what kind of opposition can actually defeat it? This session points to the need for an independent, working-class movement capable of confronting both Trump and the system he represents.',
  '[]'::jsonb
),
(
  'The Fight for Women''s Suffrage: A Movement Divided by Class',
  'Leila',
  1, 3,
  'A look at the suffrage movement, the working-class women who actually won the vote, and the limitations of the Suffragette leaders.',
  '[{"text":"How working-class women won the vote (ISJ)","link":"http://isj.org.uk/how-working-class-women-won-the-vote/"},{"text":"Sylvia Pankhurst: demanding liberation","link":"https://socialistworker.co.uk/art/9839/Sylvia+Pankhurst%3A+demanding+liberation"},{"text":"Sylvia Pankhurst — a rebel in the fight for votes","link":"https://socialistworker.co.uk/art/50653/Sylvia+Pankhurst+++a+rebel+in+the+fight+for+votes"},{"text":"Cliff: Class Struggle and Women''s Liberation (England)","link":"https://www.marxists.org/archive/cliff/works/1984/women/07-england.htm"}]'::jsonb
),

-- Saturday 4:30 PM ----------------------------------------------
(
  'Women''s Oppression and Liberation',
  'Tom and Ahmed',
  1, 4,
  null,
  '[]'::jsonb
),
(
  'Lenin on the Soviets and the Revolutionary Party',
  'Sandra',
  1, 4,
  'Soviets are often seen in an "instrumentalist" way (e.g. organising production) and treated as a guarantee of a successful revolution. Lenin developed a more political analysis: he saw them as essential forums which enabled the mass of workers and the oppressed to participate in the debates arising from the revolution. This session discusses these views and how Lenin conceptualised the role of a revolutionary party and its relationship to the Soviets, with reference to Russia and the experience of other revolutions.',
  '[{"text":"Soviet — Trotsky''s 1905 (Red Flag)","link":"https://redflag.org.au/article/soviet-trotskys-1905/"}]'::jsonb
),
(
  'Fascism, Capitalism and Class Struggle',
  'Jack Crawford',
  1, 4,
  'Far-right movements have grown in tandem with an increasingly authoritarian state. Around the world, governments are expanding police powers, criminalising protest and intensifying state violence. This session situates the rise of fascism within the contradictions of capitalism and asks what the working-class movement must do to confront it.',
  '[]'::jsonb
),

-- Sunday 10 AM --------------------------------------------------
(
  'Understanding Imperialism: Capitalism and War',
  'Tom and Ahmed',
  2, 1,
  null,
  '[]'::jsonb
),
(
  'Promise and Contradiction: The Sexual Revolution',
  'Bri',
  2, 1,
  'The sexual revolution was supposed to free women from restrictive conventions and remove the double standard in sexual behaviour between men and women. While it has undoubtedly ushered in a period of greater freedom, it has not necessarily made sex better for women or their relationships more fulfilling — often, it has functioned to give license to men to treat women in a grossly sexist manner. This discussion looks at how we can explain this failure and why capitalism cannot accommodate real freedom.',
  '[]'::jsonb
),

-- Sunday 12 PM --------------------------------------------------
(
  'The Real Story of the Russian Revolution',
  'Tom and Ahmed',
  2, 2,
  null,
  '[]'::jsonb
),
(
  'Occupation, Colonialism and Imperialism: Why Capitalism Oppresses Palestine',
  'Jack Crawford',
  2, 2,
  'Israel''s assault on Palestine is one of the clearest examples of imperialism in action. Over its nearly 80 year history, Israel has carried out occupations, genocide, apartheid, and military domination — all backed by major global powers. This session explores why capitalism drives imperialism and its relationship to the oppression of Palestine today.',
  '[]'::jsonb
),

-- Sunday 2:30 PM ------------------------------------------------
(
  'Chile on the Brink: Workers'' Power and the Cordones',
  'Liza',
  2, 3,
  'In 1972, workers in Chile ran their own factories in response to factory closures by right-wing business owners aimed at crippling Allende''s government. To do this, workers formed cordones industriales (industrial belts) — radical, democratic bodies which controlled their workplaces. These bodies partially resembled workers'' councils, as seen in revolutions in Russia, Germany and other parts of the world. They were the fullest expression of the revolutionary process in Chile and never fully subordinated themselves to the Allende government.',
  '[]'::jsonb
),
(
  'Revolution Betrayed: Understanding Stalin''s Counter-Revolution',
  'Tom and Ahmed',
  2, 3,
  null,
  '[]'::jsonb
),
(
  'Racism in Australia: Origins and Why It Persists Today',
  'Vinil',
  2, 3,
  'This talk examines why racism persists today — embedded in policing, housing, the labour market, and political culture. Understanding racism as a structural feature of Australian capitalism is essential for anyone serious about fighting it.',
  '[]'::jsonb
),
(
  'Combatting the Threat of One Nation in Australia Today',
  'Mick',
  2, 3,
  null,
  '[]'::jsonb
),

-- Sunday 4:30 PM ------------------------------------------------
(
  'Why Do We Need Socialist Organisation?',
  'Tom and Ahmed',
  2, 4,
  null,
  '[]'::jsonb
),
(
  'Radical SA History: The 1974 Flinders University Student Occupation',
  'Nix',
  2, 4,
  'In the 1960s and 1970s, Flinders University emerged as a centre of radical politics. Shaped by the movement against the Vietnam War, students challenged both campus authorities and the role of higher education within capitalism. The high point was 1974, with the month-long occupation of the University Registry. As the occupiers declared: "show that a university''s resources are for the people and not the bureaucrats and their bosses!" This session unpacks the history of protest at Flinders and Australia''s longest student occupation.',
  '[]'::jsonb
),
(
  'From Revolutionary Process to Reaction: Pinochet and the Neoliberal Experiment in Chile',
  'Raph',
  2, 4,
  'Pinochet not as reform but as a project of capitalist restoration — imposed through repression of the radical left, privatisation of the state, and the disciplining of labour. The talk also reflects on the contradictions of the reformist path chosen by Allende and the lessons this history holds for struggles today. Part of the ''Revolutionary process in Allende''s Chile (1970–1973)'' series.',
  '[]'::jsonb
);
