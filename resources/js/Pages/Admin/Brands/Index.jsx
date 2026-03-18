import React, { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import { 
    Plus, 
    Search, 
    Edit, 
    Trash2, 
    Star,
    CheckCircle2,
    XCircle,
    ChevronLeft,
    ChevronRight,
    ArrowUpDown,
    Filter,
    Award
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export default function Index({ brands, filters }) {
    const [search, setSearch] = useState(filters.search || '');

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route('admin.brands.index'), { search }, { preserveState: true });
    };

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this brand?')) {
            router.delete(route('admin.brands.destroy', id));
        }
    };

    return (
        <AdminLayout>
            <Head title="Brand Management" />

            <div className="space-y-8 animate-in fade-in duration-500">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <h1 className="text-3xl font-black text-slate-800 tracking-tight mb-2">Portfolio Partners</h1>
                        <p className="text-slate-500 font-medium">Manage the premium brands and artisans featured in your store.</p>
                    </div>
                    <Link 
                        href={route('admin.brands.create')}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-200 transition-all flex items-center gap-3 active:scale-95 shrink-0"
                    >
                        <Plus size={18} /> Add Brand
                    </Link>
                </div>

                {/* Filters */}
                <div className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col md:flex-row gap-4 items-center">
                    <form onSubmit={handleSearch} className="flex-1 flex flex-col md:flex-row gap-4 w-full">
                        <div className="flex-1 relative">
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                            <input 
                                type="text" 
                                placeholder="Search by brand name..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full bg-slate-50 border-none pl-14 pr-6 py-4 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-blue-100 transition-all"
                            />
                        </div>
                        <button type="submit" className="bg-slate-900 text-white px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-800 transition-all shadow-lg active:scale-95">
                            Filter Results
                        </button>
                    </form>
                </div>

                {/* Grid Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
                    {brands.data.map((brand) => (
                        <div key={brand.id} className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-blue-50 transition-all duration-500 group relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 opacity-50 blur-3xl -mr-8 -mt-8 rounded-full group-hover:bg-blue-100 transition-colors"></div>
                            
                            <div className="flex flex-col items-center text-center relative z-10">
                                <div className="w-24 h-24 bg-slate-50 rounded-[2rem] overflow-hidden mb-6 border border-slate-100 shadow-inner group-hover:scale-110 transition-transform duration-500">
                                    {brand.image ? (
                                        <img src={`/storage/${brand.image}`} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-slate-200">
                                            <Award size={48} />
                                        </div>
                                    )}
                                </div>
                                <h3 className="text-xl font-black text-slate-800 tracking-tight mb-2 capitalize">{brand.name}</h3>
                                <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-6">Slug: {brand.slug}</p>
                                
                                <div className="flex items-center gap-4 w-full justify-between pt-6 border-t border-slate-50">
                                    <div className={cn(
                                        "px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest",
                                        brand.status ? "bg-emerald-50 text-emerald-600" : "bg-slate-50 text-slate-400"
                                    )}>
                                        {brand.status ? 'Active' : 'Hidden'}
                                    </div>
                                    <div className="flex gap-2">
                                        <Link 
                                            href={route('admin.brands.edit', brand.id)}
                                            className="p-3 bg-white border border-slate-100 text-slate-300 hover:text-blue-600 hover:border-blue-100 rounded-xl transition-all shadow-sm"
                                        >
                                            <Edit size={16} />
                                        </Link>
                                        <button 
                                            onClick={() => handleDelete(brand.id)}
                                            className="p-3 bg-white border border-slate-100 text-slate-300 hover:text-rose-500 hover:border-rose-100 rounded-xl transition-all shadow-sm"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination */}
                {brands.links.length > 3 && (
                    <div className="flex justify-center gap-2 pt-12">
                         {brands.links.map((link, i) => (
                            <button
                                key={i}
                                disabled={!link.url}
                                onClick={() => link.url && router.get(link.url, { search }, { preserveState: true })}
                                className={cn(
                                    "w-12 h-12 rounded-2xl flex items-center justify-center text-xs font-black transition-all",
                                    link.active 
                                        ? "bg-blue-600 text-white shadow-xl shadow-blue-100" 
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
