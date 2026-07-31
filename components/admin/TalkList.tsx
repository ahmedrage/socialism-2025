'use client';

import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Talk, DAY_LABELS, TIMESLOT_LABELS } from '@/lib/types';

interface TalkListProps {
  talks: Talk[];
  onEdit: (talk: Talk) => void;
  onDelete: (id: string) => void;
}

export default function TalkList({ talks, onEdit, onDelete }: TalkListProps) {
  const router = useRouter();

  async function handleDelete(talk: Talk) {
    if (!window.confirm(`Delete "${talk.title}"?`)) return;

    const supabase = createClient();
    const { error } = await supabase.from('talks').delete().eq('id', talk.id);
    if (error) {
      alert('Error deleting talk: ' + error.message);
      return;
    }
    onDelete(talk.id);
    router.refresh();
  }

  if (talks.length === 0) {
    return (
      <div className="p-4 bg-gray-900 rounded border border-gray-800 text-gray-400 text-sm">
        No talks yet. Add one above.
      </div>
    );
  }

  return (
    <div className="bg-gray-900 rounded border border-gray-800 overflow-hidden">
      <h2 className="text-lg font-semibold px-4 py-3 border-b border-gray-800">
        Talks ({talks.length})
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-400 border-b border-gray-800">
              <th className="px-4 py-2 font-medium">Title</th>
              <th className="px-4 py-2 font-medium">Speaker</th>
              <th className="px-4 py-2 font-medium">Day</th>
              <th className="px-4 py-2 font-medium">Time</th>
              <th className="px-4 py-2 font-medium">Stream</th>
              <th className="px-4 py-2 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {talks.map((talk) => (
              <tr
                key={talk.id}
                className="border-b border-gray-800 last:border-0 hover:bg-gray-800/50"
              >
                <td className="px-4 py-3 text-white">{talk.title}</td>
                <td className="px-4 py-3 text-gray-300">{talk.speaker}</td>
                <td className="px-4 py-3 text-gray-300">
                  {DAY_LABELS[talk.day]}
                </td>
                <td className="px-4 py-3 text-gray-300">
                  {TIMESLOT_LABELS[talk.timeslot]}
                </td>
                <td className="px-4 py-3 text-gray-300">
                  {talk.streams?.length ? (
                    talk.streams.join(', ')
                  ) : (
                    <span className="text-gray-600">—</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button
                      onClick={() => onEdit(talk)}
                      className="px-3 py-1 bg-yellow-600 hover:bg-yellow-500 text-white text-xs rounded transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(talk)}
                      className="px-3 py-1 bg-red-700 hover:bg-red-600 text-white text-xs rounded transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
