import React, { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import {
    ChevronLeft,
    Save,
    Image as ImageIcon,
    Loader2,
    Tag,
    Link as LinkIcon,
    Hash,
    Sparkles,
    Search,
    Check,
    ArrowUpRight
} from 'lucide-react';

export default function Edit({ item, existingImages }) {
    const { data, setData, post, processing, errors } = useForm({
        _method: 'PUT',
        title: item.title || '',
        price: item.price || '',
        image_file: null,
        image_path: item.image || '',
        link: item.link || '',
        sort_order: item.sort_order || 0,
        status: item.status || false,
    });

    const [searchTerm, setSearchTerm] = useState('');
    const [showLibrary, setShowLibrary] = useState(false);

    const filteredImages = existingImages.filter(img =>
        img.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.campaign-items.update', item.id), {
            forceFormData: true,
        });
    };

    return (
        <AdminLayout>
            <Head title="Edit Campaign Item" />

            <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
                <div className="flex items-center justify-between">
                    <Link
                        href={route('admin.campaign-items.index')}
                        className="flex items-center gap-2 text-slate-500 hover:text-emerald-600 font-bold transition-colors group"
                    >
                        <div className="p-2 bg-white rounded-xl shadow-sm border border-slate-100 group-hover:bg-emerald-50 transition-colors">
                            <ChevronLeft size={18} />
                        </div>
                        Back to Items
                    </Link>
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl">
                            <Sparkles size={24} />
                        </div>
                        <h1 className="text-2xl font-black text-slate-800 tracking-tight pt-1 leading-none italic">Modify Campaign Visual</h1>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Panel: Primary Info */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-sm space-y-8">
                            <div className="flex items-center justify-between ml-2">
                                <label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Product Details</label>
                                {item.id && <span className="text-[10px] font-black uppercase text-slate-300">ID: {item.id}</span>}
                            </div>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <input
                                        type="text"
                                        placeholder="Item Title (e.g. নকশী কাঁথা)"
                                        value={data.title}
                                        onChange={e => setData('title', e.target.value)}
                                        className="w-full bg-slate-50 border-none px-8 py-5 rounded-2xl text-lg font-black focus:ring-2 focus:ring-emerald-100 transition-all font-sans"
                                    />
                                    {errors.title && <p className="text-rose-500 text-[10px] font-black uppercase tracking-widest mt-1 ml-2">{errors.title}</p>}
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="relative">
                                        <Tag className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                                        <input
                                            type="text"
                                            placeholder="Price / Special Subtitle (e.g. ৳২,৫০০)"
                                            value={data.price}
                                            onChange={e => setData('price', e.target.value)}
                                            className="w-full bg-slate-50 border-none pl-14 pr-6 py-4 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-emerald-100 transition-all font-sans"
                                        />
                                    </div>
                                    <div className="relative">
                                        <LinkIcon className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                                        <input
                                            type="text"
                                            placeholder="Target Link / URL"
                                            value={data.link}
                                            onChange={e => setData('link', e.target.value)}
                                            className="w-full bg-slate-50 border-none pl-14 pr-6 py-4 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-emerald-100 transition-all font-sans"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Image Management */}
                        <div className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-sm space-y-8">
                            <div className="flex items-center justify-between">
                                <label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] ml-2">Visual Content</label>
                                <button
                                    type="button"
                                    onClick={() => setShowLibrary(!showLibrary)}
                                    className="text-[10px] font-black uppercase text-emerald-600 tracking-widest bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-100 transition-all hover:bg-emerald-100"
                                >
                                    {showLibrary ? 'Hide Library' : 'Choose from server'}
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                <div className="space-y-4">
                                    <div className="aspect-[3/4] rounded-[2.5rem] bg-slate-50 border-2 border-dashed border-slate-100 overflow-hidden relative flex flex-col items-center justify-center p-4 group transition-all hover:border-emerald-200">
                                        {data.image_file ? (
                                            <img src={URL.createObjectURL(data.image_file)} className="absolute inset-0 w-full h-full object-cover" />
                                        ) : data.image_path ? (
                                            <img src={`/uploads/${data.image_path}`} className="absolute inset-0 w-full h-full object-cover" />
                                        ) : (
                                            <>
                                                <ImageIcon size={48} className="text-slate-200" />
                                                <p className="text-[10px] font-black uppercase text-slate-300 tracking-widest mt-4">No Visual Active</p>
                                            </>
                                        )}
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all flex flex-col items-center justify-center text-white gap-2 scale-110 group-hover:scale-100 pointer-events-none">
                                            <ImageIcon size={32} />
                                            <p className="text-[10px] font-black uppercase tracking-widest">Swap Visual</p>
                                        </div>
                                        <input
                                            type="file"
                                            onChange={e => {
                                                setData('image_file', e.target.files[0]);
                                                setData('image_path', '');
                                            }}
                                            className="absolute inset-0 opacity-0 cursor-pointer"
                                        />
                                    </div>
                                    <p className="text-[10px] text-center font-bold text-slate-400 uppercase tracking-widest">Current Active Visual Thumbnail</p>
                                </div>

                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Active Media Source</label>
                                        <div className="relative">
                                            <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                                            <input
                                                type="text"
                                                readOnly
                                                value={data.image_path || (data.image_file ? 'New Media Upload' : '')}
                                                placeholder="Pick or upload image..."
                                                className="w-full bg-slate-50 border-none pl-12 pr-4 py-3 rounded-xl text-xs font-bold text-slate-500 italic"
                                            />
                                        </div>
                                    </div>

                                    {showLibrary && (
                                        <div className="space-y-4 border-t border-slate-50 pt-6 max-h-[350px] overflow-y-auto no-scrollbar scroll-smooth">
                                            <div className="sticky top-0 z-10 bg-white pb-3">
                                                <div className="relative">
                                                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" />
                                                    <input
                                                        type="text"
                                                        placeholder="Explore server media..."
                                                        value={searchTerm}
                                                        onChange={e => setSearchTerm(e.target.value)}
                                                        className="w-full bg-slate-50 border-none pl-9 pr-4 py-3 rounded-xl text-xs font-bold"
                                                    />
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-3 gap-3">
                                                {filteredImages.map((img) => (
                                                    <button
                                                        key={img}
                                                        type="button"
                                                        onClick={() => {
                                                            setData('image_path', img);
                                                            setData('image_file', null);
                                                        }}
                                                        className={cn(
                                                            "aspect-square rounded-xl overflow-hidden border-2 transition-all relative group shadow-sm",
                                                            data.image_path === img ? "border-emerald-500" : "border-transparent opacity-60 hover:opacity-100"
                                                        )}
                                                    >
                                                        <img src={`/uploads/${img}`} className="w-full h-full object-cover" />
                                                        {data.image_path === img && (
                                                            <div className="absolute inset-0 bg-emerald-500/20 flex items-center justify-center">
                                                                <Check size={24} className="text-white drop-shadow-md" />
                                                            </div>
                                                        )}
                                                    </button>
                                                ))}
                                                {filteredImages.length === 0 && (
                                                    <p className="col-span-3 py-20 text-center text-[10px] font-black uppercase text-slate-200">No media assets found</p>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Panel: Controls */}
                    <div className="space-y-8">
                        <div className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-sm space-y-8 sticky top-24">
                            <div className="space-y-6">
                                <label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] ml-2">Display settings</label>

                                <div className="space-y-2">
                                    <div className="flex items-center gap-3 relative">
                                        <Hash className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                                        <input
                                            type="number"
                                            placeholder="Display Priority"
                                            value={data.sort_order}
                                            onChange={e => setData('sort_order', e.target.value)}
                                            className="w-full bg-slate-50 border-none pl-12 pr-4 py-4 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-emerald-100 transition-all font-sans"
                                        />
                                    </div>
                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest ml-4 italic">Hierarchy for visual listing</p>
                                </div>

                                <div className="flex items-center justify-between p-6 bg-slate-50 rounded-[2rem] border border-slate-100 group transition-all hover:bg-emerald-50 hover:border-emerald-100">
                                    <div className="space-y-1">
                                        <p className="text-sm font-black text-slate-700">Live Status</p>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Visibility on platform</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={data.status}
                                            onChange={e => setData('status', e.target.checked)}
                                            className="sr-only peer"
                                        />
                                        <div className="w-14 h-7 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                                    </label>
                                </div>
                            </div>

                            <div className="space-y-3 pt-6 border-t border-slate-50">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-5 rounded-[2rem] font-black text-sm uppercase tracking-[0.2em] shadow-2xl shadow-emerald-600/20 transition-all flex items-center justify-center gap-4 active:scale-95 disabled:opacity-50"
                                >
                                    {processing ? (
                                        <Loader2 className="animate-spin" size={20} />
                                    ) : (
                                        <><Save size={20} /> Update Visual</>
                                    )}
                                </button>
                                {item.link && (
                                    <a
                                        href={item.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full bg-slate-50 hover:bg-slate-100 text-slate-500 px-8 py-4 rounded-[1.5rem] font-black text-[10px] uppercase tracking-widest transition-all flex items-center justify-center gap-3 border border-slate-100"
                                    >
                                        <ArrowUpRight size={14} /> Preview Deep Link
                                    </a>
                                )}
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
