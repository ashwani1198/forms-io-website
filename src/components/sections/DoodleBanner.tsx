"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { useTheme } from "@/lib/theme";

/* ─────────────────────────────────────────────
   DoodleBanner — hand-drawn sketch strip that
   sits between the Hero and Features sections.
   Adapts stroke color to light/dark theme.
───────────────────────────────────────────── */

/* Easing as tuple so Motion's Variants type is satisfied */
const EASE: [number, number, number, number] = [0.42, 0, 0.58, 1];

const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (d: number) => ({
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { delay: d, duration: 1.1, ease: EASE },
      opacity: { delay: d, duration: 0.2 },
    },
  }),
};

export default function DoodleBanner() {
  const { theme } = useTheme();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const stroke = theme === "dark" ? "rgba(255,255,255,0.18)" : "rgba(0,0,0,0.14)";
  const accent = theme === "dark" ? "rgba(255,255,255,0.32)" : "rgba(0,0,0,0.28)";

  const anim = inView ? "visible" : "hidden";

  return (
    <div
      ref={ref}
      className="relative w-full overflow-hidden select-none pointer-events-none"
      style={{ height: 120 }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1200 120"
        preserveAspectRatio="xMidYMid meet"
        className="absolute inset-0 w-full h-full"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* ── Left cluster: speech bubble ── */}
        <motion.path
          d="M 60 55 Q 60 35 80 35 L 140 35 Q 160 35 160 55 Q 160 75 140 75 L 90 75 L 78 88 L 82 75 L 80 75 Q 60 75 60 55 Z"
          stroke={stroke} strokeWidth="1.8"
          variants={draw} custom={0} initial="hidden" animate={anim}
        />
        <motion.path d="M 80 52 L 130 52" stroke={stroke} strokeWidth="1.5"
          variants={draw} custom={0.15} initial="hidden" animate={anim} />
        <motion.path d="M 80 61 L 118 61" stroke={stroke} strokeWidth="1.5"
          variants={draw} custom={0.25} initial="hidden" animate={anim} />

        {/* ── Left: small dash accent ── */}
        <motion.path d="M 28 30 L 44 46" stroke={accent} strokeWidth="2.5"
          variants={draw} custom={0.4} initial="hidden" animate={anim} />

        {/* ── Left: face doodle ── */}
        <motion.circle cx="220" cy="62" r="26"
          stroke={stroke} strokeWidth="1.8"
          variants={draw} custom={0.1} initial="hidden" animate={anim} />
        <motion.path d="M 211 56 Q 213 52 216 56" stroke={stroke} strokeWidth="1.6"
          variants={draw} custom={0.3} initial="hidden" animate={anim} />
        <motion.path d="M 224 56 Q 226 52 229 56" stroke={stroke} strokeWidth="1.6"
          variants={draw} custom={0.35} initial="hidden" animate={anim} />
        <motion.path d="M 212 70 Q 220 76 228 70" stroke={stroke} strokeWidth="1.6"
          variants={draw} custom={0.45} initial="hidden" animate={anim} />

        {/* ── Center-left: wavy underline ── */}
        <motion.path
          d="M 340 60 C 360 50, 380 70, 400 60 C 420 50, 440 70, 460 60 C 480 50, 500 70, 520 60"
          stroke={stroke} strokeWidth="1.5"
          variants={draw} custom={0.2} initial="hidden" animate={anim} />

        {/* ── Center: arrow ── */}
        <motion.path d="M 570 40 C 580 55, 590 65, 610 70" stroke={accent} strokeWidth="2"
          variants={draw} custom={0.3} initial="hidden" animate={anim} />
        <motion.path d="M 604 73 L 610 70 L 607 64" stroke={accent} strokeWidth="2"
          variants={draw} custom={0.55} initial="hidden" animate={anim} />

        {/* ── Center-right: star burst ── */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => {
          const rad = (deg * Math.PI) / 180;
          const x1 = 680 + Math.cos(rad) * 8;
          const y1 = 60 + Math.sin(rad) * 8;
          const x2 = 680 + Math.cos(rad) * 18;
          const y2 = 60 + Math.sin(rad) * 18;
          return (
            <motion.line key={deg} x1={x1} y1={y1} x2={x2} y2={y2}
              stroke={accent} strokeWidth="1.8"
              variants={draw} custom={0.25 + i * 0.04}
              initial="hidden" animate={anim} />
          );
        })}

        {/* ── Right cluster: "Yes!" speech bubble ── */}
        <motion.path
          d="M 800 30 Q 800 15 820 15 L 900 15 Q 920 15 920 30 Q 920 45 900 45 L 830 45 L 818 56 L 822 45 L 820 45 Q 800 45 800 30 Z"
          stroke={stroke} strokeWidth="1.8"
          variants={draw} custom={0.15} initial="hidden" animate={anim} />
        <motion.path d="M 818 30 L 834 30" stroke={stroke} strokeWidth="1.5"
          variants={draw} custom={0.32} initial="hidden" animate={anim} />
        <motion.path d="M 838 30 L 842 30" stroke={stroke} strokeWidth="2"
          variants={draw} custom={0.36} initial="hidden" animate={anim} />
        <motion.path d="M 848 25 L 848 36" stroke={stroke} strokeWidth="1.5"
          variants={draw} custom={0.4} initial="hidden" animate={anim} />
        <motion.path d="M 854 25 Q 862 30 854 36" stroke={stroke} strokeWidth="1.5"
          variants={draw} custom={0.44} initial="hidden" animate={anim} />

        {/* ── Right: star doodle ── */}
        <motion.path
          d="M 980 35 L 985 50 L 1000 50 L 988 59 L 993 74 L 980 65 L 967 74 L 972 59 L 960 50 L 975 50 Z"
          stroke={stroke} strokeWidth="1.8"
          variants={draw} custom={0.2} initial="hidden" animate={anim} />

        {/* ── Far right: face doodle ── */}
        <motion.circle cx="1080" cy="62" r="28"
          stroke={stroke} strokeWidth="1.8"
          variants={draw} custom={0.1} initial="hidden" animate={anim} />
        <motion.path d="M 1070 55 Q 1072 51 1076 55" stroke={stroke} strokeWidth="1.6"
          variants={draw} custom={0.3} initial="hidden" animate={anim} />
        <motion.path d="M 1083 55 Q 1086 51 1090 55" stroke={stroke} strokeWidth="1.6"
          variants={draw} custom={0.35} initial="hidden" animate={anim} />
        <motion.path d="M 1072 71 Q 1080 78 1088 71" stroke={stroke} strokeWidth="1.6"
          variants={draw} custom={0.45} initial="hidden" animate={anim} />

        {/* ── Far right: accent slash ── */}
        <motion.path d="M 1145 22 L 1158 40" stroke={accent} strokeWidth="3" strokeLinecap="round"
          variants={draw} custom={0.5} initial="hidden" animate={anim} />
      </svg>
    </div>
  );
}
