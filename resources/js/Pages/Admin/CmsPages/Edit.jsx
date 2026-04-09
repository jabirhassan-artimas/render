import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { ChevronLeft, Save, FileText, Type, Globe, Check, Image as ImageIcon } from 'lucide-react';

export default function Edit({ page }) {
    const { data, setData, post, processing, errors } = useForm({
        _method: 'PUT',
        title: page.title || '',
        slug: page.slug || '',
        content: page.content || '',
        image: null,
        meta: page.meta || {
            title: '',
            description: '',
            keywords: ''
        },
        status: !!page.status,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.pages.update', page.id));
    };

    return (
        <AdminLayout>
            <Head title={`Edit Page: ${page.title}`} />

            <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
                {/* Header */}
                <div className="flex items-center gap-4">
                    <Link 
                        href={route('admin.pages.index')}
                        className="p-3 bg-white border border-slate-100 text-slate-400 hover:text-emerald-600 rounded-2xl transition-all shadow-sm group"
                    >
                        <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-black text-slate-800 tracking-tight uppercase px-1">Update Content</h1>
                        <p className="text-slate-500 text-sm font-medium px-1">Refine messaging, layout, or search identifiers.</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content Area */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-sm space-y-8">
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">
                                    <Type size={12} /> Page Heading
                                </label>
                                <input 
                                    type="text"
                                    value={data.title}
                                    onChange={e => setData('title', e.target.value)}
                                    className="w-full bg-slate-50 border-none px-6 py-4 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-emerald-100 transition-all font-sans"
                                />
                                {errors.title && <p className="text-rose-500 text-[10px] font-bold uppercase tracking-widest ml-1">{errors.title}</p>}
                            </div>

                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">
                                    <FileText size={12} /> Content Body
                                </label>
                                <textarea 
                                    value={data.content}
                                    onChange={e => setData('content', e.target.value)}
                                    className="w-full bg-slate-50 border-none px-6 py-4 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-emerald-100 transition-all min-h-[500px] font-sans"
                                ></textarea>
                                {errors.content && <p className="text-rose-500 text-[10px] font-bold uppercase tracking-widest ml-1">{errors.content}</p>}
                            </div>
                        </div>

                        {/* Banner Image */}
                        <div className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-sm space-y-4">
                            <label className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">
                                <ImageIcon size={12} /> Header Appearance
                            </label>
                            <label className="flex flex-col items-center justify-center w-full aspect-[21/9] bg-slate-50 rounded-[2.5rem] border-2 border-dashed border-slate-200 hover:border-emerald-400 hover:bg-emerald-50/30 transition-all cursor-pointer overflow-hidden group">
                                {data.image ? (
                                    <img src={URL.createObjectURL(data.image)} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="relative w-full h-full">
                                        {page.image ? (
                                            <img src={`/uploads/${page.image}`} className="w-full h-full object-cover opacity-60 group-hover:opacity-30 transition-opacity" />
                                        ) : (
                                            <div className="absolute inset-0 flex items-center justify-center text-slate-200"><ImageIcon size={48} /></div>
                                        )}
                                        <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-lg">
                                                <ImageIcon className="text-emerald-500" size={24} />
                                            </div>
                                            <p className="text-[10px] font-black text-white px-4 py-2 bg-slate-900/50 rounded-full mt-4 uppercase tracking-[0.2em]">Change Banner</p>
                                        </div>
                                    </div>
                                )}
                                <input type="file" className="hidden" onChange={e => setData('image', e.target.files[0])} />
                            </label>
                        </div>
                    </div>

                    {/* Meta & Configuration Area */}
                    <div className="space-y-8">
                        {/* URL Routing */}
                        <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm space-y-6">
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">
                                    <Globe size={12} /> Permanent Link
                                </label>
                                <div className="flex items-center bg-slate-50 rounded-2xl px-4 py-3">
                                    <span className="text-[10px] font-black text-slate-300 uppercase tracking-tight shrink-0">/page/</span>
                                    <input 
                                        type="text"
                                        value={data.slug}
                                        onChange={e => setData('slug', e.target.value)}
                                        className="w-full bg-transparent border-none p-0 ml-1 text-sm font-bold focus:ring-0"
                                    />
                                </div>
                                {errors.slug && <p className="text-rose-500 text-[10px] font-bold uppercase tracking-widest ml-1">{errors.slug}</p>}
                            </div>
                        </div>

                        {/* SEO Overrides */}
                        <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm space-y-6">
                             <h3 className="text-xs font-black uppercase tracking-widest text-slate-800 ml-1 font-sans">Meta Strategy</h3>
                             
                             <div className="space-y-2">
                                <label className="text-[9px] font-black uppercase text-slate-400 tracking-widest ml-1">Browser Title</label>
                                <input 
                                    type="text"
                                    value={data.meta.title}
                                    onChange={e => setData('meta', { ...data.meta, title: e.target.value })}
                                    className="w-full bg-slate-50 border-none px-4 py-3 rounded-xl text-xs font-bold focus:ring-2 focus:ring-emerald-100 transition-all font-sans"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[9px] font-black uppercase text-slate-400 tracking-widest ml-1">Meta Description</label>
                                <textarea 
                                    value={data.meta.description}
                                    onChange={e => setData('meta', { ...data.meta, description: e.target.value })}
                                    className="w-full bg-slate-50 border-none px-4 py-3 rounded-xl text-xs font-bold focus:ring-2 focus:ring-emerald-100 transition-all min-h-[120px] font-sans"
                                ></textarea>
                            </div>
                        </div>

                        {/* Visibility & Save */}
                        <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm space-y-8">
                             <div className="flex items-center justify-between group cursor-pointer" onClick={() => setData('status', !data.status)}>
                                <div>
                                    <h4 className="text-xs font-black text-slate-800 uppercase tracking-tight">Active Visibility</h4>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Toggle site access</p>
                                </div>
                                <div className={cn("w-12 h-7 rounded-full transition-all relative shadow-inner", data.status ? "bg-emerald-500" : "bg-slate-200")}>
                                    <div className={cn("absolute top-1 left-1 bg-white w-5 h-5 rounded-full transition-all shadow-sm", data.status ? "translate-x-5" : "translate-x-0")}></div>
                                </div>
                            </div>

                            <div className="flex flex-col gap-3">
                                <button 
                                    type="submit"
                                    disabled={processing}
                                    className="w-full bg-slate-900 hover:bg-black text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-slate-100 transition-all flex items-center justify-center gap-3 active:scale-95 disabled:opacity-50 font-sans"
                                >
                                    <Save size={18} /> {processing ? 'Syncing...' : 'Update Records'}
                                </button>
                                <Link 
                                    href={route('admin.pages.index')}
                                    className="w-full bg-white text-slate-400 hover:bg-slate-50 border border-slate-100 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center font-sans"
                                >
                                    Abort Changes
                                </Link>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}

function cn(...inputs) {
    return inputs.filter(Boolean).join(' ');
}
