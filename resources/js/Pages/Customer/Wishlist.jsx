import React from 'react';
import CustomerLayout from '@/Layouts/CustomerLayout';
import { Head, Link, router } from '@inertiajs/react';
import { 
    Heart, 
    ShoppingBag, 
    Trash2, 
    ArrowRight,
    ChevronLeft,
    Box
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export default function Wishlist({ wishlists }) {
    const removeItem = (id) => {
        if (confirm('Are you sure you want to remove this from your wishlist?')) {
            router.delete(route('wishlist.destroy', id), { preserveScroll: true });
        }
    };

    const imageUrl = (path) => path ? (path.startsWith('http') ? path : `/storage/${path}`) : 'https://images.unsplash.com/photo-1560343090-f0409e92791a?auto=format&fit=crop&q=80&w=800';

    return (
        <CustomerLayout>
            <Head title="My Wishlist" />

            <div className="space-y-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2 border-b border-slate-100">
                    <div>
                        <h1 className="text-4xl font-black text-slate-800 tracking-tight mb-2">My Curations</h1>
                        <p className="text-slate-400 font-medium italic">Products you've saved for later</p>
                    </div>
                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] bg-white px-6 py-3 rounded-2xl border border-slate-100">
                        {wishlists.total} Items Saved
                    </p>
                </div>

                {wishlists.data.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                        {wishlists.data.map((item) => (
                            <div key={item.id} className="bg-white rounded-[2.5rem] p-6 border border-slate-100 shadow-sm group hover:shadow-2xl hover:shadow-blue-50 transition-all duration-700">
                                <div className="aspect-[4/5] rounded-3xl overflow-hidden mb-6 relative">
                                    <img 
                                        src={imageUrl(item.product.thumbnail)} 
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                                    />
                                    <div className="absolute top-4 right-4">
                                        <button 
                                            onClick={() => removeItem(item.id)}
                                            className="w-10 h-10 bg-white/90 backdrop-blur-md rounded-xl flex items-center justify-center text-rose-500 shadow-lg hover:bg-rose-500 hover:text-white transition-all transform hover:rotate-12"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                    <div className="absolute bottom-4 left-4 right-4">
                                        <Link 
                                            href={route('product.details', item.product.slug)}
                                            className="w-full bg-white/90 backdrop-blur-md py-3 rounded-xl font-black text-[10px] uppercase tracking-widest text-slate-800 flex items-center justify-center gap-2 hover:bg-blue-600 hover:text-white transition-all opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 duration-500"
                                        >
                                            View Product <ArrowRight size={14} />
                                        </Link>
                                    </div>
                                </div>

                                <div className="text-center px-2">
                                    <h3 className="font-black text-slate-800 text-lg tracking-tight mb-2 truncate px-4">{item.product.name}</h3>
                                    <p className="text-xl font-black text-blue-600 tracking-tighter mb-6">৳{parseFloat(item.product.price).toLocaleString()}</p>
                                    
                                    <Link 
                                        href={route('cart.add', item.product.id)}
                                        method="post"
                                        as="button"
                                        className="inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-blue-600 transition-colors group/btn"
                                    >
                                        <ShoppingBag size={14} className="group-hover/btn:scale-125 transition-transform" /> Move to Bag
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white rounded-[4rem] p-20 py-32 border border-slate-100 shadow-sm flex flex-col items-center text-center">
                        <div className="w-24 h-24 bg-slate-50 rounded-3xl flex items-center justify-center text-slate-200 mb-8">
                            <Heart size={48} />
                        </div>
                        <h2 className="text-3xl font-black text-slate-800 mb-4 tracking-tight">Your wishlist is empty</h2>
                        <p className="text-slate-500 font-medium max-w-sm mb-12">Save the items you love to your wishlist and they'll appear here for easy access.</p>
                        <Link 
                            href={route('shop')}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-5 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-blue-100 transition-all flex items-center gap-3 group active:scale-95"
                        >
                            <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Explore Shop
                        </Link>
                    </div>
                )}

                {/* Pagination */}
                {wishlists.links.length > 3 && (
                    <div className="flex justify-center gap-2 pt-10">
                        {wishlists.links.map((link, i) => (
                            <button
                                key={i}
                                disabled={!link.url}
                                onClick={() => link.url && router.get(link.url)}
                                className={cn(
                                    "w-12 h-12 rounded-2xl flex items-center justify-center font-black text-sm transition-all",
                                    link.active 
                                        ? "bg-slate-900 text-white shadow-xl shadow-slate-200" 
                                        : "bg-white text-slate-400 border border-slate-100 hover:border-slate-300",
                                    !link.url && "opacity-20 cursor-not-allowed"
                                )}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </div>
                )}
            </div>
        </CustomerLayout>
    );
}
