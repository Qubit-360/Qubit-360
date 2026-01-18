import { FlaskConical, Atom, BrainCircuit, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { EXPERIMENTS } from '@/constants';

export default function InnovationLabPage() {
    return (
        <div className="min-h-screen pt-32 pb-20 relative overflow-hidden bg-white">
            {/* Background Effect */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-50/50 via-white to-white -z-10" />

            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="flex flex-col items-center text-center mb-24">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-100 to-orange-100 border border-blue-200 flex items-center justify-center mb-8 animate-pulse">
                        <FlaskConical size={40} className="text-blue-600" />
                    </div>

                    <h1 className="text-4xl md:text-7xl font-bold text-slate-900 mb-6 tracking-tight">
                        Qubit <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-orange-500">Innovation Lab</span>
                    </h1>

                    <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
                        Where we experiment with the future.
                        <br />
                        Deep Learning, Augmented Reality, and Autonomous Agents.
                    </p>
                </div>

                {/* Active Experiments Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
                    {EXPERIMENTS.map((exp, index) => {
                        const isBlue = index % 2 === 0;
                        const accentColor = isBlue ? 'blue' : 'orange';
                        const Icon = isBlue ? BrainCircuit : Atom;

                        return (
                            <Link
                                href={exp.link}
                                key={exp.slug}
                                className={`p-8 rounded-3xl bg-slate-50 border border-slate-200 relative overflow-hidden group hover:border-${accentColor}-500/30 transition-colors shadow-sm block`}
                            >
                                <div className={`absolute top-0 right-0 p-32 bg-${accentColor}-100/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-${accentColor}-200/50 transition-all`} />
                                <div className="relative z-10">
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="flex items-center gap-3">
                                            <Icon className={`text-${accentColor}-600`} size={24} />
                                            <span className={`text-sm font-mono text-${accentColor}-700 border border-${accentColor}-200 bg-${accentColor}-50 px-2 py-1 rounded`}>
                                                {exp.status}
                                            </span>
                                        </div>
                                        <ArrowRight size={20} className={`text-${accentColor}-400 opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0`} />
                                    </div>

                                    <h3 className="text-2xl font-bold text-slate-900 mb-4">{exp.title}</h3>
                                    <p className="text-slate-600 mb-6 min-h-[3rem]">
                                        {exp.description}
                                    </p>

                                    <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full bg-${accentColor}-500 rounded-full`}
                                            style={{ width: `${exp.progress}%` }}
                                        />
                                    </div>
                                    <p className={`text-right text-xs text-${accentColor}-600 mt-2 font-mono`}>
                                        {exp.progress}% Complete
                                    </p>
                                </div>
                            </Link>
                        );
                    })}
                </div>

                <div className="text-center">
                    <p className="text-slate-500 mb-6">Want to collaborate on research?</p>
                    <Link
                        href="/contact"
                        className="inline-block px-8 py-3 rounded-full border border-slate-200 hover:bg-slate-50 text-slate-900 transition-all text-sm font-semibold shadow-sm"
                    >
                        Contact Research Team
                    </Link>
                </div>
            </div>
        </div>
    );
}
