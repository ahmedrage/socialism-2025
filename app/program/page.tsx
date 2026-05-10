import { redirect } from 'next/navigation';
import { NavBar } from '@/components/NavBar';
import { ProgramView } from '@/components/program/ProgramView';
import { createClient } from '@/lib/supabase/server';
import { Talk } from '@/lib/types';

export default async function ProgramPage() {
  const supabase = await createClient();

  const { data: configData } = await supabase
    .from('config')
    .select('value')
    .eq('key', 'is_released')
    .single();

  if (configData?.value !== true) {
    redirect('/');
  }

  const { data: talks } = await supabase
    .from('talks')
    .select('*')
    .order('day')
    .order('timeslot');

  return (
    <>
      <NavBar />
      <ProgramView talks={(talks as Talk[]) ?? []} />
    </>
  );
}
