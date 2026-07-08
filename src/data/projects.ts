// PLACEHOLDER testimonials — client to review & replace. Names are illustrative.

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  result: string;
}

export interface Project {
  slug: string;
  title: string;
  type: string;
  image: string;
  url: string;
  description: string;
  testimonial: Testimonial;
}

export const projects: Project[] = [
  {
    slug: "likhit-pen",
    title: "Likhit Pen",
    type: "Ecommerce",
    image: "/portfolio/likhit-pens.webp",
    url: "https://likhit-pens-website.vercel.app/",
    description: "Premium stationery store with product showcase and a smooth checkout.",
    testimonial: {
      quote:
        "They turned our pens into an experience. The store feels as premium as the products — and it actually sells.",
      name: "Aarav Mehta",
      role: "Founder, Likhit Pen",
      result: "+38% checkout completion",
    },
  },
  {
    slug: "yaatra-express",
    title: "Yaatra Express",
    type: "Travel · Mobile-first",
    image: "/portfolio/yaatra-express.webp",
    url: "https://yaatraexpress.com",
    description: "Travel & transport site, mobile-optimized with clean route info.",
    testimonial: {
      quote:
        "Most of our bookings come from phones, and the new site just works. Fast, clear, no clutter.",
      name: "Priya Nair",
      role: "Operations Lead, Yaatra Express",
      result: "2.1s → 0.9s load on mobile",
    },
  },
  {
    slug: "sundarban-xpress",
    title: "Sundarban Xpress",
    type: "Travel · Nature",
    image: "/portfolio/sundarban.webp",
    url: "https://sundarbanxpress.in",
    description: "Nature & tour site for the Sundarbans, built for speed and mobile.",
    testimonial: {
      quote:
        "It captures the feel of the Sundarbans and loads instantly even on weak signal. Enquiries went up right away.",
      name: "Rahul Das",
      role: "Owner, Sundarban Xpress",
      result: "+27% tour enquiries",
    },
  },
  {
    slug: "leadstiq",
    title: "Leadstiq",
    type: "CRM · SaaS",
    image: "/portfolio/leadstiq.webp",
    url: "https://leadstiq.vercel.app",
    description: "Full CRM + conversion-focused landing page for growing sales teams.",
    testimonial: {
      quote: "We went from spreadsheets to a real CRM in weeks. The team finally trusts the pipeline.",
      name: "Sneha Kapoor",
      role: "Head of Sales, Leadstiq",
      result: "6 hrs/week saved per rep",
    },
  },
  {
    slug: "icreations",
    title: "Icreations",
    type: "Interior Design",
    image: "/portfolio/icreations.webp",
    url: "https://icreationsinterior.com/",
    description: "Minimalist interior-design studio site — elegant portfolio, clean type.",
    testimonial: {
      quote: "Elegant, quiet, and exactly on-brand. Clients tell us the site made them call.",
      name: "Neha Sharma",
      role: "Principal Designer, Icreations",
      result: "+41% consult requests",
    },
  },
  {
    slug: "pinaka-studios",
    title: "Pinaka Studios",
    type: "Film · Scroll animation",
    image: "/portfolio/pinaka-studio.webp",
    url: "https://pinaka-studio.netlify.app/",
    description: "Film-studio site with cinematic scroll-frame animation sequences.",
    testimonial: {
      quote: "The scroll sequences feel like a title reel. It's the first thing producers mention.",
      name: "Vikram Rao",
      role: "Creative Director, Pinaka Studios",
      result: "3× avg. time on site",
    },
  },
  {
    slug: "pen-utsav",
    title: "Pen Utsav",
    type: "Event · Interactive",
    image: "/portfolio/pen-utsav.webp",
    url: "https://penutsav-shrish.netlify.app",
    description: "Interactive event site — gallery, schedule, and registration in one.",
    testimonial: {
      quote: "Registrations, schedule, gallery — all in one smooth place. Attendees loved it.",
      name: "Shrish Gupta",
      role: "Organizer, Pen Utsav",
      result: "+52% online registrations",
    },
  },
  {
    slug: "financial-doctor-sandip",
    title: "Financial Doctor Sandip",
    type: "Lead-gen · Advisor",
    image: "/portfolio/financial-doctor-sandip.png",
    url: "https://financialdoctorsandip.com",
    description: "Advisor site — services, claim help, calculators, WhatsApp-first lead capture.",
    testimonial: {
      quote: "The WhatsApp-first flow doubled my qualified leads. Clients reach me in one tap.",
      name: "Sandip Kumar",
      role: "Financial Advisor",
      result: "2× qualified leads via WhatsApp",
    },
  },
  {
    slug: "saumok-portfolio",
    title: "Saumok Portfolio",
    type: "Portfolio · Animation-rich",
    image: "/portfolio/saumok.webp",
    url: "https://saumok-portfolio.vercel.app/",
    description: "Personal portfolio with rich scroll animation showcasing design & dev work.",
    testimonial: {
      quote: "It doesn't look like a portfolio — it looks like a product. It gets me the interviews.",
      name: "Saumok",
      role: "Designer & Developer",
      result: "Landed 3 client offers in a month",
    },
  },
];
