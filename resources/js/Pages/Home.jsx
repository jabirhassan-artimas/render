import React, { useState, useEffect, useRef } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import ProductCard from '@/Components/ProductCard';
import { Head, Link, usePage, useForm } from '@inertiajs/react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import {
    ChevronRight, ArrowRight, ShoppingBag, Star, Truck, ShieldCheck,
    ArrowLeft, Play, Zap, Award, MapPin, User, Heart, Leaf, Quote,
    Navigation, Sparkles, Gem, Gift, Mail, ArrowDown
} from 'lucide-react';


function cn(...inputs) { return inputs.filter(Boolean).join(' '); }

export default function Home(props) {
    const { sliderBanners, promoBanners, featuredProducts, categories, services, testimonials, districts, stories, campaignItems } = props;
    const { settings } = usePage().props;
    const [currentStory, setCurrentStory] = useState(0);
    const { data: newsletterData, setData: setNewsletterData, post: postNewsletter, processing: newsletterProcessing, reset: resetNewsletter, errors: newsletterErrors } = useForm({
        email: ''
    });

    // Parallax Scroll logic
    const { scrollY } = useScroll();
    const districtRef = useRef(null);
    const categoryRef = useRef(null);

    const { scrollYProgress: scrollYProgressDistricts } = useScroll({
        target: districtRef,
        offset: ["start end", "end start"]
    });

    const { scrollYProgress: scrollYProgressCategory } = useScroll({
        target: categoryRef,
        offset: ["start end", "end start"]
    });

    const mapY = useTransform(scrollYProgressDistricts, [0, 1], [-50, 50]);
    const categoryX = useTransform(scrollYProgressCategory, [0, 1], [50, -50]);

    const y1 = useTransform(scrollY, [0, 500], [0, 200]);
    const y2 = useTransform(scrollY, [0, 500], [0, -150]);
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);
    const scale = useTransform(scrollY, [0, 300], [1, 1.1]);

    const handleNewsletterSubmit = (e) => {
        e.preventDefault();
        postNewsletter(route('newsletter.subscribe'), {
            preserveScroll: true,
            onSuccess: () => resetNewsletter()
        });
    };

    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = (sliderBanners && sliderBanners.length > 0) ? sliderBanners : [
        {
            title: 'বাংলার ঐতিহ্য এখন আপনার হাতে',
            description: '৬৪ জেলার আসল পণ্য, সরাসরি আপনার দরজায়। আমাদের লোকজ সংস্কৃতির সেরা আয়োজন।',
            image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1600'
        }
    ];

    useEffect(() => {
        if (slides.length > 1) {
            const timer = setInterval(() => {
                setCurrentSlide((prev) => (prev + 1) % slides.length);
            }, 6000);
            return () => clearInterval(timer);
        }
    }, [slides]);

    return (
        <AppLayout>
            <Head title="Home | Oitijjer Bahar - Premium Heritage Craft" />

            {/* 1. 🎭 HERO SECTION - Full Screen Parallax Slider */}
            <section className="relative h-[100vh] min-h-[700px] overflow-hidden bg-dark">
                <AnimatePresence mode='wait'>
                    <motion.div
                        key={currentSlide}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                        className="absolute inset-0"
                    >
                        {/* Parallax Image Layer */}
                        <motion.div
                            style={{ y: y1, scale: scale }}
                            className="absolute inset-0 z-0"
                        >
                            <img
                                src={slides[currentSlide].image?.startsWith('http') ? slides[currentSlide].image : (slides[currentSlide].image ? `/uploads/${slides[currentSlide].image}` : 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format')}
                                className="w-full h-full object-cover opacity-60"
                                alt={slides[currentSlide].title}
                            />
                        </motion.div>

                        {/* Overlay Gradients */}
                        <div className="absolute inset-0 bg-gradient-to-r from-dark via-dark/40 to-transparent z-10" />
                        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-dark to-transparent z-10" />

                        {/* Content Layer */}
                        <div className="container mx-auto px-4 md:px-6 relative z-20 h-full flex items-center">
                            <div className="max-w-4xl">
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5, duration: 0.8 }}
                                >
                                    <span className="flex items-center gap-3 text-primary font-black uppercase tracking-[0.6em] mb-6 text-xs md:text-sm">
                                        <Sparkles size={18} /> {settings.hero_subtitle || 'ঐতিহ্যের নতুন যাত্রা'}
                                    </span>
                                    <h1 className="text-5xl md:text-9xl font-black text-white mb-8 tracking-tighter leading-[0.85] drop-shadow-2xl">
                                        {slides[currentSlide].title || 'বাংলার শ্রেষ্ঠ সংগ্রহ'}
                                    </h1>
                                    <p className="text-white/60 text-lg md:text-2xl font-medium mb-12 max-w-2xl leading-relaxed tracking-wide">
                                        {slides[currentSlide].description}
                                    </p>

                                    <div className="flex flex-col sm:flex-row items-center gap-6">
                                        <Link href={slides[currentSlide].button_url || route('shop')} className="group relative overflow-hidden bg-primary text-dark px-12 py-6 rounded-2xl font-black text-xl shadow-2xl transition-all hover:scale-105 active:scale-95 inline-block text-center w-full sm:w-auto">
                                            <span className="relative z-10 flex items-center justify-center gap-3">
                                                এখনই কিনুন <ShoppingBag size={24} />
                                            </span>
                                            <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                                        </Link>
                                        <button className="flex items-center gap-4 text-white hover:text-primary transition-colors font-black text-lg tracking-widest px-6 py-4 uppercase">
                                            <div className="w-14 h-14 rounded-full border-2 border-white/20 flex items-center justify-center group-hover:border-primary transition-all">
                                                <Play size={20} className="fill-current ml-1" />
                                            </div>
                                            আমাদের গল্প
                                        </button>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Slider Navigation */}
                <div className="absolute bottom-12 container left-1/2 -translate-x-1/2 z-30 flex items-end justify-between px-4 md:px-6">
                    <div className="flex gap-4">
                        {slides.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrentSlide(i)}
                                className={cn(
                                    "h-1.5 transition-all duration-700 rounded-full",
                                    currentSlide === i ? "w-20 bg-primary shadow-[0_0_20px_rgba(197,160,89,0.5)]" : "w-6 bg-white/20 hover:bg-white/40"
                                )}
                            />
                        ))}
                    </div>
                    <motion.div 
                         style={{ opacity: opacity }}
                         className="hidden md:flex flex-col items-center gap-4 text-white/30"
                    >
                        <span className="text-[10px] font-black uppercase tracking-[0.5em] [writing-mode:vertical-lr]">নিচে স্ক্রল করুন</span>
                        <ArrowDown size={14} className="animate-bounce" />
                    </motion.div>
                </div>
            </section>

            {/* 2. 🗺️ DISTRICT EXPLORER - Same-to-Same Screenshot Match */}
            <section ref={districtRef} className="py-24 bg-[#FCF8F1] relative overflow-hidden">
                {/* Subtle Parallax Background Map */}
                <motion.div 
                    style={{ y: mapY, opacity: 0.03 }}
                    className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none"
                >
                    <svg viewBox="0 0 100 100" className="w-[120%] h-[120%] text-dark fill-current">
                        <path d="M50 5 L60 15 L70 10 L80 20 L90 15 L85 30 L95 40 L80 45 L85 60 L70 65 L75 80 L60 85 L50 95 L40 85 L25 80 L30 65 L15 60 L20 45 L5 40 L15 30 L10 15 L20 20 L30 10 L40 15 Z" />
                    </svg>
                </motion.div>

                <div className="container mx-auto px-4 md:px-6 relative z-10">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
                        <div className="text-left w-full md:w-auto">
                            <span className="text-primary text-[7px] font-black uppercase tracking-[0.4em] mb-1 block">৬৪ জেলার ঐতিহ্য</span>
                            <h2 className="text-3xl md:text-5xl font-black text-[#1A1A1A] tracking-tighter leading-tight">
                                প্রতিটি জেলার <span className="text-primary italic">স্বতন্ত্র বৈশিষ্ট্য</span>
                            </h2>
                        </div>
                        <Link href={route('shop')} className="text-[#1A1A1A] hover:text-primary transition-colors font-black text-[9px] uppercase tracking-widest flex items-center gap-1.5 ml-auto">
                            সব দেখুন <ArrowRight size={12} />
                        </Link>
                    </div>

                    <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 md:gap-8">
                        {districts && districts.length > 0 ? districts.slice(0, 16).map((district, i) => (
                            <motion.div
                                key={district.id}
                                style={{ y: useTransform(scrollYProgressDistricts, [0, 1], [0, -20]) }}
                                className="group cursor-pointer flex flex-col items-center"
                            >
                                <div className="relative w-full aspect-square rounded-2xl overflow-hidden mb-4 shadow-minimal group-hover:shadow-luxury transition-all duration-500 bg-white border border-dark/5 p-2">
                                    <div className="w-full h-full rounded-xl overflow-hidden relative">
                                        <img
                                            src={district.image ? (district.image.startsWith('http') ? district.image : `/uploads/${district.image}`) : 'https://images.unsplash.com/photo-1582650625119-3a31f8fa2699?auto=format&fit=crop&q=80'}
                                            className="w-full h-full object-cover grayscale opacity-30 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                                            alt={district.name}
                                        />
                                    </div>
                                </div>
                                <h4 className="text-[#1A1A1A] font-black text-[11px] md:text-[13px] tracking-tight text-center group-hover:text-primary transition-colors mb-0.5 uppercase tracking-wider">{district.name}</h4>
                                <span className="text-[7px] text-dark/20 font-black uppercase tracking-widest">{district.items_count || 0} ITEMS</span>
                            </motion.div>
                        )) : [1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                            <div key={i} className="aspect-square rounded-2xl bg-dark/5 animate-pulse" />
                        ))}
                    </div>
                </div>
            </section>

            {/* 3. 🛍️ FEATURED CATEGORIES - Same-to-Same Grid Match */}
            <section ref={categoryRef} className="py-28 bg-[#FCF8F1] relative overflow-hidden border-t border-dark/5">
                <div className="container mx-auto px-4 md:px-6 relative z-10">
                    <div className="text-center mb-16">
                        <span className="text-primary text-[7px] font-black uppercase tracking-[0.4em] mb-1 block">এক্সপ্লোর</span>
                        <h2 className="text-3xl md:text-5xl font-black text-[#1A1A1A] tracking-tighter">
                            {settings.categories_title || 'Shop by Category'}
                        </h2>
                    </div>

                    <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 md:gap-10 max-w-7xl mx-auto">
                        {categories && categories.length > 0 ? categories.map((cat, i) => (
                            <motion.div
                                key={i}
                                style={{ y: useTransform(scrollYProgressCategory, [0, 1], [20, -20]) }}
                                className="group flex flex-col items-center"
                            >
                                <Link href={route('category', cat.slug)} className="block w-full aspect-square relative rounded-2xl overflow-hidden border border-dark/5 group-hover:border-primary transition-all duration-500 bg-white shadow-minimal hover:shadow-luxury p-2 mb-4">
                                    <img
                                        src={cat.image?.startsWith('http') ? cat.image : (cat.image ? `/uploads/${cat.image}` : 'https://images.unsplash.com/photo-1594489428504-5c0c480a15fd?auto=format')}
                                        className="w-full h-full object-cover grayscale opacity-30 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 rounded-xl"
                                        alt={cat.name}
                                    />
                                    <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                </Link>
                                <h4 className="font-black text-[11px] md:text-[13px] text-[#1A1A1A] group-hover:text-primary transition-colors tracking-widest uppercase text-center">{cat.name}</h4>
                            </motion.div>
                        )) : [1,2,3,4,5,6].map((i) => (
                            <div key={i} className="w-full aspect-square rounded-2xl bg-dark/5 animate-pulse" />
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. 🔥 TRENDING PRODUCTS - Premium Showcase */}
            <section className="py-32 bg-heritage-paper relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-heritage-cream/50 to-transparent" />
                <div className="container mx-auto px-4 md:px-6 relative z-10">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-10 mb-20">
                        <div className="text-center md:text-left">
                            <span className="text-primary text-[10px] font-black uppercase tracking-[0.5em] mb-3 block">সেরা পণ্যসমূহ</span>
                            <h2 className="text-4xl md:text-6xl font-black text-dark tracking-tighter">
                                {settings.featured_products_title || 'বেস্ট সেলিং পণ্যসমূহ'}
                            </h2>
                        </div>
                        <Link href={route('shop')} className="px-10 py-5 bg-dark text-primary rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-primary hover:text-dark transition-all flex items-center gap-4 shadow-2xl group">
                            সব পণ্য দেখুন <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-8">
                        {featuredProducts && featuredProducts.length > 0 ? featuredProducts.map((p) => (
                            <ProductCard key={p.id} product={p} />
                        )) : [1, 2, 3, 4, 5].map((n) => (
                            <div key={n} className="aspect-square bg-dark/5 animate-pulse rounded-2xl" />
                        ))}
                    </div>
                </div>
            </section>

            {/* 5. 📜 MADE IN BANGLADESH STORY - Editorial Layout */}
            <section className="py-24 bg-heritage-cream relative overflow-hidden">
                <div className="container mx-auto px-4 md:px-6 relative z-10">
                    <AnimatePresence mode="wait">
                        {stories && stories.length > 0 ? (
                            <motion.div
                                key={stories[currentStory].id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -30 }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24"
                            >
                                {/* Left Side: Refined Editorial Visual */}
                                <div className="lg:w-2/5 w-full relative">
                                    <motion.div 
                                        style={{ y: useTransform(scrollY, [2500, 3500], [0, -30]) }}
                                        className="rounded-3xl overflow-hidden aspect-square p-3 relative bg-white shadow-luxury border border-dark/5"
                                    >
                                        <img
                                            src={stories[currentStory].image ? (stories[currentStory].image.startsWith('http') ? stories[currentStory].image : `/uploads/${stories[currentStory].image}`) : "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80"}
                                            className="w-full h-full object-cover rounded-2xl transition-all duration-1000"
                                            alt={stories[currentStory].title}
                                        />
                                        <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-dark rounded-full flex flex-col items-center justify-center p-4 text-primary text-center shadow-3xl border-4 border-heritage-cream">
                                            <span className="font-black leading-tight text-[10px] tracking-tight uppercase">১০০% অথেনটিক</span>
                                        </div>
                                    </motion.div>
                                </div>

                                {/* Right Side: Refined Content */}
                                <div className="lg:w-3/5">
                                    <div className="flex items-center gap-3 mb-8">
                                        {stories.map((s, idx) => (
                                            <button
                                                key={s.id}
                                                onClick={() => setCurrentStory(idx)}
                                                className={cn(
                                                    "h-1 transition-all duration-500 rounded-full",
                                                    currentStory === idx ? "w-12 bg-primary" : "w-4 bg-dark/10 hover:bg-dark/30"
                                                )}
                                            />
                                        ))}
                                    </div>
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-8 h-[1px] bg-primary"></div>
                                        <span className="text-primary font-black uppercase tracking-[0.4em] block text-[10px]">
                                            {stories[currentStory].subtitle || 'বাংলাদেশে তৈরি'}
                                        </span>
                                    </div>
                                    <h2 className="text-3xl md:text-5xl font-black text-dark mb-8 tracking-tighter leading-tight">
                                        {stories[currentStory].title}
                                    </h2>
                                    <p className="text-dark/60 text-base md:text-lg font-medium mb-10 leading-relaxed max-w-2xl">
                                        {stories[currentStory].description}
                                    </p>

                                    <div className="flex items-center gap-6">
                                        <Link href={stories[currentStory].button_url || route('shop')} className="group bg-dark text-primary px-8 py-4 rounded-xl font-black text-sm flex items-center gap-2 hover:bg-primary hover:text-dark transition-all shadow-xl">
                                            {stories[currentStory].button_text || 'গল্পটি দেখুন'} <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        ) : (
                            <div className="text-center py-20 text-dark/10 font-black uppercase tracking-widest italic animate-pulse">
                                লোড হচ্ছে...
                            </div>
                        )}
                    </AnimatePresence>
                </div>
            </section>

            {/* 6. 🎉 SPECIAL COLLECTIONS - Compact Campaign */}
            <section className="py-24 bg-primary relative overflow-hidden">
                <div className="container mx-auto px-4 md:px-6 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20">
                        <motion.div 
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="lg:w-1/3 text-center lg:text-left"
                        >
                            <span className="text-dark/40 text-[10px] font-black uppercase tracking-[0.5em] mb-4 block">সীমিত অফার</span>
                            <h2 className="text-3xl md:text-5xl font-black text-dark mb-6 tracking-tighter leading-tight">
                                {settings.festival_title || 'উৎসবের সেরা আয়োজন'}
                            </h2>
                            <p className="text-dark/60 text-base font-bold mb-8 max-w-sm mx-auto lg:mx-0 leading-relaxed">
                                {settings.festival_description || 'পহেলা বৈশাখ স্পেশাল নকশী কাঁথা ও জামদানি কালেকশন এখন আমাদের স্টোরে।'}
                            </p>
                            <Link href={settings.festival_button_url || '/shop'} className="group bg-dark text-primary px-10 py-5 rounded-2xl font-black text-sm uppercase flex items-center gap-3 hover:scale-105 transition-all shadow-2xl inline-flex">
                                {settings.festival_button_text || 'কালেকশন দেখুন'} <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </motion.div>
                        
                        <div className="lg:w-2/3 grid grid-cols-2 md:grid-cols-3 gap-6 w-full">
                            {(props.campaignItems && props.campaignItems.length > 0) ? props.campaignItems.map((item, i) => (
                                <motion.div
                                    key={item.id}
                                    style={{ y: useTransform(scrollY, [3500, 4500], [0, (i + 1) * 15]) }}
                                >
                                    <Link  href={item.link || '#'} className="bg-white/80 backdrop-blur-md rounded-2xl p-4 border border-white/20 group transition-all hover:shadow-luxury hover:-translate-y-2 flex flex-col items-center text-center h-full">
                                        <div className="aspect-square rounded-xl mb-4 overflow-hidden bg-dark/5 w-full">
                                            <img 
                                                src={item.image ? (item.image.startsWith('http') ? item.image : `/uploads/${item.image}`) : 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format'} 
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                                                alt={item.title} 
                                            />
                                        </div>
                                        <h4 className="text-dark font-black text-sm mb-1 tracking-tight line-clamp-1">{item.title}</h4>
                                        <span className="text-primary font-black text-xs">{item.price}</span>
                                    </Link>
                                </motion.div>
                            )) : [1, 2, 3].map((n, i) => (
                                <div key={n} className="bg-white/20 h-48 rounded-2xl animate-pulse" />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* 7. ⭐ TESTIMONIALS - Premium Trust */}
            <section className="py-40 bg-heritage-paper relative">
                <div className="container mx-auto px-4 md:px-6 relative z-10">
                    <div className="text-center mb-20">
                        <span className="text-primary text-[10px] font-black uppercase tracking-[0.5em] mb-4 block">প্রশংসা</span>
                        <h2 className="text-4xl md:text-6xl font-black text-dark tracking-tighter leading-none mb-6">
                            {settings.testimonials_title || 'আমাদের ধন্য গ্রাহকগণ'}
                        </h2>
                        <div className="w-24 h-1 bg-primary/20 mx-auto" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            { name: 'আরিফ আহমেদ', text: 'ঐতিহ্যের বাহারের পণ্যের মান সত্যি অসাধারণ। বিশেষ করে তাদের নকশী কাঁথাগুলোর ফিনিশিং আমাকে মুগ্ধ করেছে।', role: 'সংগ্রখক' },
                            { name: 'সাদিয়া ইসলাম', text: 'খুবই সুন্দর এবং প্রিমিয়াম প্যাকেজিং। গিফট দেওয়ার জন্য সেরা একটা জায়গা। ডেলিভারিও খুব দ্রুত পেয়েছি।', role: 'ডিজাইনার' },
                            { name: 'তানভীর রহমান', text: 'বাংলার ঐতিহ্যকে এত সুন্দরভাবে উপস্থাপন করার জন্য ধন্যবাদ। তাদের কাস্টমার সার্ভিসও খুব ভালো।', role: 'উদ্যোক্তা' }
                        ].map((testi, i) => (
                            <motion.div 
                                key={i}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1, duration: 0.8 }}
                                className="bg-white p-8 rounded-2xl border border-dark/5 shadow-minimal group hover:-translate-y-1 hover:shadow-luxury transition-all duration-500 relative overflow-hidden"
                            >
                                <div className="absolute top-0 left-0 w-full h-[1px] bg-primary/0 group-hover:bg-primary transition-all duration-500" />
                                <div className="absolute top-6 right-6 text-primary/10 group-hover:text-primary/20 transition-colors">
                                    <Quote size={32} fill="currentColor" />
                                </div>
                                
                                <div className="flex gap-1 mb-5">
                                    {[1, 2, 3, 4, 5].map((s) => <Star key={s} size={12} className="fill-primary text-primary" />)}
                                </div>
                                <p className="text-dark/70 text-sm md:text-base font-medium leading-relaxed mb-8 relative z-10 italic">"{testi.text}"</p>
                                
                                <div className="flex items-center gap-3 pt-6 border-t border-dark/5">
                                    <div className="w-10 h-10 rounded-lg bg-dark text-primary flex items-center justify-center font-black text-base shadow-lg group-hover:rotate-3 transition-transform">
                                        {testi.name[0]}
                                    </div>
                                    <div>
                                        <h5 className="text-dark font-black text-sm tracking-tight">{testi.name}</h5>
                                        <span className="text-dark/40 text-[8px] font-black uppercase tracking-[0.2em]">{testi.role}</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 8. 📦 WHY CHOOSE US - Quality Promise */}
            <section className="py-24 bg-white border-y border-dark/5 relative overflow-hidden">
                <div className="container mx-auto px-4 md:px-6 relative z-10">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16">
                        {[
                            { title: 'দ্রুত ডেলিভারি', sub: 'সারা দেশে দ্রুত এবং নিরাপদ সার্ভিস', icon: <Truck size={24} /> },
                            { title: 'অথেনটিক পণ্য', sub: '১০০% খাঁটি দেশীয় ঐতিহ্যের পণ্য সম্ভার', icon: <Award size={24} /> },
                            { title: 'নিরাপদ পেমেন্ট', sub: 'ক্যাশ অন ডেলিভারি এবং গেটওয়ে পেমেন্ট', icon: <ShieldCheck size={24} /> },
                            { title: 'সহজ রিটার্ন', sub: '৭ দিনের মধ্যে বিনাশর্তে ফেরতের নিশ্চয়তা', icon: <Zap size={24} /> }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.05 }}
                                className="flex flex-col items-center text-center group"
                            >
                                <div className="w-16 h-16 rounded-2xl bg-dark text-primary flex items-center justify-center group-hover:scale-110 transition-all duration-500 mb-6 border border-dark/5 shadow-minimal">
                                    {item.icon}
                                </div>
                                <h4 className="text-dark font-black text-lg mb-2 tracking-tight">{item.title}</h4>
                                <p className="text-dark/40 font-bold text-xs leading-relaxed max-w-[200px]">{item.sub}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 9. 📩 NEWSLETTER - Premium CTA */}
            <section className="py-24 bg-white relative overflow-hidden">
                <div className="container mx-auto px-4 md:px-6 relative z-10">
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-dark rounded-3xl p-10 md:p-16 text-center mx-auto max-w-4xl shadow-luxury relative overflow-hidden"
                    >
                        <div className="max-w-2xl mx-auto relative z-10">
                            <span className="text-primary text-[10px] font-black uppercase tracking-[0.8em] mb-6 block">নিউজলেটার</span>
                            <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tighter leading-tight">
                                ঐতিহ্যের কালেকশনে <br /> সবার আগে আপনি
                            </h2>
                            <p className="text-white/40 text-sm md:text-base font-medium mb-10 tracking-widest uppercase">
                                আমাদের নতুন অফার সম্পর্কে জানতে জয়েন করুন।
                            </p>
                            <form className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto" onSubmit={handleNewsletterSubmit}>
                                <input
                                    type="email"
                                    required
                                    value={newsletterData.email}
                                    onChange={e => setNewsletterData('email', e.target.value)}
                                    placeholder="আপনার ইমেইল অ্যাড্রেস..."
                                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-bold text-sm"
                                />
                                <button
                                    type="submit"
                                    disabled={newsletterProcessing}
                                    className="bg-primary text-dark px-10 py-4 rounded-xl font-black text-sm uppercase shadow-lg hover:scale-105 transition-all disabled:opacity-50"
                                >
                                    {newsletterProcessing ? '...' : 'সাবস্ক্রাইব'}
                                </button>
                            </form>
                        </div>
                    </motion.div>
                </div>
            </section>
        </AppLayout >
    );
}
