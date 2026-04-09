import React, { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm, router } from '@inertiajs/react';
import {
    ChevronLeft,
    Truck,
    CreditCard,
    User,
    Phone,
    MapPin,
    Clock,
    Package,
    ExternalLink,
    CheckCircle2,
    XCircle,
    AlertCircle,
    ShoppingBag,
    MessageSquare,
    Save,
    Star,
    ShieldCheck,
    Globe,
    FileText,
    ArrowDownRight,
    Mail,
    Download
} from 'lucide-react';

function cn(...inputs) {
    return inputs.filter(Boolean).join(' ');
}

export default function Show({ order, couriers = [] }) {
    const { data, setData, patch, processing } = useForm({
        order_status: order.order_status,
        cancellation_reason: order.cancellation_reason || '',
        order_notes: order.order_notes || '',
        courier_id: order.courier_id || '',
        delivery_partner_rating: order.delivery_partner_rating || 0,
    });

    const updateStatus = (status) => {
        setData('order_status', status);
        router.patch(route('admin.orders.updateStatus', order.id), {
            order_status: status,
            cancellation_reason: data.cancellation_reason
        }, {
            preserveScroll: true,
        });
    };

    const saveNotes = () => {
        router.patch(route('admin.orders.updateNotes', order.id), { order_notes: data.order_notes }, {
            preserveScroll: true,
        });
    };

    const assignCourier = (e) => {
        const courierId = e.target.value;
        setData('courier_id', courierId);
        router.post(route('admin.orders.assignCourier', order.id), { courier_id: courierId }, {
            preserveScroll: true,
        });
    };

    const rateDelivery = (rating) => {
        setData('delivery_partner_rating', rating);
        router.post(route('admin.orders.rateDelivery', order.id), { rating }, {
            preserveScroll: true,
        });
    };

    return (
        <AdminLayout>
            <Head title={`Order #${order.order_number}`} />

            <div className="max-w-6xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
                {/* Header Actions */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                        <Link
                            href={route('admin.orders.index')}
                            className="p-3 bg-white border border-slate-100 text-slate-400 hover:text-emerald-600 rounded-2xl transition-all shadow-sm group"
                        >
                            <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                        </Link>
                        <div>
                            <div className="flex items-center gap-3 mb-1">
                                <h1 className="text-3xl font-black text-slate-800 tracking-tight">Order #{order.order_number}</h1>
                                <span className={cn(
                                    "px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest",
                                    order.order_status === 'delivered' ? "bg-emerald-500/10 text-emerald-600" : "bg-emerald-500/10 text-emerald-600"
                                )}>
                                    {order.order_status}
                                </span>
                            </div>
                            <div className="flex items-center gap-2 text-slate-500 text-sm font-medium">
                                <Globe size={14} className="text-slate-300" />
                                <span>Source: <span className="font-black text-slate-900 uppercase tracking-widest text-[10px]">{order.order_source || 'Web'}</span></span>
                                <span className="mx-2">•</span>
                                <span>Placed on {new Date(order.created_at).toLocaleString()}</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {['pending', 'processing', 'shipped', 'delivered', 'cancelled', 'returned'].map((status) => (
                            <button
                                key={status}
                                onClick={() => updateStatus(status)}
                                disabled={processing || order.order_status === status}
                                className={cn(
                                    "px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all active:scale-95 disabled:opacity-50",
                                    order.order_status === status
                                        ? "bg-slate-900 text-white shadow-xl shadow-slate-200"
                                        : "bg-white text-slate-400 border border-slate-100 hover:border-slate-300"
                                )}
                            >
                                {status}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Left & Middle: Items & Summary */}
                    <div className="lg:col-span-2 space-y-12">
                        {/* Order Items */}
                        <section className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-sm relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50/50 rounded-full -mr-32 -mt-32"></div>
                            <div className="relative">
                                <div className="flex justify-between items-center mb-10">
                                    <h3 className="text-xl font-black text-slate-800 tracking-tight flex items-center gap-3">
                                        <ShoppingBag size={20} className="text-emerald-600" /> Cart Contents
                                    </h3>
                                    <div className="flex gap-2">
                                        <Link
                                            href={route('admin.orders.invoice', order.id)}
                                            className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest bg-emerald-50 text-emerald-600 px-4 py-2 rounded-xl hover:bg-emerald-100 transition-all"
                                            target="_blank"
                                        >
                                            <FileText size={14} /> Preview
                                        </Link>
                                        <a
                                            href={route('admin.orders.invoice.download', order.id)}
                                            className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest bg-slate-900 text-white px-4 py-2 rounded-xl hover:bg-slate-800 transition-all shadow-lg shadow-slate-200"
                                        >
                                            <Download size={14} /> PDF
                                        </a>
                                    </div>
                                </div>

                                <div className="space-y-8">
                                    {order.items?.map((item) => (
                                        <div key={item.id} className="flex gap-6 items-center">
                                            <div className="w-24 h-24 bg-slate-50 rounded-3xl overflow-hidden shadow-inner border border-slate-100 shrink-0">
                                                <img
                                                    src={item.product?.thumbnail ? (item.product.thumbnail.startsWith('http') ? item.product.thumbnail : `/uploads/${item.product.thumbnail.replace(/^\//, '')}`) : '/placeholder-product.jpg'}
                                                    className="w-full h-full object-cover"
                                                    onError={(e) => e.target.src = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200'}
                                                />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <Link
                                                    href={route('admin.products.edit', item.product_id)}
                                                    className="font-black text-slate-800 text-lg hover:text-emerald-600 transition-colors block truncate"
                                                >
                                                    {item.product_name || item.product?.name || 'Unknown Product'}
                                                </Link>
                                                <div className="flex items-center gap-4 mt-2">
                                                    <p className="text-xs font-bold text-slate-400">QTY: <span className="text-slate-900">{item.qty}</span></p>
                                                    <p className="text-xs font-bold text-slate-400">Unit: <span className="text-slate-900">৳{parseFloat(item.price).toLocaleString()}</span></p>
                                                </div>
                                            </div>
                                            <div className="text-right shrink-0">
                                                <p className="text-xl font-black text-slate-900 tracking-tight">৳{(item.price * item.qty).toLocaleString()}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-12 pt-10 border-t border-slate-50 space-y-4">
                                    <div className="flex justify-between items-center text-sm font-bold text-slate-400 px-2">
                                        <span>Initial Subtotal</span>
                                        <span className="text-slate-700">৳{parseFloat(order.subtotal || 0).toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm font-bold text-slate-400 px-2">
                                        <span>Discount Segment</span>
                                        <span className="text-rose-500">-৳{parseFloat(order.discount || 0).toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm font-bold text-slate-400 px-2">
                                        <span>Shipping Toll</span>
                                        <span className="text-slate-700">৳{parseFloat(order.shipping_cost || 0).toLocaleString()}</span>
                                    </div>
                                    {order.discount_on_advance > 0 && (
                                        <div className="flex justify-between items-center text-[10px] font-black uppercase text-emerald-500 px-2 bg-emerald-50/50 py-2 rounded-xl border border-emerald-100/50">
                                            <div className="flex items-center gap-2">
                                                <ArrowDownRight size={14} /> Advance Payment Reward
                                            </div>
                                            <span>-৳{parseFloat(order.discount_on_advance).toLocaleString()}</span>
                                        </div>
                                    )}
                                    <div className="flex justify-between items-center pt-6 px-2">
                                        <span className="text-2xl font-black text-slate-800 tracking-tight">Grand Total</span>
                                        <div className="text-right">
                                            <p className="text-4xl font-black text-emerald-600 tracking-tighter">৳{parseFloat(order.total).toLocaleString()}</p>
                                            <p className={cn(
                                                "text-[10px] font-black uppercase tracking-widest mt-1",
                                                order.payment_status === 'paid' ? "text-emerald-500" : "text-amber-500"
                                            )}>Transaction: {order.payment_status}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-12 pt-10 border-t border-slate-100">
                                    <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6 flex items-center justify-between">
                                        <span className="flex items-center gap-2"><Mail size={12} className="text-emerald-600" /> Invoice Email Automation</span>
                                        <span className={cn(
                                            "capitalize font-black px-3 py-1 rounded-lg text-[9px] tracking-widest",
                                            order.email_sent_status === 'sent' ? "bg-emerald-500/10 text-emerald-600" :
                                                order.email_sent_status === 'failed' ? "bg-rose-500/10 text-rose-600" :
                                                    "bg-slate-100 text-slate-400"
                                        )}>
                                            {order.email_sent_status?.replace('_', ' ') || 'not triggered'}
                                        </span>
                                    </h4>

                                    <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-6 bg-slate-50/50 rounded-3xl border border-slate-100/50">
                                        <div className="text-xs font-bold text-slate-500 leading-relaxed">
                                            {order.email_sent_at
                                                ? `Successfully dispatched on ${new Date(order.email_sent_at).toLocaleString()}`
                                                : "Email automation is waiting for 'Confirmed' status to execute."
                                            }
                                        </div>
                                        <button
                                            onClick={() => router.post(route('admin.orders.invoice.resend', order.id), {}, { preserveScroll: true })}
                                            className="w-full md:w-auto text-[10px] font-black uppercase tracking-widest bg-white text-slate-900 border border-slate-200 px-6 py-3 rounded-2xl hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all shadow-sm active:scale-95"
                                        >
                                            Manual Resend
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Notes & Cancellation */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <section className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-sm">
                                <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-2">
                                    <MessageSquare size={14} /> Operational Voice / Notes
                                </h3>
                                <textarea
                                    className="w-full bg-slate-50 border-none rounded-3xl p-6 text-sm font-bold min-h-[120px] focus:ring-2 focus:ring-emerald-100 transition-all placeholder:text-slate-300 mb-4"
                                    placeholder="Add internal notes for this order..."
                                    value={data.order_notes}
                                    onChange={(e) => setData('order_notes', e.target.value)}
                                ></textarea>
                                <button
                                    onClick={saveNotes}
                                    className="w-full py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
                                >
                                    <Save size={14} /> Persist Notes
                                </button>
                            </section>

                            <section className={cn(
                                "rounded-[3rem] p-10 border transition-all duration-500",
                                order.order_status === 'cancelled' ? "bg-rose-50 border-rose-100" : "bg-white border-slate-100"
                            )}>
                                <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-2">
                                    <XCircle size={14} /> Cancellation Logic
                                </h3>
                                <div className="space-y-4">
                                    <p className="text-sm font-medium text-slate-500">Provide a valid reason for order revocation if status is 'cancelled'.</p>
                                    <textarea
                                        className="w-full bg-slate-50 border-none rounded-3xl p-6 text-sm font-bold min-h-[120px] focus:ring-2 focus:ring-rose-100 transition-all placeholder:text-slate-300"
                                        placeholder="Reason for cancellation..."
                                        value={data.cancellation_reason}
                                        onChange={(e) => setData('cancellation_reason', e.target.value)}
                                        disabled={order.order_status !== 'cancelled' && data.order_status !== 'cancelled'}
                                    ></textarea>
                                    {order.order_status === 'cancelled' && (
                                        <button
                                            onClick={() => updateStatus('cancelled')}
                                            className="w-full py-4 bg-rose-500 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-rose-600 transition-all"
                                        >
                                            Update Reason
                                        </button>
                                    )}
                                </div>
                            </section>
                        </div>
                    </div>

                    {/* Right: Customer & Delivery Info */}
                    <div className="space-y-12">
                        {/* Customer Snapshot */}
                        <section className="bg-slate-900 rounded-[3rem] p-10 relative overflow-hidden text-white shadow-2xl">
                            <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-600 opacity-20 blur-[60px] rounded-full -mr-24 -mt-24"></div>
                            <div className="relative">
                                <div className="flex justify-between items-start mb-8">
                                    <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                                        <User size={14} /> Client Insight
                                    </h3>
                                    {order.user?.is_vip && <Star size={18} fill="currentColor" className="text-amber-400 group-hover:scale-125 transition-transform" />}
                                </div>
                                <div className="space-y-6">
                                    <div>
                                        <p className="text-2xl font-black tracking-tight">{order.user?.name || order.name}</p>
                                        <p className="text-slate-400 text-sm font-medium">{order.user?.email || order.email}</p>
                                    </div>
                                    <a
                                        href={`tel:${order.phone || order.user?.phone}`}
                                        className="flex items-center gap-4 group cursor-pointer"
                                    >
                                        <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center border border-white/10 group-hover:bg-emerald-600 transition-all shrink-0">
                                            <Phone size={18} />
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Phone Link</p>
                                            <p className="font-bold text-sm tracking-widest truncate">{order.phone || order.user?.phone || 'No Data'}</p>
                                        </div>
                                    </a>
                                    <button className="w-full py-4 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all flex items-center justify-center gap-2 group">
                                        <MessageSquare size={14} className="text-emerald-400 group-hover:scale-110 transition-transform" /> Send Strategic SMS
                                    </button>
                                    {order.user?.is_vip && (
                                        <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                                            <p className="text-[10px] font-black uppercase text-amber-400 tracking-widest mb-1 flex items-center gap-2">
                                                <ShieldCheck size={12} /> Priority Client Treatment
                                            </p>
                                            <p className="text-xs text-white/50 font-medium leading-relaxed">This customer is marked as VIP. Ensure expedited fulfillment and premium packaging.</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </section>

                        {/* Courier Assignment */}
                        <section className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-sm">
                            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-8 flex items-center gap-2">
                                <Truck size={14} /> Courier Assignment
                            </h3>
                            <div className="space-y-6">
                                <p className="text-sm font-medium text-slate-500">Select a logistics partner for this delivery.</p>
                                <select
                                    className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 text-xs font-black uppercase tracking-widest focus:ring-2 focus:ring-emerald-100 appearance-none cursor-pointer"
                                    value={data.courier_id}
                                    onChange={assignCourier}
                                    style={{ backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'currentColor\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3e%3cpolyline points=\'6 9 12 15 18 9\'%3e%3c/polyline%3e%3c/svg%3e")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1.5rem center', backgroundSize: '1em' }}
                                >
                                    <option value="">Unassigned</option>
                                    <option value="1">Pathao Logistics</option>
                                    <option value="2">SteadFast Courier</option>
                                    <option value="3">Paperfly</option>
                                    {couriers.map(c => (
                                        <option key={c.id} value={c.id}>{c.name}</option>
                                    ))}
                                </select>

                                {order.order_status === 'delivered' && (
                                    <div className="mt-8 pt-8 border-t border-slate-50">
                                        <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-4">Rate Partner Performance</p>
                                        <div className="flex gap-2">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <button
                                                    key={star}
                                                    onClick={() => rateDelivery(star)}
                                                    className={cn(
                                                        "p-2 rounded-lg transition-all",
                                                        (order.delivery_partner_rating || 0) >= star ? "text-amber-400 bg-amber-50" : "text-slate-200 hover:text-amber-200"
                                                    )}
                                                >
                                                    <Star size={20} fill={(order.delivery_partner_rating || 0) >= star ? "currentColor" : "none"} />
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </section>

                        {/* Delivery Blueprint */}
                        <section className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-sm">
                            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-8 flex items-center gap-2">
                                <MapPin size={14} /> Logistics Matrix
                            </h3>
                            <div className="space-y-8">
                                <div className="flex gap-4">
                                    <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 shrink-0">
                                        <MapPin size={18} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Destination Address</p>
                                        <p className="text-sm font-bold text-slate-700 leading-relaxed italic">{order.shipping_address || order.address}</p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 shrink-0">
                                        <CreditCard size={18} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Transaction Mode</p>
                                        <p className="text-sm font-black text-slate-800 uppercase tracking-widest">{order.payment_method}</p>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
