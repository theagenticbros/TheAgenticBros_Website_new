import { Zap, Brain, Workflow } from "lucide-react";
import ScrollReveal from "./ui/ScrollReveal";

const pillars = [
  {
    icon: Zap,
    title: "Design that converts",
    text: "Interfaces people actually want to use. Sub-second loads, real accessibility, conversion-tuned.",
    iconTint: "bg-bloom-sky/50 text-accent-ink",
  },
  {
    icon: Brain,
    title: "AI that does the work",
    text: "Agents and automation pipelines that run 24/7 — data in, actions out, no human in the loop.",
    iconTint: "bg-bloom-lilac/50 text-[#6b4fc7]",
  },
  {
    icon: Workflow,
    title: "Systems, not deliverables",
    text: "You get a running system that keeps working after the invoice is paid, not a static site.",
    iconTint: "bg-bloom-mint/60 text-[#1d8a68]",
  },
];

/* A single low, calm band — a supporting beat before the Work Cylinder. */
export default function CapabilityBand() {
  return (
    <section className="relative py-20">
      <div className="mx-auto grid max-w-6xl gap-5 px-6 md:grid-cols-3">
        {pillars.map((pillar, i) => (
          <ScrollReveal key={pillar.title} delay={i * 0.08}>
            <div className="clay group h-full p-8 transition-transform duration-300 hover:-translate-y-1">
              <div
                className={`mb-5 flex h-12 w-12 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110 ${pillar.iconTint}`}
              >
                <pillar.icon className="h-5 w-5" />
              </div>
              <h3 className="mb-2 font-heading text-lg font-bold text-ink">{pillar.title}</h3>
              <p className="text-[15px] leading-relaxed text-body">{pillar.text}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
