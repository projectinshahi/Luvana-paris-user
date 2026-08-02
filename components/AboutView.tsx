"use client";

import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, ChevronRight } from "lucide-react";
import { useLanguage } from "@/lib/useLanguage";

// Body content is verbatim from the provided About Us documents (EN Word / AR PDF).
// subtitle / labels / CTA are page chrome (not document body).
const EN = {
  title: "About Us",
  subtitle: "Authentic luxury beauty, curated for Kuwait & the GCC.",
  storyLabel: "Our Story",
  paras: [
    "LuvanaParis is a premium beauty destination operated by Marriott United Company, Kuwait, dedicated to bringing authentic, high-quality beauty and personal care products to customers across Kuwait and the GCC.",
    "We carefully curate a wide selection of internationally recognized brands in hair care, skincare, cosmetics, makeup, fragrances, and beauty accessories, ensuring every product meets the highest standards of quality, performance, and authenticity.",
    "At LuvanaParis, we believe beauty is about confidence, self-expression, and self-care. Our mission is to make premium beauty products accessible through a seamless shopping experience, exceptional customer service, and trusted partnerships with leading global brands.",
    "Whether you're looking for professional hair care solutions, everyday skincare essentials, luxury fragrances, or the latest beauty trends, LuvanaParis is your trusted destination for authentic beauty products.",
  ],
  commitmentTitle: "Our Commitment",
  commitments: [
    "100% Genuine & Authentic Products",
    "Trusted International Beauty Brands",
    "Exceptional Customer Experience",
    "Fast & Reliable Delivery",
    "Secure Online Shopping",
  ],
  closing:
    "At LuvanaParis, we're passionate about helping you look and feel your best by delivering beauty you can trust.",
  shopNow: "Shop Now",
  exploreBrands: "Explore Brands",
};

const AR = {
  title: "من نحن",
  subtitle: "جمال فاخر وأصيل، مختار بعناية للكويت ودول الخليج.",
  storyLabel: "قصتنا",
  paras: [
    "LuvanaParis هي وجهتك المتميزة في عالم الجمال، وتُدار من قبل Marriott United Company في دولة الكويت، حيث نلتزم بتوفير منتجات أصلية وعالية الجودة في مجال الجمال والعناية الشخصية لعملائنا في الكويت ودول مجلس التعاون الخليجي.",
    "نحرص على اختيار مجموعة متنوعة من أشهر العلامات التجارية العالمية في مجالات العناية بالشعر، والعناية بالبشرة، ومستحضرات التجميل، والمكياج، والعطور، وإكسسوارات التجميل، مع ضمان أن جميع منتجاتنا تلبي أعلى معايير الجودة والأداء والأصالة.",
    "في LuvanaParis، نؤمن بأن الجمال هو انعكاس للثقة بالنفس، والتعبير عن الشخصية، والاهتمام بالذات. وتتمثل رسالتنا في جعل منتجات التجميل الفاخرة في متناول الجميع من خلال توفير تجربة تسوق إلكترونية سلسة، وخدمة عملاء متميزة، وشراكات موثوقة مع أبرز العلامات التجارية العالمية.",
    "سواء كنت تبحث عن حلول احترافية للعناية بالشعر، أو منتجات يومية للعناية بالبشرة، أو عطور فاخرة، أو أحدث صيحات عالم الجمال، فإن LuvanaParis هي وجهتك الموثوقة للحصول على منتجات تجميل أصلية وعالية الجودة.",
  ],
  commitmentTitle: "التزامنا",
  commitments: [
    "منتجات أصلية وموثوقة بنسبة 100%.",
    "أشهر العلامات التجارية العالمية في مجال الجمال.",
    "تجربة عملاء استثنائية.",
    "توصيل سريع وموثوق.",
    "تسوق إلكتروني آمن.",
  ],
  closing:
    "في LuvanaParis، نؤمن بأن الجمال يبدأ بالثقة، ولذلك نسعى جاهدين إلى مساعدتك في الظهور بأفضل إطلالة والشعور بأفضل حال، من خلال تقديم منتجات تجميل أصلية يمكنك الوثوق بها في كل مرة.",
  shopNow: "تسوّق الآن",
  exploreBrands: "استكشف العلامات",
};

