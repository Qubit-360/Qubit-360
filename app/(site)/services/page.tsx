import { Bot, Code, FlaskConical, ArrowRight, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

export const revalidate = 0;

export default async function ServicesPage() {
    const { data: services } = await supabase
        .from('services')
        .select('*')
        .order('created_at', { ascending: true });

    const icons = {
        'Bot': Bot,
        'Code': Code,
        'FlaskConical': FlaskConical
    };

    return (
        <div className="min-h-screen pt-32 pb-20 bg-white">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="text-center mb-20">
                    <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">
                        Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-orange-500">Expertise</span>
                    </h1>
                    <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                        We provide end-to-end solutions that modernize your business infrastructure and automate workflows.
                    </p>
                </div>

                <div className="space-y-24">
                    {services?.map((service, index) => {
                        const Icon = icons[service.icon as keyof typeof icons] || Code;
                        const isEven = index % 2 === 0;

                        return (
                            <div key={service.title} className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-center`}>
                                {/* Image/Visual Sider */}
                                <div className="w-full lg:w-1/2">
                                    <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-50 border border-slate-200 group shadow-sm hover:shadow-md transition-shadow">
                                        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-blue-500/5 group-hover:opacity-75 transition-opacity" />
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <Icon size={64} className="text-slate-300 group-hover:text-orange-500 transition-colors duration-500" />
                                        </div>
                                        {/* Decorative Elements */}
                                        <div className="absolute top-0 right-0 p-8 opacity-20">
                                            <div className="w-32 h-32 rounded-full border-2 border-dashed border-slate-300 animate-[spin_10s_linear_infinite]" />
                                        </div>
                                    </div>
                                </div>

                                {/* Content Side */}
                                <div className="w-full lg:w-1/2 space-y-6">
                                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-orange-600 text-sm font-medium">
                                        <Icon size={16} />
                                        {index === 0 ? 'Automation' : index === 1 ? 'Engineering' : 'Innovation'}
                                    </div>

                                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                                        {service.title}
                                    </h2>

                                    <p className="text-lg text-slate-600 leading-relaxed">
                                        {service.description}
                                    </p>

                                    <ul className="space-y-3">
                                        {service.title.includes('Automation') && [
                                            'n8n Workflow Design & Implementation',
                                            'Custom GPT & Chatbot Development',
                                            'CRM & Database Integrations (HubSpot, Salesforce)',
                                            'Automated Content & Marketing Pipelines'
                                        ].map(item => (
                                            <li key={item} className="flex items-center gap-3 text-slate-700">
                                                <CheckCircle2 size={18} className="text-green-600" /> {item}
                                            </li>
                                        ))}

                                        {service.title.includes('Engineering') && [
                                            'Scalable SaaS Web Application Development',
                                            'High-Performance E-commerce Solutions',
                                            'Microservices Architecture',
                                            'API Design & Integration'
                                        ].map(item => (
                                            <li key={item} className="flex items-center gap-3 text-slate-700">
                                                <CheckCircle2 size={18} className="text-blue-600" /> {item}
                                            </li>
                                        ))}

                                        {service.title.includes('R&D') && [
                                            'Proof of Concept (PoC) Development',
                                            'AR/VR Experience Design (Unity/WebXR)',
                                            'Machine Learning Model Fine-tuning',
                                            'Emerging Tech Consultation'
                                        ].map(item => (
                                            <li key={item} className="flex items-center gap-3 text-slate-700">
                                                <CheckCircle2 size={18} className="text-purple-600" /> {item}
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="pt-4">
                                        <Link
                                            href="/contact"
                                            className="inline-flex items-center gap-2 text-slate-900 font-semibold hover:gap-3 transition-all group"
                                        >
                                            Discuss Your Project <ArrowRight size={20} className="text-orange-500 group-hover:translate-x-1 transition-transform" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
