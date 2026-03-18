import React from 'react';
import CustomerLayout from '@/Layouts/CustomerLayout';
import { Head, useForm, usePage } from '@inertiajs/react';
import { 
    User, 
    Mail, 
    Phone, 
    MapPin, 
    Lock,
    ShieldCheck,
    Save,
    Loader2
} from 'lucide-react';

export default function Profile({ user }) {
    const { data, setData, put, processing, errors } = useForm({
        name: user.name || '',
        phone: user.phone || '',
        address: user.address || '',
        password: '',
        password_confirmation: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('customer.profile.update'), {
            preserveScroll: true,
            onSuccess: () => {
                setData('password', '');
                setData('password_confirmation', '');
            }
        });
    };

    return (
        <CustomerLayout>
            <Head title="My Profile" />

            <div className="space-y-12">
                <div className="pb-2 border-b border-slate-100">
                    <h1 className="text-4xl font-black text-slate-800 tracking-tight mb-2">Account Settings</h1>
                    <p className="text-slate-400 font-medium italic">Manage your digital identity and security</p>
                </div>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Basic Info */}
                    <div className="lg:col-span-8 space-y-10">
                        <section className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm space-y-8">
                            <div className="flex items-center gap-4 mb-2">
                                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                                    <User size={20} />
                                </div>
                                <h3 className="text-xl font-black text-slate-800 tracking-tight">Basic Credentials</h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 px-1">Full Identity</label>
                                    <div className="relative">
                                        <User className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                                        <input 
                                            type="text" 
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            className="w-full bg-slate-50 border-none pl-14 pr-6 py-4 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-blue-100 transition-all"
                                        />
                                    </div>
                                    {errors.name && <p className="text-rose-500 text-[10px] font-bold px-2">{errors.name}</p>}
                                </div>

                                <div className="space-y-2 opacity-60 cursor-not-allowed">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 px-1">Email Address (Locked)</label>
                                    <div className="relative">
                                        <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                                        <input 
                                            type="email" 
                                            value={user.email}
                                            disabled
                                            className="w-full bg-slate-100 border-none pl-14 pr-6 py-4 rounded-2xl text-sm font-bold cursor-not-allowed"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 px-1">Personal Phone</label>
                                    <div className="relative">
                                        <Phone className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                                        <input 
                                            type="tel" 
                                            value={data.phone}
                                            onChange={(e) => setData('phone', e.target.value)}
                                            className="w-full bg-slate-50 border-none pl-14 pr-6 py-4 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-blue-100 transition-all"
                                        />
                                    </div>
                                    {errors.phone && <p className="text-rose-500 text-[10px] font-bold px-2">{errors.phone}</p>}
                                </div>

                                <div className="md:col-span-2 space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 px-1">Permanent Residence</label>
                                    <div className="relative">
                                        <MapPin className="absolute left-6 top-6 text-slate-300" size={18} />
                                        <textarea 
                                            value={data.address}
                                            onChange={(e) => setData('address', e.target.value)}
                                            rows="3"
                                            className="w-full bg-slate-50 border-none pl-14 pr-6 py-4 rounded-3xl text-sm font-bold focus:ring-2 focus:ring-blue-100 transition-all resize-none"
                                        />
                                    </div>
                                    {errors.address && <p className="text-rose-500 text-[10px] font-bold px-2">{errors.address}</p>}
                                </div>
                            </div>
                        </section>

                        <section className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm space-y-8">
                            <div className="flex items-center gap-4 mb-2">
                                <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
                                    <Lock size={20} />
                                </div>
                                <h3 className="text-xl font-black text-slate-800 tracking-tight">Access Security</h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 px-1">New Password</label>
                                    <input 
                                        type="password" 
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        placeholder="••••••••"
                                        className="w-full bg-slate-50 border-none px-6 py-4 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-blue-100 transition-all"
                                    />
                                    {errors.password && <p className="text-rose-500 text-[10px] font-bold px-2">{errors.password}</p>}
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 px-1">Re-type Passphrase</label>
                                    <input 
                                        type="password" 
                                        value={data.password_confirmation}
                                        onChange={(e) => setData('password_confirmation', e.target.value)}
                                        placeholder="••••••••"
                                        className="w-full bg-slate-50 border-none px-6 py-4 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-blue-100 transition-all"
                                    />
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Actions Side */}
                    <div className="lg:col-span-4 space-y-8">
                        <div className="bg-slate-900 p-10 rounded-[3.5rem] shadow-2xl shadow-slate-200">
                            <h4 className="text-white font-black text-xl mb-6 tracking-tight">Sync Changes</h4>
                            <p className="text-slate-400 font-medium text-sm mb-10 leading-relaxed">Save your updated profile information to sync across all your devices and checkout forms.</p>
                            
                            <button 
                                disabled={processing}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-500/20 transition-all flex items-center justify-center gap-3 active:scale-95 disabled:opacity-50 group"
                            >
                                {processing ? (
                                    <Loader2 className="animate-spin" size={20} />
                                ) : (
                                    <>Commit Changes <Save size={18} className="group-hover:-rotate-12 transition-transform" /></>
                                )}
                            </button>

                            <div className="mt-10 pt-8 border-t border-white/5 flex items-start gap-4">
                                <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-emerald-500 shrink-0">
                                    <ShieldCheck size={20} />
                                </div>
                                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-relaxed">
                                    Protected by end-to-end encryption.
                                </p>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </CustomerLayout>
    );
}
