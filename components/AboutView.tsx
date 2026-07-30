"use client";

import { CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/lib/useLanguage";
import LegalShell from "@/components/LegalShell";

// Content is verbatim from the provided About Us documents (EN Word / AR PDF).
const EN = {
  title: "About Us",
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
};

const AR = {
  title: "من نحن",
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
};

export default function AboutView() {
  const { isRTL } = useLanguage();
  const c = isRTL ? AR : EN;
  const dir = isRTL ? "rtl" : "ltr";
  const align = isRTL ? "text-right" : "text-left";

  return (
    <LegalShell title={c.title} description="">
      <article dir={dir} className={`card-luxury p-6 sm:p-10 space-y-4 text-ink-soft leading-[1.8] text-[15px] sm:text-base ${align} ${isRTL ? "font-arabic" : ""}`}>
        {c.paras.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </article>

      <article dir={dir} className={`card-luxury p-6 sm:p-10 ${isRTL ? "font-arabic" : ""}`}>
        <h2 className={`font-serif text-2xl text-ink mb-5 ${align}`}>{c.commitmentTitle}</h2>
        <ul className="space-y-3">
          {c.commitments.map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <CheckCircle2 size={18} className="text-gold-dark shrink-0 mt-0.5" aria-hidden />
              <span className="text-ink-soft text-[15px] sm:text-base leading-[1.7]">{item}</span>
            </li>
          ))}
        </ul>
      </article>

      <article dir={dir} className={`card-luxury p-6 sm:p-10 text-ink-soft leading-[1.8] text-[15px] sm:text-base ${align} ${isRTL ? "font-arabic" : ""}`}>
        <p>{c.closing}</p>
      </article>
    </LegalShell>
  );
}
