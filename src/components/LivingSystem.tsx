"use client";

import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { Search, PenTool, Code2, Workflow, TrendingUp, Lightbulb, type LucideIcon } from "lucide-react";
import ScrollReveal from "./ui/ScrollReveal";

/* ── Stage data ───────────────────────────────────────────────────────── */

interface Stage {
  icon: LucideIcon;
  title: string;
  desc: string;
  chipTint: string;
}

const STAGES: Stage[] = [
  {
    icon: Search,
    title: "Discover",
    desc: "Find the friction. Map the automation opportunities.",
    chipTint: "bg-bloom-sky/50 text-accent-ink",
  },
  {
    icon: PenTool,
    title: "Design",
    desc: "Architect the flows, the interfaces, the data.",
    chipTint: "bg-bloom-lilac/50 text-[#6b4fc7]",
  },
  {
    icon: Code2,
    title: "Build",
    desc: "Ship the frontend while agents & pipelines train in parallel.",
    chipTint: "bg-bloom-peach/60 text-[#c05a2e]",
  },
  {
    icon: Workflow,
    title: "Automate",
    desc: "Wire data sources to actions. Red-team the edge cases.",
    chipTint: "bg-bloom-mint/60 text-[#1d8a68]",
  },
  {
    icon: TrendingUp,
    title: "Scale",
    desc: "Monitor, refine, and compound results over time.",
    chipTint: "bg-accent-soft text-accent-ink",
  },
];

/* Node anchors on an ellipse in a 1000×620 space (center 500,330 rx 400 ry 250). */
const NODES = [
  { x: 100, y: 330 },
  { x: 217, y: 153 },
  { x: 500, y: 80 },
  { x: 783, y: 153 },
  { x: 900, y: 330 },
];

const WIRES = [
  "M 100 330 A 400 250 0 0 1 217 153",
  "M 217 153 A 400 250 0 0 1 500 80",
  "M 500 80 A 400 250 0 0 1 783 153",
  "M 783 153 A 400 250 0 0 1 900 330",
];

/* Central clay object — one silhouette per stage. */
const CORE_SHAPES = [
  { width: 250, height: 250, borderRadius: "46% 54% 58% 42% / 52% 44% 56% 48%" },
  { width: 370, height: 250, borderRadius: "28px" },
  { width: 400, height: 270, borderRadius: "24px" },
  { width: 400, height: 270, borderRadius: "24px" },
  { width: 300, height: 300, borderRadius: "150px" },
];

/* ── Sub-components (one per hook-bearing unit) ───────────────────────── */

function NodeChip({
  progress,
  index,
  stage,
}: {
  progress: MotionValue<number>;
  index: number;
  stage: Stage;
}) {
  const start = index / 5;
  const opacity = useTransform(progress, [start, start + 0.06], [0, 1]);
  const scale = useTransform(progress, [start, start + 0.06], [0.6, 1]);
  const node = NODES[index];

  return (
    <motion.div
      style={{
        opacity,
        scale,
        left: `${(node.x / 1000) * 100}%`,
        top: `${(node.y / 620) * 100}%`,
      }}
      className="clay-sm absolute z-10 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2.5 px-4 py-2.5"
    >
      <span className={`flex h-8 w-8 items-center justify-center rounded-xl ${stage.chipTint}`}>
        <stage.icon className="h-4 w-4" />
      </span>
      <span className="font-heading text-sm font-bold text-ink">{stage.title}</span>
    </motion.div>
  );
}

function Wire({ progress, index }: { progress: MotionValue<number>; index: number }) {
  /* Wire i draws after node i lands and completes as node i+1 arrives. */
  const pathLength = useTransform(progress, [(index + 0.55) / 5, (index + 1) / 5], [0, 1]);
  /* Round linecaps paint a dot even at pathLength 0 — hide until drawing starts. */
  const opacity = useTransform(pathLength, (v) => (v <= 0.005 ? 0 : 1));

  return (
    <motion.path
      d={WIRES[index]}
      fill="none"
      stroke="url(#wireGradient)"
      strokeWidth={2.5}
      strokeLinecap="round"
      vectorEffect="non-scaling-stroke"
      style={{ pathLength, opacity }}
    />
  );
}

