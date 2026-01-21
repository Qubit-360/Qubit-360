import WorkPageContent from '@/components/work/WorkPageContent';
import { supabase } from '@/lib/supabase';

export const revalidate = 0; // Ensure fresh data on every request

export default async function WorkPage() {
    const { data: works } = await supabase
        .from('works')
        .select('*')
        .order('created_at', { ascending: false });

    return <WorkPageContent works={works || []} />;
}
