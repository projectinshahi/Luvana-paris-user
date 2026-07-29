"use client";

import {
  Truck, Clock, Banknote, Navigation, ShieldCheck, MapPin, AlertCircle, Headphones,
  type LucideIcon,
} from "lucide-react";
import { useLanguage } from "@/lib/useLanguage";
import LegalShell, { LegalBlocks, type LegalBlock, type LegalSection } from "@/components/LegalShell";

const ICONS: LucideIcon[] = [
  Truck, Clock, Banknote, Navigation, ShieldCheck, MapPin, AlertCircle, Headphones,
];

type Sec = { id: string; heading: string; blocks: LegalBlock[] };

const EN_INTRO =
  "LuvanaParis, operated by Marriott United Company, strives to provide fast, reliable, and secure delivery services across Kuwait and the GCC region. Please read our Shipping & Delivery Policy for full details on shipping methods, delivery times, and rates.";

const EN: Sec[] = [
  {
    id: "coverage",
    heading: "1. Shipping Coverage & Locations",
    blocks: [
      { p: "We deliver to all residential and commercial addresses within the State of Kuwait." },
      { p: "International shipping is available to select Gulf Cooperation Council (GCC) countries, including UAE, Saudi Arabia, Qatar, Bahrain, and Oman." },
    ],
  },
  {
    id: "timeframes",
    heading: "2. Delivery Timeframes",
    blocks: [
      { p: "Standard delivery times are as follows:" },
      { ul: ["Kuwait Local Delivery: 1–2 business days.", "Express Kuwait Same-Day Delivery: Available for orders placed before 1:00 PM.", "GCC Regional Delivery: 3–7 business days."] },
      { p: "Delivery times may vary slightly during public holidays, sale campaigns, or unforeseen courier disruptions." },
    ],
  },
  {
    id: "fees",
    heading: "3. Shipping Fees & Free Shipping",
    blocks: [
      { p: "Shipping charges are calculated at checkout based on destination and order weight:" },
      { ul: ["Standard Kuwait Delivery: KWD 2.000 flat rate.", "Free Kuwait Delivery: Orders exceeding KWD 30.000 qualify for free standard delivery.", "GCC Regional Shipping: Standard rates apply at checkout."] },
    ],
  },
  {
    id: "tracking",
    heading: "4. Order Tracking",
    blocks: [
      { p: "Once your order has been dispatched, you will receive an SMS and email notification containing your courier tracking number and order link." },
      { p: "You can track your order live via the My Orders section in your account or directly on the courier partner's portal." },
    ],
  },
  {
    id: "customs",
    heading: "5. Customs, Taxes & Duties",
    blocks: [
      { p: "For international orders shipped outside Kuwait:" },
      { ul: ["Customs clearance regulations and import duties vary by country.", "Any additional customs duties, taxes, or clearance charges assessed by local authorities are the sole responsibility of the customer."] },
    ],
  },
  {
    id: "address",
    heading: "6. Address Accuracy & Recipient Responsibility",
    blocks: [
      { p: "Customers are required to provide complete and accurate delivery details, including building number, street name, block, area, and active mobile number." },
      { p: "LuvanaParis is not responsible for shipping delays or additional re-delivery fees resulting from incorrect address details or unreachable recipients." },
    ],
  },
  {
    id: "damaged",
    heading: "7. Damaged or Lost Shipments",
    blocks: [
      { p: "All shipments are carefully packed and inspected prior to dispatch." },
      { p: "If your parcel arrives damaged or with missing items, please report it to our customer support within 48 hours of delivery with photo evidence." },
    ],
  },
  {
    id: "contact",
    heading: "8. Shipping Support",
    blocks: [
      { p: "If you have questions regarding your delivery or need to update your address before dispatch, please contact:" },
      { p: "LuvanaParis Shipping Department" },
      { p: "Marriott United Company" },
      { p: "Email: support@luvanaparis.com" },
    ],
  },
];

const AR_INTRO =
  "تسعى LuvanaParis، التي تديرها شركة ماريوت يونايتد (Marriott United Company)، إلى توفير خدمات توصيل سريعة وآمنة وموثوقة في جميع أنحاء دولة الكويت ودول مجلس التعاون الخليجي. يرجى الاطلاع على سياسة الشحن والتوصيل أدناه للحصول على كافة التفاصيل المتعلقة بأوقات ورسوم الشحن.";

