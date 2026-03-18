import React, { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import { 
    Search, 
    Eye, 
    MoreVertical,
    CheckCircle2,
    XCircle,
    ChevronLeft,
    ChevronRight,
    ArrowUpDown,
    Filter,
    ShoppingBag,
    Clock,
    Truck,
    CreditCard,
    FileText,
    Globe,
    Smartphone,
    UserCircle,
    MessageCircle,
    ShieldCheck
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export default function Index({ orders, filters }) {
    const [search, setSearch] = useState(filters.search || '');
    const [status, setStatus] = useState(filters.status || '');

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route('admin.orders.index'), { search, status }, { preserveState: true });
    };

    const handleStatusTab = (newStatus) => {
        setStatus(newStatus);
        router.get(route('admin.orders.index'), { search, status: newStatus }, { preserveState: true });
    };

    const getStatusStyles = (status) => {
        switch(status?.toLowerCase()) {
            case 'delivered': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
            case 'pending': return 'bg-amber-50 text-amber-600 border-amber-100';
            case 'processing': return 'bg-blue-50 text-blue-600 border-blue-100';
            case 'cancelled': return 'bg-rose-50 text-rose-600 border-rose-100';
            case 'returned': return 'bg-purple-50 text-purple-600 border-purple-100';
            default: return 'bg-slate-50 text-slate-400 border-slate-100';
        }
    };

    const getSourceIcon = (source) => {
        switch(source?.toLowerCase()) {
            case 'web': return <Globe size={14} className="text-blue-500" />;
            case 'mobile': return <Smartphone size={14} className="text-emerald-500" />;
            case 'manual': return <UserCircle size={14} className="text-amber-500" />;
            default: return <Globe size={14} className="text-slate-400" />;
        }
    };

    const statusCounts = {
        all: orders.total,
        pending: orders.data.filter(o => o.order_status === 'pending').length,
        processing: orders.data.filter(o => o.order_status === 'processing').length,
        delivered: orders.data.filter(o => o.order_status === 'delivered').length,
        cancelled: orders.data.filter(o => o.order_status === 'cancelled').length,
    };

    return (
        <AdminLayout>
            <Head title="Order Management" />

            <div className="space-y-8 animate-in fade-in duration-500 pb-20">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <h1 className="text-3xl font-black text-slate-800 tracking-tight mb-2">Order Fulfillment</h1>
                        <p className="text-slate-500 font-medium">Manage multi-channel orders, assign couriers, and generate smart invoices.</p>
                    </div>
                </div>

                {/* Status Segmentation Tabs */}
                <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                    {[
                        { id: '', label: 'All Orders', count: orders.total },
                        { id: 'pending', label: 'Pending', count: null },
                        { id: 'processing', label: 'Processing', count: null },
                        { id: 'shipped', label: 'Shipped', count: null },
                        { id: 'delivered', label: 'Delivered', count: null },
                        { id: 'cancelled', label: 'Cancelled', count: null },
                        { id: 'returned', label: 'Returned', count: null },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => handleStatusTab(tab.id)}
                            className={cn(
                                "px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap border-2",
                                status === tab.id 
                                    ? "bg-slate-900 text-white border-slate-900 shadow-xl shadow-slate-100" 
                                    : "bg-white text-slate-400 border-transparent hover:border-slate-100"
                            )}
                        >
                            {tab.label} {tab.count !== null && <span className="ml-2 opacity-50">{tab.count}</span>}
                        </button>
                    ))}
                </div>

                {/* Filters */}
                <div className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col lg:flex-row gap-6 items-center">
                    <form onSubmit={handleSearch} className="flex-1 flex flex-col md:flex-row gap-4 w-full">
                        <div className="flex-1 relative">
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                            <input 
                                type="text" 
                                placeholder="Search by Order #, phone or email..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full bg-slate-50 border-none pl-14 pr-6 py-4 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-blue-100 transition-all"
                            />
                        </div>
                        <button type="submit" className="bg-slate-900 text-white px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-800 transition-all shadow-lg active:scale-95">
                            Search
                        </button>
                    </form>
                </div>

                {/* Table Section */}
                <div className="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden animate-in zoom-in-95 duration-500">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50/50">
                                    <th className="px-10 py-6 text-[10px] font-black uppercase text-slate-400 tracking-widest w-40">Order Meta</th>
                                    <th className="px-10 py-6 text-[10px] font-black uppercase text-slate-400 tracking-widest">Customer</th>
                                    <th className="px-10 py-6 text-[10px] font-black uppercase text-slate-400 tracking-widest">Courier & Logistics</th>
                                    <th className="px-10 py-6 text-[10px] font-black uppercase text-slate-400 tracking-widest">Value</th>
                                    <th className="px-10 py-6 text-[10px] font-black uppercase text-slate-400 tracking-widest text-center">Status</th>
                                    <th className="px-10 py-6 text-[10px] font-black uppercase text-slate-400 tracking-widest text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {orders.data.map((order) => (
                                    <tr key={order.id} className="group hover:bg-slate-50/50 transition-colors">
                                        <td className="px-10 py-6">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="font-black text-slate-900 text-sm tracking-tight">{order.order_number}</span>
                                                <div className="flex gap-1">
                                                    {getSourceIcon(order.order_source)}
                                                    {order.is_vip && <ShieldCheck size={14} className="text-amber-500" />}
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2 text-slate-400">
                                                <Clock size={12} />
                                                <span className="text-[10px] font-bold uppercase tracking-widest">
                                                    {new Date(order.created_at).toLocaleDateString()}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-10 py-6">
                                            <div className="flex items-center gap-3">
                                                <div className={cn(
                                                    "w-10 h-10 rounded-xl flex items-center justify-center font-black text-xs",
                                                    order.user?.is_vip ? "bg-amber-50 text-amber-600 shadow-inner" : "bg-slate-100 text-slate-500"
                                                )}>
                                                    {(order.user?.name || 'G').charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-slate-700 text-sm whitespace-nowrap">{order.user?.name || 'Guest'}</p>
                                                    <p className="text-[10px] font-bold text-slate-400 truncate w-32">{order.phone || order.email || 'No Contact'}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-10 py-6">
                                            {order.courier ? (
                                                <div className="flex items-center gap-3 text-slate-600 bg-blue-50/50 py-2 px-3 rounded-lg border border-blue-100 inline-flex">
                                                    <Truck size={14} className="text-blue-500" />
                                                    <span className="text-[10px] font-black uppercase tracking-widest">{order.courier.name}</span>
                                                </div>
                                            ) : (
                                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">Not Assigned</span>
                                            )}
                                        </td>
                                        <td className="px-10 py-6">
                                            <p className="font-black text-slate-900 text-sm">৳{parseFloat(order.total).toLocaleString()}</p>
                                            <div className="flex items-center gap-1">
                                                <CreditCard size={10} className="text-slate-300" />
                                                <span className={cn(
                                                    "text-[10px] font-bold uppercase tracking-widest",
                                                    order.payment_status === 'paid' ? "text-emerald-500" : "text-amber-500"
                                                )}>{order.payment_method}</span>
                                            </div>
                                        </td>
                                        <td className="px-10 py-6">
                                            <div className="flex justify-center">
                                                <span className={cn(
                                                    "px-4 py-2 border rounded-2xl text-[9px] font-black uppercase tracking-widest shadow-sm shadow-slate-100",
                                                    getStatusStyles(order.order_status)
                                                )}>
                                                    {order.order_status || 'Pending'}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-10 py-6 text-right">
                                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                {order.order_notes && <MessageCircle size={16} className="text-blue-500 animate-pulse" title="Has Notes" />}
                                                <Link 
                                                    href={route('admin.orders.invoice', order.id)}
                                                    className="p-3 bg-white border border-slate-100 text-slate-400 hover:text-emerald-600 hover:border-emerald-100 rounded-xl transition-all shadow-sm"
                                                    title="View Invoice"
                                                    target="_blank"
                                                >
                                                    <FileText size={16} />
                                                </Link>
                                                <Link 
                                                    href={route('admin.orders.show', order.id)}
                                                    className="p-3 bg-white border border-slate-100 text-slate-400 hover:text-blue-600 hover:border-blue-100 rounded-xl transition-all shadow-sm"
                                                    title="Order Details"
                                                >
                                                    <Eye size={16} />
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="px-10 py-8 bg-slate-50/50 flex flex-col md:flex-row items-center justify-between gap-6 border-t border-slate-100">
                        <p className="text-xs font-bold text-slate-400">
                            Showing <span className="text-slate-800">{orders.from}</span> to <span className="text-slate-800">{orders.to}</span> of <span className="text-slate-800">{orders.total}</span> transactions
                        </p>
                        
                        <div className="flex gap-2">
                             {orders.links.map((link, i) => (
                                <button
                                    key={i}
                                    disabled={!link.url}
                                    onClick={() => link.url && router.get(link.url, { search, status }, { preserveState: true })}
                                    className={cn(
                                        "w-10 h-10 rounded-xl flex items-center justify-center text-xs font-black transition-all",
                                        link.active 
                                            ? "bg-slate-900 text-white shadow-lg shadow-slate-200" 
                                            : "bg-white text-slate-400 border border-slate-200 hover:border-slate-800",
                                        !link.url && "opacity-20 cursor-not-allowed"
                                    )}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
