"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useAnimationFrame,
  useInView,
  useReducedMotion,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { projects, type Project } from "@/data/projects";
import ScrollReveal from "./ui/ScrollReveal";

const COUNT = projects.length;
const STEP = 360 / COUNT;
const TURN_MS = 52000; // one full rotation — slow and stately

/* Card scales with the viewport so the drum rotates the same way on phones. */
function useDrumSize() {
  const [dims, setDims] = useState({ w: 380, h: 520 });
  useEffect(() => {
    const update = () => {
      const vw = window.innerWidth;
      const w = vw >= 1024 ? 380 : Math.max(248, Math.min(340, Math.round(vw * 0.7)));
      setDims({ w, h: Math.round(w * 1.37) });
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return dims;
}

const BUBBLE_W = 400;
const BUBBLE_H = 210; // estimate for clamping; quotes are short

type Side = "left" | "right" | "top" | "bottom";

/*
 * The bubble floats near the cursor in viewport space (portal + fixed),
 * always OUTSIDE the hovered card: beside it when there's room, otherwise
 * above/below. Never on top of the card, never off-screen.
 */
function placeBubble(rect: DOMRect, cx: number | null, cy: number | null) {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const w = Math.min(BUBBLE_W, vw - 24);
  const clampY = (y: number) => Math.min(Math.max(y, 12), vh - BUBBLE_H - 12);
  const clampX = (x: number) => Math.min(Math.max(x, 12), vw - w - 12);
  const hasCursor = cx !== null && cy !== null;

  if (hasCursor && vw - rect.right >= w + 26) {
    return { left: rect.right + 14, top: clampY(cy! - BUBBLE_H / 2), w, side: "right" as Side };
  }
  if (hasCursor && rect.left >= w + 26) {
    return { left: rect.left - w - 14, top: clampY(cy! - BUBBLE_H / 2), w, side: "left" as Side };
  }
  const centered = clampX(rect.left + rect.width / 2 - w / 2);
  if (rect.top >= BUBBLE_H + 24) {
    return { left: centered, top: rect.top - BUBBLE_H - 12, w, side: "top" as Side };
  }
  return { left: centered, top: Math.min(rect.bottom + 12, vh - BUBBLE_H - 12), w, side: "bottom" as Side };
}

const tailBySide: Record<Side, string> = {
  right: "left-[-7px] top-1/2 -translate-y-1/2 border-b border-l",
  left: "right-[-7px] top-1/2 -translate-y-1/2 border-r border-t",
  top: "bottom-[-7px] left-1/2 -translate-x-1/2 border-b border-r",
  bottom: "top-[-7px] left-1/2 -translate-x-1/2 border-l border-t",
};

const originBySide: Record<Side, string> = {
  right: "left center",
  left: "right center",
  top: "center bottom",
  bottom: "center top",
};

/* ── Card ─────────────────────────────────────────────────────────────── */

function ProjectCard({
  project,
  onHoverChange,
}: {
  project: Project;
  onHoverChange?: (hovered: boolean) => void;
}) {
  const [open, setOpen] = useState(false);
  const [side, setSide] = useState<Side>("right");
  const [bubbleW, setBubbleW] = useState(BUBBLE_W);
  const [pos, setPos] = useState({ left: 0, top: 0 });
  const [glide, setGlide] = useState(false); // no transition on first placement
  const [mounted, setMounted] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  const place = (cx: number | null, cy: number | null, immediate = false) => {
    const rect = wrapRef.current?.getBoundingClientRect();
    if (!rect) return;
    const p = placeBubble(rect, cx, cy);
    setSide(p.side);
    setBubbleW(p.w);
    setPos({ left: p.left, top: p.top });
    setGlide(!immediate);
  };

  const set = (v: boolean) => {
    setOpen(v);
    onHoverChange?.(v);
  };

  const t = project.testimonial;

  return (
    <div
      ref={wrapRef}
      tabIndex={0}
      role="group"
      aria-label={`${project.title} — ${project.type}. Client testimonial appears on hover or focus.`}
      onMouseEnter={(e) => {
        place(e.clientX, e.clientY, true);
        set(true);
      }}
      onMouseMove={(e) => {
        if (open) place(e.clientX, e.clientY);
      }}
      onMouseLeave={() => set(false)}
      onFocus={() => {
        place(null, null, true);
        set(true);
      }}
      onBlur={() => set(false)}
      onClick={(e) => {
        if (!open) place(e.clientX || null, e.clientY || null, true);
        set(!open);
      }}
      className="group relative h-full w-full cursor-pointer outline-none"
    >
      {/* Testimonial bubble — viewport-level, near the cursor, never on the card */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {open && (
              <div
                className="pointer-events-none fixed z-[80]"
                style={{
                  left: pos.left,
                  top: pos.top,
                  width: bubbleW,
                  /* Glide after the cursor once open; snap on first placement */
                  transition: glide
                    ? "left 0.3s cubic-bezier(0.33,1,0.68,1), top 0.3s cubic-bezier(0.33,1,0.68,1)"
                    : "none",
                }}
              >
              <motion.div
                initial={{ opacity: 0, scale: 0.82 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                style={{ transformOrigin: originBySide[side] }}
              >
                <div className="relative">
                  <div className="glass-strong rounded-3xl p-6 shadow-[0_18px_50px_rgba(20,21,26,0.16)]">
                    <p className="text-[15px] font-medium leading-relaxed text-ink">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                    <div className="mt-4 flex items-center justify-between gap-3">
                      <div>
                        <div className="font-heading text-sm font-bold text-ink">{t.name}</div>
                        <div className="text-xs text-muted">{t.role}</div>
                      </div>
                      <div className="rounded-full bg-accent-soft px-3.5 py-1.5 text-xs font-bold text-accent-ink">
                        {t.result}
                      </div>
                    </div>
                  </div>
                  {/* Tail — points back at the card */}
                  <div
                    className={`absolute h-4 w-4 rotate-45 rounded-[3px] border-white/85 bg-white/90 ${tailBySide[side]}`}
                  />
                </div>
              </motion.div>
              </div>
            )}
          </AnimatePresence>,
          document.body,
        )}

      <article
        className={`glass relative h-full w-full overflow-hidden rounded-[28px] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-focus-visible:ring-2 group-focus-visible:ring-accent ${
          open ? "-translate-y-1.5 shadow-[0_24px_60px_rgba(20,21,26,0.14)]" : ""
        }`}
      >
        {/* Screenshot — slowly scrolls through the client's site on hover */}
        <div className="relative h-[56%] w-full overflow-hidden border-b border-line">
          <Image
            src={project.image}
            alt={`${project.title} website screenshot`}
            fill
            sizes="400px"
            className="object-cover"
            style={{
              objectPosition: open ? "center bottom" : "center top",
              transition: "object-position 4s cubic-bezier(0.33,1,0.68,1)",
            }}
          />
          {/* Soft scan glare while "browsing" */}
          <div
            className={`pointer-events-none absolute inset-0 transition-opacity duration-700 ${
              open ? "opacity-100" : "opacity-0"
            }`}
            style={{
              background:
                "linear-gradient(160deg, rgba(255,255,255,0.14) 0%, transparent 35%, transparent 70%, rgba(91,108,255,0.08) 100%)",
            }}
          />
        </div>

        {/* Meta */}
        <div className="flex h-[44%] flex-col gap-2 p-5 md:gap-2.5 md:p-6">
          <div className="flex items-center justify-between gap-2">
            <span className="rounded-full bg-alt px-3 py-1 text-[11px] font-semibold text-body">
              {project.type}
            </span>
            <span className="flex items-center gap-1.5 text-[11px] font-semibold text-[#1d8a68]">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#2bb98a]" />
              Live
            </span>
          </div>
          <h3 className="font-heading text-lg font-bold text-ink md:text-[22px]">
            {project.title}
          </h3>
          <p className="line-clamp-2 text-[13px] leading-relaxed text-body md:text-sm lg:line-clamp-3">
            {project.description}
          </p>
          <div className="mt-auto flex items-center justify-between">
            <span className="text-xs font-semibold text-muted">
              Hover or tap for their words
            </span>
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1 text-xs font-bold text-accent-ink transition-colors hover:text-ink"
            >
              Visit
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </article>
    </div>
  );
}

/* ── 3D drum (desktop, motion allowed) ────────────────────────────────── */

function Drum() {
  const stageRef = useRef<HTMLDivElement>(null);
  const drumRef = useRef<HTMLDivElement>(null);
  const angle = useRef(0);
  const speed = useRef(0);
  const paused = useRef(false);
  const inView = useInView(stageRef, { margin: "10% 0px" });
  const { w, h } = useDrumSize();
  const radius = Math.round(w / 2 / Math.tan(Math.PI / COUNT)) + (w > 340 ? 50 : 30);

  useAnimationFrame((_, delta) => {
    const target = paused.current || !inView ? 0 : 360 / TURN_MS;
    speed.current += (target - speed.current) * Math.min(1, delta / 250);
    if (Math.abs(speed.current) < 1e-6 && target === 0) return;
    angle.current = (angle.current + speed.current * delta) % 360;
    if (drumRef.current) {
      drumRef.current.style.transform = `translateZ(${-radius}px) rotateY(${-angle.current}deg)`;
    }
  });

  return (
    <div
      ref={stageRef}
      className="relative mx-auto w-full"
      style={{ perspective: w > 340 ? "2100px" : "1500px", height: h + 90 }}
    >
      <div
        ref={drumRef}
        className="absolute left-1/2 top-1/2"
        style={{
          width: w,
          height: h,
          marginLeft: -w / 2,
          marginTop: -h / 2,
          transformStyle: "preserve-3d",
          transform: `translateZ(${-radius}px)`,
        }}
      >
        {projects.map((project, i) => (
          <div
            key={project.slug}
            className="absolute inset-0"
            style={{
              transform: `rotateY(${i * STEP}deg) translateZ(${radius}px)`,
              backfaceVisibility: "hidden",
            }}
          >
            <ProjectCard
              project={project}
              onHoverChange={(hovered) => {
                paused.current = hovered;
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Static fallback: grid, only when the user prefers reduced motion ── */

function StaticShowcase() {
  return (
    <div className="grid grid-cols-1 gap-6 pt-14 sm:grid-cols-2 xl:grid-cols-3">
      {projects.map((project) => (
        <div key={project.slug} className="h-[520px]">
          <ProjectCard project={project} />
        </div>
      ))}
    </div>
  );
}

/* ── Section ──────────────────────────────────────────────────────────── */

export default function WorkCylinder() {
  const prefersReduced = useReducedMotion();

  return (
    <section id="work" className="relative overflow-x-clip py-28 md:py-32">
      {/* Bloom backdrop behind the drum */}
      <div className="bloom bloom-drift left-[10%] top-[25%] h-[30rem] w-[44rem] bg-bloom-sky opacity-45" />
      <div className="bloom bloom-drift-slow bottom-[10%] right-[5%] h-[26rem] w-[26rem] bg-bloom-lilac opacity-45" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <ScrollReveal>
            <span className="mb-5 block text-xs font-bold uppercase tracking-[0.18em] text-accent-ink">
              Our work
            </span>
          </ScrollReveal>
          <ScrollReveal delay={0.06}>
            <h2 className="text-balance font-heading text-4xl font-bold tracking-tight text-ink md:text-5xl">
              Real projects. Real clients. Spinning proof.
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.12}>
            <p className="mt-5 text-lg leading-relaxed text-body">
              Everything below is live and shareable — no NDA work shown. Hover
              or tap any card and the client tells you the rest.
            </p>
          </ScrollReveal>
        </div>

        {prefersReduced ? <StaticShowcase /> : <Drum />}
      </div>
    </section>
  );
}
