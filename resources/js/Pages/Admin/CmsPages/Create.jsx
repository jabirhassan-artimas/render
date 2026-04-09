import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { ChevronLeft, Save, FileText, Type, Globe, Check, Image as ImageIcon } from 'lucide-react';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        slug: '',
        content: '',
        image: null,
        meta: {
            title: '',
            description: '',
            keywords: ''
        },
        status: true,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.pages.store'));
    };

    return (
        <AdminLayout>
            <Head title="Compose Dynamic Page" />

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
                        <h1 className="text-2xl font-black text-slate-800 tracking-tight uppercase px-1">Create Web Page</h1>
                        <p className="text-slate-500 text-sm font-medium px-1">Publish a new informational page on your website.</p>
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
                                    placeholder="e.g. Terms & Conditions"
                                />
                                {errors.title && <p className="text-rose-500 text-[10px] font-bold uppercase tracking-widest ml-1">{errors.title}</p>}
                            </div>

                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">
                                    <FileText size={12} /> Content Corpus
                                </label>
                                <textarea 
                                    value={data.content}
                                    onChange={e => setData('content', e.target.value)}
                                    className="w-full bg-slate-50 border-none px-6 py-4 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-emerald-100 transition-all min-h-[400px] font-sans"
                                    placeholder="Start writing your page content..."
                                ></textarea>
                                {errors.content && <p className="text-rose-500 text-[10px] font-bold uppercase tracking-widest ml-1">{errors.content}</p>}
                            </div>
                        </div>

                        {/* Banner Image */}
                        <div className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-sm space-y-4">
                            <label className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">
                                <ImageIcon size={12} /> Header Banner (Optional)
                            </label>
                            <label className="flex flex-col items-center justify-center w-full aspect-[21/9] bg-slate-50 rounded-[2.5rem] border-2 border-dashed border-slate-200 hover:border-emerald-400 hover:bg-emerald-50/30 transition-all cursor-pointer overflow-hidden group">
                                {data.image ? (
                                    <img src={URL.createObjectURL(data.image)} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="text-center">
                                        <ImageIcon className="mx-auto text-slate-300 mb-2" size={32} />
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-tight">Attach Banner Media</p>
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
                                    <Globe size={12} /> Custom Slug
                                </label>
                                <div className="flex items-center bg-slate-50 rounded-2xl px-4 py-3">
                                    <span className="text-[10px] font-black text-slate-300 uppercase tracking-tight shrink-0">/page/</span>
                                    <input 
                                        type="text"
                                        value={data.slug}
                                        onChange={e => setData('slug', e.target.value)}
                                        className="w-full bg-transparent border-none p-0 ml-1 text-sm font-bold focus:ring-0"
                                        placeholder="url-friendly-title"
                                    />
                                </div>
                                {errors.slug && <p className="text-rose-500 text-[10px] font-bold uppercase tracking-widest ml-1">{errors.slug}</p>}
                            </div>
                        </div>

                        {/* SEO Overrides */}
                        <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm space-y-6">
                             <h3 className="text-xs font-black uppercase tracking-widest text-slate-800 ml-1">SEO Blueprint</h3>
                             
                             <div className="space-y-2">
                                <label className="text-[9px] font-black uppercase text-slate-400 tracking-widest ml-1">Search Title</label>
                                <input 
                                    type="text"
                                    value={data.meta.title}
                                    onChange={e => setData('meta', { ...data.meta, title: e.target.value })}
                                    className="w-full bg-slate-50 border-none px-4 py-3 rounded-xl text-xs font-bold focus:ring-2 focus:ring-emerald-100 transition-all font-sans"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[9px] font-black uppercase text-slate-400 tracking-widest ml-1">Meta Descriptor</label>
                                <textarea 
                                    value={data.meta.description}
                                    onChange={e => setData('meta', { ...data.meta, description: e.target.value })}
                                    className="w-full bg-slate-50 border-none px-4 py-3 rounded-xl text-xs font-bold focus:ring-2 focus:ring-emerald-100 transition-all min-h-[100px] font-sans"
                                ></textarea>
                            </div>
                        </div>

                        {/* Visibility & Save */}
                        <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm space-y-8">
                             <div className="flex items-center justify-between group cursor-pointer" onClick={() => setData('status', !data.status)}>
                                <div>
                                    <h4 className="text-xs font-black text-slate-800 uppercase tracking-tight">Active Status</h4>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Publically reachable</p>
                                </div>
                                <div className={cn("w-12 h-7 rounded-full transition-all relative shadow-inner", data.status ? "bg-emerald-500" : "bg-slate-200")}>
                                    <div className={cn("absolute top-1 left-1 bg-white w-5 h-5 rounded-full transition-all shadow-sm", data.status ? "translate-x-5" : "translate-x-0")}></div>
                                </div>
                            </div>

                            <button 
                                type="submit"
                                disabled={processing}
                                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-emerald-100 transition-all flex items-center justify-center gap-3 active:scale-95 disabled:opacity-50"
                            >
                                <Save size={18} /> {processing ? '...' : 'Deploy Page'}
                            </button>
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
