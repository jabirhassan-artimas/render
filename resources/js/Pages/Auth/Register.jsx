import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { 
    Mail, 
    Lock, 
    User,
    ArrowRight, 
    ShoppingBag, 
    Loader2,
    CheckCircle2,
    Shield,
    Users,
    Gem
} from 'lucide-react';

const AlponaPattern = () => (
    <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 opacity-10 pointer-events-none">
        <defs>
            <pattern id="alpona-teal" x="0" y="0" width="25" height="25" patternUnits="userSpaceOnUse">
                <circle cx="12.5" cy="12.5" r="1.5" fill="white" />
                <path d="M12.5 3 Q17.5 3 17.5 8 T12.5 13 T7.5 8 T12.5 3" fill="none" stroke="white" strokeWidth="0.4" />
                <path d="M0 12.5 Q6.25 6.25 12.5 12.5 T25 12.5" fill="none" stroke="white" strokeWidth="0.15" />
            </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#alpona-teal)" />
    </svg>
);

export default function Register({ settings }) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('register'));
    };

    return (
        <div className="min-h-screen bg-[#F0F7F7] flex flex-col font-sans text-slate-900 overflow-hidden">
            <Head title="Join Our Sangha | Heritage Registration" />

            <div className="flex-1 flex flex-col lg:flex-row">
                {/* Left: Design Side - Heritage Teal */}
                <div className="hidden lg:flex lg:w-1/2 bg-[#004D40] relative overflow-hidden items-center justify-center p-20">
                    <AlponaPattern />
                    
                    <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-teal-400 opacity-10 blur-[120px] rounded-full -mr-48 -mt-48"></div>
                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#DAA520] opacity-20 blur-[100px] rounded-full -ml-32 -mb-32"></div>
                    
                    <div className="relative z-10 max-w-lg">
                        <Link href="/" className="inline-flex items-center gap-3 mb-16 group">
                            <div className="w-16 h-16 bg-[#DAA520] rounded-2xl flex items-center justify-center text-[#004D40] shadow-2xl shadow-teal-900/40 group-hover:scale-110 transition-transform border-2 border-white/20">
                                <ShoppingBag size={32} />
                            </div>
                            <div className="flex flex-col">
                                <span className="font-black text-3xl tracking-tight text-white">
                                    {settings?.site_title || 'Nokshi'}
                                </span>
                                <span className="text-[#DAA520] text-[10px] font-black uppercase tracking-[0.4em] mt-[-2px]">Premium Crafts</span>
                            </div>
                        </Link>

                        <h2 className="text-5xl md:text-7xl font-black text-white leading-[1.1] mb-8 tracking-tighter">
                            Enter the <br/>
                            <span className="text-[#DAA520]">Elite Sangha</span>.
                        </h2>
                        <p className="text-teal-50/70 text-xl font-medium leading-relaxed mb-12">
                            Join a community dedicated to preserving and celebrating the finest artisanal traditions of Bengal.
                        </p>

                        <div className="grid grid-cols-2 gap-8">
                            <div className="bg-white/5 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/10 group hover:bg-white/10 transition-all">
                                <div className="w-12 h-12 bg-[#DAA520]/20 rounded-2xl flex items-center justify-center text-[#DAA520] mb-4">
                                    <Users size={24} />
                                </div>
                                <h3 className="text-white font-black text-3xl mb-1 tracking-tighter">12k+</h3>
                                <p className="text-teal-200/50 text-[10px] font-black uppercase tracking-[0.2em]">Sangha Members</p>
                            </div>
                            <div className="bg-white/5 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/10 group hover:bg-white/10 transition-all">
                                <div className="w-12 h-12 bg-[#DAA520]/20 rounded-2xl flex items-center justify-center text-[#DAA520] mb-4">
                                    <Gem size={24} />
                                </div>
                                <h3 className="text-white font-black text-3xl mb-1 tracking-tighter">Authentic</h3>
                                <p className="text-teal-200/50 text-[10px] font-black uppercase tracking-[0.2em]">Craftsmanship</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right: Form Side */}
                <div className="flex-1 flex items-center justify-center p-8 md:p-12 lg:p-24 bg-[#F0F7F7] relative">
                    <div className="w-full max-w-md relative z-10">
                        <div className="lg:hidden flex justify-center mb-16">
                            <Link href="/" className="flex flex-col items-center group">
                                <div className="w-16 h-16 bg-[#004D40] rounded-2xl flex items-center justify-center text-[#DAA520] shadow-xl shadow-teal-900/20 mb-4 group-hover:scale-110 transition-transform">
                                    <ShoppingBag size={24} />
                                </div>
                                <span className="font-black text-2xl tracking-tight text-[#004D40]">{settings?.site_title}</span>
                            </Link>
                        </div>

                        <div className="mb-12 text-center lg:text-left">
                            <h1 className="text-4xl font-black text-[#004D40] tracking-tight mb-3">Join our Sangha</h1>
                            <p className="text-slate-500 font-medium select-none">Begin your journey into the world of traditional elegance.</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-[#004D40]/60 px-2">Member Name (Full Name)</label>
                                <div className="relative group">
                                    <User className="absolute left-6 top-1/2 -translate-y-1/2 text-[#004D40]/30 group-focus-within:text-[#004D40] transition-colors" size={18} />
                                    <input 
                                        type="text" 
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        placeholder="Bijoy Roy"
                                        className="w-full bg-white border-2 border-[#004D40]/5 pl-16 pr-6 py-5 rounded-[2.5rem] text-sm font-bold focus:ring-4 focus:ring-[#DAA520]/10 focus:border-[#DAA520] transition-all shadow-sm"
                                    />
                                </div>
                                {errors.name && <p className="text-rose-600 text-[10px] font-black mt-1 px-6">{errors.name}</p>}
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-[#004D40]/60 px-2">Digital Anchol (Email)</label>
                                <div className="relative group">
                                    <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-[#004D40]/30 group-focus-within:text-[#004D40] transition-colors" size={18} />
                                    <input 
                                        type="email" 
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        placeholder="bijoy@heritage.com"
                                        className="w-full bg-white border-2 border-[#004D40]/5 pl-16 pr-6 py-5 rounded-[2.5rem] text-sm font-bold focus:ring-4 focus:ring-[#DAA520]/10 focus:border-[#DAA520] transition-all shadow-sm"
                                    />
                                </div>
                                {errors.email && <p className="text-rose-600 text-[10px] font-black mt-1 px-6">{errors.email}</p>}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-[#004D40]/60 px-2">Songket</label>
                                    <div className="relative group">
                                        <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-[#004D40]/30 group-focus-within:text-[#004D40] transition-colors" size={18} />
                                        <input 
                                            type="password" 
                                            value={data.password}
                                            onChange={(e) => setData('password', e.target.value)}
                                            placeholder="••••••••"
                                            className="w-full bg-white border-2 border-[#004D40]/5 pl-16 pr-6 py-5 rounded-[2.5rem] text-sm font-bold focus:ring-4 focus:ring-[#DAA520]/10 focus:border-[#DAA520] transition-all shadow-sm"
                                        />
                                    </div>
                                    {errors.password && <p className="text-rose-600 text-[10px] font-black mt-1 px-6">{errors.password}</p>}
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-[#004D40]/60 px-2">Nischit</label>
                                    <div className="relative group">
                                        <Shield className="absolute left-6 top-1/2 -translate-y-1/2 text-[#004D40]/30 group-focus-within:text-[#004D40] transition-colors" size={18} />
                                        <input 
                                            type="password" 
                                            value={data.password_confirmation}
                                            onChange={(e) => setData('password_confirmation', e.target.value)}
                                            placeholder="••••••••"
                                            className="w-full bg-white border-2 border-[#004D40]/5 pl-16 pr-6 py-5 rounded-[2.5rem] text-sm font-bold focus:ring-4 focus:ring-[#DAA520]/10 focus:border-[#DAA520] transition-all shadow-sm"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="p-5 bg-teal-900/5 rounded-3xl flex items-start gap-4 mb-6 border border-[#004D40]/5">
                                <div className="w-10 h-10 bg-[#004D40] rounded-xl flex items-center justify-center text-[#DAA520] shrink-0 shadow-lg">
                                    <CheckCircle2 size={18} />
                                </div>
                                <p className="text-[10px] font-black text-[#004D40] leading-relaxed uppercase tracking-[0.15em] pt-1">
                                    Heritage Guarantee: Your registration is secured with premium 256-bit encryption.
                                </p>
                            </div>

                            <button 
                                disabled={processing}
                                className="w-full bg-[#004D40] hover:bg-black text-white py-6 rounded-[2.5rem] font-black text-sm uppercase tracking-[0.2em] shadow-3xl shadow-teal-900/20 transition-all flex items-center justify-center gap-3 active:scale-[0.98] disabled:opacity-50 group border-b-8 border-black/20"
                            >
                                {processing ? <Loader2 className="animate-spin" size={24} /> : <>Sart Karun (Register) <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" /></>}
                            </button>
                        </form>

                        <div className="mt-16 text-center border-t border-[#004D40]/5 pt-12">
                            <p className="text-slate-400 font-bold text-sm">
                                Already part of our heritage? <br/>
                                <Link href={route('login')} className="text-[#DAA520] font-black uppercase tracking-widest hover:text-[#004D40] transition-colors mt-4 inline-block">Probesh Korun (Log In)</Link>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Vertical Rickshaw Accent */}
                <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-transparent via-[#DAA520]/20 to-transparent"></div>
            </div>
        </div>
    );
}
