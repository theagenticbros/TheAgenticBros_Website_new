"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import { ArrowDown, ArrowRight, TrendingUp, UserRound } from "lucide-react";
import Link from "next/link";

/*
 * Hero — the "prompt-to-product" moment.
 * Sequence: aurora breathes → a prompt types itself → shimmer sweep →
 * the headline generates in word by word → UI fragments assemble around it.
 * After the intro, the aurora and fragments follow the cursor with parallax.
 *
 * Alt headline (client to pick): "Autonomous revenue engines, designed & shipped."
 */

const PROMPT = "build me a system that runs itself…";
const TYPE_MS = 30;

const HEADLINE_A = ["We", "build", "systems", "that", "keep"];
const HEADLINE_B = ["working", "after", "launch."];

const wordVariants = {
  hidden: { opacity: 0, y: 18, filter: "blur(10px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const },
  },
};

/* Parallax wrapper: outer layer follows the cursor, inner layer floats. */
function Fragment({
  sx,
  sy,
  depth,
  delay,
  show,
  className,
  floatClass = "float-soft",
  children,
}: {
  sx: MotionValue<number>;
  sy: MotionValue<number>;
  depth: number;
  delay: number;
  show: boolean;
  className: string;
  floatClass?: string;
  children: React.ReactNode;
}) {
  const x = useTransform(sx, (v) => v * depth);
  const y = useTransform(sy, (v) => v * depth * 0.7);

  return (
    <motion.div
      style={{ x, y }}
      initial={{ opacity: 0, scale: 0.75 }}
      animate={show ? { opacity: 1, scale: 1 } : {}}
      transition={{ type: "spring", stiffness: 200, damping: 18, delay }}
      className={`absolute z-10 hidden lg:block ${className}`}
    >
      <div className={floatClass}>{children}</div>
    </motion.div>
  );
}

/* Tiny animated bar chart — "revenue" fragment. */
function ChartFragment() {
  return (
    <div className="glass-strong w-40 rounded-2xl p-4">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-[11px] font-semibold text-muted">Revenue</span>
        <TrendingUp className="h-3.5 w-3.5 text-[#1d8a68]" />
      </div>
      <div className="flex h-12 items-end gap-1.5">
        {[38, 55, 44, 70, 62, 88].map((h, i) => (
          <motion.div
            key={i}
            animate={{ height: [`${h * 0.55}%`, `${h}%`, `${h * 0.75}%`] }}
            transition={{
              duration: 2.6,
              repeat: Infinity,
              repeatType: "mirror",
              delay: i * 0.18,
              ease: "easeInOut",
            }}
            className="flex-1 rounded-t-md bg-gradient-to-t from-accent/50 to-accent"
          />
        ))}
      </div>
    </div>
  );
}

function ToggleFragment() {
  return (
    <div className="glass-strong flex w-44 items-center justify-between rounded-2xl p-4">
      <div>
        <div className="text-[11px] font-semibold text-muted">Automation</div>
        <div className="text-xs font-bold text-[#1d8a68]">running</div>
      </div>
      <div className="flex h-6 w-11 items-center rounded-full bg-[#c8f0e4] px-0.5">
        <motion.div
          initial={{ x: 0 }}
          animate={{ x: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 20, delay: 2.6 }}
          className="h-5 w-5 rounded-full bg-[#1d8a68] shadow-sm"
        />
      </div>
    </div>
  );
}

function LeadFragment() {
  return (
    <div className="glass-strong flex w-48 items-center gap-3 rounded-2xl p-4">
      <div className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-gradient-to-br from-bloom-sky to-bloom-lilac">
        <UserRound className="h-4 w-4 text-accent-ink" />
      </div>
      <div>
        <div className="text-xs font-bold text-ink">New lead</div>
        <div className="text-[11px] font-semibold text-accent-ink">scored 94 · routed</div>
      </div>
    </div>
  );
}

function AgentFragment() {
  return (
    <div className="glass-strong flex w-40 items-center gap-2.5 rounded-2xl p-4">
      <span className="relative flex h-2.5 w-2.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent" />
      </span>
      <span className="text-xs font-bold text-ink">
        agent online <span className="font-semibold text-muted">· 24/7</span>
      </span>
    </div>
  );
}

