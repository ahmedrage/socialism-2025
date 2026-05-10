import Image from 'next/image';
import { Talk } from '@/lib/types';

interface TalkCardProps {
  talk: Talk;
  onClick: () => void;
}

export function TalkCard({ talk, onClick }: TalkCardProps) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col text-left w-full sm:w-72 shrink-0 cursor-pointer rounded-lg overflow-hidden bg-zinc-900 hover:bg-zinc-800 hover:scale-105 transition-all duration-200 shadow-lg"
    >
      <div className="w-full h-44 relative bg-zinc-700">
        {talk.image_url ? (
          <Image
            src={talk.image_url}
            alt={talk.title}
            fill
            className="object-cover object-center"
          />
        ) : (
          <div className="w-full h-full bg-zinc-700" />
        )}
      </div>
      <div className="p-4 flex flex-col gap-1">
        <p className="text-base font-bold leading-snug">{talk.title}</p>
        <p className="text-sm text-gray-400">{talk.speaker}</p>
      </div>
    </button>
  );
}
