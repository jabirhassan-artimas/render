import React from 'react';
import CustomerLayout from '@/Layouts/CustomerLayout';
import { Head, Link, router } from '@inertiajs/react';
import { 
    ShoppingBag, 
    ArrowRight, 
    ChevronLeft,
    ChevronRight,
    Search,
    Filter
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export default function Orders({ orders }) {
    return (
        <CustomerLayout>
            <Head title="My Orders" />

            <div className="space-y-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2 border-b border-slate-100">
                    <div>
                        <h1 className="text-4xl font-black text-slate-800 tracking-tight mb-2">My Orders</h1>
                        <p className="text-slate-400 font-medium italic">Tracking all your historical purchases</p>
                    </div>
                    
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                            <input 
                                type="text" 
                                placeholder="Order ID..."
                                className="bg-white border border-slate-100 pl-12 pr-6 py-3 rounded-2xl text-xs font-bold focus:ring-2 focus:ring-emerald-100 transition-all w-48 shadow-sm"
                            />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50/50">
                                    <th className="px-10 py-5 text-[10px] font-black uppercase text-slate-400 tracking-widest">Order ID</th>
                                    <th className="px-10 py-5 text-[10px] font-black uppercase text-slate-400 tracking-widest">Date</th>
                                    <th className="px-10 py-5 text-[10px] font-black uppercase text-slate-400 tracking-widest">Amount</th>
                                    <th className="px-10 py-5 text-[10px] font-black uppercase text-slate-400 tracking-widest">Status</th>
                                    <th className="px-10 py-5 text-[10px] font-black uppercase text-slate-400 tracking-widest">Payment</th>
                                    <th className="px-10 py-5 text-[10px] font-black uppercase text-slate-400 tracking-widest text-right">Details</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {orders.data.length > 0 ? (
                                    orders.data.map((order) => (
                                        <tr key={order.id} className="group hover:bg-slate-50/50 transition-colors">
                                            <td className="px-10 py-6 font-black text-slate-800 uppercase text-xs">#{order.order_number}</td>
                                            <td className="px-10 py-6 text-sm font-bold text-slate-400">{new Date(order.created_at).toLocaleDateString()}</td>
                                            <td className="px-10 py-6 font-black text-slate-900">৳{parseFloat(order.total).toLocaleString()}</td>
                                            <td className="px-10 py-6">
                                                <span className={cn(
                                                    "px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest shadow-sm border",
                                                    order.order_status === 'pending' ? "bg-amber-50 text-amber-600 border-amber-100" :
                                                    order.order_status === 'delivered' ? "bg-emerald-50 text-emerald-600 border-emerald-100" :
                                                    order.order_status === 'cancelled' ? "bg-rose-50 text-rose-600 border-rose-100" :
                                                    "bg-slate-50 text-slate-600 border-slate-100"
                                                )}>
                                                    {order.order_status}
                                                </span>
                                            </td>
                                            <td className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">
                                                {order.payment_status}
                                            </td>
                                            <td className="px-10 py-6 text-right">
                                                <Link 
                                                    href={route('customer.orders.show', order.id)}
                                                    className="inline-flex items-center justify-center w-10 h-10 bg-white border border-slate-100 rounded-xl text-slate-400 hover:bg-emerald-600 hover:text-white hover:border-emerald-600 transition-all group-active:scale-90 shadow-sm"
                                                >
                                                    <ChevronRight size={18} />
                                                </Link>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="px-10 py-24 text-center">
                                            <div className="flex flex-col items-center">
                                                <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center text-slate-200 mb-6">
                                                    <ShoppingBag size={40} />
                                                </div>
                                                <p className="text-slate-400 font-bold italic">No order history found for this account.</p>
                                                <Link href={route('shop')} className="mt-8 text-emerald-600 font-black text-xs uppercase tracking-widest hover:underline">Start Shopping Now</Link>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Pagination */}
                {orders.links.length > 3 && (
                    <div className="flex justify-center gap-2 pt-10">
                        {orders.links.map((link, i) => (
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
