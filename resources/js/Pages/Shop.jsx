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

            <div className="container mx-auto px-4 md:px-6 py-12">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div>
                        <nav className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400 mb-4">
                            <Link href="/">Home</Link>
                            <span className="text-slate-200">/</span>
                            <span className="text-blue-600">Shop</span>
                        </nav>
                        <h1 className="text-4xl md:text-6xl font-black text-slate-800 tracking-tight leading-tight">
                            The Collection
                        </h1>
                    </div>
                    
                    <div className="flex items-center gap-4">
                        <select 
                            onChange={handleSortChange}
                            defaultValue={filters?.sort || 'newest'}
                            className="bg-white border border-slate-200 text-slate-700 text-sm font-bold px-6 py-3 rounded-2xl focus:ring-2 focus:ring-blue-100 transition-all appearance-none pr-12 relative cursor-pointer"
                        >
                            <option value="newest">Latest Arrivals</option>
                            <option value="price_low_high">Price: Low to High</option>
                            <option value="price_high_low">Price: High to Low</option>
                        </select>
                        
                        <button 
                            onClick={() => setIsFilterOpen(true)}
                            className="lg:hidden flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-800 transition-all shadow-lg shadow-slate-200"
                        >
                            <SlidersHorizontal size={18} /> Filters
                        </button>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Sidebar Filters (Desktop) */}
                    <aside className="hidden lg:block w-72 shrink-0 space-y-10">
                        {/* Search */}
                        <div>
                            <h4 className="font-black text-slate-800 uppercase tracking-widest text-xs mb-6 px-1">Search</h4>
                            <form onSubmit={handleSearch} className="relative">
                                <input 
                                    name="search"
                                    type="text" 
                                    placeholder="Keywords..." 
                                    defaultValue={filters?.search}
                                    className="w-full bg-white border border-slate-100 px-6 py-4 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-blue-100 transition-all shadow-sm"
                                />
                                <button className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
                                    <Search size={18} />
                                </button>
                            </form>
                        </div>

                        {/* Categories */}
                        <div>
                            <h4 className="font-black text-slate-800 uppercase tracking-widest text-xs mb-6 px-1">Categories</h4>
                            <div className="space-y-2">
                                <button 
                                    onClick={() => handleFilterChange('category', '')}
                                    className={cn(
                                        "w-full text-left px-4 py-3 rounded-xl font-bold text-sm transition-all",
                                        !filters?.category ? "bg-blue-600 text-white shadow-lg shadow-blue-100" : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
                                    )}
                                >
                                    All Categories
                                </button>
                                {categories.map(cat => (
                                    <button 
                                        key={cat.id}
                                        onClick={() => handleFilterChange('category', cat.slug)}
                                        className={cn(
                                            "w-full text-left px-4 py-3 rounded-xl font-bold text-sm transition-all",
                                            filters?.category === cat.slug ? "bg-blue-600 text-white shadow-lg shadow-blue-100" : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
                                        )}
                                    >
                                        {cat.name}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Brands */}
                        <div>
                            <h4 className="font-black text-slate-800 uppercase tracking-widest text-xs mb-6 px-1">Brands</h4>
                            <div className="flex flex-wrap gap-2">
                                {brands.map(brand => (
                                    <button 
                                        key={brand.id}
                                        onClick={() => handleFilterChange('brand', brand.slug)}
                                        className={cn(
                                            "px-4 py-2 rounded-xl font-bold text-xs border transition-all",
                                            filters?.brand === brand.slug 
                                                ? "bg-slate-900 border-slate-900 text-white shadow-lg shadow-slate-200" 
                                                : "bg-white border-slate-100 text-slate-500 hover:border-slate-300"
                                        )}
                                    >
                                        {brand.name}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </aside>

                    {/* Product Grid */}
                    <div className="flex-1">
                        {products.data.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                                {products.data.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        ) : (
                            <div className="bg-white rounded-[3rem] p-20 border border-slate-100 shadow-sm flex flex-col items-center text-center">
                                <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center text-slate-300 mb-6">
                                    <ShoppingBag size={40} />
                                </div>
                                <h3 className="text-2xl font-black text-slate-800 mb-2">No products found</h3>
                                <p className="text-slate-500 font-medium max-w-xs">We couldn't find any items matching your current filters. Try relaxing your search.</p>
                                <button 
                                    onClick={() => router.get(route('shop'))}
                                    className="mt-8 text-blue-600 font-black text-xs uppercase tracking-widest hover:underline"
                                >
                                    Clear All Filters
                                </button>
                            </div>
                        )}

                        {/* Pagination */}
                        {products.links.length > 3 && (
                            <div className="mt-20 flex justify-center gap-2">
                                {products.links.map((link, i) => (
                                    <button
                                        key={i}
                                        disabled={!link.url}
                                        onClick={() => link.url && router.get(link.url)}
                                        className={cn(
                                            "w-12 h-12 rounded-2xl flex items-center justify-center font-black text-sm transition-all",
                                            link.active 
                                                ? "bg-blue-600 text-white shadow-lg shadow-blue-100" 
                                                : "bg-white text-slate-500 border border-slate-100 hover:scale-110 active:scale-95",
                                            !link.url && "opacity-20 cursor-not-allowed"
                                        )}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile Filter Drawer */}
            <div className={cn(
                "fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-sm transition-all duration-500",
                isFilterOpen ? "opacity-100 visible" : "opacity-0 invisible"
            )}>
                <div 
                    className={cn(
                        "absolute right-0 top-0 bottom-0 w-full max-w-sm bg-white shadow-2xl transition-transform duration-500 transform",
                        isFilterOpen ? "translate-x-0" : "translate-x-full"
                    )}
                >
                    <div className="h-full flex flex-col p-8">
                        <div className="flex items-center justify-between mb-10">
                            <h2 className="text-2xl font-black text-slate-800 tracking-tight">Filters</h2>
                            <button onClick={() => setIsFilterOpen(false)} className="p-3 bg-slate-50 rounded-2xl text-slate-400">
                                <X size={20} />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto no-scrollbar space-y-12">
                            {/* Mobile Filters Content (Same as Desktop Sidebar basically) */}
                            <div>
                                <h4 className="font-black text-slate-800 uppercase tracking-widest text-[10px] mb-6">Search</h4>
                                <form onSubmit={(e) => { handleSearch(e); setIsFilterOpen(false); }} className="relative">
                                    <input 
                                        name="search"
                                        type="text" 
                                        placeholder="Keywords..." 
                                        defaultValue={filters?.search}
                                        className="w-full bg-slate-50 border-none px-6 py-4 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-blue-100 transition-all"
                                    />
                                </form>
                            </div>

                            <div>
                                <h4 className="font-black text-slate-800 uppercase tracking-widest text-[10px] mb-6">Categories</h4>
                                <div className="grid grid-cols-1 gap-2">
                                    <button 
                                        onClick={() => { handleFilterChange('category', ''); setIsFilterOpen(false); }}
                                        className={cn(
                                            "text-left px-4 py-3 rounded-xl font-bold text-sm",
                                            !filters?.category ? "bg-blue-600 text-white" : "bg-slate-50 text-slate-500"
                                        )}
                                    >
                                        All Categories
                                    </button>
                                    {categories.map(cat => (
                                        <button 
                                            key={cat.id}
                                            onClick={() => { handleFilterChange('category', cat.slug); setIsFilterOpen(false); }}
                                            className={cn(
                                                "text-left px-4 py-3 rounded-xl font-bold text-sm",
                                                filters?.category === cat.slug ? "bg-blue-600 text-white" : "bg-slate-50 text-slate-500"
                                            )}
                                        >
                                            {cat.name}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="pt-8 border-t border-slate-100">
                            <button 
                                onClick={() => setIsFilterOpen(false)}
                                className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-slate-200"
                            >
                                Apply Filters
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
