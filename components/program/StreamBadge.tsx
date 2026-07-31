import { Stream, STREAM_BADGE_CLASSES } from '@/lib/types';

interface StreamBadgeProps {
  stream: Stream;
}

export function StreamBadge({ stream }: StreamBadgeProps) {
  return (
    <span
      className={`inline-block self-start px-2 py-0.5 text-[0.65rem] sm:text-xs font-bold tracking-widest uppercase ${STREAM_BADGE_CLASSES[stream]}`}
    >
      {stream}
    </span>
  );
}
