"use client";

import { CheckCircle2, Ban, PackageX, Banknote, Repeat, Truck, Mail, type LucideIcon } from "lucide-react";
import { useLanguage } from "@/lib/useLanguage";
import LegalShell, { LegalBlocks, type LegalBlock, type LegalSection } from "@/components/LegalShell";

// Content verbatim from "Return & Refund Policy" (EN PDF / AR PDF). Section order shared across languages.
const ICONS: LucideIcon[] = [CheckCircle2, Ban, PackageX, Banknote, Repeat, Truck, Mail];

type Sec = { id: string; heading: string; blocks: LegalBlock[] };

const EN_INTRO =
  "LuvanaParis, operated by Marriott United Company, is committed to providing high-quality beauty, skincare, haircare, cosmetics, and fragrance products. If you are not completely satisfied with your purchase, please review the following policy.";

const EN: Sec[] = [
  { id: "eligibility", heading: "1. Eligibility for Returns", blocks: [
    { p: "Products may be returned if:" },
    { ul: ["The product was delivered damaged.", "The wrong product was delivered.", "The product has a manufacturing defect.", "The product is unopened, unused, and in its original packaging."] },
    { p: "Products must be reported within 7 days of delivery." },
  ] },
  { id: "non-returnable", heading: "2. Non-Returnable Items", blocks: [
    { p: "For hygiene and safety reasons, the following items cannot be returned once opened or used:" },
    { ul: ["Cosmetics", "Hair care products", "Skincare products", "Makeup products", "Fragrances", "Personal care products", "Promotional or clearance items unless defective"] },
  ] },
  { id: "damaged", heading: "3. Damaged or Incorrect Orders", blocks: [
    { p: "If you receive a damaged or incorrect item, please contact our Customer Support within 48 hours of receiving your order and provide:" },
    { ul: ["Order Number", "Product photographs", "Packaging photographs", "Description of the issue"] },
  ] },
  { id: "refunds", heading: "4. Refunds", blocks: [
    { p: "Once the returned item has been inspected and approved:" },
    { ul: ["Refunds will be issued to the original payment method.", "Refund processing may take 7–14 business days, depending on your payment provider."] },
    { p: "Shipping charges are generally non-refundable unless the return is due to our error." },
  ] },
  { id: "exchanges", heading: "5. Exchanges", blocks: [
    { p: "Exchanges are available only for defective or damaged products, subject to stock availability." },
  ] },
  { id: "return-shipping", heading: "6. Return Shipping", blocks: [
    { p: "If the return is due to our mistake or a defective product, LuvanaParis will arrange or reimburse the return shipping cost." },
    { p: "For all other eligible returns, the customer is responsible for return shipping expenses." },
  ] },
  { id: "contact", heading: "7. Contact", blocks: [
    { p: "For return requests, please contact our Customer Support before sending any products." },
  ] },
];

const AR_INTRO =
  "تلتزم LuvanaParis، التي تديرها Marriott United Company، بتقديم منتجات عالية الجودة في مجال العناية بالشعر، والعناية بالبشرة، ومستحضرات التجميل، والعطور، ومنتجات العناية الشخصية. إذا لم تكن راضيًا تمامًا عن عملية الشراء، يرجى مراجعة سياسة الإرجاع واسترداد الأموال التالية.";

const AR: Sec[] = [
  { id: "eligibility", heading: "1. شروط الإرجاع", blocks: [
    { p: "يمكن إرجاع المنتجات في الحالات التالية:" },
    { ul: ["إذا تم استلام المنتج تالفًا.", "إذا تم تسليم منتج غير المنتج المطلوب.", "إذا كان المنتج يحتوي على عيب في التصنيع.", "إذا كان المنتج غير مفتوح، وغير مستخدم، وفي عبوته الأصلية."] },
    { p: "يجب الإبلاغ عن طلب الإرجاع خلال 7 أيام من تاريخ استلام الطلب." },
  ] },
  { id: "non-returnable", heading: "2. المنتجات غير القابلة للإرجاع", blocks: [
    { p: "حرصًا على معايير النظافة والسلامة، لا يمكن إرجاع المنتجات التالية بعد فتحها أو استخدامها:" },
    { ul: ["مستحضرات التجميل.", "منتجات العناية بالشعر.", "منتجات العناية بالبشرة.", "مستحضرات المكياج.", "العطور.", "منتجات العناية الشخصية.", "المنتجات المخفضة أو الترويجية، إلا في حال وجود عيب مصنعي."] },
  ] },
  { id: "damaged", heading: "3. الطلبات التالفة أو غير الصحيحة", blocks: [
    { p: "إذا استلمت منتجًا تالفًا أو غير مطابق للطلب، يرجى التواصل مع فريق خدمة العملاء خلال 48 ساعة من استلام الطلب، مع تزويدنا بما يلي:" },
    { ul: ["رقم الطلب.", "صور واضحة للمنتج.", "صور لعبوة المنتج.", "وصف للمشكلة."] },
  ] },
  { id: "refunds", heading: "4. استرداد الأموال", blocks: [
    { p: "بعد استلام المنتج المرتجع وفحصه والموافقة على طلب الإرجاع:" },
    { ul: ["سيتم رد المبلغ إلى وسيلة الدفع الأصلية المستخدمة عند الشراء.", "قد تستغرق عملية استرداد المبلغ من 7 إلى 14 يوم عمل، وذلك حسب مزود خدمة الدفع."] },
    { p: "ولا تُسترد رسوم الشحن عادةً، إلا إذا كان سبب الإرجاع ناتجًا عن خطأ من جانبنا." },
  ] },
  { id: "exchanges", heading: "5. استبدال المنتجات", blocks: [
    { p: "يتم استبدال المنتجات فقط في حال كانت تالفة أو تحتوي على عيب مصنعي، وذلك حسب توفر المخزون." },
  ] },
  { id: "return-shipping", heading: "6. رسوم شحن الإرجاع", blocks: [
    { p: "إذا كان سبب الإرجاع ناتجًا عن خطأ من LuvanaParis أو بسبب وجود عيب في المنتج، فستقوم الشركة بتنظيم عملية شحن الإرجاع أو تحمل تكلفتها." },
    { p: "أما في جميع حالات الإرجاع الأخرى التي تستوفي شروط الإرجاع، فيتحمل العميل تكاليف شحن المنتج المرتجع." },
  ] },
  { id: "contact", heading: "7. التواصل معنا", blocks: [
    { p: "لطلب إرجاع أي منتج، يرجى التواصل مع فريق خدمة العملاء قبل إرسال المنتج، حتى نتمكن من تزويدك بالتعليمات اللازمة لإتمام عملية الإرجاع." },
  ] },
];

export default function LegalReturns() {
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
      title={isRTL ? "سياسة الإرجاع واسترداد الأموال" : "Return & Refund Policy"}
      description={isRTL ? AR_INTRO : EN_INTRO}
      sections={sections}
      contentDir={isRTL ? "rtl" : "ltr"}
      tocLabel={isRTL ? "محتويات الصفحة" : "On this page"}
    />
  );
}
