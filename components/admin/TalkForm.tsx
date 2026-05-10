'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Talk, Reading, TIMESLOT_LABELS } from '@/lib/types';

interface TalkFormProps {
  editingTalk: Talk | null;
  onSaved: () => void;
  onCancel: () => void;
}

const EMPTY_FORM = {
  title: '',
  speaker: '',
  image_url: '',
  day: 1 as 1 | 2,
  timeslot: 1 as 1 | 2 | 3 | 4,
  description: '',
  readings: [{ text: '', link: '' }] as Reading[],
};

export default function TalkForm({ editingTalk, onSaved, onCancel }: TalkFormProps) {
  const router = useRouter();
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Prefill form when editingTalk changes
  useEffect(() => {
    if (editingTalk) {
      setForm({
        title: editingTalk.title,
        speaker: editingTalk.speaker,
        image_url: editingTalk.image_url ?? '',
        day: editingTalk.day,
        timeslot: editingTalk.timeslot,
        description: editingTalk.description ?? '',
        readings:
          editingTalk.readings && editingTalk.readings.length > 0
            ? editingTalk.readings
            : [{ text: '', link: '' }],
      });
    } else {
      setForm(EMPTY_FORM);
    }
    setError(null);
  }, [editingTalk]);

  function updateReading(index: number, field: keyof Reading, value: string) {
    setForm((prev) => {
      const updated = [...prev.readings];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, readings: updated };
    });
  }

  function addReading() {
    setForm((prev) => ({
      ...prev,
      readings: [...prev.readings, { text: '', link: '' }],
    }));
  }

  function removeReading(index: number) {
    setForm((prev) => ({
      ...prev,
      readings: prev.readings.filter((_, i) => i !== index),
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSaving(true);

    const supabase = createClient();

    const payload = {
      title: form.title,
      speaker: form.speaker,
      image_url: form.image_url || null,
      day: form.day,
      timeslot: form.timeslot,
      description: form.description || null,
      readings: form.readings.filter((r) => r.text || r.link),
    };

    let err;
    if (editingTalk) {
      const { error } = await supabase
        .from('talks')
        .update(payload)
        .eq('id', editingTalk.id);
      err = error;
    } else {
      const { error } = await supabase.from('talks').insert(payload);
      err = error;
    }

    if (err) {
      setError(err.message);
      setSaving(false);
      return;
    }

    setForm(EMPTY_FORM);
    onSaved();
    router.refresh();
    setSaving(false);
  }

  const inputClass =
    'w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white placeholder-gray-500 focus:outline-none focus:border-gray-500';
  const labelClass = 'block text-sm font-medium text-gray-300 mb-1';

  return (
    <div className="mb-8 p-4 bg-gray-900 rounded border border-gray-800">
      <h2 className="text-lg font-semibold mb-4">
        {editingTalk ? 'Edit Talk' : 'Add Talk'}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className={labelClass}>Title</label>
            <input
              type="text"
              required
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className={inputClass}
              placeholder="Talk title"
            />
          </div>
          <div>
            <label className={labelClass}>Speaker</label>
            <input
              type="text"
              required
              value={form.speaker}
              onChange={(e) => setForm({ ...form, speaker: e.target.value })}
              className={inputClass}
              placeholder="Speaker name"
            />
          </div>
          <div>
            <label className={labelClass}>Image URL</label>
            <input
              type="text"
              value={form.image_url}
              onChange={(e) => setForm({ ...form, image_url: e.target.value })}
              className={inputClass}
              placeholder="https://…"
            />
          </div>
          <div>
            <label className={labelClass}>Day</label>
            <select
              value={form.day}
              onChange={(e) =>
                setForm({ ...form, day: parseInt(e.target.value) as 1 | 2 })
              }
              className={inputClass}
            >
              <option value={1}>Saturday</option>
              <option value={2}>Sunday</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Timeslot</label>
            <select
              value={form.timeslot}
              onChange={(e) =>
                setForm({
                  ...form,
                  timeslot: parseInt(e.target.value) as 1 | 2 | 3 | 4,
                })
              }
              className={inputClass}
            >
              {Object.entries(TIMESLOT_LABELS).map(([key, label]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>
          </div>
          <div className="md:col-span-2">
            <label className={labelClass}>Description</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className={inputClass}
              rows={4}
              placeholder="Talk description"
            />
          </div>
        </div>

        <div className="mb-4">
          <h3 className="text-sm font-medium text-gray-300 mb-2">Readings</h3>
          {form.readings.map((reading, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-2">
              <input
                type="text"
                placeholder="Reading text"
                value={reading.text}
                onChange={(e) => updateReading(index, 'text', e.target.value)}
                className={inputClass}
              />
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Reading link (optional)"
                  value={reading.link}
                  onChange={(e) => updateReading(index, 'link', e.target.value)}
                  className={`${inputClass} flex-1`}
                />
                <button
                  type="button"
                  onClick={() => removeReading(index)}
                  className="px-3 py-2 bg-red-700 hover:bg-red-600 text-white text-sm rounded transition-colors"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={addReading}
            className="mt-1 px-3 py-1.5 bg-gray-700 hover:bg-gray-600 text-white text-sm rounded transition-colors"
          >
            + Add reading
          </button>
        </div>

        {error && <p className="text-red-400 text-sm mb-3">{error}</p>}

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={saving}
            className="px-5 py-2 bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white font-medium rounded transition-colors"
          >
            {saving ? 'Saving…' : editingTalk ? 'Save changes' : 'Add talk'}
          </button>
          {editingTalk && (
            <button
              type="button"
              onClick={onCancel}
              className="px-5 py-2 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded transition-colors"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
