"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { DEMO_VIDEO_SRC } from "@/content/site";

/* ── HeroVideo ───────────────────────────────────────────────────────────── */
interface HeroVideoProps {
  withFrame?: boolean;
  className?: string;
  badgeBottom?: React.ReactNode;
  badgeTop?: React.ReactNode;
}

export function HeroVideo({
  withFrame = true,
  className = "",
  badgeBottom,
  badgeTop,
}: HeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [loaded, setLoaded] = useState(false);

  const video = (
    <video
      ref={videoRef}
      src={DEMO_VIDEO_SRC}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      onCanPlay={() => setLoaded(true)}
      style={{ display: "block", width: "100%", height: "100%", objectFit: "cover" }}
    />
  );

  if (!withFrame) {
    return (
      <div className={cn("relative overflow-hidden rounded-2xl", className)}>
        {video}
        {badgeBottom}
        {badgeTop}
      </div>
    );
  }

  return (
    <div className={cn("relative", className)}>
      {/* Outer wrapper sets the aspect ratio — video always mounted inside */}
      <div
        className="relative w-full rounded-2xl overflow-hidden border border-white/[0.07]"
        style={{ background: "#0c1321", boxShadow: "0 40px 80px rgba(0,0,0,0.55)" }}
      >
        {/* Title bar — real chrome, always visible */}
        <div
          className="flex items-center gap-2 px-4 py-2.5 border-b border-white/[0.05]"
          style={{ background: "#111827" }}
        >
          <span className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
          </span>
          <div className="flex-1 flex justify-center">
            <span
              className="text-[10px] text-white/25 font-mono px-3 py-0.5 rounded"
              style={{ background: "#0c1321" }}
            >
              formsio.io/admin
            </span>
          </div>
          <motion.span
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ repeat: Infinity, duration: 1.8 }}
            className="text-[9px] font-bold text-[#28c840] uppercase tracking-widest px-1"
          >
            LIVE
          </motion.span>
        </div>

        {/* Video container — padding-bottom trick for 16:9 */}
        <div style={{ position: "relative", paddingBottom: "56.25%", height: 0, overflow: "hidden" }}>
          {/* Skeleton overlaid — fades out when video ready */}
          <AnimatePresence>
            {!loaded && (
              <motion.div
                key="skeleton"
                className="absolute inset-0 z-10"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                style={{ background: "var(--surface-lowest)" }}
              >
                {/* Shimmer sweep */}
                <motion.div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.04) 50%, transparent 100%)",
                  }}
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                />
                {/* Ghost play */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                  <div className="w-14 h-14 rounded-full border border-white/[0.08] bg-white/[0.04] flex items-center justify-center">
                    <svg className="w-5 h-5 text-white/15 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                  <div className="relative overflow-hidden rounded-full bg-white/[0.06] h-2 w-24">
                    <motion.div
                      className="absolute inset-0"
                      style={{ background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.07) 50%, transparent 100%)" }}
                      animate={{ x: ["-100%", "100%"] }}
                      transition={{ repeat: Infinity, duration: 1.6, ease: "linear" }}
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Video — always mounted, loads in background */}
          <div style={{ position: "absolute", inset: 0 }}>
            {video}
          </div>
        </div>
      </div>

      {/* Badges fade in after load */}
      <AnimatePresence>
        {loaded && badgeBottom && (
          <motion.div
            key="badge-bottom"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            {badgeBottom}
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {loaded && badgeTop && (
          <motion.div
            key="badge-top"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            {badgeTop}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
