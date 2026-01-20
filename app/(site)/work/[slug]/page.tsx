import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export const revalidate = 0;

export default async function ProjectDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    const { data: project } = await supabase
        .from('works')
        .select('*')
        .eq('slug', slug)
        .single();

    if (!project) {
        notFound();
    }

    return (
        <div className="min-h-screen pt-32 pb-20 bg-white">
            <div className="max-w-4xl mx-auto px-6 lg:px-8">
                <Link href="/work" className="inline-flex items-center gap-2 text-slate-500 hover:text-orange-500 mb-8 transition-colors">
                    <ArrowLeft size={18} /> Back to Work
                </Link>

                {/* Header */}
                <div className="mb-12">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="inline-block px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-orange-600 text-xs font-semibold">
                            {project.tag}
                        </span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">{project.title}</h1>
                    <p className="text-xl text-slate-600 leading-relaxed">
                        {project.full_description || project.description}
                    </p>
                </div>

                {/* Image Placeholder */}
                <div className="w-full aspect-video bg-slate-100 rounded-2xl border border-slate-200 mb-16 flex items-center justify-center text-slate-400">
                    {/* Actual Image would go here */}
                    {project.image_url ? (
                        <div className="text-center">
                            <span className="font-mono text-xs block mb-2">{project.image_url}</span>
                            <span className="font-mono text-sm">[ Project Screenshot ]</span>
                        </div>
                    ) : (
                        <span className="font-mono text-sm">[ Project Screenshot / Demo Video ]</span>
                    )}
                </div>

                {/* Challenge & Solution Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">The Challenge</h2>
                        <p className="text-slate-600 leading-relaxed">
                            {project.challenge || "Standard industry challenges requiring robust solutions."}
                        </p>
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">The Solution</h2>
                        <p className="text-slate-600 leading-relaxed">
                            {project.solution || "A custom engineered platform leveraging modern technologies."}
                        </p>
                    </div>
                </div>

                {/* Tech Stack */}
                <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200 mb-16">
                    <h3 className="text-lg font-bold text-slate-900 mb-6">Technologies Used</h3>
                    <div className="flex flex-wrap gap-3">
                        {project.tech_stack ? (
                            project.tech_stack.map((tech: string) => (
                                <span key={tech} className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-700 font-medium text-sm">
                                    {tech}
                                </span>
                            ))
                        ) : (
                            <span className="text-slate-500 text-sm">Tech stack details coming soon.</span>
                        )}
                    </div>
                </div>

                {/* CTA */}
                <div className="border-t border-slate-200 pt-12 text-center">
                    <h3 className="text-2xl font-bold text-slate-900 mb-4">Have a similar project?</h3>
                    <Link
                        href="/contact"
                        className="inline-block px-8 py-3 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-semibold transition-all hover:shadow-lg"
                    >
                        Start a Conversation
                    </Link>
                </div>
            </div>
        </div>
    );
}
