import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { ChevronLeft, Save, Image as ImageIcon, Type, FolderTree, Check } from 'lucide-react';

export default function Edit({ category, parents }) {
    const { data, setData, post, processing, errors } = useForm({
        _method: 'PUT',
        name: category.name || '',
        parent_id: category.parent_id || '',
        image: null,
        status: !!category.status,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.categories.update', category.id));
    };

    return (
        <AdminLayout>
            <Head title={`Edit Category: ${category.name}`} />

            <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {/* Header */}
                <div className="flex items-center gap-4">
                    <Link 
                        href={route('admin.categories.index')}
                        className="p-3 bg-white border border-slate-100 text-slate-400 hover:text-emerald-600 rounded-2xl transition-all shadow-sm group"
                    >
                        <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-black text-slate-800 tracking-tight">Edit Category</h1>
                        <p className="text-slate-500 text-sm font-medium">Update branding or structural mapping.</p>
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
                                className="w-full bg-slate-50 border-none px-6 py-4 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-emerald-100 transition-all"
                            />
                            {errors.name && <p className="text-rose-500 text-[10px] font-bold uppercase tracking-widest ml-1">{errors.name}</p>}
                        </div>

                        {/* Parent Selection */}
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">
                                <FolderTree size={12} /> Parent Level
                            </label>
                            <select 
                                value={data.parent_id || ''}
                                onChange={e => setData('parent_id', e.target.value)}
                                className="w-full bg-slate-50 border-none px-6 py-4 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-emerald-100 transition-all"
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
                                    id="category-image-edit"
                                />
                                <label 
                                    htmlFor="category-image-edit"
                                    className="flex flex-col items-center justify-center w-full aspect-video md:aspect-[2/1] bg-slate-50 rounded-[2rem] border-2 border-dashed border-slate-200 hover:border-emerald-400 hover:bg-emerald-50/30 transition-all cursor-pointer overflow-hidden group"
                                >
                                    {data.image ? (
                                        <img src={URL.createObjectURL(data.image)} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="relative w-full h-full">
                                            {category.image ? (
                                                <img src={`/uploads/${category.image}`} className="w-full h-full object-cover opacity-60" />
                                            ) : (
                                                <div className="absolute inset-0 flex items-center justify-center text-slate-200"><ImageIcon size={48} /></div>
                                            )}
                                            <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/10 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-lg">
                                                    <ImageIcon className="text-emerald-500" size={20} />
                                                </div>
                                                <p className="text-[10px] font-black text-white mt-3 uppercase tracking-widest drop-shadow-md">Choose new image</p>
                                            </div>
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
                                    <p className="text-xs font-black text-slate-800 uppercase tracking-tight">Active Visibility</p>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Show this category on the web store</p>
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
                            Back
                        </Link>
                        <button 
                            type="submit"
                            disabled={processing}
                            className="bg-slate-900 hover:bg-black text-white px-12 py-5 rounded-[2rem] font-black text-xs uppercase tracking-widest shadow-xl shadow-slate-100 transition-all flex items-center gap-3 active:scale-95 disabled:opacity-50"
                        >
                            <Save size={18} /> {processing ? 'Saving...' : 'Update Category'}
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
