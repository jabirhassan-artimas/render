import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { ChevronLeft, Save, Image as ImageIcon, Layout, Type, Link as LinkIcon, Hash, Check, Trash2 } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export default function Edit({ banner }) {
    const { data, setData, post, processing, errors } = useForm({
        _method: 'PUT',
        title: banner.title || '',
        subtitle: banner.subtitle || '',
        description: banner.description || '',
        image: null,
        type: banner.type || 'slider',
        link: banner.link || '',
        sort_order: banner.sort_order || 0,
        status: !!banner.status,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Since we are uploading images, we use POST with _method PUT
        post(route('admin.banners.update', banner.id));
    };

    return (
        <AdminLayout>
            <Head title={`Edit Banner: ${banner.title}`} />

            <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {/* Header Section */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link 
                            href={route('admin.banners.index')}
                            className="p-3 bg-white border border-slate-100 text-slate-400 hover:text-blue-600 rounded-2xl transition-all shadow-sm group"
                        >
                            <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                        </Link>
                        <div>
                            <h1 className="text-2xl font-black text-slate-800 tracking-tight">Edit Promotion</h1>
                            <p className="text-slate-500 text-sm font-medium">Update banner content, media, or placement.</p>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-sm space-y-8">
                        {/* Title & Subtitle */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">
                                    <Type size={12} /> Banner Title
                                </label>
                                <input 
                                    type="text"
                                    value={data.title}
                                    onChange={e => setData('title', e.target.value)}
                                    className="w-full bg-slate-50 border-none px-6 py-4 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-blue-100 transition-all"
                                />
                                {errors.title && <p className="text-rose-500 text-[10px] font-bold uppercase tracking-widest ml-1">{errors.title}</p>}
                            </div>
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">
                                    <Type size={12} /> Subtitle / Caption
                                </label>
                                <input 
                                    type="text"
                                    value={data.subtitle}
                                    onChange={e => setData('subtitle', e.target.value)}
                                    className="w-full bg-slate-50 border-none px-6 py-4 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-blue-100 transition-all"
                                />
                            </div>
                        </div>

                        {/* Image Upload */}
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">
                                <ImageIcon size={12} /> Banner Media
                            </label>
                            <div className="relative group">
                                <input 
                                    type="file"
                                    onChange={e => setData('image', e.target.files[0])}
                                    className="hidden"
                                    id="banner-image-edit"
                                />
                                <label 
                                    htmlFor="banner-image-edit"
                                    className="flex flex-col items-center justify-center w-full aspect-video md:aspect-[21/9] bg-slate-50 rounded-[2.5rem] border-2 border-dashed border-slate-200 hover:border-blue-400 hover:bg-blue-50/30 transition-all cursor-pointer overflow-hidden group"
                                >
                                    {data.image ? (
                                        <img src={URL.createObjectURL(data.image)} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="relative w-full h-full">
                                            <img src={`/storage/${banner.image}`} className="w-full h-full object-cover opacity-60 transition-opacity group-hover:opacity-40" />
                                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-3">
                                                    <ImageIcon className="text-slate-400" size={20} />
                                                </div>
                                                <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Click to change media</p>
                                            </div>
                                        </div>
                                    )}
                                </label>
                            </div>
                            {errors.image && <p className="text-rose-500 text-[10px] font-bold uppercase tracking-widest ml-1">{errors.image}</p>}
                        </div>

                        {/* Placement & Link */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">
                                    <Layout size={12} /> Layout Placement
                                </label>
                                <select 
                                    value={data.type}
                                    onChange={e => setData('type', e.target.value)}
                                    className="w-full bg-slate-50 border-none px-6 py-4 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-blue-100 transition-all"
                                >
                                    <option value="slider">Main Hero Slider</option>
                                    <option value="promo_home">Square Promo (Home)</option>
                                    <option value="promo_sidebar">Sidebar Banner</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">
                                    <LinkIcon size={12} /> Target URL
                                </label>
                                <input 
                                    type="text"
                                    value={data.link}
                                    onChange={e => setData('link', e.target.value)}
                                    className="w-full bg-slate-50 border-none px-6 py-4 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-blue-100 transition-all"
                                />
                            </div>
                        </div>

                        {/* Description */}
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">
                                <Type size={12} /> Description (Optional)
                            </label>
                            <textarea 
                                value={data.description}
                                onChange={e => setData('description', e.target.value)}
                                className="w-full bg-slate-50 border-none px-6 py-4 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-blue-100 transition-all min-h-[120px]"
                            ></textarea>
                        </div>

                        {/* Order & Status */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-slate-50">
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">
                                    <Hash size={12} /> Display Order
                                </label>
                                <input 
                                    type="number"
                                    value={data.sort_order}
                                    onChange={e => setData('sort_order', e.target.value)}
                                    className="w-full bg-slate-50 border-none px-6 py-4 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-blue-100 transition-all"
                                />
                            </div>
                            <div className="flex items-end pb-1">
                                <label className="flex items-center gap-4 cursor-pointer group">
                                    <div className="relative">
                                        <input 
                                            type="checkbox"
                                            checked={data.status}
                                            onChange={e => setData('status', e.target.checked)}
                                            className="sr-only"
                                        />
                                        <div className={cn(
                                            "w-14 h-8 rounded-full transition-all duration-300 shadow-inner",
                                            data.status ? "bg-emerald-500" : "bg-slate-200"
                                        )}></div>
                                        <div className={cn(
                                            "absolute top-1 left-1 bg-white w-6 h-6 rounded-full transition-all duration-300 shadow-sm flex items-center justify-center",
                                            data.status ? "translate-x-6" : "translate-x-0"
                                        )}>
                                            {data.status && <Check size={14} className="text-emerald-500" />}
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-xs font-black text-slate-800 uppercase tracking-tight">Active Status</p>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Toggle banner visibility</p>
                                    </div>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end gap-3">
                        <Link 
                            href={route('admin.banners.index')}
                            className="bg-white text-slate-500 px-10 py-5 rounded-[2rem] font-black text-xs uppercase tracking-widest border border-slate-100 hover:bg-slate-50 transition-all"
                        >
                            Cancel
                        </Link>
                        <button 
                            type="submit"
                            disabled={processing}
                            className="bg-slate-900 hover:bg-slate-800 text-white px-12 py-5 rounded-[2rem] font-black text-xs uppercase tracking-widest shadow-xl shadow-slate-200 transition-all flex items-center gap-3 active:scale-95 disabled:opacity-50"
                        >
                            <Save size={18} /> {processing ? 'Updating...' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
