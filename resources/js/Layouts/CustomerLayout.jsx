import React, { useState } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { Link, usePage } from '@inertiajs/react';
import { 
    LayoutDashboard, 
    ShoppingBag, 
    User, 
    Heart, 
    MapPin, 
    LogOut,
    ChevronRight,
    Bell,
    Settings
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export default function CustomerLayout({ children, activeTab }) {
    const { auth } = usePage().props;
    const { url } = usePage();

    const menuItems = [
        { label: 'Dashboard', icon: LayoutDashboard, href: route('dashboard') },
        { label: 'My Orders', icon: ShoppingBag, href: route('customer.orders') },
        { label: 'Profile Settings', icon: User, href: route('customer.profile') },
        { label: 'Wishlist', icon: Heart, href: route('wishlist.index') },
    ];

    return (
        <AppLayout>
            <div className="bg-slate-50 min-h-screen">
                <div className="container mx-auto px-4 md:px-6 py-12">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        {/* Sidebar */}
                        <aside className="lg:col-span-3 space-y-8">
                            {/* User Brief */}
                            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm text-center relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-24 bg-blue-600/5"></div>
                                <div className="relative z-10">
                                    <div className="w-24 h-24 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-[2rem] mx-auto mb-4 flex items-center justify-center text-white text-3xl font-black shadow-xl shadow-blue-200 uppercase border-4 border-white">
                                        {auth.user.name.charAt(0)}
                                    </div>
                                    <h3 className="font-black text-xl text-slate-800 tracking-tight">{auth.user.name}</h3>
                                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] mt-1">{auth.user.role}</p>
                                </div>
                            </div>

                            {/* Nav Menu */}
                            <nav className="bg-white p-4 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-2">
                                {menuItems.map((item) => (
                                    <Link 
                                        key={item.label}
                                        href={item.href}
                                        className={cn(
                                            "flex items-center gap-4 px-6 py-4 rounded-2xl font-bold text-sm transition-all group",
                                            url === item.href 
                                                ? "bg-blue-600 text-white shadow-lg shadow-blue-100" 
                                                : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
                                        )}
                                    >
                                        <item.icon size={20} className={cn(
                                            "transition-colors",
                                            url === item.href ? "text-white" : "text-slate-300 group-hover:text-blue-600"
                                        )} />
                                        {item.label}
                                        {url === item.href && <ChevronRight size={16} className="ml-auto" />}
                                    </Link>
                                ))}
                                
                                <div className="h-px bg-slate-50 mx-6 my-4"></div>

                                <Link 
                                    href={route('logout')} 
                                    method="post" 
                                    as="button"
                                    className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-bold text-sm text-rose-400 hover:bg-rose-50 hover:text-rose-600 transition-all group"
                                >
                                    <LogOut size={20} className="group-hover:rotate-12 transition-transform" />
                                    Logout
                                </Link>
                            </nav>
                        </aside>

                        {/* Main Content Area */}
                        <main className="lg:col-span-9">
                            {children}
                        </main>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
