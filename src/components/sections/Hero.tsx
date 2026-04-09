"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { ArrowRight, Play } from "lucide-react";
import { useTheme } from "@/lib/theme";
import { heroData } from "@/content";
import { HeroVideo } from "@/components/ui/HeroVideo";

const STARS = Array.from({ length: 55 }, (_, i) => ({
  id: i,
  x: ((i * 37 + 13) % 97) + 1.5,
  y: ((i * 53 + 7) % 93) + 1.5,
  r: i % 3 === 0 ? 1.5 : i % 3 === 1 ? 1 : 0.75,
  delay: (i * 0.17) % 3.5,
  dur: 2.2 + (i % 4) * 0.5,
}));

function StarField() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {STARS.map((s) => (
        <motion.div
          key={s.id}
          className="absolute rounded-full bg-white"
          style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.r * 2, height: s.r * 2 }}
          animate={{ opacity: [0.07, 0.5, 0.07] }}
          transition={{ repeat: Infinity, duration: s.dur, delay: s.delay, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

function useParallax() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 55, damping: 18 });
  const sy = useSpring(my, { stiffness: 55, damping: 18 });

  useEffect(() => {
    const fn = (e: MouseEvent) => {
      mx.set(((e.clientX - window.innerWidth  / 2) / window.innerWidth)  * 14);
      my.set(((e.clientY - window.innerHeight / 2) / window.innerHeight) * 14);
    };
    window.addEventListener("mousemove", fn);
    return () => window.removeEventListener("mousemove", fn);
  }, [mx, my]);

  return { sx, sy };
}

export default function Hero() {
  const { theme } = useTheme();
  const dark = theme !== "light";

  const { sx, sy } = useParallax();
  const rotY = useTransform(sx, [-14, 14], [-4, 4]);
  const rotX = useTransform(sy, [-14, 14], [3, -3]);

  const chipBorder = dark
    ? "border-white/10 text-white/55 hover:border-white/25 hover:text-white/80"
    : "border-border text-muted-foreground hover:border-border-hover hover:text-foreground";

  return (
    <section
      className="pt-4 pb-16 px-4 sm:px-6"
      style={{ background: dark ? "#080c14" : "#eef1f6" }}
    >
      <div className="max-w-7xl mx-auto" style={{ paddingTop: "5rem" }}>
        <div
          className="relative rounded-3xl overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #060d1a 0%, #08172a 50%, #0b2840 100%)",
            border: "1px solid rgba(255,255,255,0.06)",
            minHeight: 540,
          }}
        >
          <StarField />

          <div
            className="absolute top-0 right-0 w-[640px] h-[640px] pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at 70% 20%, rgba(6,182,212,0.28) 0%, rgba(8,100,130,0.12) 45%, transparent 68%)",
            }}
          />
          <div
            className="absolute bottom-0 left-0 w-[440px] h-[440px] pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at 22% 82%, rgba(14,100,180,0.14) 0%, transparent 58%)",
            }}
          />

          <div className="relative z-10 grid lg:grid-cols-[1fr_1.25fr] items-center gap-10 lg:gap-14 px-8 sm:px-12 py-16 sm:py-20">

            <div className="flex flex-col gap-6">
              <motion.h1
                initial={{ opacity: 0, y: 28, filter: "blur(12px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.75, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="text-4xl sm:text-[2.9rem] lg:text-[3.25rem] font-bold leading-[1.1] tracking-tight text-white"
              >
                {heroData.headline[0]}{" "}
                <span className="relative inline-block">
                  <span className="text-white">{heroData.accentWord}</span>
                  <motion.svg
                    viewBox="0 0 270 14"
                    fill="none"
                    className="absolute -bottom-1 left-0 w-full"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ delay: 0.95, duration: 0.7, ease: "easeOut" }}
                  >
                    <motion.path
                      d="M2 9 C65 3, 130 3, 190 8 C225 12, 255 10, 268 7"
                      stroke="rgba(56,189,248,0.5)"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                  </motion.svg>
                </span>
                .
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.62, delay: 0.2, ease: "easeOut" }}
                className="text-base sm:text-lg leading-relaxed max-w-[36ch]"
                style={{ color: "rgba(255,255,255,0.42)" }}
              >
                {heroData.description}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.3, ease: "easeOut" }}
                className="flex flex-wrap items-center gap-3"
              >
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold bg-white text-gray-900 shadow-lg shadow-black/30 hover:shadow-xl transition-shadow"
                >
                  {heroData.primaryCta}
                  <ArrowRight className="w-4 h-4" />
                </motion.a>

                <motion.a
                  href="#how-it-works"
                  whileHover={{ scale: 1.02 }}
                  className={`inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-medium border transition-all ${chipBorder}`}
                >
                  <Play className="w-3.5 h-3.5" />
                  {heroData.secondaryCta}
                </motion.a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.48, duration: 0.4 }}
                className="flex flex-col gap-2 pt-1"
              >
                {heroData.features.map((f, i) => (
                  <motion.div
                    key={f.label}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.52 + i * 0.08, duration: 0.36 }}
                    className="flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400 shrink-0" />
                    <span className="text-sm" style={{ color: "rgba(255,255,255,0.38)" }}>
                      {f.label}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            <motion.div
              style={{ rotateY: rotY, rotateX: rotX, perspective: 1000 }}
              initial={{ opacity: 0, y: 36, scale: 0.96, filter: "blur(16px)" }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.85, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              <HeroVideo withFrame />
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
