import Link from 'next/link';
import { ArrowRight, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FeaturedPostProps {
    post: any;
}

export default function FeaturedPost({ post }: FeaturedPostProps) {
    if (!post) return null;

    return (
        <section className="relative w-full h-[85vh] min-h-[600px] rounded-3xl overflow-hidden group">
            {/* Background Image */}
            <div className="absolute inset-0">
                <img
                    src={post.image_url || '/placeholder.jpg'}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-90" />
            </div>

            {/* Content */}
            <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 flex flex-col items-start z-10">
                <div className="mb-6 flex items-center gap-4">
                    <span className="px-3 py-1 text-xs font-bold tracking-wider text-blue-900 uppercase bg-blue-400 rounded-full">
                        Featured
                    </span>
                    <span className="flex items-center text-slate-300 text-sm font-medium">
                        <Calendar size={14} className="mr-2" />
                        {new Date(post.created_at).toLocaleDateString()}
                    </span>
                </div>

                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight max-w-5xl">
                    {post.title}
                </h1>

                <p className="text-lg md:text-xl text-slate-300 max-w-2xl mb-10 line-clamp-3">
                    {post.description}
                </p>

                <Link
                    href={`/blog/${post.slug}`}
                    className="group/btn inline-flex items-center gap-3 px-8 py-4 bg-white text-slate-900 rounded-full font-semibold transition-all hover:bg-blue-50 hover:gap-5"
                >
                    Read Article
                    <ArrowRight size={20} className="transition-transform group-hover/btn:translate-x-1" />
                </Link>
            </div>
        </section>
    );
}
