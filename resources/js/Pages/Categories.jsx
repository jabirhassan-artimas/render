import React from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { Head, Link } from '@inertiajs/react';
import {
    ChevronRight,
    ArrowRight,
    LayoutGrid,
    Search
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export default function Categories({ categories }) {
    return (
        <AppLayout>
            <Head title="Browse Categories" />

            <div className="bg-heritage-paper min-h-screen">
                <div className="container mx-auto px-4 md:px-6 py-12">
                    {/* Header Section */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 relative">
                        <div className="absolute -top-24 -left-24 w-64 h-64 bg-primary/5 blur-[100px] rounded-full pointer-events-none" />
                        <div className="relative z-10">
                            <nav className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-dark/30 mb-5">
                                <Link href="/" className="hover:text-primary transition-colors">হোম</Link>
                                <span className="w-1 h-1 rounded-full bg-dark/10" />
                                <span className="text-dark/60">কালেকশন</span>
                            </nav>
                            <h1 className="text-4xl md:text-6xl font-black text-dark tracking-tighter leading-none mb-2">
                                আমাদের <span className="text-primary italic">বিভাগসমূহ</span>
                            </h1>
                            <p className="text-dark/40 font-bold text-sm">আমাদের সংরক্ষিত পণ্যগুলো বিভাগ অনুযায়ী খুঁজে দেখুন।</p>
                        </div>
                        <div className="md:w-80 relative group">
                            <div className="bg-white/40 backdrop-blur-xl border border-dark/5 rounded-2xl px-6 py-4 flex items-center gap-3 transition-all hover:border-primary/50 shadow-minimal">
                                <Search size={18} className="text-dark/20 group-hover:text-primary transition-colors" />
                                <input type="text" placeholder="বিভাগ খুঁজুন..." className="bg-transparent border-none p-0 text-sm font-black text-dark placeholder:text-dark/20 focus:ring-0 w-full" />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                        {categories.map((category) => (
                            <div key={category.id} className="group cursor-pointer h-full">
                                <div className="bg-white/40 backdrop-blur-xl rounded-[3rem] p-5 border border-dark/5 shadow-minimal hover:shadow-2xl hover:shadow-primary/10 transition-all duration-700 h-full flex flex-col">
                                    <Link href={route('category', category.slug)} className="block aspect-[4/3] rounded-[2.5rem] overflow-hidden mb-8 relative border border-dark/5 ring-4 ring-white/20">
                                        <img
                                            src={category.image ? (category.image.startsWith('http') ? category.image : `/uploads/${category.image.replace(/^\//, '')}`) : 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80'}
                                            alt={category.name}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 brightness-95"
                                        />
                                        <div className="absolute inset-0 bg-dark/30 group-hover:bg-dark/10 transition-colors"></div>
                                        <div className="absolute bottom-6 right-6">
                                            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-dark shadow-xl opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 hover:bg-dark hover:text-primary cursor-pointer">
                                                <ArrowRight size={24} />
                                            </div>
                                        </div>
                                    </Link>

                                    <div className="px-5 pb-5 flex-1 flex flex-col items-center text-center">
                                        <h3 className="text-3xl font-black text-dark tracking-tight mb-4 group-hover:text-primary transition-colors">
                                            {category.name}
                                        </h3>

                                        {category.children?.length > 0 ? (
                                            <div className="flex flex-wrap items-center justify-center gap-2 mt-auto">
                                                {category.children.slice(0, 5).map(child => (
                                                    <Link
                                                        key={child.id}
                                                        href={route('category', child.slug)}
                                                        className="bg-white border border-dark/5 hover:border-primary/50 text-[9px] font-black uppercase tracking-widest text-dark/40 hover:text-dark px-4 py-2.5 rounded-xl transition-all shadow-minimal"
                                                    >
                                                        {child.name}
                                                    </Link>
                                                ))}
                                                {category.children.length > 5 && (
                                                    <span className="text-[9px] font-black text-dark/20 px-2 py-2">+{category.children.length - 5} আরও</span>
                                                )}
                                            </div>
                                        ) : (
                                            <p className="text-dark/40 font-bold text-sm leading-relaxed mb-6">আমাদের বাছাইকৃত {category.name} পণ্যগুলো দেখুন।</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Empty State */}
                    {categories.length === 0 && (
                        <div className="bg-white/40 backdrop-blur-xl rounded-[3rem] p-24 border border-dark/5 shadow-minimal flex flex-col items-center text-center">
                            <div className="w-24 h-24 bg-dark/5 rounded-[2rem] flex items-center justify-center text-dark/10 mb-8 border border-dark/5">
                                <LayoutGrid size={48} />
                            </div>
                            <h2 className="text-4xl font-black text-dark mb-4 tracking-tighter">কোনো কালেকশন পাওয়া যায়নি</h2>
                            <p className="text-dark/30 font-bold max-w-sm mb-12">আমরা আমাদের স্টকার আপডেট করছি। নতুন কোনো কালেকশন যুক্ত হলে শীঘ্রই জানানো হবে।</p>
                            <Link href="/" className="bg-dark text-primary px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-2xl">হোমে ফিরে যান</Link>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
