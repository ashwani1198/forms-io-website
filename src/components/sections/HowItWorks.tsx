"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "motion/react";
import {
  Play,
  Pause,
  SkipForward,
  CheckCircle2,
  PlusCircle,
  Settings2,
  GitBranch,
  Share2,
  BarChart3,
  MousePointer2,
} from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { chapters, steps } from "@/content";
import type { Chapter, SceneData } from "@/content/types";

/* ── Icon map — driven by content icon string ── */
const ICON_MAP: Record<string, React.ElementType> = {
  PlusCircle,
  Settings2,
  GitBranch,
  Share2,
  BarChart3,
};

type SceneProps = { color: string; data: SceneData };

/* ── Cursor component for scenes ── */
function Cursor({ x, y, active }: { x: string; y: string; active: boolean }) {
  return (
    <motion.div
      className="absolute z-50 pointer-events-none"
      animate={{
        left: x,
        top: y,
        scale: active ? 0.9 : 1,
        opacity: [0, 1, 1, 1, 0],
      }}
      transition={{
        left: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
        top: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
        scale: { duration: 0.15 },
        opacity: { times: [0, 0.1, 0.9, 1], duration: 4.5 },
      }}
    >
      <div className="relative">
        <MousePointer2
          className="w-5 h-5 text-white drop-shadow-xl rotate-[-20deg]"
          fill="black"
        />
        {active && (
          <motion.div
            initial={{ scale: 0.5, opacity: 0.8 }}
            animate={{ scale: 2, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute -inset-1 rounded-full bg-white/40 ring-4 ring-white/10"
          />
        )}
      </div>
    </motion.div>
  );
}

/* ───────────────────────────────────────────
   Scenes — pure presentational, all data via props
──────────────────────────────────────────── */
function SceneCreate({ color, data }: SceneProps) {
  const fields = data.fields ?? [];
  const [visible, setVisible] = useState(0);
  useEffect(() => {
    let i = 0;
    const t = setInterval(() => {
      i++;
      setVisible(i);
      if (i >= fields.length) clearInterval(t);
    }, 660);
    return () => clearInterval(t);
  }, [fields.length]);
  return (
    <div className="flex flex-col gap-2.5 w-full max-w-sm mx-auto relative h-full justify-center">
      <Cursor
        x={visible < fields.length ? "80%" : "50%"}
        y={visible < fields.length ? `${30 + visible * 12}%` : "85%"}
        active={visible >= fields.length}
      />
      <p className="text-[10px] uppercase tracking-[0.2em] text-white/30 mb-1 font-bold">
        Admin · New Form
      </p>
      {fields.map((f, i) => (
        <motion.div
          key={f.text}
          animate={{
            opacity: i < visible ? 1 : 0,
            y: i < visible ? 0 : 10,
            borderColor:
              i === visible - 1 ? `${color}40` : "rgba(255,255,255,0.07)",
            background:
              i === visible - 1 ? `${color}08` : "rgba(255,255,255,0.025)",
          }}
          transition={{ duration: 0.3 }}
          className="flex items-center gap-3 px-4 py-2.5 rounded-xl border relative overflow-hidden"
        >
          {i === visible - 1 && (
            <motion.div
              className="absolute inset-y-0 left-0 w-1 bg-violet-500"
              layoutId="activeField"
            />
          )}
          <span
            className="w-1.5 h-1.5 rounded-full flex-shrink-0"
            style={{ background: color }}
          />
          <span className="text-[11px] text-white/70 font-medium">
            {f.text}
          </span>
          {i === visible - 1 && i < fields.length && (
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ repeat: Infinity, duration: 1 }}
              className="ml-auto w-0.5 h-3 rounded bg-violet-400/50"
            />
          )}
        </motion.div>
      ))}
      <AnimatePresence>
        {visible >= fields.length && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="mt-1"
          >
            <button
              className="w-full py-2.5 rounded-xl text-white text-[11px] font-bold shadow-[0_0_20px_rgba(139,92,246,0.25)] border border-white/10 hover:brightness-110 transition-all"
              style={{
                background: `linear-gradient(135deg, ${color}, #6d28d9)`,
              }}
            >
              + Save &amp; continue
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function SceneConfigure({ color, data }: SceneProps) {
  const types = data.types ?? [];
  const [active, setActive] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setActive((a) => (a + 1) % types.length), 700);
    return () => clearInterval(t);
  }, [types.length]);
  return (
    <div className="w-full max-w-sm mx-auto relative h-full flex flex-col justify-center">
      <Cursor
        x={`${25 + (active % 2) * 50}%`}
        y={`${45 + Math.floor(active / 2) * 20}%`}
        active={true}
      />
      <p className="text-[10px] uppercase tracking-[0.2em] text-white/30 mb-3 font-bold">
        Question type selector
      </p>
      <div className="grid grid-cols-2 gap-2">
        {types.map((t, i) => (
          <motion.div
            key={t}
            animate={{
              borderColor: i === active ? color : "rgba(255,255,255,0.06)",
              background:
                i === active ? `${color}20` : "rgba(255,255,255,0.02)",
              scale: i === active ? 1.05 : 1,
              boxShadow: i === active ? `0 0 20px ${color}15` : "none",
            }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-2 px-3 py-2.5 rounded-xl border cursor-pointer group"
          >
            <span
              className="w-1.5 h-1.5 rounded-full flex-shrink-0"
              style={{
                background: i === active ? color : "rgba(255,255,255,0.1)",
              }}
            />
            <span
              className="text-[10px] font-bold tracking-tight transition-colors"
              style={{
                color: i === active ? "white" : "rgba(255,255,255,0.25)",
              }}
            >
              {t}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function SceneLogic({ color, data }: SceneProps) {
  const rules = data.rules ?? [];
  const [drawn, setDrawn] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setDrawn(true), 500);
    return () => clearTimeout(t);
  }, []);
  return (
    <div className="w-full max-w-sm mx-auto relative h-full flex flex-col justify-center">
      <Cursor x="50%" y="60%" active={drawn} />
      <motion.div className="absolute top-0 right-0 p-2 rounded-lg bg-violet-500/10 border border-violet-500/20 text-[8px] font-bold text-violet-400">
        + Add logic rules
      </motion.div>
      <p className="text-[10px] uppercase tracking-[0.2em] text-white/30 mb-3 font-bold">
        Conditional logic builder
      </p>
      <div className="flex flex-col gap-2.5">
        {rules.map((r, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: drawn ? 1 : 0, x: drawn ? 0 : -10 }}
            transition={{ delay: i * 0.14, duration: 0.35 }}
            className="flex items-center gap-3 px-3.5 py-3 rounded-xl border backdrop-blur-sm"
            style={{
              borderColor: `${color}40`,
              background: `linear-gradient(90deg, ${color}05, transparent)`,
              boxShadow: `inset 0 0 20px ${color}03`,
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full flex-shrink-0"
              style={{ background: color }}
            />
            <span className="text-[10px] text-white/40 font-medium">
              {r.cond}
            </span>
            <motion.span
              initial={{ width: 0 }}
              animate={{ width: drawn ? 32 : 0 }}
              transition={{ delay: i * 0.14 + 0.2, duration: 0.25 }}
              className="h-px mx-1 rounded-full"
              style={{
                background: `linear-gradient(90deg, ${color}, transparent)`,
              }}
            />
            <span
              className="text-[10px] font-bold tracking-tight"
              style={{ color }}
            >
              {r.action}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function ScenePublish({ color, data }: SceneProps) {
  const slug = data.slug ?? "formsio.io/my-form";
  const [copied, setCopied] = useState(false);
  return (
    <div className="flex flex-col gap-3 w-full max-w-sm mx-auto relative h-full justify-center">
      <Cursor x={copied ? "90%" : "60%"} y="45%" active={copied} />
      <p className="text-[10px] uppercase tracking-[0.2em] text-white/30 mb-1 font-bold">
        Publish · Share
      </p>
      <div
        className="flex items-center gap-2 px-3.5 py-3 rounded-xl border backdrop-blur-sm"
        style={{ borderColor: `${color}30`, background: `${color}05` }}
      >
        <span className="text-[11px] text-white/50 font-mono flex-1 truncate">
          {slug}
        </span>
        <button
          onClick={() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 1400);
          }}
          className="text-[9px] font-black px-3 py-1.5 rounded-lg text-white transition-all transform active:scale-95"
          style={{ background: color }}
        >
          {copied ? "COPIED" : "COPY"}
        </button>
      </div>
      <div className="flex gap-2.5">
        {["One-at-a-time", "Scroll view"].map((m, i) => (
          <span
            key={m}
            className="flex-1 text-center text-[9px] py-2 rounded-lg border font-bold uppercase tracking-wider transition-all"
            style={
              i === 0
                ? {
                    borderColor: `${color}40`,
                    color,
                    background: `${color}10`,
                    boxShadow: `inset 0 0 10px ${color}05`,
                  }
                : {
                    borderColor: "rgba(255,255,255,0.05)",
                    color: "rgba(255,255,255,0.2)",
                  }
            }
          >
            {m}
          </span>
        ))}
      </div>
      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="py-3 rounded-xl text-white text-[11px] font-black uppercase tracking-widest shadow-[0_0_30px_rgba(139,92,246,0.3)] border border-white/10"
        style={{ background: `linear-gradient(135deg, ${color}, #7c3aed)` }}
      >
        ✓ Go live now
      </motion.button>
    </div>
  );
}

function SceneAnalyze({ color, data }: SceneProps) {
  const bars = data.bars ?? [50, 70, 40, 90, 60, 55, 80, 75];
  const stats = [
    { label: "Responses", val: "127" },
    { label: "Completion", val: "94%" },
    { label: "Avg. time", val: "2m 10s" },
  ];
  return (
    <div className="w-full max-w-sm mx-auto relative h-full flex flex-col justify-center">
      <Cursor x="70%" y="40%" active={true} />
      <p className="text-[10px] uppercase tracking-[0.2em] text-white/30 mb-4 font-bold">
        Response Dashboard
      </p>
      <div className="flex items-end gap-1.5 h-20 mb-5 px-1 bg-white/[0.02] rounded-lg border border-white/[0.05] p-2">
        {bars.map((h, i) => (
          <motion.div
            key={i}
            className="flex-1 rounded-t-sm relative group"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: h / 100 }}
            transition={{ delay: i * 0.07, duration: 0.5, ease: "easeOut" }}
            style={{
              transformOrigin: "bottom",
              background: `linear-gradient(0deg, ${color}20, ${color})`,
              boxShadow: `0 0 15px ${color}30`,
            }}
          >
            <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.div>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-2.5">
        {stats.map((s) => (
          <div
            key={s.label}
            className="p-3 rounded-2xl border backdrop-blur-md text-center transition-all hover:scale-105"
            style={{ borderColor: `${color}20`, background: `${color}08` }}
          >
            <p
              className="text-sm font-black tracking-tight"
              style={{ color, textShadow: `0 0 10px ${color}40` }}
            >
              {s.val}
            </p>
            <p className="text-[8px] text-white/20 font-bold uppercase tracking-tighter mt-1">
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

const SCENE_MAP: Record<string, React.FC<SceneProps>> = {
  create: SceneCreate,
  configure: SceneConfigure,
  logic: SceneLogic,
  publish: ScenePublish,
  analyze: SceneAnalyze,
};

/* ── Video player ── */
function VideoPlayer({ inView }: { inView: boolean }) {
  const [chapterIdx, setChapterIdx] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [elapsed, setElapsed] = useState(0); // 0–100 within chapter
  const [muted, setMuted] = useState(false);
  const [sceneKey, setSceneKey] = useState(0);
  const tickRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const chapter: Chapter = chapters[chapterIdx];
  const Scene = SCENE_MAP[chapter.scene];
  const ChapterIcon = ICON_MAP[chapter.icon] ?? PlusCircle;

  // Total bar progress
  const totalProgress =
    (chapterIdx / chapters.length) * 100 + elapsed / chapters.length;

  const goTo = useCallback((idx: number) => {
    setChapterIdx(idx);
    setElapsed(0);
    setSceneKey((k) => k + 1);
  }, []);

  // Auto-start on scroll in view
  useEffect(() => {
    if (!inView) return;
    const t = setTimeout(() => setPlaying(true), 700);
    return () => clearTimeout(t);
  }, [inView]);

  // Tick engine
  useEffect(() => {
    if (!playing) {
      if (tickRef.current) clearInterval(tickRef.current);
      return;
    }
    const increment = 100 / (chapter.duration / 100);
    tickRef.current = setInterval(() => {
      setElapsed((e) => {
        if (e >= 100) {
          goTo((chapterIdx + 1) % chapters.length);
          return 0;
        }
        return e + increment;
      });
    }, 100);
    return () => {
      if (tickRef.current) clearInterval(tickRef.current);
    };
  }, [playing, chapterIdx, chapter.duration, goTo]);

  return (
    <div
      className="rounded-2xl overflow-hidden border border-white/[0.07]"
      style={{
        background: "#090f1c",
        boxShadow: "0 40px 100px rgba(0,0,0,0.65)",
      }}
    >
      {/* Title bar */}
      <div
        className="flex items-center justify-between px-5 py-3 border-b border-white/[0.06] backdrop-blur-md"
        style={{ background: "rgba(13, 20, 36, 0.7)" }}
      >
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5 ml-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57] shadow-[0_0_8px_rgba(255,95,87,0.4)]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e] shadow-[0_0_8px_rgba(254,188,46,0.3)]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#28c840] shadow-[0_0_8px_rgba(40,200,64,0.3)]" />
          </div>
          <span className="text-[10px] text-white/40 font-bold tracking-[0.1em] uppercase">
            Feature Walkthrough
          </span>
        </div>
        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full border border-white/20 bg-white/5 shadow-[0_0_15px_rgba(255,255,255,0.05)]">
          <div className="w-1 h-1 rounded-full bg-white animate-pulse" />
          <span className="text-[9px] font-bold text-white tracking-wider">
            HD
          </span>
        </div>
      </div>

      {/* Scene */}
      <div
        className="relative h-[260px] flex items-center justify-center overflow-hidden"
        style={{
          background: `radial-gradient(ellipse at 50% 0%, ${chapter.color}0d 0%, #090f1c 65%)`,
        }}
      >
        {/* Scanlines */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.025]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(255,255,255,0.6) 2px,rgba(255,255,255,0.6) 3px)",
            backgroundSize: "100% 4px",
          }}
        />

        {/* Paused overlay */}
        <AnimatePresence>
          {!playing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center z-20 cursor-pointer"
              style={{ background: "rgba(0,0,0,0.45)" }}
              onClick={() => setPlaying(true)}
            >
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-2xl"
              >
                <Play className="w-7 h-7 text-black ml-1" fill="black" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Scene content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={sceneKey}
            initial={{ opacity: 0, scale: 0.97, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 1.02, filter: "blur(10px)" }}
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
            className="w-full px-10"
          >
            <Scene color={chapter.color} data={chapter.sceneData} />
          </motion.div>
        </AnimatePresence>

        {/* Chapter badge */}
        <AnimatePresence mode="wait">
          <motion.div
            key={chapterIdx}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 text-[10px] font-semibold text-white/50 backdrop-blur-md"
            style={{ background: "rgba(255,255,255,0.06)" }}
          >
            <ChapterIcon className="w-3 h-3" />
            {chapter.title}
          </motion.div>
        </AnimatePresence>

        {/* Counter */}
        <div className="absolute bottom-4 left-5 px-2 py-1 rounded-md bg-black/40 backdrop-blur-sm border border-white/5 text-[9px] font-bold text-white/40 tracking-tighter tabular-nums">
          {chapterIdx + 1} / {chapters.length}
        </div>
      </div>

      {/* Controls bar */}
      <div
        className="flex items-center gap-4 px-5 py-3 backdrop-blur-xl border-t border-white/[0.05]"
        style={{ background: "rgba(13, 20, 36, 0.9)" }}
      >
        <button
          onClick={() => setPlaying((p) => !p)}
          className="text-white/60 hover:text-white transition-all transform active:scale-90"
        >
          {playing ? (
            <Pause className="w-4 h-4 fill-current" />
          ) : (
            <Play className="w-4 h-4 fill-current" />
          )}
        </button>
        <button
          onClick={() => goTo((chapterIdx + 1) % chapters.length)}
          className="text-white/30 hover:text-white/70 transition-colors"
        >
          <SkipForward className="w-4 h-4 fill-current" />
        </button>
        <span className="text-[11px] text-white/25 tabular-nums">
          {chapter.time} / <span className="text-white/15">2:40</span>
        </span>
        <div className="group relative flex-1 h-1.5 flex items-center">
          <div
            className="absolute inset-0 h-1 my-auto rounded-full bg-white/10 overflow-hidden cursor-pointer"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const pct = (e.clientX - rect.left) / rect.width;
              const totalIdx = pct * chapters.length;
              goTo(Math.min(Math.floor(totalIdx), chapters.length - 1));
            }}
          >
            <motion.div
              className="h-full bg-violet-500 relative"
              animate={{ width: `${totalProgress}%` }}
              transition={{ duration: 0.1, ease: "linear" }}
            >
              <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white/30 to-transparent" />
            </motion.div>
          </div>
          <motion.div
            className="absolute w-3.5 h-3.5 rounded-full bg-white shadow-[0_0_15px_rgba(139,92,246,0.8)] pointer-events-none ring-2 ring-violet-500/20"
            animate={{ left: `calc(${totalProgress}% - 7px)` }}
            transition={{ duration: 0.1, ease: "linear" }}
          />
        </div>
      </div>

      {/* Chapter list — YouTube chapters style */}
      <div
        className="border-t border-white/[0.06] px-5 py-4 backdrop-blur-lg"
        style={{ background: "rgba(9, 15, 28, 0.6)" }}
      >
        <div className="flex justify-between items-center mb-3">
          <p className="text-[9px] uppercase tracking-[0.2em] text-white/20 font-bold">
            Chapters
          </p>
          <p className="text-[9px] text-white/10 font-medium italic">
            Click to jump
          </p>
        </div>
        <div
          className="flex gap-2.5 overflow-x-auto pb-1"
          style={{ scrollbarWidth: "none" }}
        >
          {chapters.map((ch, i) => {
            const Icon = ICON_MAP[ch.icon] ?? PlusCircle;
            const isActive = i === chapterIdx;
            const isDone = i < chapterIdx;
            return (
              <motion.button
                key={ch.id}
                onClick={() => goTo(i)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                animate={{
                  borderColor: isActive
                    ? `${ch.color}50`
                    : "rgba(255,255,255,0.04)",
                  background: isActive
                    ? `${ch.color}15`
                    : "rgba(255,255,255,0.01)",
                  boxShadow: isActive ? `0 0 20px ${ch.color}10` : "none",
                }}
                transition={{ duration: 0.3 }}
                className="shrink-0 flex items-center gap-3 px-3.5 py-2.5 rounded-xl border min-w-[150px] group/item transition-all"
              >
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-transform group-hover/item:scale-110"
                  style={{
                    background: isActive
                      ? `${ch.color}25`
                      : "rgba(255,255,255,0.03)",
                  }}
                >
                  {isDone ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-white/50" />
                  ) : (
                    <Icon
                      className="w-3.5 h-3.5"
                      style={{
                        color: isActive ? ch.color : "rgba(255,255,255,0.15)",
                      }}
                    />
                  )}
                </div>
                <div className="text-left">
                  <p className="text-[8px] text-white/15 font-bold tracking-tighter mb-0.5">
                    {ch.time}
                  </p>
                  <p
                    className="text-[10px] font-bold leading-tight tracking-tight"
                    style={{
                      color: isActive
                        ? "white"
                        : isDone
                          ? "rgba(255,255,255,0.4)"
                          : "rgba(255,255,255,0.15)",
                    }}
                  >
                    {ch.title}
                  </p>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Active chapter description */}
      <AnimatePresence mode="wait">
        <motion.div
          key={chapterIdx}
          initial={{ opacity: 0, y: 6, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -6, filter: "blur(4px)" }}
          transition={{ duration: 0.3 }}
          className="px-5 py-3 border-t border-white/[0.04] text-[11px] text-white/30 leading-relaxed"
          style={{ background: "#090f1c" }}
        >
          {chapter.description}
        </motion.div>
      </AnimatePresence>
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
            <VideoPlayer inView={inView} />
          </motion.div>
        </div>

        {/* Step cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
          {steps.map((step, i) => {
            const Icon = ICON_MAP[step.icon] ?? PlusCircle;
            return (
              <ScrollReveal
                key={step.number}
                delay={i * 0.1}
                className="flex h-full"
              >
                <div className="flex flex-col flex-1 h-full gap-3.5 p-6 rounded-3xl border border-border bg-surface hover:border-violet-500/30 transition-all shadow-sm hover:shadow-xl hover:shadow-violet-500/5 group/card">
                  <div className="relative w-12 h-12 rounded-2xl border border-border bg-background flex items-center justify-center transition-transform group-hover/card:scale-110 group-hover/card:rotate-3">
                    <Icon className="w-6 h-6 text-accent" strokeWidth={1.5} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-bold text-foreground mb-1.5">
                      {step.title}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
