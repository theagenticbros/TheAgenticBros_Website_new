"use client";

import { motion } from "framer-motion";
import { MousePointer2, Check } from "lucide-react";

/*
 * Living miniature scenes — each one is a tiny looping demo of the
 * discipline it sits inside. `active` (card hovered) speeds the loop up,
 * so the scene "wakes up" under the cursor.
 */

interface SceneProps {
  active: boolean;
}

/* 01 — UI/UX: a cursor drags wireframe boxes into place. */
function UiUxScene({ active }: SceneProps) {
  const spd = active ? 0.5 : 1;
  return (
    <div className="relative h-full w-full p-4">
      <motion.div
        animate={{ opacity: [0, 1, 1, 1], scaleX: [0.3, 1, 1, 1] }}
        transition={{ duration: 5 * spd, repeat: Infinity, times: [0.05, 0.3, 0.9, 1] }}
        className="absolute left-4 top-4 h-7 w-2/3 origin-left rounded-md border-2 border-dashed border-accent/40"
      />
      <motion.div
        animate={{ opacity: [0, 0, 1, 1], scaleY: [0.3, 0.3, 1, 1] }}
        transition={{ duration: 5 * spd, repeat: Infinity, times: [0, 0.35, 0.6, 1] }}
        className="absolute bottom-4 left-4 h-10 w-1/3 origin-top rounded-md border-2 border-dashed border-accent/30"
      />
      <motion.div
        animate={{ opacity: [0, 0, 0, 1], scale: [0.6, 0.6, 0.6, 1] }}
        transition={{ duration: 5 * spd, repeat: Infinity, times: [0, 0.5, 0.68, 0.85] }}
        className="absolute bottom-4 right-4 flex h-10 w-[38%] items-center justify-center rounded-md bg-accent-soft"
      >
        <span className="text-[10px] font-bold text-accent-ink">CTA</span>
      </motion.div>
      <motion.div
        animate={{
          x: [12, 150, 60, 190, 12],
          y: [10, 14, 60, 62, 10],
        }}
        transition={{ duration: 5 * spd, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-0 top-0 z-10"
      >
        <MousePointer2 className="h-4 w-4 fill-accent text-accent" />
      </motion.div>
    </div>
  );
}

/* 02 — Website Design: type + palette come alive. */
function DesignScene({ active }: SceneProps) {
  const spd = active ? 0.5 : 1;
  return (
    <div className="flex h-full w-full items-center justify-between px-6">
      <div className="relative">
        <span className="font-heading text-5xl font-bold text-ink">Aa</span>
        <motion.div
          animate={{ scaleX: [0, 1, 1, 0] }}
          transition={{ duration: 3.6 * spd, repeat: Infinity, times: [0.1, 0.4, 0.8, 1], ease: "easeInOut" }}
          className="absolute -bottom-1 left-0 h-1 w-full origin-left rounded-full bg-gradient-to-r from-accent to-bloom-lilac"
        />
      </div>
      <div className="flex flex-col gap-2">
        {["#5b6cff", "#d9ccff", "#ffd9c2"].map((c, i) => (
          <motion.span
            key={c}
            animate={{ scale: [1, 1.35, 1], x: [0, -6, 0] }}
            transition={{ duration: 2.4 * spd, repeat: Infinity, delay: i * 0.35 * spd, ease: "easeInOut" }}
            className="h-4 w-4 rounded-full shadow-sm"
            style={{ background: c }}
          />
        ))}
      </div>
      <div className="flex flex-col gap-1.5">
        {[64, 44, 54].map((w, i) => (
          <motion.div
            key={i}
            animate={{ opacity: [0.35, 1, 0.35] }}
            transition={{ duration: 2.4 * spd, repeat: Infinity, delay: i * 0.3 * spd }}
            className="h-1.5 rounded-full bg-ink/25"
            style={{ width: w }}
          />
        ))}
      </div>
    </div>
  );
}

/* 03 — Web Dev: code types itself, then deploys. */
function DevScene({ active }: SceneProps) {
  const spd = active ? 0.5 : 1;
  const lines = [
    { text: "const site = build(brand)", color: "text-ink/70", w: "88%" },
    { text: "deploy(site).toEdge()", color: "text-accent-ink", w: "72%" },
  ];
  return (
    <div className="flex h-full w-full flex-col justify-center gap-2.5 px-6 font-mono text-[11px]">
      {lines.map((line, i) => (
        <div key={line.text} className="overflow-hidden whitespace-nowrap">
          <motion.div
            animate={{ width: ["0%", line.w, line.w, "0%"] }}
            transition={{
              duration: 5 * spd,
              repeat: Infinity,
              times: [0.05 + i * 0.18, 0.32 + i * 0.18, 0.92, 1],
              ease: "linear",
            }}
            className={`overflow-hidden whitespace-nowrap border-r-2 border-accent/60 ${line.color}`}
          >
            {line.text}
          </motion.div>
        </div>
      ))}
      <motion.div
        animate={{ opacity: [0, 0, 1, 1, 0], y: [6, 6, 0, 0, 6] }}
        transition={{ duration: 5 * spd, repeat: Infinity, times: [0, 0.62, 0.7, 0.92, 1] }}
        className="mt-1 inline-flex w-fit items-center gap-1.5 rounded-full bg-bloom-mint/60 px-2.5 py-1 text-[10px] font-bold text-[#1d8a68]"
      >
        <Check className="h-3 w-3" />
        live in 0.9s
      </motion.div>
    </div>
  );
}

/* 04 — AI Dev: a neural net firing, pulses traveling the edges. */
function AiScene({ active }: SceneProps) {
  const dur = active ? "1.4s" : "2.8s";
  const nodes = [
    { x: 25, y: 30 }, { x: 25, y: 70 },
    { x: 80, y: 20 }, { x: 80, y: 50 }, { x: 80, y: 80 },
    { x: 135, y: 50 },
  ];
  const edges = [
    [0, 2], [0, 3], [1, 3], [1, 4], [2, 5], [3, 5], [4, 5],
  ];
  return (
    <div className="flex h-full w-full items-center justify-center">
      <svg viewBox="0 0 160 100" className="h-full max-h-24 w-auto">
        {edges.map(([a, b], i) => {
          const d = `M ${nodes[a].x} ${nodes[a].y} L ${nodes[b].x} ${nodes[b].y}`;
          return (
            <g key={i}>
              <path d={d} stroke="#5b6cff" strokeOpacity="0.22" strokeWidth="1.5" />
              <circle r="2.2" fill="#5b6cff" opacity="0.9">
                <animateMotion dur={dur} begin={`${i * 0.35}s`} repeatCount="indefinite" path={d} />
              </circle>
            </g>
          );
        })}
        {nodes.map((n, i) => (
          <motion.circle
            key={i}
            cx={n.x}
            cy={n.y}
            r="5"
            fill="#eaecff"
            stroke="#5b6cff"
            strokeWidth="1.5"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.25 }}
          />
        ))}
      </svg>
    </div>
  );
}

