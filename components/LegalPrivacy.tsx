"use client";

import {
  Database, Cog, Cookie, Lock, Share2, ShieldCheck, Timer, UserCheck,
  Baby, ExternalLink, RefreshCw, Mail, type LucideIcon,
} from "lucide-react";
import { useLanguage } from "@/lib/useLanguage";
import LegalShell, { LegalBlocks, type LegalBlock, type LegalSection } from "@/components/LegalShell";

// Content verbatim from "Privacy Policy" (EN Word / AR PDF). Section order shared across languages.
const ICONS: LucideIcon[] = [
  Database, Cog, Cookie, Lock, Share2, ShieldCheck, Timer, UserCheck, Baby, ExternalLink, RefreshCw, Mail,
];

type Sec = { id: string; heading: string; blocks: LegalBlock[] };

const EN_INTRO =
  "LuvanaParis, operated by Marriott United Company, respects your privacy and is committed to protecting your personal information. This Privacy Policy explains how we collect, use, store, and protect your information when you visit our website or purchase our products.";

const EN: Sec[] = [
  { id: "collect", heading: "1. Information We Collect", blocks: [
    { p: "We may collect the following information:" },
    { ul: ["Full Name", "Email Address", "Mobile Number", "Delivery Address", "Billing Address", "Payment Information (processed securely through payment providers)", "Order History", "IP Address", "Device Information", "Browser Information", "Website Usage Data"] },
  ] },
  { id: "use", heading: "2. How We Use Your Information", blocks: [
    { p: "Your information may be used to:" },
    { ul: ["Process and deliver orders.", "Provide customer support.", "Process payments.", "Send order updates.", "Improve our website and services.", "Respond to customer enquiries.", "Prevent fraud and unauthorized transactions.", "Send promotional communications (only where permitted or with your consent)."] },
  ] },
  { id: "cookies", heading: "3. Cookies", blocks: [
    { p: "Our website uses cookies and similar technologies to:" },
    { ul: ["Improve website functionality.", "Remember user preferences.", "Analyze website traffic.", "Enhance your shopping experience."] },
    { p: "You may disable cookies through your browser settings, although some website features may not function properly." },
  ] },
  { id: "payment-security", heading: "4. Payment Security", blocks: [
    { p: "Payment transactions are handled by secure third-party payment providers." },
    { p: "We do not store your complete debit or credit card information." },
  ] },
  { id: "sharing", heading: "5. Sharing Information", blocks: [
    { p: "We do not sell or rent your personal information." },
    { p: "We may share information with:" },
    { ul: ["Delivery partners.", "Payment service providers.", "IT service providers.", "Government authorities where legally required."] },
  ] },
  { id: "security", heading: "6. Data Security", blocks: [
    { p: "We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, misuse, loss, or disclosure." },
    { p: "However, no internet transmission or electronic storage method can be guaranteed to be completely secure." },
  ] },
  { id: "retention", heading: "7. Data Retention", blocks: [
    { p: "We retain your information only as long as necessary to:" },
    { ul: ["Fulfil your orders.", "Comply with legal obligations.", "Resolve disputes.", "Enforce our agreements."] },
  ] },
  { id: "rights", heading: "8. Your Rights", blocks: [
    { p: "Depending on applicable law, you may have the right to:" },
    { ul: ["Access your personal information.", "Correct inaccurate information.", "Request deletion of your information.", "Object to certain processing activities.", "Withdraw marketing consent."] },
  ] },
  { id: "children", heading: "9. Children's Privacy", blocks: [
    { p: "Our website is not intended for children under the age of 18." },
    { p: "We do not knowingly collect personal information from minors." },
  ] },
  { id: "third-party", heading: "10. Third-Party Services", blocks: [
    { p: "Our website may contain links to external websites or use third-party services." },
    { p: "We are not responsible for the privacy practices of third parties." },
  ] },
  { id: "changes", heading: "11. Changes to This Privacy Policy", blocks: [
    { p: "We may update this Privacy Policy from time to time." },
    { p: "The updated version will be published on this page with the revised effective date." },
  ] },
  { id: "contact", heading: "12. Contact Us", blocks: [
    { p: "If you have any questions regarding this Privacy Policy or your personal information, please contact:" },
    { p: "LuvanaParis" },
    { p: "Marriott United Company" },
    { p: "Al-Arbeed Plaza Complex" },
    { p: "Block #4, Street #55" },
    { p: "1st Tower, 4th Floor" },
    { p: "Farwaniya, Kuwait." },
  ] },
];

const AR_INTRO =
  "تحترم LuvanaParis، التي تديرها شركة ماريوت يونايتد (Marriott United Company)، خصوصيتك وتلتزم بحماية معلوماتك الشخصية. توضح سياسة الخصوصية هذه كيفية جمع معلوماتك الشخصية واستخدامها وتخزينها وحمايتها عند زيارتك لموقعنا الإلكتروني أو شرائك لمنتجاتنا.";

