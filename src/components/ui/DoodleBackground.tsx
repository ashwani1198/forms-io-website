import { cn } from "@/lib/utils";
import { motion } from "motion/react";

type Variant = "hero" | "cta" | "features" | "questions";

interface DoodleBackgroundProps {
  variant?: Variant;
  className?: string;
}

function CTAStrokes() {
  return (
    <>
      {/* Pink strokes — top-left */}
      <line x1="138" y1="38" x2="202" y2="88" stroke="#f472b6" strokeWidth="3.2" strokeLinecap="round" opacity="0.85" />

      {/* Pink strokes — top-right */}
      <line x1="1008" y1="28" x2="1058" y2="75" stroke="#f472b6" strokeWidth="3" strokeLinecap="round" opacity="0.80" />
      <line x1="1090" y1="14" x2="1140" y2="58" stroke="#f472b6" strokeWidth="2.5" strokeLinecap="round" opacity="0.70" />

      {/* Gray strokes — upper-right cluster */}
      <line x1="895" y1="88" x2="935" y2="122" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" opacity="0.20" />
      <line x1="778" y1="108" x2="808" y2="135" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity="0.16" />

      {/* Gray strokes — left mid */}
      <line x1="62" y1="260" x2="95" y2="292" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity="0.18" />

      {/* Gray strokes — bottom-left cluster */}
      <line x1="82" y1="385" x2="128" y2="418" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.18" />
      <line x1="148" y1="428" x2="192" y2="458" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" opacity="0.14" />

      {/* Gray strokes — bottom-right cluster */}
      <line x1="845" y1="392" x2="888" y2="424" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.18" />
      <line x1="955" y1="352" x2="992" y2="382" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity="0.15" />
      <line x1="1062" y1="388" x2="1098" y2="418" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" opacity="0.13" />

      {/* Pink watercolor blob — bottom-left */}
      <ellipse cx="78" cy="468" rx="62" ry="34" fill="#f472b6" opacity="0.10" />
      <ellipse cx="105" cy="480" rx="38" ry="20" fill="#f472b6" opacity="0.07" />

      {/* Extra scattered marks */}
      <line x1="310" y1="45" x2="342" y2="68" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.12" />
      <line x1="870" y1="460" x2="905" y2="488" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.11" />
      <line x1="500" y1="490" x2="540" y2="512" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" opacity="0.10" />
    </>
  );
}

function FeaturesStrokes() {
  return (
    <>
      {/* Pink accent — top-right */}
      <line x1="1048" y1="42" x2="1098" y2="80" stroke="#f472b6" strokeWidth="2.8" strokeLinecap="round" opacity="0.72" />
      <line x1="1108" y1="24" x2="1148" y2="58" stroke="#f472b6" strokeWidth="2.2" strokeLinecap="round" opacity="0.60" />

      {/* Pink accent — bottom-left */}
      <line x1="58" y1="430" x2="102" y2="462" stroke="#f472b6" strokeWidth="2.4" strokeLinecap="round" opacity="0.65" />

      {/* Gray — top-left cluster */}
      <line x1="62" y1="52" x2="102" y2="82" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.18" />
      <line x1="95" y1="32" x2="130" y2="60" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" opacity="0.14" />

      {/* Gray — right mid */}
      <line x1="1102" y1="238" x2="1145" y2="268" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity="0.16" />
      <line x1="1080" y1="268" x2="1118" y2="295" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.13" />

      {/* Gray — left mid */}
      <line x1="42" y1="280" x2="80" y2="308" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" opacity="0.15" />

      {/* Gray — bottom scattered */}
      <line x1="155" y1="448" x2="195" y2="475" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.15" />
      <line x1="528" y1="465" x2="568" y2="492" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" opacity="0.12" />
      <line x1="882" y1="435" x2="922" y2="462" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity="0.14" />

      {/* Pink smudge blob — top-right corner */}
      <ellipse cx="1140" cy="58" rx="52" ry="28" fill="#f472b6" opacity="0.08" />

      {/* Gray stray marks */}
      <line x1="340" y1="30" x2="372" y2="52" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" opacity="0.11" />
      <line x1="740" y1="48" x2="775" y2="72" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" opacity="0.10" />
    </>
  );
}

