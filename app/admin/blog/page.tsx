'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { Pencil, Trash2, Plus, FlaskConical } from 'lucide-react';

export default function AdminExperimentsPage() {
    const [experiments, setExperiments] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchExperiments();
    }, []);

    const fetchExperiments = async () => {
        try {
            const { data, error } = await supabase
                .from('experiments')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setExperiments(data || []);
        } catch (error) {
            console.error('Error fetching experiments:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this experiment?')) return;

        try {
            const { error } = await supabase.from('experiments').delete().eq('id', id);
            if (error) throw error;
            fetchExperiments();
        } catch (error) {
            console.error('Error deleting experiment:', error);
            alert('Error deleting experiment');
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold text-slate-900">Manage Blog</h1>
                <Link
                    href="/admin/blog/new"
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                    <Plus size={18} /> Add New
                </Link>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50 border-b border-slate-200">
                            <th className="px-6 py-4 font-semibold text-slate-700">Post</th>
                            <th className="px-6 py-4 font-semibold text-slate-700">Tag</th>
                            <th className="px-6 py-4 font-semibold text-slate-700 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {experiments.map((exp) => (
                            <tr key={exp.id} className="hover:bg-slate-50">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-slate-100 rounded-lg text-slate-500">
                                            <FlaskConical size={16} />
                                        </div>
                                        <div>
                                            <div className="font-medium text-slate-900">{exp.title}</div>
                                            <div className="text-xs text-slate-500 truncate max-w-xs">{exp.description}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="px-2 py-1 text-xs font-semibold bg-slate-100 text-slate-600 rounded-full">
                                        {exp.tag}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-3">
                                        <Link
                                            href={`/admin/blog/${exp.id}`}
                                            className="text-slate-400 hover:text-blue-600 transition-colors"
                                        >
                                            <Pencil size={18} />
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(exp.id)}
                                            className="text-slate-400 hover:text-red-600 transition-colors"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {experiments.length === 0 && (
                            <tr>
                                <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                                    No experiments found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
