import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Save, Plus, Trash2, Image as ImageIcon, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Edit({ story }) {
    const { data, setData, post, processing, errors } = useForm({
        _method: 'PUT',
        title: story.title,
        subtitle: story.subtitle || '',
        description: story.description,
        points: Array.isArray(story.points) ? story.points : (story.points ? JSON.parse(story.points) : ['', '', '']),
        image: null,
        button_text: story.button_text || 'আমাদের গল্প পড়ুন',
        button_url: story.button_url || '/page/about-us',
        status: !!story.status,
        sort_order: story.sort_order || 0,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.stories.update', story.id));
    };

    const updatePoint = (index, value) => {
        const newPoints = [...data.points];
        newPoints[index] = value;
        setData('points', newPoints);
    };

    const addPoint = () => {
        setData('points', [...data.points, '']);
    };

    const removePoint = (index) => {
        const newPoints = data.points.filter((_, i) => i !== index);
        setData('points', newPoints);
    };

    return (
        <AdminLayout>
            <Head title={`Edit ${story.title}`} />
            <div className="p-4 md:p-8 bg-slate-50 min-h-screen">
                <div className="max-w-7xl mx-auto space-y-8">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <Link
                                href={route('admin.stories.index')}
                                className="p-4 bg-white hover:bg-slate-100 rounded-3xl shadow-sm text-slate-800 transition-colors"
                            >
                                <ArrowLeft size={24} />
                            </Link>
                            <div>
                                <h1 className="text-3xl font-black text-slate-800 tracking-tight">Edit Story</h1>
                                <p className="text-slate-500 font-bold">Update details for "{story.title}"</p>
                            </div>
                        </div>
                    </div>

                    {/* Form Cards */}
                    <form onSubmit={submit} className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-32">
                        {/* Primary Content Card */}
                        <div className="lg:col-span-2 space-y-8">
                            <div className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-sm space-y-8">
                                <div className="space-y-4">
                                    <h2 className="text-xl font-black text-slate-800 tracking-tight px-1">Story Details</h2>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Headline</label>
                                            <input
                                                type="text"
                                                value={data.title}
                                                onChange={e => setData('title', e.target.value)}
                                                className="w-full bg-slate-50 border-none px-6 py-4 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-emerald-100 transition-all font-sans"
                                            />
                                            {errors.title && <p className="text-rose-500 text-[10px] font-black mt-1 ml-1 uppercase">{errors.title}</p>}
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Pre-title/Subtitle</label>
                                            <input
                                                type="text"
                                                value={data.subtitle}
                                                onChange={e => setData('subtitle', e.target.value)}
                                                className="w-full bg-slate-50 border-none px-6 py-4 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-emerald-100 transition-all font-sans"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Main Description</label>
                                        <textarea
                                            rows="5"
                                            value={data.description}
                                            onChange={e => setData('description', e.target.value)}
                                            className="w-full bg-slate-50 border-none px-6 py-4 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-emerald-100 transition-all font-sans min-h-[120px]"
                                        ></textarea>
                                        {errors.description && <p className="text-rose-500 text-[10px] font-black mt-1 ml-1 uppercase">{errors.description}</p>}
                                    </div>
                                </div>

                                <div className="space-y-6 pt-6 border-t border-slate-50">
                                    <div className="flex items-center justify-between px-1">
                                        <h2 className="text-xl font-black text-slate-800 tracking-tight">Key Feature points</h2>
                                        <button
                                            type="button"
                                            onClick={addPoint}
                                            className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-black text-xs uppercase tracking-widest"
                                        >
                                            <Plus size={16} /> Add Point
                                        </button>
                                    </div>

                                    <div className="space-y-4">
                                        {data.points.map((point, index) => (
                                            <motion.div
                                                key={index}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                className="relative group"
                                            >
                                                <input
                                                    type="text"
                                                    value={point}
                                                    onChange={e => updatePoint(index, e.target.value)}
                                                    placeholder={`Point ${index + 1}`}
                                                    className="w-full bg-slate-50 border-none pl-6 pr-14 py-4 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-emerald-100 transition-all font-sans"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => removePoint(index)}
                                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-rose-500 transition-colors opacity-0 group-hover:opacity-100"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar Options Card */}
                        <div className="space-y-8">
                            <div className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-sm space-y-8">
                                <div className="space-y-4">
                                    <h2 className="text-xl font-black text-slate-800 tracking-tight px-1">Story Media</h2>
                                    <div className="aspect-square rounded-[2rem] overflow-hidden bg-slate-100 border-2 border-dashed border-slate-200 relative group flex items-center justify-center p-4">
                                        {data.image ? (
                                            <img src={URL.createObjectURL(data.image)} className="w-full h-full object-cover rounded-2xl" alt="Preview" />
                                        ) : (
                                            story.image ? (
                                                <img src={`/uploads/${story.image}`} className="w-full h-full object-cover rounded-2xl" alt="Current" />
                                            ) : (
                                                <ImageIcon size={64} className="text-slate-300" />
                                            )
                                        )}
                                        <label className="absolute inset-0 bg-black/40 text-white opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 font-black uppercase text-xs tracking-widest cursor-pointer text-center p-4">
                                            <ImageIcon size={24} /> {story.image ? 'Change Story Image' : 'Record story visual'}
                                            <input type="file" onChange={e => setData('image', e.target.files[0])} className="hidden" />
                                        </label>
                                    </div>
                                    {errors.image && <p className="text-rose-500 text-[10px] font-black mt-1 ml-1 uppercase">{errors.image}</p>}
                                </div>

                                <div className="space-y-6 pt-6 border-t border-slate-50">
                                    <div className="space-y-4">
                                        <h2 className="text-xl font-black text-slate-800 tracking-tight px-1">Buttons & More</h2>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Button text</label>
                                            <input
                                                type="text"
                                                value={data.button_text}
                                                onChange={e => setData('button_text', e.target.value)}
                                                className="w-full bg-slate-50 border-none px-6 py-4 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-emerald-100 transition-all font-sans"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Button link (URL)</label>
                                            <input
                                                type="text"
                                                value={data.button_url}
                                                onChange={e => setData('button_url', e.target.value)}
                                                className="w-full bg-slate-50 border-none px-6 py-4 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-emerald-100 transition-all font-sans"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Sort order</label>
                                            <input
                                                type="number"
                                                value={data.sort_order}
                                                onChange={e => setData('sort_order', e.target.value)}
                                                className="w-full bg-slate-50 border-none px-6 py-4 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-emerald-100 transition-all font-sans"
                                            />
                                        </div>
                                        <div className="flex items-center gap-3 px-1">
                                            <input
                                                type="checkbox"
                                                id="status"
                                                checked={data.status}
                                                onChange={e => setData('status', e.target.checked)}
                                                className="w-6 h-6 rounded-lg text-emerald-600 focus:ring-emerald-100 border-slate-200"
                                            />
                                            <label htmlFor="status" className="font-black text-xs uppercase tracking-widest text-slate-600 cursor-pointer">Visible to public</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Floating Bottom Bar */}
                        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50">
                            <motion.div
                                initial={{ y: 100 }}
                                animate={{ y: 0 }}
                                className="bg-white/80 backdrop-blur-xl border border-white p-2 rounded-3xl shadow-[0_30px_60px_rgba(0,0,0,0.1)] flex items-center gap-2"
                            >
                                <Link
                                    href={route('admin.stories.index')}
                                    className="px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest text-slate-400 hover:text-slate-600 transition-colors"
                                >
                                    Discard Changes
                                </Link>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-indigo-600/20 transition-all flex items-center gap-2"
                                >
                                    {processing ? <Loader2 className="animate-spin" size={16} /> : <><Save size={16} /> Save Changes</>}
                                </button>
                            </motion.div>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}
