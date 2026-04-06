"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { ArrowRight } from "lucide-react";
import { ctaData } from "@/content";
import { useTheme } from "@/lib/theme";
import { DoodleBackground } from "@/components/ui/DoodleBackground";

interface CartoonProps {
  stroke: string;
  opacity: number;
}

/* ── Doodle cartoon — left character (curious, holding a form) ── */
function CartoonLeft({ stroke, opacity }: CartoonProps) {
  return (
    <svg
      viewBox="0 0 110 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ opacity }}
      className="w-[100px] h-[145px]"
      aria-hidden="true"
    >
      {/* Legs */}
      <path d="M35,105 C32,118 30,135 34,148" stroke={stroke} strokeWidth="2.2" strokeLinecap="round" />
      <path d="M68,105 C72,118 74,135 70,148" stroke={stroke} strokeWidth="2.2" strokeLinecap="round" />
      {/* Torso */}
      <path d="M35,72 C33,88 33,98 35,105 C45,110 58,110 68,105 C70,98 70,88 68,72Z"
        stroke={stroke} strokeWidth="2" fill="none" strokeLinejoin="round" strokeLinecap="round" />
      {/* Left arm — raised */}
      <path d="M38,80 C28,70 18,58 12,45" stroke={stroke} strokeWidth="2.2" strokeLinecap="round" />
      <path d="M12,45 C10,40 14,36 18,38 C22,40 20,48 16,50" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
      {/* Right arm — holding clipboard */}
      <path d="M65,82 C76,78 88,76 95,78" stroke={stroke} strokeWidth="2.2" strokeLinecap="round" />
      {/* Clipboard */}
      <rect x="92" y="68" width="14" height="18" rx="1.5" stroke={stroke} strokeWidth="1.8" fill="none" />
      <line x1="95" y1="74" x2="103" y2="74" stroke={stroke} strokeWidth="1.2" strokeLinecap="round" />
      <line x1="95" y1="78" x2="103" y2="78" stroke={stroke} strokeWidth="1.2" strokeLinecap="round" />
      <line x1="95" y1="82" x2="100" y2="82" stroke={stroke} strokeWidth="1.2" strokeLinecap="round" />

      {/* Head */}
      <path d="M20,42 C18,20 32,5 52,5 C72,5 85,20 83,42 C83,62 70,76 52,76 C34,76 20,62 20,42Z"
        stroke={stroke} strokeWidth="2.2" fill="none" strokeLinejoin="round" />
      {/* Hair — messy top */}
      <path d="M28,25 C25,10 36,2 44,12" stroke={stroke} strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M44,12 C46,4 54,2 56,10" stroke={stroke} strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M56,10 C60,2 70,6 68,18" stroke={stroke} strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* Eyes */}
      <circle cx="38" cy="44" r="3.5" fill={stroke} />
      <circle cx="64" cy="44" r="3.5" fill={stroke} />
      {/* Smile */}
      <path d="M38,60 C44,70 60,70 66,60" stroke={stroke} strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* Cheeks */}
      <ellipse cx="32" cy="58" rx="5" ry="3" fill="#f472b6" opacity="0.55" />
      <ellipse cx="72" cy="58" rx="5" ry="3" fill="#f472b6" opacity="0.55" />

      {/* Speech bubble */}
      <path d="M70,8 C70,2 90,2 90,8 C90,14 70,14 70,8Z M76,14 L72,20 L80,14Z"
        stroke={stroke} strokeWidth="1.6" fill="none" strokeLinejoin="round" />
      <text x="80" y="12" textAnchor="middle" fontSize="7" fill={stroke} fontFamily="sans-serif" fontWeight="bold">!</text>
    </svg>
  );
}

