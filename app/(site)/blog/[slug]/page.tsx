import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import BlogDetailsView from '@/components/blog/BlogDetailsView';

export const revalidate = 0;

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    // Fetch current post
    const { data: post } = await supabase
        .from('experiments')
        .select('*')
        .eq('slug', slug)
        .single();

    if (!post) {
        notFound();
    }

    // Fetch next post for navigation
    const { data: nextPost } = await supabase
        .from('experiments')
        .select('title, slug')
        .neq('id', post.id)
        .limit(1)
        .single();

    return <BlogDetailsView post={post} nextPost={nextPost} />;
}
