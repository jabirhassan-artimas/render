import React from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { Head, Link } from '@inertiajs/react';
import { 
    ChevronRight, 
    ArrowRight,
    CheckCircle2,
    Target,
    Users,
    Zap,
    Truck,
    ShieldCheck,
    RefreshCcw,
    Headphones,
    Star,
    ShoppingBag
} from 'lucide-react';

export default function CMSPage({ page, services, testimonials }) {
    return (
        <AppLayout>
            <Head title={page.title} />

            <div className="pb-32">
                {/* Hero / Header */}
                <div className="bg-slate-900 pt-20 pb-32 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-600 opacity-10 blur-[120px] rounded-full -mr-32 -mt-32"></div>
                    
                    <div className="container mx-auto px-4 md:px-6 relative z-10 text-center max-w-4xl">
                        <nav className="flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-8">
                            <Link href="/" className="hover:text-emerald-400">Home</Link>
                            <ChevronRight size={12} />
                            <span className="text-emerald-500">{page.title}</span>
                        </nav>
                        <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight leading-tight mb-8">
                            {page.title}
                        </h1>
                        <p className="text-slate-400 text-xl font-medium leading-relaxed">
                            {page.subtitle || "Learn more about our mission, our values, and the dedicated team working behind the scenes to deliver excellence to your doorstep."}
                        </p>
                    </div>
                </div>

                {/* Content */}
                <div className="container mx-auto px-4 md:px-6 -mt-16 relative z-20">
                    <div className="bg-white rounded-[3rem] p-12 md:p-20 shadow-2xl shadow-slate-200 border border-slate-50">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
                            {/* Main Body */}
                            <div className="lg:col-span-8">
                                <div 
                                    className="prose prose-slate max-w-none prose-headings:font-black prose-headings:tracking-tight prose-p:text-slate-500 prose-p:text-lg prose-p:leading-loose text-slate-600"
                                    dangerouslySetInnerHTML={{ __html: page.content }}
                                />
                            </div>

                            {/* Sidebar Info / Stats */}
                            <div className="lg:col-span-4 space-y-12">
                                <div className="p-10 bg-emerald-600 rounded-[2.5rem] text-white shadow-xl shadow-emerald-200 relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 blur-2xl rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
                                    <h3 className="text-2xl font-black mb-4 relative z-10">Have questions?</h3>
                                    <p className="text-emerald-100 font-medium mb-8 relative z-10 opacity-80">Our support team is ready to assist you with any inquiries about our services or policies.</p>
                                    <Link href="#" className="inline-flex items-center gap-3 bg-white text-emerald-600 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg hover:bg-slate-50 transition-all active:scale-95 relative z-10">
                                        Contact Support <ArrowRight size={18} />
                                    </Link>
                                </div>

                                <div className="space-y-6">
                                    <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 px-1">Our Core Values</h4>
                                    {[
                                        { icon: Target, title: "Precision", text: "Quality in every single detail." },
                                        { icon: Users, title: "Community", text: "Customer satisfaction is our cult." },
                                        { icon: Zap, title: "Innovation", text: "Driving the future of commerce." }
                                    ].map((item, i) => (
                                        <div key={i} className="flex gap-4 p-6 bg-slate-50 rounded-[2rem] border border-slate-100 group hover:border-emerald-100 hover:bg-white transition-all">
                                            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-emerald-600 shadow-sm shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                                                <item.icon size={20} />
                                            </div>
                                            <div>
                                                <h5 className="font-black text-slate-800 text-sm">{item.title}</h5>
                                                <p className="text-slate-500 text-xs font-bold leading-relaxed">{item.text}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Services Section (If About Us) */}
                {services?.length > 0 && (
                    <div className="container mx-auto px-4 md:px-6 pt-32 text-center">
                        <span className="text-emerald-600 text-[10px] font-black uppercase tracking-[0.3em] mb-4 block">What We Offer</span>
                        <h2 className="text-4xl md:text-6xl font-black text-slate-800 tracking-tight leading-tight mb-20 max-w-4xl mx-auto">
                            Excellence in every interaction.
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                            {services.map((service, i) => {
                                const icons = { Target, Users, Zap, Truck, ShieldCheck, RefreshCcw, Headphones, Star, ShoppingBag };
                                const IconComponent = icons[service.icon] || Zap;
                                
                                return (
                                <div key={i} className="group flex flex-col items-center">
                                    <div className="w-40 h-40 bg-slate-100 rounded-[3rem] overflow-hidden mb-8 relative flex items-center justify-center p-8 group-hover:bg-emerald-600 transition-all duration-700 shadow-inner group-hover:shadow-emerald-200">
                                        <IconComponent className="w-16 h-16 text-slate-300 group-hover:text-white transition-all duration-500" strokeWidth={1.5} />
                                    </div>
                                    <h3 className="text-2xl font-black text-slate-800 mb-4 group-hover:text-emerald-600 transition-colors tracking-tight">{service.title || service.name}</h3>
                                    <p className="text-slate-500 font-medium leading-relaxed max-w-xs">{service.description}</p>
                                </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
