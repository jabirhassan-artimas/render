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
    MessageCircle,
    ArrowUpRight
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

    const imageUrl = (path) => path ? (path.startsWith('http') ? path : `/uploads/${path.replace(/^\//, '')}`) : 'https://images.unsplash.com/photo-1560343090-f0409e92791a?auto=format&fit=crop&q=80&w=800';

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

            <div className="container mx-auto px-4 md:px-6 py-8">
                {/* Breadcrumbs */}
                <nav className="flex items-center gap-2 text-[8px] font-black uppercase tracking-[0.2em] text-dark/30 mb-6 px-1">
                    <Link href="/" className="hover:text-primary transition-colors">হোম</Link>
                    <ChevronRight size={8} className="text-dark/10" />
                    <Link href={route('shop')} className="hover:text-primary transition-colors">শপ</Link>
                    <ChevronRight size={8} className="text-dark/10" />
                    <span className="text-dark">{product.name}</span>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16 mb-16">
                    {/* Left: Gallery */}
                    <div className="space-y-3">
                        <div className="aspect-square bg-white rounded-2xl overflow-hidden border border-dark/5 shadow-minimal relative group p-2">
                            <img
                                src={imageUrl(mainImage)}
                                alt={product.name}
                                className="w-full h-full object-cover transition-all duration-700 rounded-xl"
                            />
                            {product.discount > 0 && (
                                <div className="absolute top-6 left-6 bg-dark text-primary px-5 py-2 rounded-xl font-black text-[9px] uppercase tracking-[0.2em] shadow-2xl">
                                    -{product.discount}% ছাড়
                                </div>
                            )}
                        </div>

                        {product.images?.length > 0 && (
                            <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
                                <button
                                    onClick={() => setMainImage(product.thumbnail)}
                                    className={cn(
                                        "w-20 h-20 rounded-xl overflow-hidden border-2 transition-all shrink-0",
                                        mainImage === product.thumbnail ? "border-primary shadow-lg scale-105" : "border-transparent opacity-60 hover:opacity-100"
                                    )}
                                >
                                    <img src={imageUrl(product.thumbnail)} className="w-full h-full object-cover" />
                                </button>
                                {product.images.map((img) => (
                                    <button
                                        key={img.id}
                                        onClick={() => setMainImage(img.image_path)}
                                        className={cn(
                                            "w-20 h-20 rounded-xl overflow-hidden border-2 transition-all shrink-0",
                                            mainImage === img.image_path ? "border-primary shadow-lg scale-105" : "border-transparent opacity-60 hover:opacity-100"
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
                        <div className="flex items-center gap-4 mb-4">
                            <span className="bg-dark/5 text-primary px-4 py-1.5 rounded-lg text-[8px] font-black uppercase tracking-[0.2em]">
                                {product.category?.name || 'বাছাইকৃত'}
                            </span>
                            <div className="flex items-center gap-1 text-primary">
                                <Star size={12} className="fill-current" />
                                <Star size={12} className="fill-current" />
                                <Star size={12} className="fill-current" />
                                <Star size={12} className="fill-current" />
                                <Star size={12} className="fill-current" />
                                <span className="text-dark/40 text-[9px] font-black ml-2 leading-none">({product.reviews_count || 128} REVIEW)</span>
                            </div>
                        </div>

                        <h1 className="text-2xl md:text-3xl lg:text-4xl font-black text-dark tracking-tighter leading-tight mb-4">
                            {product.name}
                        </h1>

                        <div className="flex items-baseline gap-3 mb-6">
                            <span className="text-2xl md:text-3xl font-black text-dark tracking-tighter">
                                ৳{parseFloat(product.price).toLocaleString()}
                            </span>
                            {product.old_price && (
                                <span className="text-base text-dark/20 font-black line-through">
                                    ৳{parseFloat(product.old_price).toLocaleString()}
                                </span>
                            )}
                        </div>

                        <p className="text-dark/60 text-sm md:text-base font-medium leading-relaxed mb-8 max-w-xl">
                            {product.description || "Indulge in the epitome of craftsmanship."}
                        </p>

                        <div className="space-y-6">
                            {/* Stock Status */}
                            <div className="flex items-center gap-2">
                                <div className={cn(
                                    "w-3 h-3 rounded-full animate-pulse",
                                    product.stock_qty > 0 ? "bg-primary" : "bg-dark/10"
                                )}></div>
                                <span className={cn(
                                    "text-[9px] font-black uppercase tracking-[0.2em]",
                                    product.stock_qty > 0 ? "text-dark" : "text-dark/20"
                                )}>
                                    {product.stock_qty > 0 ? `${product.stock_qty}টি স্টকে আছে` : 'স্টক শেষ'}
                                </span>
                            </div>

                            {/* Actions */}
                            <form onSubmit={handleAddToCart} className="flex flex-wrap gap-4 pt-2">
                                <div className="bg-heritage-paper p-1.5 rounded-xl flex items-center gap-1 border border-dark/5">
                                    <button
                                        type="button"
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="w-10 h-10 flex items-center justify-center text-dark/40 hover:bg-dark hover:text-primary rounded-lg transition-all active:scale-95"
                                    >
                                        <Minus size={16} />
                                    </button>
                                    <input
                                        type="number"
                                        value={quantity}
                                        onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                                        className="w-10 bg-transparent border-none text-center font-black text-base text-dark focus:ring-0 p-0"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setQuantity(Math.min(product.stock_qty || 99, quantity + 1))}
                                        className="w-10 h-10 flex items-center justify-center text-dark/40 hover:bg-dark hover:text-primary rounded-lg transition-all active:scale-95"
                                    >
                                        <Plus size={16} />
                                    </button>
                                </div>

                                <button
                                    className="flex-1 min-w-[160px] bg-dark text-primary px-8 py-4 rounded-xl font-black text-[9px] uppercase tracking-[0.2em] shadow-lg hover:bg-primary hover:text-dark transition-all flex items-center justify-center gap-3 group"
                                    disabled={product.stock_qty <= 0 || processing}
                                >
                                    <ShoppingBag size={16} /> ব্যাগে যোগ করুন
                                </button>

                                <button type="button" className="w-14 h-14 bg-heritage-paper border border-dark/5 rounded-xl flex items-center justify-center text-dark/40 hover:text-primary hover:bg-dark transition-all shadow-minimal">
                                    <Heart size={20} />
                                </button>
                            </form>

                            {/* Trust Badges */}
                            <div className="grid grid-cols-2 gap-4 pt-8 border-t border-dark/5">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-dark/5 rounded-xl flex items-center justify-center text-primary">
                                        <Truck size={16} />
                                    </div>
                                    <span className="text-[8px] font-black uppercase tracking-widest text-dark/30 leading-tight">দেশব্যাপী <br />ডেলিভারি</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-dark/5 rounded-xl flex items-center justify-center text-primary">
                                        <ShieldCheck size={16} />
                                    </div>
                                    <span className="text-[8px] font-black uppercase tracking-widest text-dark/30 leading-tight">নিরাপদ <br />পেমেন্ট</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mb-32">
                    <div className="flex gap-12 border-b border-dark/5 mb-16">
                        {['description', 'details', 'reviews'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={cn(
                                    "pb-8 text-[10px] font-black uppercase tracking-[0.3em] transition-all relative",
                                    activeTab === tab
                                        ? "text-dark after:absolute after:bottom-0 after:left-0 after:w-full after:h-1 after:bg-primary after:rounded-t-full drop-shadow-sm"
                                        : "text-dark/20 hover:text-dark/60"
                                )}
                            >
                                {tab === 'description' ? 'বিবরণ' : tab === 'details' ? 'বিস্তারিত' : 'রিভিউ'}
                            </button>
                        ))}
                    </div>

                    <div className="max-w-4xl animate-in fade-in duration-500">
                        {activeTab === 'description' && (
                            <div className="prose prose-dark max-w-4xl text-dark/60 font-black text-xl leading-[1.8] tracking-tight">
                                <p>{product.long_description || product.description || "Our commitment to quality is evident in every stitch of this exquisite piece. Designed for those who demand excellence, it combines modern aesthetics with traditional manufacturing techniques to create something truly special."}</p>
                            </div>
                        )}
                        {activeTab === 'details' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="bg-heritage-paper p-10 rounded-[2.5rem] border border-dark/5 shadow-minimal">
                                    <h4 className="font-black text-dark text-[10px] uppercase tracking-[0.3em] mb-8">বৈশিষ্ট্যসমূহ</h4>
                                    <dl className="space-y-6">
                                        <div className="flex justify-between border-b border-dark/5 pb-3">
                                            <dt className="text-xs font-black text-dark/30 uppercase tracking-widest">উপাদান</dt>
                                            <dd className="text-sm font-black text-dark">প্রিমিয়াম গ্রেড</dd>
                                        </div>
                                        <div className="flex justify-between border-b border-dark/5 pb-3">
                                            <dt className="text-xs font-black text-dark/30 uppercase tracking-widest">ওজন</dt>
                                            <dd className="text-sm font-black text-dark">৪৫০ গ্রাম</dd>
                                        </div>
                                        <div className="flex justify-between border-b border-dark/5 pb-3">
                                            <dt className="text-xs font-black text-dark/30 uppercase tracking-widest">উৎস</dt>
                                            <dd className="text-sm font-black text-dark">বাংলার ঐতিহ্য</dd>
                                        </div>
                                    </dl>
                                </div>
                            </div>
                        )}
                        {activeTab === 'reviews' && (
                            <div className="space-y-8">
                                {product.reviews?.length > 0 ? (
                                    product.reviews.map((review) => (
                                        <div key={review.id} className="bg-white p-10 rounded-[2rem] border border-dark/5 shadow-minimal flex flex-col md:flex-row gap-8">
                                            <div className="shrink-0 flex flex-col items-center">
                                                <div className="w-20 h-20 bg-dark text-primary rounded-[1.5rem] flex items-center justify-center font-black text-2xl shadow-xl">
                                                    {review.user?.name.charAt(0)}
                                                </div>
                                                <div className="mt-6 flex flex-col items-center">
                                                    <span className="text-sm font-black text-dark tracking-tight">{review.user?.name}</span>
                                                    <span className="text-[10px] font-black text-primary mt-2 uppercase tracking-[0.2em] bg-dark px-3 py-1 rounded-full">ভেরিফাইড</span>
                                                </div>
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center gap-1.5 text-primary mb-6">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star key={i} size={16} className={i < review.rating ? "fill-current" : "text-dark/10"} />
                                                    ))}
                                                </div>
                                                <p className="text-dark/60 font-bold text-xl leading-relaxed mb-8 italic">"{review.comment}"</p>
                                                <div className="text-[10px] font-black uppercase text-dark/20 tracking-[0.3em]">
                                                    {new Date(review.created_at).toLocaleDateString()}
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-24 bg-dark/5 rounded-[4rem] border border-dashed border-dark/10">
                                        <MessageCircle size={56} className="mx-auto text-dark/10 mb-6" />
                                        <p className="text-dark/30 font-black text-lg italic uppercase tracking-widest">এখনো কোনো রিভিউ নেই। প্রথম রিভিউটি আপনিই দিন!</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Related Products */}
                {relatedProducts?.length > 0 && (
                    <section className="pt-16 border-t border-dark/5">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
                            <h2 className="text-2xl md:text-3xl font-black text-dark tracking-tighter">আপনার আরও ভালো লাগতে পারে</h2>
                            <Link href={route('shop')} className="text-dark hover:text-primary transition-colors font-black text-[9px] uppercase tracking-widest flex items-center gap-2 pb-1 border-b border-primary/20">
                                কালেকশন দেখুন <ArrowUpRight size={14} />
                            </Link>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                            {relatedProducts.slice(0, 6).map((p) => (
                                <ProductCard key={p.id} product={p} />
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </AppLayout>
    );
}
