interface DaySectionProps {
  day: string;
  location?: string;
}

export function DaySection({ day, location }: DaySectionProps) {
  return (
    <div>
      <div className="text-5xl sm:text-7xl font-black tracking-widest py-3">
        {day}
      </div>
      {location && (
        <div className="inline-flex items-center gap-2 mt-1 px-3 py-1.5 bg-brand-orange text-brand-red-dark font-bold tracking-widest text-sm sm:text-base uppercase">
          📍 {location}
        </div>
      )}
    </div>
  );
}
