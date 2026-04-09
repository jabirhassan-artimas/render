import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, usePage } from '@inertiajs/react';
import {
    ShoppingCart,
    User as UserIcon,
    Menu,
    X,
    Search,
    ChevronDown,
    Facebook,
    Twitter,
    Instagram,
    MapPin,
    Phone,
    Mail,
    ShoppingBag,
    Heart,
    LogOut,
    LayoutDashboard,
    ShieldCheck,
    Truck,
    Tag,
    LayoutGrid,
    Search as SearchIcon,
    ShoppingBag as CartIcon,
    User as ProfileIcon,
    MessageCircle
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export default function AppLayout({ children, title }) {
    const { auth, settings, cartCount, flash } = usePage().props;
    const { url = '' } = usePage();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { label: 'হোম', href: route('home') },
        { label: 'কালেকশন', href: route('shop') },
        { label: 'আমাদের কথা', href: route('about') },
    ];

    return (
        <div className="min-h-screen flex flex-col font-bengali text-dark selection:bg-primary/20 selection:text-dark overflow-x-hidden transition-colors duration-700 relative"
            style={{ background: 'linear-gradient(150deg, #F5F0E2 0%, #EDE5C8 35%, #DFC98A 70%, #C9A84C 100%) fixed' }}>
            {/* Ambient Heritage Decorations */}
            <div className="fixed top-[-150px] left-[-150px] w-[500px] h-[500px] rounded-full opacity-15 pointer-events-none blur-[100px] z-0"
                style={{ background: 'radial-gradient(circle, #C9A84C, transparent 70%)' }} />
            <div className="fixed bottom-[-100px] right-[-100px] w-[600px] h-[600px] rounded-full opacity-10 pointer-events-none blur-[120px] z-0"
                style={{ background: 'radial-gradient(circle, #1B5E20, transparent 70%)' }} />

            {/* Top Bar - Heritage Gradient */}
            <div className="text-dark/80 text-[10px] md:text-xs font-black py-2.5 tracking-[0.2em] uppercase border-b border-black/5"
                style={{ background: 'linear-gradient(90deg, #F5F0E2 0%, #EDE5C8 35%, #DFC98A 70%, #C9A84C 100%)' }}>
                <div className="container mx-auto px-6 flex justify-between items-center">
                    <div className="flex gap-8 items-center">
                        <span className="flex items-center gap-2 hover:text-dark transition-colors cursor-pointer"><Truck size={12} /> {settings.top_bar_text_1 || 'সারা দেশে ডেলিভারি'}</span>
                        <span className="hidden md:flex items-center gap-2 hover:text-dark transition-colors cursor-pointer"><ShieldCheck size={12} /> {settings.top_bar_text_2 || '১০০% অথেনটিক পণ্য'}</span>
                    </div>
                    <div className="flex gap-6 items-center border-l border-black/5 pl-6">
                        <span className="flex items-center gap-2 hover:text-dark transition-colors cursor-pointer font-sans"><Phone size={12} /> {settings.site_phone || '+8801410840877'}</span>
                    </div>
                </div>
            </div>

            {/* Header - Floating Modern Round Design */}
            <div className={cn(
                "sticky top-0 z-[100] transition-all duration-500 px-4 md:px-8 py-2 md:py-3",
                scrolled ? "pt-1" : "pt-3 md:pt-4"
            )}>
                <header className={cn(
                    "mx-auto max-w-7xl transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]",
                    "bg-white/70 backdrop-blur-3xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.05)]",
                    "rounded-full px-5 md:px-8 py-2",
                    scrolled ? "shadow-luxury translate-y-2 scale-[0.98]" : "scale-100"
                )}>
                    <div className="flex items-center justify-between">
                        {/* Full Logo Area */}
                        <Link href="/" className="flex items-center group shrink-0">
                            {settings.site_logo ? (
                                <img
                                    src={`/uploads/${settings.site_logo}`}
                                    className="h-9 md:h-11 w-auto object-contain transition-transform duration-500 group-hover:scale-110"
                                    alt={settings.site_title}
                                />
                            ) : (
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-dark rounded-full flex items-center justify-center text-primary shadow-xl group-hover:rotate-6 transition-all">
                                        <span className="font-black text-xl">{settings.site_title?.charAt(0) || 'ঐ'}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="font-black text-xl tracking-tighter text-dark leading-none">{settings.site_title || 'ঐতিহ্যের বাহার'}</span>
                                        <span className="text-[10px] font-bold text-dark/30 uppercase tracking-widest">সেরা হেরিটেজ ব্র্যান্ড</span>
                                    </div>
                                </div>
                            )}
                        </Link>

                        {/* Centered Desktop Nav - Organized & Modern */}
                        <nav className="hidden lg:flex items-center bg-dark/5 rounded-full px-1.5 py-1 border border-dark/5">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.label}
                                    href={link.href}
                                    className={cn(
                                        "text-sm font-black transition-all px-5 py-2 rounded-full relative group/nav overflow-hidden",
                                        url === link.href || (link.href !== '/' && url?.startsWith(link.href))
                                            ? "text-primary bg-dark shadow-xl"
                                            : "text-dark/40 hover:text-dark hover:bg-white/50"
                                    )}
                                >
                                    <span className="relative z-10">{link.label}</span>
                                    {url !== link.href && (
                                        <span className="absolute inset-0 bg-primary/10 scale-0 group-hover/nav:scale-100 transition-transform duration-500 rounded-full" />
                                    )}
                                </Link>
                            ))}
                        </nav>

                        {/* Action Icons - Lookative & Professional */}
                        <div className="flex items-center gap-1.5 md:gap-3">
                            <button
                                onClick={() => setSearchOpen(!searchOpen)}
                                className="w-10 h-10 flex items-center justify-center rounded-full bg-dark/5 text-dark/40 hover:bg-dark hover:text-primary transition-all duration-500 hover:shadow-xl hover:-translate-y-1 active:scale-95"
                            >
                                <SearchIcon size={18} strokeWidth={2.5} />
                            </button>

                            <Link
                                href={route('cart')}
                                className="w-10 h-10 flex items-center justify-center rounded-full bg-dark/5 text-dark/40 hover:bg-dark hover:text-primary transition-all duration-500 hover:shadow-xl hover:-translate-y-1 active:scale-95 relative"
                            >
                                <CartIcon size={18} strokeWidth={2.5} />
                                {cartCount > 0 && (
                                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-dark text-primary text-[10px] font-black flex items-center justify-center rounded-full border-2 border-white shadow-xl">
                                        {cartCount}
                                    </span>
                                )}
                            </Link>

                            <div className="h-6 w-px bg-dark/5 mx-1 hidden md:block" />

                            <Link
                                href={auth.user ? (auth.user.role === 'admin' ? route('admin.dashboard') : route('dashboard')) : route('login')}
                                className="flex items-center gap-2 bg-dark text-primary px-5 py-2.5 rounded-full font-black text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-dark/10 group"
                            >
                                <ProfileIcon size={16} className="transition-transform group-hover:rotate-12" />
                                <span className="hidden sm:inline">{auth.user ? 'প্রোফাইল' : 'লগইন'}</span>
                            </Link>

                            {/* Mobile Toggle */}
                            <button
                                onClick={() => setMobileMenuOpen(true)}
                                className="lg:hidden w-10 h-10 flex items-center justify-center rounded-full bg-dark/5 text-dark active:scale-90"
                            >
                                <Menu size={20} />
                            </button>
                        </div>
                    </div>
                </header>

                {/* Search Bar - Modern Radial Entrance */}
                <AnimatePresence>
                    {searchOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                            className="absolute left-4 right-4 md:left-8 md:right-8 top-[calc(100%+1rem)] z-40 overflow-hidden"
                        >
                            <div className="bg-dark/95 backdrop-blur-3xl rounded-[3rem] p-8 md:p-12 border border-white/10 shadow-3xl">
                                <form action={route('shop')} className="max-w-4xl mx-auto relative group">
                                    <div className="relative flex items-center">
                                        <SearchIcon className="absolute left-8 text-white/20 group-hover:text-primary transition-colors" size={24} />
                                        <input
                                            name="search"
                                            autoFocus
                                            type="text"
                                            placeholder="ঐতিহ্যের খোঁজে... (যেমন: জামদানি শাড়ি)"
                                            className="w-full bg-white/5 border-2 border-primary/20 hover:border-primary focus:border-primary rounded-[2rem] pl-20 pr-32 py-6 text-xl font-bold text-white placeholder:text-white/20 focus:ring-0 transition-all outline-none shadow-luxury"
                                        />
                                        <button className="absolute right-4 px-10 py-4 bg-primary text-dark rounded-xl font-black text-sm uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl">
                                            খুঁজুন
                                        </button>
                                    </div>
                                    <div className="mt-8 flex flex-wrap gap-3 items-center justify-center">
                                        <span className="text-white/30 font-black uppercase tracking-widest text-[10px]">জনপ্রিয়:</span>
                                        {['জামদানি শাড়ি', 'খাঁটি মধু', 'নকশী কাঁথা', 'রেশম চাদর'].map(tag => (
                                            <button key={tag} className="px-5 py-2 rounded-full bg-white/5 text-white/60 hover:text-primary hover:bg-white/10 transition-all border border-white/5 hover:border-primary/20 text-xs font-bold">{tag}</button>
                                        ))}
                                    </div>
                                </form>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Mobile Menu - Premium Side Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[110] bg-dark/60 backdrop-blur-md lg:hidden"
                            onClick={() => setMobileMenuOpen(false)}
                        />
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed right-0 top-0 bottom-0 w-full max-w-xs bg-heritage-cream z-[120] shadow- luxury flex flex-col lg:hidden"
                        >
                            <div className="p-8 flex flex-col h-full">
                                <div className="flex items-center justify-between mb-16">
                                    <div className="flex flex-col">
                                        <span className="font-black text-2xl text-dark tracking-tighter">ঐতিহ্যের বাহার</span>
                                        <div className="h-1 w-12 bg-primary rounded-full" />
                                    </div>
                                    <button onClick={() => setMobileMenuOpen(false)} className="w-12 h-12 flex items-center justify-center bg-dark/5 rounded-2xl text-dark">
                                        <X size={24} />
                                    </button>
                                </div>

                                <div className="space-y-2">
                                    {navLinks.map((link) => (
                                        <Link
                                            key={link.label}
                                            href={link.href}
                                            className={cn(
                                                "flex items-center p-6 rounded-[1.5rem] font-black text-lg transition-all",
                                                url === link.href ? "bg-dark text-primary shadow-xl" : "text-dark/40 hover:bg-dark/5 hover:text-dark"
                                            )}
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            {link.label}
                                        </Link>
                                    ))}
                                </div>

                                <div className="mt-auto space-y-4 pt-10 border-t border-dark/5">
                                    {auth.user ? (
                                        <div className="space-y-4">
                                            <Link href={route('dashboard')} className="flex items-center gap-4 p-5 bg-dark text-primary rounded-2xl font-black shadow-xl">
                                                <ProfileIcon size={20} /> প্রোফাইল
                                            </Link>
                                            <Link href={route('logout')} method="post" as="button" className="w-full flex items-center gap-4 p-5 bg-accent-red/10 text-accent-red rounded-2xl font-black">
                                                <LogOut size={20} /> লগআউট
                                            </Link>
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-1 gap-4">
                                            <Link href={route('login')} className="flex items-center justify-center gap-4 p-6 bg-dark text-primary font-black rounded-2xl shadow-xl">
                                                লগইন করুন
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Main Content */}
            <main className="flex-1 relative bg-heritage-cream">
                <AnimatePresence mode="wait">
                    {flash.success && (
                        <motion.div
                            initial={{ y: -50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -50, opacity: 0 }}
                            className="fixed top-28 left-1/2 -translate-x-1/2 z-[100] w-full max-w-md px-4"
                        >
                            <div className="bg-dark/95 backdrop-blur-3xl border border-primary/30 p-5 rounded-3xl flex items-center gap-4 text-primary shadow-luxury">
                                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-dark shrink-0 shadow-lg">
                                    <ShieldCheck size={24} />
                                </div>
                                <span className="font-bold">{flash.success}</span>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {children}
            </main>

            {/* ══════════════════════ FOOTER — CREAM & GOLD ══════════════════════ */}
            <footer style={{ background: 'linear-gradient(150deg, #F5F0E2 0%, #EDE5C8 35%, #DFC98A 70%, #C9A84C 100%)', fontFamily: "'Inter','Noto Sans Bengali',sans-serif" }} className="relative overflow-hidden">

                {/* Wave divider top */}
                <div className="absolute top-0 left-0 right-0 overflow-hidden leading-none pointer-events-none" style={{ height: 80 }}>
                    <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-full">
                        <path d="M0,60 C360,0 1080,100 1440,40 L1440,0 L0,0 Z" fill="#ffffff" />
                    </svg>
                </div>

                {/* Subtle texture dots */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.06]"
                    style={{ backgroundImage: 'radial-gradient(circle, #1B5E20 0.9px, transparent 0.9px)', backgroundSize: '28px 28px' }} />

                {/* Soft green ambient blob top-left */}
                <div className="absolute top-10 left-[-80px] w-[320px] h-[320px] rounded-full opacity-15 pointer-events-none"
                    style={{ background: 'radial-gradient(circle, #1B5E20, transparent 70%)' }} />
                {/* Warm gold blob bottom-right */}
                <div className="absolute bottom-0 right-[-60px] w-[280px] h-[280px] rounded-full opacity-20 pointer-events-none"
                    style={{ background: 'radial-gradient(circle, #8B6914, transparent 70%)' }} />

                <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 pt-16 pb-8">

                    {/* ▸ TOP SECTION — Brand + Newsletter */}
                    <div className="flex flex-col lg:flex-row items-start justify-between gap-10 pb-8 mb-8"
                        style={{ borderBottom: '1px solid rgba(27,94,32,0.12)' }}>

                        {/* Brand block */}
                        <div className="max-w-sm">
                            <Link href="/" className="flex items-center gap-4 mb-6 group">
                                {settings.site_logo ? (
                                    <img src={`/uploads/${settings.site_logo}`}
                                        className="h-10 w-auto object-contain drop-shadow-xl transition-transform duration-500 group-hover:scale-105"
                                        alt="লোগো" />
                                ) : (
                                    <div className="w-10 h-10 rounded-xl flex items-center justify-center border-2"
                                        style={{ borderColor: 'rgba(27,94,32,0.35)', background: 'rgba(27,94,32,0.1)' }}>
                                        <span className="font-black text-lg" style={{ color: '#1B5E20' }}>
                                            {settings.site_title?.charAt(0) || 'ঐ'}
                                        </span>
                                    </div>
                                )}
                                <div>
                                    <p className="font-black text-lg leading-tight" style={{ color: '#1a1200' }}>
                                        {settings.site_title || 'ঐতিহ্যের বাহার'}
                                    </p>
                                    <p className="text-[8px] font-bold uppercase tracking-[0.3em]" style={{ color: 'rgba(27,94,32,0.65)' }}>
                                        হেরিটেজ বুটিক
                                    </p>
                                </div>
                            </Link>
                            <p className="text-sm leading-relaxed mb-8" style={{ color: 'rgba(26,18,0,0.55)', lineHeight: 1.85 }}>
                                {settings.site_description || 'বাংলার ৬৪ জেলার খাঁটি হস্তশিল্প ও লোকজ সংস্কৃতি — গ্রামের কারিগরের হাতের ছোঁয়া এখন সরাসরি আপনার দরজায়।'}
                            </p>
                            {/* Social Links */}
                            <div className="flex gap-3">
                                {[
                                    { icon: <Facebook size={18} />, url: settings.facebook_url, label: 'ফেসবুক' },
                                    { icon: <Twitter size={18} />, url: settings.twitter_url, label: 'টুইটার' },
                                    { icon: <Instagram size={18} />, url: settings.instagram_url, label: 'ইনস্টাগ্রাম' },
                                ].map((s, i) => s.url && (
                                    <a key={i} href={s.url} target="_blank" rel="noopener noreferrer"
                                        title={s.label}
                                        className="w-11 h-11 rounded-2xl flex items-center justify-center transition-all duration-300"
                                        style={{ background: 'rgba(27,94,32,0.1)', border: '1px solid rgba(27,94,32,0.2)', color: '#1B5E20' }}
                                        onMouseEnter={e => { e.currentTarget.style.background = '#1B5E20'; e.currentTarget.style.color = '#D4AF37'; e.currentTarget.style.borderColor = '#1B5E20'; }}
                                        onMouseLeave={e => { e.currentTarget.style.background = 'rgba(27,94,32,0.1)'; e.currentTarget.style.color = '#1B5E20'; e.currentTarget.style.borderColor = 'rgba(27,94,32,0.2)'; }}
                                    >
                                        {s.icon}
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Newsletter block */}
                        <div className="w-full max-w-md">
                            <p className="text-[9px] font-bold uppercase tracking-[0.3em] mb-2" style={{ color: '#1B5E20' }}>
                                নিউজলেটার
                            </p>
                            <h3 className="text-lg font-black mb-2 leading-snug" style={{ color: '#1a1200' }}>
                                সেরা অফার সবার আগে পান
                            </h3>
                            <p className="text-xs mb-4" style={{ color: 'rgba(26,18,0,0.5)' }}>
                                নতুন কালেকশন ও ডিসকাউন্ট সম্পর্কে সবার আগে জানতে সাবস্ক্রাইব করুন।
                            </p>
                            <div className="flex gap-2">
                                <input
                                    type="email"
                                    placeholder="আপনার ইমেইল লিখুন..."
                                    className="flex-1 rounded-2xl px-5 py-3.5 text-sm font-medium outline-none"
                                    style={{
                                        background: 'rgba(255,255,255,0.6)',
                                        border: '1.5px solid rgba(27,94,32,0.25)',
                                        color: '#1a1200',
                                        caretColor: '#1B5E20',
                                    }}
                                />
                                <button
                                    className="px-6 py-3.5 rounded-2xl font-black text-xs uppercase tracking-wider shrink-0 transition-all duration-300"
                                    style={{ background: '#1B5E20', color: '#F5F0E2' }}
                                    onMouseEnter={e => e.currentTarget.style.background = '#2E7D32'}
                                    onMouseLeave={e => e.currentTarget.style.background = '#1B5E20'}
                                >
                                    সাবস্ক্রাইব
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* ▸ MIDDLE SECTION — 4-col links + contact */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-8 mb-8"
                        style={{ borderBottom: '1px solid rgba(27,94,32,0.1)' }}>

                        {/* Our services */}
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-[0.4em] mb-6" style={{ color: '#1B5E20' }}>
                                আমাদের সেবা
                            </p>
                            <ul className="space-y-2">
                                {[
                                    { label: 'পণ্য দেখুন', url: route('shop') },
                                    { label: 'নতুন আগমন', url: route('shop') },
                                    { label: 'ক্যাম্পেইন', url: route('shop') },
                                    { label: 'বিশেষ ছাড়', url: route('shop') },
                                ].map(item => (
                                    <li key={item.label}>
                                        <Link href={item.url}
                                            className="text-sm font-medium transition-all duration-200 flex items-center gap-2 group"
                                            style={{ color: 'rgba(26,18,0,0.5)' }}
                                            onMouseEnter={e => e.currentTarget.style.color = '#1B5E20'}
                                            onMouseLeave={e => e.currentTarget.style.color = 'rgba(26,18,0,0.5)'}
                                        >
                                            <span className="inline-block w-4 h-px transition-all duration-300 group-hover:w-6" style={{ background: '#1B5E20' }} />
                                            {item.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Company */}
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-[0.4em] mb-6" style={{ color: '#1B5E20' }}>
                                প্রতিষ্ঠান
                            </p>
                            <ul className="space-y-2">
                                {[
                                    { label: 'আমাদের কথা', url: route('about') },
                                    { label: 'শিল্পী সম্প্রদায়', url: route('shop') },
                                    { label: 'যোগাযোগ', url: route('page.show', 'contacts') },
                                ].map(item => (
                                    <li key={item.label}>
                                        <Link href={item.url}
                                            className="text-sm font-medium transition-all duration-200 flex items-center gap-2 group"
                                            style={{ color: 'rgba(26,18,0,0.5)' }}
                                            onMouseEnter={e => e.currentTarget.style.color = '#1B5E20'}
                                            onMouseLeave={e => e.currentTarget.style.color = 'rgba(26,18,0,0.5)'}
                                        >
                                            <span className="inline-block w-4 h-px transition-all duration-300 group-hover:w-6" style={{ background: '#1B5E20' }} />
                                            {item.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Help */}
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-[0.4em] mb-6" style={{ color: '#1B5E20' }}>
                                সহায়তা
                            </p>
                            <ul className="space-y-2">
                                {[
                                    { label: 'গোপনীয়তা নীতি', url: route('page.show', 'privacy-policy') },
                                    { label: 'শর্তাবলী', url: route('page.show', 'terms-of-service') },
                                    { label: 'রিটার্ন পলিসি', url: route('page.show', 'returns') },
                                    { label: 'আমার অ্যাকাউন্ট', url: route('login') },
                                ].map(item => (
                                    <li key={item.label}>
                                        <Link href={item.url}
                                            className="text-sm font-medium transition-all duration-200 flex items-center gap-2 group"
                                            style={{ color: 'rgba(26,18,0,0.5)' }}
                                            onMouseEnter={e => e.currentTarget.style.color = '#1B5E20'}
                                            onMouseLeave={e => e.currentTarget.style.color = 'rgba(26,18,0,0.5)'}
                                        >
                                            <span className="inline-block w-4 h-px transition-all duration-300 group-hover:w-6" style={{ background: '#1B5E20' }} />
                                            {item.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Contact card */}
                        <div className="rounded-2xl p-5"
                            style={{ background: 'rgba(255,255,255,0.45)', border: '1.5px solid rgba(27,94,32,0.15)', backdropFilter: 'blur(8px)' }}>
                            <p className="text-[9px] font-black uppercase tracking-[0.3em] mb-4" style={{ color: '#1B5E20' }}>
                                যোগাযোগ
                            </p>
                            <ul className="space-y-5">
                                <li className="flex items-start gap-3">
                                    <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                                        style={{ background: 'rgba(27,94,32,0.12)', color: '#1B5E20' }}>
                                        <MapPin size={15} />
                                    </div>
                                    <span className="text-xs leading-relaxed" style={{ color: 'rgba(26,18,0,0.6)' }}>
                                        {settings.site_address || 'ঢাকা, বাংলাদেশ'}
                                    </span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
                                        style={{ background: 'rgba(27,94,32,0.12)', color: '#1B5E20' }}>
                                        <Phone size={15} />
                                    </div>
                                    <span className="text-xs" style={{ color: 'rgba(26,18,0,0.6)' }}>
                                        {settings.site_phone || '+৮৮০ ১৭০০০০০০০০'}
                                    </span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
                                        style={{ background: 'rgba(27,94,32,0.12)', color: '#1B5E20' }}>
                                        <Mail size={15} />
                                    </div>
                                    <span className="text-xs truncate" style={{ color: 'rgba(26,18,0,0.6)' }}>
                                        {settings.site_email || 'hello@oitijjerbahar.com'}
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* ▸ TRUST BADGES */}
                    <div className="flex flex-wrap items-center justify-center gap-4 pb-10 mb-10"
                        style={{ borderBottom: '1px solid rgba(27,94,32,0.1)' }}>
                        {[
                            { icon: <ShieldCheck size={17} />, label: '১০০% খাঁটি পণ্য' },
                            { icon: <Truck size={17} />, label: 'দ্রুত ডেলিভারি' },
                            { icon: <CartIcon size={17} />, label: 'নিরাপদ পেমেন্ট' },
                            { icon: <Heart size={17} />, label: 'গ্রাহক সন্তুষ্টি' },
                        ].map((b, i) => (
                            <div key={i} className="flex items-center gap-2.5 px-5 py-2.5 rounded-2xl"
                                style={{ background: 'rgba(255,255,255,0.5)', border: '1px solid rgba(27,94,32,0.15)' }}>
                                <span style={{ color: '#1B5E20' }}>{b.icon}</span>
                                <span className="text-xs font-bold" style={{ color: 'rgba(26,18,0,0.6)' }}>{b.label}</span>
                            </div>
                        ))}
                    </div>

                    {/* ▸ BOTTOM BAR */}
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className="text-xs font-medium text-center" style={{ color: 'rgba(26,18,0,0.4)' }}>
                            © {new Date().getFullYear()} {settings.footer_text || 'ঐতিহ্যের বাহার'} — সকল অধিকার সংরক্ষিত।{' '}
                            <span style={{ color: '#1B5E20', fontWeight: 700 }}>Artimas</span> কর্তৃক নির্মিত।
                        </p>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#1B5E20' }} />
                            <span className="text-[11px] font-bold" style={{ color: 'rgba(26,18,0,0.38)' }}>
                                সকল সেবা চালু আছে
                            </span>
                        </div>
                    </div>

                </div>
            </footer>

            {/* Floating Social Buttons */}
            <div className="fixed bottom-8 right-8 z-[100] flex flex-col gap-4">
                {/* Facebook Button */}
                <motion.a
                    href={settings.facebook_url || 'https://www.facebook.com/share/1DTwFaxYHD/'}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    whileHover={{ scale: 1.1, y: -5 }}
                    whileActive={{ scale: 0.9 }}
                    className="w-14 h-14 rounded-2xl bg-white/40 backdrop-blur-xl border border-white/40 flex items-center justify-center text-blue-600 shadow-luxury group transition-all"
                >
                    <Facebook size={26} className="group-hover:drop-shadow-blue" />
                    <div className="absolute right-full mr-4 px-3 py-1.5 rounded-lg bg-dark text-white text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                        ফেসবুক
                    </div>
                </motion.a>

                {/* WhatsApp Button */}
                <motion.a
                    href={`https://wa.me/${(settings.whatsapp_number || '+8801410840877').replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    whileHover={{ scale: 1.1, y: -5 }}
                    whileActive={{ scale: 0.9 }}
                    className="w-14 h-14 rounded-2xl bg-[#25D366] text-white flex items-center justify-center shadow-luxury shadow-[#25D366]/20 group transition-all"
                >
                    <MessageCircle size={26} className="fill-current" />
                    <div className="absolute right-full mr-4 px-3 py-1.5 rounded-lg bg-dark text-white text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                        হোয়াটসঅ্যাপ
                    </div>
                </motion.a>
            </div>
        </div>
    );
}
