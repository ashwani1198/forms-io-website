"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";
import { Play, Pause, Volume2, VolumeX, Maximize2 } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { DEMO_VIDEO_SRC } from "@/content/site";

/* ── Video Player ── */
function VideoPlayer() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [progress, setProgress] = useState(0); // 0–100
  const [duration, setDuration] = useState(0);
  const [current, setCurrent] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [scrubbing, setScrubbing] = useState(false);

  /* ── Sync state from video element ── */
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const onMeta = () => setDuration(v.duration);
    const onTime = () => {
      setCurrent(v.currentTime);
      setProgress((v.currentTime / v.duration) * 100 || 0);
    };
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onEnd = () => {
      setPlaying(false);
      setProgress(0);
    };

    v.addEventListener("loadedmetadata", onMeta);
    v.addEventListener("timeupdate", onTime);
    v.addEventListener("play", onPlay);
    v.addEventListener("pause", onPause);
    v.addEventListener("ended", onEnd);
    return () => {
      v.removeEventListener("loadedmetadata", onMeta);
      v.removeEventListener("timeupdate", onTime);
      v.removeEventListener("play", onPlay);
      v.removeEventListener("pause", onPause);
      v.removeEventListener("ended", onEnd);
    };
  }, []);

  const togglePlay = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) v.play();
    else v.pause();
  }, []);

  const toggleMute = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  }, []);

  const seekTo = useCallback(
    (pct: number) => {
      const v = videoRef.current;
      if (!v || !duration) return;
      v.currentTime = (pct / 100) * duration;
    },
    [duration],
  );

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    seekTo(((e.clientX - rect.left) / rect.width) * 100);
  };

  const handleFullscreen = () => {
    containerRef.current?.requestFullscreen?.();
  };

  const fmt = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60)
      .toString()
      .padStart(2, "0");
    return `${m}:${sec}`;
  };

  const controlsVisible = hovered || !playing;

  return (
    <div
      ref={containerRef}
      className="rounded-2xl overflow-hidden border border-white/[0.07]"
      style={{
        background: "#090f1c",
        boxShadow: "0 40px 100px rgba(0,0,0,0.65)",
      }}
    >
      {/* ── Title bar ── */}
      <div
        className="flex items-center justify-between px-5 py-3 border-b border-white/[0.06]"
        style={{ background: "rgba(13,20,36,0.9)" }}
      >
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57] shadow-[0_0_8px_rgba(255,95,87,0.4)]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e] shadow-[0_0_8px_rgba(254,188,46,0.3)]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#28c840] shadow-[0_0_8px_rgba(40,200,64,0.3)]" />
          </div>
          <span className="text-[10px] text-white/40 font-bold tracking-[0.1em] uppercase">
            Feature Walkthrough
          </span>
        </div>
        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full border border-white/20 bg-white/5">
          <div className="w-1 h-1 rounded-full bg-white animate-pulse" />
          <span className="text-[9px] font-bold text-white tracking-wider">
            HD
          </span>
        </div>
      </div>

      {/* ── Video area ── */}
      <div
        className="relative w-full aspect-video bg-black cursor-pointer group"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={togglePlay}
      >
        <video
          ref={videoRef}
          src={DEMO_VIDEO_SRC}
          muted={muted}
          playsInline
          preload="metadata"
          className="w-full h-full object-cover"
        />

        {/* Big play button overlay when paused */}
        <AnimatePresence>
          {!playing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center bg-black/40"
            >
              <motion.div
                initial={{ scale: 0.85 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.85 }}
                className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-2xl"
              >
                <Play className="w-7 h-7 text-black ml-1" fill="black" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hover controls bar */}
        <motion.div
          initial={false}
          animate={{
            opacity: controlsVisible ? 1 : 0,
            y: controlsVisible ? 0 : 6,
          }}
          transition={{ duration: 0.2 }}
          className="absolute bottom-0 left-0 right-0 px-4 pb-3 pt-8 pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 100%)",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Progress bar */}
          <div
            className="relative h-1 rounded-full bg-white/20 mb-3 cursor-pointer pointer-events-auto group/bar"
            onClick={handleProgressClick}
            onMouseDown={() => setScrubbing(true)}
            onMouseUp={() => setScrubbing(false)}
          >
            <motion.div
              className="absolute inset-y-0 left-0 rounded-full bg-violet-500"
              style={{ width: `${progress}%` }}
              transition={{ duration: 0.05, ease: "linear" }}
            />
            <motion.div
              className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white shadow-[0_0_12px_rgba(139,92,246,0.8)] opacity-0 group-hover/bar:opacity-100 transition-opacity"
              style={{ left: `calc(${progress}% - 6px)` }}
            />
          </div>

          {/* Controls row */}
          <div className="flex items-center gap-3 pointer-events-auto">
            <button
              onClick={(e) => {
                e.stopPropagation();
                togglePlay();
              }}
              className="text-white/80 hover:text-white transition-colors"
            >
              {playing ? (
                <Pause className="w-4 h-4 fill-current" />
              ) : (
                <Play className="w-4 h-4 fill-current" />
              )}
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleMute();
              }}
              className="text-white/50 hover:text-white/80 transition-colors"
            >
              {muted ? (
                <VolumeX className="w-4 h-4" />
              ) : (
                <Volume2 className="w-4 h-4" />
              )}
            </button>

            <span className="text-[11px] text-white/30 tabular-nums ml-1">
              {fmt(current)}{" "}
              <span className="text-white/15">/ {fmt(duration)}</span>
            </span>

            <div className="flex-1" />

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleFullscreen();
              }}
              className="text-white/40 hover:text-white/70 transition-colors"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/* ── Section ── */
export default function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="how-it-works"
      className="py-16 md:py-28 px-4 sm:px-6 border-t border-border bg-background"
    >
      <div className="max-w-5xl mx-auto">
        <ScrollReveal className="text-center mb-14">
          <span className="text-xs font-semibold uppercase tracking-widest text-accent mb-3 block">
            How it works
          </span>
          <h2 className="heading-display text-3xl sm:text-4xl font-bold text-foreground tracking-tight mb-3">
            See the full workflow
          </h2>
          <p className="text-muted-foreground text-base leading-relaxed max-w-md mx-auto">
            From blank canvas to live, logic-powered form — watch how it works
            in under three minutes.
          </p>
        </ScrollReveal>

        <div ref={ref}>
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.97, filter: "blur(16px)" }}
            animate={
              inView ? { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" } : {}
            }
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            <VideoPlayer />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
