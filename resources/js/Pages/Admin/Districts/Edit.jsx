import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import {
    ChevronLeft,
    Save,
    Image as ImageIcon,
    MapPin,
    Hash,
    ToggleLeft,
    Sparkles,
    Trash
} from 'lucide-react';

function cn(...inputs) {
    return inputs.filter(Boolean).join(' ');
}

export default function Edit({ district }) {
    const { data, setData, post, processing, errors } = useForm({
        _method: 'PUT',
        name: district.name || '',
        division: district.division || '',
        image: null,
        status: district.status === 1,
        sort_order: district.sort_order || 0,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.districts.update', district.id), {
            forceFormData: true,
        });
    };

    return (
        <AdminLayout>
            <Head title={`Edit District: ${district.name}`} />

            <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link
                            href={route('admin.districts.index')}
                            className="p-3 bg-white border border-slate-100 text-slate-400 hover:text-emerald-600 rounded-xl transition-all shadow-sm"
                        >
                            <ChevronLeft size={20} />
                        </Link>
                        <div>
                            <h1 className="text-3xl font-black text-slate-800 tracking-tight">Edit District</h1>
                            <p className="text-slate-500 font-medium">Update the details for "{district.name}".</p>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-sm space-y-10">
                        <div className="flex items-center gap-4 text-slate-800">
                            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl">
                                <Sparkles size={24} />
                            </div>
                            <h2 className="text-xl font-black tracking-tight">District Details</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Name */}
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">
                                    <MapPin size={12} /> District Name
                                </label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={e => setData('name', e.target.value)}
                                    className="w-full bg-slate-50 border-none px-6 py-4 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-emerald-100 transition-all font-sans"
                                    placeholder="e.g. Rajshahi"
                                />
                                {errors.name && <p className="text-rose-500 text-xs font-bold mt-1 ml-1">{errors.name}</p>}
                            </div>

                            {/* Division */}
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">
                                    <Hash size={12} /> Division
                                </label>
                                <input
                                    type="text"
                                    value={data.division}
                                    onChange={e => setData('division', e.target.value)}
                                    className="w-full bg-slate-50 border-none px-6 py-4 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-emerald-100 transition-all font-sans"
                                    placeholder="e.g. Rajshahi Division"
                                />
                                {errors.division && <p className="text-rose-500 text-xs font-bold mt-1 ml-1">{errors.division}</p>}
                            </div>

                            {/* Image */}
                            <div className="space-y-2 md:col-span-2">
                                <label className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">
                                    <ImageIcon size={12} /> Cover Image
                                </label>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {district.image && (
                                        <div className="md:col-span-1 rounded-[2rem] overflow-hidden border border-slate-100 bg-slate-50 h-[240px] flex items-center justify-center relative group">
                                            <img
                                                src={`/uploads/${district.image}`}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                                alt={district.name}
                                            />
                                            <div className="absolute inset-x-4 bottom-4">
                                                <div className="bg-white/80 backdrop-blur-md text-emerald-600 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest text-center">
                                                    Current Image
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    <div className={cn("relative group", district.image ? "md:col-span-2" : "md:col-span-3")}>
                                        <input
                                            type="file"
                                            onChange={e => setData('image', e.target.files[0])}
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                        />
                                        <div className="h-full w-full bg-slate-50 border-2 border-dashed border-slate-100 group-hover:border-emerald-200 group-hover:bg-emerald-50/30 rounded-[2rem] p-12 transition-all flex flex-col items-center justify-center gap-4 text-center">
                                            <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center text-slate-300 group-hover:text-emerald-500 transition-colors">
                                                <ImageIcon size={32} />
                                            </div>
                                            <div>
                                                <p className="font-black text-slate-600 text-sm">Replace original image</p>
                                                <p className="text-slate-400 text-xs font-medium mt-1">SVG, PNG, JPG or GIF (MAX. 2MB)</p>
                                            </div>
                                            {data.image && (
                                                <p className="text-emerald-600 font-black text-xs uppercase tracking-widest mt-2 bg-white px-4 py-2 rounded-full shadow-sm">
                                                    New: {data.image.name}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                {errors.image && <p className="text-rose-500 text-xs font-bold mt-1 ml-1">{errors.image}</p>}
                            </div>

                            {/* Sort Order */}
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">
                                    <Hash size={12} /> Sort Order
                                </label>
                                <input
                                    type="number"
                                    value={data.sort_order}
                                    onChange={e => setData('sort_order', e.target.value)}
                                    className="w-full bg-slate-50 border-none px-6 py-4 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-emerald-100 transition-all font-sans"
                                />
                            </div>

                            {/* Status */}
                            <div className="space-y-2 flex flex-col justify-end pb-2">
                                <label className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1 mb-2">
                                    <ToggleLeft size={12} /> Public Visibility
                                </label>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={data.status}
                                        onChange={e => setData('status', e.target.checked)}
                                        className="sr-only peer"
                                    />
                                    <div className="w-14 h-8 bg-slate-100 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-emerald-500"></div>
                                    <span className="ml-3 text-sm font-black text-slate-700 uppercase tracking-widest">{data.status ? 'Visible' : 'Hidden'}</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-4">
                        <Link
                            href={route('admin.districts.index')}
                            className="px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest text-slate-500 hover:text-slate-700 hover:bg-slate-50 transition-all"
                        >
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white px-12 py-5 rounded-[2rem] font-black text-xs uppercase tracking-widest shadow-xl shadow-emerald-200 transition-all active:scale-95 flex items-center gap-3 disabled:opacity-50"
                        >
                            <Save size={18} />
                            {processing ? 'Saving...' : 'Update District'}
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
