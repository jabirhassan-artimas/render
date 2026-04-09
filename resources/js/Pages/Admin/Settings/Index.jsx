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
    Check,
    Lock,
    Sparkles
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
        whatsapp_number: settings.whatsapp_number || '+8801410840877',
        hero_video_url: settings.hero_video_url || '',
        login_welcome_title: settings.login_welcome_title || 'Shuba Swagatam',
        login_hero_title: settings.login_hero_title || 'Reconnect with Banglar Heritage',
        login_hero_description: settings.login_hero_description || 'Sign in to access your curated collection of traditional craftsmanship and artisanal masterpieces.',
        register_welcome_title: settings.register_welcome_title || 'Join our Sangha',
        register_hero_title: settings.register_hero_title || 'Enter the Elite Sangha',
        register_hero_description: settings.register_hero_description || 'Join a community dedicated to preserving and celebrating the finest artisanal traditions of Bengal.',
        featured_products_title: settings.featured_products_title || 'Popular Products',
        categories_title: settings.categories_title || 'Shop by Category',
        services_title: settings.services_title || 'Why Choose Us',
        testimonials_title: settings.testimonials_title || 'What Our Customers Say',
        districts_title: settings.districts_title || 'Shop by District',
        districts_subtitle: settings.districts_subtitle || '৬৪ জেলার ঐতিহ্যবাহী সব পণ্য এখন এক জায়গায়',
        story_point_1: settings.story_point_1 || 'সরাসরি প্রান্তিক কারিগর থেকে সংগৃহীত',
        story_point_2: settings.story_point_2 || 'সম্পূর্ণ প্রাকৃতিক ও পরিবেশবান্ধব উপকরণ',
        story_point_3: settings.story_point_3 || 'দেশীয় ঐতিহ্যের আধুনিক সংস্করণ',
        story_button_text: settings.story_button_text || 'আমাদের গল্প পড়ুন',
        story_button_url: settings.story_button_url || '/page/about-us',
        festival_title: settings.festival_title || 'উৎসবের আয়োজন',
        festival_subtitle: settings.festival_subtitle || 'পহেলা বৈশাখ স্পেশাল',
        festival_description: settings.festival_description || 'আপনার পছন্দের পহেলা বৈশাখ স্পেশাল নকশী কাঁথা ও লাল সাদার কালেকশন এখন আমাদের স্টোরে।',
        festival_button_text: settings.festival_button_text || 'কালেকশন দেখুন',
        festival_button_url: settings.festival_button_url || '/shop',
        story_image: null,
        festival_image: null,
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
                            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl">
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
                                    className="w-full bg-slate-50 border-none px-6 py-4 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-emerald-100 transition-all font-sans"
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
                                    className="w-full bg-slate-50 border-none px-6 py-4 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-emerald-100 transition-all font-sans"
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
                                    className="w-full bg-slate-50 border-none px-6 py-4 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-emerald-100 transition-all font-sans min-h-[80px]"
                                ></textarea>
                                {errors.site_description && <p className="text-rose-500 text-[10px] font-black uppercase tracking-widest mt-1 ml-1">{errors.site_description}</p>}
                            </div>
                            <div className="md:col-span-2 space-y-2">
                                <label className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">
                                    Hero Video URL (YouTube/Vimeo)
                                </label>
                                <input
                                    type="text"
                                    value={data.hero_video_url}
                                    onChange={e => setData('hero_video_url', e.target.value)}
                                    placeholder="https://www.youtube.com/watch?v=..."
                                    className="w-full bg-slate-50 border-none px-6 py-4 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-emerald-100 transition-all font-sans"
                                />
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
                                            settings.site_logo ? <img src={`/uploads/${settings.site_logo}`} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-slate-200"><ImageIcon size={32} /></div>
                                        )}
                                    </div>
                                    <div className="space-y-2">
                                        <input
                                            type="file"
                                            onChange={e => setData('site_logo', e.target.files[0])}
                                            className="text-xs text-slate-400 font-bold file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-[10px] file:font-black file:uppercase file:tracking-widest file:bg-emerald-600 file:text-white hover:file:bg-emerald-700 transition-all cursor-pointer"
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
                                        className="w-full bg-slate-50 border-none pl-14 pr-6 py-4 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-emerald-100 transition-all"
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
                                        className="w-full bg-slate-50 border-none pl-14 pr-6 py-4 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-emerald-100 transition-all font-sans"
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
                                        className="w-full bg-slate-50 border-none pl-14 pr-6 py-4 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-emerald-100 transition-all min-h-[100px] font-sans"
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
                                        className="w-full bg-slate-50 border-none pl-12 pr-6 py-4 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-emerald-100 transition-all font-sans"
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
                                        className="w-full bg-slate-50 border-none pl-12 pr-6 py-4 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-emerald-100 transition-all font-sans"
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
                                        className="w-full bg-slate-50 border-none pl-12 pr-6 py-4 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-emerald-100 transition-all font-sans"
                                    />
                                </div>
                                {errors.twitter_url && <p className="text-rose-500 text-[10px] font-black uppercase tracking-widest mt-1 ml-1">{errors.twitter_url}</p>}
                            </div>
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">
                                    WhatsApp Number (for floating button)
                                </label>
                                <div className="relative">
                                    <Phone className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                                    <input
                                        type="text"
                                        value={data.whatsapp_number}
                                        onChange={e => setData('whatsapp_number', e.target.value)}
                                        placeholder="+8801..."
                                        className="w-full bg-slate-50 border-none pl-12 pr-6 py-4 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-emerald-100 transition-all font-sans"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Announcement Texts */}
                    <div className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-sm space-y-10">
                        <div className="flex items-center gap-4 text-slate-800">
                            <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
                                <ImageIcon size={24} />
                            </div>
                            <h2 className="text-xl font-black tracking-tight">Announcement & UI Labels</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">
                                    Top Bar Text 1
                                </label>
                                <input
                                    type="text"
                                    value={data.top_bar_text_1}
                                    onChange={e => setData('top_bar_text_1', e.target.value)}
                                    className="w-full bg-slate-50 border-none px-6 py-4 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-emerald-100 transition-all font-sans"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">
                                    Top Bar Text 2
                                </label>
                                <input
                                    type="text"
                                    value={data.top_bar_text_2}
                                    onChange={e => setData('top_bar_text_2', e.target.value)}
                                    className="w-full bg-slate-50 border-none px-6 py-4 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-emerald-100 transition-all font-sans"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">
                                    Support Action Label
                                </label>
                                <input
                                    type="text"
                                    value={data.support_label}
                                    onChange={e => setData('support_label', e.target.value)}
                                    className="w-full bg-slate-50 border-none px-6 py-4 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-emerald-100 transition-all font-sans"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Authentication UI Configuration */}
                    <div className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-sm space-y-10">
                        <div className="flex items-center gap-4 text-slate-800">
                            <div className="p-3 bg-rose-50 text-rose-600 rounded-2xl">
                                <Lock size={24} />
                            </div>
                            <h2 className="text-xl font-black tracking-tight">Authentication UI (Login/Register)</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Login Welcome Title</label>
                                <input type="text" value={data.login_welcome_title} onChange={e => setData('login_welcome_title', e.target.value)} className="w-full bg-slate-50 border-none px-6 py-4 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-emerald-100 transition-all font-sans" />
                            </div>
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Register Welcome Title</label>
                                <input type="text" value={data.register_welcome_title} onChange={e => setData('register_welcome_title', e.target.value)} className="w-full bg-slate-50 border-none px-6 py-4 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-emerald-100 transition-all font-sans" />
                            </div>
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Login Hero Title</label>
                                <input type="text" value={data.login_hero_title} onChange={e => setData('login_hero_title', e.target.value)} className="w-full bg-slate-50 border-none px-6 py-4 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-emerald-100 transition-all font-sans" />
                            </div>
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Register Hero Title</label>
                                <input type="text" value={data.register_hero_title} onChange={e => setData('register_hero_title', e.target.value)} className="w-full bg-slate-50 border-none px-6 py-4 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-emerald-100 transition-all font-sans" />
                            </div>
                            <div className="md:col-span-2 space-y-2">
                                <label className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Login Hero Description</label>
                                <textarea value={data.login_hero_description} onChange={e => setData('login_hero_description', e.target.value)} className="w-full bg-slate-50 border-none px-6 py-4 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-emerald-100 transition-all font-sans min-h-[60px]"></textarea>
                            </div>
                            <div className="md:col-span-2 space-y-2">
                                <label className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Register Hero Description</label>
                                <textarea value={data.register_hero_description} onChange={e => setData('register_hero_description', e.target.value)} className="w-full bg-slate-50 border-none px-6 py-4 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-emerald-100 transition-all font-sans min-h-[60px]"></textarea>
                            </div>
                        </div>
                    </div>

                    {/* Home Page Sections Configuration */}
                    <div className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-sm space-y-10">
                        <div className="flex items-center gap-4 text-slate-800">
                            <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl">
                                <Sparkles size={24} />
                            </div>
                            <h2 className="text-xl font-black tracking-tight">Home Page Section Titles</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Featured Products Section Title</label>
                                <input type="text" value={data.featured_products_title} onChange={e => setData('featured_products_title', e.target.value)} className="w-full bg-slate-50 border-none px-6 py-4 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-emerald-100 transition-all font-sans" />
                            </div>
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Categories Section Title</label>
                                <input type="text" value={data.categories_title} onChange={e => setData('categories_title', e.target.value)} className="w-full bg-slate-50 border-none px-6 py-4 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-emerald-100 transition-all font-sans" />
                            </div>
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Services Section Title</label>
                                <input type="text" value={data.services_title} onChange={e => setData('services_title', e.target.value)} className="w-full bg-slate-50 border-none px-6 py-4 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-emerald-100 transition-all font-sans" />
                            </div>
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Testimonials Section Title</label>
                                <input type="text" value={data.testimonials_title} onChange={e => setData('testimonials_title', e.target.value)} className="w-full bg-slate-50 border-none px-6 py-4 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-emerald-100 transition-all font-sans" />
                            </div>
                        </div>
                    </div>

                    {/* Story Section Configuration */}
                    <div className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-sm space-y-10">
                        <div className="flex items-center gap-4 text-slate-800">
                            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl">
                                <Sparkles size={24} />
                            </div>
                            <h2 className="text-xl font-black tracking-tight">Our Story Section</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Story Headline</label>
                                <input type="text" value={data.story_title} onChange={e => setData('story_title', e.target.value)} className="w-full bg-slate-50 border-none px-6 py-4 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-emerald-100 transition-all font-sans" />
                            </div>
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Story Sub-headline</label>
                                <input type="text" value={data.story_subtitle} onChange={e => setData('story_subtitle', e.target.value)} className="w-full bg-slate-50 border-none px-6 py-4 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-emerald-100 transition-all font-sans" />
                            </div>
                            <div className="md:col-span-2 space-y-2">
                                <label className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Story Description</label>
                                <textarea value={data.story_description} onChange={e => setData('story_description', e.target.value)} className="w-full bg-slate-50 border-none px-6 py-4 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-emerald-100 transition-all font-sans min-h-[100px]"></textarea>
                            </div>
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Story Bullet Point 1</label>
                                <input type="text" value={data.story_point_1} onChange={e => setData('story_point_1', e.target.value)} className="w-full bg-slate-50 border-none px-6 py-4 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-emerald-100 transition-all font-sans" />
                            </div>
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Story Bullet Point 2</label>
                                <input type="text" value={data.story_point_2} onChange={e => setData('story_point_2', e.target.value)} className="w-full bg-slate-50 border-none px-6 py-4 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-emerald-100 transition-all font-sans" />
                            </div>
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Story Bullet Point 3</label>
                                <input type="text" value={data.story_point_3} onChange={e => setData('story_point_3', e.target.value)} className="w-full bg-slate-50 border-none px-6 py-4 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-emerald-100 transition-all font-sans" />
                            </div>
                            <div className="space-y-2"></div>
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Button Text</label>
                                <input type="text" value={data.story_button_text} onChange={e => setData('story_button_text', e.target.value)} className="w-full bg-slate-50 border-none px-6 py-4 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-emerald-100 transition-all font-sans" />
                            </div>
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Button URL</label>
                                <input type="text" value={data.story_button_url} onChange={e => setData('story_button_url', e.target.value)} className="w-full bg-slate-50 border-none px-6 py-4 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-emerald-100 transition-all font-sans" />
                            </div>
                            <div className="md:col-span-2 space-y-2">
                                <label className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Section Image</label>
                                <div className="flex items-center gap-6 p-4 bg-slate-50 rounded-[2rem] border border-slate-100">
                                    <div className="w-20 h-20 bg-white rounded-2xl overflow-hidden border border-slate-200 shrink-0 shadow-inner flex items-center justify-center">
                                        {data.story_image ? (
                                            <img src={URL.createObjectURL(data.story_image)} className="w-full h-full object-cover" />
                                        ) : (
                                            settings.story_image ? <img src={`/uploads/${settings.story_image}`} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-slate-200"><ImageIcon size={32} /></div>
                                        )}
                                    </div>
                                    <div className="space-y-2">
                                        <input type="file" onChange={e => setData('story_image', e.target.files[0])} className="text-xs text-slate-400 font-bold file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-[10px] file:font-black file:uppercase file:tracking-widest file:bg-emerald-600 file:text-white hover:file:bg-emerald-700 transition-all cursor-pointer" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Festival Section Configuration */}
                    <div className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-sm space-y-10">
                        <div className="flex items-center gap-4 text-slate-800">
                            <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl">
                                <Sparkles size={24} />
                            </div>
                            <h2 className="text-xl font-black tracking-tight">Festival Section</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Festival Headline</label>
                                <input type="text" value={data.festival_title} onChange={e => setData('festival_title', e.target.value)} className="w-full bg-slate-50 border-none px-6 py-4 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-emerald-100 transition-all font-sans" />
                            </div>
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Festival Sub-headline</label>
                                <input type="text" value={data.festival_subtitle} onChange={e => setData('festival_subtitle', e.target.value)} className="w-full bg-slate-50 border-none px-6 py-4 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-emerald-100 transition-all font-sans" />
                            </div>
                            <div className="md:col-span-2 space-y-2">
                                <label className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Festival Description</label>
                                <textarea value={data.festival_description} onChange={e => setData('festival_description', e.target.value)} className="w-full bg-slate-50 border-none px-6 py-4 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-emerald-100 transition-all font-sans min-h-[100px]"></textarea>
                            </div>
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Button Text</label>
                                <input type="text" value={data.festival_button_text} onChange={e => setData('festival_button_text', e.target.value)} className="w-full bg-slate-50 border-none px-6 py-4 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-emerald-100 transition-all font-sans" />
                            </div>
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Button URL</label>
                                <input type="text" value={data.festival_button_url} onChange={e => setData('festival_button_url', e.target.value)} className="w-full bg-slate-50 border-none px-6 py-4 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-emerald-100 transition-all font-sans" />
                            </div>
                        </div>
                    </div>

                    {/* Immersive Sections (Video & Districts) */}
                    <div className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-sm space-y-10">
                        <div className="flex items-center gap-4 text-slate-800">
                            <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl">
                                <Sparkles size={24} />
                            </div>
                            <h2 className="text-xl font-black tracking-tight">District & Video Promo Sections</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">District Section Title</label>
                                <input type="text" value={data.districts_title} onChange={e => setData('districts_title', e.target.value)} className="w-full bg-slate-50 border-none px-6 py-4 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-emerald-100 transition-all font-sans" />
                            </div>
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">District Section Sub-title</label>
                                <input type="text" value={data.districts_subtitle} onChange={e => setData('districts_subtitle', e.target.value)} className="w-full bg-slate-50 border-none px-6 py-4 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-emerald-100 transition-all font-sans" />
                            </div>
                            <div className="space-y-2 border-t border-slate-50 pt-8 mt-4 md:col-span-2"></div>
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Video Promo Section Title</label>
                                <input type="text" value={data.video_title} onChange={e => setData('video_title', e.target.value)} className="w-full bg-slate-50 border-none px-6 py-4 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-emerald-100 transition-all font-sans" />
                            </div>
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Video Promo Sub-title</label>
                                <input type="text" value={data.video_subtitle} onChange={e => setData('video_subtitle', e.target.value)} className="w-full bg-slate-50 border-none px-6 py-4 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-emerald-100 transition-all font-sans" />
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end gap-3 pt-4">
                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white px-16 py-6 rounded-[2.5rem] font-black text-sm uppercase tracking-[0.2em] shadow-2xl shadow-emerald-200 transition-all flex items-center gap-4 active:scale-95 disabled:opacity-50"
                        >
                            {processing ? 'Saving...' : <><Save size={20} /> Deploy Configuration</>}
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