/* ── Doodle cartoon — right character (stressed / confused) ── */
function CartoonRight({ stroke, opacity }: CartoonProps) {
  return (
    <svg
      viewBox="0 0 110 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ opacity, transform: "scaleX(-1)" }}
      className="w-[100px] h-[145px]"
      aria-hidden="true"
    >
      {/* Legs */}
      <path d="M35,105 C32,118 30,135 34,148" stroke={stroke} strokeWidth="2.2" strokeLinecap="round" />
      <path d="M68,105 C72,118 74,135 70,148" stroke={stroke} strokeWidth="2.2" strokeLinecap="round" />
      {/* Torso */}
      <path d="M35,72 C33,88 33,98 35,105 C45,110 58,110 68,105 C70,98 70,88 68,72Z"
        stroke={stroke} strokeWidth="2" fill="none" strokeLinejoin="round" strokeLinecap="round" />
      {/* Arms — frustrated, both raised */}
      <path d="M38,80 C28,68 22,55 26,42" stroke={stroke} strokeWidth="2.2" strokeLinecap="round" />
      <path d="M65,80 C75,68 82,55 78,42" stroke={stroke} strokeWidth="2.2" strokeLinecap="round" />
      {/* Stress marks */}
      <line x1="24" y1="52" x2="18" y2="48" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="22" y1="56" x2="15" y2="55" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" />

      {/* Head */}
      <path d="M20,42 C18,20 32,5 52,5 C72,5 85,20 83,42 C83,62 70,76 52,76 C34,76 20,62 20,42Z"
        stroke={stroke} strokeWidth="2.2" fill="none" strokeLinejoin="round" />
      {/* Hair — wilder */}
      <path d="M24,28 C20,12 32,0 42,10" stroke={stroke} strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M42,10 C44,2 52,0 54,8" stroke={stroke} strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M54,8 C58,0 68,4 66,16" stroke={stroke} strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M66,16 C72,8 82,14 80,24" stroke={stroke} strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* Stressed wide eyes */}
      <circle cx="38" cy="44" r="5" stroke={stroke} strokeWidth="1.8" fill="none" />
      <circle cx="64" cy="44" r="5" stroke={stroke} strokeWidth="1.8" fill="none" />
      <circle cx="38" cy="44" r="2.5" fill={stroke} />
      <circle cx="64" cy="44" r="2.5" fill={stroke} />
      {/* Squiggly mouth */}
      <path d="M38,63 C42,58 48,66 52,62 C56,58 62,65 66,62" stroke={stroke} strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* Sweat drop */}
      <path d="M80,30 C82,25 86,28 84,32 C82,36 78,34 80,30Z" stroke={stroke} strokeWidth="1.5" fill="none" />

      {/* Speech bubble — "?" */}
      <path d="M68,5 C68,0 88,0 88,6 C88,12 75,12 72,12 L70,18 L74,12 C68,12 68,10 68,5Z"
        stroke={stroke} strokeWidth="1.6" fill="none" strokeLinejoin="round" />
      <text x="78" y="10" textAnchor="middle" fontSize="7" fill={stroke} fontFamily="sans-serif" fontWeight="bold">?</text>
    </svg>
  );
}

export default function CTASection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const { theme } = useTheme();
  const dark = theme === "dark";

  const cartoonStroke = dark ? "#c8d4f0" : "#2d2d2d";
  const cartoonOpacity = dark ? 0.45 : 0.42;

  return (
    <section className="relative py-16 md:py-32 px-4 sm:px-6 overflow-hidden bg-background border-t border-border" ref={ref}>
      {/* Subtle grid glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 100%, rgba(172,172,179,0.07) 0%, transparent 70%)",
        }}
      />

      {/* Doodle stroke background */}
      <DoodleBackground variant="cta" />

      {/* Cartoon characters — hidden on small screens */}
      <div className="absolute left-6 bottom-10 hidden lg:flex items-end pointer-events-none z-0">
        <CartoonLeft stroke={cartoonStroke} opacity={cartoonOpacity} />
      </div>
      <div className="absolute right-6 bottom-10 hidden lg:flex items-end pointer-events-none z-0">
        <CartoonRight stroke={cartoonStroke} opacity={cartoonOpacity} />
      </div>

      <div className="relative max-w-3xl mx-auto flex flex-col items-center text-center z-10 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(12px)" }}
          animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-accent/25 bg-accent/[0.07] text-[11px] font-semibold text-accent tracking-wide mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            {ctaData.badge}
          </span>

          <h2 className="heading-display text-4xl sm:text-5xl font-bold text-foreground tracking-tight max-w-2xl mx-auto mb-4">
            {ctaData.headline}
          </h2>

          <p className="text-lg text-muted-foreground max-w-lg mx-auto leading-relaxed">
            {ctaData.description}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
          animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.55, delay: 0.18, ease: "easeOut" }}
        >
          <motion.a
            href="#"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="glow-btn inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm"
          >
            {ctaData.primaryCta}
            <ArrowRight className="w-4 h-4" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
