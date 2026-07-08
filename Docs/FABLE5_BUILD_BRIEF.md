# The Agentic Bros — Website Rebuild: Master Brief for Fable 5

> **You are Fable 5.** This document is your complete source of truth. It was
> assembled by another agent that already read the entire old codebase, the
> reference screenshots, and interviewed the client. **You do not need to open
> the old repo to understand the project** — everything you need (content, brand,
> assets, design system, section specs, animation specs) is in this file.
>
> Read this whole file once before writing code. Then build.
>
> **If any instruction here is ambiguous or you hit a real fork, STOP and ask
> the client one crisp question with options — do not guess on brand-defining
> decisions.** A running list of "ask the client" items is at the very bottom.

---

## 0. TL;DR — What you are building

A **complete ground-up redesign** of *The Agentic Bros* agency website. The old
site is dark, neon-cyan, high-cognitive-load "cyberpunk." The new site is the
opposite: **light, calm, intelligent, NotebookLM-style** — with real
**glassmorphism + claymorphism**, and two signature showpieces that make a
prospective client think *"this agency clearly knows how to build."*

Two signature moments (the reasons this site exists):

1. **The Work Cylinder** — big glass cards arranged as a slowly-rotating 3D
   cylinder/drum. Each card **is one real project** (screenshot + name). On
   hover/focus, the card opens and the **client testimonial** for that project
   comes out. This merges portfolio + social proof into one hero interaction.

2. **The Living System** — the centerpiece animation that replaces the old "How
   We Work" timeline. A center-stage **claymorphic object that morphs** through
   stages (idea → wireframe → product → running system) **while a flow diagram
   wires itself together around it** as the user scrolls, with gradient
   connectors and traveling data pulses. Message: *"we architect living systems."*
   *(This is a fusion of two concepts the client picked — confirm the fusion
   reads right before over-investing; see ask-list item A1.)*

Everything else (hero, services, contact) is redesigned to be lighter and
lower-load in service of these two moments.

---

## 1. Project setup & where to build

- **Build target:** a **fresh Next.js project** in the current folder:
  `C:\Users\91628.SHIVAM\OneDrive\Desktop\MY_PROJECTS\TheAgenticBros_new\`
  (There is currently only an empty `Docs/` folder here — this file lives in it.)
- **Do NOT touch the old repo** at
  `C:\Users\91628.SHIVAM\OneDrive\Desktop\MY_PROJECTS\The_Agentic_Bros\theagenticbros`
  — it stays as an untouched backup.
- **Copy these assets over** from the old repo into the new project's
  `public/portfolio/` (they are the real project screenshots — reuse as-is):
  ```
  likhit-pens.webp   yaatra-express.webp   sundarban.webp
  leadstiq.webp      icreations.webp       pinaka-studio.webp
  pen-utsav.webp     financial-doctor-sandip.png   saumok.webp
  ```
  (9 files. Source: old repo `public/portfolio/`.)

### Stack (keep it close to what the client already knows)
- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4** (the `@theme` / `@import "tailwindcss"` style — same as old repo)
- **Framer Motion 12** for animation
- **lucide-react** for icons
- **NOTE (important):** The old repo's `AGENTS.md` warns that this Next.js
  version has breaking changes vs. training data. **Before writing Next-specific
  code, check `node_modules/next/dist/docs/` in the scaffolded project.** Prefer
  stable App Router patterns; heed deprecation notices.
- **3D:** Build the Work Cylinder and the Living System with **CSS 3D transforms
  (`transform-style: preserve-3d`) + Framer Motion + SVG**, NOT three.js, to keep
  the bundle light and the site fast. Only reach for `@react-three/fiber` if a
  concept genuinely can't be done in CSS/SVG — and ask first (bundle cost).

---

## 2. Who the client is & the goal

**The Agentic Bros** is an **AI & automation + web/design agency**. They build:
websites, product/UX design, AI apps & agents, automation pipelines, and
AI-integrated CRMs. Contact email: **theagenticbros@gmail.com**.

**Primary goal of the site:** build **trust** by showcasing real shipped work in
a way that feels crafted and premium, so prospects convert to "start a project"
inquiries. The client explicitly wants the work showcased in a *unique, memorable*
way and wants "crazy but tasteful" animation that signals design skill.

**Design north star:** *low cognitive load.* Calm, spacious, one clear focal
point per screen. The wow comes from **two or three deliberate signature moments**,
not from every element glowing at once. This is the biggest correction vs. the
old site.

---

## 3. Visual language — the design system

### 3.1 Palette — "NotebookLM soft-pastel" (light)

Warm near-white base, soft multi-color gradient blooms, one calm accent, heavy
near-black type. Define these as Tailwind v4 `@theme` tokens.

```
/* Base surfaces */
--bg-base:      #FAFAF7;  /* warm white — page background */
--bg-raised:    #FFFFFF;  /* cards / raised surfaces */
--bg-alt:       #F4F4EF;  /* alternating section band */

