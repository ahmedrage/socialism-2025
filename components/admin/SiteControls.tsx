'use client';

import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

interface SiteControlsProps {
  isReleased: boolean;
}

export default function SiteControls({ isReleased }: SiteControlsProps) {
  const router = useRouter();

  async function handleToggle() {
    const supabase = createClient();
    await supabase
      .from('config')
      .update({ value: !isReleased })
      .eq('key', 'is_released');
    router.refresh();
  }

  return (
    <div className="flex items-center gap-4 mb-8 p-4 bg-gray-900 rounded border border-gray-800">
      <span className="text-sm text-gray-400">
        Site is currently{' '}
        <span className={isReleased ? 'text-green-400 font-medium' : 'text-yellow-400 font-medium'}>
          {isReleased ? 'released' : 'unreleased'}
        </span>
      </span>
      <button
        onClick={handleToggle}
        className={`px-4 py-2 text-white text-sm font-medium rounded transition-colors ${
          isReleased
            ? 'bg-red-600 hover:bg-red-700'
            : 'bg-green-600 hover:bg-green-700'
        }`}
      >
        {isReleased ? 'Unrelease' : 'Release site'}
      </button>
      <a
        href="/program"
        target="_blank"
        rel="noreferrer"
        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded transition-colors"
      >
        Preview Program
      </a>
    </div>
  );
}
