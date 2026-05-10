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
      <h1 className="text-4xl sm:text-6xl font-black tracking-widest">PROGRAM</h1>

      {/* Friday opening night */}
      <section className="flex flex-col gap-3">
        <DaySection day="FRIDAY" location="Venue TBC" />
        <div className="flex flex-col gap-1 mt-2">
          <div className="text-3xl sm:text-4xl font-bold text-red-500">6:30 PM</div>
          <p className="text-gray-300 text-base mt-2">Opening Night — Details TBC</p>
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
      </section>

      {/* Sunday */}
      <section className="flex flex-col gap-8">
        <DaySection day={DAY_LABELS[2]} location="Lower Napier, The University of Adelaide" />
        <div className="flex flex-col gap-10">
          {([1, 2, 3, 4] as const).map((slot) => (
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
        <DaySection day="SUNDAY" location="Venue TBC" />
        <div className="flex flex-col gap-1 mt-2">
          <div className="text-3xl sm:text-4xl font-bold text-red-500">6:30 PM</div>
          <p className="text-gray-300 text-base mt-2">Closing Night — Details TBC</p>
        </div>
      </section>

      {modalTalk && (
        <TalkModal talk={modalTalk} onClose={() => setModalTalk(null)} />
      )}
    </main>
  );
}