/* Ink / text */
--ink-strong:   #14151A;  /* headings, near-black */
--ink-body:     #4A4C55;  /* body copy */
--ink-muted:    #8A8C94;  /* captions, meta */

/* Accent (calm indigo/blue — the single brand accent) */
--accent:       #5B6CFF;  /* primary actions, active states */
--accent-ink:   #3A46C7;  /* accent text on light (AA contrast) */
--accent-soft:  #EAECFF;  /* accent tint fills */

/* Soft gradient-bloom stops (used at LOW opacity, blurred) */
--bloom-sky:    #BCD4FF;
--bloom-lilac:  #D9CCFF;
--bloom-peach:  #FFD9C2;
--bloom-mint:   #C8F0E4;

/* Lines */
--line:         rgba(20,21,26,0.08);
```

**Gradient blooms** = the NotebookLM signature. Large, very soft, low-opacity
radial gradients (sky → lilac → peach) floating behind sections, heavily blurred,
never sharp. They set mood without adding clutter. Use sparingly: hero, cylinder
backdrop, living-system backdrop, contact.

**Contrast rule:** all body text must hit WCAG AA on its background. `--accent`
(#5B6CFF) is for fills/large text; for small accent *text* use `--accent-ink`.

### 3.2 Typography

- **Display / headings:** `Space Grotesk` (keep from old site — it's a clean modern
  grotesk that reads calm and smart at heavy weights). Use 600/700. Large, tight
  tracking, near-black.
- **Body:** `Inter`. 400/500. Generous line-height (1.6–1.75).
- Load via `next/font/google` (same pattern as old `layout.tsx`).
- **Heading scale is deliberately big and confident** (NotebookLM/editorial):
  hero display ~ clamp(2.75rem, 6vw, 5rem). Don't be timid.
- *(Alt if you want a more editorial flavor: pair a heavy grotesk display with a
  single serif accent line — but only if it stays calm. Default to the above.)*

### 3.3 Glassmorphism (light version)

Real, subtle, light glass — not the dark neon panel from the old site.

```css
.glass {
  background: rgba(255, 255, 255, 0.55);
  backdrop-filter: blur(20px) saturate(140%);
  -webkit-backdrop-filter: blur(20px) saturate(140%);
  border: 1px solid rgba(255, 255, 255, 0.7);
  box-shadow: 0 8px 32px rgba(20, 21, 26, 0.06);
}
```
Use for: navbar, the Work Cylinder cards, floating chips/badges, contact card.

### 3.4 Claymorphism

Soft, tactile, "putty" surfaces — puffy, rounded, dual-shadow. This is the
texture that gives the site personality against the flat NotebookLM base.

```css
.clay {
  background: var(--bg-raised);
  border-radius: 32px;                /* clay is generously round: 24–40px */
  box-shadow:
     10px 10px 30px rgba(80, 90, 160, 0.14),   /* soft outer drop */
    -8px  -8px 24px rgba(255, 255, 255, 0.9),   /* light from top-left */
    inset  2px  2px  4px rgba(255, 255, 255, 0.7),
    inset -2px -2px  6px rgba(80, 90, 160, 0.06);
}
```
Use for: the Living System nodes/central object, service tiles, step/stat pills,
primary buttons (clay-style pressable). Pastel-tinted clay variants use
`--accent-soft` / bloom colors as the fill.

**Rule of thumb:** Glass = things that float over content (nav, cards over
imagery). Clay = things that are the content (tiles, nodes, buttons). Don't mix
both heavily on the same element.

### 3.5 Motion principles

- **Easing:** use `[0.16, 1, 0.3, 1]` (expo-out) — same as old site, feels premium.
- **Slow and intentional.** Signature animations run at low speed. Nothing frantic.
- **One focal animation per viewport.** Never two competing loops on screen.
- **Always** provide a `prefers-reduced-motion` fallback: freeze loops, replace
  scroll-driven morphs with a single clean static state, keep content readable.
- **Performance:** mount heavy canvases/animations only when in view
  (IntersectionObserver / Framer `whileInView`), pause when off-screen, throttle
  to rAF, and prefer transforms/opacity (GPU) over layout-affecting props.

---

## 4. Page structure (section-by-section)

Final section order (trimmed & focused vs. the old 8-section site — the old fake
"Dashboard Mockup" terminal is **dropped**, and the old "How We Work" timeline is
**replaced** by the Living System showpiece):

```
1. Navbar            (light glass, sticky)
2. Hero              (calm, NotebookLM soft-pastel, one bold promise)
3. Capability band   (compact "what we do / why us" — low height, high clarity)
4. Work Cylinder     ★ signature #1 — rotating glass cards = projects, hover → testimonial
5. Services          (unique but calm portrayal of the 6 disciplines)
6. The Living System ★ signature #2 — claymorphic morph + self-assembling diagram
7. Contact + Footer  (glass contact card, soft bloom, real form)
```

### Section 1 — Navbar
- Light glass bar, sticky top. Logo left: **"THE AGENTIC BROS"** (accent the word
  "BROS" in `--accent`). Center links: Work, Services, System (or "Process"),
  Contact. Right: a clay/pill **"Start a project"** CTA → scrolls to contact.
- Mobile: hamburger → clean sheet menu.

### Section 2 — Hero
- **Goal:** calm, confident, one promise. Massive near-black headline, short
  subline, one primary CTA. Big whitespace.
- **Background:** warm white + 2–3 soft gradient blooms drifting *very* slowly
  (sky/lilac/peach), heavily blurred. Optional: a single small claymorphic object
  (soft orb/badge) floating to one side as a texture anchor — subtle, not busy.
- **Copy (use this, refined from the old site — keep the meaning):**
  - Eyebrow chip: `AI & Automation · Design · Web`
  - Headline: **"We build systems that keep working after launch."**
    *(Alt option, keep in comments: "Autonomous revenue engines, designed &
    shipped." — client can choose; default to the first, it's calmer.)*
  - Subline: *"Websites, AI agents, and automation pipelines — designed to run
    your growth around the clock. No templates. No bloat."*
  - CTA: **"Start a project"** (primary, clay/pill) + a quiet secondary text link
    **"See our work ↓"** that scrolls to the cylinder.
- **Do NOT** rebuild the old 7,000-particle sphere. The hero must feel *light and
  quiet*. The spectacle lives in sections 4 and 6, not here.

### Section 3 — Capability band (merged "why us")
- A single low, calm band. Three short value props as clay tiles or a clean
  inline row. Content (condensed from the old "Differentiator" pillars):
  1. **Design that converts** — "Interfaces people actually want to use. Sub-second
     loads, real accessibility, conversion-tuned."
  2. **AI that does the work** — "Agents and automation pipelines that run 24/7 —
     data in, actions out, no human in the loop."
  3. **Systems, not deliverables** — "You get a running system that keeps working
     after the invoice is paid, not a static site."
- Keep it visually quiet — this is a supporting beat before the big cylinder.

### Section 4 — ★ The Work Cylinder (signature #1)
Full spec in **§5**. This is the emotional peak of the page.

### Section 5 — Services
- **Unique-but-calm portrayal** of the 6 disciplines (content in §6). The old site
  used a scroll-pinned particle canvas + fading rows — too heavy. Instead, aim for
  something distinctive yet low-load. Recommended direction:
  **claymorphic service tiles** in a soft bento/grid, each tile a pastel clay
  surface with an icon, title, one-line promise, and its capability chips. On
  hover, the tile gently lifts (clay press-out) and its accent bloom brightens.
  Optionally one tile is "featured" (larger, in the bento). Keep copy tight.
- *(If you have a stronger unique idea for services that stays calm and on-brand,
  propose it to the client as an option rather than silently switching — ask-list
  item A2.)*

### Section 6 — ★ The Living System (signature #2)
Full spec in **§7**. Replaces "How We Work."

### Section 7 — Contact + Footer
- **Contact:** glass card on a soft bloom background. Heading: *"Tell us what
  you're building."* Sub: *"We'll tell you what it takes to automate it."*
  Form fields: **Name, Email, Project details** (textarea) + submit.
- **Form wiring:** keep the old, working approach — POST as JSON to
  `https://formsubmit.co/ajax/theagenticbros@gmail.com` with a hidden
  `_captcha=false` field; show submitting / success / error states. (Ported from
  the old `Footer.tsx`, which works.)
