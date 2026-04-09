import React, { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import {
    ChevronLeft, Save, Image as ImageIcon, Layout, Type,
    Link as LinkIcon, Hash, Check, Video, Youtube, Upload, Film
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) { return twMerge(clsx(inputs)); }

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        subtitle: '',
        description: '',
        image: null,
        video_url: '',
        video_file: null,
        media_type: 'image',   // 'image' | 'video_embed' | 'video_upload'
        type: 'slider',
        link: '',
        sort_order: 0,
        status: true,
    });

    const [videoPreview, setVideoPreview] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.banners.store'));
    };

    const mediaTabs = [
        { key: 'image', label: 'Background Image', icon: <ImageIcon size={15} /> },
        { key: 'video_embed', label: 'Embed Link', icon: <Youtube size={15} /> },
        { key: 'video_upload', label: 'Upload Video', icon: <Upload size={15} /> },
    ];

    return (
        <AdminLayout>
            <Head title="Create New Banner" />

            <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {/* Header */}
                <div className="flex items-center gap-4">
                    <Link
                        href={route('admin.banners.index')}
                        className="p-3 bg-white border border-slate-100 text-slate-400 hover:text-emerald-600 rounded-2xl transition-all shadow-sm group"
                    >
                        <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-black text-slate-800 tracking-tight">Add Promotion</h1>
                        <p className="text-slate-500 text-sm font-medium">Design a new impactful banner for your homepage.</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-sm space-y-8">

                        {/* Title & Subtitle */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">
                                    <Type size={12} /> Banner Title *
                                </label>
                                <input
                                    type="text"
                                    value={data.title}
                                    onChange={e => setData('title', e.target.value)}
                                    className="w-full bg-slate-50 border-none px-6 py-4 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-emerald-100 transition-all"
                                    placeholder="e.g. Summer Collection 2026"
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
                                    className="w-full bg-slate-50 border-none px-6 py-4 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-emerald-100 transition-all"
                                    placeholder="e.g. Up to 50% Off"
                                />
                            </div>
                        </div>

                        {/* ─── MEDIA TYPE TABS ─────────────────────────────── */}
                        <div className="space-y-4">
                            <label className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">
                                <Film size={12} /> Slide Media Type
                            </label>

                            {/* Tab Switcher */}
                            <div className="flex gap-2 p-1.5 bg-slate-100 rounded-2xl w-fit">
                                {mediaTabs.map(tab => (
                                    <button
                                        key={tab.key}
                                        type="button"
                                        onClick={() => setData('media_type', tab.key)}
                                        className={cn(
                                            'flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all',
                                            data.media_type === tab.key
                                                ? 'bg-white text-emerald-700 shadow-md'
                                                : 'text-slate-400 hover:text-slate-600'
                                        )}
                                    >
                                        {tab.icon} {tab.label}
                                    </button>
                                ))}
                            </div>

                            {/* ── Image Upload ── */}
                            {data.media_type === 'image' && (
                                <div>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={e => setData('image', e.target.files[0])}
                                        className="hidden"
                                        id="banner-image"
                                    />
                                    <label
                                        htmlFor="banner-image"
                                        className="flex flex-col items-center justify-center w-full aspect-video md:aspect-[21/9] bg-slate-50 rounded-[2.5rem] border-2 border-dashed border-slate-200 hover:border-emerald-400 hover:bg-emerald-50/30 transition-all cursor-pointer overflow-hidden group"
                                    >
                                        {data.image ? (
                                            <img src={URL.createObjectURL(data.image)} className="w-full h-full object-cover" alt="Preview" />
                                        ) : (
                                            <div className="text-center">
                                                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm group-hover:scale-110 transition-transform">
                                                    <ImageIcon className="text-slate-300 group-hover:text-emerald-500 transition-colors" size={24} />
                                                </div>
                                                <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Click to upload banner image</p>
                                                <p className="text-[10px] text-slate-300 mt-1">Recommended: 1920×800 · PNG / JPG · Max 5MB</p>
                                            </div>
                                        )}
                                    </label>
                                    {errors.image && <p className="text-rose-500 text-[10px] font-bold uppercase tracking-widest ml-1 mt-1">{errors.image}</p>}
                                </div>
                            )}

                            {/* ── Video Embed URL ── */}
                            {data.media_type === 'video_embed' && (
                                <div className="space-y-4">
                                    <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-2xl border border-blue-100">
                                        <Youtube size={18} className="text-blue-500 mt-0.5 shrink-0" />
                                        <div>
                                            <p className="text-xs font-black text-blue-800">Supported: YouTube, Vimeo, or any embeddable video URL</p>
                                            <p className="text-[11px] text-blue-500 mt-0.5">The video will play muted and looped as a full-screen background on the hero slider.</p>
                                        </div>
                                    </div>
                                    <input
                                        type="text"
                                        value={data.video_url}
                                        onChange={e => setData('video_url', e.target.value)}
                                        className="w-full bg-slate-50 border-none px-6 py-4 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-emerald-100 transition-all"
                                        placeholder="https://www.youtube.com/watch?v=... or https://vimeo.com/..."
                                    />
                                    {errors.video_url && <p className="text-rose-500 text-[10px] font-bold uppercase tracking-widest ml-1">{errors.video_url}</p>}

                                    {/* Thumbnail for embed slide */}
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">
                                            Thumbnail Image (shown before video loads)
                                        </label>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={e => setData('image', e.target.files[0])}
                                            className="hidden"
                                            id="embed-thumbnail"
                                        />
                                        <label
                                            htmlFor="embed-thumbnail"
                                            className="flex flex-col items-center justify-center w-full h-40 bg-slate-50 rounded-[2rem] border-2 border-dashed border-slate-200 hover:border-emerald-400 hover:bg-emerald-50/30 transition-all cursor-pointer overflow-hidden group"
                                        >
                                            {data.image ? (
                                                <img src={URL.createObjectURL(data.image)} className="w-full h-full object-cover" alt="Thumbnail" />
                                            ) : (
                                                <div className="text-center">
                                                    <ImageIcon className="text-slate-300 group-hover:text-emerald-400 mx-auto mb-2 transition-colors" size={20} />
                                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Upload thumbnail (optional)</p>
                                                </div>
                                            )}
                                        </label>
                                    </div>
                                </div>
                            )}

                            {/* ── Upload Video File ── */}
                            {data.media_type === 'video_upload' && (
                                <div className="space-y-4">
                                    <div className="flex items-start gap-3 p-4 bg-violet-50 rounded-2xl border border-violet-100">
                                        <Upload size={18} className="text-violet-500 mt-0.5 shrink-0" />
                                        <div>
                                            <p className="text-xs font-black text-violet-800">Upload MP4 / WebM / OGG / MOV · Max 100MB</p>
                                            <p className="text-[11px] text-violet-500 mt-0.5">The video plays silently looped as a background on the hero slider.</p>
                                        </div>
                                    </div>
                                    <input
                                        type="file"
                                        accept="video/mp4,video/webm,video/ogg,video/quicktime"
                                        onChange={e => {
                                            const file = e.target.files[0];
                                            setData('video_file', file);
                                            if (file) setVideoPreview(URL.createObjectURL(file));
                                        }}
                                        className="hidden"
                                        id="banner-video"
                                    />
                                    <label
                                        htmlFor="banner-video"
                                        className="flex flex-col items-center justify-center w-full aspect-video bg-slate-900 rounded-[2.5rem] border-2 border-dashed border-slate-700 hover:border-violet-500 hover:bg-slate-800 transition-all cursor-pointer overflow-hidden group"
                                    >
                                        {videoPreview ? (
                                            <video src={videoPreview} className="w-full h-full object-cover" muted autoPlay loop playsInline />
                                        ) : (
                                            <div className="text-center">
                                                <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                                                    <Video className="text-slate-400 group-hover:text-violet-400 transition-colors" size={28} />
                                                </div>
                                                <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Click to upload video</p>
                                                <p className="text-[10px] text-slate-500 mt-1">MP4 · WebM · MOV · Max 100MB</p>
                                            </div>
                                        )}
                                    </label>
                                    {errors.video_file && <p className="text-rose-500 text-[10px] font-bold uppercase tracking-widest ml-1">{errors.video_file}</p>}

                                    {/* Thumbnail for uploaded video slide */}
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">
                                            Thumbnail / Poster Image (optional)
                                        </label>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={e => setData('image', e.target.files[0])}
                                            className="hidden"
                                            id="video-thumbnail"
                                        />
                                        <label
                                            htmlFor="video-thumbnail"
                                            className="flex flex-col items-center justify-center w-full h-40 bg-slate-50 rounded-[2rem] border-2 border-dashed border-slate-200 hover:border-violet-400 hover:bg-violet-50/30 transition-all cursor-pointer overflow-hidden group"
                                        >
                                            {data.image ? (
                                                <img src={URL.createObjectURL(data.image)} className="w-full h-full object-cover" alt="Poster" />
                                            ) : (
                                                <div className="text-center">
                                                    <ImageIcon className="text-slate-300 group-hover:text-violet-400 mx-auto mb-2 transition-colors" size={20} />
                                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Upload poster image (optional)</p>
                                                </div>
                                            )}
                                        </label>
                                    </div>
                                </div>
                            )}
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
                                    className="w-full bg-slate-50 border-none px-6 py-4 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-emerald-100 transition-all"
                                >
                                    <option value="slider">Main Hero Slider</option>
                                    <option value="promo_home">Square Promo (Home)</option>
                                    <option value="promo_sidebar">Sidebar Banner</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">
                                    <LinkIcon size={12} /> Target URL (CTA Button)
                                </label>
                                <input
                                    type="text"
                                    value={data.link}
                                    onChange={e => setData('link', e.target.value)}
                                    className="w-full bg-slate-50 border-none px-6 py-4 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-emerald-100 transition-all"
                                    placeholder="e.g. /shop or https://..."
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
                                className="w-full bg-slate-50 border-none px-6 py-4 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-emerald-100 transition-all min-h-[120px]"
                                placeholder="Describe the promotion..."
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
                                    className="w-full bg-slate-50 border-none px-6 py-4 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-emerald-100 transition-all"
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
                                        <div className={cn("w-14 h-8 rounded-full transition-all duration-300 shadow-inner", data.status ? "bg-emerald-500" : "bg-slate-200")}></div>
                                        <div className={cn("absolute top-1 left-1 bg-white w-6 h-6 rounded-full transition-all duration-300 shadow-sm flex items-center justify-center", data.status ? "translate-x-6" : "translate-x-0")}>
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
                            className="bg-emerald-600 hover:bg-emerald-700 text-white px-12 py-5 rounded-[2rem] font-black text-xs uppercase tracking-widest shadow-xl shadow-emerald-100 transition-all flex items-center gap-3 active:scale-95 disabled:opacity-50"
                        >
                            <Save size={18} /> {processing ? 'Publishing...' : 'Publish Banner'}
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
