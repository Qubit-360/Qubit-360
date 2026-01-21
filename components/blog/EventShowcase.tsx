'use client';

import { useRef, useEffect } from 'react';
import Link from 'next/link';
import { ArrowUpRight, MapPin } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface EventShowcaseProps {
    events: any[];
}

export default function EventShowcase({ events }: EventShowcaseProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const sliderRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current || !sliderRef.current || events.length === 0) return;

        const ctx = gsap.context(() => {
            // Horizontal Scroll Animation
            const totalWidth = sliderRef.current!.scrollWidth;
            const visibleWidth = containerRef.current!.offsetWidth;

            if (totalWidth > visibleWidth) {
                gsap.to(sliderRef.current, {
                    x: () => -(totalWidth - visibleWidth),
                    ease: 'none',
                    scrollTrigger: {
                        trigger: containerRef.current,
                        pin: true,
                        scrub: 1,
                        end: () => `+=${totalWidth}`,
                        invalidateOnRefresh: true,
                    }
                });
            }
        }, containerRef);

        return () => ctx.revert();
    }, [events]);

    if (events.length === 0) return null;

    return (
        <section ref={containerRef} className="py-20 overflow-hidden bg-slate-950 text-white relative">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/10 to-transparent -z-10" />

            <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-12">
                <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
                    Upcoming Events
                </h2>
            </div>

            <div ref={sliderRef} className="flex gap-8 px-6 lg:px-8 w-fit">
                {events.map((event, i) => (
                    <div
                        key={event.id}
                        className="w-[85vw] md:w-[600px] h-[400px] flex-shrink-0 relative rounded-3xl overflow-hidden group border border-slate-800 bg-slate-900"
                    >
                        <div className="absolute inset-0">
                            {/* Placeholder Graphic Pattern */}
                            <div className={`w-full h-full opacity-30 bg-gradient-to-br ${i % 2 === 0 ? 'from-blue-600 to-purple-600' : 'from-emerald-500 to-cyan-500'}`} />
                            {event.image_url && <img src={event.image_url} className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-50 group-hover:scale-110 transition-transform duration-700" />}
                        </div>

                        <div className="relative z-10 p-10 flex flex-col justify-between h-full">
                            <div className="flex justify-between items-start">
                                <div className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-lg border border-white/10 text-sm font-mono">
                                    {event.tag || 'Event'}
                                </div>
                                <ArrowUpRight className="text-white/50 group-hover:text-white transition-colors" size={32} />
                            </div>

                            <div>
                                <h3 className="text-3xl font-bold mb-4 group-hover:text-blue-200 transition-colors">{event.title}</h3>
                                <p className="text-slate-400 line-clamp-2 md:w-3/4 mb-6">{event.description}</p>

                                <div className="flex items-center gap-4 text-sm text-slate-300">
                                    {/* Example Meta */}
                                    <span className="flex items-center gap-2"><MapPin size={16} /> Online / Global</span>
                                </div>
                            </div>
                        </div>

                        <Link href={`/blog/${event.slug}`} className="absolute inset-0 z-20" />
                    </div>
                ))}

                {/* Spacer for proper end padding */}
                <div className="w-10 flex-shrink-0" />
            </div>
        </section>
    );
}