/* Inner visuals of the central object, one per stage. */
function CoreVisual({ stage }: { stage: number }) {
  if (stage === 0) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-[radial-gradient(circle_at_35%_30%,#eaecff_0%,#fff6ef_70%)]">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/80 shadow-inner">
          <Lightbulb className="h-7 w-7 text-accent" />
        </div>
        <motion.div
          animate={{ scale: [1, 1.35], opacity: [0.5, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
          className="absolute h-24 w-24 rounded-full border-2 border-accent/40"
        />
      </div>
    );
  }
  if (stage === 1) {
    return (
      <div className="flex h-full w-full flex-col gap-3 bg-white/70 p-5">
        <div className="h-7 rounded-lg border-2 border-dashed border-accent/35" />
        <div className="flex flex-1 gap-3">
          <div className="w-1/4 rounded-lg border-2 border-dashed border-accent/35" />
          <div className="flex flex-1 flex-col gap-3">
            <div className="flex-1 rounded-lg border-2 border-dashed border-accent/35" />
            <div className="h-1/3 rounded-lg border-2 border-dashed border-accent/25" />
          </div>
        </div>
      </div>
    );
  }
  if (stage === 2) {
    return (
      <div className="flex h-full w-full flex-col gap-3 bg-white p-5">
        <div className="flex h-7 items-center gap-1.5 rounded-lg bg-alt px-3">
          <span className="h-2 w-2 rounded-full bg-bloom-peach" />
          <span className="h-2 w-2 rounded-full bg-bloom-mint" />
          <span className="h-2 w-2 rounded-full bg-bloom-sky" />
        </div>
        <div className="h-2/5 rounded-lg bg-gradient-to-r from-bloom-sky/60 to-bloom-lilac/60" />
        <div className="flex flex-1 gap-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex flex-1 flex-col justify-end gap-1.5 rounded-lg bg-alt p-2.5">
              <div className="h-1.5 w-3/4 rounded bg-accent/30" />
              <div className="h-1.5 w-1/2 rounded bg-accent/20" />
            </div>
          ))}
        </div>
      </div>
    );
  }
  if (stage === 3) {
    return (
      <div className="flex h-full w-full flex-col justify-center gap-5 bg-white p-6">
        {[0, 1, 2].map((row) => (
          <div key={row} className="flex items-center gap-3">
            <span className="h-3 w-3 flex-none rounded-full bg-accent/70" />
            <div className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-alt">
              <motion.span
                animate={{ left: ["-12%", "104%"] }}
                transition={{
                  duration: 2.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: row * 0.5,
                }}
                className="absolute top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_8px_rgba(91,108,255,0.7)]"
              />
            </div>
            <span className="rounded-full bg-bloom-mint/60 px-2.5 py-0.5 text-[10px] font-bold text-[#1d8a68]">
              auto
            </span>
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className="relative flex h-full w-full items-center justify-center bg-[radial-gradient(circle,#eaecff_0%,#ffffff_75%)]">
      <span className="h-6 w-6 rounded-full bg-accent shadow-[0_0_24px_rgba(91,108,255,0.8)]" />
      {[0, 1].map((ring) => (
        <motion.span
          key={ring}
          animate={{ scale: [1, 2.2], opacity: [0.6, 0] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeOut", delay: ring * 1.3 }}
          className="absolute h-20 w-20 rounded-full border-2 border-accent/50"
        />
      ))}
      {[45, 135, 225, 315].map((deg) => (
        <span
          key={deg}
          className="absolute h-2.5 w-2.5 rounded-full bg-accent/60"
          style={{ transform: `rotate(${deg}deg) translateX(88px)` }}
        />
      ))}
    </div>
  );
}

/* ── Static fallback (mobile + reduced motion) ────────────────────────── */

function StaticSystem() {
  return (
    <div className="relative mx-auto max-w-xl">
      <div className="absolute bottom-8 left-[27px] top-8 w-px bg-line" aria-hidden />
      <ol className="flex flex-col gap-6">
        {STAGES.map((stage, i) => (
          <li key={stage.title}>
            <ScrollReveal delay={i * 0.06}>
              <div className="clay-sm relative flex items-start gap-5 p-6">
                <span
                  className={`flex h-11 w-11 flex-none items-center justify-center rounded-2xl ${stage.chipTint}`}
                >
                  <stage.icon className="h-5 w-5" />
                </span>
                <div>
                  <div className="mb-1 flex items-baseline gap-2.5">
                    <span className="font-heading text-xs font-bold text-muted">0{i + 1}</span>
                    <h3 className="font-heading text-lg font-bold text-ink">{stage.title}</h3>
                  </div>
                  <p className="text-sm leading-relaxed text-body">{stage.desc}</p>
                </div>
              </div>
            </ScrollReveal>
          </li>
        ))}
      </ol>
    </div>
  );
}

/* ── Scroll-scrubbed showpiece (desktop) ──────────────────────────────── */

function ScrubSystem() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [stage, setStage] = useState(0);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setStage(Math.max(0, Math.min(4, Math.floor(v * 5))));
  });

  return (
    <div ref={sectionRef} className="relative h-[420vh]">
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden">
        {/* Backdrop blooms */}
        <div className="bloom bloom-drift left-[8%] top-[12%] h-[26rem] w-[26rem] bg-bloom-lilac opacity-40" />
        <div className="bloom bloom-drift-slow bottom-[8%] right-[10%] h-[24rem] w-[30rem] bg-bloom-mint opacity-40" />

        <div className="relative z-10 mb-2 text-center">
          <span className="mb-3 block text-xs font-bold uppercase tracking-[0.18em] text-accent-ink">
            How we work
          </span>
          <h2 className="font-heading text-3xl font-bold tracking-tight text-ink md:text-4xl">
            Watch the system assemble itself.
          </h2>
        </div>

        {/* Diagram canvas */}
        <div className="relative h-[min(58vh,560px)] w-full max-w-5xl px-6">
          {/* Wires */}
          <svg
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 1000 620"
            preserveAspectRatio="none"
            aria-hidden
          >
            <defs>
              <linearGradient id="wireGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#5b6cff" />
                <stop offset="100%" stopColor="#d9ccff" />
              </linearGradient>
            </defs>
            {WIRES.map((_, i) => (
              <Wire key={i} progress={scrollYProgress} index={i} />
            ))}
            {/* Data pulses travel each completed wire */}
            {WIRES.map(
              (d, i) =>
                stage > i && (
                  <circle key={`pulse-${i}`} r="5" fill="#5b6cff" opacity="0.9">
                    <animateMotion dur="3.6s" repeatCount="indefinite" path={d} />
                  </circle>
                ),
            )}
          </svg>

          {/* Nodes */}
          {STAGES.map((s, i) => (
            <NodeChip key={s.title} progress={scrollYProgress} index={i} stage={s} />
          ))}

          {/* Central morphing clay object */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <motion.div
              animate={CORE_SHAPES[stage]}
              transition={{ type: "spring", stiffness: 55, damping: 15 }}
              className="clay relative overflow-hidden"
              style={CORE_SHAPES[0]}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={stage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  className="absolute inset-0"
                >
                  <CoreVisual stage={stage} />
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>
        </div>

        {/* Stage caption */}
        <div className="relative z-10 mt-4 h-24 max-w-md text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={stage}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-1.5 font-heading text-sm font-bold text-accent-ink">
                0{stage + 1} — {STAGES[stage].title}
              </div>
              <p className="text-[15px] leading-relaxed text-body">{STAGES[stage].desc}</p>
            </motion.div>
          </AnimatePresence>
          {/* Progress dots */}
          <div className="mt-4 flex items-center justify-center gap-2">
            {STAGES.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  i === stage ? "w-6 bg-accent" : "w-1.5 bg-line"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Section shell ────────────────────────────────────────────────────── */

export default function LivingSystem() {
  const prefersReduced = useReducedMotion();

  return (
    <section id="system" className="relative overflow-x-clip py-24 md:py-0">
      {prefersReduced ? (
        <div className="mx-auto max-w-6xl px-6 md:py-28">
          <div className="mb-14 text-center">
            <span className="mb-3 block text-xs font-bold uppercase tracking-[0.18em] text-accent-ink">
              How we work
            </span>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-ink md:text-4xl">
              Five stages. One living system.
            </h2>
          </div>
          <StaticSystem />
        </div>
      ) : (
        <>
          {/* Mobile: calm static list */}
          <div className="mx-auto max-w-6xl px-6 lg:hidden">
            <div className="mb-14 text-center">
              <span className="mb-3 block text-xs font-bold uppercase tracking-[0.18em] text-accent-ink">
                How we work
              </span>
              <h2 className="font-heading text-3xl font-bold tracking-tight text-ink">
                Five stages. One living system.
              </h2>
            </div>
            <StaticSystem />
          </div>
          {/* Desktop: the scroll-scrubbed showpiece */}
          <div className="hidden lg:block">
            <ScrubSystem />
          </div>
        </>
      )}
    </section>
  );
}
