import React, { useState, useRef, useEffect } from 'react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { Mail, Lock, ArrowRight, Loader2, Eye, EyeOff, User, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const G = '#D4AF37';
const DG = '#1B5E20';

function Spark({ x, y, delay }) {
    return (
        <motion.div
            className="absolute rounded-full pointer-events-none"
            style={{ left: `${x}%`, top: `${y}%`, width: 3, height: 3, background: G }}
            animate={{ y: [0, -55, -110], opacity: [0, 1, 0], scale: [0.5, 1.4, 0] }}
            transition={{ duration: 2.5 + Math.random() * 2, delay, repeat: Infinity, repeatDelay: Math.random() * 5, ease: 'easeOut' }}
        />
    );
}

const SPARKS = Array.from({ length: 18 }, (_, i) => ({
    x: 5 + Math.random() * 90,
    y: 20 + Math.random() * 70,
    delay: i * 0.4,
}));

export default function Register() {
    const { settings } = usePage().props;
    const [showPassword, setShowPassword] = useState(false);
    const [focusedField, setFocusedField] = useState(null);
    const [videoLoaded, setVideoLoaded] = useState(false);
    const videoRef = useRef(null);

    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.playbackRate = 0.75;
        }
    }, []);

    const handleSubmit = (e) => { e.preventDefault(); post(route('register')); };

    const stagger = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.09, delayChildren: 0.45 } },
    };
    const slideUp = {
        hidden: { opacity: 0, y: 28 },
        visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 260, damping: 22 } },
    };

    const inputWrap = (field) => ({
        display: 'flex', alignItems: 'center',
        borderRadius: 14, overflow: 'hidden',
        background: focusedField === field ? 'rgba(255,255,255,0.18)' : 'rgba(255,255,255,0.08)',
        border: focusedField === field ? `1.5px solid rgba(212,175,55,0.7)` : '1.5px solid rgba(255,255,255,0.12)',
        boxShadow: focusedField === field
            ? `0 0 0 4px rgba(212,175,55,0.12), inset 0 1px 0 rgba(255,255,255,0.12)`
            : 'inset 0 1px 0 rgba(255,255,255,0.06)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        transition: 'all 0.3s ease',
    });

    const inputStyle = {
        flex: 1, background: 'transparent', border: 'none', outline: 'none',
        padding: '12px 12px 12px 0', fontSize: 13, color: '#fff', caretColor: G,
    };

    const labelStyle = (field) => ({
        display: 'block', fontSize: 10, fontWeight: 700,
        textTransform: 'uppercase', letterSpacing: '0.24em', marginBottom: 6,
        color: focusedField === field ? G : 'rgba(255,255,255,0.35)',
    });

    const iconStyle = (field) => ({
        paddingLeft: 13, paddingRight: 9,
        color: focusedField === field ? G : 'rgba(255,255,255,0.28)',
        display: 'flex', alignItems: 'center',
    });

    return (
        <div className="min-h-screen relative overflow-hidden" style={{ fontFamily: "'Inter', 'Noto Sans Bengali', sans-serif" }}>
            <Head title="নিবন্ধন — ঐতিহ্যের বাহার" />

            {/* ══ Fullscreen Video ══ */}
            <motion.div
                className="absolute inset-0 z-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: videoLoaded ? 1 : 0 }}
                transition={{ duration: 1.5 }}
            >
                <video
                    ref={videoRef}
                    autoPlay muted loop playsInline
                    onCanPlay={() => setVideoLoaded(true)}
                    className="absolute inset-0 w-full h-full object-cover"
                    src="/0_Diwali_Indian_Festival_1080x1080.mp4"
                />
            </motion.div>

            {/* Fallback */}
            <AnimatePresence>
                {!videoLoaded && (
                    <motion.div exit={{ opacity: 0 }} transition={{ duration: 1.2 }}
                        className="absolute inset-0 z-0"
                        style={{ background: 'linear-gradient(135deg, #0a1a0d 0%, #1B5E20 40%, #4A3000 80%, #1a0a00 100%)' }} />
                )}
            </AnimatePresence>

            {/* ══ Overlays ══ */}
            <div className="absolute inset-0 z-10 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.75) 100%)' }} />
            <div className="absolute inset-0 z-10 pointer-events-none"
                style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0.88) 100%)' }} />
            <motion.div
                className="absolute bottom-0 left-0 right-0 h-1/3 z-10 pointer-events-none"
                animate={{ opacity: [0.3, 0.55, 0.3] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                style={{ background: 'linear-gradient(to top, rgba(212,175,55,0.12), transparent)' }} />

            {/* Rising sparks */}
            <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
                {SPARKS.map((s, i) => <Spark key={i} {...s} />)}
            </div>

            {/* ══ Layout ══ */}
            <div className="relative z-20 min-h-screen flex flex-col lg:flex-row">

                {/* ── Left brand panel ── */}
                <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1.2, delay: 0.3, ease: 'circOut' }}
                    className="hidden lg:flex flex-col justify-between p-12 lg:w-[48%]"
                >
                    {/* Logo row */}
                    <div className="flex items-center gap-4">
                        <motion.div
                            animate={{ rotate: [0, 5, -5, 0] }}
                            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                            className="w-14 h-14 rounded-2xl flex items-center justify-center border-2 shadow-2xl"
                            style={{ borderColor: `${G}55`, background: 'rgba(212,175,55,0.12)', backdropFilter: 'blur(16px)' }}
                        >
                            {settings?.site_logo ? (
                                <img src={`/uploads/${settings.site_logo}`} className="w-9 h-9 object-contain" alt="Logo" />
                            ) : (
                                <span className="font-black text-2xl" style={{ color: G }}>
                                    {settings?.site_title?.charAt(0) || 'ঐ'}
                                </span>
                            )}
                        </motion.div>
                        <div>
                            <p className="font-black text-xl leading-tight text-white">
                                {settings?.site_title || 'ঐতিহ্যের বাহার'}
                            </p>
                            <p className="text-[10px] font-bold uppercase tracking-[0.35em]" style={{ color: `${G}99` }}>
                                Heritage Boutique
                            </p>
                        </div>
                    </div>

                    {/* Main headline */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.7 }}
                    >
                        <motion.div
                            className="inline-block mb-6 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.4em]"
                            style={{ background: 'rgba(212,175,55,0.1)', border: `1px solid ${G}35`, color: G }}
                            animate={{ opacity: [0.7, 1, 0.7] }}
                            transition={{ duration: 3, repeat: Infinity }}
                        >
                            নতুন যাত্রা শুরু করুন
                        </motion.div>

                        <h1 className="text-5xl xl:text-6xl font-black text-white leading-[1.08] tracking-tight mb-6"
                            style={{ textShadow: '0 4px 32px rgba(0,0,0,0.5)' }}>
                            আমাদের{' '}
                            <span style={{
                                background: `linear-gradient(135deg, ${G}, #f0d060, ${G})`,
                                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                            }}>পরিবারে</span>
                            <br />যোগ দিন
                        </h1>

                        <p className="text-base font-medium max-w-md" style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.75 }}>
                            বাংলার ৬৪ জেলার হস্তশিল্পীদের তৈরি অনন্য পণ্য আবিষ্কার করুন। আপনার প্রথম কেনাকাটায় বিশেষ ছাড় পান।
                        </p>

                        {/* Benefits */}
                        <div className="flex flex-col gap-4 mt-10">
                            {[
                                { icon: '🎁', text: 'প্রথম অর্ডারে ১৫% ছাড়' },
                                { icon: '🚚', text: 'বিনামূল্যে হোম ডেলিভারি' },
                                { icon: '🏺', text: 'খাঁটি হস্তশিল্প পণ্যের গ্যারান্টি' },
                            ].map((b, i) => (
                                <motion.div key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 1.1 + i * 0.15 }}
                                    className="flex items-center gap-3"
                                >
                                    <span className="text-xl">{b.icon}</span>
                                    <span className="text-sm font-medium" style={{ color: 'rgba(255,255,255,0.65)' }}>{b.text}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Bottom */}
                    <motion.p className="text-sm italic max-w-xs" style={{ color: 'rgba(255,255,255,0.28)' }}
                        animate={{ opacity: [0.28, 0.55, 0.28] }} transition={{ duration: 5, repeat: Infinity }}>
                        "বাংলার মাটির গন্ধ, শিল্পীর হাতের ছোঁয়া।"
                    </motion.p>
                </motion.div>

                {/* ── Register Form / Right ── */}
                <div className="flex-1 flex items-center justify-center p-6 md:p-8 lg:p-10 overflow-y-auto">
                    <motion.div
                        variants={stagger}
                        initial="hidden"
                        animate="visible"
                        className="w-full max-w-[420px] py-4"
                    >
                        {/* Mobile brand */}
                        <motion.div variants={slideUp} className="flex lg:hidden items-center gap-3 mb-8 justify-center">
                            <div className="w-11 h-11 rounded-xl flex items-center justify-center border-2"
                                style={{ borderColor: `${G}55`, background: 'rgba(212,175,55,0.12)', backdropFilter: 'blur(16px)' }}>
                                {settings?.site_logo
                                    ? <img src={`/uploads/${settings.site_logo}`} className="w-7 h-7 object-contain" alt="" />
                                    : <span className="font-black text-lg" style={{ color: G }}>{settings?.site_title?.charAt(0) || 'ঐ'}</span>
                                }
                            </div>
                            <span className="font-black text-xl text-white">{settings?.site_title || 'ঐতিহ্যের বাহার'}</span>
                        </motion.div>

                        {/* Glass card */}
                        <motion.div
                            variants={slideUp}
                            className="rounded-3xl p-7 relative overflow-hidden"
                            style={{
                                background: 'rgba(10, 20, 12, 0.68)',
                                backdropFilter: 'blur(32px)', WebkitBackdropFilter: 'blur(32px)',
                                border: '1px solid rgba(255,255,255,0.09)',
                                boxShadow: `0 32px 80px rgba(0,0,0,0.55), 0 0 0 1px rgba(212,175,55,0.1), inset 0 1px 0 rgba(255,255,255,0.07)`,
                            }}
                        >
                            {/* Ambient glows */}
                            <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full pointer-events-none"
                                style={{ background: 'radial-gradient(circle, rgba(212,175,55,0.14), transparent 70%)' }} />
                            <div className="absolute -bottom-12 -left-12 w-32 h-32 rounded-full pointer-events-none"
                                style={{ background: 'radial-gradient(circle, rgba(27,94,32,0.18), transparent 70%)' }} />

                            {/* Heading */}
                            <motion.div variants={slideUp} className="mb-6 relative z-10">
                                <h2 className="text-2xl font-black text-white mb-1.5 tracking-tight">
                                    অ্যাকাউন্ট তৈরি করুন 🌸
                                </h2>
                                <p className="text-sm" style={{ color: 'rgba(255,255,255,0.38)' }}>
                                    আমাদের ঐতিহ্যবাহী কমিউনিটিতে যোগ দিন।
                                </p>
                            </motion.div>

                            <form onSubmit={handleSubmit} className="space-y-4 relative z-10">

                                {/* Name + Email — 2 cols */}
                                <motion.div variants={slideUp} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {/* Name */}
                                    <div className="space-y-1.5">
                                        <label style={labelStyle('name')}>আপনার নাম</label>
                                        <div style={inputWrap('name')}>
                                            <div style={iconStyle('name')}><User size={15} strokeWidth={2} /></div>
                                            <input type="text" required value={data.name}
                                                onChange={(e) => setData('name', e.target.value)}
                                                onFocus={() => setFocusedField('name')}
                                                onBlur={() => setFocusedField(null)}
                                                placeholder="আপনার নাম"
                                                style={inputStyle} />
                                        </div>
                                        <AnimatePresence>{errors.name && (
                                            <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                                                style={{ fontSize: 11, fontWeight: 700, color: '#ff6b6b' }}>
                                                {errors.name}
                                            </motion.p>
                                        )}</AnimatePresence>
                                    </div>

                                    {/* Email */}
                                    <div className="space-y-1.5">
                                        <label style={labelStyle('email')}>ইমেইল</label>
                                        <div style={inputWrap('email')}>
                                            <div style={iconStyle('email')}><Mail size={15} strokeWidth={2} /></div>
                                            <input type="email" required value={data.email}
                                                onChange={(e) => setData('email', e.target.value)}
                                                onFocus={() => setFocusedField('email')}
                                                onBlur={() => setFocusedField(null)}
                                                placeholder="email@example.com"
                                                style={inputStyle} />
                                        </div>
                                        <AnimatePresence>{errors.email && (
                                            <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                                                style={{ fontSize: 11, fontWeight: 700, color: '#ff6b6b' }}>
                                                {errors.email}
                                            </motion.p>
                                        )}</AnimatePresence>
                                    </div>
                                </motion.div>

                                {/* Password */}
                                <motion.div variants={slideUp} className="space-y-1.5">
                                    <label style={labelStyle('password')}>পাসওয়ার্ড</label>
                                    <div style={inputWrap('password')}>
                                        <div style={iconStyle('password')}><Lock size={15} strokeWidth={2} /></div>
                                        <input type={showPassword ? 'text' : 'password'} required value={data.password}
                                            onChange={(e) => setData('password', e.target.value)}
                                            onFocus={() => setFocusedField('password')}
                                            onBlur={() => setFocusedField(null)}
                                            placeholder="••••••••"
                                            style={{ ...inputStyle, letterSpacing: '0.1em' }} />
                                        <button type="button" onClick={() => setShowPassword(!showPassword)}
                                            style={{ paddingRight: 12, paddingLeft: 6, color: 'rgba(255,255,255,0.28)', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                                            {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                                        </button>
                                    </div>
                                    <AnimatePresence>{errors.password && (
                                        <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                                            style={{ fontSize: 11, fontWeight: 700, color: '#ff6b6b' }}>
                                            {errors.password}
                                        </motion.p>
                                    )}</AnimatePresence>
                                </motion.div>

                                {/* Confirm Password */}
                                <motion.div variants={slideUp} className="space-y-1.5">
                                    <label style={labelStyle('confirm')}>পাসওয়ার্ড নিশ্চিত করুন</label>
                                    <div style={inputWrap('confirm')}>
                                        <div style={iconStyle('confirm')}><Shield size={15} strokeWidth={2} /></div>
                                        <input type={showPassword ? 'text' : 'password'} required value={data.password_confirmation}
                                            onChange={(e) => setData('password_confirmation', e.target.value)}
                                            onFocus={() => setFocusedField('confirm')}
                                            onBlur={() => setFocusedField(null)}
                                            placeholder="••••••••"
                                            style={{ ...inputStyle, letterSpacing: '0.1em' }} />
                                    </div>
                                    <AnimatePresence>{errors.password_confirmation && (
                                        <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                                            style={{ fontSize: 11, fontWeight: 700, color: '#ff6b6b' }}>
                                            {errors.password_confirmation}
                                        </motion.p>
                                    )}</AnimatePresence>
                                </motion.div>

                                {/* Terms notice */}
                                <motion.p variants={slideUp} style={{ fontSize: 11, color: 'rgba(255,255,255,0.28)', lineHeight: 1.6 }}>
                                    নিবন্ধন করে আপনি আমাদের{' '}
                                    <Link href={route('page.show', 'terms-of-service')} style={{ color: `${G}cc`, textDecoration: 'none', fontWeight: 700 }}>
                                        শর্তাবলী
                                    </Link>{' '}এবং{' '}
                                    <Link href={route('page.show', 'privacy-policy')} style={{ color: `${G}cc`, textDecoration: 'none', fontWeight: 700 }}>
                                        গোপনীয়তা নীতি
                                    </Link>{' '}
                                    মেনে নিচ্ছেন।
                                </motion.p>

                                {/* CTA */}
                                <motion.div variants={slideUp} className="pt-1">
                                    <motion.button
                                        type="submit" disabled={processing}
                                        whileHover={{ scale: 1.03, boxShadow: `0 20px 50px rgba(212,175,55,0.42)` }}
                                        whileTap={{ scale: 0.97 }}
                                        className="w-full flex items-center justify-center gap-3 relative overflow-hidden"
                                        style={{
                                            borderRadius: 15, padding: '14px 20px',
                                            background: `linear-gradient(135deg, ${G} 0%, #c9962a 50%, #e8c04a 100%)`,
                                            color: '#0a1a0d', fontWeight: 800, fontSize: 13,
                                            letterSpacing: '0.28em', textTransform: 'uppercase',
                                            border: 'none', cursor: processing ? 'wait' : 'pointer',
                                            boxShadow: `0 8px 32px rgba(212,175,55,0.32)`,
                                        }}
                                    >
                                        {/* Shine sweep */}
                                        <motion.div className="absolute inset-0 pointer-events-none"
                                            style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)' }}
                                            animate={{ x: ['-120%', '220%'] }}
                                            transition={{ duration: 2, repeat: Infinity, repeatDelay: 4, ease: 'easeInOut' }} />
                                        {processing ? <Loader2 size={18} className="animate-spin" /> : (
                                            <>
                                                <span className="relative z-10">নিবন্ধন করুন</span>
                                                <ArrowRight size={17} className="relative z-10" />
                                            </>
                                        )}
                                    </motion.button>
                                </motion.div>
                            </form>

                            {/* Divider */}
                            <div className="flex items-center gap-3 my-5 relative z-10">
                                <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.09)' }} />
                                <span style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.22)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>অথবা</span>
                                <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.09)' }} />
                            </div>

                            {/* Social */}
                            <div className="grid grid-cols-2 gap-3 mb-5 relative z-10">
                                <motion.button
                                    whileHover={{ scale: 1.04, background: 'rgba(255,255,255,0.18)' }}
                                    whileTap={{ scale: 0.96 }}
                                    className="flex items-center justify-center gap-2 py-3 font-bold text-xs uppercase tracking-wider text-white"
                                    style={{ borderRadius: 13, background: 'rgba(255,255,255,0.09)', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)', cursor: 'pointer' }}
                                >
                                    <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0">
                                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
                                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                    </svg>
                                    Google
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                                    className="flex items-center justify-center gap-2 py-3 font-bold text-xs uppercase tracking-wider text-white"
                                    style={{ borderRadius: 13, background: '#1877F2', border: 'none', cursor: 'pointer', boxShadow: '0 4px 16px rgba(24,119,242,0.28)' }}
                                >
                                    <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0" fill="currentColor">
                                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                    </svg>
                                    Facebook
                                </motion.button>
                            </div>

                            {/* Login link */}
                            <p className="text-center relative z-10" style={{ fontSize: 13, color: 'rgba(255,255,255,0.32)' }}>
                                ইতোমধ্যে অ্যাকাউন্ট আছে?{' '}
                                <Link href={route('login')} style={{ color: G, fontWeight: 800, textDecoration: 'none' }}>
                                    লগইন করুন →
                                </Link>
                            </p>
                        </motion.div>

                        <motion.p variants={slideUp} className="text-center mt-5"
                            style={{ fontSize: 10, color: 'rgba(255,255,255,0.18)', textTransform: 'uppercase', letterSpacing: '0.22em' }}>
                            © {new Date().getFullYear()} · ঐতিহ্যের বাহার · সকল অধিকার সংরক্ষিত
                        </motion.p>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
