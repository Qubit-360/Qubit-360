'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { EXPERIMENTS, PROJECTS, SERVICES } from '@/constants';

export default function AdminPage() {
    const [seeding, setSeeding] = useState(false);
    const [status, setStatus] = useState<string | null>(null);

    const handleSeed = async () => {
        if (!confirm('Are you sure? This will attempt to insert initial data.')) return;
        setSeeding(true);
        setStatus('Seeding...');

        try {
            // Seed Services
            const servicesData = SERVICES.map(s => ({
                title: s.title,
                description: s.description,
                icon: s.icon,
            }));
            const { error: sErr } = await supabase.from('services').upsert(servicesData, { onConflict: 'title' });
            if (sErr) throw sErr;

            // Seed Works
            const worksData = PROJECTS.map(p => ({
                title: p.title,
                slug: p.slug,
                description: p.description,
                full_description: p.fullDescription,
                challenge: p.challenge,
                solution: p.solution,
                tech_stack: p.techStack,
                tag: p.tag,
                image_url: p.image,
                link: p.link,
            }));
            const { error: wErr } = await supabase.from('works').upsert(worksData, { onConflict: 'slug' });
            if (wErr) throw wErr;

            // Seed Experiments
            const experimentsData = EXPERIMENTS.map(e => ({
                title: e.title,
                slug: e.slug,
                description: e.description,
                full_description: e.fullDescription,
                status: e.status,
                progress: e.progress,
                tag: e.tag,
                tech_stack: e.techStack,
                link: e.link,
            }));
            const { error: eErr } = await supabase.from('experiments').upsert(experimentsData, { onConflict: 'slug' });
            if (eErr) throw eErr;

            setStatus('Success! Database seeded.');
        } catch (err: any) {
            setStatus(`Error: ${err.message}`);
        } finally {
            setSeeding(false);
        }
    };

    return (
        <div className="max-w-4xl">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">Admin Dashboard</h1>
                    <p className="text-slate-600">
                        Welcome to the Qubit 360 Content Management System.
                    </p>
                </div>
                <button
                    onClick={handleSeed}
                    disabled={seeding}
                    className="px-4 py-2 bg-slate-800 text-white text-sm rounded-lg hover:bg-slate-900 disabled:opacity-50"
                >
                    {seeding ? 'Seeding...' : 'Seed Initial Data'}
                </button>
            </div>

            {status && (
                <div className={`mb-6 p-4 rounded-lg ${status.startsWith('Error') ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>
                    {status}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm">
                    <h3 className="tex-lg font-semibold mb-2">Services</h3>
                    <p className="text-slate-500 text-sm mb-4">Manage offered services.</p>
                </div>
                <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm">
                    <h3 className="tex-lg font-semibold mb-2">Work</h3>
                    <p className="text-slate-500 text-sm mb-4">Manage case studies and projects.</p>
                </div>
                <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm">
                    <h3 className="tex-lg font-semibold mb-2">Blog</h3>
                    <p className="text-slate-500 text-sm mb-4">Manage blog posts and articles.</p>
                </div>
            </div>
        </div>
    );
}