const AR: Sec[] = [
  { id: "collect", heading: "1. المعلومات التي نجمعها", blocks: [
    { p: "قد نقوم بجمع المعلومات التالية:" },
    { ul: ["الاسم الكامل.", "عنوان البريد الإلكتروني.", "رقم الهاتف المحمول.", "عنوان التوصيل.", "عنوان الفواتير.", "معلومات الدفع (تتم معالجتها بأمان من خلال مزودي خدمات الدفع).", "سجل الطلبات.", "عنوان بروتوكول الإنترنت (IP).", "معلومات الجهاز المستخدم.", "معلومات المتصفح.", "بيانات استخدام الموقع الإلكتروني."] },
  ] },
  { id: "use", heading: "2. كيفية استخدام معلوماتك", blocks: [
    { p: "قد نستخدم معلوماتك للأغراض التالية:" },
    { ul: ["معالجة الطلبات وتسليمها.", "تقديم خدمات دعم العملاء.", "معالجة عمليات الدفع.", "إرسال تحديثات الطلبات.", "تحسين موقعنا الإلكتروني وخدماتنا.", "الرد على استفسارات العملاء.", "منع عمليات الاحتيال والمعاملات غير المصرح بها.", "إرسال العروض والرسائل الترويجية (فقط عندما يسمح القانون بذلك أو بعد الحصول على موافقتك)."] },
  ] },
  { id: "cookies", heading: "3. ملفات تعريف الارتباط (Cookies)", blocks: [
    { p: "يستخدم موقعنا ملفات تعريف الارتباط (Cookies) وتقنيات مشابهة من أجل:" },
    { ul: ["تحسين وظائف وأداء الموقع.", "تذكر تفضيلات المستخدم.", "تحليل حركة المرور على الموقع.", "تحسين تجربة التسوق الخاصة بك."] },
    { p: "يمكنك تعطيل ملفات تعريف الارتباط من خلال إعدادات متصفحك، إلا أن بعض وظائف الموقع قد لا تعمل بالشكل المطلوب." },
  ] },
  { id: "payment-security", heading: "4. أمان عمليات الدفع", blocks: [
    { p: "تتم معالجة جميع معاملات الدفع من خلال مزودي خدمات دفع خارجيين وآمنين." },
    { p: "ولا نقوم بتخزين بيانات بطاقات الخصم أو بطاقات الائتمان الخاصة بك بشكل كامل." },
  ] },
  { id: "sharing", heading: "5. مشاركة المعلومات", blocks: [
    { p: "نحن لا نقوم ببيع أو تأجير معلوماتك الشخصية لأي طرف." },
    { p: "ومع ذلك، قد نشارك المعلومات مع:" },
    { ul: ["شركاء خدمات التوصيل.", "مزودي خدمات الدفع.", "مزودي خدمات تقنية المعلومات.", "الجهات الحكومية عندما يكون ذلك مطلوبًا بموجب القانون."] },
  ] },
  { id: "security", heading: "6. أمن البيانات", blocks: [
    { p: "نتخذ التدابير الفنية والتنظيمية المناسبة لحماية معلوماتك الشخصية من الوصول غير المصرح به أو إساءة الاستخدام أو الفقدان أو الإفصاح." },
    { p: "ومع ذلك، لا يمكن ضمان أن تكون أي وسيلة لنقل البيانات عبر الإنترنت أو تخزينها إلكترونيًا آمنة بشكل كامل." },
  ] },
  { id: "retention", heading: "7. الاحتفاظ بالبيانات", blocks: [
    { p: "نحتفظ بمعلوماتك الشخصية فقط للمدة اللازمة من أجل:" },
    { ul: ["تنفيذ طلباتك.", "الامتثال للالتزامات القانونية.", "تسوية النزاعات.", "تنفيذ الاتفاقيات المبرمة."] },
  ] },
  { id: "rights", heading: "8. حقوقك", blocks: [
    { p: "وفقًا للقوانين المعمول بها، قد يكون لك الحق في:" },
    { ul: ["الوصول إلى معلوماتك الشخصية.", "تصحيح المعلومات غير الدقيقة.", "طلب حذف معلوماتك الشخصية.", "الاعتراض على بعض عمليات معالجة البيانات.", "سحب موافقتك على تلقي الرسائل التسويقية."] },
  ] },
  { id: "children", heading: "9. خصوصية الأطفال", blocks: [
    { p: "هذا الموقع غير مخصص للأشخاص الذين تقل أعمارهم عن 18 عامًا." },
    { p: "ولا نقوم عن علم بجمع أي معلومات شخصية من القُصّر." },
  ] },
  { id: "third-party", heading: "10. خدمات وروابط الجهات الخارجية", blocks: [
    { p: "قد يحتوي موقعنا الإلكتروني على روابط لمواقع إلكترونية خارجية أو يستخدم خدمات مقدمة من جهات خارجية." },
    { p: "ولا نتحمل أي مسؤولية عن ممارسات الخصوصية الخاصة بهذه الجهات." },
  ] },
  { id: "changes", heading: "11. التعديلات على سياسة الخصوصية", blocks: [
    { p: "قد نقوم بتحديث سياسة الخصوصية هذه من وقت لآخر." },
    { p: "وسيتم نشر النسخة المحدثة على هذه الصفحة مع توضيح تاريخ سريان التعديل." },
  ] },
  { id: "contact", heading: "12. اتصل بنا", blocks: [
    { p: "إذا كانت لديك أي استفسارات بشأن سياسة الخصوصية هذه أو معلوماتك الشخصية، يرجى التواصل معنا:" },
    { p: "LuvanaParis" },
    { p: "Marriott United Company" },
    { p: "مجمع العريبد بلازا" },
    { p: "القطعة رقم 4، شارع 55" },
    { p: "البرج الأول، الطابق الرابع" },
    { p: "الفروانية، الكويت." },
  ] },
];

export default function LegalPrivacy() {
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
      title={isRTL ? "سياسة الخصوصية" : "Privacy Policy"}
      description={isRTL ? AR_INTRO : EN_INTRO}
      sections={sections}
      contentDir={isRTL ? "rtl" : "ltr"}
      tocLabel={isRTL ? "محتويات الصفحة" : "On this page"}
    />
  );
}
