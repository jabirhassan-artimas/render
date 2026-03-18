import React from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { Head, Link } from '@inertiajs/react';
import { 
    ChevronRight, 
    ArrowRight,
    LayoutGrid,
    Search
} from 'lucide-react';

export default function Categories({ categories }) {
    return (
        <AppLayout>
            <Head title="Browse Categories" />

            <div className="container mx-auto px-4 md:px-6 py-12">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
                    <div>
                        <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-6">
                            <Link href="/" className="hover:text-blue-600">Home</Link>
                            <ChevronRight size={10} />
                            <span className="text-blue-600">Categories</span>
                        </nav>
                        <h1 className="text-4xl md:text-6xl font-black text-slate-800 tracking-tight leading-tight">
                            Shop by Collection
                        </h1>
                    </div>
                    <div className="md:w-64">
                         <div className="bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 flex items-center gap-3">
                            <Search size={18} className="text-slate-300" />
                            <input type="text" placeholder="Find a category..." className="bg-transparent border-none p-0 text-sm font-bold focus:ring-0 w-full" />
                         </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                    {categories.map((category) => (
                        <div key={category.id} className="group cursor-pointer">
                            <div className="bg-white rounded-[3rem] p-4 border border-slate-50 shadow-sm hover:shadow-2xl hover:shadow-blue-50 transition-all duration-700 h-full flex flex-col">
                                <Link href={route('category', category.slug)} className="block aspect-[4/3] rounded-[2.5rem] overflow-hidden mb-8 relative">
                                    <img 
                                        src={category.image ? (category.image.startsWith('http') ? category.image : `/storage/${category.image.replace(/^\//, '')}`) : '/placeholder-category.jpg'} 
                                        alt={category.name} 
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                                    />
                                    <div className="absolute inset-0 bg-blue-900/10 group-hover:bg-transparent transition-colors"></div>
                                    <div className="absolute bottom-6 right-6">
                                        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-slate-800 shadow-xl opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                                            <ArrowRight size={20} />
                                        </div>
                                    </div>
                                </Link>

                                <div className="px-6 pb-8 flex-1 flex flex-col">
                                    <h3 className="text-2xl font-black text-slate-800 tracking-tight mb-4 flex items-center gap-3 group-hover:text-blue-600 transition-colors">
                                        {category.name}
                                    </h3>
                                    
                                    {category.children?.length > 0 ? (
                                        <div className="flex flex-wrap gap-2 mt-auto">
                                            {category.children.slice(0, 5).map(child => (
                                                <Link 
                                                    key={child.id}
                                                    href={route('category', child.slug)}
                                                    className="bg-slate-50 hover:bg-blue-50 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-blue-600 px-4 py-2 rounded-xl transition-all"
                                                >
                                                    {child.name}
                                                </Link>
                                            ))}
                                            {category.children.length > 5 && (
                                                <span className="text-[10px] font-black text-slate-300 px-2 py-2">+{category.children.length - 5} More</span>
                                            )}
                                        </div>
                                    ) : (
                                        <p className="text-slate-400 font-bold text-sm leading-relaxed mb-6">Explore our exclusive {category.name.toLowerCase()} curation.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {categories.length === 0 && (
                    <div className="py-32 flex flex-col items-center text-center">
                        <div className="w-24 h-24 bg-slate-50 rounded-[2rem] flex items-center justify-center text-slate-200 mb-8 border border-slate-100">
                            <LayoutGrid size={48} />
                        </div>
                        <h2 className="text-3xl font-black text-slate-800 mb-4 tracking-tight">No collections found</h2>
                        <p className="text-slate-500 font-medium max-w-sm mb-12">We're updating our warehouse. Please check back shortly for new curated collections.</p>
                        <Link href="/" className="bg-slate-900 text-white px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-slate-200 transition-all active:scale-95">Back to Home</Link>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
