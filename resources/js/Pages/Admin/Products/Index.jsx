import React, { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import { 
    Plus, 
    Search, 
    Edit, 
    Trash2, 
    Eye, 
    MoreVertical,
    CheckCircle2,
    XCircle,
    ChevronLeft,
    ChevronRight,
    Package,
    ArrowUpDown,
    Filter
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export default function Index({ products, categories, filters }) {
    const [search, setSearch] = useState(filters.search || '');
    const [category, setCategory] = useState(filters.category || '');

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route('admin.products.index'), { search, category }, { preserveState: true });
    };

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this product?')) {
            router.delete(route('admin.products.destroy', id));
        }
    };

    return (
        <AdminLayout>
            <Head title="Inventory Management" />

            <div className="space-y-8">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <h1 className="text-3xl font-black text-slate-800 tracking-tight mb-2">Inventory Control</h1>
                        <p className="text-slate-500 font-medium">Manage your product catalog, stock levels, and pricing.</p>
                    </div>
                    <Link 
                        href={route('admin.products.create')}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-emerald-200 transition-all flex items-center gap-3 active:scale-95 shrink-0"
                    >
                        <Plus size={18} /> New Product
                    </Link>
                </div>

                {/* Filters & Actions */}
                <div className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col lg:flex-row gap-6 items-center">
                    <form onSubmit={handleSearch} className="flex-1 flex flex-col md:flex-row gap-4 w-full">
                        <div className="flex-1 relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                            <input 
                                type="text" 
                                placeholder="Search by name or SKU..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full bg-slate-50 border-none pl-12 pr-6 py-4 rounded-xl text-sm font-bold focus:ring-2 focus:ring-emerald-100 transition-all"
                            />
                        </div>
                        <select 
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="bg-slate-50 border-none px-6 py-4 rounded-xl text-sm font-bold focus:ring-2 focus:ring-emerald-100 transition-all md:w-64"
                        >
                            <option value="">All Categories</option>
                            {categories.map(cat => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                        </select>
                        <button type="submit" className="bg-slate-900 text-white px-8 py-4 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-slate-800 transition-all shadow-lg active:scale-95">
                            Filter
                        </button>
                    </form>
                    
                    <div className="flex items-center gap-3 shrink-0">
                        <button className="p-4 bg-slate-50 text-slate-400 hover:text-slate-800 rounded-xl transition-all border border-slate-100">
                            <ArrowUpDown size={18} />
                        </button>
                        <button className="p-4 bg-slate-50 text-slate-400 hover:text-slate-800 rounded-xl transition-all border border-slate-100">
                            <Filter size={18} />
                        </button>
                    </div>
                </div>

                {/* Table Section */}
                <div className="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50/50">
                                    <th className="px-10 py-6 text-[10px] font-black uppercase text-slate-400 tracking-widest">Product Info</th>
                                    <th className="px-10 py-6 text-[10px] font-black uppercase text-slate-400 tracking-widest">Category</th>
                                    <th className="px-10 py-6 text-[10px] font-black uppercase text-slate-400 tracking-widest">Pricing</th>
                                    <th className="px-10 py-6 text-[10px] font-black uppercase text-slate-400 tracking-widest text-center">Stock</th>
                                    <th className="px-10 py-6 text-[10px] font-black uppercase text-slate-400 tracking-widest text-center">Status</th>
                                    <th className="px-10 py-6 text-[10px] font-black uppercase text-slate-400 tracking-widest text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {products.data.map((product) => (
                                    <tr key={product.id} className="group hover:bg-slate-50/50 transition-colors">
                                        <td className="px-10 py-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-14 h-14 bg-slate-100 rounded-2xl overflow-hidden shrink-0 border border-slate-50">
                                                    {product.thumbnail ? (
                                                        <img src={product.thumbnail.startsWith('http') ? product.thumbnail : `/uploads/${product.thumbnail.replace(/^\//, '')}`} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-slate-300">
                                                            <Package size={24} />
                                                        </div>
                                                    )}
                                                </div>
                                                <div>
                                                    <p className="font-black text-slate-800 text-sm group-hover:text-emerald-600 transition-colors">{product.name}</p>
                                                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-0.5">SKU: {product.sku}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-10 py-6">
                                            <span className="text-xs font-bold text-slate-500 whitespace-nowrap">
                                                {product.category?.name || 'N/A'}
                                            </span>
                                        </td>
                                        <td className="px-10 py-6">
                                            <div>
                                                <p className="font-black text-slate-900 text-sm">৳{parseFloat(product.price).toLocaleString()}</p>
                                                {product.discount_price > 0 && (
                                                    <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-widest">Discount: ৳{parseFloat(product.discount_price).toLocaleString()}</p>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-10 py-6 text-center">
                                            <span className={cn(
                                                "font-black text-xs",
                                                product.stock_qty <= 5 ? "text-rose-500" : "text-slate-800"
                                            )}>
                                                {product.stock_qty}
                                            </span>
                                        </td>
                                        <td className="px-10 py-6">
                                            <div className="flex justify-center">
                                                {product.status ? (
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
                                                    href={route('admin.products.edit', product.id)}
                                                    className="p-3 bg-white border border-slate-100 text-slate-400 hover:text-emerald-600 hover:border-emerald-100 rounded-xl transition-all shadow-sm"
                                                >
                                                    <Edit size={16} />
                                                </Link>
                                                <button 
                                                    onClick={() => handleDelete(product.id)}
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

                    {/* Pagination Info */}
                    <div className="px-10 py-8 bg-slate-50/50 flex flex-col md:flex-row items-center justify-between gap-6 border-t border-slate-100">
                        <p className="text-xs font-bold text-slate-400">
                            Showing <span className="text-slate-800">{products.from}</span> to <span className="text-slate-800">{products.to}</span> of <span className="text-slate-800">{products.total}</span> products
                        </p>
                        
                        <div className="flex gap-2">
                             {products.links.map((link, i) => (
                                <button
                                    key={i}
                                    disabled={!link.url}
                                    onClick={() => link.url && router.get(link.url, { search, category }, { preserveState: true })}
                                    className={cn(
                                        "w-10 h-10 rounded-xl flex items-center justify-center text-xs font-black transition-all",
                                        link.active 
                                            ? "bg-emerald-600 text-white shadow-lg shadow-emerald-100" 
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
