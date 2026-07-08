import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CapabilityBand from "@/components/CapabilityBand";
import WorkCylinder from "@/components/WorkCylinder";
import Services from "@/components/Services";
import LivingSystem from "@/components/LivingSystem";
import Faq, { faqs } from "@/components/Faq";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { projects } from "@/data/projects";
import { services } from "@/data/services";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION, SITE_EMAIL } from "@/lib/site";

/*
 * Structured data for SEO + AEO (Google rich results and AI search engines).
 * The FAQPage entity mirrors the visible <Faq /> content exactly.
 */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      email: SITE_EMAIL,
      description: SITE_DESCRIPTION,
      knowsAbout: [
        "AI automation",
        "AI agents",
        "web development",
        "UI/UX design",
        "CRM systems",
        "workflow automation",
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Services",
        itemListElement: services.map((s) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: s.title,
            description: s.promise,
            provider: { "@id": `${SITE_URL}/#organization` },
          },
        })),
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}/#faq`,
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
    {
      "@type": "ItemList",
      "@id": `${SITE_URL}/#portfolio`,
      name: "Client projects by The Agentic Bros",
      itemListElement: projects.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "WebSite",
          name: p.title,
          url: p.url,
          description: p.description,
        },
      })),
    },
  ],
};

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-clip bg-canvas text-ink">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <Hero />
      <CapabilityBand />
      <WorkCylinder />
      <Services />
      <LivingSystem />
      <Faq />
      <Contact />
      <Footer />
    </main>
  );
}
