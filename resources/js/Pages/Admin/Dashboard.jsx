import React, { useMemo } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link } from '@inertiajs/react';
import { 
    Users, 
    ShoppingCart, 
    TrendingUp, 
    DollarSign, 
    ArrowUpRight, 
    ArrowDownRight,
    Eye,
    Package,
    Clock,
    CheckCircle2,
    XCircle,
    BarChart3
} from 'lucide-react';
import { 
    LineChart, 
    Line, 
    AreaChart, 
    Area, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell
} from 'recharts';

const StatCard = ({ title, value, icon: Icon, trend, trendValue, gradient, iconBg }) => (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col justify-between h-44 relative overflow-hidden group">
        <div className={`absolute top-0 right-0 w-32 h-32 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity -mr-8 -mt-8 rounded-full ${gradient}`}></div>
        
        <div className="flex justify-between items-start z-10">
            <div className={`p-4 rounded-2xl ${iconBg} text-white shadow-lg`}>
                <Icon size={24} />
            </div>
            {trend && (
                <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${trend === 'up' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                    {trend === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                    {trendValue}
                </div>
            )}
        </div>

        <div className="z-10 mt-4">
            <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">{title}</p>
            <h3 className="text-2xl font-black text-slate-800 mt-1">{value}</h3>
        </div>
    </div>
);

export default function Dashboard(props) {
    const { stats, salesToday, ordersToday, avgOrderValue, monthlyRevenue, topProducts, recentActivity } = props;

    const chartData = useMemo(() => {
        return monthlyRevenue.map(item => ({
            name: item.month_name.substring(0, 3),
            revenue: parseFloat(item.revenue),
            orders: parseFloat(item.revenue) * 0.7 // Simulated for visual variety
        }));
    }, [monthlyRevenue]);

    const pieData = [
        { name: 'Facebook', value: 33, color: '#4361ee' },
        { name: 'Youtube', value: 55, color: '#ff52d9' },
        { name: 'Direct', value: 12, color: '#ffb547' },
    ];

    const getStatusStyles = (status) => {
        switch(status?.toLowerCase()) {
            case 'delivered': return 'bg-emerald-50 text-emerald-600';
            case 'pending': return 'bg-amber-50 text-amber-600';
            case 'cancelled': return 'bg-rose-50 text-rose-600';
            default: return 'bg-blue-50 text-blue-600';
        }
    };

    return (
        <AdminLayout>
            <Head title="Admin Dashboard" />
            
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-black text-slate-800 tracking-tight">System Analytics</h1>
                        <p className="text-slate-400 font-medium mt-1">Grettings! Here is what's happening today.</p>
                    </div>
                    <div className="flex p-1 bg-white rounded-2xl border border-slate-100 shadow-sm w-fit">
                        {['Daily', 'Weekly', 'Monthly', 'Yearly'].map((range) => (
                            <button 
                                key={range}
                                className={`px-4 py-2 text-xs font-black uppercase tracking-widest rounded-xl transition-all ${range === 'Monthly' ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'text-slate-400 hover:text-slate-600'}`}
                            >
                                {range}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard 
                        title="Total Revenue" 
                        value={`৳${parseFloat(stats.revenue).toLocaleString()}`}
                        icon={DollarSign}
                        trend="up"
                        trendValue="+12.5%"
                        gradient="bg-blue-600"
                        iconBg="bg-blue-600"
                    />
                    <StatCard 
                        title="New Orders" 
                        value={stats.orders}
                        icon={ShoppingCart}
                        trend="up"
                        trendValue="+8.2%"
                        gradient="bg-fuchsia-600"
                        iconBg="bg-fuchsia-600"
                    />
                    <StatCard 
                        title="Active Customers" 
                        value={stats.users}
                        icon={Users}
                        trend="down"
                        trendValue="-2.4%"
                        gradient="bg-orange-500"
                        iconBg="bg-orange-500"
                    />
                    <StatCard 
                        title="Total Products" 
                        value={stats.products}
                        icon={Package}
                        gradient="bg-indigo-600"
                        iconBg="bg-indigo-600"
                    />
                </div>

                {/* Tactical Operations Center */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-[60px] rounded-full -mr-16 -mt-16 group-hover:scale-125 transition-transform duration-1000"></div>
                        <div className="relative z-10">
                            <h4 className="text-[10px] font-black uppercase text-slate-500 tracking-[0.3em] mb-4">Logistics Alert</h4>
                            <div className="flex items-end justify-between">
                                <div>
                                    <p className="text-3xl font-black tracking-tight">{stats.pending_courier}</p>
                                    <p className="text-xs font-bold text-slate-400 mt-1">Orders awaiting courier assignment</p>
                                </div>
                                <Link href={route('admin.orders.index')} className="p-4 bg-white/5 hover:bg-white/10 rounded-2xl transition-all">
                                    <ArrowUpRight size={20} className="text-blue-400" />
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-rose-50 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-110"></div>
                        <div className="relative z-10">
                            <h4 className="text-[10px] font-black uppercase text-rose-300 tracking-[0.3em] mb-4">Security Protocol</h4>
                            <div className="flex items-end justify-between">
                                <div>
                                    <p className="text-3xl font-black text-slate-800 tracking-tight">{stats.blocked_users}</p>
                                    <p className="text-xs font-bold text-slate-400 mt-1">Restricted malicious IPs detected</p>
                                </div>
                                <Link href={route('admin.customers.index')} className="p-4 bg-rose-50 hover:bg-rose-100 rounded-2xl transition-all">
                                    <XCircle size={20} className="text-rose-500" />
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="bg-blue-600 rounded-[2.5rem] p-8 text-white relative overflow-hidden group shadow-xl shadow-blue-100">
                        <div className="absolute inset-0 bg-gradient-to-tr from-blue-700 to-indigo-600"></div>
                        <div className="relative z-10 flex flex-col h-full justify-between">
                            <div className="flex justify-between items-start">
                                <h4 className="text-[10px] font-black uppercase text-blue-200 tracking-[0.3em]">Quick Strategic View</h4>
                                <BarChart3 size={18} className="text-blue-200" />
                            </div>
                            <div className="mt-4">
                                <p className="text-xs font-medium leading-relaxed opacity-90 mb-4">You have {ordersToday} transactions today. Review performance analytics for deeper insights.</p>
                                <Link href={route('admin.reports.index')} className="inline-block bg-white text-blue-600 px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest hover:shadow-lg transition-all">
                                    Open Report Hub
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Charts Row */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Revenue Line Chart */}
                    <div className="lg:col-span-2 bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 flex flex-col h-[450px]">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h3 className="text-xl font-black text-slate-800 tracking-tight">Revenue Overview</h3>
                                <p className="text-slate-400 text-sm font-medium">Monthly performance trends</p>
                            </div>
                            <div className="flex gap-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                                    <span className="text-xs font-bold text-slate-500">Revenue</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-fuchsia-400"></div>
                                    <span className="text-xs font-bold text-slate-500">Projection</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex-1 w-full min-h-0 relative">
                            <ResponsiveContainer width="99%" height="100%" debounce={1}>
                                <AreaChart data={chartData}>
                                    <defs>
                                        <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#4361ee" stopOpacity={0.15}/>
                                            <stop offset="95%" stopColor="#4361ee" stopOpacity={0}/>
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                    <XAxis 
                                        dataKey="name" 
                                        axisLine={false} 
                                        tickLine={false} 
                                        tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 'bold' }} 
                                        dy={10}
                                    />
                                    <YAxis 
                                        axisLine={false} 
                                        tickLine={false} 
                                        tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 'bold' }} 
                                    />
                                    <Tooltip 
                                        contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.05)', fontWeight: 'bold' }}
                                    />
                                    <Area 
                                        type="monotone" 
                                        dataKey="revenue" 
                                        stroke="#4361ee" 
                                        strokeWidth={4} 
                                        fillOpacity={1} 
                                        fill="url(#colorRev)"
                                        dot={{ r: 4, fill: '#4361ee', strokeWidth: 2, stroke: '#fff' }}
                                        activeDot={{ r: 6, strokeWidth: 0 }}
                                    />
                                    <Area 
                                        type="monotone" 
                                        dataKey="orders" 
                                        stroke="#f0abfc" 
                                        strokeWidth={4} 
                                        strokeDasharray="8 8" 
                                        fill="transparent"
                                        dot={{ r: 3, fill: '#f0abfc', strokeWidth: 2, stroke: '#fff' }}
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Traffic Pie Chart */}
                    <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 flex flex-col h-[450px]">
                        <h3 className="text-xl font-black text-slate-800 tracking-tight mb-8">Traffic Sources</h3>
                        <div className="flex-1 flex flex-col items-center justify-center">
                            <div className="w-full h-56 relative min-h-0">
                                <ResponsiveContainer width="99%" height="100%" debounce={1}>
                                    <PieChart>
                                        <Pie
                                            data={pieData}
                                            innerRadius={60}
                                            outerRadius={80}
                                            paddingAngle={8}
                                            dataKey="value"
                                        >
                                            {pieData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} cornerRadius={10} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                    </PieChart>
                                </ResponsiveContainer>
                                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                    <span className="text-2xl font-black text-slate-800">100%</span>
                                    <span className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Total</span>
                                </div>
                            </div>

                            <div className="mt-8 space-y-4 w-full">
                                {pieData.map((item) => (
                                    <div key={item.name} className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                                            <span className="text-sm font-bold text-slate-600">{item.name}</span>
                                        </div>
                                        <span className="text-sm font-black text-slate-800">{item.value}%</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recent Activities & Table Row */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-12">
                    {/* Activity Timeline */}
                    <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
                        <h3 className="text-xl font-black text-slate-800 tracking-tight mb-8">Recent Timeline</h3>
                        <div className="space-y-8 relative before:absolute before:inset-y-0 before:left-5 before:w-0.5 before:bg-slate-50">
                            {recentActivity.slice(0, 5).map((order, i) => (
                                <div key={order.id} className="flex gap-6 relative">
                                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 z-10 shadow-lg ${
                                        ['bg-blue-600', 'bg-fuchsia-600', 'bg-emerald-500', 'bg-amber-500', 'bg-indigo-600'][i % 5]
                                    } text-white`}>
                                        <Clock size={18} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] uppercase font-black text-slate-400 tracking-widest leading-none mb-1">
                                            {new Date(order.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </p>
                                        <h4 className="font-black text-slate-800 text-sm">New Order from {order.user?.name || 'Guest'}</h4>
                                        <p className="text-xs text-slate-500 font-medium">Order #{order.id} • ৳{parseFloat(order.total).toLocaleString()}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Orders Table */}
                    <div className="lg:col-span-2 bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-xl font-black text-slate-800 tracking-tight">Recent Sales</h3>
                            <Link href={route('admin.orders.index')} className="text-xs font-black text-blue-600 uppercase tracking-widest hover:underline px-4 py-2 bg-blue-50 rounded-xl">View All</Link>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-slate-50">
                                        <th className="text-left py-4 px-2 text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] w-24">Order ID</th>
                                        <th className="text-left py-4 px-2 text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Customer</th>
                                        <th className="text-left py-4 px-2 text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Amount</th>
                                        <th className="text-left py-4 px-2 text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recentActivity.slice(0, 6).map((order) => (
                                        <tr key={order.id} className="group hover:bg-slate-50/50 transition-colors">
                                            <td className="py-5 px-2">
                                                <span className="font-bold text-slate-800 text-sm">#{order.id}</span>
                                            </td>
                                            <td className="py-5 px-2">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center font-black text-slate-500 text-xs">
                                                        {(order.user?.name || 'G').charAt(0)}
                                                    </div>
                                                    <span className="font-bold text-slate-700 text-sm">{order.user?.name || 'Guest Customer'}</span>
                                                </div>
                                            </td>
                                            <td className="py-5 px-2 font-black text-slate-800 text-sm">
                                                ৳{parseFloat(order.total).toLocaleString()}
                                            </td>
                                            <td className="py-5 px-2">
                                                <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest ${getStatusStyles(order.order_status)}`}>
                                                    {order.order_status || 'Pending'}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
