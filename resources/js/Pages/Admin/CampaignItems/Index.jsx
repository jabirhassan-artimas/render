import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import { Plus, Edit2, Trash2, Image as ImageIcon, GripVertical, CheckCircle2, XCircle, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Index({ items }) {
    const deleteItem = (id) => {
        if (confirm('Are you sure you want to delete this campaign item?')) {
            router.delete(route('admin.campaign-items.destroy', id));
        }
    };

    return (
        <AdminLayout>
            <Head title="Manage Campaign Items" />
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <div className="p-4 bg-amber-50 text-amber-600 rounded-[2rem] shadow-sm">
                            <Sparkles size={32} />
                        </div>
                        <div>
                            <h1 className="text-3xl font-black text-slate-800 tracking-tight">Campaign Items</h1>
                            <p className="text-slate-500 font-bold">Manage products in the "Festival Arrangement" section.</p>
                        </div>
                    </div>
                    <Link
                        href={route('admin.campaign-items.create')}
                        className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-[2rem] font-black text-sm uppercase tracking-widest transition-all shadow-xl shadow-emerald-600/20 active:scale-95"
                    >
                        <Plus size={18} /> Add New Item
                    </Link>
                </div>

                {/* Items Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {items.map((item) => (
                        <motion.div
                            key={item.id}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-white rounded-[3.5rem] p-8 shadow-sm border border-slate-100 group relative overflow-hidden flex flex-col h-full"
                        >
                            <div className="absolute top-6 right-6 flex gap-2 z-10 opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                                <Link
                                    href={route('admin.campaign-items.edit', item.id)}
                                    className="p-3 bg-white/90 backdrop-blur shadow-lg rounded-2xl text-slate-600 hover:text-indigo-600 transition-colors"
                                >
                                    <Edit2 size={18} />
                                </Link>
                                <button
                                    onClick={() => deleteItem(item.id)}
                                    className="p-3 bg-white/90 backdrop-blur shadow-lg rounded-2xl text-slate-600 hover:text-rose-600 transition-colors"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>

                            <div className="space-y-6 flex-1 flex flex-col">
                                <div className="aspect-[3/4] rounded-[2.5rem] overflow-hidden bg-slate-50 border border-slate-100 relative shadow-inner group-hover:shadow-xl transition-all duration-700">
                                    {item.image ? (
                                        <img src={`/uploads/${item.image}`} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt={item.title} />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-slate-200">
                                            <ImageIcon size={64} />
                                        </div>
                                    )}
                                    <div className="absolute bottom-6 left-6">
                                        {item.status ? (
                                            <span className="inline-flex items-center gap-2 bg-emerald-500 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg shadow-emerald-500/30">
                                                <CheckCircle2 size={12} /> Live
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center gap-2 bg-slate-400 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg shadow-slate-400/30">
                                                <XCircle size={12} /> Draft
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div className="flex-1 space-y-2">
                                    <h3 className="text-2xl font-black text-slate-800 leading-none tracking-tight">{item.title}</h3>
                                    {item.price && (
                                        <p className="text-xl font-black text-primary drop-shadow-sm">{item.price}</p>
                                    )}
                                </div>

                                <div className="pt-6 border-t border-slate-50 flex items-center justify-between text-[11px] font-black uppercase tracking-widest text-slate-300">
                                    <span className="bg-slate-50 px-3 py-1 rounded-lg border border-slate-100 italic">Order #{item.sort_order}</span>
                                    <GripVertical size={16} className="text-slate-100" />
                                </div>
                            </div>
                        </motion.div>
                    ))}

                    {items.length === 0 && (
                        <div className="col-span-full py-32 text-center bg-white rounded-[4rem] border-4 border-dashed border-slate-100">
                            <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                <ImageIcon size={48} className="text-slate-200" />
                            </div>
                            <h3 className="text-2xl font-black text-slate-400 tracking-tight">No items yet</h3>
                            <p className="text-slate-300 font-bold mt-2 max-w-sm mx-auto">Create your first campaign product to bring your festival section to life.</p>
                            <Link
                                href={route('admin.campaign-items.create')}
                                className="mt-8 inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-10 py-4 rounded-[2rem] font-black text-sm uppercase tracking-widest transition-all shadow-xl shadow-emerald-600/20 active:scale-95"
                            >
                                <Plus size={18} /> Add First Item
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}
