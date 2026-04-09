import React, { useRef } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { Head, Link } from '@inertiajs/react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { ArrowRight, MapPin, Truck, Box, Users, Heart } from 'lucide-react';

export default function About(props) {
    const { stories, services } = props;
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <AppLayout>
            <Head title="আমাদের কথা - ঐতিহ্যের বাহার" />
            
            <div ref={containerRef} className="bg-white overflow-hidden">
                
                {/* 1. HERO INTRO - The Map of Heritage */}
                <section className="relative h-screen flex items-center justify-center overflow-hidden bg-heritage-paper">
                    {/* Animated Map Background */}
                    <motion.div 
                        style={{ 
                            scale: useTransform(smoothProgress, [0, 0.2], [1, 1.2]),
                            opacity: useTransform(smoothProgress, [0, 0.2], [0.3, 0]),
                            rotate: useTransform(smoothProgress, [0, 0.2], [0, 5])
                        }}
                        className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none"
                    >
                        <svg viewBox="0 0 800 1000" className="w-[80%] h-auto opacity-10 fill-dark">
                            <path d="M400,100 C450,150 500,120 550,180 C600,240 580,300 620,350 C660,400 700,450 680,550 C660,650 620,700 580,750 C540,800 500,850 450,900 C400,950 350,900 300,850 C250,800 210,750 170,700 C130,650 90,600 70,550 C50,450 90,400 130,350 C170,300 150,240 200,180 C250,120 300,150 350,100 Z" />
                            {/* Representative Dots for 64 Districts */}
                            {[...Array(64)].map((_, i) => (
                                <circle 
                                    key={i} 
                                    cx={200 + Math.random() * 400} 
                                    cy={200 + Math.random() * 600} 
                                    r="4" 
                                    className="fill-primary"
                                >
                                    <animate attributeName="opacity" values="0;1;0" dur={`${2 + Math.random() * 3}s`} repeatCount="indefinite" />
                                </circle>
                            ))}
                        </svg>
                    </motion.div>

                    <div className="container mx-auto px-4 relative z-10 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, ease: "easeOut" }}
                        >
                            <span className="text-primary text-xs font-black uppercase tracking-[0.8em] mb-8 block">ঐতিহ্যের গল্প</span>
                            <h1 className="text-5xl md:text-8xl font-black text-dark tracking-tighter leading-none mb-10">
                                Discover the <br /> 
                                <span className="text-primary italic">Heritage</span> of Bangladesh
                            </h1>
                            <p className="max-w-2xl mx-auto text-dark/50 text-xl font-bold leading-relaxed">
                                We bring authentic products from all 64 districts <br /> 
                                of Bangladesh right to your doorstep.
                            </p>
                        </motion.div>
                        
                        <motion.div 
                            style={{ y: useTransform(smoothProgress, [0, 0.1], [0, 100]) }}
                            className="mt-20 inline-flex flex-col items-center gap-4 text-dark/20"
                        >
                            <span className="text-[10px] font-black uppercase tracking-widest">Scroll to Journey</span>
                            <div className="w-px h-20 bg-gradient-to-b from-dark/20 to-transparent" />
                        </motion.div>
                    </div>
                </section>

                {/* 2. STORY SCROLL - The District Journey (Dynamic from CMS) */}
                <section className="py-24 relative bg-white">
                    <div className="container mx-auto px-4">
                        <div className="space-y-40">
                            {stories && stories.length > 0 ? stories.map((item, i) => (
                                <DistrictStory 
                                    key={i} 
                                    item={{
                                        district: item.subtitle, 
                                        product: item.title, 
                                        story: item.description,
                                        img: item.image ? (item.image.startsWith('http') ? item.image : `/uploads/${item.image}`) : 'https://images.unsplash.com/photo-1553135041-998870104e13?auto=format&fit=crop&q=80',
                                        side: i % 2 === 0 ? 'left' : 'right'
                                    }} 
                                    index={i} 
                                />
                            )) : (
                                <div className="text-center py-20 text-dark/20 font-black uppercase tracking-widest text-sm">
                                    No stories found in CMS
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                {/* 3. SUPPLY CHAIN VISUAL - Trust & Care */}
                <section className="py-40 bg-dark text-white relative overflow-hidden">
                    <div className="container mx-auto px-4 text-center">
                        <span className="text-primary text-[10px] font-black uppercase tracking-[0.6em] mb-10 block">সাপ্লাই চেইন</span>
                        <h2 className="text-4xl md:text-6xl font-black mb-24 tracking-tighter">From Local Farms to Your Home</h2>
                        
                        <div className="relative h-64 flex items-center justify-between max-w-5xl mx-auto">
                            {/* Connecting Line */}
                            <div className="absolute top-1/2 left-0 w-full h-px bg-white/10 -translate-y-1/2 overflow-hidden">
                                <motion.div 
                                    style={{ scaleX: smoothProgress }}
                                    className="w-full h-full bg-primary origin-left"
                                />
                            </div>

                            {[
                                { icon: <Users size={32} />, label: 'কৃষক থেকে সরাসরি' },
                                { icon: <Box size={32} />, label: 'নিখুঁত প্যাকেজিং' },
                                { icon: <Truck size={32} />, label: 'দ্রুত ডেলিভারি' },
                                { icon: <Heart size={32} />, label: 'আপনার হাতের স্বাদ' }
                            ].map((step, i) => (
                                <motion.div 
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.2 }}
                                    className="relative z-10 flex flex-col items-center group"
                                >
                                    <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-dark transition-all duration-500 mb-6 shadow-2xl">
                                        {step.icon}
                                    </div>
                                    <span className="font-bold text-xs uppercase tracking-widest text-white/40 group-hover:text-white transition-colors">{step.label}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 4. BRAND HERITAGE SECTION - Cultural Texture */}
                <section className="py-60 relative overflow-hidden">
                    {/* Cultural Texture Background */}
                    <div className="absolute inset-0 z-0 opacity-5 pointer-events-none grayscale">
                        <div className="w-full h-full bg-[url('https://www.transparenttextures.com/patterns/jute.png')] repeat" />
                    </div>

                    <div className="container mx-auto px-4 relative z-10">
                        <div className="max-w-4xl mx-auto text-center">
                            <motion.h3 
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1 }}
                                className="text-3xl md:text-5xl font-black text-dark leading-tight tracking-tight mb-20"
                            >
                                "ঐতিহ্যের বাহার is not just a store, it's a bridge between <span className="text-primary italic underline decoration-primary/30 underline-offset-8">tradition</span> and modern life."
                            </motion.h3>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
                                {services && services.length > 0 ? services.map((box, i) => (
                                    <motion.div 
                                        key={i}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.1 }}
                                        className="p-8 rounded-2xl bg-heritage-paper/50 border border-dark/5 hover:border-primary/20 transition-all text-left group"
                                    >
                                        <h4 className="font-black text-primary text-base mb-3">{box.title}</h4>
                                        <p className="text-dark/40 font-bold text-xs leading-relaxed">{box.description}</p>
                                    </motion.div>
                                )) : (
                                    [1, 2, 3].map(i => (
                                        <div key={i} className="h-40 bg-dark/5 rounded-2xl animate-pulse" />
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </section>

                {/* 5. FINAL CTA - Smolled & Professional */}
                <section className="py-24 bg-white relative overflow-hidden">
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="container mx-auto px-4 text-center"
                    >
                        <div className="max-w-5xl mx-auto bg-dark rounded-[2.5rem] p-12 md:p-20 relative overflow-hidden group shadow-3xl">
                            <motion.div 
                                style={{ 
                                    scale: useTransform(smoothProgress, [0.8, 1], [1, 1.2]),
                                    opacity: useTransform(smoothProgress, [0.8, 1], [0.1, 0.2])
                                }}
                                className="absolute inset-0 bg-primary opacity-10 blur-3xl rounded-full"
                            />
                            
                            <div className="relative z-10">
                                <span className="text-primary text-[8px] font-black uppercase tracking-[0.8em] mb-6 block">যাত্রা শুরু করুন</span>
                                <h2 className="text-3xl md:text-5xl font-black text-white mb-10 tracking-tighter leading-tight">
                                    Experience Bangladesh <br /> Like Never Before
                                </h2>
                                <Link 
                                    href={route('shop')} 
                                    className="inline-flex items-center gap-4 px-10 py-5 bg-primary text-dark rounded-xl font-black text-[11px] uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-luxury"
                                >
                                    Browse Collections <ArrowRight size={18} />
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                </section>

            </div>
        </AppLayout>
    );
}

function DistrictStory({ item, index }) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const yImg = useTransform(scrollYProgress, [0, 1], [-100, 100]);
    const yText = useTransform(scrollYProgress, [0, 1], [50, -50]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

    return (
        <motion.div 
            ref={ref}
            style={{ opacity }}
            className={`flex flex-col md:flex-row items-center gap-12 lg:gap-20 ${item.side === 'right' ? 'md:flex-row-reverse' : ''}`}
        >
            {/* Image Container with Parallax Layering */}
            <div className="w-full md:w-5/12 relative">
                <div className="aspect-[1/1] rounded-2xl overflow-hidden shadow-2xl relative z-10 border-4 border-white">
                    <motion.img 
                        style={{ y: yImg, scale: 1.15 }}
                        src={item.img} 
                        alt={item.product}
                        className="w-full h-full object-cover"
                    />
                </div>
                {/* Background Decor Layer */}
                <motion.div 
                    style={{ y: useTransform(scrollYProgress, [0, 1], [30, -30]) }}
                    className="absolute -top-6 -left-6 w-full h-full bg-heritage-cream/50 rounded-2xl -z-10"
                />
            </div>

            {/* Content Layer */}
            <motion.div style={{ y: yText }} className="w-full md:w-6/12">
                <div className="flex items-center gap-2 text-primary mb-4">
                    <MapPin size={14} />
                    <span className="font-black text-[10px] uppercase tracking-[0.2em]">{item.district}</span>
                </div>
                <h3 className="text-3xl md:text-5xl font-black text-dark tracking-tighter mb-6 leading-tight">
                    {item.product}
                </h3>
                <p className="text-dark/50 text-base md:text-lg font-medium leading-relaxed mb-8">
                    {item.story}
                </p>
                <Link 
                    href={route('shop')}
                    className="inline-flex items-center gap-2 font-black text-dark text-[10px] uppercase tracking-widest group"
                >
                    কালেকশন দেখুন 
                    <ArrowRight size={14} className="text-primary group-hover:translate-x-1 transition-transform" />
                </Link>
            </motion.div>
        </motion.div>
    );
}
