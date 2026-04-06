"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { GitBranch, ArrowRight, Eye, EyeOff, MoveRight } from "lucide-react";
import { conditionalRules } from "@/content";

const ICON_MAP: Record<string, React.ElementType> = { Eye, EyeOff, MoveRight };

export default function ConditionalBanner() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-28 px-6 border-t border-border bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — text */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-6"
          >
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center">
                <GitBranch className="w-4 h-4 text-accent" />
              </div>
              <span className="text-xs font-semibold uppercase tracking-widest text-accent">
                Conditional Logic
              </span>
            </div>

            <h2 className="heading-display text-4xl font-bold text-foreground tracking-tight leading-tight">
              Smart branching that guides every respondent
            </h2>

            <p className="text-muted-foreground text-lg leading-relaxed">
              Build rules that show, hide, or skip sections based on any answer.
              Evaluate conditions client-side for instant, seamless transitions — no server round-trips.
            </p>

            <ul className="flex flex-col gap-3">
              {[
                "8 operators: equals, contains, greater than, is empty…",
                "Target questions, sections, or jump anywhere in the form",
                "Client-side evaluation for instant UX",
                "Server-side re-validation on submission to prevent bypass",
              ].map((point) => (
                <li key={point} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                  {point}
                </li>
              ))}
            </ul>

            <a
              href="#"
              className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:underline transition-colors mt-2 w-fit"
            >
              Learn about conditional logic
              <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>

          {/* Right — rule cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex flex-col gap-3"
          >
            <div className="rounded-t-xl border border-border bg-surface px-4 py-3 flex items-center gap-2">
              <GitBranch className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground font-medium">Logic Builder</span>
              <span className="ml-auto text-xs text-muted-foreground/60">
                {conditionalRules.length} rules active
              </span>
            </div>

            {conditionalRules.map((rule, i) => {
              const Icon = ICON_MAP[rule.icon] ?? Eye;
              return (
                <motion.div
                  key={rule.condition}
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.12 }}
                  className={`rounded-xl border p-4 flex flex-col gap-3 ${rule.border}`}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-md bg-surface-highest flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-[10px] text-muted-foreground font-bold">IF</span>
                    </div>
                    <p className="text-sm text-foreground">{rule.condition}</p>
                  </div>
                  <div className="ml-9 flex items-center gap-2">
                    <div className="w-px h-4 bg-border ml-[-0.5px]" />
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-md bg-surface-highest flex items-center justify-center shrink-0">
                      <Icon className={`w-3 h-3 ${rule.color}`} />
                    </div>
                    <p className="text-sm text-muted-foreground">{rule.action}</p>
                  </div>
                </motion.div>
              );
            })}

            <div className="rounded-xl border border-dashed border-border p-4 flex items-center justify-center gap-2 text-sm text-muted-foreground/50 cursor-default">
              <span>+ Add rule</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
