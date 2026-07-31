import Image from 'next/image';
import { Talk } from '@/lib/types';
import { StreamBadge } from './StreamBadge';

interface TalkCardProps {
  talk: Talk;
  onClick: () => void;
}

export function TalkCard({ talk, onClick }: TalkCardProps) {
  const streams = talk.streams ?? [];

  return (
    <button
      onClick={onClick}
      className="flex flex-col text-left w-full sm:w-72 shrink-0 cursor-pointer overflow-hidden bg-black/30 hover:bg-brand-teal hover:scale-105 hover:border-brand-cream active:bg-brand-teal active:border-brand-cream active:scale-95 transition-all duration-200 border-2 border-brand-cream/20 touch-manipulation"
    >
      <div className="w-full h-44 relative bg-brand-red">
        <Image
          src={talk.image_url || '/images/hero-banner.png'}
          alt={talk.title}
          fill
          className="object-cover object-center"
        />
      </div>
      <div className="p-4 flex flex-col gap-2">
        {streams.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {streams.map((stream) => (
              <StreamBadge key={stream} stream={stream} />
            ))}
          </div>
        )}
        <p className="text-base font-bold leading-snug text-brand-cream">{talk.title}</p>
      </div>
    </button>
  );
}
