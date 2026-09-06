'use client';

import { useState } from 'react';
import {
  Talk,
  Stream,
  STREAMS,
  STREAM_BADGE_CLASSES,
  DAY_LABELS,
  TIMESLOT_LABELS,
} from '@/lib/types';
import { DaySection } from './DaySection';
import { TimeSlotRow } from './TimeSlotRow';
import { TalkModal } from './TalkModal';
import { PanelCard } from './PanelCard';

const CONFERENCE_LOCATION = 'Location: Lower Napier, Adelaide University';

interface ProgramViewProps {
  talks: Talk[];
}

interface SpecialEventProps {
  time: string;
  title: string;
  label: string;
  image?: string;
}

function SpecialEventRow({ time, title, label, image }: SpecialEventProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="text-3xl sm:text-4xl font-bold text-brand-orange">{time}</div>
      <div className="flex flex-col sm:flex-row flex-wrap gap-4">
        <PanelCard title={title} label={label} image={image} />
      </div>
    </div>
  );
}

interface StreamFilterProps {
  activeStream: Stream | null;
  onChange: (stream: Stream | null) => void;
}

function StreamFilter({ activeStream, onChange }: StreamFilterProps) {
  const baseClass =
    'px-3 py-2 text-xs sm:text-sm font-bold tracking-widest uppercase border-2 transition-all active:scale-95 touch-manipulation';

  return (
    <div className="flex flex-col gap-3">
      <p className="text-xs sm:text-sm font-bold tracking-widest uppercase text-brand-cream/70">
        Filter by stream
      </p>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onChange(null)}
          className={`${baseClass} border-brand-cream ${
            activeStream === null
              ? 'bg-brand-cream text-brand-red'
              : 'text-brand-cream hover:bg-brand-cream hover:text-brand-red'
          }`}
        >
          All sessions
        </button>
        {STREAMS.map((stream) => (
          <button
            key={stream}
            onClick={() => onChange(stream)}
            className={`${baseClass} border-brand-cream/40 ${
              activeStream === stream
                ? STREAM_BADGE_CLASSES[stream]
                : 'text-brand-cream hover:border-brand-cream'
            }`}
          >
            {stream}
          </button>
        ))}
      </div>
    </div>
  );
}

export function ProgramView({ talks }: ProgramViewProps) {
  const [modalTalk, setModalTalk] = useState<Talk | null>(null);
  const [activeStream, setActiveStream] = useState<Stream | null>(null);

  const visibleTalks = activeStream
    ? talks.filter((talk) => (talk.streams ?? []).includes(activeStream))
    : talks;

  const getTalksForSlot = (day: number, timeslot: number) =>
    visibleTalks.filter((talk) => talk.day === day && talk.timeslot === timeslot);

  const dayHasTalks = (day: number) => visibleTalks.some((talk) => talk.day === day);

  // Panels and workshops don't belong to a stream, so they only show unfiltered.
  const isFiltering = activeStream !== null;

  const renderSlots = (day: 1 | 2, slots: readonly (1 | 2 | 3 | 4)[]) =>
    slots.map((slot) => {
      const slotTalks = getTalksForSlot(day, slot);
      // When filtering, drop empty slots rather than showing "Talks TBC".
      if (isFiltering && slotTalks.length === 0) return null;
      return (
        <TimeSlotRow
          key={slot}
          time={TIMESLOT_LABELS[slot]}
          talks={slotTalks}
          onTalkClick={setModalTalk}
        />
      );
    });

  return (
    <main className="max-w-5xl mx-auto w-full px-4 sm:px-8 py-12 flex flex-col gap-12">
      <div className="flex flex-col gap-6">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-[0.3em] uppercase text-brand-orange">
          Program
        </h1>
        <StreamFilter activeStream={activeStream} onChange={setActiveStream} />
      </div>

      {isFiltering && visibleTalks.length === 0 && (
        <p className="text-brand-cream/70 italic">
          No sessions in this stream yet.
        </p>
      )}

      {/* Friday opening night */}
      {!isFiltering && (
        <section className="flex flex-col gap-8">
          <DaySection day="FRIDAY" />
          <SpecialEventRow
            time="6:30 PM"
            label="Opening Night"
            title="Building a Socialist Fightback to the Far-Right Insurgency in Australia"
            image="/images/opening-night.webp"
          />
        </section>
      )}

      {/* Saturday */}
      {(!isFiltering || dayHasTalks(1)) && (
        <section className="flex flex-col gap-8">
          <DaySection day={DAY_LABELS[1]} location={CONFERENCE_LOCATION} />
          <div className="flex flex-col gap-10">
            {/* Morning sessions */}
            {renderSlots(1, [1, 2] as const)}

            {/* Lunchtime high school meet-up */}
            {!isFiltering && (
              <SpecialEventRow
                time="1:00 PM"
                label="Lunchtime Meet-Up"
                title="High School Anti-Capitalists Meet Up"
                image="/images/hs-anticapitalists-meetup.webp"
              />
            )}

            {/* Afternoon sessions */}
            {renderSlots(1, [3, 4] as const)}

            {/* Saturday night all-in panel */}
            {!isFiltering && (
              <SpecialEventRow
                time="7:00 PM"
                label="All-In Panel"
                title="Endless War and Genocide in the Middle East, Where to Next for the Palestine Movement?"
              />
            )}
          </div>
        </section>
      )}

      {/* Sunday */}
      {(!isFiltering || dayHasTalks(2)) && (
        <section className="flex flex-col gap-8">
          <DaySection day={DAY_LABELS[2]} location={CONFERENCE_LOCATION} />
          <div className="flex flex-col gap-10">
            {/* Morning sessions */}
            {renderSlots(2, [1, 2] as const)}

            {/* Lunchtime SA Socialists workshop */}
            {!isFiltering && (
              <SpecialEventRow
                time="1:00 PM"
                label="Lunchtime Workshop"
                title="SA Socialists: How to get involved with the Victorian State Election"
                image="/images/sa-socialists-meetup.webp"
              />
            )}

            {/* Afternoon sessions */}
            {renderSlots(2, [3, 4] as const)}
          </div>
        </section>
      )}

      {/* Sunday closing night */}
      {!isFiltering && (
        <section className="flex flex-col gap-8">
          <DaySection day="SUNDAY" />
          <SpecialEventRow
            time="6:30 PM"
            label="Closing Night"
            title="The Fight for Socialism Today"
            image="/images/closing-night.webp"
          />
        </section>
      )}

      {modalTalk && (
        <TalkModal talk={modalTalk} onClose={() => setModalTalk(null)} />
      )}
    </main>
  );
}
