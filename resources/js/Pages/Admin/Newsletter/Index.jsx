import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import {
    Mail,
    Trash2,
    CheckCircle2,
    Calendar,
    Send,
    UserCircle,
    Copy
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export default function Index({ subscribers }) {
    const handleDelete = (id) => {
        if (confirm('Are you sure you want to remove this subscriber?')) {
            router.delete(route('admin.newsletter.destroy', id));
        }
    };

    const copyToClipboard = () => {
        const emails = subscribers.data.map(s => s.email).join(', ');
        navigator.clipboard.writeText(emails);
        alert('All emails copied to clipboard!');
    };

    return (
        <AdminLayout>
            <Head title="Newsletter Management" />

            <div className="space-y-8 animate-in fade-in duration-500">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <h1 className="text-3xl font-black text-slate-800 tracking-tight mb-2">Audience Retention</h1>
                        <p className="text-slate-500 font-medium">Manage your newsletter distribution list and leads.</p>
                    </div>
                    <div className="flex gap-4">
                        <button
                            onClick={copyToClipboard}
                            className="bg-white border border-slate-100 text-slate-600 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-sm hover:bg-slate-50 transition-all flex items-center gap-3 active:scale-95 shrink-0"
                        >
                            <Copy size={18} /> Export Emails
                        </button>
                        <button className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-slate-200 transition-all flex items-center gap-3 active:scale-95 shrink-0">
                            <Send size={18} /> Send Campaign
                        </button>
                    </div>
                </div>

                {/* Table Section */}
                <div className="bg-white rounded-[3.5rem] border border-slate-100 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50/50">
                                    <th className="px-12 py-8 text-[10px] font-black uppercase text-slate-400 tracking-widest">Subscriber</th>
                                    <th className="px-12 py-8 text-[10px] font-black uppercase text-slate-400 tracking-widest">Subscription Date</th>
                                    <th className="px-12 py-8 text-[10px] font-black uppercase text-slate-400 tracking-widest text-center">Status</th>
                                    <th className="px-12 py-8 text-[10px] font-black uppercase text-slate-400 tracking-widest text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {subscribers.data.length > 0 ? subscribers.data.map((sub) => (
                                    <tr key={sub.id} className="group hover:bg-slate-50/30 transition-colors">
                                        <td className="px-12 py-8">
                                            <div className="flex items-center gap-5">
                                                <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-[1.5rem] flex items-center justify-center border border-indigo-100/50 shrink-0">
                                                    <UserCircle size={28} />
                                                </div>
                                                <div>
                                                    <p className="font-black text-slate-800 text-lg group-hover:text-indigo-600 transition-colors tracking-tight">{sub.email}</p>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <Mail size={12} className="text-slate-300" />
                                                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Verified Recipient</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-12 py-8">
                                            <div className="flex items-center gap-3 text-slate-500">
                                                <div className="w-8 h-8 bg-slate-50 rounded-lg flex items-center justify-center text-slate-400">
                                                    <Calendar size={14} />
                                                </div>
                                                <span className="text-sm font-bold">{new Date(sub.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                                            </div>
                                        </td>
                                        <td className="px-12 py-8">
                                            <div className="flex justify-center">
                                                <div className="flex items-center gap-2 text-emerald-600 bg-emerald-50 px-4 py-2 rounded-2xl border border-emerald-100">
                                                    <CheckCircle2 size={16} />
                                                    <span className="text-[10px] font-black uppercase tracking-widest">Subscribed</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-12 py-8 text-right">
                                            <button
                                                onClick={() => handleDelete(sub.id)}
                                                className="p-4 bg-white border border-slate-100 text-slate-400 hover:text-rose-500 hover:border-rose-100 rounded-2xl transition-all shadow-sm active:scale-95"
                                            >
                                                <Trash2 size={20} />
                                            </button>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="4" className="py-32 text-center">
                                            <div className="flex flex-col items-center gap-4 text-slate-300">
                                                <Mail size={64} strokeWidth={1} />
                                                <p className="font-black text-xl tracking-tight">No subscribers found yet.</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {subscribers.links.length > 3 && (
                        <div className="px-12 py-10 bg-slate-50/50 flex flex-col md:flex-row items-center justify-between gap-6 border-t border-slate-100">
                            <p className="text-sm font-bold text-slate-400">
                                Showing <span className="text-slate-800">{subscribers.from}</span> to <span className="text-slate-800">{subscribers.to}</span> of <span className="text-slate-800">{subscribers.total}</span> subscribers
                            </p>

                            <div className="flex gap-2">
                                {subscribers.links.map((link, i) => (
                                    <button
                                        key={i}
                                        disabled={!link.url}
                                        onClick={() => link.url && router.get(link.url)}
                                        className={cn(
                                            "min-w-[48px] h-[48px] px-4 rounded-2xl flex items-center justify-center text-xs font-black transition-all",
                                            link.active
                                                ? "bg-slate-900 text-white shadow-xl shadow-slate-200"
                                                : "bg-white text-slate-400 border border-slate-100 hover:border-slate-300",
                                            !link.url && "opacity-20 cursor-not-allowed"
                                        )}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}
