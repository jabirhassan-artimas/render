import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import { 
    Star, 
    MessageSquare, 
    Trash2, 
    Eye, 
    EyeOff, 
    User, 
    Package,
    Clock,
    CheckCircle2,
    XCircle
} from 'lucide-react';

export default function Index({ reviews }) {
    const toggleStatus = (id) => {
        router.put(route('admin.reviews.update', id), {}, {
            preserveScroll: true,
        });
    };

    const deleteReview = (id) => {
        if (confirm('Permanently remove this review?')) {
            router.delete(route('admin.reviews.destroy', id));
        }
    };

    return (
        <AdminLayout>
            <Head title="Public Reviews" />

            <div className="space-y-8 animate-in fade-in duration-500">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-black text-slate-800 tracking-tight mb-2">Social Feedback</h1>
                    <p className="text-slate-500 font-medium">Moderate customer ratings and product testimonials.</p>
                </div>

                {/* Grid View */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                    {reviews.map((review) => (
                        <div key={review.id} className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm relative group overflow-hidden">
                            <div className="flex gap-6 relative z-10">
                                {/* Product & Reviewer */}
                                <div className="flex-1 space-y-4">
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-black text-slate-400 text-xs">
                                                {(review.user?.name || review.name || 'G').charAt(0)}
                                            </div>
                                            <div>
                                                <p className="font-bold text-slate-800 text-sm">{review.user?.name || review.name || 'Anonymous'}</p>
                                                <div className="flex gap-0.5 mt-1">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star 
                                                            key={i} 
                                                            size={10} 
                                                            className={cn("fill-current", i < review.rating ? "text-amber-400" : "text-slate-200")} 
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button 
                                                onClick={() => toggleStatus(review.id)}
                                                className={cn(
                                                    "p-2 rounded-xl border transition-all",
                                                    review.status 
                                                        ? "bg-emerald-50 text-emerald-600 border-emerald-100 hover:bg-emerald-100" 
                                                        : "bg-slate-50 text-slate-400 border-slate-100 hover:bg-slate-100"
                                                )}
                                                title={review.status ? "Hide Review" : "Show Review"}
                                            >
                                                {review.status ? <Eye size={14} /> : <EyeOff size={14} />}
                                            </button>
                                            <button 
                                                onClick={() => deleteReview(review.id)}
                                                className="p-2 bg-rose-50 text-rose-500 border border-rose-100 rounded-xl hover:bg-rose-100 transition-all"
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100 relative">
                                        <MessageSquare size={16} className="absolute -top-2 -left-2 text-emerald-100" />
                                        <p className="text-sm font-medium text-slate-700 leading-relaxed italic">
                                            "{review.comment}"
                                        </p>
                                    </div>

                                    <div className="flex items-center justify-between pt-2">
                                        <div className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-300 tracking-widest">
                                            <Clock size={12} /> {new Date(review.created_at).toLocaleDateString()}
                                        </div>
                                        <Link 
                                            href={route('admin.products.edit', review.product_id)}
                                            className="flex items-center gap-2 text-[10px] font-black uppercase text-emerald-500 tracking-widest hover:underline"
                                        >
                                            <Package size={12} /> {review.product?.name || 'Linked Product'}
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            {/* Status Indicator */}
                            <div className={cn(
                                "absolute bottom-0 right-0 w-16 h-1 rounded-tl-full",
                                review.status ? "bg-emerald-500" : "bg-rose-500"
                            )}></div>
                        </div>
                    ))}

                    {reviews.length === 0 && (
                        <div className="col-span-full py-20 bg-white rounded-[3rem] border border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400">
                            <MessageSquare size={48} className="mb-4 opacity-10" />
                            <p className="font-black text-xs uppercase tracking-widest">Quiet in here... No reviews yet.</p>
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}

function cn(...inputs) {
    return inputs.filter(Boolean).join(' ');
}