const AR: Sec[] = [
  {
    id: "coverage",
    heading: "1. نطاق الشحن والتوصيل",
    blocks: [
      { p: "نقوم بالتوصيل إلى جميع المناطق السكنية والتجارية داخل دولة الكويت." },
      { p: "كما يتوفر الشحن الدولي إلى دول مجلس التعاون الخليجي المحددة (الإمارات، السعودية، قطر، البحرين، وعُمان)." },
    ],
  },
  {
    id: "timeframes",
    heading: "2. مواعيد ومُدد التوصيل",
    blocks: [
      { p: "تُحدد مواعيد التوصيل القياسية على النحو التالي:" },
      { ul: ["التوصيل المحلي داخل الكويت: خلال 1 إلى 2 يوم عمل.", "التوصيل السريع في نفس اليوم داخل الكويت: للطلبات المقدمة قبل الساعة 1:00 ظهرًا.", "التوصيل الإقليمي لدول الخليج: خلال 3 إلى 7 أيام عمل."] },
      { p: "قد تختلف مواعيد التوصيل قليلاً خلال العطلات الرسمية أو فترة العروض الموسمية." },
    ],
  },
  {
    id: "fees",
    heading: "3. رسوم الشحن والتوصيل المجاني",
    blocks: [
      { p: "تُحسب رسوم الشحن عند إتمام الطلب بناءً على الوجهة:" },
      { ul: ["التوصيل القياسي داخل الكويت: رسوم ثابتة بقيمة 2.000 د.ك.", "التوصيل المجاني داخل الكويت: للطلبات التي تتجاوز قيمتها 30.000 د.ك.", "الشحن الإقليمي لدول الخليج: تُطبق الرسوم القياسية عند الدفع."] },
    ],
  },
  {
    id: "tracking",
    heading: "4. تتبع الطلب",
    blocks: [
      { p: "فور شحن طلبك، ستتلقى إشعارًا عبر البريد الإلكتروني والرسائل النصية يحتوي على رقم تتبع الشحنة." },
      { p: "يمكنك تتبع حالة طلبك مباشرة من خلال قسم (طلباتي) في حسابك أو عبر موقع شركة الشحن." },
    ],
  },
  {
    id: "customs",
    heading: "5. الرسوم الجمركية والضرائب",
    blocks: [
      { p: "للطلبات الدولية المشحونة خارج الكويت:" },
      { ul: ["تختلف أنظمة التخليص الجمركي والرسوم من دولة إلى أخرى.", "يتحمل العميل مسؤولية أي رسوم جمركية أو ضرائب استيراد إضافية تُفرض من قبل السلطات المحلية."] },
    ],
  },
  {
    id: "address",
    heading: "6. دقة العنوان ومسؤولية المستلم",
    blocks: [
      { p: "يجب على العميل تقديم تفاصيل توصيل دقيقة وكاملة تشمل رقم القطعة والشارع والمنزل ورقم هاتف فعال." },
      { p: "لا تتحمل LuvanaParis مسؤولية تأخير التوصيل أو رسوم إعادة الشحن الناتجة عن تقديم بيانات غير صحيحة." },
    ],
  },
  {
    id: "damaged",
    heading: "7. الشحنات التالفة أو المفقودة",
    blocks: [
      { p: "يتم تغليف وفحص جميع الشحنات بعناية قبل إرسالها." },
      { p: "في حال وصول الطرد تالفًا أو في حال وجود منتجات مفقودة، يرجى التواصل مع الدعم خلال 48 ساعة مع إرفاق الصور." },
    ],
  },
  {
    id: "contact",
    heading: "8. التواصل مع قسم الشحن",
    blocks: [
      { p: "إذا كانت لديك أي استفسارات بشأن شحنتك، يرجى التواصل معنا عبر:" },
      { p: "قسم الشحن والتوصيل — LuvanaParis" },
      { p: "شركة ماريوت يونايتد (Marriott United Company)" },
      { p: "البريد الإلكتروني: support@luvanaparis.com" },
    ],
  },
];

export default function LegalShipping() {
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
      title={isRTL ? "سياسة الشحن والتوصيل" : "Shipping & Delivery Policy"}
      description={isRTL ? AR_INTRO : EN_INTRO}
      sections={sections}
      contentDir={isRTL ? "rtl" : "ltr"}
      tocLabel={isRTL ? "محتويات الصفحة" : "On this page"}
    />
  );
}
