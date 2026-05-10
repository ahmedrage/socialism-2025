'use client';

import { useState } from 'react';
import { Talk, DAY_LABELS, TIMESLOT_LABELS } from '@/lib/types';
import { DaySection } from './DaySection';
import { TimeSlotRow } from './TimeSlotRow';
import { TalkModal } from './TalkModal';

interface ProgramViewProps {
  talks: Talk[];
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
      <section className="flex flex-col gap-3">
        <DaySection day="FRIDAY" />
        <div className="flex flex-col gap-1 mt-2">
          <div className="text-3xl sm:text-4xl font-bold text-brand-orange">6:30 PM</div>
          <p className="text-2xl sm:text-3xl font-bold mt-2">
            Opening Night: Capitalism is a nightmare, we need socialism
          </p>
        </div>
      </section>

      {/* Saturday */}
      <section className="flex flex-col gap-8">
        <DaySection day={DAY_LABELS[1]} location="Lower Napier, The University of Adelaide" />
        <div className="flex flex-col gap-10">
          {([1, 2, 3, 4] as const).map((slot) => (
            <TimeSlotRow
              key={slot}
              time={TIMESLOT_LABELS[slot]}
              talks={getTalksForSlot(1, slot)}
              onTalkClick={setModalTalk}
            />
          ))}
        </div>

        {/* Saturday night all-in panel */}
        <div className="flex flex-col gap-1 mt-4 border-t-2 border-brand-cream/20 pt-6">
          <div className="text-3xl sm:text-4xl font-bold text-brand-orange">7:00 PM</div>
          <p className="text-sm uppercase tracking-widest text-brand-orange/80 mt-1">All-In Panel</p>
          <p className="text-2xl sm:text-3xl font-bold mt-2">
            Fighting for a Free Palestine
          </p>
        </div>
      </section>

      {/* Sunday */}
      <section className="flex flex-col gap-8">
        <DaySection day={DAY_LABELS[2]} location="Lower Napier, The University of Adelaide" />
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
          <div className="flex flex-col gap-1 border-y-2 border-brand-cream/20 py-6">
            <div className="text-3xl sm:text-4xl font-bold text-brand-orange">1:00 PM</div>
            <p className="text-sm uppercase tracking-widest text-brand-orange/80 mt-1">Lunchtime Workshop</p>
            <p className="text-2xl sm:text-3xl font-bold mt-2">
              How to get involved in the council election
            </p>
          </div>

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
      <section className="flex flex-col gap-3">
        <DaySection day="SUNDAY" />
        <div className="flex flex-col gap-1 mt-2">
          <div className="text-3xl sm:text-4xl font-bold text-brand-orange">6:30 PM</div>
          <p className="text-2xl sm:text-3xl font-bold mt-2">
            Closing Night: The Fight for Socialism Today
          </p>
        </div>
      </section>

      {modalTalk && (
        <TalkModal talk={modalTalk} onClose={() => setModalTalk(null)} />
      )}
    </main>
  );
}