/* 05 — AI Agents: a voice speaking, live. */
function AgentScene({ active }: SceneProps) {
  const spd = active ? 0.45 : 1;
  const heights = [30, 55, 85, 45, 70, 95, 60, 40, 75, 50, 88, 35, 62, 46];
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3">
      <div className="flex h-12 items-center gap-1">
        {heights.map((h, i) => (
          <motion.span
            key={i}
            animate={{ height: [`${h * 0.25}%`, `${h}%`, `${h * 0.25}%`] }}
            transition={{
              duration: 0.9 * spd,
              repeat: Infinity,
              delay: i * 0.07 * spd,
              ease: "easeInOut",
            }}
            className="w-1.5 rounded-full bg-gradient-to-t from-accent/50 to-accent"
          />
        ))}
      </div>
      <div className="flex items-center gap-2 text-[10px] font-bold text-body">
        <span className="relative flex h-2 w-2">
          <span className="absolute h-full w-full animate-ping rounded-full bg-[#2bb98a] opacity-60" />
          <span className="relative h-2 w-2 rounded-full bg-[#2bb98a]" />
        </span>
        agent on a call · booking a demo
      </div>
    </div>
  );
}

/* 06 — AI CRM: rows enrich and score themselves. */
function CrmScene({ active }: SceneProps) {
  const spd = active ? 0.5 : 1;
  const rows = [
    { name: "Acme Corp", tag: "scored 92", tint: "bg-accent-soft text-accent-ink" },
    { name: "Nova Labs", tag: "enriched", tint: "bg-bloom-mint/60 text-[#1d8a68]" },
    { name: "Zenith Co", tag: "outreach sent", tint: "bg-bloom-peach/60 text-[#c05a2e]" },
  ];
  return (
    <div className="flex h-full w-full flex-col justify-center gap-2 px-5">
      {rows.map((row, i) => (
        <div key={row.name} className="flex items-center justify-between rounded-lg bg-white/70 px-3 py-1.5">
          <span className="text-[11px] font-semibold text-body">{row.name}</span>
          <motion.span
            animate={{ opacity: [0, 0, 1, 1, 0], scale: [0.7, 0.7, 1, 1, 0.7] }}
            transition={{
              duration: 4.5 * spd,
              repeat: Infinity,
              times: [0, 0.12 + i * 0.16, 0.22 + i * 0.16, 0.9, 1],
            }}
            className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${row.tint}`}
          >
            ✓ {row.tag}
          </motion.span>
        </div>
      ))}
    </div>
  );
}

const scenes = [UiUxScene, DesignScene, DevScene, AiScene, AgentScene, CrmScene];

export default function ServiceScene({ index, active }: { index: number; active: boolean }) {
  const Scene = scenes[index] ?? scenes[0];
  return (
    <div className="relative mb-6 h-28 overflow-hidden rounded-2xl border border-line bg-white/55">
      <Scene active={active} />
    </div>
  );
}
