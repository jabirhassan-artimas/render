import React, { useState } from 'react';
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
    ShieldCheck
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

    const navLinks = [
        { label: 'Home', href: route('home') },
        { label: 'Shop', href: route('shop') },
        { label: 'Categories', href: route('categories') },
        { label: 'About Us', href: route('page.show', 'about-us') },
    ];

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
            {/* Header */}
            <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="h-20 flex items-center justify-between">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-3 group">
                            {settings.site_logo ? (
                                <img 
                                    src={`/storage/${settings.site_logo}`} 
                                    className="h-10 md:h-12 w-auto object-contain max-w-[180px] md:max-w-[240px] transition-transform group-hover:scale-105" 
                                    alt={settings.site_title || 'Logo'} 
                                />
                            ) : (
                                <>
                                    <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-200 group-hover:scale-110 transition-transform">
                                        <ShoppingBag size={24} />
                                    </div>
                                    {settings.site_title && (
                                        <span className="font-black text-2xl tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                            {settings.site_title}
                                        </span>
                                    )}
                                </>
                            )}
                        </Link>

                        {/* Desktop Nav */}
                        <nav className="hidden lg:flex items-center gap-8">
                            {navLinks.map((link) => (
                                <Link 
                                    key={link.label}
                                    href={link.href}
                                    className={cn(
                                        "text-sm font-bold transition-all hover:text-blue-600 relative py-2",
                                        url === link.href || (link.href !== '/' && url?.startsWith(link.href)) 
                                            ? "text-blue-600 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-blue-600" 
                                            : "text-slate-500"
                                    )}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </nav>

                        {/* Actions */}
                        <div className="flex items-center gap-2 md:gap-4">
                            <button 
                                onClick={() => setSearchOpen(!searchOpen)}
                                className="p-2.5 text-slate-500 hover:bg-slate-100 rounded-full transition-all"
                            >
                                <Search size={22} />
                            </button>

                            <Link 
                                href={route('cart')} 
                                className="p-2.5 text-slate-500 hover:bg-slate-100 rounded-full transition-all relative"
                            >
                                <ShoppingCart size={22} />
                                {cartCount > 0 && (
                                    <span className="absolute top-1.5 right-1.5 w-5 h-5 bg-blue-600 text-white text-[10px] font-black flex items-center justify-center rounded-full border-2 border-white shadow-sm ring-2 ring-blue-50">
                                        {cartCount}
                                    </span>
                                )}
                            </Link>

                            <div className="h-6 w-px bg-slate-200 mx-1 hidden md:block"></div>

                            {auth.user ? (
                                <div className="hidden md:flex items-center gap-4">
                                    <div className="flex flex-col items-end">
                                        <p className="text-xs font-black text-slate-800 leading-none">{auth.user.name}</p>
                                        <Link 
                                            href={auth.user.role === 'admin' ? route('admin.dashboard') : route('dashboard')}
                                            className="text-[10px] font-black uppercase text-blue-600 tracking-widest hover:underline mt-1"
                                        >
                                            {auth.user.role === 'admin' ? 'Dashboard' : 'My Account'}
                                        </Link>
                                    </div>
                                    <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 font-bold border-2 border-white shadow-sm ring-1 ring-slate-100 uppercase">
                                        {auth.user.name.charAt(0)}
                                    </div>
                                    <Link 
                                        href={route('logout')} 
                                        method="post" 
                                        as="button"
                                        className="p-2.5 text-rose-500 hover:bg-rose-50 rounded-full transition-all"
                                    >
                                        <LogOut size={20} />
                                    </Link>
                                </div>
                            ) : (
                                <div className="hidden md:flex items-center gap-3">
                                    <Link href={route('login')} className="text-sm font-bold text-slate-600 hover:text-blue-600 transition-all">
                                        Login
                                    </Link>
                                    <Link href={route('register')} className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold px-6 py-2.5 rounded-xl transition-all shadow-lg shadow-blue-200">
                                        Sign Up
                                    </Link>
                                </div>
                            )}

                            {/* Mobile Toggle */}
                            <button 
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="lg:hidden p-2.5 text-slate-500 hover:bg-slate-100 rounded-full transition-all"
                            >
                                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Search Bar Overflow */}
                <div className={cn(
                    "absolute left-0 w-full bg-white border-b border-slate-200 px-4 py-4 transition-all duration-300 transform",
                    searchOpen ? "translate-y-0 opacity-100 visible shadow-lg" : "-translate-y-4 opacity-0 invisible"
                )}>
                    <form action={route('shop')} className="container mx-auto relative">
                        <input 
                            name="search"
                            type="text" 
                            placeholder="What are you looking for?" 
                            className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 pr-12 text-sm font-medium focus:ring-2 focus:ring-blue-100 transition-all"
                        />
                        <button className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-600">
                            <Search size={20} />
                        </button>
                    </form>
                </div>
            </header>

            {/* Mobile Menu */}
            <div className={cn(
                "fixed inset-0 z-40 bg-slate-900/60 transition-all duration-500 lg:hidden",
                mobileMenuOpen ? "opacity-100 visible backdrop-blur-sm" : "opacity-0 invisible"
            )} onClick={() => setMobileMenuOpen(false)}>
                <div 
                    className={cn(
                        "absolute right-0 top-0 bottom-0 w-80 bg-white shadow-2xl transition-transform duration-500 transform",
                        mobileMenuOpen ? "translate-x-0" : "translate-x-full"
                    )}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="p-8 flex flex-col h-full">
                        <div className="flex items-center justify-between mb-10">
                            <Link href="/" className="flex items-center gap-2">
                                {settings.site_logo ? (
                                    <img 
                                        src={`/storage/${settings.site_logo}`} 
                                        className="h-10 w-auto object-contain max-w-[160px]" 
                                        alt={settings.site_title || 'Logo'} 
                                    />
                                ) : (
                                    <>
                                        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shrink-0 shadow-lg shadow-blue-100">
                                            <ShoppingBag size={24} />
                                        </div>
                                        {settings.site_title && <span className="font-black text-xl tracking-tight">{settings.site_title}</span>}
                                    </>
                                )}
                            </Link>
                            <button onClick={() => setMobileMenuOpen(false)} className="p-2 bg-slate-50 rounded-lg text-slate-400">
                                <X size={20} />
                            </button>
                        </div>

                        <div className="space-y-6">
                            {navLinks.map((link) => (
                                <Link 
                                    key={link.label}
                                    href={link.href}
                                    className="block text-lg font-black text-slate-800 hover:text-blue-600 transition-all"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>

                        <div className="mt-auto pt-10 border-t border-slate-100 space-y-4">
                            {!auth.user ? (
                                <>
                                    <Link href={route('login')} className="w-full flex items-center justify-center p-4 bg-slate-50 text-slate-800 font-black rounded-2xl hover:bg-slate-100 transition-all">
                                        Login
                                    </Link>
                                    <Link href={route('register')} className="w-full flex items-center justify-center p-4 bg-blue-600 text-white font-black rounded-2xl shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all">
                                        Sign Up
                                    </Link>
                                </>
                            ) : (
                                <Link 
                                    href={auth.user.role === 'admin' ? route('admin.dashboard') : route('dashboard')}
                                    className="w-full flex items-center justify-center gap-3 p-4 bg-blue-600 text-white font-black rounded-2xl shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all"
                                >
                                    <LayoutDashboard size={20} />
                                    {auth.user.role === 'admin' ? 'Admin Dashboard' : 'My Account'}
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <main className="flex-1">
                {flash.success && (
                    <div className="container mx-auto px-4 mt-8 animate-in fade-in slide-in-from-top-4">
                        <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-2xl flex items-center gap-3 text-emerald-700 font-bold text-sm">
                            <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-white shrink-0 shadow-sm">
                                <ChevronDown className="rotate-180" size={18} />
                            </div>
                            {flash.success}
                        </div>
                    </div>
                )}
                
                {flash.error && (
                    <div className="container mx-auto px-4 mt-8 animate-in fade-in slide-in-from-top-4">
                        <div className="bg-rose-50 border border-rose-100 p-4 rounded-2xl flex items-center gap-3 text-rose-700 font-bold text-sm">
                            <div className="w-8 h-8 bg-rose-500 rounded-full flex items-center justify-center text-white shrink-0 shadow-sm">
                                <X size={18} />
                            </div>
                            {flash.error}
                        </div>
                    </div>
                )}

                {children}
            </main>

            {/* Footer */}
            <footer className="bg-white border-t border-slate-200 pt-20 pb-10">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
                        <div className="lg:col-span-1">
                            <Link href="/" className="flex items-center gap-2 mb-8">
                                {settings.site_logo ? (
                                    <img 
                                        src={`/storage/${settings.site_logo}`} 
                                        className="h-12 w-auto object-contain max-w-[200px]" 
                                        alt={settings.site_title || 'Logo'} 
                                    />
                                ) : (
                                    <>
                                        <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-lg shadow-blue-50">
                                            <ShoppingBag size={28} />
                                        </div>
                                        {settings.site_title && <span className="font-black text-2xl tracking-tight">{settings.site_title}</span>}
                                    </>
                                )}
                            </Link>
                            <p className="text-slate-500 font-medium leading-relaxed mb-8 max-w-xs text-sm">
                                {settings.site_description || 'Your premium shopping destination for high quality goods.'}
                            </p>
                            <div className="flex gap-4">
                                {settings.facebook_url && (
                                    <a href={settings.facebook_url} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-slate-100 hover:bg-blue-600 hover:text-white rounded-xl flex items-center justify-center text-slate-400 transition-all">
                                        <Facebook size={18} />
                                    </a>
                                )}
                                {settings.twitter_url && (
                                    <a href={settings.twitter_url} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-slate-100 hover:bg-blue-600 hover:text-white rounded-xl flex items-center justify-center text-slate-400 transition-all">
                                        <Twitter size={18} />
                                    </a>
                                )}
                                {settings.instagram_url && (
                                    <a href={settings.instagram_url} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-slate-100 hover:bg-blue-600 hover:text-white rounded-xl flex items-center justify-center text-slate-400 transition-all">
                                        <Instagram size={18} />
                                    </a>
                                )}
                            </div>
                        </div>

                        <div>
                            <h4 className="font-black text-lg mb-8 text-slate-800 tracking-tight">Quick Links</h4>
                            <ul className="space-y-4">
                                {[{label: 'Home', url: '/'}, {label: 'Shop', url: route('shop')}, {label: 'Categories', url: route('categories')}, {label: 'About Us', url: route('page.show', 'about-us')}].map((item) => (
                                    <li key={item.label}>
                                        <Link href={item.url} className="text-slate-500 font-bold text-sm hover:text-blue-600 transition-all flex items-center gap-2 group">
                                            <div className="w-1.5 h-1.5 rounded-full bg-slate-200 group-hover:bg-blue-600 transition-all"></div>
                                            {item.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-black text-lg mb-8 text-slate-800 tracking-tight">Customer Care</h4>
                            <ul className="space-y-4">
                                {[
                                    {label: 'My Account', url: route('login')},
                                    {label: 'Privacy Policy', url: route('page.show', 'privacy-policy')},
                                    {label: 'Terms of Service', url: route('page.show', 'terms-of-service')},
                                    {label: 'Returns', url: route('page.show', 'returns')}
                                ].map((item) => (
                                    <li key={item.label}>
                                        <Link href={item.url} className="text-slate-500 font-bold text-sm hover:text-blue-600 transition-all flex items-center gap-2 group">
                                            <div className="w-1.5 h-1.5 rounded-full bg-slate-200 group-hover:bg-blue-600 transition-all"></div>
                                            {item.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-black text-lg mb-8 text-slate-800 tracking-tight">Contact Info</h4>
                            <ul className="space-y-6">
                                <li className="flex gap-4">
                                    <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 shrink-0 border border-blue-100">
                                        <MapPin size={18} />
                                    </div>
                                    <span className="text-sm font-bold text-slate-600 leading-tight">
                                        {settings.site_address || '123 Multi-vendor St, City'}
                                    </span>
                                </li>
                                <li className="flex gap-4">
                                    <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 shrink-0 border border-indigo-100">
                                        <Phone size={18} />
                                    </div>
                                    <span className="text-sm font-bold text-slate-600 leading-tight">
                                        {settings.site_phone || '+880 123 456 789'}
                                    </span>
                                </li>
                                <li className="flex gap-4">
                                    <div className="w-10 h-10 bg-fuchsia-50 rounded-xl flex items-center justify-center text-fuchsia-600 shrink-0 border border-fuchsia-100">
                                        <Mail size={18} />
                                    </div>
                                    <span className="text-sm font-bold text-slate-600 leading-tight">
                                        {settings.site_email || 'hello@shopcms.com'}
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="pt-10 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6">
                        <p className="text-sm font-bold text-slate-400">
                            &copy; {new Date().getFullYear()} {settings.footer_text || settings.site_title}. Crafted with Passion.
                        </p>
                        <div className="flex items-center gap-4">
                            {/* Standard vector icons via Lucide */}
                            <div className="flex bg-slate-100 p-2 rounded-xl gap-2 items-center">
                                <span className="font-black text-[10px] text-slate-400 uppercase tracking-widest px-2">Secure Payments</span>
                                <div className="h-6 w-px bg-slate-200 mx-1"></div>
                                <ShieldCheck size={20} className="text-emerald-500" />
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