- **Footer bottom:** logo, social icons (GitHub, X, LinkedIn, email — the old ones
  are placeholder `#` links except email `mailto:theagenticbros@gmail.com`; keep
  email real, leave socials as `#` until client provides them — ask-list A3),
  `© 2026 The Agentic Bros. All rights reserved.`

---

## 5. ★ Work Cylinder — full spec (signature #1)

**Concept:** A horizontal 3D **cylinder/drum** of large glass cards. The cards are
arranged around the curved surface of a cylinder whose axis is vertical, so the
cards face outward and the whole drum rotates slowly and continuously (like a
carousel viewed in perspective). Front-facing cards are large and legible; side
cards recede with perspective. It reads as a premium, physical object.

**Each card = one real project.** Card front shows: the project **screenshot**
(from `public/portfolio/`), the **project name**, its **type tag**, and a small
**"Live"** dot. Cards are **big** and the whole piece should be **portrayed
grandly** — give it a tall, generous section with breathing room and a soft
gradient-bloom backdrop.

**The hover/focus reveal (the magic):** when a card is hovered (desktop) or
focused (keyboard) or tapped (mobile), the **cylinder rotation pauses**, that card
comes forward / scales up slightly, and it **opens to reveal the testimonial** for
that project — the client quote, name, role, and the result. Use a smooth flip or
a "card opens like a panel" motion (your call — flip is clean and on-theme). When
the pointer leaves / focus moves on, it closes and rotation resumes.

