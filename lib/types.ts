export interface Reading {
  text: string;
  link: string;
}

export const STREAMS = [
  'Marxist Foundations',
  'Chile 1972',
  'Fighting Sexism',
  'The Far-Right',
] as const;

export type Stream = (typeof STREAMS)[number];

// Tailwind classes are written out in full so the JIT compiler can find them.
export const STREAM_BADGE_CLASSES: Record<Stream, string> = {
  'Marxist Foundations': 'bg-brand-teal text-brand-cream',
  'Chile 1972': 'bg-brand-pink text-brand-red-dark',
  'Fighting Sexism': 'bg-brand-mint text-brand-red-dark',
  'The Far-Right': 'bg-brand-brown text-brand-red-dark',
};

export interface Talk {
  id: string;
  title: string;
  speaker: string;
  image_url: string | null;
  description: string | null;
  day: 1 | 2; // 1 = Saturday, 2 = Sunday
  timeslot: 1 | 2 | 3 | 4; // 1 = 10AM, 2 = 12PM, 3 = 2:30PM, 4 = 4:30PM
  readings: Reading[] | null;
  show_speaker: boolean;
  streams: Stream[]; // A talk can belong to zero, one, or many streams.
  created_at: string;
}

export interface Config {
  key: string;
  value: boolean | string | number | object;
}

export const DAY_LABELS: Record<number, string> = {
  1: 'SATURDAY',
  2: 'SUNDAY',
};

export const TIMESLOT_LABELS: Record<number, string> = {
  1: '10:00 AM',
  2: '12:00 PM',
  3: '2:30 PM',
  4: '4:30 PM',
};
