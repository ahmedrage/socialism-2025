import { createClient } from '@/lib/supabase/server';
import { Talk } from '@/lib/types';
import AdminDashboard from '@/components/admin/AdminDashboard';

export default async function AdminPage() {
  const supabase = await createClient();

  const { data: talks } = await supabase
    .from('talks')
    .select('*')
    .order('day')
    .order('timeslot');

  const { data: configRow } = await supabase
    .from('config')
    .select('value')
    .eq('key', 'is_released')
    .single();

  const isReleased = configRow?.value === true;

  return (
    <AdminDashboard
      talks={(talks as Talk[]) ?? []}
      isReleased={isReleased}
    />
  );
}
