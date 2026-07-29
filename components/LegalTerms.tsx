"use client";

import {
  Building2, UserCheck, Sparkles, Tag, ShoppingBag, CreditCard, Truck,
  RotateCcw, FlaskConical, Copyright, Scale, ShieldAlert, ExternalLink,
  RefreshCw, Gavel, Mail, type LucideIcon,
} from "lucide-react";
import { useLanguage } from "@/lib/useLanguage";
import LegalShell, { LegalBlocks, type LegalBlock, type LegalSection } from "@/components/LegalShell";

// Content verbatim from "Terms & Conditions" (EN Word / AR PDF). Section order shared across languages.
const ICONS: LucideIcon[] = [
  Building2, UserCheck, Sparkles, Tag, ShoppingBag, CreditCard, Truck, RotateCcw,
  FlaskConical, Copyright, Scale, ShieldAlert, ExternalLink, RefreshCw, Gavel, Mail,
];

type Sec = { id: string; heading: string; blocks: LegalBlock[] };

const EN_INTRO =
  "Welcome to LuvanaParis, a brand owned and operated by Marriott United Company, Kuwait. By accessing or using our website, you agree to be bound by these Terms & Conditions. If you do not agree with these terms, please do not use our website.";

const EN: Sec[] = [
  { id: "company", heading: "1. Company Information", blocks: [
    { p: "Business Name: LuvanaParis" },
    { p: "Owned and Operated by: Marriott United Company" },
    { p: "Address: Al-Arbeed Plaza Complex, Block #4, Street #55, 1st Tower, 4th Floor, Farwaniya, Kuwait." },
  ] },
  { id: "eligibility", heading: "2. Eligibility", blocks: [
    { p: "By using this website, you confirm that you are at least 18 years of age or are using the website under the supervision of a parent or legal guardian." },
  ] },
  { id: "products", heading: "3. Products", blocks: [
    { p: "We strive to display our products, descriptions, specifications, and images as accurately as possible. However, actual product colors and packaging may vary slightly depending on your device or manufacturer updates." },
    { p: "Product availability is subject to stock." },
  ] },
  { id: "pricing", heading: "4. Pricing", blocks: [
    { p: "All prices displayed on the website are subject to change without prior notice." },
    { p: "Prices may not include shipping charges, customs duties, taxes, or other applicable fees unless specifically stated." },
    { p: "We reserve the right to correct pricing errors at any time." },
  ] },
  { id: "orders", heading: "5. Orders", blocks: [
    { p: "All orders are subject to acceptance and availability." },
    { p: "We reserve the right to:" },
    { ul: ["Refuse or cancel any order.", "Limit quantities purchased.", "Request additional information before confirming an order."] },
    { p: "An order confirmation email does not constitute acceptance of your order." },
  ] },
  { id: "payments", heading: "6. Payments", blocks: [
    { p: "Payments are processed through secure third-party payment gateways." },
    { p: "LuvanaParis does not store your complete payment card information." },
    { p: "We reserve the right to refuse transactions suspected of fraud or unauthorized activity." },
  ] },
  { id: "shipping", heading: "7. Shipping & Delivery", blocks: [
    { p: "Delivery times are estimates only and may vary due to customs clearance, courier delays, weather conditions, or other circumstances beyond our control." },
    { p: "Customers are responsible for providing accurate delivery information." },
    { p: "Additional charges resulting from incorrect addresses may apply." },
  ] },
  { id: "returns", heading: "8. Returns & Refunds", blocks: [
    { p: "Returns and refunds are subject to our Return & Refund Policy." },
    { p: "For hygiene and safety reasons, certain cosmetic and personal care products may not be eligible for return once opened or used." },
    { p: "Damaged or incorrect products should be reported within the period specified in our Return Policy." },
  ] },
  { id: "product-use", heading: "9. Product Use", blocks: [
    { p: "Customers should always read product labels and instructions before use." },
    { p: "LuvanaParis is not responsible for allergic reactions, misuse, or improper application of products." },
    { p: "If irritation occurs, discontinue use immediately and seek medical advice if necessary." },
  ] },
  { id: "ip", heading: "10. Intellectual Property", blocks: [
    { p: "All content on this website, including logos, trademarks, product images, graphics, text, videos, and designs, is the property of LuvanaParis or its licensors and is protected by applicable intellectual property laws." },
    { p: "No content may be copied, reproduced, distributed, or used without written permission." },
  ] },
  { id: "conduct", heading: "11. User Conduct", blocks: [
    { p: "Users agree not to:" },
    { ul: ["Use the website for unlawful purposes.", "Attempt unauthorized access to our systems.", "Upload malicious software or harmful content.", "Submit false or misleading information."] },
  ] },
  { id: "liability", heading: "12. Limitation of Liability", blocks: [
    { p: "To the maximum extent permitted by law, Marriott United Company and LuvanaParis shall not be liable for any indirect, incidental, consequential, or special damages arising from the use of this website or our products." },
  ] },
  { id: "third-party", heading: "13. Third-Party Links", blocks: [
    { p: "Our website may contain links to third-party websites." },
    { p: "We are not responsible for the content, security, or privacy practices of external websites." },
  ] },
  { id: "changes", heading: "14. Changes to These Terms", blocks: [
    { p: "We reserve the right to update or modify these Terms & Conditions at any time." },
    { p: "Changes become effective immediately upon publication on this website." },
  ] },
  { id: "law", heading: "15. Governing Law", blocks: [
    { p: "These Terms & Conditions shall be governed by the laws of the State of Kuwait." },
    { p: "Any disputes arising from these Terms shall be subject to the exclusive jurisdiction of the competent courts of Kuwait." },
  ] },
  { id: "contact", heading: "16. Contact Us", blocks: [
    { p: "For questions regarding these Terms & Conditions, please contact:" },
    { p: "LuvanaParis" },
    { p: "Marriott United Company" },
    { p: "Al-Arbeed Plaza Complex" },
    { p: "Block #4, Street #55" },
    { p: "1st Tower, 4th Floor" },
    { p: "Farwaniya, Kuwait." },
  ] },
];

