import React from 'react';
import CustomerLayout from '@/Layouts/CustomerLayout';
import { Head, Link } from '@inertiajs/react';
import { 
    ShoppingBag, 
    Clock, 
    CheckCircle2, 
    Package,
    ArrowRight,
    TrendingUp,
    Star
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export default function Dashboard({ user, recentOrders, totalOrders, pendingOrders, completedOrders }) {
    const stats = [
        { label: 'Total Orders', value: totalOrders, icon: Package, color: 'text-blue-600', bg: 'bg-blue-50' },
        { label: 'Pending', value: pendingOrders, icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
        { label: 'Completed', value: completedOrders, icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    ];

    return (
        <CustomerLayout>
            <Head title="Customer Dashboard" />

            <div className="space-y-10">
                {/* Welcome */}
                <div className="bg-slate-900 p-12 rounded-[3.5rem] relative overflow-hidden shadow-2xl shadow-slate-200">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600 opacity-20 blur-[80px] rounded-full -mr-32 -mt-32"></div>
                    <div className="relative z-10">
                        <h1 className="text-4xl font-black text-white tracking-tight mb-2">Hello, {user.name} 👋</h1>
                        <p className="text-slate-400 font-medium">Welcome to your personal hub. Track your rewards and orders here.</p>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {stats.map((stat, i) => (
                        <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex items-center justify-between group hover:shadow-xl transition-all">
                            <div>
                                <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">{stat.label}</p>
                                <h4 className="text-3xl font-black text-slate-800 tracking-tighter">{stat.value}</h4>
                            </div>
                            <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center transition-all group-hover:scale-110 shadow-sm", stat.bg, stat.color)}>
                                <stat.icon size={24} />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Recent Orders */}
                <div className="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden">
                    <div className="px-10 py-8 border-b border-slate-50 flex items-center justify-between">
                        <h3 className="text-xl font-black text-slate-800 tracking-tight">Recent Activity</h3>
                        <Link href={route('customer.orders')} className="text-blue-600 font-black text-xs uppercase tracking-widest hover:underline flex items-center gap-2">
                            View All <ArrowRight size={14} />
                        </Link>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50/50">
                                    <th className="px-10 py-5 text-[10px] font-black uppercase text-slate-400 tracking-widest">Order ID</th>
                                    <th className="px-10 py-5 text-[10px] font-black uppercase text-slate-400 tracking-widest">Date</th>
                                    <th className="px-10 py-5 text-[10px] font-black uppercase text-slate-400 tracking-widest">Total</th>
                                    <th className="px-10 py-5 text-[10px] font-black uppercase text-slate-400 tracking-widest">Status</th>
                                    <th className="px-10 py-5 text-[10px] font-black uppercase text-slate-400 tracking-widest text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {recentOrders.length > 0 ? (
                                    recentOrders.map((order) => (
                                        <tr key={order.id} className="group hover:bg-slate-50/50 transition-colors">
                                            <td className="px-10 py-6 font-black text-slate-800 uppercase text-xs">{order.order_number}</td>
                                            <td className="px-10 py-6 text-sm font-bold text-slate-500">{new Date(order.created_at).toLocaleDateString()}</td>
                                            <td className="px-10 py-6 font-black text-slate-900">৳{parseFloat(order.total).toLocaleString()}</td>
                                            <td className="px-10 py-6">
                                                <span className={cn(
                                                    "px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest shadow-sm",
                                                    order.order_status === 'pending' ? "bg-amber-100 text-amber-600" :
                                                    order.order_status === 'delivered' ? "bg-emerald-100 text-emerald-600" :
                                                    "bg-slate-100 text-slate-600"
                                                )}>
                                                    {order.order_status}
                                                </span>
                                            </td>
                                            <td className="px-10 py-6 text-right">
                                                <Link 
                                                    href={route('customer.orders.show', order.id)}
                                                    className="inline-flex items-center justify-center w-10 h-10 bg-slate-100 rounded-xl text-slate-400 hover:bg-blue-600 hover:text-white transition-all group-active:scale-90"
                                                >
                                                    <ArrowRight size={18} />
                                                </Link>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="px-10 py-20 text-center text-slate-400 italic">
                                            No orders placed yet. Start shopping to see history!
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Banner Promo */}
                <div className="bg-gradient-to-tr from-indigo-600 to-blue-700 p-12 rounded-[3.5rem] relative overflow-hidden text-white flex flex-col md:flex-row items-center gap-10 shadow-3xl shadow-blue-100">
                    <div className="flex-1 space-y-6">
                        <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md">
                            <TrendingUp size={24} />
                        </div>
                        <h2 className="text-3xl font-black tracking-tight leading-tight">Unlock Premium Status</h2>
                        <p className="text-blue-100 font-medium opacity-80 max-w-sm">Complete 5 more orders to become a Gold Member and unlock 15% flat discount on all items.</p>
                        <Link href={route('shop')} className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg hover:bg-slate-50 transition-all active:scale-95">
                            Shop Now
                        </Link>
                    </div>
                    <div className="shrink-0 relative hidden md:block">
                        <div className="w-48 h-48 bg-white/10 rounded-full border border-white/10 animate-pulse"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Star size={80} className="fill-white/20 text-white animate-bounce" />
                        </div>
                    </div>
                </div>
            </div>
        </CustomerLayout>
    );
}
