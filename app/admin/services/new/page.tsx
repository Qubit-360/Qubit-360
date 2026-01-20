'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function NewServicePage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        icon: '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { error } = await supabase.from('services').insert([formData]);
            if (error) throw error;
            router.push('/admin/services');
        } catch (error) {
            console.error('Error creating service:', error);
            alert('Error creating service');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <Link href="/admin/services" className="inline-flex items-center text-slate-500 hover:text-slate-900 mb-6 group">
                <ArrowLeft size={18} className="mr-2 group-hover:-translate-x-1 transition-transform" />
                Back to Services
            </Link>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8">
                <h1 className="text-2xl font-bold text-slate-900 mb-6">Add New Service</h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Title</label>
                        <input
                            type="text"
                            required
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="e.g. AI Automation"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Icon Name (Lucide React)</label>
                        <input
                            type="text"
                            required
                            value={formData.icon}
                            onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                            className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="e.g. Bot"
                        />
                        <p className="text-xs text-slate-500 mt-1">Use icon names from <a href="https://lucide.dev/icons" target="_blank" className="text-blue-500 hover:underline">Lucide Icons</a></p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
                        <textarea
                            required
                            rows={4}
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                            placeholder="Service description..."
                        />
                    </div>

                    <div className="flex justify-end pt-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                        >
                            {loading ? 'Creating...' : 'Create Service'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
