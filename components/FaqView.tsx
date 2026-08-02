"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useLanguage } from "@/lib/useLanguage";
import FaqList from "@/components/FaqList";

export default function FaqView() {
  const { isRTL } = useLanguage();
  const title = isRTL ? "الأسئلة الشائعة" : "Frequently Asked Questions";

  return (
    <div className="bg-cream text-ink pt-16 sm:pt-20 pb-24 sm:pb-28">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-champagne via-cream to-cream min-h-[200px] sm:min-h-[240px] lg:min-h-[280px] flex items-center justify-center text-center px-4 py-12">
        <div aria-hidden className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-gold/10 blur-3xl" />
        <div className="relative fade-in max-w-2xl">
          <nav aria-label="Breadcrumb" className="mb-3 text-sm text-muted flex items-center justify-center gap-1.5">
            <Link href="/" className="hover:text-gold-dark transition rounded focus-visible:ring-2 focus-visible:ring-gold focus:outline-none">
              {isRTL ? "الرئيسية" : "Home"}
            </Link>
            <ChevronRight size={14} aria-hidden className="rtl:rotate-180" />
            <span className="text-ink font-medium">{title}</span>
          </nav>
          <h1 className={`font-serif font-bold text-ink text-[28px] sm:text-4xl lg:text-5xl leading-tight ${isRTL ? "font-arabic" : ""}`}>
            {title}
          </h1>
          <p className={`mt-4 text-ink-soft text-base sm:text-lg ${isRTL ? "font-arabic" : ""}`}>
            {isRTL
              ? "إجابات عن الطلبات والشحن والإرجاع والدفع والمنتجات والدعم."
              : "Answers about orders, shipping, returns, payments, products, and support."}
          </p>
        </div>
      </section>

      {/* ── Wide container (Hero → FAQ ≈ 64px) ── */}
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 pt-14 lg:pt-16">
        <FaqList />
      </div>
    </div>
  );
}
