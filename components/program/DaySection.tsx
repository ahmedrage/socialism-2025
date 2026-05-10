interface DaySectionProps {
  day: string;
  location: string;
}

export function DaySection({ day, location }: DaySectionProps) {
  return (
    <div>
      <div className="text-5xl sm:text-7xl font-black tracking-widest py-3">
        {day}
      </div>
      <div className="text-lg sm:text-xl text-gray-400 pl-1">
        {location}
      </div>
    </div>
  );
}
