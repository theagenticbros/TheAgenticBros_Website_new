import { Palette, LayoutTemplate, Code, Cpu, Bot, Database, type LucideIcon } from "lucide-react";

export interface Service {
  num: string;
  title: string;
  promise: string;
  icon: LucideIcon;
  chips: string[];
  /* Pastel clay fill (hex, applied via --clay-bg) + icon accent classes */
  tint: string;
  iconTint: string;
}

export const services: Service[] = [
  {
    num: "01",
    title: "UI/UX Design",
    promise:
      "End-to-end product design: research, UX flows, polished UI systems, developer-ready handoff.",
    icon: Palette,
    chips: ["User Research", "UX Flows & Wireframes", "UI Systems & Prototypes", "Dev Handoff"],
    tint: "#f2f6ff",
    iconTint: "bg-bloom-sky/50 text-accent-ink",
  },
  {
    num: "02",
    title: "Website Design",
    promise: "Brand-led, conversion-tuned sites: identity, art direction, motion, storytelling.",
    icon: LayoutTemplate,
    chips: ["Brand & Visual Identity", "Art Direction", "Motion & Micro-interactions", "Conversion Systems"],
    tint: "#f7f3ff",
    iconTint: "bg-bloom-lilac/50 text-[#6b4fc7]",
  },
  {
    num: "03",
    title: "Website Development",
    promise:
      "Production-grade Next.js, headless CMS, edge infra — SEO, accessibility, Core Web Vitals from day one.",
    icon: Code,
    chips: ["React / Next.js", "Node APIs", "Mobile (Flutter)", "CI/CD & Cloud"],
    tint: "#fff6f0",
    iconTint: "bg-bloom-peach/60 text-[#c05a2e]",
  },
  {
    num: "04",
    title: "AI Development",
    promise:
      "Production-ready AI: prototype to deployed models with evals, observability, and safety built in.",
    icon: Cpu,
    chips: ["LLM Apps & Agents (RAG)", "Fine-tuning & Prompt Ops", "Evals & Guardrails", "Vision / NLP / Speech"],
    tint: "#f0faf6",
    iconTint: "bg-bloom-mint/60 text-[#1d8a68]",
  },
  {
    num: "05",
    title: "AI Agents",
    promise:
      "Autonomous voice & tool-using agents for real workflows: call centers, scheduling, task automation.",
    icon: Bot,
    chips: ["Voice Agents", "Tool-using Agents", "Multi-provider Orchestration", "Knowledge & Memory"],
    tint: "#f0f2ff",
    iconTint: "bg-accent-soft text-accent-ink",
  },
  {
    num: "06",
    title: "AI-Integrated CRM",
    promise:
      "Bespoke CRMs with AI that auto-updates records, scores leads, and triggers outreach — no manual input.",
    icon: Database,
    chips: ["AI Lead Scoring", "HubSpot / Salesforce Sync", "Auto Data Enrichment", "Predictive Analytics"],
    tint: "#f2f6ff",
    iconTint: "bg-bloom-sky/50 text-accent-ink",
  },
];
