import React from 'react';
import { motion } from 'framer-motion';

// ─────────────────────────────────────────────────────────────────────────────
// PURE MATH HELPERS
// ─────────────────────────────────────────────────────────────────────────────
const rad = (deg) => (deg * Math.PI) / 180;
const polar = (cx, cy, r, deg) => ({
    x: cx + r * Math.cos(rad(deg)),
    y: cy + r * Math.sin(rad(deg)),
});

// Build an N-segment ring of identical SVG children via rotational symmetry
function RadialRepeat({ n, children, cx = 200, cy = 200 }) {
    return (
        <>
            {Array.from({ length: n }).map((_, i) => (
                <g key={i} transform={`rotate(${(i * 360) / n} ${cx} ${cy})`}>
                    {children}
                </g>
            ))}
        </>
    );
}

// A single lotus petal (upward, centered on axis at top of circle)
// cx=200,cy=200 center; petal top at (200, 200-outerR)
function Petal({ cx = 200, cy = 200, outerR, petalH, petalW, fill, stroke, strokeW = 1, opacity = 1 }) {
    const tipY = cy - outerR;
    const baseY = cy - (outerR - petalH);
    // Bezier: tip at top, base pair ±petalW/2
    const d = [
        `M ${cx} ${tipY}`,
        `C ${cx + petalW / 2} ${tipY + petalH * 0.35} ${cx + petalW / 2} ${baseY - petalH * 0.1} ${cx} ${baseY}`,
        `C ${cx - petalW / 2} ${baseY - petalH * 0.1} ${cx - petalW / 2} ${tipY + petalH * 0.35} ${cx} ${tipY}`,
        'Z'
    ].join(' ');
    return <path d={d} fill={fill} stroke={stroke} strokeWidth={strokeW} opacity={opacity} />;
}

// Teardrop bead on a ring
function Bead({ cx, cy, r = 3, fill }) {
    return <circle cx={cx} cy={cy} r={r} fill={fill} />;
}

