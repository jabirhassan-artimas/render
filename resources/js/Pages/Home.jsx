import React, { useMemo, useState, useEffect } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { Head, Link } from '@inertiajs/react';
import { 
    ChevronRight, 
    ArrowRight, 
    ShoppingBag, 
    Star, 
    Truck, 
    ShieldCheck, 
    RefreshCcw, 
    Headphones,
    ArrowLeft
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
    return twMerge(clsx(inputs));
}

const ProductCard = ({ product }) => (
    <div className="group bg-white rounded-[2rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-blue-200/40 transition-all duration-500 flex flex-col h-full">
        <div className="relative aspect-[4/5] overflow-hidden">
            <img 
                src={product.thumbnail ? (product.thumbnail.startsWith('http') ? product.thumbnail : `/storage/${product.thumbnail.replace(/^\//, '')}`) : 'https://images.unsplash.com/photo-1560343090-f0409e92791a?auto=format&fit=crop&q=80&w=800'} 
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute top-4 left-4 flex gap-2">
                {product.is_new && (
                    <span className="bg-emerald-500 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-lg shadow-lg shadow-emerald-200">New</span>
                )}
                {product.discount > 0 && (
                    <span className="bg-rose-500 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-lg shadow-lg shadow-rose-200">-{product.discount}%</span>
                )}
            </div>
            <button className="absolute bottom-4 right-4 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 w-12 h-12 bg-blue-600 text-white rounded-2xl flex items-center justify-center transition-all duration-300 shadow-xl shadow-blue-200 hover:bg-blue-700 active:scale-95">
                <ShoppingBag size={20} />
            </button>
        </div>
        <div className="p-6 flex flex-col flex-1">
            <Link href={route('category', product.category?.slug || 'all')} className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] hover:text-blue-600 transition-colors">
                {product.category?.name || 'General'}
            </Link>
            <Link href={route('product.details', product.slug)} className="mt-2 block font-black text-slate-800 text-lg leading-tight hover:text-blue-600 transition-colors flex-1">
                {product.name}
            </Link>
            <div className="mt-4 flex items-center justify-between">
                <span className="text-xl font-black text-slate-900 tracking-tight">৳{parseFloat(product.price).toLocaleString()}</span>
                <div className="flex items-center gap-1">
                    <Star size={14} className="fill-amber-400 text-amber-400" />
                    <span className="text-xs font-black text-slate-800">4.8</span>
                </div>
            </div>
        </div>
    </div>
);

