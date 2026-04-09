import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { ChevronLeft, Save, MessageSquare, User, Type, Image as ImageIcon, Check } from 'lucide-react';

export default function Edit({ testimonial }) {
    const { data, setData, post, processing, errors } = useForm({
        _method: 'PUT',
        name: testimonial.name || '',
        designation: testimonial.designation || '',
        content: testimonial.content || '',
        image: null,
        status: !!testimonial.status,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.testimonials.update', testimonial.id));
    };

    return (
        <AdminLayout>
            <Head title={`Edit Testimonial: ${testimonial.name}`} />

            <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {/* Header */}
                <div className="flex items-center gap-4">
                    <Link 
                        href={route('admin.testimonials.index')}
                        className="p-3 bg-white border border-slate-100 text-slate-400 hover:text-emerald-600 rounded-2xl transition-all shadow-sm group"
                    >
                        <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-black text-slate-800 tracking-tight uppercase">Update Voice</h1>
                        <p className="text-slate-500 text-sm font-medium px-1">Refine client statements or profile visualization.</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-sm space-y-8">
                        {/* Client Identity */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">
                                    <User size={12} /> Client Identity
                                </label>
                                <input 
                                    type="text"
                                    value={data.name}
                                    onChange={e => setData('name', e.target.value)}
                                    className="w-full bg-slate-50 border-none px-6 py-4 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-emerald-100 transition-all font-sans"
                                />
                                {errors.name && <p className="text-rose-500 text-[10px] font-bold uppercase tracking-widest ml-1">{errors.name}</p>}
                            </div>

                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">
                                    <Type size={12} /> Designation
                                </label>
                                <input 
                                    type="text"
                                    value={data.designation}
                                    onChange={e => setData('designation', e.target.value)}
                                    className="w-full bg-slate-50 border-none px-6 py-4 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-emerald-100 transition-all font-sans"
                                />
                            </div>
                        </div>

                        {/* Review Content */}
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">
                                <MessageSquare size={12} /> Narrative Body
                            </label>
                            <textarea 
                                value={data.content}
                                onChange={e => setData('content', e.target.value)}
                                className="w-full bg-slate-50 border-none px-6 py-4 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-emerald-100 transition-all min-h-[150px] font-sans"
                            ></textarea>
                            {errors.content && <p className="text-rose-500 text-[10px] font-bold uppercase tracking-widest ml-1">{errors.content}</p>}
                        </div>

                        {/* Avatar Upload */}
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">
                                <ImageIcon size={12} /> Client Portrait
                            </label>
                            <div className="flex items-center gap-6">
                                <label className="flex flex-col items-center justify-center w-24 h-24 bg-slate-50 rounded-[2rem] border-2 border-dashed border-slate-200 hover:border-emerald-400 hover:bg-emerald-50/30 transition-all cursor-pointer overflow-hidden group shrink-0">
                                    {data.image ? (
                                        <img src={URL.createObjectURL(data.image)} className="w-full h-full object-cover" />
                                    ) : (
                                        testimonial.image ? (
                                            <img src={`/uploads/${testimonial.image}`} className="w-full h-full object-cover opacity-60" />
                                        ) : (
                                            <ImageIcon className="text-slate-200" size={32} />
                                        )
                                    )}
                                    <input type="file" className="hidden" onChange={e => setData('image', e.target.files[0])} />
                                </label>
                                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest space-y-1">
                                    <p>Select to update avatar</p>
                                    <p>Portrait orientation preferred</p>
                                </div>
                            </div>
                        </div>

                        {/* Status Toggle */}
                        <div className="pt-6 border-t border-slate-50">
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
                                    <p className="text-xs font-black text-slate-800 uppercase tracking-tight">Active Engagement</p>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Publically display this testimonial</p>
                                </div>
                            </label>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end gap-3 pb-10">
                        <Link 
                            href={route('admin.testimonials.index')}
                            className="bg-white text-slate-500 px-10 py-5 rounded-[2rem] font-black text-xs uppercase tracking-widest border border-slate-100 hover:bg-slate-50 transition-all font-sans"
                        >
                            Back
                        </Link>
                        <button 
                            type="submit"
                            disabled={processing}
                            className="bg-slate-900 hover:bg-black text-white px-12 py-5 rounded-[2rem] font-black text-xs uppercase tracking-widest shadow-xl shadow-slate-100 transition-all flex items-center gap-3 active:scale-95 disabled:opacity-50 font-sans"
                        >
                            <Save size={18} /> {processing ? 'Syncing...' : 'Update Voice'}
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}

function cn(...inputs) {
    return inputs.filter(Boolean).join(' ');
}
