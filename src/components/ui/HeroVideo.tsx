"use client";

import { useRef, useEffect } from "react";
import { motion } from "motion/react";
import { DEMO_VIDEO_SRC } from "@/content/site";

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

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.play().catch(() => {});
  }, []);

  const video = (
    <video
      ref={videoRef}
      src={DEMO_VIDEO_SRC}
      autoPlay
      muted
      loop
      playsInline
      style={{ display: "block", width: "100%", height: "100%", objectFit: "cover" }}
    />
  );

  if (!withFrame) {
    return (
      <div className={`relative overflow-hidden rounded-2xl ${className}`}>
        {video}
        {badgeBottom}
        {badgeTop}
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {/* Mac-style browser frame */}
      <div
        className="relative w-full rounded-2xl overflow-hidden border border-white/[0.07]"
        style={{ background: "#0c1321", boxShadow: "0 40px 80px rgba(0,0,0,0.55)" }}
      >
        {/* Title bar */}
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

        {/* Video — explicit aspect ratio via padding trick for cross-browser safety */}
        <div style={{ position: "relative", paddingBottom: "56.25%", height: 0, overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0 }}>
            {video}
          </div>
        </div>
      </div>

      {badgeBottom}
      {badgeTop}
    </div>
  );
}
