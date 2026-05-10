import { Talk } from '@/lib/types';
import { TalkCard } from './TalkCard';

interface TimeSlotRowProps {
  time: string;
  talks: Talk[];
  onTalkClick: (talk: Talk) => void;
}

export function TimeSlotRow({ time, talks, onTalkClick }: TimeSlotRowProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="text-3xl sm:text-4xl font-bold text-red-500">{time}</div>
      <div className="flex flex-col sm:flex-row flex-wrap gap-4">
        {talks.map((talk) => (
          <TalkCard key={talk.id} talk={talk} onClick={() => onTalkClick(talk)} />
        ))}
        {talks.length === 0 && (
          <p className="text-gray-600 italic text-sm">Talks TBC</p>
        )}
      </div>
    </div>
  );
}
