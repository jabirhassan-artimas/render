import React, { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import { 
    Search, 
    Trash2, 
    User,
    CheckCircle2,
    XCircle,
    ChevronLeft,
    ChevronRight,
    ArrowUpDown,
    Filter,
    Mail,
    Phone,
    MapPin,
    Calendar,
    Star,
    ShieldAlert,
    MessageSquare,
    Tag,
    Globe
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export default function Index({ customers, filters, locationStats }) {
    const [search, setSearch] = useState(filters.search || '');
    const [vipFilter, setVipFilter] = useState(filters.vip || '');
    const [blockedFilter, setBlockedFilter] = useState(filters.blocked || '');
    const [showSmsModal, setShowSmsModal] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [smsMessage, setSmsMessage] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route('admin.customers.index'), { 
            search, 
            vip: vipFilter, 
            blocked: blockedFilter 
        }, { preserveState: true });
    };

    const toggleVip = (id) => {
        router.post(route('admin.customers.toggleVip', id), {}, { preserveScroll: true });
    };

    const toggleBlock = (id) => {
        router.post(route('admin.customers.toggleBlock', id), {}, { preserveScroll: true });
    };

    const handleSendSms = (e) => {
        e.preventDefault();
        router.post(route('admin.customers.sendSms', selectedCustomer.id), { 
            message: smsMessage 
        }, { 
            onSuccess: () => {
                setShowSmsModal(false);
                setSmsMessage('');
            }
        });
    };

    return (
        <AdminLayout>
            <Head title="Customer CRM" />

            <div className="space-y-8 animate-in fade-in duration-500 pb-20">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <h1 className="text-3xl font-black text-slate-800 tracking-tight mb-2">Customer Relations</h1>
                        <p className="text-slate-500 font-medium">Manage your community, implement loyalty programs, and block malicious activity.</p>
                    </div>
                </div>

                {/* Dashboard Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
                        <div className="flex items-center gap-4 mb-2">
                             <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                                <User size={20} />
                             </div>
                             <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">Total</span>
                        </div>
                        <div className="text-3xl font-black text-slate-800">{customers.total}</div>
                    </div>
                    <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
                        <div className="flex items-center gap-4 mb-2">
                             <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center">
                                <Star size={20} />
                             </div>
                             <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">VIPs</span>
                        </div>
                        <div className="text-3xl font-black text-slate-800">{customers.data.filter(c => c.is_vip).length}</div>
                    </div>
                    <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
                        <div className="flex items-center gap-4 mb-2">
                             <div className="w-10 h-10 bg-red-50 text-red-600 rounded-xl flex items-center justify-center">
                                <ShieldAlert size={20} />
                             </div>
                             <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">Blocked</span>
                        </div>
                        <div className="text-3xl font-black text-slate-800">{customers.data.filter(c => c.is_blocked).length}</div>
                    </div>
                    <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
                        <div className="flex items-center gap-4 mb-2">
                             <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
                                <Globe size={20} />
                             </div>
                             <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">Top Cities</span>
                        </div>
                        <div className="flex gap-2 flex-wrap">
                            {locationStats.slice(0, 3).map((s, i) => (
                                <span key={i} className="text-[10px] font-black bg-slate-50 text-slate-600 px-2 py-1 rounded-lg">
                                    {s.city || 'Unknown'} ({s.count})
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Filters */}
                <div className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm">
                    <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4 w-full">
                        <div className="flex-1 relative">
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                            <input 
                                type="text" 
                                placeholder="Search by name, email, or phone..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full bg-slate-50 border-none pl-14 pr-6 py-4 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-blue-100 transition-all"
                            />
                        </div>
                        <div className="flex gap-4">
                            <select 
                                value={vipFilter}
                                onChange={(e) => setVipFilter(e.target.value)}
                                className="bg-slate-50 border-none px-6 py-4 rounded-2xl text-xs font-black uppercase tracking-widest focus:ring-2 focus:ring-blue-100 transition-all appearance-none cursor-pointer pr-12"
                                style={{backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'currentColor\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3e%3cpolyline points=\'6 9 12 15 18 9\'%3e%3c/polyline%3e%3c/svg%3e")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1.5rem center', backgroundSize: '1em'}}
                            >
                                <option value="">All Types</option>
                                <option value="true">VIP Only</option>
                            </select>
                            <select 
                                value={blockedFilter}
                                onChange={(e) => setBlockedFilter(e.target.value)}
                                className="bg-slate-50 border-none px-6 py-4 rounded-2xl text-xs font-black uppercase tracking-widest focus:ring-2 focus:ring-blue-100 transition-all appearance-none cursor-pointer pr-12"
                                style={{backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'currentColor\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3e%3cpolyline points=\'6 9 12 15 18 9\'%3e%3c/polyline%3e%3c/svg%3e")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1.5rem center', backgroundSize: '1em'}}
                            >
                                <option value="">All Access</option>
                                <option value="true">Blocked Only</option>
                            </select>
                        </div>
                        <button type="submit" className="bg-slate-900 text-white px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-800 transition-all shadow-lg active:scale-95">
                            Search
                        </button>
                    </form>
                </div>

                {/* Grid Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                    {customers.data.map((customer) => (
                        <div key={customer.id} className={cn(
                            "bg-white rounded-[2.5rem] p-8 border transition-all duration-500 group relative overflow-hidden",
                            customer.is_blocked ? "border-red-100 bg-red-50/10 opacity-75" : "border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-blue-50"
                        )}>
                            {customer.is_vip && (
                                <div className="absolute top-0 right-0 p-6">
                                    <div className="bg-amber-100 text-amber-600 p-2 rounded-xl animate-bounce">
                                        <Star size={16} fill="currentColor" />
                                    </div>
                                </div>
                            )}

                            <div className="flex items-start gap-6 mb-8">
                                <div className={cn(
                                    "w-20 h-20 rounded-3xl flex items-center justify-center font-black text-2xl shadow-inner group-hover:scale-110 transition-transform duration-500",
                                    customer.is_blocked ? "bg-red-100 text-red-600" : (customer.is_vip ? "bg-amber-50 text-amber-600" : "bg-blue-50 text-blue-600")
                                )}>
                                    {(customer.name || 'U').charAt(0).toUpperCase()}
                                </div>
                                <div className="flex-1 min-width-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h3 className="text-xl font-black text-slate-800 truncate">{customer.name}</h3>
                                        {customer.is_blocked && <ShieldAlert size={16} className="text-red-500 shrink-0" />}
                                    </div>
                                    <div className="flex items-center gap-2 text-slate-400">
                                        <Mail size={14} />
                                        <span className="text-xs font-bold truncate">{customer.email}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-slate-400 mt-1">
                                        <MapPin size={14} />
                                        <span className="text-[10px] font-black uppercase tracking-widest">{customer.city || 'No Location'}</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="space-y-4 pt-6 border-t border-slate-50">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3 text-slate-500">
                                        <Calendar size={16} className="text-slate-300" />
                                        <span className="text-xs font-bold">Joined:</span>
                                    </div>
                                    <span className="text-xs font-black text-slate-700">{new Date(customer.created_at).toLocaleDateString()}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3 text-slate-500">
                                        <Phone size={16} className="text-slate-300" />
                                        <span className="text-xs font-bold">Contact:</span>
                                    </div>
                                    <span className="text-xs font-black text-slate-700">{customer.phone || 'N/A'}</span>
                                </div>
                                {customer.tags && customer.tags.length > 0 && (
                                    <div className="flex flex-wrap gap-1 mt-2">
                                        {customer.tags.map((tag, i) => (
                                            <span key={i} className="text-[9px] font-black bg-slate-100 text-slate-500 px-2 py-1 rounded-md uppercase">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="mt-8 flex flex-wrap gap-2">
                                <button 
                                    onClick={() => toggleVip(customer.id)}
                                    className={cn(
                                        "flex-1 py-3 px-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                                        customer.is_vip ? "bg-amber-100 text-amber-600 hover:bg-amber-200" : "bg-slate-50 text-slate-400 hover:bg-slate-100 hover:text-slate-800"
                                    )}
                                >
                                    {customer.is_vip ? 'Remove VIP' : 'Make VIP'}
                                </button>
                                <button 
                                    onClick={() => {
                                        setSelectedCustomer(customer);
                                        setShowSmsModal(true);
                                    }}
                                    className="p-3 bg-blue-50 text-blue-500 rounded-xl hover:bg-blue-100 transition-all tooltip"
                                    title="Send SMS"
                                >
                                    <MessageSquare size={18} />
                                </button>
                                <button 
                                    onClick={() => toggleBlock(customer.id)}
                                    className={cn(
                                        "p-3 rounded-xl transition-all",
                                        customer.is_blocked ? "bg-slate-900 text-white" : "bg-red-50 text-red-500 hover:bg-red-100"
                                    )}
                                    title={customer.is_blocked ? 'Unblock' : 'Block IP'}
                                >
                                    <ShieldAlert size={18} />
                                </button>
                                <button className="p-3 bg-slate-50 text-slate-400 rounded-xl hover:bg-red-100 hover:text-red-500 transition-all">
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination */}
                <div className="flex justify-center gap-2 pt-12">
                     {customers.links.map((link, i) => (
                        <button
                            key={i}
                            disabled={!link.url}
                            onClick={() => link.url && router.get(link.url, { search, vip: vipFilter, blocked: blockedFilter }, { preserveState: true })}
                            className={cn(
                                "w-12 h-12 rounded-2xl flex items-center justify-center text-xs font-black transition-all",
                                link.active 
                                    ? "bg-blue-600 text-white shadow-xl shadow-blue-100" 
                                    : "bg-white text-slate-400 border border-slate-100 hover:border-slate-300",
                                !link.url && "opacity-20 cursor-not-allowed"
                            )}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    ))}
                </div>
            </div>

            {/* SMS Modal */}
            {showSmsModal && (
                <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-6 animate-in fade-in duration-300">
                    <div className="bg-white w-full max-w-lg rounded-[2.5rem] p-10 shadow-2xl relative animate-in slide-in-from-bottom-8 duration-500">
                        <button 
                            onClick={() => setShowSmsModal(false)}
                            className="absolute top-8 right-8 text-slate-300 hover:text-slate-800 transition-colors"
                        >
                            <XCircle size={24} />
                        </button>
                        
                        <div className="mb-8">
                            <h2 className="text-2xl font-black text-slate-800 mb-2">Send Direct SMS</h2>
                            <p className="text-slate-500 font-medium text-sm">Targeting: <span className="text-slate-900 font-bold">{selectedCustomer?.name}</span> ({selectedCustomer?.phone || 'No phone'})</p>
                        </div>

                        <form onSubmit={handleSendSms} className="space-y-6">
                            <div>
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3 block">Message Content</label>
                                <textarea 
                                    className="w-full bg-slate-50 border-none rounded-3xl p-6 text-sm font-bold min-h-[150px] focus:ring-2 focus:ring-blue-100 transition-all placeholder:text-slate-300"
                                    placeholder="Write your message here... avoid placeholders like [Name] as this is a direct transmission."
                                    value={smsMessage}
                                    onChange={(e) => setSmsMessage(e.target.value)}
                                    required
                                ></textarea>
                            </div>
                            <div className="flex gap-4">
                                <button 
                                    type="button"
                                    onClick={() => setShowSmsModal(false)}
                                    className="flex-1 py-5 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-400 bg-slate-100 hover:bg-slate-200 transition-all"
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="submit"
                                    className="flex-1 py-5 rounded-2xl text-[10px] font-black uppercase tracking-widest text-white bg-blue-600 hover:bg-blue-700 shadow-xl shadow-blue-100 transition-all active:scale-95"
                                >
                                    Send Transmission
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
