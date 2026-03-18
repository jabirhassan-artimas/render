import React, { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import { 
    Plus, 
    Search, 
    Edit, 
    Trash2, 
    Ticket,
    CheckCircle2,
    XCircle,
    ChevronLeft,
    ChevronRight,
    ArrowUpDown,
    Filter,
    Percent,
    Banknote,
    Calendar
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export default function Index({ coupons, filters }) {
    const [search, setSearch] = useState(filters.search || '');

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route('admin.coupons.index'), { search }, { preserveState: true });
    };

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this coupon?')) {
            router.delete(route('admin.coupons.destroy', id));
        }
    };

    return (
        <AdminLayout>
            <Head title="Coupon Management" />

            <div className="space-y-8 animate-in fade-in duration-500">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <h1 className="text-3xl font-black text-slate-800 tracking-tight mb-2">Promotional Engine</h1>
                        <p className="text-slate-500 font-medium">Create and manage discount codes to boost your conversion rates.</p>
                    </div>
                    <Link 
                        href={route('admin.coupons.create')}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-200 transition-all flex items-center gap-3 active:scale-95 shrink-0"
                    >
                        <Plus size={18} /> New Coupon
                    </Link>
                </div>

                {/* Filters */}
                <div className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm">
                    <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4 w-full">
                        <div className="flex-1 relative">
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                            <input 
                                type="text" 
                                placeholder="Search by coupon code..."
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

                {/* Grid Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                    {coupons.data.map((coupon) => (
                        <div key={coupon.id} className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-indigo-50 transition-all duration-500 group relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 opacity-30 blur-3xl -mr-16 -mt-16 rounded-full group-hover:bg-indigo-100 transition-colors"></div>
                            
                            <div className="relative z-10">
                                <div className="flex items-center justify-between mb-8">
                                    <div className="px-5 py-2.5 bg-indigo-50 text-indigo-600 font-black text-lg tracking-widest rounded-2xl shadow-inner uppercase">
                                        {coupon.code}
                                    </div>
                                    <div className={cn(
                                        "px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest",
                                        coupon.status ? "bg-emerald-50 text-emerald-600" : "bg-slate-50 text-slate-400"
                                    )}>
                                        {coupon.status ? 'Active' : 'Expired'}
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="flex items-end gap-3">
                                        <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400">
                                            {coupon.discount_percentage ? <Percent size={24} /> : <Banknote size={24} />}
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Benefit</p>
                                            <p className="text-2xl font-black text-slate-800 tracking-tight">
                                                {coupon.discount_percentage ? `${coupon.discount_percentage}% OFF` : `৳${parseFloat(coupon.discount_amount).toLocaleString()} OFF`}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 text-slate-400">
                                        <Calendar size={18} />
                                        <div className="text-xs font-bold">
                                            Expires: <span className="text-slate-600">{coupon.expires_at ? new Date(coupon.expires_at).toLocaleDateString() : 'Never'}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8 flex gap-3 pt-8 border-t border-slate-50">
                                    <Link 
                                        href={route('admin.coupons.edit', coupon.id)}
                                        className="flex-1 py-4 bg-slate-50 text-slate-500 text-center rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-100 hover:text-slate-800 transition-all"
                                    >
                                        Edit Coupon
                                    </Link>
                                    <button 
                                        onClick={() => handleDelete(coupon.id)}
                                        className="p-4 bg-red-50 text-red-500 rounded-2xl hover:bg-red-100 transition-all"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination */}
                {coupons.links.length > 3 && (
                    <div className="flex justify-center gap-2 pt-12">
                         {coupons.links.map((link, i) => (
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
