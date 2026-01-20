'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Lightbulb, Settings, Rocket, Search } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const steps = [
    {
        icon: <Search size={28} />,
        title: 'Discovery',
        description: 'We audit your current processes and identify high-impact opportunities for automation and improvement.'
    },
    {
        icon: <Lightbulb size={28} />,
        title: 'Strategy',
        description: 'We design a custom roadmap, selecting the right tech stack and AI models for your specific needs.'
    },
    {
        icon: <Settings size={28} />,
        title: 'Development',
        description: 'Our engineers build and integrate your solution, ensuring security, scalability, and performance.'
    },
    {
        icon: <Rocket size={28} />,
        title: 'Launch & Scale',
        description: 'We deploy your system and provide ongoing optimization to ensure it evolves with your business.'
    }
];

export default function ProcessSection() {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const stepsEl = gsap.utils.toArray<HTMLElement>('.process-step');

        gsap.fromTo(stepsEl,
            {
                y: 30,
                opacity: 0
            },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.2,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 75%',
                    toggleActions: 'play none none reverse'
                }
            }
        );

        // Draw line animation could go here if we added an SVG line
    }, { scope: containerRef });

    return (
        <section className="py-24 bg-white" ref={containerRef}>
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="text-center mb-20">
                    <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">How We Work</h2>
                    <p className="text-slate-600 max-w-2xl mx-auto text-lg">
                        A proven methodology to take you from concept to deployed solution.
                    </p>
                </div>

                <div className="relative">
                    {/* Connector Line (Desktop) */}
                    <div className="hidden lg:block absolute top-[45px] left-0 w-full h-0.5 bg-slate-100 -z-10" />

                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-8">
                        {steps.map((step, index) => (
                            <div key={index} className="process-step relative flex flex-col items-center text-center">
                                <div className="w-24 h-24 rounded-full bg-white border-4 border-slate-50 flex items-center justify-center mb-6 shadow-sm transition-transform hover:scale-110 hover:border-orange-100 duration-300">
                                    <div className="w-12 h-12 rounded-full bg-orange-500 text-white flex items-center justify-center">
                                        {step.icon}
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
                                <p className="text-slate-600 leading-relaxed px-4">
                                    {step.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
