import type { Metadata } from "next";
import FaqView from "@/components/FaqView";
import { FAQS } from "@/lib/faqs";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | LuvanaParis",
  description: "Find answers about orders, shipping, returns, payments, products, and customer support.",
};

// JSON-LD uses the English copy for SEO.
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: [f.a, ...(f.list ?? []), f.note].filter(Boolean).join(" "),
    },
  })),
};

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <FaqView />
    </>
  );
}
