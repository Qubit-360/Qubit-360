import BlogCard from '@/components/blog/BlogCard';
import { supabase } from '@/lib/supabase';

export const revalidate = 0;

export default async function BlogPage() {
    const { data: posts } = await supabase
        .from('experiments')
        .select('*')
        .order('created_at', { ascending: false });

    return (
        <div className="min-h-screen pt-32 pb-20 bg-white">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">
                        Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-orange-500">Blog</span>
                    </h1>
                    <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                        Insights, updates, and deep dives into our latest technology and research.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts?.map((post) => (
                        <BlogCard
                            key={post.id}
                            title={post.title}
                            description={post.description}
                            tag={post.tag}
                            image={post.image_url || '/placeholder.jpg'}
                            link={`/blog/${post.slug}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
