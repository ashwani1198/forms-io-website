"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { GitBranch, Puzzle, ArrowRight, Zap, CheckCircle2 } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { DoodleBackground } from "@/components/ui/DoodleBackground";

/* ── Conditional Logic Preview ── */
function CondLogicPreview() {
  const [active, setActive] = useState(0);
  const rules = [
    { q: "Lead Generation", to: "Budget Q", color: "text-violet-400" },
    { q: "Customer Feedback", to: "Rating Q", color: "text-sky-400" },
    { q: "Event Registration", to: "Date Q", color: "text-emerald-400" },
  ];

  return (
    <div className="w-full h-full flex flex-col justify-center gap-2 p-5">
      {rules.map((r, i) => (
        <motion.div
          key={r.q}
          onHoverStart={() => setActive(i)}
          animate={{ opacity: active === i ? 1 : 0.45, x: active === i ? 4 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex items-center justify-between cursor-default select-none"
        >
          <div className="flex items-center gap-2">
            <motion.div
              animate={{ scale: active === i ? 1.25 : 1 }}
              className={`w-2 h-2 rounded-full ${active === i ? "bg-accent" : "bg-border"}`}
            />
            <span className="text-[11px] text-foreground font-medium">{r.q}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <motion.div
              animate={{ width: active === i ? 28 : 14 }}
              transition={{ duration: 0.25 }}
              className="h-px bg-border"
            />
            <span className={`text-[10px] font-semibold ${r.color}`}>→ {r.to}</span>
          </div>
        </motion.div>
      ))}
      <div className="mt-3 pt-3 border-t border-border flex items-center gap-2">
        <Zap className="w-3 h-3 text-accent" />
        <span className="text-[10px] text-muted-foreground">Logic evaluated in real time</span>
      </div>
    </div>
  );
}

/* ── Extensibility Preview ── */
function ExtensibilityPreview() {
  const integrations = [
    { name: "Webhook", dot: "bg-blue-400" },
    { name: "Amazon S3", dot: "bg-orange-400" },
    { name: "Zapier", dot: "bg-yellow-400" },
    { name: "REST API", dot: "bg-green-400" },
  ];
  const [hovered, setHovered] = useState<number | null>(null);
  return (
    <div className="w-full h-full flex flex-col justify-center gap-2 p-5">
      {integrations.map((item, i) => (
        <motion.div
          key={item.name}
          onHoverStart={() => setHovered(i)}
          onHoverEnd={() => setHovered(null)}
          whileHover={{ x: 4 }}
          className="flex items-center justify-between py-1.5 cursor-default"
        >
          <div className="flex items-center gap-2.5">
            <div className={`w-2 h-2 rounded-full ${item.dot}`} />
            <span className="text-[11px] text-foreground font-medium">{item.name}</span>
          </div>
          <AnimatePresence>
            {hovered === i && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex items-center gap-1 text-[10px] text-accent"
              >
                <CheckCircle2 className="w-3 h-3" />
                Connected
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
}

const features = [
  {
    icon: GitBranch,
    badge: "Logic Engine",
    title: "Advanced Conditional Logic",
    description:
      "Build complex, branching workflows. Show or skip questions dynamically based on any combination of previous answers.",
    preview: <CondLogicPreview />,
  },
  {
    icon: Puzzle,
    badge: "Integrations",
    title: "Extensibility by Design",
    description:
      "Connect webhooks, upload to S3, trigger Zapier workflows, or call any REST endpoint. Your form, your stack.",
    preview: <ExtensibilityPreview />,
  },
];

export default function Features() {
  return (
    <section id="features" className="relative py-16 md:py-28 px-4 sm:px-6 border-t border-border bg-background overflow-hidden">
      <DoodleBackground variant="features" />
      <div className="relative max-w-6xl mx-auto z-10">

        {/* Header */}
        <ScrollReveal className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
          <div>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-accent mb-3">
              <Zap className="w-3 h-3" />
              Features
            </span>
            <h2 className="heading-display text-3xl sm:text-4xl font-bold text-foreground tracking-tight max-w-lg">
              Everything you need to build forms that convert
            </h2>
          </div>
          <a
            href="#"
            className="shrink-0 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group"
          >
            See all features
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </a>
        </ScrollReveal>

        {/* Cards — two column full-width bento */}
        <div className="grid md:grid-cols-2 gap-5">
          {features.map((feat, i) => {
            const Icon = feat.icon;
            return (
              <ScrollReveal key={feat.title} delay={i * 0.12}>
                <div className="group flex flex-col rounded-2xl border border-border bg-surface hover:border-border-hover transition-all duration-300 overflow-hidden h-full">
                  {/* Interactive preview window */}
                  <div className="relative border-b border-border bg-background h-[200px] overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 flex items-center gap-1.5 px-3.5 py-2.5 border-b border-border bg-surface z-10">
                      <div className="w-2 h-2 rounded-full bg-border" />
                      <div className="w-2 h-2 rounded-full bg-border" />
                      <div className="w-2 h-2 rounded-full bg-border" />
                      <span className="ml-2 text-[9px] text-muted-foreground font-mono uppercase tracking-widest">
                        {feat.badge}
                      </span>
                    </div>
                    <div className="pt-9 h-full">{feat.preview}</div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col gap-3 flex-1">
                    <div className="w-9 h-9 rounded-xl bg-accent/10 border border-accent/15 flex items-center justify-center">
                      <Icon className="w-4 h-4 text-accent" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-foreground tracking-tight mb-1.5">
                        {feat.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {feat.description}
                      </p>
                    </div>
                    <a
                      href="#"
                      className="mt-auto inline-flex items-center gap-1 text-xs font-semibold text-accent hover:underline pt-2 group/link"
                    >
                      Learn more
                      <ArrowRight className="w-3 h-3 group-hover/link:translate-x-0.5 transition-transform" />
                    </a>
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
