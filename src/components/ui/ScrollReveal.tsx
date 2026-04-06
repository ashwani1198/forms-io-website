"use client";

import { useRef, type ReactNode } from "react";
import { motion, useInView } from "motion/react";

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  /** y offset to animate from (default 32) */
  y?: number;
}

/**
 * Cult-UI style blur + fade + slide reveal on scroll.
 * Wrap any section content inside this for consistent scroll animations.
 */
export function ScrollReveal({ children, delay = 0, className = "", y = 32 }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y, filter: "blur(12px)" }}
      animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Stagger wrapper — children get staggered ScrollReveal automatically */
export function ScrollRevealGroup({
  children,
  className = "",
  stagger = 0.1,
  baseDelay = 0,
}: {
  children: ReactNode[];
  className?: string;
  stagger?: number;
  baseDelay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px 0px" });

  return (
    <div ref={ref} className={className}>
      {(children as ReactNode[]).map((child, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
          animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{
            duration: 0.65,
            delay: baseDelay + i * stagger,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  );
}
