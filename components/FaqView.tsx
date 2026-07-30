"use client";

import { useLanguage } from "@/lib/useLanguage";
import LegalShell from "@/components/LegalShell";
import FaqList from "@/components/FaqList";

export default function FaqView() {
  const { isRTL } = useLanguage();
  return (
    <LegalShell
      title={isRTL ? "الأسئلة الشائعة" : "Frequently Asked Questions"}
      description={
        isRTL
          ? "إجابات عن الطلبات والشحن والإرجاع والدفع والمنتجات وخدمة العملاء."
          : "Answers about orders, shipping, returns, payments, products, and support."
      }
      contentDir={isRTL ? "rtl" : "ltr"}
    >
      <FaqList />
    </LegalShell>
  );
}
