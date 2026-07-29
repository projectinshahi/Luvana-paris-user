"use client";

import { useMemo, useState } from "react";
import {
  Search, ChevronDown, Sparkles, ShoppingBag, CreditCard, Truck, RotateCcw,
  FlaskConical, User, Tag, LifeBuoy, type LucideIcon,
} from "lucide-react";
import { FAQS } from "@/lib/faqs";
import { useLanguage } from "@/lib/useLanguage";

// keyed by the English category (stable across languages)
const CATEGORY_ICON: Record<string, LucideIcon> = {
  General: Sparkles,
  Orders: ShoppingBag,
  Payments: CreditCard,
  "Shipping & Delivery": Truck,
  "Returns & Refunds": RotateCcw,
  Products: FlaskConical,
  "Customer Account": User,
  Promotions: Tag,
  "Customer Support": LifeBuoy,
};

export default function FaqList() {
  const { isRTL } = useLanguage();
  const [query, setQuery] = useState("");
  const dir = isRTL ? "rtl" : "ltr";

  // localized accessors
  const cat = (f: (typeof FAQS)[number]) => (isRTL ? f.categoryAr : f.category);
  const qt = (f: (typeof FAQS)[number]) => (isRTL ? f.qAr : f.q);
  const at = (f: (typeof FAQS)[number]) => (isRTL ? f.aAr : f.a);
  const list = (f: (typeof FAQS)[number]) => (isRTL ? f.listAr : f.list);
  const note = (f: (typeof FAQS)[number]) => (isRTL ? f.noteAr : f.note);

  const groups = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = q
      ? FAQS.filter((f) => qt(f).toLowerCase().includes(q) || at(f).toLowerCase().includes(q))
      : FAQS;
    const order: string[] = [];
    const map = new Map<string, typeof FAQS>();
    for (const f of filtered) {
      if (!map.has(f.category)) { map.set(f.category, []); order.push(f.category); }
      map.get(f.category)!.push(f);
    }
    return order.map((c) => ({ key: c, items: map.get(c)! }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, isRTL]);

  return (
    <div dir={dir}>
      {/* Search — sticky on mobile */}
      {/* <div className="sticky top-20 z-10 -mx-4 px-4 py-3 bg-cream/95 backdrop-blur mb-6 lg:static lg:mx-0 lg:px-0 lg:bg-transparent lg:py-0">
        <label className="relative block">
          <span className="sr-only">{isRTL ? "ابحث في الأسئلة الشائعة" : "Search FAQs"}</span>
          <Search size={16} className="absolute start-4 top-1/2 -translate-y-1/2 text-muted" aria-hidden />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={isRTL ? "ابحث عن سؤال…" : "Search questions…"}
            className="input-luxury ps-11"
          />
        </label>
      </div> */}

      {groups.length === 0 && (
        <p className="text-ink-soft text-center py-12">
          {isRTL ? `لا توجد نتائج لـ "${query}".` : `No results for “${query}”.`}
        </p>
      )}

      <div className="space-y-10">
        {groups.map(({ key, items }) => {
          const Icon = CATEGORY_ICON[key] ?? Sparkles;
          return (
            <section key={key} aria-label={cat(items[0])}>
              <h2 className="font-serif text-xl text-ink flex items-center gap-2.5 mb-4">
                <Icon size={18} className="text-gold-dark shrink-0" aria-hidden />
                {cat(items[0])}
              </h2>
              <div className="space-y-3">
                {items.map((f) => (
                  <details
                    key={f.n}
                    name="faq"
                    className="group card-luxury px-5 sm:px-6 [&_summary::-webkit-details-marker]:hidden"
                  >
                    <summary className="flex items-center justify-between gap-4 py-4 cursor-pointer list-none font-medium text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-lg">
                      <span>{f.n}. {qt(f)}</span>
                      <ChevronDown size={18} className="text-gold-dark shrink-0 transition-transform duration-300 group-open:rotate-180" aria-hidden />
                    </summary>
                    <div className="text-ink-soft leading-[1.8] text-[15px] pb-5 -mt-1 space-y-3">
                      <p>{at(f)}</p>
                      {list(f) && (
                        <ul className="space-y-1.5 ps-5 list-disc marker:text-gold">
                          {list(f)!.map((li, i) => <li key={i}>{li}</li>)}
                        </ul>
                      )}
                      {note(f) && <p>{note(f)}</p>}
                    </div>
                  </details>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