**Behavior details:**
- Continuous slow auto-rotation (e.g. full turn ~40–60s). Pause on hover/focus.
- Build with CSS 3D: a container with `perspective`, an inner
  `transform-style: preserve-3d` drum rotated by an animated `rotateY`, each card
  positioned with `rotateY(i * θ) translateZ(radius)`. Animate the drum's
  `rotateY` with Framer Motion (or rAF) for buttery motion.
- Cards are **glassmorphic** (see §3.3) so the bloom shows through their edges.
- **Accessibility:** cards must be real focusable elements (`<button>`/`<a>` or
  `tabIndex`), keyboard-navigable (arrow/Tab), reveal on focus, and there must be
  a **reduced-motion / no-JS fallback**: if `prefers-reduced-motion`, render the
  same cards as a normal responsive **grid** (no rotation) where hover/focus still
  reveals the testimonial. This also covers SEO — the project + testimonial text
  is in the DOM regardless.
- **Mobile:** a full 3D drum is awkward on small screens. Fall back to a
  **swipeable horizontal carousel** (snap scrolling) of the same big cards, tap to
  reveal testimonial. Keep it grand.
- **Performance:** only spin while the section is in view.

**Data:** the 9 projects + generated testimonials are in **§6 table**. Wire card
front from the project fields, card back from the testimonial fields.

---

## 6. Content — projects, testimonials, services (ready to paste)

### 6.1 Projects + testimonials

> **Testimonials are AI-generated placeholders** — realistic, on-brand, and safe,
> but **the client will edit/replace them** later. Keep them in a single typed
> array (e.g. `src/data/projects.ts`) so they're trivial to edit. Names are
> invented; do not imply they are verified.
> **Add a code comment at the top of the data file: `// PLACEHOLDER testimonials —
> client to review & replace. Names are illustrative.`**

