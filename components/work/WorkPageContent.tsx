'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import ProjectCard from '@/components/shared/ProjectCard';

interface WorkPageContentProps {
    works: any[];
}

export default function WorkPageContent({ works }: WorkPageContentProps) {
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
        gsap.fromTo('.project-card',
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
                        Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-orange-500">Work</span>
                    </h1>
                    <p className="page-header-desc text-xl text-slate-600 max-w-2xl mx-auto">
                        Selected case studies demonstrating our capabilities in AI, Engineering, and R&D.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {works?.map((project) => (
                        <div key={project.id} className="project-card">
                            <ProjectCard
                                title={project.title}
                                description={project.description}
                                tag={project.tag}
                                image={project.image_url || '/placeholder.jpg'}
                                link={`/work/${project.slug}`}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
