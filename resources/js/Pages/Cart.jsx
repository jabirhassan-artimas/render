import React, { useState } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { Head, Link, router, useForm } from '@inertiajs/react';
import {
    Trash2,
    Minus,
    Plus,
    ShoppingBag,
    ArrowRight,
    ChevronLeft,
    Ticket,
    ShieldCheck,
    Truck
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export default function Cart({ cart, coupon }) {
    const cartItems = Object.entries(cart || {}).map(([id, item]) => ({ id, ...item }));

    const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const discount = coupon ? (coupon.discount_amount || (subtotal * coupon.discount_percentage / 100)) : 0;
    const shipping = subtotal > 5000 ? 0 : 100;
    const total = subtotal - discount + shipping;

    const updateQuantity = (id, quantity) => {
        if (quantity < 1) return;
        router.patch(route('cart.update'), { id, quantity }, { preserveScroll: true });
    };

    const removeItem = (id) => {
        router.delete(route('cart.remove'), { data: { id }, preserveScroll: true });
    };

    const { data, setData, post, processing, errors } = useForm({
        code: ''
    });

    const applyCoupon = (e) => {
        e.preventDefault();
        post(route('cart.coupon'), { preserveScroll: true });
    };

    const removeCoupon = () => {
        router.delete(route('cart.coupon.remove'), { preserveScroll: true });
    };

    return (
        <AppLayout>
            <Head title="Shopping Bag" />

            <div className="container mx-auto px-4 md:px-6 py-12">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <div>
                        <nav className="flex items-center gap-2 text-[8px] font-black uppercase tracking-[0.4em] text-dark/20 mb-3 px-1">
                            <Link href="/" className="hover:text-primary transition-colors">হোম</Link>
                            <span className="w-0.5 h-0.5 rounded-full bg-dark/10" />
                            <span className="text-dark/40">আপনার ঝুলি</span>
                        </nav>
                        <h1 className="text-3xl md:text-5xl font-black text-dark tracking-tighter leading-none">
                            আমার <span className="text-primary italic">ঝুলি</span>
                        </h1>
                    </div>
                    <div className="text-dark/40 font-black text-[9px] uppercase tracking-[0.2em] bg-white px-6 py-3 rounded-xl border border-dark/5 shadow-minimal">
                        {cartItems.length} ITEMS IN BAG
                    </div>
                </div>

                {cartItems.length > 0 ? (
                    <div className="flex flex-col lg:grid lg:grid-cols-12 gap-12">
                        {/* Cart Items List */}
                        <div className="lg:col-span-8 space-y-4">
                            {cartItems.map((item) => (
                                <div key={item.id} className="bg-white p-5 md:p-6 rounded-2xl border border-dark/5 shadow-minimal hover:shadow-2xl hover:shadow-dark/5 transition-all group overflow-hidden relative">
                                    <div className="flex flex-col md:flex-row gap-8 items-center relative z-10">
                                        {/* Image */}
                                        <div className="w-24 h-24 md:w-32 md:h-32 bg-heritage-paper rounded-xl overflow-hidden shrink-0 shadow-sm">
                                            <img
                                                src={item.image ? (item.image.startsWith('http') ? item.image : `/uploads/${item.image.replace(/^\//, '')}`) : 'https://images.unsplash.com/photo-1560343090-f0409e92791a?auto=format&fit=crop&q=80&w=800'}
                                                alt={item.name}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                            />
                                        </div>

                                        {/* Details */}
                                        <div className="flex-1 text-center md:text-left">
                                            <h3 className="font-black text-lg md:text-xl text-dark tracking-tighter mb-1 transition-colors">
                                                {item.name}
                                            </h3>
                                            <p className="text-[9px] font-black text-dark/20 uppercase tracking-[0.2em] mb-4">PRICE: ৳{parseFloat(item.price).toLocaleString()}</p>

                                            <div className="flex flex-col md:flex-row items-center gap-6">
                                                <div className="bg-dark/5 p-1 rounded-lg flex items-center gap-1">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        className="w-8 h-8 flex items-center justify-center text-dark/40 hover:text-primary hover:bg-dark rounded-md transition-all shadow-sm"
                                                    >
                                                        <Minus size={12} />
                                                    </button>
                                                    <span className="w-8 text-center font-black text-xs text-dark">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        className="w-8 h-8 flex items-center justify-center text-dark/40 hover:text-primary hover:bg-dark rounded-md transition-all shadow-sm"
                                                    >
                                                        <Plus size={12} />
                                                    </button>
                                                </div>
                                                <button
                                                    onClick={() => removeItem(item.id)}
                                                    className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.2em] text-dark/20 hover:text-rose-600 transition-all"
                                                >
                                                    <Trash2 size={14} /> REMOVE
                                                </button>
                                            </div>
                                        </div>

                                        {/* Total Price */}
                                        <div className="md:text-right shrink-0">
                                            <p className="text-xl md:text-2xl font-black text-dark tracking-tighter">৳{(item.price * item.quantity).toLocaleString()}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            <div className="pt-8">
                                <Link href={route('shop')} className="inline-flex items-center gap-3 text-slate-800 hover:text-emerald-600 transition-all font-black text-xs uppercase tracking-widest group">
                                    <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> কেনাকাটা চালিয়ে যান
                                </Link>
                            </div>
                        </div>

                        {/* Summary */}
                        <div className="lg:col-span-4 lg:sticky lg:top-32 h-fit">
                            <div className="bg-white rounded-[2rem] p-8 border border-dark/5 shadow-2xl shadow-dark/5 overflow-hidden">
                                <h2 className="text-xl font-black text-dark tracking-tighter mb-8">হিসাব সারসংক্ষেপ</h2>

                                <div className="space-y-4 mb-8 pb-8 border-b border-dark/5">
                                    <div className="flex justify-between items-center text-[10px] font-black text-dark/30 uppercase tracking-widest">
                                        <span>SUBTOTAL</span>
                                        <span className="text-dark">৳{subtotal.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-[10px] font-black text-dark/30 uppercase tracking-widest">
                                        <div className="flex items-center gap-2">
                                            <span>OFFER CODE</span>
                                            {coupon && (
                                                <span className="px-2 py-0.5 bg-dark text-primary rounded-md text-[8px] font-black tracking-widest uppercase">
                                                    {coupon.code}
                                                </span>
                                            )}
                                        </div>
                                        <span className="text-rose-500">-৳{discount.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-[10px] font-black text-dark/30 uppercase tracking-widest">
                                        <span>SHIPPING</span>
                                        <span className="text-dark">{shipping === 0 ? 'FREE' : `৳${shipping}`}</span>
                                    </div>
                                    <div className="flex justify-between items-center pt-4">
                                        <span className="text-lg font-black text-dark tracking-tighter uppercase">Total</span>
                                        <span className="text-3xl font-black text-dark tracking-tighter">৳{total.toLocaleString()}</span>
                                    </div>
                                </div>

                                {/* Coupon */}
                                <div className="mb-8 relative z-10">
                                    <p className="font-black text-[8px] uppercase tracking-widest text-dark/20 mb-4 px-1">APPLY COUPON</p>
                                    {coupon ? (
                                        <div className="flex items-center justify-between bg-dark text-primary p-4 rounded-xl border border-dark shadow-lg">
                                            <div className="flex items-center gap-2">
                                                <Ticket size={16} />
                                                <span className="text-[10px] font-black">{coupon.code} APPLIED</span>
                                            </div>
                                            <button onClick={removeCoupon} className="text-primary/40 hover:text-rose-500 transition-colors">
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    ) : (
                                        <form onSubmit={applyCoupon} className="relative">
                                            <input
                                                type="text"
                                                placeholder="..."
                                                value={data.code}
                                                onChange={(e) => setData('code', e.target.value)}
                                                className="w-full bg-dark/5 border border-dark/5 rounded-xl px-5 py-4 text-xs font-black focus:ring-0 focus:border-dark transition-all placeholder:text-dark/10"
                                            />
                                            <button
                                                disabled={processing}
                                                className="absolute right-1.5 top-1.5 bottom-1.5 bg-dark text-primary px-4 rounded-lg font-black text-[9px] uppercase tracking-widest hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
                                            >
                                                APPLY
                                            </button>
                                        </form>
                                    )}
                                </div>

                                <Link
                                    href={route('checkout')}
                                    className="w-full bg-dark text-primary py-5 rounded-xl font-black text-xs uppercase tracking-[0.2em] shadow-2xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 group"
                                >
                                    PROCEED TO CHECKOUT <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </Link>

                                <div className="mt-10 flex flex-col gap-5 relative z-10">
                                    <div className="flex items-center gap-4 text-dark/30">
                                        <ShieldCheck size={18} className="text-primary/60" />
                                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">নিরাপদ পেমেন্ট সার্ভিস</span>
                                    </div>
                                    <div className="flex items-center gap-4 text-dark/30">
                                        <Truck size={18} className="text-primary/60" />
                                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">নিরাপদ ও দ্রুত ডেলিভারি</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="bg-heritage-paper rounded-[5rem] p-24 py-40 border border-dark/5 shadow-minimal flex flex-col items-center text-center relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-64 h-64 bg-primary opacity-[0.02] -translate-x-1/2 -translate-y-1/2 blur-3xl rounded-full" />
                        <div className="w-32 h-32 bg-dark/5 rounded-[2.5rem] flex items-center justify-center text-dark/10 mb-10 shadow-minimal">
                            <ShoppingBag size={56} />
                        </div>
                        <h2 className="text-4xl font-black text-dark mb-6 tracking-tighter">আপনার ঝুলি একদম খালি</h2>
                        <p className="text-dark/40 font-bold max-w-sm mb-16 text-xl leading-relaxed">এখনো আপনার ঝুলি তে কোনো ঐতিহ্যবাহী পণ্য যুক্ত করেননি। কেনাকাটা শুরু করতে নিচের বাটনে ক্লিক করুন।</p>
                        <Link
                            href={route('shop')}
                            className="bg-dark text-primary px-16 py-6 rounded-[2rem] font-black text-xs uppercase tracking-[0.3em] shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-4 group"
                        >
                            <ChevronLeft size={22} className="group-hover:-translate-x-1 transition-transform" /> কেনাকাটা শুরু করুন
                        </Link>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
