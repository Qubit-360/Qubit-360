import ServicesPageContent from '@/components/services/ServicesPageContent';
import { supabase } from '@/lib/supabase';

export const revalidate = 0;

export default async function ServicesPage() {
    const { data: services } = await supabase
        .from('services')
        .select('*')
        .order('created_at', { ascending: true });

    return <ServicesPageContent services={services || []} />;
}
