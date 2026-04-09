import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import { Plus, Edit2, Trash2, Image as ImageIcon, GripVertical, CheckCircle2, XCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Index({ stories }) {
    const deleteStory = (id) => {
        if (confirm('Are you sure you want to delete this story?')) {
            router.delete(route('admin.stories.destroy', id));
        }
    };

    return (
        <AdminLayout>
            <Head title="Manage Stories" />
            <div className="p-4 md:p-8 bg-slate-50 min-h-screen">
                <div className="max-w-7xl mx-auto space-y-8">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-black text-slate-800 tracking-tight">Artisan Stories</h1>
                            <p className="text-slate-500 font-bold">Manage the "Made in Bangladesh" slider on the homepage.</p>
                        </div>
                        <Link
                            href={route('admin.stories.create')}
                            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-2xl font-black text-sm uppercase tracking-widest transition-all shadow-lg shadow-emerald-600/20"
                        >
                            <Plus size={18} /> Add New Story
                        </Link>
                    </div>

                    {/* Stories Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {stories.map((story) => (
                            <motion.div
                                key={story.id}
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white rounded-[2.5rem] p-6 shadow-sm border border-slate-100 group relative overflow-hidden"
                            >
                                <div className="absolute top-4 right-4 flex gap-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Link
                                        href={route('admin.stories.edit', story.id)}
                                        className="p-2 bg-white/90 backdrop-blur shadow-sm rounded-xl text-slate-600 hover:text-indigo-600 transition-colors"
                                    >
                                        <Edit2 size={16} />
                                    </Link>
                                    <button
                                        onClick={() => deleteStory(story.id)}
                                        className="p-2 bg-white/90 backdrop-blur shadow-sm rounded-xl text-slate-600 hover:text-rose-600 transition-colors"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>

                                <div className="space-y-4">
                                    <div className="aspect-square rounded-[2rem] overflow-hidden bg-slate-100 border border-slate-100 relative">
                                        {story.image ? (
                                            <img src={`/uploads/${story.image}`} className="w-full h-full object-cover" alt={story.title} />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-slate-300">
                                                <ImageIcon size={48} />
                                            </div>
                                        )}
                                        <div className="absolute bottom-4 left-4">
                                            {story.status ? (
                                                <span className="inline-flex items-center gap-1 bg-emerald-500 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                                                    <CheckCircle2 size={10} /> Active
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1 bg-slate-400 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                                                    <XCircle size={10} /> Hidden
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-500 mb-1">{story.subtitle}</p>
                                        <h3 className="text-xl font-black text-slate-800 leading-tight">{story.title}</h3>
                                        <p className="text-slate-500 text-sm font-bold line-clamp-2 mt-2">{story.description}</p>
                                    </div>

                                    <div className="pt-4 border-t border-slate-50 flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-slate-400">
                                        <span>Order: {story.sort_order}</span>
                                        <GripVertical size={14} className="text-slate-200" />
                                    </div>
                                </div>
                            </motion.div>
                        ))}

                        {stories.length === 0 && (
                            <div className="col-span-full py-20 text-center bg-white rounded-[3rem] border-2 border-dashed border-slate-200">
                                <ImageIcon size={64} className="mx-auto text-slate-200 mb-4" />
                                <h3 className="text-xl font-black text-slate-400">No stories added yet</h3>
                                <p className="text-slate-300 font-bold mt-2">Start by adding your first artisan story.</p>
                                <Link
                                    href={route('admin.stories.create')}
                                    className="mt-6 inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-2xl font-black text-sm uppercase tracking-widest"
                                >
                                    Add First Story
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