export default function Hero() {
  const prefersReduced = useReducedMotion();
  const [typed, setTyped] = useState(0);
  const [generated, setGenerated] = useState(false);
  const [swept, setSwept] = useState(false); // shimmer done → unmount it
  const sectionRef = useRef<HTMLElement>(null);

  /* Cursor parallax — normalized -1..1, spring-smoothed. */
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 45, damping: 16 });
  const sy = useSpring(my, { stiffness: 45, damping: 16 });

  /* Aurora layers drift on different depths for a "liquid light" feel. */
  const auroraX1 = useTransform(sx, (v) => v * 46);
  const auroraY1 = useTransform(sy, (v) => v * 34);
  const auroraX2 = useTransform(sx, (v) => v * -34);
  const auroraY2 = useTransform(sy, (v) => v * -26);
  const auroraX3 = useTransform(sx, (v) => v * 24);
  const auroraY3 = useTransform(sy, (v) => v * -18);

  useEffect(() => {
    if (prefersReduced) {
      setTyped(PROMPT.length);
      setGenerated(true);
      return;
    }
    let i = 0;
    const start = setTimeout(() => {
      const timer = setInterval(() => {
        i += 1;
        setTyped(i);
        if (i >= PROMPT.length) {
          clearInterval(timer);
          setTimeout(() => setGenerated(true), 380);
        }
      }, TYPE_MS);
    }, 500);
    return () => clearTimeout(start);
  }, [prefersReduced]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (prefersReduced || !sectionRef.current) return;
    const r = sectionRef.current.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width) * 2 - 1);
    my.set(((e.clientY - r.top) / r.height) * 2 - 1);
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative flex min-h-[96dvh] items-center justify-center pb-16 pt-28"
    >
      {/* Aurora — clipped in its own wrapper so the section has no hard edge */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div style={{ x: auroraX1, y: auroraY1 }} className="absolute inset-0">
          <div className="bloom bloom-drift left-[-12%] top-[-8%] h-[36rem] w-[36rem] bg-bloom-sky opacity-60" />
        </motion.div>
        <motion.div style={{ x: auroraX2, y: auroraY2 }} className="absolute inset-0">
          <div className="bloom bloom-drift-slow right-[-18%] top-[-6%] h-[44rem] w-[44rem] bg-bloom-lilac opacity-45" />
        </motion.div>
        <motion.div style={{ x: auroraX3, y: auroraY3 }} className="absolute inset-0">
          <div className="bloom bloom-drift bottom-[-22%] left-[22%] h-[30rem] w-[42rem] bg-bloom-peach opacity-45" />
        </motion.div>
      </div>

      {/* Edge dissolve — fades the aurora into the page; sits below fragments so cards stay crisp */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-[5] w-[26rem]"
        style={{ background: "linear-gradient(to right, #fafaf7 12%, transparent 100%)" }}
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-[5] w-[26rem]"
        style={{ background: "linear-gradient(to left, #fafaf7 12%, transparent 100%)" }}
      />

      <div className="relative z-10 mx-auto w-full max-w-5xl px-6">
        {/* Floating "generated product" fragments */}
        <Fragment sx={sx} sy={sy} depth={-22} delay={1.0} show={generated} className="left-[-4%] top-[-8%]">
          <ChartFragment />
        </Fragment>
        <Fragment sx={sx} sy={sy} depth={-14} delay={1.15} show={generated} className="bottom-[6%] left-[-2%]" floatClass="float-soft-delayed">
          <ToggleFragment />
        </Fragment>
        <Fragment sx={sx} sy={sy} depth={20} delay={1.3} show={generated} className="right-[-5%] top-[-4%]" floatClass="float-soft-delayed">
          <LeadFragment />
        </Fragment>
        <Fragment sx={sx} sy={sy} depth={14} delay={1.45} show={generated} className="bottom-[10%] right-[-2%]">
          <AgentFragment />
        </Fragment>

        <div className="relative mx-auto max-w-4xl text-center">
          {/* The prompt — types itself like a client request */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="mb-9 inline-flex items-center gap-2.5 rounded-full px-5 py-2.5 glass"
          >
            <span className="font-mono text-sm font-bold text-accent-ink">&gt;</span>
            <span className="min-h-[1.25rem] font-mono text-[13px] font-medium text-ink sm:text-sm">
              {PROMPT.slice(0, typed)}
              {!generated && (
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity, repeatType: "mirror" }}
                  className="ml-0.5 inline-block h-3.5 w-[7px] translate-y-0.5 bg-accent"
                />
              )}
            </span>
            {generated && (
              <motion.span
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-xs font-bold text-[#1d8a68]"
              >
                ✓
              </motion.span>
            )}
          </motion.div>

          {/* Shimmer sweep — the "generation" flash; unmounts once it passes through */}
          {generated && !prefersReduced && !swept && (
            <motion.div
              initial={{ x: "-120%" }}
              animate={{ x: "130%" }}
              transition={{ duration: 1.0, ease: "easeInOut" }}
              onAnimationComplete={() => setSwept(true)}
              className="pointer-events-none absolute inset-y-0 left-0 z-20 w-2/3 -skew-x-12"
              style={{
                background:
                  "linear-gradient(100deg, transparent 0%, rgba(91,108,255,0.10) 35%, rgba(255,255,255,0.55) 50%, rgba(91,108,255,0.10) 65%, transparent 100%)",
              }}
            />
          )}

          {/* Headline — generates in word by word */}
          <motion.h1
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.09 } } }}
            initial={prefersReduced ? "show" : "hidden"}
            animate={generated ? "show" : "hidden"}
            className="text-balance font-heading text-[clamp(2.75rem,6vw,5rem)] font-bold leading-[1.05] tracking-tight text-ink"
          >
            {HEADLINE_A.map((word) => (
              <motion.span key={word} variants={wordVariants} className="inline-block">
                {word}&nbsp;
              </motion.span>
            ))}
            <span className="text-accent-ink">
              {HEADLINE_B.map((word) => (
                <motion.span key={word} variants={wordVariants} className="inline-block">
                  {word}&nbsp;
                </motion.span>
              ))}
            </span>
          </motion.h1>

          <motion.p
            initial={prefersReduced ? false : { opacity: 0, y: 14 }}
            animate={generated ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.75 }}
            className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-body md:text-xl"
          >
            Websites, AI agents, and automation pipelines — designed to run your
            growth around the clock. No templates. No bloat.
          </motion.p>

          <motion.div
            initial={prefersReduced ? false : { opacity: 0, y: 14 }}
            animate={generated ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.9 }}
            className="mt-10 flex flex-col items-center justify-center gap-5 sm:flex-row"
          >
            <Link
              href="#contact"
              className="clay-press inline-flex items-center gap-2 rounded-full bg-accent px-8 py-4 font-heading text-base font-semibold text-white transition-colors hover:bg-accent-ink"
            >
              Start a project
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="#work"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-body transition-colors hover:text-accent-ink"
            >
              See our work
              <ArrowDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
