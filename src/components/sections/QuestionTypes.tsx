"use client";

import { motion, useInView, type Variants } from "motion/react";
import { useRef } from "react";
import {
  Type, AlignLeft, Mail, Hash, Phone, ChevronDown, ToggleLeft,
  Star, Calendar, Clock, DollarSign, Percent, MapPin, FileUp,
  ScrollText, Image, SlidersHorizontal, List,
} from "lucide-react";
import { questionTypes } from "@/content";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { DoodleBackground } from "@/components/ui/DoodleBackground";

const ICON_MAP: Record<string, React.ElementType> = {
  Type, AlignLeft, Mail, Hash, Phone, ChevronDown, ToggleLeft,
  Star, Calendar, Clock, DollarSign, Percent, MapPin, FileUp,
  ScrollText, Image, SlidersHorizontal, List,
};

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04 } },
};

const tile: Variants = {
  hidden: { opacity: 0, y: 16, filter: "blur(8px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.4, ease: "easeOut" } },
};

export default function QuestionTypes() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="relative py-16 md:py-28 px-4 sm:px-6 border-t border-border bg-background overflow-hidden">
      <DoodleBackground variant="questions" />
      <div className="relative max-w-6xl mx-auto z-10">
        <ScrollReveal className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-accent mb-3 block">
              Question Types
          </span>
            <h2 className="heading-display text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
              18+ powerful input types
          </h2>
          </div>
          <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
            Every field type you need, with full validation and customization built in.
          </p>
        </ScrollReveal>

        <motion.div
          ref={ref}
          variants={container}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3"
        >
          {questionTypes.slice(0, 12).map((qt) => {
            const Icon = ICON_MAP[qt.icon] ?? Type;
            return (
              <motion.div
                key={qt.type}
                variants={tile}
                whileHover={{ y: -3, transition: { duration: 0.15 } }}
                className="group rounded-xl border border-border bg-surface p-4 flex flex-col items-start gap-3 hover:border-border-hover hover:bg-surface-hover transition-all cursor-default"
              >
                <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/15 flex items-center justify-center group-hover:bg-accent/15 transition-colors">
                  <Icon className="w-3.5 h-3.5 text-accent" />
                </div>
                <h4 className="text-xs font-semibold text-foreground leading-snug">
                  {qt.label}
                </h4>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
