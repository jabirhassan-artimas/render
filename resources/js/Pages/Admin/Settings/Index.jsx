import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm } from '@inertiajs/react';
import { 
    Save, 
    Settings as SettingsIcon, 
    Globe, 
    Mail, 
    Phone, 
    MapPin, 
    Facebook, 
    Instagram, 
    Twitter, 
    Linkedin as LinkedIn,
    Image as ImageIcon,
    Check
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export default function Index({ settings }) {
    const { data, setData, post, processing, errors } = useForm({
        _method: 'PUT',
        site_title: settings.site_title || '',
        site_description: settings.site_description || '',
        footer_text: settings.footer_text || '',
        site_email: settings.site_email || '',
        site_phone: settings.site_phone || '',
        site_address: settings.site_address || '',
        facebook_url: settings.facebook_url || '',
        instagram_url: settings.instagram_url || '',
        twitter_url: settings.twitter_url || '',
        site_logo: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.settings.update'), {
            forceFormData: true,
        });
    };

    return (
        <AdminLayout>
            <Head title="System Configuration" />

            <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {/* Header Section */}
                <div>
                    <h1 className="text-3xl font-black text-slate-800 tracking-tight mb-2">Global Settings</h1>
                    <p className="text-slate-500 font-medium">Configure your platform identity, contact information, and social presence.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* General Configuration */}
                    <div className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-sm space-y-10">
                        <div className="flex items-center gap-4 text-slate-800">
                            <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
                                <Globe size={24} />
                            </div>
                            <h2 className="text-xl font-black tracking-tight">Identity & Branding</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">
                                    Website Title
                                </label>
                                <input 
                                    type="text"
                                    value={data.site_title}
                                    onChange={e => setData('site_title', e.target.value)}
                                    className="w-full bg-slate-50 border-none px-6 py-4 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-blue-100 transition-all font-sans"
                                />
                                {errors.site_title && <p className="text-rose-500 text-[10px] font-black uppercase tracking-widest mt-1 ml-1">{errors.site_title}</p>}
                            </div>
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">
                                    Footer Copyright Text
                                </label>
                                <input 
                                    type="text"
                                    value={data.footer_text}
                                    onChange={e => setData('footer_text', e.target.value)}
                                    placeholder="e.g. MyStore © 2026"
                                    className="w-full bg-slate-50 border-none px-6 py-4 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-blue-100 transition-all font-sans"
                                />
                                {errors.footer_text && <p className="text-rose-500 text-[10px] font-black uppercase tracking-widest mt-1 ml-1">{errors.footer_text}</p>}
                            </div>
                            <div className="md:col-span-2 space-y-2">
                                <label className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">
                                    Site Brief Description
                                </label>
                                <textarea 
                                    value={data.site_description}
                                    onChange={e => setData('site_description', e.target.value)}
                                    placeholder="Brief description for SEO and Footer..."
                                    className="w-full bg-slate-50 border-none px-6 py-4 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-blue-100 transition-all font-sans min-h-[80px]"
                                ></textarea>
                                {errors.site_description && <p className="text-rose-500 text-[10px] font-black uppercase tracking-widest mt-1 ml-1">{errors.site_description}</p>}
                            </div>
                            <div className="md:col-span-2 space-y-2">
                                <label className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">
                                    Official Logo
                                </label>
                                <div className="flex items-center gap-6 p-4 bg-slate-50 rounded-[2rem] border border-slate-100">
                                    <div className="w-20 h-20 bg-white rounded-2xl overflow-hidden border border-slate-200 shrink-0 shadow-inner flex items-center justify-center">
                                        {data.site_logo ? (
                                            <img src={URL.createObjectURL(data.site_logo)} className="w-full h-full object-cover" />
                                        ) : (
                                            settings.site_logo ? <img src={`/storage/${settings.site_logo}`} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-slate-200"><ImageIcon size={32} /></div>
                                        )}
                                    </div>
                                    <div className="space-y-2">
                                        <input 
                                            type="file"
                                            onChange={e => setData('site_logo', e.target.files[0])}
                                            className="text-xs text-slate-400 font-bold file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-[10px] file:font-black file:uppercase file:tracking-widest file:bg-blue-600 file:text-white hover:file:bg-blue-700 transition-all cursor-pointer"
                                        />
                                        <p className="text-[10px] text-slate-400 font-medium">Recommended size: 512x512px (PNG/JPG)</p>
                                        {errors.site_logo && <p className="text-rose-500 text-[10px] font-black uppercase tracking-widest mt-1">{errors.site_logo}</p>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Information */}
                    <div className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-sm space-y-10">
                        <div className="flex items-center gap-4 text-slate-800">
                            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl">
                                <Mail size={24} />
                            </div>
                            <h2 className="text-xl font-black tracking-tight">Contact Channels</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">
                                    Support Email
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                                    <input 
                                        type="email"
                                        value={data.site_email}
                                        onChange={e => setData('site_email', e.target.value)}
                                        className="w-full bg-slate-50 border-none pl-14 pr-6 py-4 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-blue-100 transition-all"
                                    />
                                </div>
                                {errors.site_email && <p className="text-rose-500 text-[10px] font-black uppercase tracking-widest mt-1 ml-1">{errors.site_email}</p>}
                            </div>
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">
                                    Contact Phone
                                </label>
                                <div className="relative">
                                    <Phone className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                                    <input 
                                        type="text"
                                        value={data.site_phone}
                                        onChange={e => setData('site_phone', e.target.value)}
                                        className="w-full bg-slate-50 border-none pl-14 pr-6 py-4 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-blue-100 transition-all font-sans"
                                    />
                                </div>
                                {errors.site_phone && <p className="text-rose-500 text-[10px] font-black uppercase tracking-widest mt-1 ml-1">{errors.site_phone}</p>}
                            </div>
                            <div className="md:col-span-2 space-y-2">
                                <label className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">
                                    Physical Address
                                </label>
                                <div className="relative">
                                    <MapPin className="absolute left-6 top-6 text-slate-300" size={18} />
                                    <textarea 
                                        value={data.site_address}
                                        onChange={e => setData('site_address', e.target.value)}
                                        className="w-full bg-slate-50 border-none pl-14 pr-6 py-4 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-blue-100 transition-all min-h-[100px] font-sans"
                                    ></textarea>
                                </div>
                                {errors.site_address && <p className="text-rose-500 text-[10px] font-black uppercase tracking-widest mt-1 ml-1">{errors.site_address}</p>}
                            </div>
                        </div>
                    </div>

                    {/* Social Profiles */}
                    <div className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-sm space-y-10">
                        <div className="flex items-center gap-4 text-slate-800">
                            <div className="p-3 bg-purple-50 text-purple-600 rounded-2xl">
                                <Facebook size={24} />
                            </div>
                            <h2 className="text-xl font-black tracking-tight">Social Media Ecosystem</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">
                                    Facebook
                                </label>
                                <div className="relative">
                                    <Facebook className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                                    <input 
                                        type="text"
                                        value={data.facebook_url}
                                        onChange={e => setData('facebook_url', e.target.value)}
                                        className="w-full bg-slate-50 border-none pl-12 pr-6 py-4 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-blue-100 transition-all font-sans"
                                    />
                                </div>
                                {errors.facebook_url && <p className="text-rose-500 text-[10px] font-black uppercase tracking-widest mt-1 ml-1">{errors.facebook_url}</p>}
                            </div>
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">
                                    Instagram
                                </label>
                                <div className="relative">
                                    <Instagram className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                                    <input 
                                        type="text"
                                        value={data.instagram_url}
                                        onChange={e => setData('instagram_url', e.target.value)}
                                        className="w-full bg-slate-50 border-none pl-12 pr-6 py-4 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-blue-100 transition-all font-sans"
                                    />
                                </div>
                                {errors.instagram_url && <p className="text-rose-500 text-[10px] font-black uppercase tracking-widest mt-1 ml-1">{errors.instagram_url}</p>}
                            </div>
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">
                                    Twitter / X
                                </label>
                                <div className="relative">
                                    <Twitter className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                                    <input 
                                        type="text"
                                        value={data.twitter_url}
                                        onChange={e => setData('twitter_url', e.target.value)}
                                        className="w-full bg-slate-50 border-none pl-12 pr-6 py-4 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-blue-100 transition-all font-sans"
                                    />
                                </div>
                                {errors.twitter_url && <p className="text-rose-500 text-[10px] font-black uppercase tracking-widest mt-1 ml-1">{errors.twitter_url}</p>}
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end gap-3 pt-4">
                        <button 
                            type="submit"
                            disabled={processing}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-16 py-6 rounded-[2.5rem] font-black text-sm uppercase tracking-[0.2em] shadow-2xl shadow-blue-200 transition-all flex items-center gap-4 active:scale-95 disabled:opacity-50"
                        >
                            {processing ? 'Saving...' : <><Save size={20} /> Deploy Configuration</>}
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
