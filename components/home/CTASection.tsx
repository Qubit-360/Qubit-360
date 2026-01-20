'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function CTASection() {
    return (
        <section className="py-24 bg-white relative overflow-hidden">
            <div className="max-w-5xl mx-auto px-6 lg:px-8 text-center relative z-10">
                <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-8 leading-tight">
                    Ready to Modernize Your <br className="hidden md:block" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-blue-900">Digital Infrastructure?</span>
                </h2>
                <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
                    Let's discuss how we can engineer your growth with custom software and AI automation.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                        href="/contact"
                        className="w-full sm:w-auto px-10 py-5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-semibold text-lg transition-all hover:shadow-xl flex items-center justify-center gap-2"
                    >
                        Start Your Project <ArrowRight size={20} />
                    </Link>
                    <Link
                        href="/work"
                        className="w-full sm:w-auto px-10 py-5 rounded-full bg-white hover:bg-slate-50 border border-slate-200 text-slate-900 font-semibold text-lg transition-all"
                    >
                        View Case Studies
                    </Link>
                </div>
            </div>
        </section>
    );
}
