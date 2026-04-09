import React, { useState } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { Head, Link, router } from '@inertiajs/react';
import ProductCard from '@/Components/ProductCard';
import {
    Filter,
    Search,
    ChevronDown,
    Grid,
    List as ListIcon,
    SlidersHorizontal,
    X,
    ShoppingBag
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export default function Shop(props) {
    const { products, categories, brands, filters } = props;
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const handleFilterChange = (key, value) => {
        const newFilters = { ...filters, [key]: value };
        if (key !== 'page') delete newFilters.page; // Reset to page 1 on filter change

        router.get(route('shop'), newFilters, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleSortChange = (e) => {
        handleFilterChange('sort', e.target.value);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        const search = e.target.search.value;
        handleFilterChange('search', search);
    };

    return (
        <AppLayout>
            <Head title="Shop All Products" />

            <div className="bg-heritage-paper min-h-screen">
                <div className="container mx-auto px-4 md:px-6 py-12">
                    {/* Header Section */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                        <div>
                            <nav className="flex items-center gap-2 text-[8px] font-black uppercase tracking-[0.4em] text-dark/20 mb-3">
                                <Link href="/" className="hover:text-primary transition-colors">হোম</Link>
                                <span className="w-0.5 h-0.5 rounded-full bg-dark/10" />
                                <span className="text-dark/40">কালেকশন</span>
                            </nav>
                            <h1 className="text-3xl md:text-5xl font-black text-dark tracking-tighter leading-none mb-1">
                                সংগ্রহ<span className="text-primary italic">সমূহ</span>
                            </h1>
                            <p className="text-dark/30 font-bold text-xs uppercase tracking-widest leading-loose">ঐতিহ্যের নতুন অনুসন্ধান</p>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <select
                                    onChange={handleSortChange}
                                    defaultValue={filters?.sort || 'newest'}
                                    className="bg-white border border-dark/5 text-dark text-[10px] font-black uppercase tracking-widest px-6 py-3.5 rounded-xl focus:ring-0 transition-all appearance-none pr-12 cursor-pointer shadow-minimal"
                                >
                                    <option value="newest">NEW ARRIVALS</option>
                                    <option value="price_low_high">PRICE: LOW-HIGH</option>
                                    <option value="price_high_low">PRICE: HIGH-LOW</option>
                                </select>
                                <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-dark/30" />
                            </div>

                            <button
                                onClick={() => setIsFilterOpen(true)}
                                className="lg:hidden flex items-center gap-2 bg-dark text-primary px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:scale-105 active:scale-95 transition-all shadow-xl"
                            >
                                <SlidersHorizontal size={18} /> ফিল্টার
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-12">
                        {/* Sidebar Filters (Desktop) */}
                        <aside className="hidden lg:block w-64 shrink-0 space-y-6">
                            {/* Glass Search Box */}
                            <div className="bg-white p-5 rounded-2xl border border-dark/5 shadow-minimal">
                                <h4 className="font-black text-dark uppercase tracking-[0.2em] text-[8px] mb-4 opacity-30">SEARCH</h4>
                                <form onSubmit={handleSearch} className="relative">
                                    <input
                                        name="search"
                                        type="text"
                                        placeholder="পণ্য খুঁজুন..."
                                        defaultValue={filters?.search}
                                        className="w-full bg-heritage-paper border border-dark/5 px-4 py-3 rounded-lg text-[10px] font-black focus:ring-0 transition-all shadow-sm placeholder:text-dark/10"
                                    />
                                    <button className="absolute right-3 top-1/2 -translate-y-1/2 text-dark/20 hover:text-primary transition-colors">
                                        <Search size={14} />
                                    </button>
                                </form>
                            </div>

                            {/* Categories - Compact List */}
                            <div className="bg-white p-5 rounded-2xl border border-dark/5 shadow-minimal">
                                <h4 className="font-black text-dark uppercase tracking-[0.2em] text-[8px] mb-4 opacity-30">CATEGORIES</h4>
                                <div className="space-y-1">
                                    <button
                                        onClick={() => handleFilterChange('category', '')}
                                        className={cn(
                                            "w-full text-left px-4 py-2.5 rounded-lg font-black text-[10px] transition-all",
                                            !filters?.category ? "bg-dark text-primary shadow-lg" : "text-dark/40 hover:bg-heritage-paper hover:text-dark"
                                        )}
                                    >
                                        সব পণ্য
                                    </button>
                                    {categories.map(cat => (
                                        <button
                                            key={cat.id}
                                            onClick={() => handleFilterChange('category', cat.slug)}
                                            className={cn(
                                                "w-full text-left px-4 py-2.5 rounded-lg font-black text-[10px] transition-all",
                                                filters?.category === cat.slug ? "bg-dark text-primary shadow-lg" : "text-dark/40 hover:bg-heritage-paper hover:text-dark"
                                            )}
                                        >
                                            {cat.name}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </aside>

                        {/* Product Grid */}
                        <div className="flex-1">
                            {products.data.length > 0 ? (
                                <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                                    {products.data.map((product) => (
                                        <ProductCard key={product.id} product={product} />
                                    ))}
                                </div>
                            ) : (
                                <div className="bg-heritage-paper rounded-[2rem] p-16 border border-dark/5 shadow-minimal flex flex-col items-center text-center">
                                    <div className="w-20 h-20 bg-dark/5 rounded-2xl flex items-center justify-center text-dark/10 mb-6">
                                        <ShoppingBag size={40} />
                                    </div>
                                    <h3 className="text-2xl font-black text-dark mb-4 tracking-tight">কোনো পণ্য পাওয়া যায়নি</h3>
                                    <p className="text-dark/30 font-bold max-w-xs leading-relaxed text-sm">দুঃখিত, আপনার দেওয়া ফিল্টারের সাথে কোনো পণ্য মিলছে না। ফিল্টার পরিবর্তন করে পুনরায় চেষ্টা করুন।</p>
                                    <button
                                        onClick={() => router.get(route('shop'))}
                                        className="mt-10 bg-gradient-to-r from-dark to-dark-soft text-primary px-10 py-5 rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] hover:scale-105 active:scale-95 transition-all shadow-2xl"
                                    >
                                        সব রিসেট করুন
                                    </button>
                                </div>
                            )}

                            {/* Pagination */}
                            {products.links.length > 3 && (
                                <div className="mt-24 flex justify-center gap-3">
                                    {products.links.map((link, i) => (
                                        <button
                                            key={i}
                                            disabled={!link.url}
                                            onClick={() => link.url && router.get(link.url)}
                                            className={cn(
                                                "w-12 h-12 rounded-xl flex items-center justify-center font-black text-xs transition-all",
                                                link.active
                                                    ? "bg-primary text-dark shadow-xl"
                                                    : "bg-white text-dark/20 border border-dark/5 hover:border-primary/40 hover:text-dark hover:scale-110 active:scale-95",
                                                !link.url && "opacity-10 cursor-not-allowed"
                                            )}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Filter Drawer */}
            <div className={cn(
                "fixed inset-0 z-[100] bg-dark/40 backdrop-blur-md transition-all duration-700",
                isFilterOpen ? "opacity-100 visible" : "opacity-0 invisible"
            )}>
                <div
                    className={cn(
                        "absolute right-0 top-0 bottom-0 w-full max-w-sm bg-heritage-paper shadow-[0_0_80px_rgba(0,0,0,0.1)] transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] transform",
                        isFilterOpen ? "translate-x-0" : "translate-x-full"
                    )}
                >
                    <div className="h-full flex flex-col p-8 md:p-12">
                        <div className="flex items-center justify-between mb-16 relative">
                            <div className="absolute -top-10 -left-10 w-32 h-32 bg-primary/10 blur-[50px] rounded-full pointer-events-none" />
                            <h2 className="text-4xl font-black text-dark tracking-tighter relative z-10">ফিল্টার</h2>
                            <button onClick={() => setIsFilterOpen(false)} className="w-12 h-12 bg-dark/5 rounded-2xl flex items-center justify-center text-dark/30 hover:bg-dark hover:text-primary transition-all">
                                <X size={20} />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto no-scrollbar space-y-12">
                            {/* Search */}
                            <div className="bg-white/40 backdrop-blur-xl border border-dark/5 p-6 rounded-[2rem]">
                                <h4 className="font-black text-dark uppercase tracking-[0.3em] text-[10px] mb-6 opacity-40">সার্চ</h4>
                                <form onSubmit={(e) => { handleSearch(e); setIsFilterOpen(false); }} className="relative">
                                    <input
                                        name="search"
                                        type="text"
                                        placeholder="মূল শব্দ লিখুন..."
                                        defaultValue={filters?.search}
                                        className="w-full bg-white border border-dark/5 px-6 py-4 rounded-xl text-xs font-black focus:ring-0 transition-all placeholder:text-dark/10"
                                    />
                                </form>
                            </div>

                            {/* Categories */}
                            <div className="bg-white/40 backdrop-blur-xl border border-dark/5 p-6 rounded-[2rem]">
                                <h4 className="font-black text-dark uppercase tracking-[0.3em] text-[10px] mb-6 opacity-40">বিভাগসমূহ</h4>
                                <div className="space-y-2">
                                    <button
                                        onClick={() => { handleFilterChange('category', ''); setIsFilterOpen(false); }}
                                        className={cn(
                                            "w-full text-left px-5 py-4 rounded-xl font-black text-xs transition-all border",
                                            !filters?.category ? "bg-primary text-dark shadow-xl border-primary/20" : "text-dark/40 bg-white hover:text-dark"
                                        )}
                                    >
                                        সব কালেকশন
                                    </button>
                                    {categories.map(cat => (
                                        <button
                                            key={cat.id}
                                            onClick={() => { handleFilterChange('category', cat.slug); setIsFilterOpen(false); }}
                                            className={cn(
                                                "w-full text-left px-5 py-4 rounded-xl font-black text-xs transition-all border",
                                                filters?.category === cat.slug ? "bg-primary text-dark shadow-xl border-primary/20" : "text-dark/40 bg-white hover:text-dark"
                                            )}
                                        >
                                            {cat.name}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="pt-10">
                            <button
                                onClick={() => setIsFilterOpen(false)}
                                className="w-full bg-gradient-to-r from-dark to-dark-soft text-primary py-6 rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] shadow-2xl hover:scale-[1.02] active:scale-95 transition-all"
                            >
                                ফলাফল দেখুন
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
