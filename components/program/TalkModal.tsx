'use client';

import Image from 'next/image';
import { Talk } from '@/lib/types';
import { StreamBadge } from './StreamBadge';

interface TalkModalProps {
  talk: Talk;
  onClose: () => void;
}

export function TalkModal({ talk, onClose }: TalkModalProps) {
  const description = talk.description || 'Session Description Coming Soon';
  const readings = talk.readings ?? [];
  const streams = talk.streams ?? [];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
      onClick={onClose}
    >
      <div
        className="bg-brand-red border-4 border-brand-teal w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 flex flex-col gap-5 text-brand-cream"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="text-sm font-bold tracking-widest text-brand-orange hover:text-brand-cream transition-colors"
          >
            CLOSE
          </button>
        </div>

        <div className="relative w-full h-64 rounded-lg overflow-hidden">
          <Image
            src={talk.image_url || '/images/hero-banner.webp'}
            alt={talk.title}
            fill
            sizes="(max-width: 672px) 100vw, 672px"
            className="object-cover object-center"
          />
        </div>

        <div className="flex flex-col gap-2">
          {streams.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {streams.map((stream) => (
                <StreamBadge key={stream} stream={stream} />
              ))}
            </div>
          )}
          <h2 className="text-2xl sm:text-3xl font-black leading-snug text-brand-cream">{talk.title}</h2>
          {talk.show_speaker && talk.speaker && (
            <p className="text-base text-brand-orange mt-1">{talk.speaker}</p>
          )}
        </div>

        <p className="text-base leading-relaxed">{description}</p>

        {readings.length > 0 && (
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-bold tracking-wider text-brand-orange">READINGS</h3>
            {readings.map((reading, i) => (
              <div key={i} className="text-sm">
                {reading.link ? (
                  <a
                    href={reading.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-orange underline hover:text-brand-cream"
                  >
                    {reading.text}
                  </a>
                ) : (
                  <span>{reading.text}</span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
