import React, { ReactNode, useState, useEffect, useRef, memo, useCallback } from "react";
import Link from "next/link";
import { ChevronRight, MapPin, Phone, Mail, Clock, type LucideIcon } from "lucide-react";

export type LegalSection = { id: string; icon: LucideIcon; heading: string; body: ReactNode };

// Shared block renderer for legal content (paragraphs + bullet lists).
export type LegalBlock = { p: string } | { ul: string[] };
export function LegalBlocks({ blocks }: { blocks: LegalBlock[] }) {
  return (
    <>
      {blocks.map((b, i) =>
        "p" in b ? (
          <p key={i}>{b.p}</p>
        ) : (
          <ul key={i} className="space-y-1.5 ps-5 list-disc marker:text-gold text-start">
            {b.ul.map((li, j) => (
              <li key={j}>{li}</li>
            ))}
          </ul>
        )
      )}
    </>
  );
}

// Honor prefers-reduced-motion for programmatic scrolling.
const scrollBehavior = (): ScrollBehavior =>
  typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    ? "auto"
    : "smooth";

// Real address per the legal docs
const CONTACT = {
  company: "LuvanaParis — Marriott United Company",
  address: "Al-Arbeed Plaza Complex, Block #4, Street #55, 1st Tower, 4th Floor, Farwaniya, Kuwait",
  phone: "+965 0000 0000",
  email: "support@luvanaparis.com",
  hours: "Sun – Thu · 9:00 – 18:00",
};