// ─────────────────────────────────────────────────────────────────────────────
// MANDALA COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
export default function HeritageMandala({ size = 440, className = '' }) {
    const C = 200; // viewBox center
    const G = '#D4AF37';   // Gold
    const DG = '#1B5E20';  // Deep Green
    const R = '#C62828';   // Red
    const W = 'rgba(255,255,255,0.85)';

    return (
        <div className={`relative select-none ${className}`} style={{ width: size, height: size }}>

            {/* ── Outer soft glow halo ── */}
            <motion.div
                className="absolute inset-0 rounded-full pointer-events-none"
                animate={{ scale: [1, 1.06, 1], opacity: [0.35, 0.65, 0.35] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                    background:
                        'radial-gradient(circle, rgba(212,175,55,0.22) 0%, rgba(27,94,32,0.12) 50%, transparent 75%)',
                }}
            />

            <svg
                viewBox="0 0 400 400"
                width={size}
                height={size}
                xmlns="http://www.w3.org/2000/svg"
                style={{ overflow: 'visible' }}
            >
                <defs>
                    <filter id="hm-glow" x="-30%" y="-30%" width="160%" height="160%">
                        <feGaussianBlur stdDeviation="2.5" result="blur" />
                        <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                    <filter id="hm-center-glow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="4" result="blur" />
                        <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {/* ════════════════════════════════════════════
                    LAYER 1 — outer_ring  (rotates CW slowly)
                ════════════════════════════════════════════ */}
                <motion.g
                    id="outer_ring"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
                    style={{ originX: '200px', originY: '200px' }}
                >
                    {/* Outermost dashed circle border */}
                    <circle cx={C} cy={C} r={186} fill="none"
                        stroke={G} strokeWidth={0.8} strokeDasharray="5 7" opacity={0.45} />

                    {/* 24-segment outer bead ring */}
                    <RadialRepeat n={24} cx={C} cy={C}>
                        {(() => {
                            const p = polar(C, C, 178, -90);
                            return (
                                <>
                                    <circle cx={p.x} cy={p.y} r={2.2} fill={G} opacity={0.7} />
                                </>
                            );
                        })()}
                    </RadialRepeat>

                    {/* 16-segment outer lance petals */}
                    <RadialRepeat n={16} cx={C} cy={C}>
                        <Petal cx={C} cy={C} outerR={165} petalH={24} petalW={14}
                            fill="none" stroke={DG} strokeW={1} opacity={0.55} />
                        {/* tiny accent dot at tip */}
                        <circle cx={C} cy={C - 165} r={1.8} fill={G} opacity={0.8} />
                    </RadialRepeat>

                    {/* 8-segment large outer teardrop shapes */}
                    <RadialRepeat n={8} cx={C} cy={C}>
                        <Petal cx={C} cy={C} outerR={155} petalH={42} petalW={22}
                            fill="rgba(27,94,32,0.07)" stroke={DG} strokeW={1.2} opacity={0.65} />
                        {/* inner line inside large petal */}
                        <Petal cx={C} cy={C} outerR={148} petalH={28} petalW={10}
                            fill="none" stroke={G} strokeW={0.8} opacity={0.5} />
                    </RadialRepeat>

                    {/* Thin accent ring */}
                    <circle cx={C} cy={C} r={130} fill="none"
                        stroke={R} strokeWidth={0.6} strokeDasharray="2 8" opacity={0.35} />
                </motion.g>

                {/* ════════════════════════════════════════════
                    LAYER 2 — petals_layer  (rotates CCW slower)
                ════════════════════════════════════════════ */}
                <motion.g
                    id="petals_layer"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 55, repeat: Infinity, ease: 'linear' }}
                    style={{ originX: '200px', originY: '200px' }}
                >
                    {/* 12-segment medium lotus petals */}
                    <RadialRepeat n={12} cx={C} cy={C}>
                        <Petal cx={C} cy={C} outerR={120} petalH={38} petalW={20}
                            fill="rgba(212,175,55,0.1)" stroke={G} strokeW={1.2} opacity={0.8} />
                        <Petal cx={C} cy={C} outerR={112} petalH={22} petalW={10}
                            fill="none" stroke={G} strokeW={0.7} opacity={0.55} />
                    </RadialRepeat>

                    {/* 12 dot accents between petals */}
                    <RadialRepeat n={12} cx={C} cy={C}>
                        <g transform={`rotate(15 ${C} ${C})`}>
                            <circle cx={C} cy={C - 125} r={2.5} fill={R} opacity={0.5} />
                        </g>
                    </RadialRepeat>

                    {/* Second concentric ring with thin strokes */}
                    <circle cx={C} cy={C} r={80} fill="none"
                        stroke={DG} strokeWidth={0.8} strokeDasharray="4 5" opacity={0.4} />

                    {/* 8-segment inner medium petals */}
                    <RadialRepeat n={8} cx={C} cy={C}>
                        <Petal cx={C} cy={C} outerR={78} petalH={30} petalW={18}
                            fill="rgba(27,94,32,0.08)" stroke={DG} strokeW={1.1} opacity={0.75} />
                        <Petal cx={C} cy={C} outerR={70} petalH={18} petalW={9}
                            fill="rgba(212,175,55,0.15)" stroke={G} strokeW={0.8} opacity={0.65} />
                    </RadialRepeat>

                    {/* 16-bead accent ring */}
                    <RadialRepeat n={16} cx={C} cy={C}>
                        <circle cx={C} cy={C - 86} r={2} fill={G} opacity={0.6} />
                    </RadialRepeat>
                </motion.g>

                {/* ════════════════════════════════════════════
                    LAYER 3 — center_core  (STATIC — NO rotation)
                ════════════════════════════════════════════ */}
                <g id="center_core">
                    {/* Solid inner fill disc */}
                    <circle cx={C} cy={C} r={46}
                        fill="rgba(255,255,255,0.92)"
                        stroke={G} strokeWidth={1.5} filter="url(#hm-center-glow)" />

                    {/* 8 inner radiating spokes */}
                    <RadialRepeat n={8} cx={C} cy={C}>
                        <line x1={C} y1={C - 16} x2={C} y2={C - 44}
                            stroke={DG} strokeWidth={1} opacity={0.6} />
                    </RadialRepeat>

                    {/* 8 inner micro petals */}
                    <RadialRepeat n={8} cx={C} cy={C}>
                        <Petal cx={C} cy={C} outerR={38} petalH={14} petalW={9}
                            fill="rgba(212,175,55,0.2)" stroke={G} strokeW={1} opacity={0.85} />
                    </RadialRepeat>

                    {/* Inner ring border */}
                    <circle cx={C} cy={C} r={22}
                        fill="rgba(27,94,32,0.07)"
                        stroke={DG} strokeWidth={1} opacity={0.8} />

                    {/* "Sun" radiating lines from exact center */}
                    <RadialRepeat n={12} cx={C} cy={C}>
                        <line x1={C} y1={C - 8} x2={C} y2={C - 20}
                            stroke={G} strokeWidth={1.2} opacity={0.7} />
                    </RadialRepeat>

                    {/* Center jewel dot */}
                    <circle cx={C} cy={C} r={8}
                        fill={G} filter="url(#hm-center-glow)" opacity={0.95} />
                    <circle cx={C} cy={C} r={4}
                        fill={W} opacity={0.9} />

                    {/* Ring accent */}
                    <circle cx={C} cy={C} r={46}
                        fill="none" stroke={G} strokeWidth={0.6} strokeDasharray="3 3" opacity={0.5} />
                </g>

                {/* ════════════════════════════════════════════
                    LAYER 4 — decorative_dots (slow CW)
                ════════════════════════════════════════════ */}
                <motion.g
                    id="decorative_dots"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}
                    style={{ originX: '200px', originY: '200px' }}
                >
                    {/* Fine dot ring × 32 dots at r=142 */}
                    <RadialRepeat n={32} cx={C} cy={C}>
                        <circle cx={C} cy={C - 142} r={1.3} fill={G} opacity={0.45} />
                    </RadialRepeat>

                    {/* Alternate larger dots at r=136 */}
                    <RadialRepeat n={16} cx={C} cy={C}>
                        <circle cx={C} cy={C - 136} r={2.5} fill={R} opacity={0.35} />
                    </RadialRepeat>

                    {/* Dasharray ring */}
                    <circle cx={C} cy={C} r={138}
                        fill="none" stroke={G} strokeWidth={0.5}
                        strokeDasharray="1 11" opacity={0.5} />
                </motion.g>
            </svg>

            {/* ── Bottom breathing label ── */}
            <motion.div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 text-center pointer-events-none"
                animate={{ opacity: [0.4, 0.8, 0.4] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            >
                <p className="text-[10px] font-black uppercase tracking-[0.5em]"
                    style={{ color: '#D4AF37' }}>
                    Made in Bengal
                </p>
            </motion.div>
        </div>
    );
}
