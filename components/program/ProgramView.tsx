'use client';

import { useState } from 'react';
import { Talk, DAY_LABELS, TIMESLOT_LABELS } from '@/lib/types';
import { DaySection } from './DaySection';
import { TimeSlotRow } from './TimeSlotRow';
import { TalkModal } from './TalkModal';
import { PanelCard } from './PanelCard';

interface ProgramViewProps {
  talks: Talk[];
}

interface SpecialEventProps {
  time: string;
  title: string;
  label: string;
}

function SpecialEventRow({ time, title, label }: SpecialEventProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="text-3xl sm:text-4xl font-bold text-brand-orange">{time}</div>
      <div className="flex flex-col sm:flex-row flex-wrap gap-4">
        <PanelCard title={title} label={label} />
      </div>
    </div>
  );
}

export function ProgramView({ talks }: ProgramViewProps) {
  const [modalTalk, setModalTalk] = useState<Talk | null>(null);

  const getTalksForSlot = (day: number, timeslot: number) =>
    talks.filter((t) => t.day === day && t.timeslot === timeslot);

  return (
    <main className="max-w-5xl mx-auto w-full px-4 sm:px-8 py-12 flex flex-col gap-12">
      <h1 className="text-2xl sm:text-3xl font-bold tracking-[0.3em] uppercase text-brand-orange -mb-4">
        Program
      </h1>

      {/* Friday opening night */}
      <section className="flex flex-col gap-8">
        <DaySection day="FRIDAY" />
        <SpecialEventRow
          time="6:30 PM"
          label="Opening Night"
          title="Capitalism is a nightmare, we need socialism"
        />
      </section>

      {/* Saturday */}
      <section className="flex flex-col gap-8">
        <DaySection day={DAY_LABELS[1]} location="Location: TBA" />
        <div className="flex flex-col gap-10">
          {([1, 2, 3, 4] as const).map((slot) => (
            <TimeSlotRow
              key={slot}
              time={TIMESLOT_LABELS[slot]}
              talks={getTalksForSlot(1, slot)}
              onTalkClick={setModalTalk}
            />
          ))}

          {/* Saturday night all-in panel */}
          <SpecialEventRow
            time="7:00 PM"
            label="All-In Panel"
            title="Fighting for a Free Palestine"
          />
        </div>
      </section>

      {/* Sunday */}
      <section className="flex flex-col gap-8">
        <DaySection day={DAY_LABELS[2]} location="Location: TBA" />
        <div className="flex flex-col gap-10">
          {/* Morning sessions */}
          {([1, 2] as const).map((slot) => (
            <TimeSlotRow
              key={slot}
              time={TIMESLOT_LABELS[slot]}
              talks={getTalksForSlot(2, slot)}
              onTalkClick={setModalTalk}
            />
          ))}

          {/* Lunchtime council workshop */}
          <SpecialEventRow
            time="1:00 PM"
            label="Lunchtime Workshop"
            title="How to get involved in the council election"
          />

          {/* Afternoon sessions */}
          {([3, 4] as const).map((slot) => (
            <TimeSlotRow
              key={slot}
              time={TIMESLOT_LABELS[slot]}
              talks={getTalksForSlot(2, slot)}
              onTalkClick={setModalTalk}
            />
          ))}
        </div>
      </section>

      {/* Sunday closing night */}
      <section className="flex flex-col gap-8">
        <DaySection day="SUNDAY" />
        <SpecialEventRow
          time="6:30 PM"
          label="Closing Night"
          title="The Fight for Socialism Today"
        />
      </section>

      {modalTalk && (
        <TalkModal talk={modalTalk} onClose={() => setModalTalk(null)} />
      )}
    </main>
  );
}
