import React, { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import { 
    Plus, 
    Search, 
    Edit, 
    Trash2, 
    ConciergeBell,
    CheckCircle2,
    XCircle,
    ChevronLeft,
    ChevronRight,
    ArrowUpDown,
    Filter,
    Activity
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export default function Index({ services, filters }) {
    const [search, setSearch] = useState(filters.search || '');

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route('admin.services.index'), { search }, { preserveState: true });
    };

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this service?')) {
            router.delete(route('admin.services.destroy', id));
        }
    };

    return (
        <AdminLayout>
            <Head title="Service Management" />

            <div className="space-y-8 animate-in fade-in duration-500">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <h1 className="text-3xl font-black text-slate-800 tracking-tight mb-2">Platform Services</h1>
                        <p className="text-slate-500 font-medium">Highlight your unique value propositions and expert offerings.</p>
                    </div>
                    <Link 
                        href={route('admin.services.create')}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-200 transition-all flex items-center gap-3 active:scale-95 shrink-0"
                    >
                        <Plus size={18} /> Add Service
                    </Link>
                </div>

                {/* Filters */}
                <div className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm">
                    <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4 w-full">
                        <div className="flex-1 relative">
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                            <input 
                                type="text" 
                                placeholder="Search by service title..."
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
                                    <th className="px-10 py-6 text-[10px] font-black uppercase text-slate-400 tracking-widest w-24">Icon</th>
                                    <th className="px-10 py-6 text-[10px] font-black uppercase text-slate-400 tracking-widest">Service Details</th>
                                    <th className="px-10 py-6 text-[10px] font-black uppercase text-slate-400 tracking-widest text-center">Priority</th>
                                    <th className="px-10 py-6 text-[10px] font-black uppercase text-slate-400 tracking-widest text-center">Status</th>
                                    <th className="px-10 py-6 text-[10px] font-black uppercase text-slate-400 tracking-widest text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {services.data.map((service) => (
                                    <tr key={service.id} className="group hover:bg-slate-50/50 transition-colors">
                                        <td className="px-10 py-6">
                                            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center border border-blue-100 group-hover:scale-110 transition-transform">
                                                <i className={cn(service.icon, "text-xl")}></i>
                                            </div>
                                        </td>
                                        <td className="px-10 py-6">
                                            <div>
                                                <p className="font-black text-slate-800 text-sm group-hover:text-blue-600 transition-colors uppercase tracking-tight">{service.title}</p>
                                                <p className="text-[10px] font-bold text-slate-400 mt-1 line-clamp-1">{service.description || 'No description provided.'}</p>
                                            </div>
                                        </td>
                                        <td className="px-10 py-6 text-center">
                                            <div className="flex justify-center">
                                                <div className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-xs font-black text-slate-500">
                                                    {service.sort_order}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-10 py-6">
                                            <div className="flex justify-center">
                                                {service.status ? (
                                                    <div className="flex items-center gap-2 text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-xl">
                                                        <CheckCircle2 size={14} />
                                                        <span className="text-[10px] font-black uppercase tracking-widest">Live</span>
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
                                                    href={route('admin.services.edit', service.id)}
                                                    className="p-3 bg-white border border-slate-100 text-slate-400 hover:text-blue-600 hover:border-blue-100 rounded-xl transition-all shadow-sm"
                                                >
                                                    <Edit size={16} />
                                                </Link>
                                                <button 
                                                    onClick={() => handleDelete(service.id)}
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
                    {services.links.length > 3 && (
                        <div className="px-10 py-8 bg-slate-50/50 border-t border-slate-100 flex justify-center gap-2">
                             {services.links.map((link, i) => (
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
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}
