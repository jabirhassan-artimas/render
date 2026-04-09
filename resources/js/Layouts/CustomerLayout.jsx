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
            <div className="min-h-screen">
                <div className="container mx-auto px-4 md:px-6 py-12">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        {/* Sidebar */}
                        <aside className="lg:col-span-3 space-y-8">
                            {/* User Brief */}
                            <div className="bg-white/40 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/20 shadow-minimal text-center relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-24 bg-primary/5"></div>
                                <div className="relative z-10">
                                    <div className="w-24 h-24 bg-dark rounded-[2rem] mx-auto mb-4 flex items-center justify-center text-primary text-3xl font-black shadow-xl shadow-dark/10 uppercase border-4 border-white">
                                        {auth.user.name.charAt(0)}
                                    </div>
                                    <h3 className="font-black text-xl text-dark tracking-tight">{auth.user.name}</h3>
                                    <p className="text-[10px] font-black uppercase text-dark/30 tracking-[0.2em] mt-1">{auth.user.role}</p>
                                </div>
                            </div>

                            {/* Nav Menu */}
                            <nav className="bg-white/40 backdrop-blur-xl p-4 rounded-[2.5rem] border border-white/20 shadow-minimal space-y-2">
                                {menuItems.map((item) => (
                                    <Link
                                        key={item.label}
                                        href={item.href}
                                        className={cn(
                                            "flex items-center gap-4 px-6 py-4 rounded-2xl font-bold text-sm transition-all group",
                                            url === item.href
                                                ? "bg-dark text-primary shadow-xl shadow-dark/10"
                                                : "text-dark/50 hover:bg-dark/5 hover:text-dark"
                                        )}
                                    >
                                        <item.icon size={20} className={cn(
                                            "transition-colors",
                                            url === item.href ? "text-primary" : "text-dark/20 group-hover:text-dark"
                                        )} />
                                        {item.label}
                                        {url === item.href && <ChevronRight size={16} className="ml-auto" />}
                                    </Link>
                                ))}

                                <div className="h-px bg-dark/5 mx-6 my-4"></div>

                                <Link
                                    href={route('logout')}
                                    method="post"
                                    as="button"
                                    className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-bold text-sm text-accent-red/60 hover:bg-accent-red/5 hover:text-accent-red transition-all group"
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
