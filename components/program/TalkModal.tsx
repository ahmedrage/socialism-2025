'use client';

import Image from 'next/image';
import { Talk } from '@/lib/types';

interface TalkModalProps {
  talk: Talk;
  onClose: () => void;
}

export function TalkModal({ talk, onClose }: TalkModalProps) {
  const description = talk.description || 'Session Description Coming Soon';
  const readings = talk.readings ?? [];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
      onClick={onClose}
    >
      <div
        className="bg-zinc-900 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 flex flex-col gap-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="text-sm font-bold tracking-widest text-gray-400 hover:text-white transition-colors"
          >
            CLOSE
          </button>
        </div>

        {talk.image_url && (
          <div className="relative w-full h-64 rounded-lg overflow-hidden">
            <Image
              src={talk.image_url}
              alt={talk.title}
              fill
              className="object-cover object-center"
            />
          </div>
        )}

        <div>
          <h2 className="text-2xl sm:text-3xl font-black leading-snug">{talk.title}</h2>
          <p className="text-base text-gray-400 mt-1">{talk.speaker}</p>
        </div>

        <p className="text-base text-gray-200 leading-relaxed">{description}</p>

        {readings.length > 0 && (
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-bold tracking-wider">READINGS</h3>
            {readings.map((reading, i) => (
              <div key={i} className="text-sm">
                {reading.link ? (
                  <a
                    href={reading.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 underline hover:text-blue-300"
                  >
                    {reading.text}
                  </a>
                ) : (
                  <span className="text-gray-300">{reading.text}</span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
