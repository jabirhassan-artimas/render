import React, { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import { 
    Plus, 
    Search, 
    Edit, 
    Trash2, 
    FileText,
    CheckCircle2,
    XCircle,
    ChevronLeft,
    ChevronRight,
    ArrowUpDown,
    Filter,
    Globe,
    Eye,
    Settings
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export default function Index({ pages, filters }) {
    const [search, setSearch] = useState(filters.search || '');

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route('admin.pages.index'), { search }, { preserveState: true });
    };

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this page? This will break any links pointing to it.')) {
            router.delete(route('admin.pages.destroy', id));
        }
    };

    return (
        <AdminLayout>
            <Head title="CMS Content Management" />

            <div className="space-y-8 animate-in fade-in duration-500">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <h1 className="text-3xl font-black text-slate-800 tracking-tight mb-2">Content Management</h1>
                        <p className="text-slate-500 font-medium">Craft and publish informational pages, terms, and site policies.</p>
                    </div>
                    <Link 
                        href={route('admin.pages.create')}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-emerald-200 transition-all flex items-center gap-3 active:scale-95 shrink-0"
                    >
                        <Plus size={18} /> New Page
                    </Link>
                </div>

                {/* Filters */}
                <div className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col md:flex-row gap-4 items-center">
                    <form onSubmit={handleSearch} className="flex-1 flex flex-col md:flex-row gap-4 w-full">
                        <div className="flex-1 relative">
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                            <input 
                                type="text" 
                                placeholder="Search by page title..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full bg-slate-50 border-none pl-14 pr-6 py-4 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-emerald-100 transition-all"
                            />
                        </div>
                        <button type="submit" className="bg-slate-900 text-white px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-800 transition-all shadow-lg active:scale-95">
                            Filter
                        </button>
                    </form>
                </div>

                {/* Grid Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {pages.data.map((page) => (
                        <div key={page.id} className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-emerald-50 transition-all duration-500 group flex flex-col">
                            <div className="flex items-start justify-between mb-6">
                                <div className="p-4 bg-emerald-50 text-emerald-600 rounded-2xl group-hover:scale-110 transition-transform">
                                    <FileText size={24} />
                                </div>
                                <div className={cn(
                                    "px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest",
                                    page.status ? "bg-emerald-50 text-emerald-600" : "bg-slate-50 text-slate-400"
                                )}>
                                    {page.status ? 'Published' : 'Draft'}
                                </div>
                            </div>
                            
                            <div className="flex-1">
                                <h3 className="text-xl font-black text-slate-800 tracking-tight mb-2">{page.title}</h3>
                                <div className="flex items-center gap-2 text-slate-400 mb-6">
                                    <Globe size={14} />
                                    <span className="text-xs font-bold font-mono">/page/{page.slug}</span>
                                </div>
                                <div className="text-slate-500 text-sm line-clamp-3 mb-8" dangerouslySetInnerHTML={{ __html: page.content.substring(0, 150) + '...' }}></div>
                            </div>

                            <div className="pt-8 border-t border-slate-50 flex gap-3">
                                <Link 
                                    href={route('admin.pages.edit', page.id)}
                                    className="flex-1 py-4 bg-slate-50 text-slate-500 text-center rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all flex items-center justify-center gap-2"
                                >
                                    <Settings size={14} /> Edit Content
                                </Link>
                                <a 
                                    href={route('page.show', page.slug)} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="p-4 bg-emerald-50 text-emerald-600 rounded-2xl hover:bg-emerald-600 hover:text-white transition-all"
                                >
                                    <Eye size={18} />
                                </a>
                                <button 
                                    onClick={() => handleDelete(page.id)}
                                    className="p-4 bg-red-50 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination */}
                {pages.links.length > 3 && (
                    <div className="flex justify-center gap-2 pt-12">
                         {pages.links.map((link, i) => (
                            <button
                                key={i}
                                disabled={!link.url}
                                onClick={() => link.url && router.get(link.url, { search }, { preserveState: true })}
                                className={cn(
                                    "w-12 h-12 rounded-2xl flex items-center justify-center text-xs font-black transition-all",
                                    link.active 
                                        ? "bg-emerald-600 text-white shadow-xl shadow-emerald-100" 
                                        : "bg-white text-slate-400 border border-slate-100 hover:border-slate-300",
                                    !link.url && "opacity-20 cursor-not-allowed"
                                )}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
