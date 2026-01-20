import { ArrowLeft, FlaskConical, Atom } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export const revalidate = 0;

export default async function ExperimentDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    const { data: experiment } = await supabase
        .from('experiments')
        .select('*')
        .eq('slug', slug)
        .single();

    if (!experiment) {
        notFound();
    }

    return (
        <div className="min-h-screen pt-32 pb-20 bg-white relative overflow-hidden">
            {/* Background Effect */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50/40 via-white to-white -z-10" />

            <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10">
                <Link href="/innovation-lab" className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 mb-8 transition-colors">
                    <ArrowLeft size={18} /> Back to Lab
                </Link>

                {/* Header */}
                <div className="mb-12">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold">
                            <FlaskConical size={12} />
                            {experiment.status}
                        </span>
                        <span className="text-slate-400 text-sm">|</span>
                        <span className="text-slate-500 text-sm font-mono">Progress: {experiment.progress}%</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 tracking-tight">{experiment.title}</h1>
                    <p className="text-xl text-slate-600 leading-relaxed max-w-2xl">
                        {experiment.full_description || experiment.description}
                    </p>
                </div>

                {/* Progress Bar */}
                <div className="mb-16">
                    <div className="h-4 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                        <div
                            className="h-full bg-gradient-to-r from-blue-500 to-orange-500 transition-all duration-1000"
                            style={{ width: `${experiment.progress}%` }}
                        />
                    </div>
                </div>

                {/* Experiment Visual Placeholder */}
                <div className="w-full aspect-[21/9] bg-slate-900 rounded-2xl border border-slate-800 mb-16 flex items-center justify-center relative overflow-hidden group">
                    <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(68,107,250,0.05)_50%,transparent_75%,transparent_100%)] bg-[length:250%_250%,100%_100%] bg-[position:0_0,0_0] animate-[shimmer_3s_infinite_linear]" />
                    <div className="text-center">
                        <Atom size={48} className="text-blue-500 mx-auto mb-4 animate-pulse" />
                        <span className="font-mono text-sm text-blue-300">Running Simulation...</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    <div className="md:col-span-2">
                        <h2 className="text-2xl font-bold text-slate-900 mb-6">Research Methodology</h2>
                        <div className="prose prose-slate prose-lg">
                            <p className="text-slate-600">
                                This experiment leverages cutting-edge algorithms to solve complex problems in {experiment.tag}.
                                Our approach focuses on minimizing latency while maximizing inference accuracy.
                            </p>
                            <p className="text-slate-600 mt-4">
                                We are currently in the <strong>{experiment.status}</strong>, iterating on the core models and validating results against standard benchmarks.
                            </p>
                        </div>
                    </div>

                    {/* Sidebar / Tech Stack */}
                    <div>
                        <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 sticky top-32">
                            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-6">Tech Stack</h3>
                            <div className="space-y-3">
                                {experiment.tech_stack?.map((tech: string) => (
                                    <div key={tech} className="flex items-center gap-2 text-slate-600 text-sm border-b border-slate-100 pb-2 last:border-0 last:pb-0">
                                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                                        {tech}
                                    </div>
                                ))}
                            </div>

                            <div className="mt-8 pt-6 border-t border-slate-200">
                                <Link href={experiment.link || "/contact"} className="block w-full text-center px-4 py-2 rounded-lg bg-white border border-slate-200 text-slate-900 font-semibold text-sm hover:border-blue-500 hover:text-blue-600 transition-colors">
                                    Request Access
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
