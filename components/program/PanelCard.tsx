import Image from 'next/image';

interface PanelCardProps {
  title: string;
  label: string;
  image?: string;
}

export function PanelCard({ title, label, image }: PanelCardProps) {
  return (
    <div className="flex flex-col text-left w-full sm:w-72 shrink-0 overflow-hidden bg-black/30 border-2 border-brand-cream/20">
      <div className="w-full h-44 relative bg-brand-red">
        <Image
          src={image || '/images/hero-banner.webp'}
          alt={title}
          fill
          // Already WebP at the size the card needs — optimizing buys nothing.
          unoptimized
          className="object-cover object-center"
        />
      </div>
      <div className="p-4 flex flex-col gap-1">
        <p className="text-xs sm:text-sm font-bold tracking-widest uppercase text-brand-orange">
          {label}
        </p>
        <p className="text-base font-bold leading-snug text-brand-cream">{title}</p>
      </div>
    </div>
  );
}