| # | Project | Type tag | Image (`/portfolio/…`) | URL | Front description | Testimonial (placeholder) — quote / name / role / result |
|---|---------|----------|------------------------|-----|-------------------|-----------------------------------------------------------|
| 1 | **Likhit Pen** | Ecommerce | `likhit-pens.webp` | https://likhit-pens-website.vercel.app/ | Premium stationery store with product showcase and a smooth checkout. | *"They turned our pens into an experience. The store feels as premium as the products — and it actually sells."* — **Aarav Mehta**, Founder, Likhit Pen · **+38% checkout completion** |
| 2 | **Yaatra Express** | Travel · Mobile-first | `yaatra-express.webp` | https://yaatraexpress.com | Travel & transport site, mobile-optimized with clean route info. | *"Most of our bookings come from phones, and the new site just works. Fast, clear, no clutter."* — **Priya Nair**, Operations Lead, Yaatra Express · **2.1s → 0.9s load on mobile** |
| 3 | **Sundarban Xpress** | Travel · Nature | `sundarban.webp` | https://sundarbanxpress.in | Nature & tour site for the Sundarbans, built for speed and mobile. | *"It captures the feel of the Sundarbans and loads instantly even on weak signal. Enquiries went up right away."* — **Rahul Das**, Owner, Sundarban Xpress · **+27% tour enquiries** |
| 4 | **Leadstiq** | CRM · SaaS | `leadstiq.webp` | https://leadstiq.vercel.app | Full CRM + conversion-focused landing page for growing sales teams. | *"We went from spreadsheets to a real CRM in weeks. The team finally trusts the pipeline."* — **Sneha Kapoor**, Head of Sales, Leadstiq · **6 hrs/week saved per rep** |
| 5 | **Icreations** | Interior Design | `icreations.webp` | https://icreationsinterior.com/ | Minimalist interior-design studio site — elegant portfolio, clean type. | *"Elegant, quiet, and exactly on-brand. Clients tell us the site made them call."* — **Neha Sharma**, Principal Designer, Icreations · **+41% consult requests** |
| 6 | **Pinaka Studios** | Film · Scroll animation | `pinaka-studio.webp` | https://pinaka-studio.netlify.app/ | Film-studio site with cinematic scroll-frame animation sequences. | *"The scroll sequences feel like a title reel. It's the first thing producers mention."* — **Vikram Rao**, Creative Director, Pinaka Studios · **3× avg. time on site** |
| 7 | **Pen Utsav** | Event · Interactive | `pen-utsav.webp` | https://penutsav-shrish.netlify.app | Interactive event site — gallery, schedule, and registration in one. | *"Registrations, schedule, gallery — all in one smooth place. Attendees loved it."* — **Shrish Gupta**, Organizer, Pen Utsav · **+52% online registrations** |
| 8 | **Financial Doctor Sandip** | Lead-gen · Advisor | `financial-doctor-sandip.png` | https://financialdoctorsandip.com | Advisor site — services, claim help, calculators, WhatsApp-first lead capture. | *"The WhatsApp-first flow doubled my qualified leads. Clients reach me in one tap."* — **Sandip Kumar**, Financial Advisor · **2× qualified leads via WhatsApp** |
| 9 | **Saumok Portfolio** | Portfolio · Animation-rich | `saumok.webp` | https://saumok-portfolio.vercel.app/ | Personal portfolio with rich scroll animation showcasing design & dev work. | *"It doesn't look like a portfolio — it looks like a product. It gets me the interviews."* — **Saumok**, Designer & Developer · **landed 3 client offers in a month** |

### 6.2 Services (6 disciplines) — content for §5

Keep the client's real services & capability chips (condensed from the old site).

1. **UI/UX Design** — *End-to-end product design: research, UX flows, polished UI
   systems, developer-ready handoff.*
   Chips: User Research · UX Flows & Wireframes · UI Systems & Prototypes · Dev Handoff
2. **Website Design** — *Brand-led, conversion-tuned sites: identity, art
   direction, motion, storytelling.*
   Chips: Brand & Visual Identity · Art Direction · Motion & Micro-interactions · Conversion Systems