// Memoized Desktop & Tablet Sticky Sidebar (≥ md)
const DesktopSidebarNav = memo(function DesktopSidebarNav({
  sections,
  activeSection,
  onSectionClick,
  tocLabel,
}: {
  sections: LegalSection[];
  activeSection: string;
  onSectionClick: (id: string, e?: React.MouseEvent) => void;
  tocLabel: string;
}) {
  return (
    <nav
      aria-label="Table of contents"
      // className="hidden md:block w-60 lg:w-72 shrink-0 sticky top-28 self-start max-h-[calc(100vh-8rem)] overflow-y-auto card-luxury p-4 shadow-xs scrollbar-thin scrollbar-thumb-gold/20"
      className="
hidden
lg:block
sticky
top-24
self-start
h-fit
w-full
max-h-[calc(100vh-96px)]
overflow-y-auto
card-luxury
p-4
shadow-xs
scrollbar-thin
scrollbar-thumb-gold/20
"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-dark mb-3 px-1 text-start">
        {tocLabel}
      </p>
      <ul className="space-y-1">
        {sections.map((s) => {
          const isActive = activeSection === s.id;
          return (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                aria-current={isActive ? "location" : undefined}
                onClick={(e) => onSectionClick(s.id, e)}
                className={`block py-2 px-3 text-sm transition-colors rounded text-start focus:outline-none focus-visible:ring-2 focus-visible:ring-gold ${
                  isActive
                    ? "text-gold-dark font-medium bg-gold/10 border-s-2 border-gold-dark"
                    : "text-ink-soft hover:text-gold-dark hover:bg-gold/5 border-s-2 border-transparent"
                }`}
              >
                {s.heading}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
});

// Memoized Mobile Horizontal Navigation Tabs (< md)
const MobileTabNav = memo(function MobileTabNav({
  sections,
  activeSection,
  onSectionClick,
  mobileTabRefs,
}: {
  sections: LegalSection[];
  activeSection: string;
  onSectionClick: (id: string) => void;
  mobileTabRefs: React.MutableRefObject<Record<string, HTMLButtonElement | null>>;
}) {
  return (
    <div className="md:hidden sticky top-14 sm:top-16 z-30 bg-cream/95 backdrop-blur border-b border-line shadow-xs py-2.5 px-3">
      <nav
        aria-label="Mobile table of contents"
        className="flex gap-2 overflow-x-auto scrollbar-hide py-0.5 px-1 items-center"
      >
        {sections.map((s) => {
          const isActive = activeSection === s.id;
          return (
            <button
              key={s.id}
              ref={(el) => {
                mobileTabRefs.current[s.id] = el;
              }}
              type="button"
              onClick={() => onSectionClick(s.id)}
              aria-current={isActive ? "location" : undefined}
              className={`shrink-0 text-xs sm:text-sm py-1.5 px-3.5 rounded-full transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold ${
                isActive
                  ? "bg-gold-dark text-white font-medium shadow-xs"
                  : "bg-white/80 text-ink-soft hover:text-gold-dark hover:bg-gold/10 border border-line/60"
              }`}
            >
              {s.heading}
            </button>
          );
        })}
      </nav>
    </div>
  );
});

export default function LegalShell({
  title,
  description,
  sections,
  children,
  contentDir = "ltr",
  tocLabel = "On this page",
}: {
  title: string;
  description: string;
  sections?: LegalSection[]; // drives the sticky sidebar + content cards
  children?: ReactNode; // used instead of `sections` (e.g. FAQ accordion)
  contentDir?: "ltr" | "rtl"; // flips the content column for Arabic
  tocLabel?: string;
}) {
  const [activeSection, setActiveSection] = useState<string>("");
  const isManualScrollRef = useRef<boolean>(false);
  const manualScrollTimerRef = useRef<NodeJS.Timeout | null>(null);
  const mobileTabRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  // Initialize active section to first section on mount or URL hash
  useEffect(() => {
    if (sections && sections.length > 0) {
      const hash = typeof window !== "undefined" ? window.location.hash.replace("#", "") : "";
      if (hash && sections.some((s) => s.id === hash)) {
        setActiveSection(hash);
      } else if (!activeSection) {
        setActiveSection(sections[0].id);
      }
    }
  }, [sections]);

  // Intersection Observer for scroll tracking
  useEffect(() => {
    if (!sections || sections.length === 0) return;

    const visibleSections = new Set<string>();

    const observer = new IntersectionObserver(
      (entries) => {
        if (isManualScrollRef.current) return;

        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visibleSections.add(entry.target.id);
          } else {
            visibleSections.delete(entry.target.id);
          }
        });

        // Pick the first section in DOM order that is currently visible
        for (const s of sections) {
          if (visibleSections.has(s.id)) {
            setActiveSection(s.id);
            break;
          }
        }
      },
      {
        // rootMargin: "-100px 0px -45% 0px",
        // threshold: 0.1,
        rootMargin: "-120px 0px -65% 0px",
threshold: 0,
      }
    );

    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections]);

  // Automatically scroll active mobile tab into view horizontally
  useEffect(() => {
    if (!activeSection) return;
    const tabEl = mobileTabRefs.current[activeSection];
    if (tabEl) {
      tabEl.scrollIntoView({
        behavior: scrollBehavior(),
        block: "nearest",
        inline: "center",
      });
    }
  }, [activeSection]);

  const handleSectionClick = useCallback((id: string, e?: React.MouseEvent) => {
    if (e) e.preventDefault();

    setActiveSection(id);
    isManualScrollRef.current = true;

    if (manualScrollTimerRef.current) clearTimeout(manualScrollTimerRef.current);
    manualScrollTimerRef.current = setTimeout(() => {
      isManualScrollRef.current = false;
    }, 800);

    const targetEl = document.getElementById(id);
    if (targetEl) {
      // targetEl.scrollIntoView({ behavior: scrollBehavior() });
      const navbarHeight = 96;

window.scrollTo({
  top:
    targetEl.getBoundingClientRect().top +
    window.scrollY -
    navbarHeight,
  behavior: scrollBehavior(),
});
      if (typeof window !== "undefined") {
        window.history.pushState(null, "", `#${id}`);
      }
    }
  }, []);

  const isRTL = contentDir === "rtl";

  return (
    <div className="pt-16 sm:pt-20 pb-24 sm:pb-0 bg-cream min-h-screen text-ink">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-champagne via-cream to-cream min-h-[180px] sm:min-h-[220px] lg:min-h-[260px] flex items-center justify-center text-center px-4 py-8 sm:py-10">
        <div aria-hidden className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-gold/10 blur-3xl" />
        <div className="relative fade-in">
          <nav aria-label="Breadcrumb" className="mb-3 text-sm text-muted flex items-center justify-center gap-1.5">
            <Link href="/" className="hover:text-gold-dark transition focus-visible:ring-2 focus-visible:ring-gold rounded">
              {isRTL ? "الرئيسية" : "Home"}
            </Link>
            <ChevronRight size={14} aria-hidden className="rtl:rotate-180" />
            <span className="text-ink font-medium">{title}</span>
          </nav>
          <h1 className="font-serif font-bold text-ink text-[26px] sm:text-4xl lg:text-5xl leading-tight">{title}</h1>
          <p className="mt-3 text-ink-soft max-w-xl mx-auto text-sm sm:text-base px-2">{description}</p>
        </div>
      </section>

      {/* ── Mobile Horizontal Navigation Tabs (< md) ── */}
      {sections && sections.length > 0 && (
        <MobileTabNav
          sections={sections}
          activeSection={activeSection}
          onSectionClick={handleSectionClick}
          mobileTabRefs={mobileTabRefs}
        />
      )}

      {/* ── Main Two-Column Container ── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        {/* <div dir={contentDir} className="flex flex-col md:flex-row gap-8 lg:gap-10 items-start"> */}
        <div
  dir={contentDir}
  className="
    grid
    grid-cols-1
    lg:grid-cols-[300px_minmax(0,1fr)]
    gap-8
    lg:gap-10
    items-start
  "
>
          {/* Desktop & Tablet Sticky Sidebar (≥ md) */}
          {sections && sections.length > 0 && (
            <DesktopSidebarNav
              sections={sections}
              activeSection={activeSection}
              onSectionClick={handleSectionClick}
              tocLabel={tocLabel}
            />
          )}

          {/* Main Content Articles */}
          {/* <main className="flex-1 min-w-0 space-y-6 sm:space-y-8 w-full"> */}
          <main
  className="
    min-w-0
    w-full
    space-y-6
    sm:space-y-8
    overflow-visible
  "
>
            {sections
              ? sections.map((s) => (
                  <article
                    key={s.id}
                    id={s.id}
                    className="scroll-mt-32 sm:scroll-mt-36 scale-in card-luxury p-6 sm:p-8 lg:p-10 text-start"
                  >
                    <div className="flex items-center gap-3.5 sm:gap-4 mb-4">
                      <span className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-champagne text-gold-dark flex items-center justify-center shrink-0">
                        <s.icon size={20} aria-hidden />
                      </span>
                      <h2 className="font-serif text-xl sm:text-2xl text-ink font-semibold">{s.heading}</h2>
                    </div>
                    <div className="text-ink-soft leading-[1.8] space-y-3 text-[14.5px] sm:text-base">
                      {s.body}
                    </div>
                  </article>
                ))
              : children}
          </main>
        </div>
      </div>

      {/* ── Need Assistance Banner ── */}
      <section className="bg-champagne/60 border-y border-line">
        <div className="max-w-3xl mx-auto text-center px-4 py-12 sm:py-16">
          <h2 className="font-serif font-bold text-2xl sm:text-3xl text-ink">
            {isRTL ? "هل تحتاج إلى مساعدة؟" : "Need Assistance?"}
          </h2>
          <p className="mt-2.5 text-ink-soft text-sm sm:text-base">
            {isRTL
              ? "فريق خدمة العملاء لدينا مستعد لمساعدتك في أي وقت."
              : "Our customer care team is happy to help with any questions."}
          </p>
          <div className="mt-6 flex flex-wrap gap-3 justify-center">
            <a href={`mailto:${CONTACT.email}`} className="btn-luxury text-sm">
              {isRTL ? "تواصل مع الدعم" : "Contact Support"}
            </a>
            <a href={`mailto:${CONTACT.email}`} className="btn-luxury-outline text-sm">
              {isRTL ? "أرسل بريدًا إلكترونيًا" : "Email Us"}
            </a>
          </div>
        </div>
      </section>

      {/* ── Contact Details Card ── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="card-luxury p-6 sm:p-10 text-start">
          <h2 className="font-serif font-bold text-xl sm:text-2xl text-ink mb-1">{CONTACT.company}</h2>
          <p className="text-muted text-sm mb-6">
            {isRTL ? "نحن هنا لخدمتك والإجابة على تساؤلاتك." : "We're here to help with any questions."}
          </p>
          <div className="grid sm:grid-cols-2 gap-5 text-ink-soft text-[14.5px] sm:text-base">
            <p className="flex items-start gap-3">
              <MapPin size={18} className="text-gold-dark shrink-0 mt-0.5" aria-hidden />
              <span>{CONTACT.address}</span>
            </p>
            <p className="flex items-start gap-3">
              <Phone size={18} className="text-gold-dark shrink-0 mt-0.5" aria-hidden />
              <a href={`tel:${CONTACT.phone.replace(/\s/g, "")}`} className="hover:text-gold-dark transition">
                {CONTACT.phone}
              </a>
            </p>
            <p className="flex items-start gap-3">
              <Mail size={18} className="text-gold-dark shrink-0 mt-0.5" aria-hidden />
              <a href={`mailto:${CONTACT.email}`} className="hover:text-gold-dark transition">
                {CONTACT.email}
              </a>
            </p>
            <p className="flex items-start gap-3">
              <Clock size={18} className="text-gold-dark shrink-0 mt-0.5" aria-hidden />
              <span>{CONTACT.hours}</span>
            </p>
          </div>
          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href="https://www.google.com/maps/search/?api=1&query=Al-Arbeed+Plaza+Complex+Farwaniya+Kuwait"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-luxury-outline text-sm"
            >
              {isRTL ? "فتح في الخرائط" : "Open in Maps"}
            </a>
            <a href={`mailto:${CONTACT.email}`} className="btn-luxury text-sm">
              {isRTL ? "تواصل معنا" : "Contact Us"}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}


