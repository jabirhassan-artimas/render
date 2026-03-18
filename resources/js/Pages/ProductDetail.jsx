import React, { useState } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import ProductCard from '@/Components/ProductCard';
import { 
    ShoppingBag, 
    Star, 
    Truck, 
    ShieldCheck, 
    RefreshCcw, 
    Headphones,
    Heart,
    Minus,
    Plus,
    CheckCircle2,
    ChevronRight,
    MessageCircle
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export default function ProductDetail({ product, relatedProducts, auth }) {
    const [mainImage, setMainImage] = useState(product.thumbnail);
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState('description');

    const imageUrl = (path) => path ? (path.startsWith('http') ? path : `/storage/${path.replace(/^\//, '')}`) : 'https://images.unsplash.com/photo-1560343090-f0409e92791a?auto=format&fit=crop&q=80&w=800';

    const { post, processing } = useForm({
        quantity: 1
    });

    const handleAddToCart = (e) => {
        e.preventDefault();
        post(route('cart.add', product.id), {
            data: { quantity },
            preserveScroll: true
        });
    };

    return (
        <AppLayout>
            <Head title={product.name} />

            <div className="container mx-auto px-4 md:px-6 py-12">
                {/* Breadcrumbs */}
                <nav className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400 mb-12">
                    <Link href="/">Home</Link>
                    <ChevronRight size={12} />
                    <Link href={route('shop')}>Shop</Link>
                    <ChevronRight size={12} />
                    <span className="text-blue-600">{product.name}</span>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 mb-32">
                    {/* Left: Gallery */}
                    <div className="space-y-6">
                        <div className="aspect-square bg-white rounded-[3rem] overflow-hidden border border-slate-100 shadow-2xl shadow-blue-50 relative group">
                            <img 
                                src={imageUrl(mainImage)} 
                                alt={product.name} 
                                className="w-full h-full object-cover transition-all duration-700"
                            />
                            {product.discount > 0 && (
                                <div className="absolute top-8 left-8 bg-rose-500 text-white px-6 py-2 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-rose-200">
                                    -{product.discount}% Off
                                </div>
                            )}
                        </div>
                        
                        {product.images?.length > 0 && (
                            <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
                                <button 
                                    onClick={() => setMainImage(product.thumbnail)}
                                    className={cn(
                                        "w-24 h-24 rounded-2xl overflow-hidden border-4 transition-all shrink-0",
                                        mainImage === product.thumbnail ? "border-blue-600 shadow-lg scale-105" : "border-transparent opacity-60 hover:opacity-100"
                                    )}
                                >
                                    <img src={imageUrl(product.thumbnail)} className="w-full h-full object-cover" />
                                </button>
                                {product.images.map((img) => (
                                    <button 
                                        key={img.id}
                                        onClick={() => setMainImage(img.image_path)}
                                        className={cn(
                                            "w-24 h-24 rounded-2xl overflow-hidden border-4 transition-all shrink-0",
                                            mainImage === img.image_path ? "border-blue-600 shadow-lg scale-105" : "border-transparent opacity-60 hover:opacity-100"
                                        )}
                                    >
                                        <img src={imageUrl(img.image_path)} className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Right: Info */}
                    <div className="flex flex-col justify-center">
                        <div className="flex items-center gap-4 mb-6">
                            <span className="bg-blue-50 text-blue-600 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em]">
                                {product.category?.name || 'Handpicked'}
                            </span>
                            <div className="flex items-center gap-1 text-amber-500">
                                <Star size={16} className="fill-current" />
                                <Star size={16} className="fill-current" />
                                <Star size={16} className="fill-current" />
                                <Star size={16} className="fill-current" />
                                <Star size={16} className="fill-current" />
                                <span className="text-slate-400 text-xs font-bold ml-2">(128 Reviews)</span>
                            </div>
                        </div>

                        <h1 className="text-4xl md:text-6xl font-black text-slate-800 tracking-tight leading-tight mb-6">
                            {product.name}
                        </h1>

                        <div className="flex items-baseline gap-4 mb-8">
                            <span className="text-4xl font-black text-slate-900 tracking-tighter">
                                ৳{parseFloat(product.price).toLocaleString()}
                            </span>
                            {product.old_price && (
                                <span className="text-xl text-slate-300 font-bold line-through">
                                    ৳{parseFloat(product.old_price).toLocaleString()}
                                </span>
                            )}
                        </div>

                        <p className="text-slate-500 text-lg font-medium leading-relaxed mb-10">
                            {product.description || "Indulge in the epitome of craftsmanship. This premium piece is meticulously designed to offer both unparalleled style and enduring quality, becoming a timeless addition to your collection."}
                        </p>

                        <div className="space-y-10">
                            {/* Stock Status */}
                            <div className="flex items-center gap-2">
                                <div className={cn(
                                    "w-3 h-3 rounded-full animate-pulse",
                                    product.stock_qty > 0 ? "bg-emerald-500" : "bg-rose-500"
                                )}></div>
                                <span className={cn(
                                    "text-xs font-black uppercase tracking-widest",
                                    product.stock_qty > 0 ? "text-emerald-600" : "text-rose-600"
                                )}>
                                    {product.stock_qty > 0 ? `${product.stock_qty} Items In Stock` : 'Out of Stock'}
                                </span>
                            </div>

                            {/* Actions */}
                            <form onSubmit={handleAddToCart} className="flex flex-wrap gap-4">
                                <div className="bg-slate-100 p-1.5 rounded-2xl flex items-center gap-1">
                                    <button 
                                        type="button"
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="w-12 h-12 flex items-center justify-center text-slate-500 hover:bg-white hover:text-blue-600 rounded-xl transition-all shadow-sm group active:scale-90"
                                    >
                                        <Minus size={18} />
                                    </button>
                                    <input 
                                        type="number" 
                                        value={quantity}
                                        onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                                        className="w-12 bg-transparent border-none text-center font-black text-slate-800 focus:ring-0 p-0"
                                    />
                                    <button 
                                        type="button"
                                        onClick={() => setQuantity(Math.min(product.stock_qty || 99, quantity + 1))}
                                        className="w-12 h-12 flex items-center justify-center text-slate-500 hover:bg-white hover:text-blue-600 rounded-xl transition-all shadow-sm group active:scale-90"
                                    >
                                        <Plus size={18} />
                                    </button>
                                </div>

                                <button 
                                    className="flex-1 min-w-[200px] bg-blue-600 hover:bg-blue-700 text-white px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-blue-200 transition-all active:scale-95 flex items-center justify-center gap-3"
                                    disabled={product.stock_qty <= 0 || processing}
                                >
                                    <ShoppingBag size={20} /> Add to Cart
                                </button>

                                <button type="button" className="w-16 h-16 bg-white border border-slate-100 rounded-2xl flex items-center justify-center text-slate-400 hover:text-rose-500 hover:border-rose-100 hover:bg-rose-50 transition-all group shadow-sm">
                                    <Heart size={24} className="group-active:scale-125 transition-transform" />
                                </button>
                            </form>

                            {/* Trust Badges */}
                            <div className="grid grid-cols-2 gap-6 pt-10 border-t border-slate-100">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                                        <Truck size={18} />
                                    </div>
                                    <span className="text-xs font-bold text-slate-600">Global Delivery</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
                                        <ShieldCheck size={18} />
                                    </div>
                                    <span className="text-xs font-bold text-slate-600">Secure Checkout</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabs Section */}
                <div className="mb-32">
                    <div className="flex gap-8 border-b border-slate-100 mb-12">
                        {['description', 'details', 'reviews'].map((tab) => (
                            <button 
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={cn(
                                    "pb-6 text-sm font-black uppercase tracking-widest transition-all relative",
                                    activeTab === tab 
                                        ? "text-blue-600 after:absolute after:bottom-0 after:left-0 after:w-full after:h-1 after:bg-blue-600 after:rounded-t-full" 
                                        : "text-slate-400 hover:text-slate-600"
                                )}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    <div className="max-w-4xl animate-in fade-in duration-500">
                        {activeTab === 'description' && (
                            <div className="prose prose-slate max-w-none text-slate-500 font-medium leading-loose text-lg">
                                <p>{product.long_description || product.description || "Our commitment to quality is evident in every stitch of this exquisite piece. Designed for those who demand excellence, it combines modern aesthetics with traditional manufacturing techniques to create something truly special."}</p>
                            </div>
                        )}
                        {activeTab === 'details' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="bg-white p-8 rounded-3xl border border-slate-50 shadow-sm">
                                    <h4 className="font-black text-slate-800 text-sm uppercase tracking-widest mb-6">Specifications</h4>
                                    <dl className="space-y-4">
                                        <div className="flex justify-between border-b border-slate-50 pb-2">
                                            <dt className="text-sm font-bold text-slate-400">Material</dt>
                                            <dd className="text-sm font-black text-slate-800">Premium Grade</dd>
                                        </div>
                                        <div className="flex justify-between border-b border-slate-50 pb-2">
                                            <dt className="text-sm font-bold text-slate-400">Weight</dt>
                                            <dd className="text-sm font-black text-slate-800">450g</dd>
                                        </div>
                                        <div className="flex justify-between border-b border-slate-50 pb-2">
                                            <dt className="text-sm font-bold text-slate-400">Origin</dt>
                                            <dd className="text-sm font-black text-slate-800">Imported</dd>
                                        </div>
                                    </dl>
                                </div>
                            </div>
                        )}
                        {activeTab === 'reviews' && (
                            <div className="space-y-12">
                                {product.reviews?.length > 0 ? (
                                    product.reviews.map((review) => (
                                        <div key={review.id} className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col md:flex-row gap-8">
                                            <div className="shrink-0 flex flex-col items-center">
                                                <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center font-black text-slate-400 text-xl">
                                                    {review.user?.name.charAt(0)}
                                                </div>
                                                <div className="mt-4 flex flex-col items-center">
                                                    <span className="text-xs font-black text-slate-800">{review.user?.name}</span>
                                                    <span className="text-[10px] font-bold text-slate-400 mt-1 uppercase">Verified</span>
                                                </div>
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center gap-1 text-amber-500 mb-4">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star key={i} size={14} className={i < review.rating ? "fill-current" : "text-slate-200"} />
                                                    ))}
                                                </div>
                                                <p className="text-slate-500 font-medium leading-relaxed">{review.comment}</p>
                                                <div className="mt-6 text-[10px] font-black uppercase text-slate-300 tracking-widest">
                                                    {new Date(review.created_at).toLocaleDateString()}
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-20 bg-slate-50 rounded-[3rem] border border-dashed border-slate-200">
                                        <MessageCircle size={40} className="mx-auto text-slate-200 mb-4" />
                                        <p className="text-slate-400 font-bold italic">No reviews yet. Be the first to share your experience!</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Related Products */}
                {relatedProducts?.length > 0 && (
                    <section>
                        <div className="flex items-center justify-between mb-16">
                            <h2 className="text-3xl md:text-5xl font-black text-slate-800 tracking-tight">You May Also Like</h2>
                            <Link href={route('shop')} className="text-blue-600 font-black text-xs uppercase tracking-widest hover:underline">Explore More</Link>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {relatedProducts.map((p) => (
                                <ProductCard key={p.id} product={p} />
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </AppLayout>
    );
}
