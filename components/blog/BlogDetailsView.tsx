'use client';

import Link from 'next/link';
import { ArrowLeft, ArrowRight, Calendar, Layers, ExternalLink } from 'lucide-react';
import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface BlogDetailsViewProps {
    post: any;
    nextPost: any;
}

export default function BlogDetailsView({ post, nextPost }: BlogDetailsViewProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        // Header Entry
        tl.fromTo('.post-meta',
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6 }
        )
            .fromTo('.post-title',
                { y: 40, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8 },
                '-=0.4'
            )
            .fromTo('.post-image',
                { y: 50, opacity: 0, scale: 0.95 },
                { y: 0, opacity: 1, scale: 1, duration: 0.8 },
                '-=0.4'
            );

        // Content Fade Up
        gsap.utils.toArray<HTMLElement>('.fade-up').forEach(el => {
            gsap.fromTo(el,
                { y: 40, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    scrollTrigger: {
                        trigger: el,
                        start: 'top 85%',
                    }
                }
            );
        });

    }, { scope: containerRef });

    return (
        <div className="min-h-screen pt-32 pb-20 bg-white" ref={containerRef}>
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <Link href="/blog" className="inline-flex items-center gap-2 text-slate-500 hover:text-orange-500 mb-12 transition-colors group">
                    <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Back to Blog
                </Link>

                {/* Header Layout: Similar to ProjectDetailsView */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 mb-16 items-start">
                    <div>
                        <div className="post-meta flex items-center gap-4 mb-6">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-600 text-xs font-semibold uppercase tracking-wider">
                                <Layers size={14} /> {post.tag || 'Article'}
                            </span>
                            <span className="text-slate-400 text-sm flex items-center gap-1">
                                <Calendar size={14} /> {new Date(post.created_at).toLocaleDateString()}
                            </span>
                        </div>

                        <h1 className="post-title text-4xl md:text-5xl font-bold text-slate-900 mb-8 leading-tight tracking-tight">
                            {post.title}
                        </h1>

                        <p className="text-xl text-slate-600 italic border-l-4 border-orange-500 pl-4 mb-8">
                            {post.description}
                        </p>

                        {post.link && (
                            <div className="mt-8">
                                <a href={post.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-slate-900 font-bold border-b-2 border-slate-900 pb-1 hover:text-orange-500 hover:border-orange-500 transition-colors">
                                    Visit Resource <ExternalLink size={18} />
                                </a>
                            </div>
                        )}
                    </div>

                    <div className="post-image relative">
                        {/* Image Container */}
                        <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-2xl relative group">
                            {post.image_url ? (
                                <img src={post.image_url} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                            ) : (
                                <div className="absolute inset-0 flex items-center justify-center text-slate-400">
                                    <span className="font-mono">[ No Cover Image ]</span>
                                </div>
                            )}
                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 to-transparent pointer-events-none" />
                        </div>
                    </div>
                </div>

                {/* Main Content Body */}
                <div className="fade-up max-w-4xl mx-auto prose prose-lg prose-slate prose-headings:font-bold prose-headings:text-slate-900 prose-p:text-slate-700 prose-img:rounded-2xl prose-a:text-blue-600 mb-24">
                    {post.full_description ? (
                        post.full_description.split('\n').map((paragraph: string, i: number) => (
                            <p key={i} className="mb-6 leading-8">
                                {paragraph.trim()}
                            </p>
                        ))
                    ) : (
                        <p className="text-slate-400 italic">No additional content available.</p>
                    )}
                </div>

                {/* Navigation (Next Post) */}
                {nextPost && (
                    <div className="fade-up border-t border-slate-100 pt-16">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                            <div className="text-left">
                                <span className="text-slate-400 text-sm font-medium mb-2 block">Next Article</span>
                                <Link href={`/blog/${nextPost.slug}`} className="group inline-flex items-center gap-4">
                                    <div className="text-3xl md:text-5xl font-bold text-slate-900 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-900 group-hover:to-orange-500 transition-all">
                                        {nextPost.title}
                                    </div>
                                    <div className="w-12 h-12 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center group-hover:bg-orange-500 group-hover:text-white group-hover:border-orange-500 transition-all">
                                        <ArrowRight size={24} />
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
