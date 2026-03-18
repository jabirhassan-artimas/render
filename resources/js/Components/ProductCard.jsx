import React from 'react';
import { Link } from '@inertiajs/react';
import { ShoppingBag, Star } from 'lucide-react';

export default function ProductCard({ product }) {
    const imageUrl = product.thumbnail 
        ? (product.thumbnail.startsWith('http') ? product.thumbnail : `/storage/${product.thumbnail.replace(/^\//, '')}`) 
        : 'https://images.unsplash.com/photo-1560343090-f0409e92791a?auto=format&fit=crop&q=80&w=800';

    return (
        <div className="group bg-white rounded-[2rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-blue-200/40 transition-all duration-500 flex flex-col h-full">
            <div className="relative aspect-[4/5] overflow-hidden">
                <img 
                    src={imageUrl} 
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                    {product.is_new && (
                        <span className="bg-emerald-500 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-lg shadow-lg shadow-emerald-200">New</span>
                    )}
                    {product.discount > 0 && (
                        <span className="bg-rose-500 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-lg shadow-lg shadow-rose-200">-{product.discount}%</span>
                    )}
                </div>
                <button className="absolute bottom-4 right-4 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 w-12 h-12 bg-blue-600 text-white rounded-2xl flex items-center justify-center transition-all duration-300 shadow-xl shadow-blue-200 hover:bg-blue-700 active:scale-95">
                    <ShoppingBag size={20} />
                </button>
            </div>
            <div className="p-6 flex flex-col flex-1">
                <Link href={route('category', product.category?.slug || 'all')} className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] hover:text-blue-600 transition-colors">
                    {product.category?.name || 'General'}
                </Link>
                <Link href={route('product.details', product.slug)} className="mt-2 block font-black text-slate-800 text-lg leading-tight hover:text-blue-600 transition-colors flex-1">
                    {product.name}
                </Link>
                <div className="mt-4 flex items-center justify-between">
                    <span className="text-xl font-black text-slate-900 tracking-tight">৳{parseFloat(product.price).toLocaleString()}</span>
                    <div className="flex items-center gap-1">
                        <Star size={14} className="fill-amber-400 text-amber-400" />
                        <span className="text-xs font-black text-slate-800">4.8</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