3. **Website Development** — *Production-grade Next.js, headless CMS, edge infra —
   SEO, accessibility, Core Web Vitals from day one.*
   Chips: React / Next.js · Node APIs · Mobile (Flutter) · CI/CD & Cloud
4. **AI Development** — *Production-ready AI: prototype to deployed models with
   evals, observability, and safety built in.*
   Chips: LLM Apps & Agents (RAG) · Fine-tuning & Prompt Ops · Evals & Guardrails · Vision/NLP/Speech
5. **AI Agents** — *Autonomous voice & tool-using agents for real workflows: call
   centers, scheduling, task automation.*
   Chips: Voice Agents · Tool-using Agents · Multi-provider Orchestration · Knowledge & Memory
6. **AI-Integrated CRM** — *Bespoke CRMs with AI that auto-updates records, scores
   leads, and triggers outreach — no manual input.*
   Chips: AI Lead Scoring · HubSpot/Salesforce Sync · Auto Data Enrichment · Predictive Analytics

Icons (lucide-react, matching old intent): Palette, LayoutTemplate, Code,
Cpu, Bot, Database.

---

## 7. ★ The Living System — full spec (signature #2)

**Concept (fusion the client asked for):** the "self-assembling system diagram"
combined with the "claymorphic morph object." A scroll-driven centerpiece that
replaces the old 5-step timeline.

**What the user sees:** a center-stage **soft claymorphic form** (a putty-like
object) sits pinned while the section scrolls. As the user scrolls through the
section, that central form **morphs through the stages of building** —
`idea (blob) → wireframe (slab) → product (device/screen) → running system
(glowing networked core)`. **Simultaneously**, around it, a **flow diagram wires
itself together**: labeled clay nodes drop in one by one and **gradient
connectors draw between them**, with small **data pulses traveling along the
wires**. The central clay morph and the diagram assembly are **synced to scroll
progress** so it feels like one intelligent system coming alive.

