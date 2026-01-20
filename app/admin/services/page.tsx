'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { Pencil, Trash2, Plus } from 'lucide-react';

export default function AdminServicesPage() {
    const [services, setServices] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {
            const { data, error } = await supabase
                .from('services')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setServices(data || []);
        } catch (error) {
            console.error('Error fetching services:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this service?')) return;

        try {
            const { error } = await supabase.from('services').delete().eq('id', id);
            if (error) throw error;
            fetchServices();
        } catch (error) {
            console.error('Error deleting service:', error);
            alert('Error deleting service');
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold text-slate-900">Manage Services</h1>
                <Link
                    href="/admin/services/new"
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                    <Plus size={18} /> Add New
                </Link>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50 border-b border-slate-200">
                            <th className="px-6 py-4 font-semibold text-slate-700">Service</th>
                            <th className="px-6 py-4 font-semibold text-slate-700">Description</th>
                            <th className="px-6 py-4 font-semibold text-slate-700">Icon</th>
                            <th className="px-6 py-4 font-semibold text-slate-700 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {services.map((service) => (
                            <tr key={service.id} className="hover:bg-slate-50">
                                <td className="px-6 py-4 font-medium text-slate-900">{service.title}</td>
                                <td className="px-6 py-4 text-slate-600 truncate max-w-xs">{service.description}</td>
                                <td className="px-6 py-4 text-slate-500 font-mono text-sm">{service.icon}</td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-3">
                                        <Link
                                            href={`/admin/services/${service.id}`}
                                            className="text-slate-400 hover:text-blue-600 transition-colors"
                                        >
                                            <Pencil size={18} />
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(service.id)}
                                            className="text-slate-400 hover:text-red-600 transition-colors"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {services.length === 0 && (
                            <tr>
                                <td colSpan={4} className="px-6 py-8 text-center text-slate-500">
                                    No services found. Add one to get started.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
