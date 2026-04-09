import React from 'react';
import CustomerLayout from '@/Layouts/CustomerLayout';
import { Head, Link } from '@inertiajs/react';
import {
    ShoppingBag,
    ArrowLeft,
    Printer,
    MapPin,
    Phone,
    User,
    Calendar,
    ChevronRight,
    CheckCircle2,
    Truck,
    Package,
    Settings,
    Download
} from 'lucide-react';
import { usePage } from '@inertiajs/react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export default function OrderShow({ order }) {
    const statusSteps = ['pending', 'processing', 'shipped', 'delivered'];
    const currentStepIndex = statusSteps.indexOf(order.order_status);

    return (
        <CustomerLayout>
            {usePage().props.flash?.success && (
                <div className="bg-emerald-600 text-white p-8 rounded-[2.5rem] mb-12 flex items-center gap-6 shadow-2xl shadow-emerald-100 animate-in fade-in slide-in-from-top-4 duration-700">
                    <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center shrink-0 border border-white/20 animate-pulse">
                        <CheckCircle2 size={32} />
                    </div>
                    <div>
                        <h2 className="text-2xl font-black mb-1 tracking-tight uppercase">অর্ডার সফলভাবে গ্রহণ করা হয়েছে!</h2>
                        <p className="text-emerald-50 text-sm font-medium opacity-90">{usePage().props.flash.success}</p>
                    </div>
                </div>
            )}

            <div className="space-y-10">
                <div className="flex items-center gap-6">
                    <Link href={route('customer.orders')} className="w-12 h-12 bg-white border border-slate-100 rounded-2xl flex items-center justify-center text-slate-400 hover:text-emerald-600 hover:border-emerald-100 transition-all shadow-sm group">
                        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                    </Link>
                    <div>
                        <h1 className="text-3xl font-black text-slate-800 tracking-tight mb-1 uppercase">Order #{order.order_number}</h1>
                        <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                            <Calendar size={14} />
                            Placed on {new Date(order.created_at).toLocaleDateString()}
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <a
                        href={route('orders.invoice.download.customer', order.id)}
                        className="bg-white border border-slate-100 text-slate-400 hover:text-emerald-600 hover:border-emerald-100 px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center gap-2 transition-all shadow-sm active:scale-95"
                    >
                        <Download size={16} /> Download Invoice
                    </a>
                    <span className={cn(
                        "px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg",
                        order.order_status === 'pending' ? "bg-amber-100 text-amber-600 shadow-amber-50" :
                            order.order_status === 'delivered' ? "bg-emerald-100 text-emerald-600 shadow-emerald-50" :
                                "bg-emerald-600 text-white shadow-emerald-100"
                    )}>
                        {order.order_status}
                    </span>
                </div>
            </div>

            {/* Tracking Progress */}
            <div className="bg-white p-12 rounded-[3.5rem] border border-slate-100 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50/50 rounded-full blur-3xl -mr-32 -mt-32"></div>
                <div className="relative z-10">
                    <div className="flex flex-wrap justify-between gap-8 mb-4">
                        {statusSteps.map((step, i) => (
                            <div key={step} className="flex-1 min-w-[120px] flex flex-col items-center group">
                                <div className={cn(
                                    "w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-all duration-700",
                                    i <= currentStepIndex ? "bg-emerald-600 text-white scale-110 shadow-xl shadow-emerald-200" : "bg-slate-50 text-slate-300"
                                )}>
                                    {i === 0 && <Package size={20} />}
                                    {i === 1 && <Settings size={20} />}
                                    {i === 2 && <Truck size={20} />}
                                    {i === 3 && <CheckCircle2 size={20} />}
                                </div>
                                <span className={cn(
                                    "text-[10px] font-black uppercase tracking-[2px] text-center",
                                    i <= currentStepIndex ? "text-slate-800" : "text-slate-300"
                                )}>
                                    {step}
                                </span>
                                {i < statusSteps.length - 1 && (
                                    <div className="hidden lg:block absolute h-0.5 bg-slate-100 top-18 left-0 right-0 -z-10 mx-auto w-full"></div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Items */}
                <div className="lg:col-span-8 space-y-6">
                    <section className="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden">
                        <div className="p-8 border-b border-slate-50">
                            <h3 className="text-xl font-black text-slate-800 tracking-tight flex items-center gap-3">
                                <ShoppingBag size={20} className="text-emerald-600" /> Items Summary
                            </h3>
                        </div>
                        <div className="divide-y divide-slate-50">
                            {order.items.map((item) => (
                                <div key={item.id} className="p-8 flex items-center gap-6 group hover:bg-slate-50/30 transition-colors">
                                    <div className="w-20 h-20 bg-slate-50 rounded-2xl overflow-hidden shrink-0">
                                        {/* We might need product thumbnail here, assuming it's available or use placeholder */}
                                        <div className="w-full h-full flex items-center justify-center text-slate-200">
                                            <Package size={32} />
                                        </div>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-black text-slate-800 tracking-tight group-hover:text-emerald-600 transition-colors truncate">{item.product_name}</h4>
                                        <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-widest">Unit Price: ৳{parseFloat(item.price).toLocaleString()}</p>
                                    </div>
                                    <div className="text-right shrink-0">
                                        <p className="text-sm font-black text-slate-900 mb-1">৳{(item.price * item.qty).toLocaleString()}</p>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">QTY: {item.qty}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Summary & Shipping */}
                <div className="lg:col-span-4 space-y-8">
                    <div className="bg-slate-900 rounded-[3.5rem] p-10 text-white shadow-3xl shadow-slate-200 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-600 opacity-20 blur-2xl rounded-full -mr-16 -mt-16"></div>
                        <h3 className="text-xl font-black mb-10 tracking-tight flex items-center gap-3">
                            <Truck size={20} className="text-emerald-500" /> Delivery Details
                        </h3>

                        <div className="space-y-8">
                            <div className="flex gap-4">
                                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-white/40 shrink-0">
                                    <User size={18} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Receiver</p>
                                    <p className="text-sm font-bold text-emerald-100">{order.user?.name || 'Valued Customer'}</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-white/40 shrink-0">
                                    <Phone size={18} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Contact</p>
                                    <p className="text-sm font-bold text-emerald-100">{order.phone}</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-white/40 shrink-0">
                                    <MapPin size={18} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Address</p>
                                    <p className="text-sm font-bold text-emerald-100 leading-relaxed">{order.shipping_address}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-[3.5rem] p-10 border border-slate-100 shadow-sm">
                        <h3 className="text-xl font-black text-slate-800 mb-8 tracking-tight">Bill Overview</h3>
                        <div className="space-y-4 mb-8">
                            <div className="flex justify-between text-sm font-bold text-slate-400">
                                <span>Subtotal</span>
                                <span className="text-slate-700">৳{parseFloat(order.subtotal).toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-sm font-bold text-slate-400">
                                <span>Shipping</span>
                                <span className="text-slate-700">৳{parseFloat(order.shipping_cost).toLocaleString()}</span>
                            </div>
                            {order.discount > 0 && (
                                <div className="flex justify-between text-sm font-bold text-rose-400">
                                    <span>Discount</span>
                                    <span className="font-black">-৳{parseFloat(order.discount).toLocaleString()}</span>
                                </div>
                            )}
                            <div className="h-px bg-slate-50 my-2"></div>
                            <div className="flex justify-between items-baseline pt-2">
                                <span className="text-lg font-black text-slate-800">Total</span>
                                <span className="text-3xl font-black text-emerald-600 tracking-tighter">৳{parseFloat(order.total).toLocaleString()}</span>
                            </div>
                        </div>
                        <div className="p-4 bg-slate-50 rounded-2xl flex items-center justify-between">
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Payment</span>
                            <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600">{order.payment_method}</span>
                        </div>
                    </div>
                </div>
            </div>
        </CustomerLayout>
    );
}
