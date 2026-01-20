'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
    {
        content: "Qubit 360 transformed our manual data entry process into a fully automated system. We saved 40+ hours a week.",
        author: "Sarah Jenkins",
        role: "COO @ TechFlow",
        rating: 5
    },
    {
        content: "The custom CRM they built for us is lightyears ahead of what we were using. The AI insights are game-changing.",
        author: "Michael Chen",
        role: "Founder @ Nexus",
        rating: 5
    },
    {
        content: "Professional, technical, and fast. They understood our complex requirements immediately and delivered.",
        author: "Elena Rodriguez",
        role: "Product Lead @ Velocity",
        rating: 5
    }
];

export default function TestimonialsSection() {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.fromTo('.testimonial-card',
            { y: 50, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.2,
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 80%',
                }
            }
        );
    }, { scope: containerRef });

    return (
        <section className="py-24 bg-slate-900 overflow-hidden relative" ref={containerRef}>
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-orange-600/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />

            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Client Experience</h2>
                    <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                        Don't just take our word for it. Here's what our partners say.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((item, index) => (
                        <div key={index} className="testimonial-card p-8 rounded-2xl bg-slate-800/50 border border-slate-700 backdrop-blur-sm">
                            <div className="flex gap-1 mb-6">
                                {[...Array(item.rating)].map((_, i) => (
                                    <Star key={i} size={18} className="fill-orange-500 text-orange-500" />
                                ))}
                            </div>
                            <p className="text-slate-300 text-lg mb-8 leading-relaxed">
                                "{item.content}"
                            </p>
                            <div>
                                <div className="font-bold text-white">{item.author}</div>
                                <div className="text-slate-500 text-sm">{item.role}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
