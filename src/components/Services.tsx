"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { services, type Service } from "@/data/services";
import ServiceScene from "./ServiceScenes";
import ScrollReveal from "./ui/ScrollReveal";

/* Asymmetric bento rhythm on large screens: 4+2 / 2+4 / 3+3 of a 6-col grid. */
const spans = [
  "lg:col-span-4",
  "lg:col-span-2",
  "lg:col-span-2",
  "lg:col-span-4",
  "lg:col-span-3",
  "lg:col-span-3",
];

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const prefersReduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  /* Cursor-follow 3D tilt — springy, subtle, toy-like. */
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 150, damping: 18 });
  const sry = useSpring(ry, { stiffness: 150, damping: 18 });

  const handleMove = (e: React.MouseEvent) => {
    if (prefersReduced || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ry.set(px * 7);
    rx.set(-py * 7);
  };

  const handleLeave = () => {
    setHovered(false);
    rx.set(0);
    ry.set(0);
  };

  return (
    <div style={{ perspective: 900 }} className="h-full">
      <motion.div
        ref={ref}
        onMouseMove={handleMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleLeave}
        style={{
          rotateX: srx,
          rotateY: sry,
          transformStyle: "preserve-3d",
          "--clay-bg": service.tint,
        } as React.CSSProperties & Record<string, unknown>}
        className="clay group h-full p-8"
      >
        <div className="mb-6 flex items-start justify-between">
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110 ${service.iconTint}`}
          >
            <service.icon className="h-5 w-5" />
          </div>
          <span className="font-heading text-sm font-bold text-muted">{service.num}</span>
        </div>

        {/* The living scene — a tiny looping demo of this discipline */}
        <ServiceScene index={index} active={hovered} />

        <h3 className="mb-2.5 font-heading text-xl font-bold text-ink md:text-2xl">
          {service.title}
        </h3>
        <p className="mb-6 text-[15px] leading-relaxed text-body">{service.promise}</p>

        <div className="flex flex-wrap gap-2">
          {service.chips.map((chip) => (
            <span
              key={chip}
              className="rounded-full bg-white/70 px-3 py-1.5 text-xs font-medium text-body"
            >
              {chip}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default function Services() {
  return (
    <section id="services" className="relative bg-alt py-28 md:py-36">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-16 max-w-2xl">
          <ScrollReveal>
            <span className="mb-5 block text-xs font-bold uppercase tracking-[0.18em] text-accent-ink">
              What we do
            </span>
          </ScrollReveal>
          <ScrollReveal delay={0.06}>
            <h2 className="text-balance font-heading text-4xl font-bold tracking-tight text-ink md:text-5xl">
              Six disciplines, one throughline: systems that work while you don&apos;t.
            </h2>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-6">
          {services.map((service, i) => (
            <ScrollReveal key={service.num} delay={(i % 2) * 0.08} className={spans[i]}>
              <ServiceCard service={service} index={i} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
