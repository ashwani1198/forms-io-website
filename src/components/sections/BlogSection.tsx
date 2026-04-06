"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { ArrowRight, Clock, Tag } from "lucide-react";
import Link from "next/link";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { blogPosts } from "@/content";
import type { BlogPost } from "@/content/types";

/* ── Doodle components — pure SVG, no content ── */
function ChartDoodle({ hovered }: { hovered: boolean }) {
  return (
    <svg viewBox="0 0 120 80" className="w-24 h-16" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M 10 70 L 110 70" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
      <path d="M 10 70 L 10 10" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
      {[{ x: 20, h: 30, d: 0 }, { x: 40, h: 50, d: 0.05 }, { x: 60, h: 40, d: 0.1 }, { x: 80, h: 60, d: 0.15 }, { x: 100, h: 45, d: 0.2 }].map((bar) => (
        <motion.rect
          key={bar.x} x={bar.x - 7} y={70 - bar.h} width={14} height={bar.h} rx={3}
          fill="currentColor" className="text-accent"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: hovered ? 1 : 0.6 }}
          transition={{ duration: 0.4, delay: bar.d, ease: "easeOut" }}
          style={{ transformOrigin: "bottom" }}
        />
      ))}
      {hovered && (
        <motion.path d="M 20 55 C 40 40, 60 50, 80 30 C 90 22, 100 28, 108 20"
          stroke="currentColor" strokeWidth="1.5" className="text-accent"
          strokeDasharray="60"
          initial={{ strokeDashoffset: 60, opacity: 0 }}
          animate={{ strokeDashoffset: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        />
      )}
    </svg>
  );
}

function PencilDoodle({ hovered }: { hovered: boolean }) {
  return (
    <svg viewBox="0 0 120 80" className="w-24 h-16" fill="none" strokeLinecap="round" strokeLinejoin="round">
      {[20, 35, 50, 65].map((y) => (
        <motion.path key={y} d={`M 10 ${y} L 80 ${y}`} stroke="currentColor" strokeWidth="1.5" opacity={0.2}
          animate={{ x: hovered ? 4 : 0 }} transition={{ duration: 0.3 }} />
      ))}
      {hovered && [20, 35, 50].map((y, i) => (
        <motion.path key={`fill-${y}`} d={`M 10 ${y} L ${30 + i * 15} ${y}`}
          stroke="currentColor" strokeWidth="2" className="text-accent"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ duration: 0.3, delay: i * 0.08 }} />
      ))}
      <motion.g animate={{ x: hovered ? 30 : 0, rotate: hovered ? -10 : 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }} style={{ transformOrigin: "95px 20px" }}>
        <path d="M 85 15 L 100 30 L 95 35 L 80 20 Z" stroke="currentColor" strokeWidth="1.5" />
        <path d="M 100 30 L 105 25 L 90 10 L 85 15" stroke="currentColor" strokeWidth="1.5" />
        <path d="M 95 35 L 92 40 L 98 38 Z" fill="currentColor" className="text-accent" />
      </motion.g>
    </svg>
  );
}

function LinkDoodle({ hovered }: { hovered: boolean }) {
  return (
    <svg viewBox="0 0 120 80" className="w-24 h-16" fill="none" strokeLinecap="round" strokeLinejoin="round">
      {[{ cx: 20, cy: 40 }, { cx: 60, cy: 20 }, { cx: 60, cy: 60 }, { cx: 100, cy: 40 }].map((n, i) => (
        <motion.circle key={i} cx={n.cx} cy={n.cy} r={6} stroke="currentColor" fill="currentColor"
          className={i === 0 || (hovered && i === 3) ? "text-accent" : "text-border"}
          strokeWidth="1.5"
          animate={{ scale: hovered && (i === 0 || i === 3) ? 1.3 : 1 }}
          transition={{ duration: 0.3, delay: i * 0.05 }} />
      ))}
      {[{ x1: 26, y1: 37, x2: 54, y2: 22 }, { x1: 26, y1: 43, x2: 54, y2: 58 }, { x1: 66, y1: 22, x2: 94, y2: 38 }, { x1: 66, y1: 58, x2: 94, y2: 42 }].map((l, i) => (
        <motion.line key={i} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
          stroke="currentColor" strokeWidth="1.5"
          className={hovered ? "text-accent" : "text-border"}
          strokeDasharray="30"
          initial={{ strokeDashoffset: 30 }}
          animate={{ strokeDashoffset: hovered ? 0 : 30 }}
          transition={{ duration: 0.4, delay: i * 0.08 }} />
      ))}
      {hovered && (
        <motion.circle cx={100} cy={40} r={10} stroke="currentColor" className="text-accent"
          strokeWidth="1" fill="none"
          initial={{ scale: 0.8, opacity: 1 }}
          animate={{ scale: 2, opacity: 0 }}
          transition={{ duration: 0.8, repeat: Infinity }} />
      )}
    </svg>
  );
}

