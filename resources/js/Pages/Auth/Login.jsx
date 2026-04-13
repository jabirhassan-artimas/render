import React, { useState, useRef, useEffect } from 'react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { Mail, Lock, ArrowRight, Loader2, Eye, EyeOff, Hand } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const G = '#D4AF37';
const DG = '#1B5E20';

// Floating particle for extra atmosphere
function Spark({ x, y, delay }) {
    return (
        <motion.div
            className="absolute rounded-full pointer-events-none"
            style={{ left: `${x}%`, top: `${y}%`, width: 3, height: 3, background: G }}
            animate={{ y: [0, -60, -120], opacity: [0, 1, 0], scale: [0.5, 1.5, 0] }}
            transition={{ duration: 2.5 + Math.random() * 2, delay, repeat: Infinity, repeatDelay: Math.random() * 5, ease: 'easeOut' }}
        />
    );
}

const SPARKS = Array.from({ length: 18 }, (_, i) => ({
    x: 5 + Math.random() * 90,
    y: 20 + Math.random() * 70,
    delay: i * 0.4,
}));

export default function Login() {
    const { settings } = usePage().props;
    const [showPassword, setShowPassword] = useState(false);
    const [focusedField, setFocusedField] = useState(null);
    const [videoLoaded, setVideoLoaded] = useState(false);
    const videoRef = useRef(null);

    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.playbackRate = 0.75; // Slightly slow for cinematic feel
        }
    }, []);

    const handleSubmit = (e) => { e.preventDefault(); post(route('login')); };

    const stagger = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.5 } },
    };
    const slideUp = {
        hidden: { opacity: 0, y: 32 },
        visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 260, damping: 22 } },
    };

    const inputWrap = (field) => ({
        display: 'flex', alignItems: 'center',
        borderRadius: 16, overflow: 'hidden',
        background: focusedField === field ? 'rgba(255,255,255,0.18)' : 'rgba(255,255,255,0.1)',
        border: focusedField === field ? `1.5px solid rgba(212,175,55,0.7)` : '1.5px solid rgba(255,255,255,0.15)',
        boxShadow: focusedField === field ? `0 0 0 4px rgba(212,175,55,0.12), inset 0 1px 0 rgba(255,255,255,0.15)` : 'inset 0 1px 0 rgba(255,255,255,0.08)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        transition: 'all 0.3s ease',
    });

    return (
        <div className="min-h-screen relative overflow-hidden" style={{ fontFamily: "'Inter', 'Noto Sans Bengali', sans-serif" }}>
            <Head title="লগইন — ঐতিহ্যের বাহার" />

            {/* ══════════════════════════════════════════
                FULLSCREEN VIDEO BACKGROUND
            ══════════════════════════════════════════ */}
            <motion.div
                className="absolute inset-0 z-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: videoLoaded ? 1 : 0 }}
                transition={{ duration: 1.5 }}
            >
                <video
                    ref={videoRef}
                    autoPlay
                    muted
                    loop
                    playsInline
                    onCanPlay={() => setVideoLoaded(true)}
                    className="absolute inset-0 w-full h-full object-cover"
                    src="/0_Diwali_Indian_Festival_1080x1080.mp4"
                />
            </motion.div>

            {/* Fallback gradient while video loads */}
            <AnimatePresence>
                {!videoLoaded && (
                    <motion.div
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.2 }}
                        className="absolute inset-0 z-0"
                        style={{ background: 'linear-gradient(135deg, #0a1a0d 0%, #1B5E20 40%, #4A3000 80%, #1a0a00 100%)' }}
                    />
                )}
            </AnimatePresence>

            {/* ══════════════════════════════════════════
                LAYERED OVERLAYS for depth & readability
            ══════════════════════════════════════════ */}
            {/* Base dark vignette */}
            <div className="absolute inset-0 z-10 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.72) 100%)' }} />

            {/* Bottom gradient for form area */}
            <div className="absolute inset-0 z-10 pointer-events-none"
                style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.65) 50%, rgba(0,0,0,0.85) 100%)' }} />

            {/* Gold ambient glow from bottom */}
            <motion.div
                className="absolute bottom-0 left-0 right-0 h-1/3 z-10 pointer-events-none"
                animate={{ opacity: [0.3, 0.55, 0.3] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                style={{ background: 'linear-gradient(to top, rgba(212,175,55,0.12), transparent)' }}
            />

            {/* Rising sparks overlay */}
            <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
                {SPARKS.map((s, i) => <Spark key={i} {...s} />)}
            </div>

            {/* ══════════════════════════════════════════
                MAIN LAYOUT — Brand left / Form right
            ══════════════════════════════════════════ */}
            <div className="relative z-20 min-h-screen flex flex-col lg:flex-row">

                {/* ── Brand / Left column ── */}
                <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1.2, delay: 0.3, ease: 'circOut' }}
                    className="hidden lg:flex flex-col justify-between p-12 lg:w-1/2 xl:w-[55%]"
                >
                    {/* Logo + Name */}
                    <div className="flex items-center gap-3">
                        {/* Logo — fully transparent, no box */}
                        {settings?.site_logo ? (
                            <img
                                src={`/uploads/${settings.site_logo}`}
                                className="h-14 w-auto object-contain drop-shadow-2xl"
                                alt="Logo"
                            />
                        ) : (
                            <span className="font-black text-4xl drop-shadow-2xl" style={{ color: G }}>
                                {settings?.site_title?.charAt(0) || 'ঐ'}
                            </span>
                        )}
                        <div>
                            <p className="font-black text-2xl leading-tight text-white drop-shadow-md">
                                {settings?.site_title || 'ঐতিহ্যের বাহার'}
                            </p>
                            <p className="text-[10px] font-bold uppercase tracking-[0.38em]" style={{ color: `${G}bb` }}>
                                Heritage Boutique
                            </p>
                            <p className="text-[11px] font-medium mt-0.5" style={{ color: 'rgba(255,255,255,0.45)' }}>
                                বাংলার ৬৪ জেলার নির্বাচিত হস্তশিল্প
                            </p>
                        </div>
                    </div>

                    {/* Center hero text */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.7 }}
                    >
                        <motion.div
                            className="inline-block mb-6 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.4em]"
                            style={{ background: 'rgba(212,175,55,0.12)', border: `1px solid ${G}40`, color: G }}
                            animate={{ opacity: [0.7, 1, 0.7] }}
                            transition={{ duration: 3, repeat: Infinity }}
                        >
                            64 Districts · One Heritage
                        </motion.div>
                        <h1 className="text-5xl xl:text-7xl font-black text-white leading-[1.05] tracking-tight mb-6"
                            style={{ textShadow: '0 4px 32px rgba(0,0,0,0.5)' }}>
                            বাংলার{' '}
                            <span style={{
                                background: `linear-gradient(135deg, ${G}, #f0d060, ${G})`,
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                            }}>
                                ঐতিহ্য
                            </span>
                            <br />আপনার ঘরে
                        </h1>
                        <p className="text-lg font-medium max-w-md" style={{ color: 'rgba(255,255,255,0.65)', lineHeight: 1.7 }}>
                            হাতে বোনা নকশিকাঁথা থেকে শুরু করে সুরের তাঁত — বাংলার ৬৪ জেলার নির্বাচিত শিল্পকলা এখন একটি জায়গায়।
                        </p>

                        {/* Stats row */}
                        <div className="flex gap-10 mt-10">
                            {[
                                { label: 'জেলা', value: '৬৪+' },
                                { label: 'শিল্পী', value: '৫০০+' },
                                { label: 'পণ্য', value: '২০০০+' },
                            ].map((s) => (
                                <div key={s.label}>
                                    <p className="text-2xl font-black" style={{ color: G }}>{s.value}</p>
                                    <p className="text-xs font-bold uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.45)' }}>{s.label}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Bottom quote */}
                    <motion.p
                        className="text-sm italic max-w-xs"
                        style={{ color: 'rgba(255,255,255,0.3)' }}
                        animate={{ opacity: [0.3, 0.6, 0.3] }}
                        transition={{ duration: 5, repeat: Infinity }}
                    >
                        "গ্রামের মাটির সুর, শহরের দোরগোড়ায়।"
                    </motion.p>
                </motion.div>

                {/* ── Login Form / Right column ── */}
                <div className="flex-1 flex items-center justify-center p-6 md:p-10 lg:p-12">
                    <motion.div
                        variants={stagger}
                        initial="hidden"
                        animate="visible"
                        className="w-full max-w-[400px]"
                    >
                        {/* Mobile brand — clear logo */}
                        <motion.div variants={slideUp} className="flex lg:hidden items-center gap-3 mb-8 justify-center">
                            {settings?.site_logo
                                ? <img src={`/uploads/${settings.site_logo}`} className="h-10 w-auto object-contain drop-shadow-lg" alt="" />
                                : <span className="font-black text-2xl drop-shadow-lg" style={{ color: G }}>{settings?.site_title?.charAt(0) || 'ঐ'}</span>
                            }
                            <div>
                                <span className="font-black text-xl text-white block leading-tight">{settings?.site_title || 'ঐতিহ্যের বাহার'}</span>
                                <span className="text-[10px] font-bold uppercase tracking-[0.3em]" style={{ color: `${G}99` }}>Heritage Boutique</span>
                            </div>
                        </motion.div>

                        {/* Glass Form Card — deep indigo */}
                        <motion.div
                            variants={slideUp}
                            className="rounded-3xl p-8 relative overflow-hidden"
                            style={{
                                background: 'rgba(15, 15, 45, 0.72)',
                                backdropFilter: 'blur(36px)',
                                WebkitBackdropFilter: 'blur(36px)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                boxShadow: `0 32px 80px rgba(0,0,0,0.55), 0 0 0 1px rgba(212,175,55,0.14), inset 0 1px 0 rgba(255,255,255,0.08)`,
                            }}
                        >
                            {/* Accent glows */}
                            <div className="absolute -top-20 -right-20 w-44 h-44 rounded-full pointer-events-none"
                                style={{ background: 'radial-gradient(circle, rgba(212,175,55,0.18), transparent 70%)' }} />
                            <div className="absolute -bottom-16 -left-16 w-36 h-36 rounded-full pointer-events-none"
                                style={{ background: 'radial-gradient(circle, rgba(100,80,200,0.2), transparent 70%)' }} />

                            {/* Heading */}
                            <motion.div variants={slideUp} className="mb-7 relative z-10">
                                <div className="flex items-center gap-3 mb-1.5">
                                    <h2 className="text-3xl font-black text-white tracking-tight">স্বাগতম</h2>
                                    <Hand size={26} style={{ color: G }} className="rotate-12" />
                                </div>
                                <p className="text-sm" style={{ color: 'rgba(255,255,255,0.42)' }}>
                                    আপনার অ্যাকাউন্টে লগইন করুন।
                                </p>
                            </motion.div>

                            <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
                                {/* Email */}
                                <motion.div variants={slideUp} className="space-y-2">
                                    <label style={{ display: 'block', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.25em', color: focusedField === 'email' ? G : 'rgba(255,255,255,0.38)' }}>
                                        ইমেইল
                                    </label>
                                    <div style={inputWrap('email')}>
                                        <div style={{ paddingLeft: 14, paddingRight: 10, color: focusedField === 'email' ? G : 'rgba(255,255,255,0.3)', display: 'flex', alignItems: 'center' }}>
                                            <Mail size={16} strokeWidth={2} />
                                        </div>
                                        <input
                                            type="email" required value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            onFocus={() => setFocusedField('email')}
                                            onBlur={() => setFocusedField(null)}
                                            placeholder="email@example.com"
                                            style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', padding: '13px 14px 13px 0', fontSize: 14, color: '#fff', caretColor: G }}
                                        />
                                    </div>
                                    <AnimatePresence>{errors.email && (
                                        <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                                            style={{ fontSize: 11, fontWeight: 700, color: '#ff6b6b', paddingLeft: 2 }}>
                                            {errors.email}
                                        </motion.p>
                                    )}</AnimatePresence>
                                </motion.div>

                                {/* Password */}
                                <motion.div variants={slideUp} className="space-y-2">
                                    <div className="flex justify-between items-center">
                                        <label style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.25em', color: focusedField === 'password' ? G : 'rgba(255,255,255,0.38)' }}>
                                            পাসওয়ার্ড
                                        </label>
                                        <Link href="#" style={{ fontSize: 11, fontWeight: 700, color: G, textDecoration: 'none', letterSpacing: '0.05em' }}>
                                            ভুলে গেছেন?
                                        </Link>
                                    </div>
                                    <div style={inputWrap('password')}>
                                        <div style={{ paddingLeft: 14, paddingRight: 10, color: focusedField === 'password' ? G : 'rgba(255,255,255,0.3)', display: 'flex', alignItems: 'center' }}>
                                            <Lock size={16} strokeWidth={2} />
                                        </div>
                                        <input
                                            type={showPassword ? 'text' : 'password'} required value={data.password}
                                            onChange={(e) => setData('password', e.target.value)}
                                            onFocus={() => setFocusedField('password')}
                                            onBlur={() => setFocusedField(null)}
                                            placeholder="••••••••••"
                                            style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', padding: '13px 0px 13px 0', fontSize: 14, color: '#fff', letterSpacing: '0.12em', caretColor: G }}
                                        />
                                        <button type="button" onClick={() => setShowPassword(!showPassword)}
                                            style={{ paddingRight: 14, paddingLeft: 8, color: 'rgba(255,255,255,0.35)', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                                            {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                                        </button>
                                    </div>
                                    <AnimatePresence>{errors.password && (
                                        <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                                            style={{ fontSize: 11, fontWeight: 700, color: '#ff6b6b', paddingLeft: 2 }}>
                                            {errors.password}
                                        </motion.p>
                                    )}</AnimatePresence>
                                </motion.div>

                                {/* Remember */}
                                <motion.div variants={slideUp}>
                                    <label className="flex items-center gap-3 cursor-pointer" style={{ userSelect: 'none' }}>
                                        <input type="checkbox" checked={data.remember}
                                            onChange={(e) => setData('remember', e.target.checked)}
                                            style={{ accentColor: G, width: 15, height: 15, borderRadius: 4 }} />
                                        <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)' }}>
                                            লগইন রাখুন
                                        </span>
                                    </label>
                                </motion.div>

                                {/* CTA Button */}
                                <motion.div variants={slideUp} className="pt-2">
                                    <motion.button
                                        type="submit" disabled={processing}
                                        whileHover={{ scale: 1.03, boxShadow: `0 20px 50px rgba(212,175,55,0.45)` }}
                                        whileTap={{ scale: 0.97 }}
                                        className="w-full flex items-center justify-center gap-3 relative overflow-hidden"
                                        style={{
                                            borderRadius: 16, padding: '15px 20px',
                                            background: `linear-gradient(135deg, ${G} 0%, #c9962a 50%, #e8c04a 100%)`,
                                            color: '#0a1a0d', fontWeight: 800, fontSize: 13,
                                            letterSpacing: '0.28em', textTransform: 'uppercase',
                                            border: 'none', cursor: processing ? 'wait' : 'pointer',
                                            boxShadow: `0 8px 32px rgba(212,175,55,0.35)`,
                                        }}
                                    >
                                        {/* Shine sweep */}
                                        <motion.div
                                            className="absolute inset-0 pointer-events-none"
                                            style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)' }}
                                            animate={{ x: ['-120%', '220%'] }}
                                            transition={{ duration: 2, repeat: Infinity, repeatDelay: 4, ease: 'easeInOut' }}
                                        />
                                        {processing ? <Loader2 size={18} className="animate-spin" /> : (
                                            <>
                                                <span className="relative z-10">লগইন করুন</span>
                                                <ArrowRight size={17} className="relative z-10" />
                                            </>
                                        )}
                                    </motion.button>
                                </motion.div>
                            </form>

                            {/* Divider */}
                            <div className="flex items-center gap-3 my-5 relative z-10">
                                <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.1)' }} />
                                <span style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.25)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
                                    অথবা
                                </span>
                                <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.1)' }} />
                            </div>

                            {/* Social Buttons */}
                            <div className="grid grid-cols-2 gap-3 mb-6 relative z-10">
                                <motion.button
                                    whileHover={{ scale: 1.04, background: 'rgba(255,255,255,0.2)' }}
                                    whileTap={{ scale: 0.96 }}
                                    onClick={() => window.location.href = route('social.redirect', 'google')}
                                    className="flex items-center justify-center gap-2.5 py-3 font-bold text-xs uppercase tracking-wider text-white"
                                    style={{ borderRadius: 14, background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.12)', backdropFilter: 'blur(8px)', cursor: 'pointer' }}
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
                                    whileHover={{ scale: 1.04 }}
                                    whileTap={{ scale: 0.96 }}
                                    className="flex items-center justify-center gap-2.5 py-3 font-bold text-xs uppercase tracking-wider text-white"
                                    style={{ borderRadius: 14, background: '#1877F2', border: 'none', cursor: 'pointer', boxShadow: '0 4px 16px rgba(24,119,242,0.3)' }}
                                >
                                    <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0" fill="currentColor">
                                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                    </svg>
                                    Facebook
                                </motion.button>
                            </div>

                            {/* Register link */}
                            <p className="text-center relative z-10" style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)' }}>
                                নতুন ব্যবহারকারী?{' '}
                                <Link href={route('register')}
                                    style={{ color: G, fontWeight: 800, textDecoration: 'none' }}>
                                    অ্যাকাউন্ট তৈরি করুন →
                                </Link>
                            </p>
                        </motion.div>

                        {/* Below card copyright */}
                        <motion.p
                            variants={slideUp}
                            className="text-center mt-6"
                            style={{ fontSize: 10, color: 'rgba(255,255,255,0.2)', textTransform: 'uppercase', letterSpacing: '0.22em' }}
                        >
                            © {new Date().getFullYear()} · ঐতিহ্যের বাহার · সকল অধিকার সংরক্ষিত
                        </motion.p>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
