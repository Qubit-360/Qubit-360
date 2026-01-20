'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function EditExperimentPage({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter();
    const [id, setId] = useState<string>('');
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [techStackStr, setTechStackStr] = useState('');

    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        description: '',
        full_description: '',
        status: '',
        progress: 0,
        tag: '',
        link: '',
    });

    useEffect(() => {
        const unwrapParams = async () => {
            const resolvedParams = await params;
            setId(resolvedParams.id);
            fetchExperiment(resolvedParams.id);
        };
        unwrapParams();
    }, [params]);

    const fetchExperiment = async (expId: string) => {
        try {
            const { data, error } = await supabase
                .from('experiments')
                .select('*')
                .eq('id', expId)
                .single();

            if (error) throw error;
            setFormData({
                title: data.title,
                slug: data.slug,
                description: data.description,
                full_description: data.full_description,
                status: data.status,
                progress: data.progress,
                tag: data.tag,
                link: data.link,
            });
            if (data.tech_stack && Array.isArray(data.tech_stack)) {
                setTechStackStr(data.tech_stack.join(', '));
            }
        } catch (error) {
            console.error('Error fetching experiment:', error);
            alert('Error fetching experiment details');
            router.push('/admin/innovation-lab');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        const tech_stack = techStackStr.split(',').map(s => s.trim()).filter(Boolean);

        try {
            const { error } = await supabase
                .from('experiments')
                .update({
                    ...formData,
                    tech_stack
                })
                .eq('id', id);

            if (error) throw error;
            router.push('/admin/innovation-lab');
        } catch (error) {
            console.error('Error updating experiment:', error);
            alert('Error updating experiment');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="max-w-3xl mx-auto">
            <Link href="/admin/innovation-lab" className="inline-flex items-center text-slate-500 hover:text-slate-900 mb-6 group">
                <ArrowLeft size={18} className="mr-2 group-hover:-translate-x-1 transition-transform" />
                Back to Labs
            </Link>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8">
                <h1 className="text-2xl font-bold text-slate-900 mb-6">Edit Experiment</h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Title</label>
                            <input
                                type="text"
                                required
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Slug</label>
                            <input
                                type="text"
                                required
                                value={formData.slug}
                                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none bg-slate-50"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Short Description</label>
                        <textarea
                            required
                            rows={2}
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Full Description</label>
                        <textarea
                            required
                            rows={4}
                            value={formData.full_description}
                            onChange={(e) => setFormData({ ...formData, full_description: e.target.value })}
                            className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Status</label>
                            <select
                                value={formData.status}
                                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
                            >
                                <option>Active Research</option>
                                <option>Prototype Phase</option>
                                <option>Completed</option>
                                <option>Archived</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Progress (%)</label>
                            <input
                                type="number"
                                min="0"
                                max="100"
                                value={formData.progress}
                                onChange={(e) => setFormData({ ...formData, progress: parseInt(e.target.value) || 0 })}
                                className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Tech Stack (comma separated)</label>
                        <input
                            type="text"
                            value={techStackStr}
                            onChange={(e) => setTechStackStr(e.target.value)}
                            placeholder="Next.js, Supabase, Tailwind..."
                            className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Tag/Category</label>
                            <input
                                type="text"
                                value={formData.tag}
                                onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                                className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Detail Link (optional)</label>
                            <input
                                type="text"
                                value={formData.link}
                                onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                                placeholder="/innovation-lab/slug"
                                className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>
                    </div>

                    <div className="flex justify-end pt-4">
                        <button
                            type="submit"
                            disabled={saving}
                            className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                        >
                            {saving ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
