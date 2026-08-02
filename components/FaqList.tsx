"use client";

import { useMemo, useState, useEffect } from "react";
import {
  ChevronDown, Sparkles, ShoppingBag, CreditCard, Truck, RotateCcw,
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

const slugify = (c: string) => "faq-" + c.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
const reducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

export default function FaqList() {
  const { isRTL } = useLanguage();
  const [query, setQuery] = useState("");
  const [activeCat, setActiveCat] = useState("");
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

  // Desktop rail: track which category is in view (no scroll listeners).
  useEffect(() => {
    if (!groups.length) return;
    setActiveCat((prev) => prev || groups[0].key);
    const visible = new Set<string>();
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => (e.isIntersecting ? visible.add(e.target.id) : visible.delete(e.target.id)));
        for (const g of groups) {
          if (visible.has(slugify(g.key))) { setActiveCat(g.key); break; }
        }
      },
      { rootMargin: "-120px 0px -70% 0px", threshold: 0 }
    );
    groups.forEach((g) => {
      const el = document.getElementById(slugify(g.key));
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [groups]);

  const goTo = (key: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById(slugify(key));
    if (!el) return;
    el.scrollIntoView({ behavior: reducedMotion() ? "auto" : "smooth", block: "start" });
    setActiveCat(key);
    if (typeof window !== "undefined") window.history.pushState(null, "", `#${slugify(key)}`);
  };

  return (
    <div dir={dir} className="lg:grid lg:grid-cols-[minmax(260px,300px)_minmax(0,1fr)] lg:gap-10 xl:gap-14 lg:items-start">
      {/* ── Sticky category rail — desktop only (≥lg) ── */}
      {groups.length > 0 && (
        <nav
          aria-label={isRTL ? "فئات الأسئلة الشائعة" : "FAQ categories"}
          className="hidden lg:block sticky top-24 self-start max-h-[calc(100vh-7rem)] overflow-y-auto card-luxury p-6 scrollbar-hide"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-dark mb-3 px-1 text-start">
            {isRTL ? "الفئات" : "Categories"}
          </p>
          <ul className="space-y-1">
            {groups.map(({ key, items }) => {
              const active = activeCat === key;
              const Icon = CATEGORY_ICON[key] ?? Sparkles;
              return (
                <li key={key}>
                  <a
                    href={`#${slugify(key)}`}
                    aria-current={active ? "location" : undefined}
                    onClick={goTo(key)}
                    className={`flex items-center gap-2.5 py-2 px-3 text-sm rounded transition-colors text-start focus:outline-none focus-visible:ring-2 focus-visible:ring-gold ${
                      active
                        ? "text-gold-dark font-medium bg-gold/10 border-s-2 border-gold-dark"
                        : "text-ink-soft hover:text-gold-dark hover:bg-gold/5 border-s-2 border-transparent"
                    }`}
                  >
                    <Icon size={16} className="shrink-0" aria-hidden />
                    <span className="truncate">{cat(items[0])}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      )}

      {/* ── Accordion column ── */}
      <div className="min-w-0">
        {groups.length === 0 && (
          <p className="text-ink-soft text-center py-12">
            {isRTL ? `لا توجد نتائج لـ "${query}".` : `No results for “${query}”.`}
          </p>
        )}

        <div className="space-y-14">
          {groups.map(({ key, items }) => {
            const Icon = CATEGORY_ICON[key] ?? Sparkles;
            return (
              <section key={key} id={slugify(key)} aria-label={cat(items[0])} className="scroll-mt-28">
                <h2 className="font-serif text-2xl text-ink flex items-center gap-2.5 mb-6">
                  <Icon size={20} className="text-gold-dark shrink-0" aria-hidden />
                  {cat(items[0])}
                </h2>
                <div className="space-y-4">
                  {items.map((f) => (
                    <details
                      key={f.n}
                      name="faq"
                      className="group card-luxury px-5 sm:px-6 [&_summary::-webkit-details-marker]:hidden"
                    >
                      <summary className="flex items-center justify-between gap-4 min-h-14 py-4 cursor-pointer list-none font-medium text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-lg">
                        <span className="min-w-0 text-base sm:text-[17px]">{f.n}. {qt(f)}</span>
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
    </div>
  );
}
