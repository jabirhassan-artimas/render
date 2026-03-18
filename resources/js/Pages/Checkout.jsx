import React, { useState } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { 
    CreditCard, 
    Truck, 
    MapPin, 
    Phone, 
    User,
    ShieldCheck,
    ChevronRight,
    Loader2,
    ShoppingBag,
    ArrowRight
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export default function Checkout({ cart, coupon, shipping_methods, payment_gateways }) {
    const { auth } = usePage().props;
    const cartItems = Object.entries(cart || {}).map(([id, item]) => ({ id, ...item }));
    
    const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const discount = coupon ? (coupon.discount_amount || (subtotal * coupon.discount_percentage / 100)) : 0;
    
    // Choose first method safely as default
    const [shippingMethodId, setShippingMethodId] = useState(shipping_methods?.[0]?.id || '');
    
    // Find the current selected method object
    const selectedShippingMethod = shipping_methods?.find(m => m.id === shippingMethodId);
    const shippingCost = selectedShippingMethod ? parseFloat(selectedShippingMethod.cost) : 0;
    
    const total = subtotal - discount + shippingCost;

    const { data, setData, post, processing, errors } = useForm({
        name: auth.user?.name || '',
        phone: auth.user?.phone || '',
        address: auth.user?.address || '',
        shipping_method_id: shipping_methods?.[0]?.id || '',
        payment_method: payment_gateways?.[0]?.code || 'cod'
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('order.place'));
    };

    return (
        <AppLayout>
            <Head title="Checkout" />

            <div className="container mx-auto px-4 md:px-6 py-12">
                <div className="mb-12">
                    <nav className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400 mb-4">
                        <Link href="/cart" className="hover:text-blue-600 transition-colors">Bag</Link>
                        <ChevronRight size={12} />
                        <span className="text-blue-600">Checkout</span>
                    </nav>
                    <h1 className="text-4xl md:text-6xl font-black text-slate-800 tracking-tight leading-tight">
                        Final Step
                    </h1>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col lg:grid lg:grid-cols-12 gap-16">
                    {/* Shipping Info */}
                    <div className="lg:col-span-7 space-y-12">
                        <section>
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-100">
                                    <MapPin size={20} />
                                </div>
                                <h2 className="text-2xl font-black text-slate-800 tracking-tight">Shipping Information</h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 px-1">Full Name</label>
                                    <div className="relative">
                                        <User className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                                        <input 
                                            type="text" 
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            placeholder="Receiver's name"
                                            className="w-full bg-white border border-slate-100 pl-14 pr-6 py-4 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-blue-100 transition-all shadow-sm"
                                        />
                                    </div>
                                    {errors.name && <p className="text-rose-500 text-[10px] font-bold mt-1">{errors.name}</p>}
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 px-1">Phone Number</label>
                                    <div className="relative">
                                        <Phone className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                                        <input 
                                            type="tel" 
                                            value={data.phone}
                                            onChange={(e) => setData('phone', e.target.value)}
                                            placeholder="01XXXXXXXXX"
                                            className="w-full bg-white border border-slate-100 pl-14 pr-6 py-4 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-blue-100 transition-all shadow-sm"
                                        />
                                    </div>
                                    {errors.phone && <p className="text-rose-500 text-[10px] font-bold mt-1">{errors.phone}</p>}
                                </div>

                                <div className="md:col-span-2 space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 px-1">Detailed Address</label>
                                    <textarea 
                                        value={data.address}
                                        onChange={(e) => setData('address', e.target.value)}
                                        placeholder="Flat, Road, Area, City"
                                        rows="4"
                                        className="w-full bg-white border border-slate-100 px-6 py-4 rounded-3xl text-sm font-bold focus:ring-2 focus:ring-blue-100 transition-all shadow-sm resize-none"
                                    ></textarea>
                                    {errors.address && <p className="text-rose-500 text-[10px] font-bold mt-1">{errors.address}</p>}
                                </div>
                            </div>
                        </section>

                        <section>
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-100">
                                    <Truck size={20} />
                                </div>
                                <h2 className="text-2xl font-black text-slate-800 tracking-tight">Delivery Choice</h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {shipping_methods?.map((method) => (
                                    <button 
                                        key={method.id}
                                        type="button"
                                        onClick={() => {
                                            setShippingMethodId(method.id);
                                            setData('shipping_method_id', method.id);
                                        }}
                                        className={cn(
                                            "p-6 rounded-[2.5rem] border-2 text-left transition-all relative overflow-hidden group",
                                            shippingMethodId === method.id 
                                                ? "border-blue-600 bg-blue-50/50" 
                                                : "border-slate-50 bg-white hover:border-slate-200"
                                        )}
                                    >
                                        {shippingMethodId === method.id && (
                                            <div className="absolute top-4 right-4 text-blue-600">
                                                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white">
                                                    <ChevronRight size={14} className="rotate-90" />
                                                </div>
                                            </div>
                                        )}
                                        <p className={cn(
                                            "font-black text-lg transition-colors",
                                            shippingMethodId === method.id ? "text-blue-600" : "text-slate-800"
                                        )}>{method.name}</p>
                                        <p className="text-slate-400 font-bold text-xs mt-1">{method.description}</p>
                                        <p className="mt-4 font-black text-slate-900">৳{parseFloat(method.cost).toLocaleString()}</p>
                                    </button>
                                ))}
                            </div>
                        </section>

                        <section>
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-100">
                                    <CreditCard size={20} />
                                </div>
                                <h2 className="text-2xl font-black text-slate-800 tracking-tight">Payment Method</h2>
                            </div>

                            <div className="space-y-4">
                                {payment_gateways?.map(gateway => {
                                    const icons = { CreditCard, ShoppingBag, ShieldCheck };
                                    const IconComponent = icons[gateway.icon] || CreditCard;

                                    return (
                                    <button 
                                        key={gateway.id}
                                        type="button"
                                        onClick={() => setData('payment_method', gateway.code)}
                                        className={cn(
                                            "w-full text-left p-6 rounded-[2rem] relative overflow-hidden transition-all group border-2",
                                            data.payment_method === gateway.code 
                                                ? "bg-slate-900 border-slate-900 shadow-xl shadow-slate-900/20" 
                                                : "bg-white border-slate-100 hover:border-slate-300"
                                        )}
                                    >
                                        <div className={cn(
                                            "absolute top-0 right-0 w-64 h-64 opacity-20 blur-[80px] rounded-full -mr-32 -mt-32 transition-colors",
                                            data.payment_method === gateway.code ? "bg-blue-600" : "bg-slate-300"
                                        )}></div>
                                        <div className="relative z-10 flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <div className={cn(
                                                    "w-12 h-12 rounded-2xl flex items-center justify-center border transition-colors",
                                                    data.payment_method === gateway.code 
                                                        ? "bg-white/10 text-white border-white/10"
                                                        : "bg-slate-50 text-slate-800 border-slate-100"
                                                )}>
                                                    <IconComponent size={24} />
                                                </div>
                                                <div>
                                                    <p className={cn(
                                                        "font-black text-lg transition-colors",
                                                        data.payment_method === gateway.code ? "text-white" : "text-slate-800"
                                                    )}>{gateway.name}</p>
                                                    <p className={cn(
                                                        "text-xs font-bold uppercase tracking-widest transition-colors",
                                                        data.payment_method === gateway.code ? "text-slate-400" : "text-slate-500"
                                                    )}>{gateway.description}</p>
                                                </div>
                                            </div>
                                            <div className={cn(
                                                "w-6 h-6 rounded-full border-4 transition-all duration-300",
                                                data.payment_method === gateway.code 
                                                    ? "border-blue-600 bg-white ring-4 ring-slate-800"
                                                    : "border-slate-200 bg-transparent group-hover:border-blue-400"
                                            )}></div>
                                        </div>
                                    </button>
                                    );
                                })}
                            </div>
                        </section>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-5">
                        <div className="bg-white rounded-[4rem] p-10 border border-slate-100 shadow-2xl shadow-blue-100/30 sticky top-32">
                            <h2 className="text-2xl font-black text-slate-800 tracking-tight mb-8">Order Review</h2>
                            
                            <div className="space-y-6 max-h-[400px] overflow-y-auto no-scrollbar mb-10 pr-2">
                                {cartItems.map((item) => (
                                    <div key={item.id} className="flex gap-4">
                                        <div className="w-16 h-16 bg-slate-50 rounded-2xl overflow-hidden shrink-0">
                                            <img src={item.image ? (item.image.startsWith('http') ? item.image : `/storage/${item.image.replace(/^\//, '')}`) : 'https://images.unsplash.com/photo-1560343090-f0409e92791a?auto=format&fit=crop&q=80&w=800'} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-black text-slate-800 text-sm truncate">{item.name}</p>
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">QTY: {item.quantity} × ৳{parseFloat(item.price).toLocaleString()}</p>
                                        </div>
                                        <div className="text-right shrink-0">
                                            <p className="font-black text-slate-900 text-sm">৳{(item.price * item.quantity).toLocaleString()}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-4 pt-8 border-t border-slate-50 mb-10">
                                <div className="flex justify-between items-center text-sm font-bold text-slate-400">
                                    <span>Subtotal</span>
                                    <span className="text-slate-700">৳{subtotal.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm font-bold text-slate-400">
                                    <span>Discount</span>
                                    <span className="text-rose-500 font-black">-৳{discount.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm font-bold text-slate-400">
                                    <span>Shipping</span>
                                    <span className="text-slate-700">৳{shippingCost}</span>
                                </div>
                                <div className="flex justify-between items-center pt-4">
                                    <span className="text-xl font-black text-slate-800">Total</span>
                                    <span className="text-4xl font-black text-blue-600 tracking-tighter">৳{total.toLocaleString()}</span>
                                </div>
                            </div>

                            <button 
                                disabled={processing}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 rounded-3xl font-black text-sm uppercase tracking-widest shadow-2xl shadow-blue-200 transition-all flex items-center justify-center gap-3 disabled:opacity-50 group active:scale-[0.98]"
                            >
                                {processing ? (
                                    <Loader2 className="animate-spin" size={24} />
                                ) : (
                                    <>Place Secure Order <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" /></>
                                )}
                            </button>

                            <div className="mt-10 p-6 bg-slate-50 rounded-[2rem] border border-slate-100 flex items-center gap-4">
                                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-emerald-500 shadow-sm">
                                    <ShieldCheck size={24} />
                                </div>
                                <p className="text-[10px] font-bold text-slate-500 uppercase leading-relaxed tracking-widest">
                                    By placing an order, you agree to our Terms of service and Return policy.
                                </p>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
