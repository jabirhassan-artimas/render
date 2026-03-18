import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { ChevronLeft, Save, Ticket, DollarSign, Percent, Calendar, Check } from 'lucide-react';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        code: '',
        discount_amount: '',
        discount_percentage: '',
        expires_at: '',
        status: true,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.coupons.store'));
    };

    return (
        <AdminLayout>
            <Head title="Generate Coupon" />

            <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {/* Header */}
                <div className="flex items-center gap-4">
                    <Link 
                        href={route('admin.coupons.index')}
                        className="p-3 bg-white border border-slate-100 text-slate-400 hover:text-blue-600 rounded-2xl transition-all shadow-sm group"
                    >
                        <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-black text-slate-800 tracking-tight">New Coupon Code</h1>
                        <p className="text-slate-500 text-sm font-medium">Create a promotional code for marketing campaigns.</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-sm space-y-8">
                        {/* Coupon Code */}
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">
                                <Ticket size={12} /> Unique Code
                            </label>
                            <input 
                                type="text"
                                value={data.code}
                                onChange={e => setData('code', e.target.value.toUpperCase())}
                                className="w-full bg-slate-50 border-none px-6 py-4 rounded-2xl text-lg font-black tracking-[0.1em] focus:ring-2 focus:ring-blue-100 transition-all uppercase"
                                placeholder="E.G. SAVE30"
                            />
                            {errors.code && <p className="text-rose-500 text-[10px] font-bold uppercase tracking-widest ml-1">{errors.code}</p>}
                        </div>

                        {/* Discount Types */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">
                                    <DollarSign size={12} /> Fixed Amount (৳)
                                </label>
                                <input 
                                    type="number"
                                    value={data.discount_amount}
                                    onChange={e => setData('discount_amount', e.target.value)}
                                    className="w-full bg-slate-50 border-none px-6 py-4 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-blue-100 transition-all font-mono"
                                    placeholder="0.00"
                                />
                                {errors.discount_amount && <p className="text-rose-500 text-[10px] font-bold uppercase tracking-widest ml-1">{errors.discount_amount}</p>}
                            </div>
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">
                                    <Percent size={12} /> Percentage (%)
                                </label>
                                <input 
                                    type="number"
                                    value={data.discount_percentage}
                                    onChange={e => setData('discount_percentage', e.target.value)}
                                    className="w-full bg-slate-50 border-none px-6 py-4 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-blue-100 transition-all font-mono"
                                    placeholder="1 - 100"
                                    max="100"
                                    min="1"
                                />
                                {errors.discount_percentage && <p className="text-rose-500 text-[10px] font-bold uppercase tracking-widest ml-1">{errors.discount_percentage}</p>}
                            </div>
                        </div>

                        {/* Expiry */}
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">
                                <Calendar size={12} /> Expiry Date (Optional)
                            </label>
                            <input 
                                type="date"
                                value={data.expires_at}
                                onChange={e => setData('expires_at', e.target.value)}
                                className="w-full bg-slate-50 border-none px-6 py-4 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-blue-100 transition-all"
                            />
                        </div>

                        {/* Status Toggle */}
                        <div className="pt-6 border-t border-slate-50">
                            <label className="flex items-center gap-4 cursor-pointer group">
                                <div className="relative">
                                    <input 
                                        type="checkbox"
                                        checked={data.status}
                                        onChange={e => setData('status', e.target.checked)}
                                        className="sr-only"
                                    />
                                    <div className={cn(
                                        "w-14 h-8 rounded-full transition-all duration-300 shadow-inner",
                                        data.status ? "bg-emerald-500" : "bg-slate-200"
                                    )}></div>
                                    <div className={cn(
                                        "absolute top-1 left-1 bg-white w-6 h-6 rounded-full transition-all duration-300 shadow-sm flex items-center justify-center",
                                        data.status ? "translate-x-6" : "translate-x-0"
                                    )}>
                                        {data.status && <Check size={14} className="text-emerald-500" />}
                                    </div>
                                </div>
                                <div>
                                    <p className="text-xs font-black text-slate-800 uppercase tracking-tight">Active Now</p>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Allow customers to use this code</p>
                                </div>
                            </label>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end gap-3 pb-10">
                        <Link 
                            href={route('admin.coupons.index')}
                            className="bg-white text-slate-500 px-10 py-5 rounded-[2rem] font-black text-xs uppercase tracking-widest border border-slate-100 hover:bg-slate-50 transition-all font-sans"
                        >
                            Cancel
                        </Link>
                        <button 
                            type="submit"
                            disabled={processing}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-5 rounded-[2rem] font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-100 transition-all flex items-center gap-3 active:scale-95 disabled:opacity-50 font-sans"
                        >
                            <Save size={18} /> {processing ? '...' : 'Deploy Coupon'}
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}

function cn(...inputs) {
    return inputs.filter(Boolean).join(' ');
}
