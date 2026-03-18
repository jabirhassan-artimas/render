import React, { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import { 
    Plus, 
    Search, 
    Edit, 
    Trash2, 
    Layers,
    CheckCircle2,
    XCircle,
    ChevronLeft,
    ChevronRight,
    ArrowUpDown,
    Filter,
    FolderTree
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export default function Index({ categories, filters }) {
    const [search, setSearch] = useState(filters.search || '');

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route('admin.categories.index'), { search }, { preserveState: true });
    };

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this category? All products in this category will become unassigned.')) {
            router.delete(route('admin.categories.destroy', id));
        }
    };

    return (
        <AdminLayout>
            <Head title="Category Management" />

            <div className="space-y-8 animate-in fade-in duration-500">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <h1 className="text-3xl font-black text-slate-800 tracking-tight mb-2">Inventory Taxonomies</h1>
                        <p className="text-slate-500 font-medium">Organize your products with hierarchical categories and collections.</p>
                    </div>
                    <Link 
                        href={route('admin.categories.create')}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-200 transition-all flex items-center gap-3 active:scale-95 shrink-0"
                    >
                        <Plus size={18} /> New Category
                    </Link>
                </div>

                {/* Filters */}
                <div className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col md:flex-row gap-4 items-center">
                    <form onSubmit={handleSearch} className="flex-1 flex flex-col md:flex-row gap-4 w-full">
                        <div className="flex-1 relative">
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                            <input 
                                type="text" 
                                placeholder="Search by category name..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full bg-slate-50 border-none pl-14 pr-6 py-4 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-blue-100 transition-all"
                            />
                        </div>
                        <button type="submit" className="bg-slate-900 text-white px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-800 transition-all shadow-lg active:scale-95">
                            Filter
                        </button>
                    </form>
                </div>

                {/* Table Section */}
                <div className="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50/50">
                                    <th className="px-10 py-6 text-[10px] font-black uppercase text-slate-400 tracking-widest">Category Info</th>
                                    <th className="px-10 py-6 text-[10px] font-black uppercase text-slate-400 tracking-widest">Parent</th>
                                    <th className="px-10 py-6 text-[10px] font-black uppercase text-slate-400 tracking-widest text-center">Hierarchy</th>
                                    <th className="px-10 py-6 text-[10px] font-black uppercase text-slate-400 tracking-widest text-center">Status</th>
                                    <th className="px-10 py-6 text-[10px] font-black uppercase text-slate-400 tracking-widest text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {categories.data.map((category) => (
                                    <tr key={category.id} className="group hover:bg-slate-50/50 transition-colors">
                                        <td className="px-10 py-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-14 h-14 bg-slate-100 rounded-2xl overflow-hidden shrink-0 border border-slate-50">
                                                    {category.image ? (
                                                        <img src={`/storage/${category.image}`} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-slate-300">
                                                            <Layers size={24} />
                                                        </div>
                                                    )}
                                                </div>
                                                <div>
                                                    <p className="font-black text-slate-800 text-sm group-hover:text-blue-600 transition-colors uppercase tracking-tight">{category.name}</p>
                                                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-0.5">Slug: {category.slug}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-10 py-6">
                                            <span className="text-xs font-bold text-slate-500 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100">
                                                {category.parent ? category.parent.name : 'Top Level'}
                                            </span>
                                        </td>
                                        <td className="px-10 py-6 text-center">
                                            <div className="flex justify-center">
                                                <div className={cn(
                                                    "w-8 h-8 rounded-lg flex items-center justify-center border",
                                                    category.parent_id ? "text-slate-400 border-slate-100" : "text-blue-600 border-blue-50 bg-blue-50/30"
                                                )}>
                                                    {category.parent_id ? <ChevronRight size={14} className="rotate-90" /> : <FolderTree size={16} />}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-10 py-6">
                                            <div className="flex justify-center">
                                                {category.status ? (
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
                                                    href={route('admin.categories.edit', category.id)}
                                                    className="p-3 bg-white border border-slate-100 text-slate-400 hover:text-blue-600 hover:border-blue-100 rounded-xl transition-all shadow-sm"
                                                >
                                                    <Edit size={16} />
                                                </Link>
                                                <button 
                                                    onClick={() => handleDelete(category.id)}
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
                            Showing <span className="text-slate-800">{categories.from}</span> to <span className="text-slate-800">{categories.to}</span> of <span className="text-slate-800">{categories.total}</span> categories
                        </p>
                        
                        <div className="flex gap-2">
                             {categories.links.map((link, i) => (
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
