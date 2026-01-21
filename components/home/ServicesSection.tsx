'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code, Cpu, Globe, Database, Smartphone, Zap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const services = [
    {
        icon: <Cpu size={32} />,
        title: 'AI Automation',
        description: 'Custom AI agents that automate your repetitive workflows and decision-making processes.',
        color: 'text-orange-500',
        bg: 'bg-orange-50',
        border: 'hover:border-orange-500/50',
        image: '/service_ai_automation.webp'
    },
    {
        icon: <Code size={32} />,
        title: 'Custom Software',
        description: 'Tailor-made web and mobile applications built for scalability and performance.',
        color: 'text-blue-600',
        bg: 'bg-blue-50',
        border: 'hover:border-blue-600/50',
        image: '/service_custom_software.webp'
    },
    {
        icon: <Database size={32} />,
        title: 'Data Infrastructure',
        description: 'Robust data pipelines and storage solutions to power your business intelligence.',
        color: 'text-emerald-600',
        bg: 'bg-emerald-50',
        border: 'hover:border-emerald-600/50',
        image: '/service_data_infra.webp'
    },
    {
        icon: <Smartphone size={32} />,
        title: 'Mobile Development',
        description: 'Native and cross-platform mobile apps that deliver exceptional user experiences.',
        color: 'text-purple-600',
        bg: 'bg-purple-50',
        border: 'hover:border-purple-600/50',
        image: '/service_mobile_dev.webp'
    },
    {
        icon: <Globe size={32} />,
        title: 'Web Platforms',
        description: 'Enterprise-grade SaaS platforms and e-commerce solutions.',
        color: 'text-cyan-600',
        bg: 'bg-cyan-50',
        border: 'hover:border-cyan-600/50',
        image: '/service_web_platforms.webp'
    },
    {
        icon: <Zap size={32} />,
        title: 'System Integration',
        description: 'Seamlessly connect your existing tools and APIs for a unified ecosystem.',
        color: 'text-yellow-600',
        bg: 'bg-yellow-50',
        border: 'hover:border-yellow-600/50',
        image: '/service_sys_integration.webp'
    }
];

export default function ServicesSection() {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const cards = gsap.utils.toArray<HTMLElement>('.service-card');

        gsap.fromTo(cards,
            {
                y: 50,
                opacity: 0
            },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    }, { scope: containerRef });

    return (
        <section className="py-24 bg-slate-50 relative overflow-hidden" ref={containerRef}>
            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">Our Expertise</h2>
                    <p className="text-slate-600 max-w-2xl mx-auto text-lg">
                        We deliver end-to-end solutions that modernize your business stack.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className={`service-card relative overflow-hidden p-8 rounded-2xl bg-white border border-slate-200 shadow-sm transition-all hover:shadow-xl group ${service.border} h-full flex flex-col`}
                        >
                            {/* Background Image with Overlay */}
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500">
                                {service.image && (
                                    <img
                                        src={service.image}
                                        alt=""
                                        className="w-full h-full object-cover"
                                    />
                                )}
                            </div>

                            {/* Gradient Overlay for Text Readability when image is visible */}
                            <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-b from-transparent to-white/90`} />

                            <div className="relative z-10">
                                <div className={`w-14 h-14 rounded-xl ${service.bg} ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                    {service.icon}
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-slate-800 transition-colors">
                                    {service.title}
                                </h3>
                                <p className="text-slate-600 leading-relaxed">
                                    {service.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
