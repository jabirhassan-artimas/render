import React, { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import { 
    Plus, 
    Search, 
    Edit, 
    Trash2, 
    Image as ImageIcon,
    CheckCircle2,
    XCircle,
    ChevronLeft,
    ChevronRight,
    ArrowUpDown,
    Filter,
    ExternalLink
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export default function Index({ banners, filters }) {
    const [search, setSearch] = useState(filters.search || '');

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route('admin.banners.index'), { search }, { preserveState: true });
    };

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this banner?')) {
            router.delete(route('admin.banners.destroy', id));
        }
    };

    return (
        <AdminLayout>
            <Head title="Banner Management" />

            <div className="space-y-8 animate-in fade-in duration-500">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <h1 className="text-3xl font-black text-slate-800 tracking-tight mb-2">Marketing Banners</h1>
                        <p className="text-slate-500 font-medium">Capture attention with high-impact sliders and promotions.</p>
                    </div>
                    <Link 
                        href={route('admin.banners.create')}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-200 transition-all flex items-center gap-3 active:scale-95 shrink-0"
                    >
                        <Plus size={18} /> Add Banner
                    </Link>
                </div>

                {/* Filters */}
                <div className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm">
                    <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4 w-full">
                        <div className="flex-1 relative">
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                            <input 
                                type="text" 
                                placeholder="Search banners by title..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full bg-slate-50 border-none pl-14 pr-6 py-4 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-blue-100 transition-all"
                            />
                        </div>
                        <button type="submit" className="bg-slate-900 text-white px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-800 transition-all shadow-lg active:scale-95">
                            Search
                        </button>
                    </form>
                </div>

                {/* Table Section */}
                <div className="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50/50">
                                    <th className="px-10 py-6 text-[10px] font-black uppercase text-slate-400 tracking-widest">Preview</th>
                                    <th className="px-10 py-6 text-[10px] font-black uppercase text-slate-400 tracking-widest">Content</th>
                                    <th className="px-10 py-6 text-[10px] font-black uppercase text-slate-400 tracking-widest">Placement</th>
                                    <th className="px-10 py-6 text-[10px] font-black uppercase text-slate-400 tracking-widest text-center">Sort Order</th>
                                    <th className="px-10 py-6 text-[10px] font-black uppercase text-slate-400 tracking-widest text-center">Status</th>
                                    <th className="px-10 py-6 text-[10px] font-black uppercase text-slate-400 tracking-widest text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {banners.data.map((banner) => (
                                    <tr key={banner.id} className="group hover:bg-slate-50/50 transition-colors">
                                        <td className="px-10 py-6">
                                            <div className="w-32 aspect-video bg-slate-100 rounded-xl overflow-hidden border border-slate-100">
                                                <img src={`/storage/${banner.image}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Banner" />
                                            </div>
                                        </td>
                                        <td className="px-10 py-6">
                                            <div>
                                                <p className="font-black text-slate-800 text-sm group-hover:text-blue-600 transition-colors">{banner.title}</p>
                                                {banner.link && (
                                                    <a href={banner.link} target="_blank" rel="noopener noreferrer" className="text-[10px] font-bold text-slate-400 flex items-center gap-1 hover:text-blue-500 mt-1">
                                                        <ExternalLink size={10} /> {banner.link}
                                                    </a>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-10 py-6">
                                            <span className="px-3 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-widest rounded-lg">
                                                {banner.type.replace('_', ' ')}
                                            </span>
                                        </td>
                                        <td className="px-10 py-6 text-center font-black text-slate-800">
                                            {banner.sort_order}
                                        </td>
                                        <td className="px-10 py-6">
                                            <div className="flex justify-center">
                                                {banner.status ? (
                                                    <div className="flex items-center gap-2 text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-xl">
                                                        <CheckCircle2 size={14} />
                                                        <span className="text-[10px] font-black uppercase tracking-widest">Active</span>
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center gap-2 text-slate-400 bg-slate-50 px-3 py-1.5 rounded-xl">
                                                        <XCircle size={14} />
                                                        <span className="text-[10px] font-black uppercase tracking-widest">Hidden</span>
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-10 py-6 text-right">
                                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Link 
                                                    href={route('admin.banners.edit', banner.id)}
                                                    className="p-3 bg-white border border-slate-100 text-slate-400 hover:text-blue-600 hover:border-blue-100 rounded-xl transition-all shadow-sm"
                                                >
                                                    <Edit size={16} />
                                                </Link>
                                                <button 
                                                    onClick={() => handleDelete(banner.id)}
                                                    className="p-3 bg-white border border-slate-100 text-slate-400 hover:text-rose-500 hover:border-rose-100 rounded-xl transition-all shadow-sm"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="px-10 py-8 bg-slate-50/50 flex flex-col md:flex-row items-center justify-between gap-6 border-t border-slate-100">
                        <p className="text-xs font-bold text-slate-400">
                            Showing <span className="text-slate-800">{banners.from}</span> to <span className="text-slate-800">{banners.to}</span> of <span className="text-slate-800">{banners.total}</span> banners
                        </p>
                        
                        <div className="flex gap-2">
                             {banners.links.map((link, i) => (
                                <button
                                    key={i}
                                    disabled={!link.url}
                                    onClick={() => link.url && router.get(link.url, { search }, { preserveState: true })}
                                    className={cn(
                                        "w-10 h-10 rounded-xl flex items-center justify-center text-xs font-black transition-all",
                                        link.active 
                                            ? "bg-blue-600 text-white shadow-lg shadow-blue-100" 
                                            : "bg-white text-slate-400 border border-slate-100 hover:border-slate-300",
                                        !link.url && "opacity-20 cursor-not-allowed"
                                    )}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