export default function AboutView() {
  const { isRTL } = useLanguage();
  const c = isRTL ? AR : EN;
  const dir = isRTL ? "rtl" : "ltr";
  const arabic = isRTL ? "font-arabic" : "";

  return (
    <div className="bg-cream text-ink pt-16 sm:pt-20 pb-20 sm:pb-24">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-champagne via-cream to-cream min-h-[200px] sm:min-h-[240px] lg:min-h-[300px] flex items-center justify-center text-center px-4 py-12">
        <div aria-hidden className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-gold/10 blur-3xl" />
        <div className="relative fade-in max-w-2xl">
          <nav aria-label="Breadcrumb" className="mb-3 text-sm text-muted flex items-center justify-center gap-1.5">
            <Link href="/" className="hover:text-gold-dark transition rounded focus-visible:ring-2 focus-visible:ring-gold focus:outline-none">
              {isRTL ? "الرئيسية" : "Home"}
            </Link>
            <ChevronRight size={14} aria-hidden className="rtl:rotate-180" />
            <span className="text-ink font-medium">{c.title}</span>
          </nav>
          <h1 className={`font-serif font-bold text-ink text-[30px] sm:text-4xl lg:text-5xl leading-tight ${arabic}`}>
            {c.title}
          </h1>
          <p className={`mt-4 text-ink-soft text-base sm:text-lg ${arabic}`}>{c.subtitle}</p>
        </div>
      </section>

      {/* ── Centered container (≤1280px) ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Story: balanced two-column (text ↔ image), auto-mirrors in RTL ── */}
        <section dir={dir} className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-stretch py-14 sm:py-20">
          <div className={`flex flex-col justify-center ${arabic} ${isRTL ? "text-right" : "text-left"}`}>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-dark mb-3">{c.storyLabel}</p>
            <div className="space-y-4 text-ink-soft leading-[1.9] text-[15px] sm:text-base max-w-prose">
              {c.paras.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
          <div className="relative rounded-2xl overflow-hidden shadow-luxury border border-line min-h-[300px] lg:min-h-[420px]">
            <Image
              src="/images/golden.jpg"
              alt="LuvanaParis — luxury beauty"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </section>

        {/* ── Commitment: equal-height feature grid (3 / 2 / 1 columns) ── */}
        <section dir={dir} className={`py-6 sm:py-10 ${arabic}`}>
          <h2 className="font-serif text-2xl sm:text-3xl text-ink text-center mb-10">{c.commitmentTitle}</h2>
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {c.commitments.map((item, i) => (
              <li
                key={i}
                className="card-luxury h-full p-6 flex items-center gap-4 transition-transform duration-300 hover:-translate-y-1"
              >
                <span className="w-11 h-11 rounded-full bg-champagne text-gold-dark flex items-center justify-center shrink-0">
                  <CheckCircle2 size={20} aria-hidden />
                </span>
                <span className={`text-ink-soft text-[15px] sm:text-base leading-[1.6] ${isRTL ? "text-right" : "text-left"}`}>
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* ── Closing + CTA ── */}
        <section className="pt-12 sm:pt-16">
          <div className={`card-luxury p-8 sm:p-12 text-center max-w-3xl mx-auto ${arabic}`}>
            <p className="text-ink-soft leading-[1.9] text-base sm:text-lg">{c.closing}</p>
            <div className="mt-8 flex flex-wrap gap-3 justify-center">
              <Link href="/brands" className="btn-luxury">{c.shopNow}</Link>
              <Link href="/brands" className="btn-luxury-outline">{c.exploreBrands}</Link>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
