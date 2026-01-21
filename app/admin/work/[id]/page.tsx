'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { ArrowLeft, Upload, X, Image as ImageIcon } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function EditWorkPage({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter();
    const [id, setId] = useState<string>('');
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    // Upload state
    const [uploading, setUploading] = useState(false);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const [techStackStr, setTechStackStr] = useState('');

    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        description: '',
        full_description: '',
        challenge: '',
        solution: '',
        tag: '',
        image_url: '',
        link: '',
    });

    useEffect(() => {
        const unwrapParams = async () => {
            const resolvedParams = await params;
            setId(resolvedParams.id);
            fetchWork(resolvedParams.id);
        };
        unwrapParams();
    }, [params]);

    const fetchWork = async (workId: string) => {
        try {
            const { data, error } = await supabase
                .from('works')
                .select('*')
                .eq('id', workId)
                .single();

            if (error) throw error;
            setFormData({
                title: data.title,
                slug: data.slug,
                description: data.description,
                full_description: data.full_description,
                challenge: data.challenge,
                solution: data.solution,
                tag: data.tag,
                image_url: data.image_url,
                link: data.link,
            });
            setPreviewUrl(data.image_url); // Set initial preview
            if (data.tech_stack && Array.isArray(data.tech_stack)) {
                setTechStackStr(data.tech_stack.join(', '));
            }
        } catch (error) {
            console.error('Error fetching project:', error);
            alert('Error fetching project details');
            router.push('/admin/work');
        } finally {
            setLoading(false);
        }
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) {
            return;
        }

        const file = e.target.files[0];
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
        const filePath = `${fileName}`;

        try {
            setUploading(true);

            // 1. Upload to Supabase Storage 'works' bucket
            const { error: uploadError } = await supabase.storage
                .from('works')
                .upload(filePath, file);

            if (uploadError) {
                throw uploadError;
            }

            // 2. Get Public URL
            const { data: { publicUrl } } = supabase.storage
                .from('works')
                .getPublicUrl(filePath);

            setFormData(prev => ({ ...prev, image_url: publicUrl }));
            setPreviewUrl(publicUrl);

        } catch (error) {
            console.error('Error uploading image:', error);
            alert('Error uploading image');
        } finally {
            setUploading(false);
        }
    };

    const removeImage = () => {
        setFormData(prev => ({ ...prev, image_url: '' }));
        setPreviewUrl(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        const tech_stack = techStackStr.split(',').map(s => s.trim()).filter(Boolean);

        try {
            const { error } = await supabase
                .from('works')
                .update({
                    ...formData,
                    tech_stack
                })
                .eq('id', id);

            if (error) throw error;
            router.push('/admin/work');
        } catch (error) {
            console.error('Error updating project:', error);
            alert('Error updating project');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="max-w-3xl mx-auto">
            <Link href="/admin/work" className="inline-flex items-center text-slate-500 hover:text-slate-900 mb-6 group">
                <ArrowLeft size={18} className="mr-2 group-hover:-translate-x-1 transition-transform" />
                Back to Work
            </Link>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold text-slate-900">Edit Project</h1>
                    {formData.slug && (
                        <span className="text-xs font-mono bg-slate-100 px-2 py-1 rounded text-slate-600">
                            /work/{formData.slug}
                        </span>
                    )}
                </div>

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
                            <label className="block text-sm font-medium text-slate-700 mb-2">Challenge</label>
                            <textarea
                                rows={3}
                                value={formData.challenge}
                                onChange={(e) => setFormData({ ...formData, challenge: e.target.value })}
                                className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Solution</label>
                            <textarea
                                rows={3}
                                value={formData.solution}
                                onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
                                className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
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

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Tag/Category</label>
                            <input
                                type="text"
                                value={formData.tag}
                                onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                                className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-slate-700 mb-2">Project Image</label>

                            {/* Image Preview & Upload Area */}
                            <div className="relative border-2 border-dashed border-slate-200 rounded-xl p-4 transition-all hover:border-blue-400 bg-slate-50 text-center">
                                {previewUrl ? (
                                    <div className="relative w-full aspect-video rounded-lg overflow-hidden group">
                                        <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                                        <button
                                            type="button"
                                            onClick={removeImage}
                                            className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-sm"
                                        >
                                            <X size={16} />
                                        </button>
                                    </div>
                                ) : (
                                    <div className="py-8 flex flex-col items-center justify-center text-slate-400">
                                        {uploading ? (
                                            <div className="animate-spin w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full mb-2"></div>
                                        ) : (
                                            <ImageIcon size={32} className="mb-2" />
                                        )}
                                        <span className="text-sm font-medium mb-2">
                                            {uploading ? 'Uploading...' : 'Click to Upload Image'}
                                        </span>
                                        <span className="text-xs text-slate-400">Supports JPG, PNG, WEBP</span>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageUpload}
                                            disabled={uploading}
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-wait"
                                        />
                                    </div>
                                )}
                            </div>
                            {/* Fallback Text Input */}
                            <div className="mt-2">
                                <input
                                    type="text"
                                    value={formData.image_url}
                                    onChange={(e) => {
                                        setFormData({ ...formData, image_url: e.target.value });
                                        setPreviewUrl(e.target.value || null);
                                    }}
                                    placeholder="Or paste image URL"
                                    className="w-full px-3 py-1.5 text-sm rounded-md border border-slate-200 text-slate-500 focus:outline-none focus:border-blue-500"
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">External Link</label>
                        <input
                            type="text"
                            value={formData.link}
                            onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                            className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>

                    <div className="flex justify-end pt-4">
                        <button
                            type="submit"
                            disabled={saving || uploading}
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