export default function Home(props) {
    const { sliderBanners, promoBanners, featuredProducts, newArrivals, categories, services, testimonials } = props;
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        if (!sliderBanners || sliderBanners.length <= 1) return;
        const timer = setInterval(() => {
            setCurrentSlide(prev => (prev + 1) % sliderBanners.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [sliderBanners]);


    return (
        <AppLayout title="Premium E-commerce Store">
            <Head title="Premium Shopping Destination" />

            <div className="space-y-32 pb-40">
                {/* Hero Section */}
                <section className="relative overflow-hidden pt-8">
                    <div className="container mx-auto px-4 md:px-6 relative z-10">
                        {sliderBanners && sliderBanners.length > 0 ? (
                            <div className="relative rounded-[3rem] overflow-hidden min-h-[500px] md:min-h-[600px] shadow-2xl shadow-blue-100 bg-slate-900 group">
                                {sliderBanners.map((banner, index) => (
                                    <div 
                                        key={banner.id} 
                                        className={cn(
                                            "absolute inset-0 transition-opacity duration-1000",
                                            currentSlide === index ? "opacity-100 z-10" : "opacity-0 z-0"
                                        )}
                                    >
                                        <div className="absolute inset-0">
                                            <img 
                                                src={banner.image?.startsWith('http') ? banner.image : `/storage/${banner.image?.replace(/^\//, '')}`} 
                                                className="w-full h-full object-cover opacity-60 mix-blend-overlay max-h-[600px]" 
                                                alt={banner.title} 
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/70 to-transparent"></div>
                                        </div>
                                        
                                        <div className="relative z-10 h-full flex items-center p-8 md:p-20">
                                            <div className={cn(
                                                "max-w-2xl transition-all duration-1000",
                                                currentSlide === index ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                                            )}>
                                                {banner.subtitle && (
                                                    <span className="bg-blue-600/30 text-blue-400 text-[10px] font-black uppercase tracking-[0.3em] px-4 py-1.5 rounded-full border border-blue-500/30 backdrop-blur-md inline-block mb-6">
                                                        {banner.subtitle}
                                                    </span>
                                                )}
                                                <h1 className="text-5xl md:text-7xl font-black text-white leading-[1.1] mb-8 tracking-tighter drop-shadow-lg">
                                                    {banner.title}
                                                </h1>
                                                {banner.description && (
                                                    <p className="text-slate-300 text-lg md:text-xl font-medium leading-relaxed mb-10 max-w-xl drop-shadow-md">
                                                        {banner.description}
                                                    </p>
                                                )}
                                                {banner.link && (
                                                    <div className="flex flex-wrap gap-4">
                                                        <Link 
                                                            href={banner.link} 
                                                            className="bg-blue-600 text-white px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-blue-600/25 hover:bg-blue-700 hover:-translate-y-1 transition-all active:scale-95"
                                                        >
                                                            Discover Now
                                                        </Link>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                {/* Slider Navigation Controls */}
                                {sliderBanners.length > 1 && (
                                    <>
                                        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
                                            {sliderBanners.map((_, index) => (
                                                <button 
                                                    key={index} 
                                                    onClick={() => setCurrentSlide(index)}
                                                    className={cn(
                                                        "h-2 rounded-full transition-all duration-300",
                                                        currentSlide === index ? "bg-blue-500 w-8" : "bg-white/50 hover:bg-white w-2"
                                                    )}
                                                />
                                            ))}
                                        </div>
                                        
                                        <button 
                                            onClick={() => setCurrentSlide(prev => (prev - 1 + sliderBanners.length) % sliderBanners.length)}
                                            className="absolute left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/10 hover:bg-blue-600 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-4 group-hover:translate-x-0"
                                        >
                                            <ArrowLeft size={20} />
                                        </button>
                                        <button 
                                            onClick={() => setCurrentSlide(prev => (prev + 1) % sliderBanners.length)}
                                            className="absolute right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/10 hover:bg-blue-600 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0"
                                        >
                                            <ArrowRight size={20} />
                                        </button>
                                    </>
                                )}
                            </div>
                        ) : (
                            <div className="bg-gradient-to-tr from-slate-900 to-blue-900 rounded-[3rem] p-8 md:p-20 relative overflow-hidden min-h-[600px] flex items-center shadow-2xl shadow-blue-100">
                                {/* Decorative background shapes */}
                                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/20 blur-[120px] rounded-full -mr-48 -mt-48"></div>
                                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-600/10 blur-[100px] rounded-full -ml-32 -mb-32"></div>
                                
                                <div className="relative z-10 max-w-2xl animate-in fade-in slide-in-from-left-8 duration-1000">
                                    <span className="bg-blue-600/30 text-blue-400 text-[10px] font-black uppercase tracking-[0.3em] px-4 py-1.5 rounded-full border border-blue-500/30 backdrop-blur-md inline-block mb-6">
                                        Default Store View
                                    </span>
                                    <h1 className="text-5xl md:text-7xl font-black text-white leading-[1.1] mb-8 tracking-tighter">
                                        Waiting for <span className="text-blue-500 underline decoration-blue-500/30 underline-offset-8">Banners</span>.
                                    </h1>
                                    <p className="text-slate-400 text-lg md:text-xl font-medium leading-relaxed mb-10 max-w-xl">
                                        Head over to the admin dashboard and create some slider banners to see them dynamically appear here.
                                    </p>
                                    <div className="flex flex-wrap gap-4">
                                        <Link 
                                            href={route('admin.banners.index')} 
                                            className="bg-blue-600 text-white px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-blue-600/25 hover:bg-blue-700 hover:-translate-y-1 transition-all active:scale-95"
                                        >
                                            Add Banners Now
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </section>

                {/* Categories Highlights */}
                <section className="container mx-auto px-4 md:px-6 overflow-hidden">
                    <div className="flex items-center justify-between mb-16 px-4">
                        <div>
                            <span className="text-blue-600 text-[10px] font-black uppercase tracking-[0.3em] mb-3 block">Top Collections</span>
                            <h2 className="text-4xl md:text-5xl font-black text-slate-800 tracking-tight">Shop by Department</h2>
                        </div>
                        <Link href={route('categories')} className="group flex items-center gap-3 text-slate-800 hover:text-blue-600 transition-all font-black text-xs uppercase tracking-widest">
                            All Departments <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                        {categories.map((cat, i) => (
                            <Link key={cat.id} href={route('category', cat.slug)} className="group relative rounded-[2.5rem] overflow-hidden aspect-square shadow-xl shadow-blue-100/50">
                                <img 
                                    src={cat.image ? (cat.image.startsWith('http') ? cat.image : `/storage/${cat.image.replace(/^\//, '')}`) : `https://images.unsplash.com/photo-${['1441984904915-30bf64177229', '1445205170230-053b830c6050', '1441984904915-30bf64177229', '1483985988355-763728e1935b'][i%4]}?auto=format&fit=crop&q=80&w=400`} 
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                                    alt={cat.name} 
                                />
                                <div className="absolute inset-x-4 bottom-4 bg-white/20 backdrop-blur-3xl border border-white/20 p-6 rounded-[2rem] flex items-center justify-between group-hover:bg-blue-600 transition-all duration-500 group-hover:translate-y-[-8px]">
                                    <div>
                                        <h3 className="font-black text-white text-lg tracking-tight leading-tight">{cat.name}</h3>
                                        <p className="text-white/70 text-[10px] font-bold uppercase tracking-widest mt-1 group-hover:text-white/90">Browse Items</p>
                                    </div>
                                    <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center text-blue-600 group-hover:rotate-45 transition-transform duration-500">
                                        <ArrowRight size={20} />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>

                {/* Featured Products */}
                <section className="bg-slate-100 py-32 overflow-hidden">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-16">
                            <div className="max-w-xl">
                                <span className="text-blue-600 text-[10px] font-black uppercase tracking-[0.3em] mb-3 block">Handpicked for You</span>
                                <h2 className="text-4xl md:text-5xl font-black text-slate-800 tracking-tight leading-tight">Elite Selections</h2>
                                <p className="text-slate-500 font-medium mt-4 text-sm leading-relaxed">Most wanted premium products of the season, selected with precision for those who settle for nothing but the best.</p>
                            </div>
                            <Link href={route('shop')} className="hidden md:flex bg-white hover:bg-slate-50 text-slate-800 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest border border-slate-200 shadow-sm transition-all hover:shadow-lg active:scale-95 group items-center gap-3 mt-8 md:mt-0">
                                View Entire Store <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {featuredProducts.length > 0 ? (
                                featuredProducts.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))
                            ) : (
                                <div className="col-span-full py-20 bg-white rounded-[3rem] border border-dashed border-slate-300 flex flex-col items-center justify-center text-slate-400 italic">
                                    <ShoppingBag size={40} className="mb-4 opacity-20" />
                                    Check back soon for featured products.
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                {/* Promo Banner / Newsletter Section */}
                {promoBanners && promoBanners.length > 0 && (
                <section className="container mx-auto px-4 md:px-6">
                    <div className="bg-blue-600 rounded-[4rem] p-4 md:p-8 flex flex-col lg:flex-row items-center relative overflow-hidden shadow-3xl shadow-blue-200">
                        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white opacity-5 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
                        
                        <div className="flex-1 p-12 lg:p-20 relative z-10 text-center lg:text-left">
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-6">
                                {promoBanners[0].title}
                            </h2>
                            {promoBanners[0].description && (
                                <p className="text-blue-100 text-lg font-medium mb-10 max-w-lg mx-auto lg:mx-0 opacity-80 leading-relaxed">
                                    {promoBanners[0].description}
                                </p>
                            )}
                            <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto lg:mx-0">
                                <input 
                                    type="email" 
                                    placeholder="your-email@premium.com" 
                                    className="flex-1 bg-white/10 border-white/20 rounded-2xl px-8 py-5 text-white placeholder:text-blue-200 focus:ring-2 focus:ring-white/30 transition-all font-bold"
                                />
                                <button className="bg-white text-blue-600 px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-900/10 hover:bg-blue-50 transition-all active:scale-95 shrink-0">
                                    Join Community
                                </button>
                            </form>
                        </div>

                        <div className="flex-1 w-full lg:block hidden p-12">
                            <div className="relative aspect-video rounded-[3rem] overflow-hidden border-8 border-white/10 shadow-2xl">
                                {promoBanners[0].link ? (
                                    <Link href={promoBanners[0].link} className="block w-full h-full group">
                                        <img src={promoBanners[0].image?.startsWith('http') ? promoBanners[0].image : `/storage/${promoBanners[0].image?.replace(/^\//, '')}`} alt={promoBanners[0].title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                        <div className="absolute inset-0 bg-blue-950/20 group-hover:bg-transparent transition-all duration-700"></div>
                                    </Link>
                                ) : (
                                    <>
                                        <img src={promoBanners[0].image?.startsWith('http') ? promoBanners[0].image : `/storage/${promoBanners[0].image?.replace(/^\//, '')}`} alt={promoBanners[0].title} className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-blue-950/20"></div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </section>
                )}

                {services && services.length > 0 && (
                <section className="container mx-auto px-4 md:px-6">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                        {services.slice(0, 4).map((service, i) => {
                            const icons = { Truck, ShieldCheck, RefreshCcw, Headphones, Star, ShoppingBag, Headphones };
                            const IconComponent = icons[service.icon] || Headphones;
                            
                            return (
                                <div key={i} className="flex flex-col items-center text-center p-10 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm transition-all hover:shadow-xl hover:shadow-blue-50 group">
                                    <div className="w-16 h-16 bg-slate-50 rounded-[1.2rem] flex items-center justify-center text-slate-800 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 shadow-inner group-hover:shadow-blue-200">
                                        <IconComponent size={30} />
                                    </div>
                                    <h4 className="font-black text-slate-800 text-lg tracking-tight mb-2 tracking-tight group-hover:text-blue-700 transition-colors">{service.title || service.name}</h4>
                                    <p className="text-slate-400 text-xs font-bold uppercase tracking-widest opacity-80 leading-relaxed max-w-[200px] mx-auto">{service.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </section>
                )}
            </div>
        </AppLayout>
    );
}
