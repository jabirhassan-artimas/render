import React, { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import { 
    TrendingUp, 
    Users, 
    ShoppingBag, 
    Activity,
    Download,
    BarChart3,
    PieChart,
    Calendar,
    Globe,
    ArrowUpRight,
    ArrowDownRight,
    X,
    Filter
} from 'lucide-react';
import { 
    AreaChart, 
    Area, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    ResponsiveContainer,
    Cell,
    PieChart as RePieChart,
    Pie as RePie
} from 'recharts';

function cn(...inputs) {
    return inputs.filter(Boolean).join(' ');
}

export default function Index({ stats, locationStats, abandonedCarts, abandonedTotal, channelDistribution, trends, filters, topCustomers }) {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [dateRange, setDateRange] = useState({
        start_date: filters?.start_date?.substring(0, 10) || '',
        end_date: filters?.end_date?.substring(0, 10) || ''
    });

    const applyFilter = (e) => {
        e.preventDefault();
        router.get(route('admin.reports.index'), dateRange, { preserveState: true });
        setIsFilterOpen(false);
    };

    const pieData = [
        { name: 'Web', value: parseInt(channelDistribution?.web || 0), color: '#0f172a' },
        { name: 'Mobile', value: parseInt(channelDistribution?.mobile || 0), color: '#3b82f6' },
        { name: 'Manual', value: parseInt(channelDistribution?.manual || 0), color: '#e2e8f0' },
    ];
    return (
        <AdminLayout>
            <Head title="Strategic Intelligence" />

            <div className="space-y-12 animate-in fade-in duration-700 pb-20">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <h1 className="text-4xl font-black text-slate-800 tracking-tighter mb-2">Deep Intelligence</h1>
                        <p className="text-slate-500 font-medium tracking-tight">Advanced behavioral analytics and operational performance metrics.</p>
                    </div>
                    <div className="flex gap-4">
                        <button 
                            onClick={() => setIsFilterOpen(true)}
                            className="bg-white border border-slate-200 text-slate-900 px-6 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:border-slate-800 transition-all shadow-sm flex items-center gap-2"
                        >
                            <Calendar size={14} /> Filter Range
                        </button>
                        <button className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-800 transition-all shadow-2xl flex items-center gap-2 group">
                            <Download size={14} className="group-hover:translate-y-0.5 transition-transform" /> Export Report
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[
                        { label: 'Revenue Growth', value: `৳${parseFloat(stats?.revenue_total || 0).toLocaleString()}`, trend: `${stats?.revenue_growth >= 0 ? '+' : ''}${stats?.revenue_growth}%`, color: 'blue', icon: TrendingUp },
                        { label: 'Active Pipeline', value: `${stats?.active_pipeline || 0} Orders`, trend: 'Action Required', color: 'emerald', icon: Activity },
                        { label: 'VIP Engagement', value: `${stats?.vip_engagement || 0} Users`, trend: 'Priority Tier', color: 'amber', icon: Users },
                        { label: 'Recovery Rate', value: `${stats?.recovery_rate || 0}%`, trend: 'System Efficiency', color: 'rose', icon: RefreshCcw }
                    ].map((card, i) => (
                        <div key={i} className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-sm relative overflow-hidden group hover:shadow-2xl transition-all">
                            <div className={cn(
                                "absolute top-0 right-0 w-32 h-32 opacity-5 rounded-full -mr-16 -mt-16 transition-all group-hover:scale-125",
                                card.color === 'blue' ? 'bg-emerald-500' : 
                                card.color === 'emerald' ? 'bg-emerald-500' :
                                card.color === 'amber' ? 'bg-amber-500' : 'bg-rose-500'
                            )}></div>
                            <div className="relative">
                                <div className={cn(
                                    "w-12 h-12 rounded-2xl flex items-center justify-center mb-8",
                                    card.color === 'blue' ? 'bg-emerald-50 text-emerald-600' : 
                                    card.color === 'emerald' ? 'bg-emerald-50 text-emerald-600' :
                                    card.color === 'amber' ? 'bg-amber-50 text-amber-600' : 'bg-rose-50 text-rose-600'
                                )}>
                                    <card.icon size={20} />
                                </div>
                                <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">{card.label}</h3>
                                <div className="flex flex-col gap-1">
                                    <p className="text-3xl font-black text-slate-800 tracking-tight">{card.value}</p>
                                    <span className={cn(
                                        "text-[10px] font-bold px-2 py-0.5 rounded-full w-fit",
                                        card.trend.includes('+') || card.trend.includes('Action') ? "bg-emerald-50 text-emerald-600" : "bg-slate-100 text-slate-500"
                                    )}>{card.trend}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Trend Chart */}
                <div className="bg-white rounded-[4rem] p-12 border border-slate-100 shadow-sm">
                    <div className="flex justify-between items-center mb-12">
                        <div>
                            <h3 className="text-2xl font-black text-slate-800 tracking-tight">Recovery Intelligence</h3>
                            <p className="text-slate-400 font-medium">Monitoring abandoned vs. successfully recovered carts (14d trend).</p>
                        </div>
                        <div className="flex gap-6">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                                <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Abandoned</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                                <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Recovered</span>
                            </div>
                        </div>
                    </div>
                    <div className="h-80 w-full min-h-0">
                        <ResponsiveContainer width="100%" height="100%" debounce={1}>
                            <AreaChart data={trends}>
                                <defs>
                                    <linearGradient id="colorAb" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.1}/>
                                        <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                                    </linearGradient>
                                    <linearGradient id="colorRec" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 'bold' }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 'bold' }} />
                                <Tooltip contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.05)', fontWeight: 'bold' }} />
                                <Area type="monotone" dataKey="abandoned" stroke="#f43f5e" strokeWidth={3} fillOpacity={1} fill="url(#colorAb)" />
                                <Area type="monotone" dataKey="recovered" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorRec)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Location Intelligence */}
                    <div className="lg:col-span-1 bg-white rounded-[3.5rem] p-10 border border-slate-100 shadow-sm">
                        <div className="flex justify-between items-center mb-10">
                            <h3 className="text-xl font-black text-slate-800 tracking-tight flex items-center gap-3">
                                <Globe size={20} className="text-emerald-600" /> Geospatial Data
                            </h3>
                            <Link href="#" className="text-[10px] font-black uppercase text-emerald-600 tracking-widest bg-emerald-50 px-3 py-1.5 rounded-full">Heatmap View</Link>
                        </div>
                        <div className="space-y-6">
                            {(locationStats || []).map((loc, i) => (
                                <div key={i} className="group cursor-help">
                                    <div className="flex justify-between items-end mb-2">
                                        <p className="text-sm font-black text-slate-700 tracking-tight group-hover:text-emerald-600 transition-colors">{loc.city || 'Digital World'}</p>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{loc.count} Users</p>
                                    </div>
                                    <div className="w-full h-3 bg-slate-50 rounded-full overflow-hidden border border-slate-100 shadow-inner">
                                        <div 
                                            className="h-full bg-slate-900 rounded-full group-hover:bg-emerald-600 transition-all duration-1000 ease-out" 
                                            style={{ width: `${(loc.count / (locationStats[0]?.count || 1)) * 100}%` }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-12 bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-600/30 blur-3xl rounded-full -mr-12 -mt-12"></div>
                            <div className="relative">
                                <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest mb-1">Growth Prediction</p>
                                <p className="text-xs font-medium text-slate-400 mb-4">Urban nodes showing 14% higher engagement than rural sectors.</p>
                                <div className="flex items-center gap-2 text-emerald-400 text-[10px] font-black uppercase tracking-widest">
                                    <TrendingUp size={14} /> Regional Expansion Suggested
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Operational Dynamics */}
                    <div className="lg:col-span-2 space-y-12">
                        {/* Abandoned Cart Segment */}
                        <div className="bg-white rounded-[3.5rem] p-10 border border-slate-100 shadow-sm relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-48 h-48 bg-rose-50/50 rounded-bl-full -mr-12 -mt-12 -z-0"></div>
                            <div className="relative z-10">
                                <div className="flex justify-between items-center mb-10">
                                    <h3 className="text-xl font-black text-slate-800 tracking-tight flex items-center gap-3">
                                        <ShoppingBag size={20} className="text-rose-500" /> Leaking Bucket (Abandoned Carts)
                                    </h3>
                                    <div className="flex gap-2">
                                        <span className="text-[10px] font-black uppercase bg-rose-50 text-rose-600 px-4 py-2 rounded-xl">Lost Value: ৳{parseFloat(abandonedTotal || 0).toLocaleString()}</span>
                                        <button className="text-[10px] font-black uppercase bg-slate-900 text-white px-4 py-2 rounded-xl hover:bg-slate-800 transition-all">Recover All</button>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    {(abandonedCarts || []).map((cart, i) => (
                                        <div key={i} className="flex items-center justify-between p-6 bg-slate-50/50 border border-slate-100/50 rounded-3xl hover:bg-white hover:shadow-lg transition-all group">
                                            <div className="flex items-center gap-6">
                                                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center font-black text-slate-400 text-xs shadow-sm shadow-slate-200">
                                                    {(cart.user?.name || 'G').charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="font-black text-slate-800 text-sm tracking-tight">{cart.user?.name || 'Guest Explorer'}</p>
                                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{new Date(cart.updated_at).toLocaleTimeString()}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-8">
                                                <div className="text-right">
                                                    <p className="text-sm font-black text-slate-900">৳{parseFloat(cart.total || 0).toLocaleString()}</p>
                                                    <p className="text-[10px] font-bold text-rose-400 uppercase tracking-widest">{cart.items_count} Fragments</p>
                                                </div>
                                                <button className="p-3 bg-white border border-slate-100 text-slate-300 hover:text-emerald-600 hover:border-emerald-100 rounded-xl transition-all shadow-sm opacity-0 group-hover:opacity-100">
                                                    <RefreshCcw size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                    {(!abandonedCarts || abandonedCarts.length === 0) && (
                                        <div className="text-center py-20 bg-slate-50/50 rounded-3xl border border-dashed border-slate-200">
                                            <p className="text-slate-400 font-bold text-sm italic">Perfect conversion detected. No stalls found.</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Order Channel Segmentation */}
                        <div className="bg-white rounded-[3.5rem] p-10 border border-slate-100 shadow-sm relative overflow-hidden">
                            <h3 className="text-xl font-black text-slate-800 tracking-tight mb-10 flex items-center gap-3">
                                <PieChart size={20} className="text-slate-900" /> Channel Distribution
                            </h3>
                            <div className="flex flex-col md:flex-row items-center gap-12">
                                <div className="w-48 h-48 rounded-full border-[12px] border-slate-100 flex items-center justify-center relative shadow-sm">
                                    <div className="text-center">
                                        <p className="text-2xl font-black text-slate-800 tracking-tighter">{channelDistribution?.web || 0}%</p>
                                        <p className="text-[8px] font-black uppercase text-slate-400 tracking-widest">Web Focus</p>
                                    </div>
                                    <div className="absolute inset-[-12px] w-[calc(100%+24px)] h-[calc(100%+24px)]">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <RePieChart>
                                                <RePie data={pieData} innerRadius={85} outerRadius={105} paddingAngle={5} dataKey="value">
                                                    {pieData.map((entry, index) => (
                                                        <Cell key={`cell-${index}`} fill={entry.color} cornerRadius={5} />
                                                    ))}
                                                </RePie>
                                            </RePieChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>
                                <div className="flex-1 space-y-4 w-full">
                                    {pieData.map((channel, i) => (
                                        <div key={i}>
                                            <div className="flex justify-between items-end mb-2">
                                                <p className="text-xs font-black text-slate-700 uppercase tracking-widest">{channel.name} Segment</p>
                                                <p className="text-xs font-black text-slate-900">{channel.value}%</p>
                                            </div>
                                            <div className="w-full h-2 bg-slate-50 rounded-full overflow-hidden">
                                                <div className={cn("h-full rounded-full transition-all duration-1000")} style={{ width: `${channel.value}%`, backgroundColor: channel.color }}></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Top High-Value Consumers */}
                        <div className="bg-white rounded-[3.5rem] p-10 border border-slate-100 shadow-sm relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-48 h-48 bg-amber-50/50 rounded-bl-full -mr-12 -mt-12 -z-0"></div>
                            <div className="relative z-10">
                                <h3 className="text-xl font-black text-slate-800 tracking-tight mb-10 flex items-center gap-3">
                                    <Users size={20} className="text-amber-500" /> High-Value Consumers
                                </h3>
                                <div className="space-y-4">
                                    {(topCustomers || []).map((customer, i) => (
                                        <div key={i} className="flex items-center justify-between p-6 bg-slate-50/10 border border-slate-100/50 rounded-3xl hover:bg-white hover:shadow-lg transition-all group">
                                            <div className="flex items-center gap-6">
                                                <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center font-black text-amber-600 text-xs shadow-sm">
                                                    {(customer.name || 'C').charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="font-black text-slate-800 text-sm tracking-tight">{customer.name}</p>
                                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{customer.orders_count} Successful Acquisitions</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm font-black text-slate-900">৳{parseFloat(customer.orders_sum_total || 0).toLocaleString()}</p>
                                                <span className="text-[10px] font-black uppercase text-amber-500 bg-amber-50 px-2 py-0.5 rounded-full">Top Tier</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filter Modal */}
            {isFilterOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-3xl animate-in fade-in duration-300">
                    <div className="bg-white w-full max-w-lg rounded-[3rem] p-12 shadow-2xl relative animate-in zoom-in-95 duration-500">
                        <button onClick={() => setIsFilterOpen(false)} className="absolute top-10 right-10 text-slate-300 hover:text-slate-900 transition-colors">
                            <X size={24} />
                        </button>
                        <h2 className="text-3xl font-black text-slate-800 tracking-tight mb-2 flex items-center gap-4">
                            <Filter size={28} className="text-emerald-600" /> Strategic Range
                        </h2>
                        <p className="text-slate-400 font-medium mb-10">Define the temporal window for intelligence extraction.</p>
                        
                        <form onSubmit={applyFilter} className="space-y-8">
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Egress Point</label>
                                    <input 
                                        type="date" 
                                        className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 text-sm font-bold focus:ring-2 focus:ring-emerald-100"
                                        value={dateRange.start_date}
                                        onChange={e => setDateRange({...dateRange, start_date: e.target.value})}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Ingress Point</label>
                                    <input 
                                        type="date" 
                                        className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 text-sm font-bold focus:ring-2 focus:ring-emerald-100"
                                        value={dateRange.end_date}
                                        onChange={e => setDateRange({...dateRange, end_date: e.target.value})}
                                    />
                                </div>
                            </div>
                            <button type="submit" className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 active:scale-95">
                                Recalibrate Intelligence
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}

const RefreshCcw = ({ size, className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 16h5v5"/></svg>
);
