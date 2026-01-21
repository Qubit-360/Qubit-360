import BlogPageContent from '@/components/blog/BlogPageContent';
import { supabase } from '@/lib/supabase';

export const revalidate = 0;

export default async function BlogPage() {
    const { data: posts } = await supabase
        .from('experiments')
        .select('*')
        .order('created_at', { ascending: false });

    return <BlogPageContent posts={posts || []} />;
}