const DOODLES: Record<string, React.FC<{ hovered: boolean }>> = {
  chart: ChartDoodle,
  pencil: PencilDoodle,
  link: LinkDoodle,
};

function BlogCard({ post, index }: { post: BlogPost; index: number }) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const Doodle = DOODLES[post.doodle] ?? ChartDoodle;
  const tag = post.tags[0] ?? "";

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 28, filter: "blur(10px)" }}
      animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.55, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="group flex flex-col rounded-2xl border border-border bg-surface hover:border-border-hover transition-all duration-300 overflow-hidden cursor-pointer"
    >
      <Link href={`/blog/${post.slug}`} className="flex flex-col flex-1">
        {/* Doodle area */}
        <div className="relative h-40 border-b border-border bg-background flex items-center justify-center overflow-hidden">
          <svg className="absolute inset-0 w-full h-full opacity-[0.04]" viewBox="0 0 200 100">
            <path d="M 0 50 Q 50 20 100 50 Q 150 80 200 50" stroke="currentColor" strokeWidth="1" fill="none" />
            <path d="M 0 70 Q 50 40 100 70 Q 150 100 200 70" stroke="currentColor" strokeWidth="1" fill="none" />
          </svg>
          <div className="absolute top-3 left-3 flex items-center gap-1 px-2 py-1 rounded-full border border-border bg-surface text-[10px] font-semibold text-muted-foreground">
            <Tag className="w-2.5 h-2.5" />
            {tag}
          </div>
          <motion.div animate={{ y: hovered ? -4 : 0 }} transition={{ duration: 0.35, ease: "easeOut" }}
            className="text-foreground">
            <Doodle hovered={hovered} />
          </motion.div>
          {[{ x: "10%", y: "25%" }, { x: "85%", y: "20%" }, { x: "90%", y: "75%" }].map((pos, i) => (
            <motion.div key={i} className="absolute w-1 h-1 rounded-full bg-accent"
              style={{ left: pos.x, top: pos.y }}
              animate={{ opacity: hovered ? [0, 1, 0] : 0, scale: hovered ? [0.5, 1.5, 0.5] : 1 }}
              transition={{ repeat: hovered ? Infinity : 0, duration: 1.4, delay: i * 0.2 }} />
          ))}
        </div>
        {/* Content */}
        <div className="flex flex-col flex-1 p-6 gap-3">
          <h3 className="text-base font-bold text-foreground tracking-tight leading-snug group-hover:text-accent transition-colors">
            {post.title}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed flex-1">{post.description}</p>
          <div className="flex items-center justify-between mt-2 pt-4 border-t border-border">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Clock className="w-3 h-3" />
              <span className="text-xs">{post.readTime}</span>
            </div>
            <motion.div animate={{ x: hovered ? 4 : 0 }} transition={{ duration: 0.2 }}
              className="flex items-center gap-1 text-xs font-semibold text-accent">
              Read article <ArrowRight className="w-3 h-3" />
            </motion.div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

export default function BlogSection() {
  return (
    <section className="py-16 md:py-28 px-4 sm:px-6 border-t border-border bg-background">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-accent mb-3 block">From the blog</span>
            <h2 className="heading-display text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
              Insights for form builders
            </h2>
          </div>
          <Link href="/blog" className="shrink-0 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group">
            View all posts
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </ScrollReveal>
        <div className="grid md:grid-cols-3 gap-5">
          {blogPosts.map((post, i) => (
            <BlogCard key={post.slug} post={post} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
