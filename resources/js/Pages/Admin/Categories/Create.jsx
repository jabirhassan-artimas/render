import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { ChevronLeft, Save, Image as ImageIcon, Type, FolderTree, Check } from 'lucide-react';

export default function Create({ parents }) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        parent_id: '',
        image: null,
        status: true,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.categories.store'));
    };

    return (
        <AdminLayout>
            <Head title="Create New Category" />

            <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {/* Header */}
                <div className="flex items-center gap-4">
                    <Link 
                        href={route('admin.categories.index')}
                        className="p-3 bg-white border border-slate-100 text-slate-400 hover:text-blue-600 rounded-2xl transition-all shadow-sm group"
                    >
                        <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-black text-slate-800 tracking-tight">Add Category</h1>
                        <p className="text-slate-500 text-sm font-medium">Organize your product catalog with clear hierarchies.</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-sm space-y-8">
                        {/* Name */}
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">
                                <Type size={12} /> Category Name
                            </label>
                            <input 
                                type="text"
                                value={data.name}
                                onChange={e => setData('name', e.target.value)}
                                className="w-full bg-slate-50 border-none px-6 py-4 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-blue-100 transition-all"
                                placeholder="e.g. Fashion & Apparel"
                            />
                            {errors.name && <p className="text-rose-500 text-[10px] font-bold uppercase tracking-widest ml-1">{errors.name}</p>}
                        </div>

                        {/* Parent Selection */}
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">
                                <FolderTree size={12} /> Nest Under (Optional)
                            </label>
                            <select 
                                value={data.parent_id}
                                onChange={e => setData('parent_id', e.target.value)}
                                className="w-full bg-slate-50 border-none px-6 py-4 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-blue-100 transition-all"
                            >
                                <option value="">Top Level Category</option>
                                {parents.map(parent => (
                                    <option key={parent.id} value={parent.id}>{parent.name}</option>
                                ))}
                            </select>
                        </div>

                        {/* Image Upload */}
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">
                                <ImageIcon size={12} /> Thumbnail
                            </label>
                            <div className="relative group">
                                <input 
                                    type="file"
                                    onChange={e => setData('image', e.target.files[0])}
                                    className="hidden"
                                    id="category-image"
                                />
                                <label 
                                    htmlFor="category-image"
                                    className="flex flex-col items-center justify-center w-full aspect-video md:aspect-[2/1] bg-slate-50 rounded-[2rem] border-2 border-dashed border-slate-200 hover:border-blue-400 hover:bg-blue-50/30 transition-all cursor-pointer overflow-hidden group"
                                >
                                    {data.image ? (
                                        <img src={URL.createObjectURL(data.image)} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="text-center">
                                            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm group-hover:scale-110 transition-transform">
                                                <ImageIcon className="text-slate-300 group-hover:text-blue-500 transition-colors" size={24} />
                                            </div>
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Upload square thumbnail</p>
                                        </div>
                                    )}
                                </label>
                            </div>
                            {errors.image && <p className="text-rose-500 text-[10px] font-bold uppercase tracking-widest ml-1">{errors.image}</p>}
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
                                    <p className="text-xs font-black text-slate-800 uppercase tracking-tight">Published</p>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Make this category visible on public site</p>
                                </div>
                            </label>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end gap-3 pb-10">
                        <Link 
                            href={route('admin.categories.index')}
                            className="bg-white text-slate-500 px-10 py-5 rounded-[2rem] font-black text-xs uppercase tracking-widest border border-slate-100 hover:bg-slate-50 transition-all"
                        >
                            Cancel
                        </Link>
                        <button 
                            type="submit"
                            disabled={processing}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-5 rounded-[2rem] font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-100 transition-all flex items-center gap-3 active:scale-95 disabled:opacity-50"
                        >
                            <Save size={18} /> {processing ? 'Wait...' : 'Create Category'}
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
