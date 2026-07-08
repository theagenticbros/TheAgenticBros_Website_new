import { Plus } from "lucide-react";
import ScrollReveal from "./ui/ScrollReveal";

/*
 * FAQ — answer-first copy written for AEO: AI search engines quote these
 * directly. Keep answers factual and self-contained. Exported so the
 * FAQPage JSON-LD on the page stays in sync with the visible content.
 * (Timelines are editable placeholders — client to confirm.)
 */
export const faqs = [
  {
    q: "What does The Agentic Bros build?",
    a: "The Agentic Bros designs and builds high-performance websites, AI agents, automation pipelines, and AI-integrated CRMs. Every project ships as a complete working system that keeps running after launch — not a static deliverable.",
  },
  {
    q: "What is an AI agent, and how can it help my business?",
    a: "An AI agent is software that performs real work autonomously: answering calls, qualifying leads, updating your CRM, scheduling appointments, and triggering outreach. It runs 24/7, so routine operations stop depending on manual effort.",
  },
  {
    q: "How long does a typical project take?",
    a: "Most websites ship in 2–4 weeks. AI automation and CRM systems typically take 3–6 weeks depending on scope. You see a working preview early in the process, not at the end.",
  },
  {
    q: "Do you work with clients worldwide?",
    a: "Yes. The Agentic Bros works fully remote with clients anywhere in the world, with async updates and clear milestones throughout the project.",
  },
  {
    q: "How do I start a project with The Agentic Bros?",
    a: "Use the contact form on this page or email theagenticbros@gmail.com. Describe what you're building, and we'll map out exactly what it takes to automate it — including scope, timeline, and cost.",
  },
];

export default function Faq() {
  return (
    <section id="faq" className="relative py-24 md:py-28">
      <div className="mx-auto max-w-3xl px-6">
        <div className="mb-12 text-center">
          <ScrollReveal>
            <span className="mb-4 block text-xs font-bold uppercase tracking-[0.18em] text-accent-ink">
              FAQ
            </span>
          </ScrollReveal>
          <ScrollReveal delay={0.06}>
            <h2 className="text-balance font-heading text-3xl font-bold tracking-tight text-ink md:text-4xl">
              Questions, answered.
            </h2>
          </ScrollReveal>
        </div>

        <div className="flex flex-col gap-4">
          {faqs.map((faq, i) => (
            <ScrollReveal key={faq.q} delay={i * 0.05}>
              <details className="clay-sm group p-6 open:pb-7">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-heading text-base font-bold text-ink [&::-webkit-details-marker]:hidden">
                  {faq.q}
                  <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-accent-soft text-accent-ink transition-transform duration-300 group-open:rotate-45">
                    <Plus className="h-4 w-4" />
                  </span>
                </summary>
                <p className="mt-4 max-w-[60ch] text-[15px] leading-relaxed text-body">{faq.a}</p>
              </details>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
