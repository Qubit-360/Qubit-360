'use client';

import Link from 'next/link';
import { ArrowLeft, ArrowRight, Calendar, Layers, ExternalLink } from 'lucide-react';
import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ProjectDetailsViewProps {
    project: any;
    nextProject: any;
}

export default function ProjectDetailsView({ project, nextProject }: ProjectDetailsViewProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        // Header Entry
        tl.fromTo('.project-meta',
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6 }
        )
            .fromTo('.project-title',
                { y: 40, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8 },
                '-=0.4'
            )
            .fromTo('.project-desc',
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8 },
                '-=0.6'
            )
            .fromTo('.project-image',
                { y: 50, opacity: 0, scale: 0.95 },
                { y: 0, opacity: 1, scale: 1, duration: 0.8 },
                '-=0.4'
            );

        // Grid Items Fade Up
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
                <Link href="/work" className="inline-flex items-center gap-2 text-slate-500 hover:text-orange-500 mb-12 transition-colors group">
                    <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Back to Work
                </Link>

                {/* Header Layout: 2 Columns on large screens */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 mb-16 items-start">
                    <div>
                        <div className="project-meta flex items-center gap-4 mb-6">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-orange-600 text-xs font-semibold uppercase tracking-wider">
                                <Layers size={14} /> {project.tag}
                            </span>
                            <span className="text-slate-400 text-sm flex items-center gap-1">
                                <Calendar size={14} /> {new Date(project.created_at).getFullYear()}
                            </span>
                        </div>

                        <h1 className="project-title text-5xl md:text-7xl font-bold text-slate-900 mb-8 leading-tight tracking-tight">
                            {project.title}
                        </h1>

                        <div className="project-desc prose prose-lg prose-slate text-slate-600 leading-relaxed">
                            {project.full_description || project.description}
                        </div>

                        {project.link && (
                            <div className="project-desc mt-8">
                                <a href={project.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-slate-900 font-bold border-b-2 border-slate-900 pb-1 hover:text-orange-500 hover:border-orange-500 transition-colors">
                                    Visit Live Site <ExternalLink size={18} />
                                </a>
                            </div>
                        )}
                    </div>

                    <div className="project-image relative">
                        {/* Image Container with "Antigravity" floating feel */}
                        <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-2xl relative group">
                            {project.image_url ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img src={project.image_url} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                            ) : (
                                <div className="absolute inset-0 flex items-center justify-center text-slate-400">
                                    <span className="font-mono">[ Project Preview ]</span>
                                </div>
                            )}
                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 to-transparent pointer-events-none" />
                        </div>
                    </div>
                </div>

                {/* Challenge / Solution Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
                    <div className="fade-up p-8 rounded-3xl bg-slate-50 border border-slate-100">
                        <h3 className="text-sm font-bold text-orange-500 uppercase tracking-widest mb-4">The Challenge</h3>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">Complexity & Scale</h2>
                        <div className="text-slate-600 leading-relaxed space-y-4">
                            <p>{project.challenge || "Integrating advanced AI capabilities into a legacy workflow presented significant latency and data consistency challenges."}</p>
                        </div>
                    </div>

                    <div className="fade-up p-8 rounded-3xl bg-slate-900 text-white">
                        <h3 className="text-sm font-bold text-orange-400 uppercase tracking-widest mb-4">The Solution</h3>
                        <h2 className="text-2xl font-bold text-white mb-4">Architecture & AI</h2>
                        <div className="text-slate-300 leading-relaxed space-y-4">
                            <p>{project.solution || "We engineered a microservices architecture using Next.js and Supabase, augmented by custom Python agents for autonomous task handling."}</p>
                        </div>
                    </div>
                </div>

                {/* Tech Stack Horizontal Strip */}
                <div className="fade-up mb-24">
                    <h3 className="text-xl font-bold text-slate-900 mb-8 border-l-4 border-orange-500 pl-4">Technologies</h3>
                    <div className="flex flex-wrap gap-4">
                        {project.tech_stack?.map((tech: string) => (
                            <span key={tech} className="px-6 py-3 bg-white border border-slate-200 rounded-xl text-slate-700 font-semibold shadow-sm hover:border-orange-200 hover:text-orange-600 transition-all cursor-default">
                                {tech}
                            </span>
                        )) || <span className="text-slate-500 italic">Full stack details available upon request.</span>}
                    </div>
                </div>

                {/* Footer Navigation (Next Project) */}
                {nextProject && (
                    <div className="fade-up border-t border-slate-100 pt-16">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                            <div className="text-left">
                                <span className="text-slate-400 text-sm font-medium mb-2 block">Next Project</span>
                                <Link href={`/work/${nextProject.slug}`} className="group inline-flex items-center gap-4">
                                    <div className="text-3xl md:text-5xl font-bold text-slate-900 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-900 group-hover:to-orange-500 transition-all">
                                        {nextProject.title}
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
