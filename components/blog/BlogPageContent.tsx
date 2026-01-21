'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import BlogCard from '@/components/blog/BlogCard';

interface BlogPageContentProps {
    posts: any[];
}

export default function BlogPageContent({ posts }: BlogPageContentProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        // Header Animations
        tl.fromTo('.page-header-title',
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8 }
        )
            .fromTo('.page-header-desc',
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8 },
                '-=0.6'
            );

        // Grid Animation
        gsap.fromTo('.blog-card',
            { y: 100, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.1,
                ease: 'power3.out',
                delay: 0.4
            }
        );

    }, { scope: containerRef });

    return (
        <div className="min-h-screen pt-32 pb-20 bg-white" ref={containerRef}>
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h1 className="page-header-title text-4xl md:text-6xl font-bold text-slate-900 mb-6">
                        Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-orange-500">Blog</span>
                    </h1>
                    <p className="page-header-desc text-xl text-slate-600 max-w-2xl mx-auto">
                        Insights, updates, and deep dives into our latest technology and research.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts?.map((post) => (
                        <div key={post.id} className="blog-card">
                            <BlogCard
                                title={post.title}
                                description={post.description}
                                tag={post.tag}
                                image={post.image_url || '/placeholder.jpg'}
                                link={`/blog/${post.slug}`}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
