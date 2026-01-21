import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

interface BlogGridProps {
    posts: any[];
}

export default function BlogGrid({ posts }: BlogGridProps) {
    if (posts.length === 0) return null;

    return (
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">Latest Insights</h2>
                    <div className="h-1 w-20 bg-orange-500 rounded-full" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {posts.map((post) => (
                        <Link
                            key={post.id}
                            href={`/blog/${post.slug}`}
                            className="group relative h-[380px] rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-sm hover:shadow-md transition-all"
                        >
                            {/* Image */}
                            <div className="h-48 w-full overflow-hidden relative">
                                {post.image_url ? (
                                    <img src={post.image_url} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                ) : (
                                    <div className="w-full h-full bg-gradient-to-br from-slate-200 to-slate-300" />
                                )}
                                <div className="absolute top-3 left-3">
                                    <span className="px-2 py-1 text-[10px] font-bold tracking-wider text-blue-900 uppercase bg-white/90 backdrop-blur-md rounded-md shadow-sm">
                                        {post.tag || 'Article'}
                                    </span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-5 flex flex-col justify-between h-[calc(100%-12rem)]">
                                <div>
                                    <h3 className="font-bold text-slate-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors text-lg">
                                        {post.title}
                                    </h3>
                                    <p className="text-sm text-slate-500 line-clamp-2">
                                        {post.description}
                                    </p>
                                </div>

                                <div className="flex items-center justify-between mt-4 border-t border-slate-100 pt-3">
                                    <span className="text-xs text-slate-400 font-medium">Read More</span>
                                    <ArrowUpRight size={16} className="text-orange-500 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
