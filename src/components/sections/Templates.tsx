"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { templates } from "@/content";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export default function Templates() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="templates" className="py-16 md:py-28 px-4 sm:px-6 border-t border-border bg-background">
      <div className="max-w-6xl mx-auto">

        <ScrollReveal className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-accent mb-3 block">
            Templates
          </span>
            <h2 className="heading-display text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
              Start with a pre-built template
          </h2>
          </div>
          <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
            Professionally designed and fully customizable. Launch in minutes.
          </p>
        </ScrollReveal>

        {/* Cards */}
        <div ref={ref} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {templates.map((tmpl, i) => (
            <motion.div
              key={tmpl.slug}
              initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
              animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
              transition={{ duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="group rounded-2xl border border-border bg-surface p-5 flex flex-col gap-3 hover:border-border-hover hover:-translate-y-1 transition-all duration-300"
            >
              {/* Color accent bar */}
              <div className="w-8 h-1 rounded-full bg-accent opacity-60 mb-1" />
              <h3 className="text-sm font-bold text-foreground leading-snug">
                {tmpl.title}
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed flex-1 line-clamp-3">
                {tmpl.description}
              </p>
              <a
                href="#"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent hover:underline mt-auto pt-2 group/link"
              >
                Use template
                <ArrowRight className="w-3 h-3 group-hover/link:translate-x-0.5 transition-transform" />
              </a>
            </motion.div>
          ))}
        </div>

        {/* View all */}
        <ScrollReveal delay={0.4} className="mt-10 flex justify-center">
          <a
            href="#"
            className="inline-flex items-center gap-2 text-sm font-medium px-5 py-2.5 rounded-xl border border-border text-foreground hover:bg-surface transition-colors"
          >
            View All Templates
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
}
