"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { ArrowRight, Play, ChevronRight } from "lucide-react";
import { useTheme } from "@/lib/theme";
import { heroData } from "@/content";
import { DoodleBackground } from "@/components/ui/DoodleBackground";
import { HeroVideo } from "@/components/ui/HeroVideo";

/* ─── Parallax hook ─── */
function useParallax() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 55, damping: 18 });
  const sy = useSpring(my, { stiffness: 55, damping: 18 });
  useEffect(() => {
    const fn = (e: MouseEvent) => {
      mx.set(((e.clientX - window.innerWidth / 2) / window.innerWidth) * 16);
      my.set(((e.clientY - window.innerHeight / 2) / window.innerHeight) * 16);
    };
    window.addEventListener("mousemove", fn);
    return () => window.removeEventListener("mousemove", fn);
  }, [mx, my]);
  return { sx, sy };
}

/* ─── Hero ─── */
export default function Hero() {
  const { theme } = useTheme();
  const dark = theme !== "light";
  const { sx, sy } = useParallax();
  const rotY = useTransform(sx, [-16, 16], [-4, 4]);
  const rotX = useTransform(sy, [-16, 16], [3, -3]);

  const bg = dark ? "bg-background" : "bg-[#f8fafc]";
  const fg = dark ? "text-white" : "text-foreground";
  const muted = dark ? "text-white/45" : "text-muted-foreground";
  const chipBorder = dark
    ? "border-white/[0.07] text-white/50 hover:border-white/20 hover:text-white/80"
    : "border-border text-muted-foreground hover:border-border-hover hover:text-foreground";

  return (
    <section className={`relative min-h-screen flex items-center overflow-hidden py-16 md:py-28 px-4 sm:px-6 ${bg}`}>
      <DoodleBackground variant="hero" />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.022) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          opacity: dark ? 1 : 0.3,
        }}
      />
      {/* Glow — top right */}
      <div
        className="absolute top-0 right-0 w-[560px] h-[560px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 65% 35%, rgba(172,172,179,0.10) 0%, transparent 70%)" }}
      />

      <div className="max-w-6xl mx-auto w-full relative z-10">
        <div className="grid lg:grid-cols-[1fr_1.25fr] gap-16 items-center">

          {/* LEFT */}
          <div className="flex flex-col gap-5">
            <motion.h1
              initial={{ opacity: 0, y: 28, filter: "blur(12px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.72, delay: 0.07, ease: [0.22, 1, 0.36, 1] }}
              className={`heading-display text-5xl sm:text-[3.5rem] lg:text-[4rem] font-bold leading-[1.05] tracking-tight ${fg}`}
            >
              {heroData.headline[0]}{" "}
              <span className="relative inline-block">
                <span className="text-accent">{heroData.accentWord}</span>
                <motion.svg
                  viewBox="0 0 270 14" fill="none" className="absolute -bottom-1 left-0 w-full"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ delay: 0.95, duration: 0.75, ease: "easeOut" }}
                >
                  <motion.path
                    d="M2 9 C65 3, 130 3, 190 8 C225 12, 255 10, 268 7"
                    stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" strokeOpacity="0.35"
                  />
                </motion.svg>
              </span>
              .
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.62, delay: 0.18, ease: "easeOut" }}
              className={`text-lg leading-relaxed max-w-md ${muted}`}
            >
              {heroData.description}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 14, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.58, delay: 0.28, ease: "easeOut" }}
              className="flex flex-wrap items-center gap-3"
            >
              <motion.a
                href="#" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                className="glow-btn inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold"
              >
                {heroData.primaryCta}
                <ArrowRight className="w-4 h-4" />
              </motion.a>
              <motion.a
                href="#how-it-works" whileHover={{ scale: 1.02 }}
                className={`inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-medium border transition-all ${chipBorder}`}
              >
                <Play className="w-3.5 h-3.5" />
                {heroData.secondaryCta}
              </motion.a>
            </motion.div>

            {/* Feature list */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="flex flex-col gap-2 pt-1"
            >
              {heroData.features.map((f, i) => (
                <motion.div
                  key={f.label}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.55 + i * 0.08, duration: 0.38 }}
                  className="flex items-center gap-2"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-accent shrink-0" />
                  <span className={`text-sm ${muted}`}>{f.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* RIGHT — hero-io.mp4 with parallax tilt */}
          <motion.div
            style={{ rotateY: rotY, rotateX: rotX, perspective: 1000 }}
            initial={{ opacity: 0, y: 36, scale: 0.96, filter: "blur(16px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.82, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <HeroVideo
              withFrame
              badgeBottom={
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1, duration: 0.45 }}
                  className={`absolute -bottom-5 -left-5 flex items-center gap-2 px-3.5 py-2 rounded-xl border shadow-xl ${
                    dark
                      ? "bg-[#111827]/90 backdrop-blur-xl border-white/[0.07]"
                      : "bg-white/90 backdrop-blur-xl border-border"
                  }`}
                >
                  <motion.span
                    animate={{ scale: [1, 1.4, 1], opacity: [1, 0.4, 1] }}
                    transition={{ repeat: Infinity, duration: 2.2 }}
                    className="w-2 h-2 rounded-full bg-[#6366f1]"
                  />
                  <span className={`text-xs font-semibold ${dark ? "text-white/75" : "text-foreground"}`}>
                    94.3% completion rate
                  </span>
                </motion.div>
              }
              badgeTop={
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.3, duration: 0.45 }}
                  className={`absolute -top-4 -right-4 px-3 py-2 rounded-xl border shadow-xl text-xs font-bold text-accent ${
                    dark
                      ? "bg-[#111827]/90 backdrop-blur-xl border-white/[0.07]"
                      : "bg-white/90 backdrop-blur-xl border-border"
                  }`}
                >
                  ✦ AI-assisted
                </motion.div>
              }
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
