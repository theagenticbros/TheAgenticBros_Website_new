"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import ScrollReveal from "./ui/ScrollReveal";

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("https://formsubmit.co/ajax/theagenticbros@gmail.com", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setStatus("success");
        form.reset();
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const inputClasses =
    "w-full rounded-2xl border border-line bg-white/80 px-5 py-3.5 text-ink placeholder:text-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/25 transition-all disabled:opacity-50";

  return (
    <section id="contact" className="relative overflow-hidden py-28 md:py-36">
      {/* Bloom backdrop */}
      <div className="bloom bloom-drift left-[15%] top-[10%] h-[28rem] w-[36rem] bg-bloom-peach opacity-50" />
      <div className="bloom bloom-drift-slow right-[10%] bottom-[5%] h-[26rem] w-[26rem] bg-bloom-sky opacity-50" />

      <div className="relative z-10 mx-auto max-w-2xl px-6 text-center">
        <ScrollReveal>
          <h2 className="text-balance font-heading text-4xl font-bold tracking-tight text-ink md:text-5xl">
            Tell us what you&apos;re building.
          </h2>
          <p className="mt-4 text-lg text-body">
            We&apos;ll tell you what it takes to automate it.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <div className="glass-strong mt-12 rounded-[32px] p-8 text-left md:p-10">
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="contact-name" className="mb-2 block text-sm font-semibold text-ink">
                  Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  name="Name"
                  required
                  disabled={status === "submitting"}
                  className={inputClasses}
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="mb-2 block text-sm font-semibold text-ink">
                  Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  name="Email"
                  required
                  disabled={status === "submitting"}
                  className={inputClasses}
                  placeholder="you@company.com"
                />
              </div>
              <div>
                <label htmlFor="contact-message" className="mb-2 block text-sm font-semibold text-ink">
                  Project details
                </label>
                <textarea
                  id="contact-message"
                  rows={4}
                  name="Message"
                  required
                  disabled={status === "submitting"}
                  className={`${inputClasses} resize-none`}
                  placeholder="What are you building? What should run on its own?"
                />
              </div>

              <input type="hidden" name="_captcha" value="false" />

              <button
                type="submit"
                disabled={status === "submitting"}
                className="clay-press inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-8 py-4 font-heading text-base font-semibold text-white transition-colors hover:bg-accent-ink disabled:opacity-60"
              >
                {status === "submitting" ? "Sending…" : "Send message"}
                <ArrowRight className="h-4 w-4" />
              </button>

              {status === "success" && (
                <p className="text-center text-sm font-medium text-[#1d8a68]" role="status">
                  Message sent — we&apos;ll be in touch soon.
                </p>
              )}
              {status === "error" && (
                <p className="text-center text-sm font-medium text-red-500" role="alert">
                  Something went wrong. Please try again or email us directly.
                </p>
              )}
            </form>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
