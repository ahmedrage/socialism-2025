'use client';

import { useState } from 'react';
import { Talk } from '@/lib/types';
import SiteControls from './SiteControls';
import TalkForm from './TalkForm';
import TalkList from './TalkList';

interface AdminDashboardProps {
  talks: Talk[];
  isReleased: boolean;
}

export default function AdminDashboard({ talks, isReleased }: AdminDashboardProps) {
  const [editingTalk, setEditingTalk] = useState<Talk | null>(null);

  function handleEdit(talk: Talk) {
    setEditingTalk(talk);
    // Scroll to form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleSaved() {
    setEditingTalk(null);
  }

  function handleCancel() {
    setEditingTalk(null);
  }

  // onDelete is called after the row is removed — nothing extra to do client-side
  // since router.refresh() in TalkList re-fetches from server
  function handleDelete(_id: string) {
    // If we were editing the deleted talk, clear the form
    if (editingTalk && editingTalk.id === _id) {
      setEditingTalk(null);
    }
  }

  return (
    <div>
      <SiteControls isReleased={isReleased} />
      <TalkForm
        editingTalk={editingTalk}
        onSaved={handleSaved}
        onCancel={handleCancel}
      />
      <TalkList
        talks={talks}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
