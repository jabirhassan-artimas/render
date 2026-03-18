import React, { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import { 
    Plus, 
    Search, 
    Edit, 
    Trash2, 
    MessageSquare,
    CheckCircle2,
    XCircle,
    ChevronLeft,
    ChevronRight,
    ArrowUpDown,
    Filter,
    Quote,
    Star
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export default function Index({ testimonials, filters }) {
    const [search, setSearch] = useState(filters.search || '');

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route('admin.testimonials.index'), { search }, { preserveState: true });
    };

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this testimonial?')) {
            router.delete(route('admin.testimonials.destroy', id));
        }
    };

    return (
        <AdminLayout>
            <Head title="Client Testimonials" />

            <div className="space-y-8 animate-in fade-in duration-500">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <h1 className="text-3xl font-black text-slate-800 tracking-tight mb-2">Social Proof</h1>
                        <p className="text-slate-500 font-medium">Manage client stories and testimonials to build brand trust.</p>
                    </div>
                    <Link 
                        href={route('admin.testimonials.create')}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-200 transition-all flex items-center gap-3 active:scale-95 shrink-0"
                    >
                        <Plus size={18} /> Add Review
                    </Link>
                </div>

                {/* Filters */}
                <div className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm">
                    <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4 w-full">
                        <div className="flex-1 relative">
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                            <input 
                                type="text" 
                                placeholder="Search by reviewer name..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full bg-slate-50 border-none pl-14 pr-6 py-4 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-blue-100 transition-all"
                            />
                        </div>
                        <button type="submit" className="bg-slate-900 text-white px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-800 transition-all shadow-lg active:scale-95">
                            Filter
                        </button>
                    </form>
                </div>

                {/* Grid Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                    {testimonials.data.map((testimonial) => (
                        <div key={testimonial.id} className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-blue-50 transition-all duration-500 group relative">
                            <Quote className="absolute top-6 right-8 text-slate-50 opacity-50 transition-all group-hover:text-blue-50 group-hover:scale-150" size={80} />
                            
                            <div className="relative z-10 flex flex-col h-full">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-16 h-16 rounded-2xl bg-slate-100 overflow-hidden border border-slate-50">
                                        {testimonial.image ? (
                                            <img src={`/storage/${testimonial.image}`} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center font-black text-slate-300 text-xl italic uppercase">
                                                {testimonial.name.charAt(0)}
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-1 min-width-0">
                                        <h3 className="text-lg font-black text-slate-800 truncate">{testimonial.name}</h3>
                                        <p className="text-xs font-bold text-slate-400 capitalize">{testimonial.designation || 'Verified Client'}</p>
                                    </div>
                                </div>

                                <div className="flex-1 italic text-slate-500 text-sm leading-relaxed mb-8 line-clamp-4">
                                    "{testimonial.content}"
                                </div>

                                <div className="pt-6 border-t border-slate-50 flex items-center justify-between">
                                    <div className={cn(
                                        "px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest",
                                        testimonial.status ? "bg-emerald-50 text-emerald-600" : "bg-slate-50 text-slate-400"
                                    )}>
                                        {testimonial.status ? 'Visible' : 'Draft'}
                                    </div>
                                    <div className="flex gap-2">
                                        <Link 
                                            href={route('admin.testimonials.edit', testimonial.id)}
                                            className="p-3 bg-white border border-slate-100 text-slate-300 hover:text-blue-600 hover:border-blue-100 rounded-xl transition-all shadow-sm"
                                        >
                                            <Edit size={16} />
                                        </Link>
                                        <button 
                                            onClick={() => handleDelete(testimonial.id)}
                                            className="p-3 bg-white border border-slate-100 text-slate-300 hover:text-rose-500 hover:border-rose-100 rounded-xl transition-all shadow-sm"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination */}
                {testimonials.links.length > 3 && (
                    <div className="flex justify-center gap-2 pt-12">
                         {testimonials.links.map((link, i) => (
                            <button
                                key={i}
                                disabled={!link.url}
                                onClick={() => link.url && router.get(link.url, { search }, { preserveState: true })}
                                className={cn(
                                    "w-12 h-12 rounded-2xl flex items-center justify-center text-xs font-black transition-all",
                                    link.active 
                                        ? "bg-blue-600 text-white shadow-xl shadow-blue-100" 
                                        : "bg-white text-slate-400 border border-slate-100 hover:border-slate-300",
                                    !link.url && "opacity-20 cursor-not-allowed"
                                )}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
