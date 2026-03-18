import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { 
    Mail, 
    Lock, 
    ArrowRight, 
    ShoppingBag, 
    Loader2,
    CheckCircle2,
    Eye,
    Sparkles,
    Heart
} from 'lucide-react';

const AlponaPattern = () => (
    <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 opacity-10 pointer-events-none">
        <defs>
            <pattern id="alpona" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="10" cy="10" r="2" fill="white" />
                <path d="M10 2 Q14 2 14 6 T10 10 T6 6 T10 2" fill="none" stroke="white" strokeWidth="0.5" />
                <path d="M0 10 Q5 5 10 10 T20 10" fill="none" stroke="white" strokeWidth="0.2" />
                <path d="M10 0 Q5 5 10 10 T10 20" fill="none" stroke="white" strokeWidth="0.2" />
            </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#alpona)" />
    </svg>
);

export default function Login({ settings }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('login'));
    };

    return (
        <div className="min-h-screen bg-[#FFFBF0] flex flex-col font-sans text-slate-900 overflow-hidden">
            <Head title="Login | Traditional Elegance" />

            <div className="flex-1 flex flex-col lg:flex-row">
                {/* Left: Traditional Heritage Side */}
                <div className="hidden lg:flex lg:w-1/2 bg-[#800000] relative overflow-hidden items-center justify-center p-20">
                    {/* Alpona Background */}
                    <AlponaPattern />
                    
                    {/* Decorative Elements */}
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#DAA520] opacity-20 blur-[150px] rounded-full -mr-32 -mt-32"></div>
                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-red-900 opacity-40 blur-[100px] rounded-full -ml-32 -mb-32"></div>
                    
                    <div className="relative z-10 max-w-lg text-center md:text-left">
                        <Link href="/" className="inline-flex items-center gap-3 mb-16 group">
                            <div className="w-20 h-20 bg-[#DAA520] rounded-[2rem] flex items-center justify-center text-[#800000] shadow-2xl shadow-black/20 group-hover:rotate-12 transition-all duration-500 border-4 border-[#800000]/20">
                                <ShoppingBag size={40} />
                            </div>
                            <div className="flex flex-col">
                                <span className="font-black text-4xl tracking-tighter text-white">
                                    {settings?.site_title || 'Nokshi'}
                                </span>
                                <span className="text-[#DAA520] text-[10px] font-black uppercase tracking-[0.5em] mt-[-4px]">Heritage Store</span>
                            </div>
                        </Link>

                        <h2 className="text-5xl md:text-7xl font-black text-white leading-[1.1] mb-8 tracking-tighter">
                            Reconnect with <br/> 
                            <span className="text-[#DAA520]">Banglar</span> Heritage.
                        </h2>
                        <p className="text-red-100/70 text-xl font-medium leading-relaxed mb-12 max-w-md">
                            Sign in to access your curated collection of traditional craftsmanship and artisanal masterpieces.
                        </p>

                        <div className="grid grid-cols-1 gap-6">
                            {[
                                { text: "Hand-picked Artisanal Quality", icon: Sparkles },
                                { text: "Supporting Local Craftsmen", icon: Heart },
                                { text: "Guaranteed Heritage Authenticity", icon: CheckCircle2 }
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-5 p-5 bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 hover:bg-white/10 transition-colors">
                                    <div className="w-10 h-10 bg-[#DAA520] text-[#800000] rounded-xl flex items-center justify-center shrink-0 shadow-lg">
                                        <item.icon size={20} />
                                    </div>
                                    <span className="text-white font-bold text-sm tracking-tight">{item.text}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Rickshaw Art Style Motif (Bottom Right) */}
                    <div className="absolute -bottom-20 -right-20 w-80 h-80 opacity-10">
                         <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                            <path fill="#DAA520" d="M44.7,-76.4C58.2,-69.3,69.7,-57.4,77.3,-43.5C84.8,-29.6,88.4,-14.8,87.6,-0.5C86.7,13.8,81.4,27.7,73.5,40.9C65.5,54.2,54.9,66.8,41.7,74.7C28.4,82.5,12.5,85.6,-2.9,90.6C-18.3,95.6,-33.2,102.5,-46.4,98.6C-59.5,94.8,-70.9,80.1,-79.1,65.2C-87.3,50.3,-92.3,35.2,-93.4,20C-94.5,4.8,-91.7,-10.5,-85.7,-24.1C-79.6,-37.6,-70.3,-49.4,-58.5,-57.1C-46.7,-64.8,-32.4,-68.4,-18.9,-75.6C-5.4,-82.8,7.3,-93.5,21.8,-92.2C36.3,-90.9,44.7,-76.4,44.7,-76.4Z" transform="translate(100 100)" />
                         </svg>
                    </div>
                </div>

                {/* Right: Elegant Form Side */}
                <div className="flex-1 flex items-center justify-center p-8 md:p-12 lg:p-24 bg-[#FFFBF0] relative">
                    {/* Floating Alpona for Mobile */}
                    <div className="lg:hidden absolute top-[-50px] right-[-50px] w-64 h-64 bg-[#DAA520] opacity-5 blur-3xl rounded-full"></div>

                    <div className="w-full max-w-md relative z-10">
                        <div className="lg:hidden flex justify-center mb-16">
                            <Link href="/" className="flex flex-col items-center group">
                                <div className="w-16 h-16 bg-[#800000] rounded-2xl flex items-center justify-center text-[#DAA520] shadow-xl shadow-red-900/20 mb-4 transition-transform group-hover:scale-110">
                                    <ShoppingBag size={32} />
                                </div>
                                <span className="font-black text-2xl tracking-tight text-[#800000]">
                                    {settings?.site_title || 'Nokshi'}
                                </span>
                            </Link>
                        </div>

                        <div className="mb-12 text-center lg:text-left">
                            <h1 className="text-4xl font-black text-[#800000] tracking-tight mb-3">Shuba Swagatam</h1>
                            <p className="text-slate-500 font-medium">Please enter your details to continue your heritage journey.</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-8">
                            <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-[#800000]/60 px-2">Anchol Address (Email)</label>
                                <div className="relative group">
                                    <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-[#800000]/30 group-focus-within:text-[#800000] transition-colors" size={18} />
                                    <input 
                                        type="email" 
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        placeholder="yourname@heritage.com"
                                        className="w-full bg-white border-2 border-[#800000]/5 pl-16 pr-6 py-5 rounded-[2.5rem] text-sm font-bold focus:ring-4 focus:ring-[#DAA520]/20 focus:border-[#DAA520] transition-all shadow-sm"
                                    />
                                </div>
                                {errors.email && <p className="text-rose-600 text-[10px] font-black uppercase tracking-widest mt-2 px-6">{errors.email}</p>}
                            </div>

                            <div className="space-y-3">
                                <div className="flex justify-between items-center px-2">
                                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-[#800000]/60">Gopon Songket (Password)</label>
                                    <Link href="#" className="text-[10px] font-black uppercase tracking-widest text-[#DAA520] hover:text-[#800000] transition-colors">Forgot?</Link>
                                </div>
                                <div className="relative group">
                                    <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-[#800000]/30 group-focus-within:text-[#800000] transition-colors" size={18} />
                                    <input 
                                        type="password" 
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        placeholder="••••••••"
                                        className="w-full bg-white border-2 border-[#800000]/5 pl-16 pr-6 py-5 rounded-[2.5rem] text-sm font-bold focus:ring-4 focus:ring-[#DAA520]/20 focus:border-[#DAA520] transition-all shadow-sm"
                                    />
                                    <button type="button" className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-300 hover:text-[#800000]">
                                        <Eye size={18} />
                                    </button>
                                </div>
                                {errors.password && <p className="text-rose-600 text-[10px] font-black uppercase tracking-widest mt-2 px-6">{errors.password}</p>}
                            </div>

                            <div className="flex items-center px-4">
                                <label className="flex items-center gap-4 cursor-pointer group">
                                    <div className="relative">
                                        <input 
                                            type="checkbox" 
                                            checked={data.remember}
                                            onChange={(e) => setData('remember', e.target.checked)}
                                            className="w-6 h-6 rounded-lg border-2 border-[#800000]/10 text-[#800000] focus:ring-[#DAA520] focus:ring-offset-0 transition-all cursor-pointer"
                                        />
                                    </div>
                                    <span className="text-xs font-black text-slate-600 group-hover:text-[#800000] transition-colors uppercase tracking-widest">Remember my preference</span>
                                </label>
                            </div>

                            <button 
                                disabled={processing}
                                className="w-full bg-[#800000] hover:bg-black text-white py-6 rounded-[2.5rem] font-black text-sm uppercase tracking-[0.2em] shadow-3xl shadow-red-900/20 transition-all flex items-center justify-center gap-3 active:scale-[0.98] disabled:opacity-50 group border-b-8 border-black/20"
                            >
                                {processing ? (
                                    <Loader2 className="animate-spin" size={24} />
                                ) : (
                                    <>Probesh Korun (Sign In) <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" /></>
                                )}
                            </button>
                        </form>

                        <div className="mt-16 text-center border-t border-[#800000]/5 pt-12">
                            <p className="text-slate-400 font-bold text-sm">
                                Not a member of the heritage yet? <br/>
                                <Link href={route('register')} className="text-[#DAA520] font-black uppercase tracking-widest hover:text-[#800000] transition-all mt-4 inline-block">Join our Sangha</Link>
                            </p>
                        </div>
                    </div>

                    {/* Footer decoration with Nokshi border effect */}
                    <div className="absolute bottom-0 left-0 right-0 h-2 bg-[#DAA520] opacity-30"></div>
                    <div className="absolute bottom-12 left-0 right-0 text-center px-8">
                        <p className="text-[9px] font-black text-red-900/20 uppercase tracking-[0.5em]">
                            Artisanal Security &copy; {new Date().getFullYear()} {settings?.site_title || 'Nokshi Heritage'}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