**The 5 stages / nodes** (reuse the client's real process, condensed):
1. **Discover** — "Find the friction. Map the automation opportunities."
2. **Design** — "Architect the flows, the interfaces, the data."
3. **Build** — "Ship the frontend while agents & pipelines train in parallel."
4. **Automate** — "Wire data sources to actions. Red-team the edge cases."
5. **Scale** — "Monitor, refine, and compound results over time."

**Implementation guidance:**
- Use a **pinned/sticky** section with scroll progress (Framer Motion
  `useScroll` + `useTransform`, or a scrubbed timeline). Drive both the central
  morph and the node/wire reveal from the same normalized `0→1` progress value.
- **Central object:** do it with **layered SVG shapes / blurred clay divs that
  cross-fade and reshape**, or morph an SVG path (`<path>` `d` interpolation) — NOT
  three.js. Give it the clay treatment (§3.4): soft dual shadows, pastel fill,
  putty highlights.
- **Wires:** SVG `<path>` with `stroke-dasharray`/`stroke-dashoffset` animated to
  "draw" as progress advances; gradient stroke (accent → bloom). Data pulses = a
  small circle animated along the path (`offset-path` or animated position).
- **Nodes:** clay tiles with icon + label; fade/scale in on their stage's
  progress window.
- **Reduced motion / mobile:** render the 5 stages as a **clean static vertical
  list** (clay step tiles connected by a simple line), no scrubbing. Same content,
  no spectacle. On mobile, prefer this static version or a lightly-animated
  version — do not force heavy scroll-scrubbing on phones.
- **Keep it calm:** soft, slow, one focal object. This is a showpiece, not a
  seizure. Gradient blooms behind it, lots of space.

> ⚠️ **Confirm the fusion with the client (ask-list A1)** before spending heavy
> time — the client wrote "this idea combined with your 4th idea," which we read
> as *self-assembling diagram (#1) + claymorphic morph (#4)*. Show a quick version
> and confirm the direction is right.

---

## 8. Quality bar & non-negotiables

- **Low cognitive load above all.** If a screen has two things competing for
  attention, remove one. Whitespace is a feature.
- **Real, tasteful glass + clay** — subtle, physically plausible shadows and blur.
  No muddy over-blur, no harsh neon (that was the old site's mistake).
- **Accessibility:** semantic HTML, keyboard operability for both signature
  interactions, visible focus states, AA contrast, and full
  `prefers-reduced-motion` fallbacks (both showpieces must degrade gracefully).
- **Performance:** Core Web Vitals-minded. Lazy-mount heavy animation, pause
  off-screen, `next/image` for portfolio screenshots, GPU-friendly transforms.
  Target fast LCP — the hero is light on purpose.
- **Responsive:** every section works on mobile with the documented fallbacks.
- **SEO/metadata:** set `<title>` and description (reuse/refresh the old:
  *"The Agentic Bros — AI systems & high-performance web."*). All project +
  testimonial text lives in the DOM (not painted-only in canvas).
- **Content integrity:** testimonials are clearly-flagged placeholders in one
  editable file; social links stay `#` until the client provides real ones.
- **Code quality:** typed data files, small focused components, comments where a
  reader (Fable-5 style, matching surrounding code) would want them.

---

## 9. Suggested file layout

```
TheAgenticBros_new/
  Docs/FABLE5_BUILD_BRIEF.md        ← this file
  public/portfolio/                 ← 9 images copied from old repo
  src/
    app/
      layout.tsx                    ← fonts (Space Grotesk + Inter), metadata, light bg
      page.tsx                      ← composes the 7 sections
      globals.css                   ← @theme tokens, .glass, .clay, bloom utils, reduced-motion
    data/
      projects.ts                   ← 9 projects + placeholder testimonials (typed)
      services.ts                   ← 6 services + chips + icons
    components/
      Navbar.tsx
      Hero.tsx
      CapabilityBand.tsx
      WorkCylinder.tsx              ★ signature #1 (+ CylinderCard, fallback grid)
      Services.tsx                  ← clay bento
      LivingSystem.tsx              ★ signature #2 (+ static fallback)
      Contact.tsx                   ← glass form card (formsubmit.co)
      Footer.tsx
      ui/  (Bloom.tsx, ClayButton.tsx, GlassCard.tsx, ScrollReveal.tsx, etc.)
```

---

## 10. Build order (so you always have something showable)

1. Scaffold Next.js + Tailwind v4; port fonts & metadata; set the light base +
   tokens + `.glass` / `.clay` / bloom utilities in `globals.css`. Copy the 9
   images. **Verify the design system on a throwaway page first.**
2. Navbar + Hero + Capability band (the calm frame).
3. `data/projects.ts` + **Work Cylinder** (signature #1) — build the grid
   fallback first, then layer the 3D drum + hover-reveal on top.
4. Services (clay bento).
5. **Living System** (signature #2) — static fallback first, then the scroll morph
   + self-assembling diagram. **Confirm the fusion direction with client early.**
6. Contact + Footer (wire the form).
7. Accessibility + reduced-motion passes, responsive/mobile fallbacks, performance
   pass, metadata. Ship.

---

## 11. ⚠️ Ask the client (don't guess on these)

- **A1 — Living System fusion:** Confirm the centerpiece = *self-assembling flow
  diagram + claymorphic morphing central object*, synced to scroll. Show a rough
  version and confirm before polishing.
- **A2 — Services treatment:** Default is a claymorphic bento of the 6 services.
  If you invent a different "unique" services animation, offer it as an option
  rather than switching silently.
- **A3 — Social links & real details:** Get real GitHub / X / LinkedIn URLs (old
  site had placeholders). Confirm the contact email `theagenticbros@gmail.com` and
  whether `formsubmit.co` is still the desired form backend.
- **A4 — Testimonials:** Flag that all 9 are AI-generated placeholders; ask the
  client to review/replace before launch (and confirm they're OK using invented
  names temporarily).
- **A5 — Hero headline:** Two options provided in §4; let the client pick, or
  approve the default ("We build systems that keep working after launch.").
- **A6 — Logo/wordmark:** Currently a text wordmark ("THE AGENTIC **BROS**"). Ask
  if there's a real logo asset to use instead.

---

*End of brief. Everything the client discussed is captured above. Build calm,
build tactile, and make the Work Cylinder and the Living System unforgettable.*
