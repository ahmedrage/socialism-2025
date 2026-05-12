export interface Reading {
  text: string;
  link: string;
}

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