const AR_INTRO =
  "مرحبًا بكم في LuvanaParis، وهي علامة تجارية مملوكة ومدارة من قبل شركة ماريوت يونايتد (Marriott United Company)، الكويت. من خلال الدخول إلى موقعنا الإلكتروني أو استخدامه، فإنك توافق على الالتزام بهذه الشروط والأحكام. وإذا كنت لا توافق على هذه الشروط، فيرجى عدم استخدام الموقع.";

const AR: Sec[] = [
  { id: "company", heading: "1. معلومات الشركة", blocks: [
    { p: "اسم النشاط التجاري: LuvanaParis" },
    { p: "المالك والمشغل: Marriott United Company" },
    { p: "العنوان: مجمع العريبد بلازا، القطعة رقم 4، شارع 55، البرج الأول، الطابق الرابع، الفروانية، الكويت." },
  ] },
  { id: "eligibility", heading: "2. أهلية الاستخدام", blocks: [
    { p: "باستخدامك لهذا الموقع، فإنك تؤكد أنك تبلغ من العمر 18 عامًا على الأقل، أو أنك تستخدم الموقع تحت إشراف أحد الوالدين أو الوصي القانوني." },
  ] },
  { id: "products", heading: "3. المنتجات", blocks: [
    { p: "نسعى جاهدين إلى عرض المنتجات والأوصاف والمواصفات والصور بأعلى درجة ممكنة من الدقة. ومع ذلك، قد تختلف ألوان المنتجات الفعلية أو تصميمات العبوات اختلافًا طفيفًا تبعًا لإعدادات جهازك أو التحديثات التي يجريها المصنع." },
    { p: "كما أن توفر المنتجات يخضع لتوافر المخزون." },
  ] },
  { id: "pricing", heading: "4. الأسعار", blocks: [
    { p: "جميع الأسعار المعروضة على الموقع قابلة للتغيير دون إشعار مسبق." },
    { p: "قد لا تشمل الأسعار رسوم الشحن أو الرسوم الجمركية أو الضرائب أو أي رسوم أخرى مطبقة، ما لم يُذكر خلاف ذلك بشكل صريح." },
    { p: "نحتفظ بالحق في تصحيح أي أخطاء في الأسعار في أي وقت." },
  ] },
  { id: "orders", heading: "5. الطلبات", blocks: [
    { p: "تخضع جميع الطلبات للموافقة وتوفر المنتجات." },
    { p: "ونحتفظ بالحق في:" },
    { ul: ["رفض أو إلغاء أي طلب.", "تحديد الكميات المسموح بشرائها.", "طلب معلومات إضافية قبل تأكيد الطلب."] },
    { p: "ولا يُعد إرسال رسالة تأكيد الطلب عبر البريد الإلكتروني قبولًا نهائيًا للطلب." },
  ] },
  { id: "payments", heading: "6. المدفوعات", blocks: [
    { p: "تتم معالجة جميع المدفوعات عبر بوابات دفع إلكترونية آمنة تابعة لأطراف خارجية." },
    { p: "ولا تقوم LuvanaParis بالاحتفاظ ببيانات بطاقة الدفع الكاملة الخاصة بك." },
    { p: "كما نحتفظ بالحق في رفض أي معاملة يُشتبه بأنها احتيالية أو غير مصرح بها." },
  ] },
  { id: "shipping", heading: "7. الشحن والتوصيل", blocks: [
    { p: "تُعد أوقات التسليم تقديرية فقط، وقد تختلف بسبب إجراءات التخليص الجمركي أو تأخير شركات الشحن أو الظروف الجوية أو أي ظروف أخرى خارجة عن إرادتنا." },
    { p: "يتحمل العميل مسؤولية تقديم معلومات توصيل صحيحة وكاملة." },
    { p: "وقد تُفرض رسوم إضافية في حال تقديم عنوان غير صحيح أو غير مكتمل." },
  ] },
  { id: "returns", heading: "8. الإرجاع واسترداد المبالغ", blocks: [
    { p: "تخضع عمليات الإرجاع واسترداد المبالغ لسياسة الإرجاع والاسترداد الخاصة بنا." },
    { p: "ولأسباب تتعلق بالنظافة والسلامة، قد لا تكون بعض مستحضرات التجميل ومنتجات العناية الشخصية مؤهلة للإرجاع بعد فتحها أو استخدامها." },
    { p: "ويجب الإبلاغ عن المنتجات التالفة أو غير الصحيحة خلال الفترة المحددة في سياسة الإرجاع." },
  ] },
  { id: "product-use", heading: "9. استخدام المنتجات", blocks: [
    { p: "يجب على العملاء دائمًا قراءة ملصقات المنتجات وتعليمات الاستخدام قبل الاستعمال." },
    { p: "ولا تتحمل LuvanaParis أي مسؤولية عن الحساسية أو سوء الاستخدام أو الاستخدام غير الصحيح للمنتجات." },
    { p: "وفي حال حدوث أي تهيج، يجب التوقف عن استخدام المنتج فورًا واستشارة الطبيب عند الحاجة." },
  ] },
  { id: "ip", heading: "10. حقوق الملكية الفكرية", blocks: [
    { p: "جميع المحتويات الموجودة على هذا الموقع، بما في ذلك الشعارات والعلامات التجارية وصور المنتجات والرسومات والنصوص ومقاطع الفيديو والتصاميم، هي ملك لـ LuvanaParis أو الجهات المرخصة لها، وتخضع للحماية بموجب قوانين الملكية الفكرية المعمول بها." },
    { p: "ولا يجوز نسخ أو إعادة إنتاج أو توزيع أو استخدام أي جزء من هذه المحتويات دون الحصول على إذن كتابي مسبق." },
  ] },
  { id: "conduct", heading: "11. سلوك المستخدم", blocks: [
    { p: "يوافق المستخدم على عدم:" },
    { ul: ["استخدام الموقع لأي أغراض غير قانونية.", "محاولة الوصول غير المصرح به إلى أنظمتنا.", "تحميل برامج ضارة أو أي محتوى قد يسبب ضررًا.", "تقديم معلومات كاذبة أو مضللة."] },
  ] },
  { id: "liability", heading: "12. تحديد المسؤولية", blocks: [
    { p: "إلى أقصى حد يسمح به القانون، لا تتحمل Marriott United Company أو LuvanaParis أي مسؤولية عن أي أضرار غير مباشرة أو عرضية أو تبعية أو خاصة تنشأ عن استخدام هذا الموقع أو منتجاتنا." },
  ] },
  { id: "third-party", heading: "13. روابط الجهات الخارجية", blocks: [
    { p: "قد يحتوي موقعنا على روابط لمواقع إلكترونية تابعة لأطراف أخرى." },
    { p: "ولا نتحمل أي مسؤولية عن محتوى تلك المواقع أو أمنها أو سياسات الخصوصية الخاصة بها." },
  ] },
  { id: "changes", heading: "14. التعديلات على هذه الشروط", blocks: [
    { p: "نحتفظ بالحق في تحديث أو تعديل هذه الشروط والأحكام في أي وقت." },
    { p: "وتصبح التعديلات سارية المفعول فور نشرها على هذا الموقع." },
  ] },
  { id: "law", heading: "15. القانون الواجب التطبيق", blocks: [
    { p: "تخضع هذه الشروط والأحكام لقوانين دولة الكويت." },
    { p: "وتكون أي نزاعات تنشأ عن هذه الشروط والأحكام خاضعة للاختصاص القضائي الحصري للمحاكم المختصة في دولة الكويت." },
  ] },
  { id: "contact", heading: "16. اتصل بنا", blocks: [
    { p: "إذا كانت لديك أي استفسارات تتعلق بهذه الشروط والأحكام، فيرجى التواصل معنا:" },
    { p: "LuvanaParis" },
    { p: "Marriott United Company" },
    { p: "مجمع العريبد بلازا" },
    { p: "القطعة رقم 4، شارع 55" },
    { p: "البرج الأول، الطابق الرابع" },
    { p: "الفروانية، الكويت." },
  ] },
];

export default function LegalTerms() {
  const { isRTL } = useLanguage();
  const data = isRTL ? AR : EN;
  const sections: LegalSection[] = data.map((s, i) => ({
    id: s.id,
    icon: ICONS[i],
    heading: s.heading,
    body: <LegalBlocks blocks={s.blocks} />,
  }));

  return (
    <LegalShell
      title={isRTL ? "الشروط والأحكام" : "Terms & Conditions"}
      description={isRTL ? AR_INTRO : EN_INTRO}
      sections={sections}
      contentDir={isRTL ? "rtl" : "ltr"}
      tocLabel={isRTL ? "محتويات الصفحة" : "On this page"}
    />
  );
}