function QuestionsStrokes() {
  return (
    <>
      {/* Pink accents — corners */}
      <line x1="65" y1="38" x2="108" y2="72" stroke="#f472b6" strokeWidth="2.8" strokeLinecap="round" opacity="0.70" />
      <line x1="1092" y1="28" x2="1138" y2="64" stroke="#f472b6" strokeWidth="2.6" strokeLinecap="round" opacity="0.68" />

      {/* Gray — top scattered */}
      <line x1="285" y1="25" x2="320" y2="52" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" opacity="0.14" />
      <line x1="752" y1="32" x2="788" y2="58" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" opacity="0.13" />
      <line x1="510" y1="18" x2="545" y2="42" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.11" />

      {/* Gray — mid sides */}
      <line x1="38" y1="218" x2="75" y2="248" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity="0.16" />
      <line x1="1118" y1="188" x2="1155" y2="218" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity="0.15" />

      {/* Gray — bottom scattered across width */}
      <line x1="108" y1="390" x2="146" y2="420" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity="0.16" />
      <line x1="285" y1="418" x2="320" y2="445" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.12" />
      <line x1="488" y1="432" x2="525" y2="458" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.12" />
      <line x1="688" y1="415" x2="725" y2="442" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.12" />
      <line x1="875" y1="405" x2="912" y2="432" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" opacity="0.14" />
      <line x1="1062" y1="388" x2="1098" y2="415" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" opacity="0.13" />

      {/* Pink blobs — bottom corners */}
      <ellipse cx="88" cy="470" rx="55" ry="28" fill="#f472b6" opacity="0.09" />
      <ellipse cx="1112" cy="462" rx="48" ry="25" fill="#f472b6" opacity="0.08" />

      {/* Stray gray marks */}
      <line x1="920" y1="65" x2="952" y2="88" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" opacity="0.10" />
      <line x1="168" y1="72" x2="198" y2="94" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" opacity="0.10" />
    </>
  );
}

function HeroStrokes() {
  return (
    <>
      {/* Pink strokes in corners — subtle float */}
      <motion.line 
        x1="120" y1="80" x2="180" y2="130" stroke="#f472b6" strokeWidth="4" strokeLinecap="round" opacity="0.6" 
        animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        style={{ filter: "drop-shadow(0 0 10px #f472b640)" }}
      />
      <motion.line 
        x1="1050" y1="100" x2="1110" y2="150" stroke="#f472b6" strokeWidth="4" strokeLinecap="round" opacity="0.6" 
        animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
        style={{ filter: "drop-shadow(0 0 10px #f472b640)" }}
      />
      
      {/* Gray strokes — scattered top */}
      <line x1="320" y1="40" x2="355" y2="68" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.18" />
      <line x1="880" y1="50" x2="915" y2="78" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.17" />
      
      {/* Mid section flourishes */}
      <path d="M 60 220 C 80 200, 100 240, 120 220" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.1" />
      <path d="M 1080 320 C 1100 300, 1120 340, 1140 320" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.1" />
      
      {/* Subtle top glow */}
      <ellipse cx="600" cy="0" rx="200" ry="80" fill="var(--accent)" opacity="0.03" />
    </>
  );
}

export function DoodleBackground({ variant = "cta", className }: DoodleBackgroundProps) {
  return (
    <svg
      className={cn(
        "absolute inset-0 w-full h-full pointer-events-none select-none",
        className
      )}
      aria-hidden="true"
      viewBox="0 0 1200 520"
      fill="none"
      preserveAspectRatio="xMidYMid slice"
    >
      {variant === "hero" && <HeroStrokes />}
      {variant === "cta" && <CTAStrokes />}
      {variant === "features" && <FeaturesStrokes />}
      {variant === "questions" && <QuestionsStrokes />}
    </svg>
  );
}
