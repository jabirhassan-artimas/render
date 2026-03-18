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
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div>
                        <nav className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400 mb-4">
                            <Link href="/">Home</Link>
                            <ChevronLeft size={10} className="rotate-180" />
                            <span className="text-blue-600">Shopping Bag</span>
                        </nav>
                        <h1 className="text-4xl md:text-6xl font-black text-slate-800 tracking-tight leading-tight">
                            My Cart
                        </h1>
                    </div>
                    <p className="text-slate-400 font-bold text-sm bg-white px-6 py-3 rounded-2xl border border-slate-100 italic">
                        {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your bag
                    </p>
                </div>

                {cartItems.length > 0 ? (
                    <div className="flex flex-col lg:grid lg:grid-cols-12 gap-12">
                        {/* Cart Items List */}
                        <div className="lg:col-span-8 space-y-6">
                            {cartItems.map((item) => (
                                <div key={item.id} className="bg-white p-6 md:p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-blue-50 transition-all group">
                                    <div className="flex flex-col md:flex-row gap-8 items-center">
                                        {/* Image */}
                                        <div className="w-32 h-32 md:w-40 md:h-40 bg-slate-50 rounded-3xl overflow-hidden shrink-0">
                                            <img 
                                                src={item.image ? (item.image.startsWith('http') ? item.image : `/storage/${item.image.replace(/^\//, '')}`) : 'https://images.unsplash.com/photo-1560343090-f0409e92791a?auto=format&fit=crop&q=80&w=800'} 
                                                alt={item.name}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                                            />
                                        </div>

                                        {/* Details */}
                                        <div className="flex-1 text-center md:text-left">
                                            <h3 className="font-black text-xl text-slate-800 tracking-tight mb-2 group-hover:text-blue-600 transition-colors">
                                                {item.name}
                                            </h3>
                                            <p className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Unit Price: ৳{parseFloat(item.price).toLocaleString()}</p>
                                            
                                            <div className="flex flex-col md:flex-row items-center gap-6">
                                                <div className="bg-slate-50 p-1 rounded-xl flex items-center gap-1 border border-slate-100">
                                                    <button 
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:bg-white rounded-lg transition-all"
                                                    >
                                                        <Minus size={16} />
                                                    </button>
                                                    <span className="w-10 text-center font-black text-slate-800">{item.quantity}</span>
                                                    <button 
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:bg-white rounded-lg transition-all"
                                                    >
                                                        <Plus size={16} />
                                                    </button>
                                                </div>
                                                <button 
                                                    onClick={() => removeItem(item.id)}
                                                    className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-rose-400 hover:text-rose-600 transition-all"
                                                >
                                                    <Trash2 size={16} /> Remove
                                                </button>
                                            </div>
                                        </div>

                                        {/* Total Price */}
                                        <div className="md:text-right shrink-0">
                                            <p className="text-2xl font-black text-slate-900 tracking-tight">৳{(item.price * item.quantity).toLocaleString()}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            <div className="pt-8">
                                <Link href={route('shop')} className="inline-flex items-center gap-3 text-slate-800 hover:text-blue-600 transition-all font-black text-xs uppercase tracking-widest group">
                                    <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Continue Shopping
                                </Link>
                            </div>
                        </div>

                        {/* Summary */}
                        <div className="lg:col-span-4 space-y-8">
                            <div className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-2xl shadow-blue-50/50 sticky top-32">
                                <h2 className="text-2xl font-black text-slate-800 tracking-tight mb-8">Summary</h2>
                                
                                <div className="space-y-6 mb-10 pb-8 border-b border-slate-50">
                                    <div className="flex justify-between items-center text-sm font-bold text-slate-500">
                                        <span>Subtotal</span>
                                        <span className="text-slate-800">৳{subtotal.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm font-bold text-slate-500">
                                        <div className="flex items-center gap-2">
                                            <span>Discount</span>
                                            {coupon && (
                                                <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 rounded-lg text-[10px] uppercase font-black tracking-widest">
                                                    {coupon.code}
                                                </span>
                                            )}
                                        </div>
                                        <span className="text-rose-500 font-black">-৳{discount.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm font-bold text-slate-500">
                                        <span>Shipping</span>
                                        <span className="text-slate-800">{shipping === 0 ? 'Free' : `৳${shipping}`}</span>
                                    </div>
                                    <div className="flex justify-between items-center pt-4">
                                        <span className="text-lg font-black text-slate-800">Total</span>
                                        <span className="text-3xl font-black text-blue-600 tracking-tighter">৳{total.toLocaleString()}</span>
                                    </div>
                                </div>

                                {/* Coupon */}
                                <div className="mb-10">
                                    <h4 className="font-black text-[10px] uppercase tracking-widest text-slate-400 mb-4 px-1">Promotional Code</h4>
                                    {coupon ? (
                                        <div className="flex items-center justify-between bg-emerald-50 p-4 rounded-2xl border border-emerald-100">
                                            <div className="flex items-center gap-2">
                                                <Ticket className="text-emerald-500" size={18} />
                                                <span className="text-sm font-black text-emerald-700">{coupon.code} Applied</span>
                                            </div>
                                            <button onClick={removeCoupon} className="text-emerald-300 hover:text-rose-500 transition-colors">
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    ) : (
                                        <form onSubmit={applyCoupon} className="relative">
                                            <input 
                                                type="text" 
                                                placeholder="Enter code..." 
                                                value={data.code}
                                                onChange={(e) => setData('code', e.target.value)}
                                                className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 text-sm font-bold focus:ring-2 focus:ring-blue-100"
                                            />
                                            <button 
                                                disabled={processing}
                                                className="absolute right-2 top-2 bottom-2 bg-slate-900 text-white px-6 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-800 transition-all disabled:opacity-50"
                                            >
                                                Apply
                                            </button>
                                        </form>
                                    )}
                                    {errors.code && <p className="text-rose-500 text-[10px] font-bold mt-2 px-1">{errors.code}</p>}
                                </div>

                                <Link 
                                    href={route('checkout')}
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-5 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-blue-200 transition-all flex items-center justify-center gap-3 group active:scale-[0.98]"
                                >
                                    Proceed to Checkout <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </Link>

                                <div className="mt-8 flex flex-col gap-4">
                                    <div className="flex items-center gap-3 text-slate-400">
                                        <ShieldCheck size={16} />
                                        <span className="text-[10px] font-bold uppercase tracking-widest">Encrypted & Secure</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-slate-400">
                                        <Truck size={16} />
                                        <span className="text-[10px] font-bold uppercase tracking-widest">Insured Global Delivery</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="bg-white rounded-[4rem] p-20 py-32 border border-slate-100 shadow-sm flex flex-col items-center text-center">
                        <div className="w-24 h-24 bg-slate-100 rounded-3xl flex items-center justify-center text-slate-200 mb-8">
                            <ShoppingBag size={48} />
                        </div>
                        <h2 className="text-3xl font-black text-slate-800 mb-4 tracking-tight">Your bag is empty</h2>
                        <p className="text-slate-500 font-medium max-w-sm mb-12">Looks like you haven't added anything to your bag yet. Explore our curated collections to find your style.</p>
                        <Link 
                            href={route('shop')}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-5 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-blue-100 transition-all flex items-center gap-3 group active:scale-95"
                        >
                            <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Explore Shop
                        </Link>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
