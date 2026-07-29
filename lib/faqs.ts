// Plain data — shared by the FAQ page (JSON-LD) and the client accordion.
// Content verbatim from "Frequently Asked Questions" (EN Word / AR PDF).
export type Faq = {
  n: number;
  category: string;
  categoryAr: string;
  q: string;
  qAr: string;
  a: string;
  aAr: string;
  list?: string[];
  listAr?: string[];
  note?: string;
  noteAr?: string;
};

const C = {
  general: ["General", "أسئلة عامة"],
  orders: ["Orders", "الطلبات"],
  payments: ["Payments", "الدفع"],
  shipping: ["Shipping & Delivery", "الشحن والتوصيل"],
  returns: ["Returns & Refunds", "الإرجاع واسترداد الأموال"],
  products: ["Products", "المنتجات"],
  account: ["Customer Account", "حساب العميل"],
  promotions: ["Promotions", "العروض الترويجية"],
  support: ["Customer Support", "خدمة العملاء"],
} as const;

const mk = (n: number, c: readonly [string, string], q: string, qAr: string, a: string, aAr: string, extra: Partial<Faq> = {}): Faq =>
  ({ n, category: c[0], categoryAr: c[1], q, qAr, a, aAr, ...extra });

export const FAQS: Faq[] = [
  mk(1, C.general, "What is LuvanaParis?", "ما هي LuvanaParis؟",
    "LuvanaParis is a premium beauty and lifestyle destination operated by Marriott United Company, offering authentic hair care, skincare, cosmetics, makeup, fragrances, and beauty accessories from leading international brands.",
    "LuvanaParis هي وجهتك المتميزة في عالم الجمال وأسلوب الحياة، وتُدار من قبل Marriott United Company، حيث نقدم منتجات أصلية للعناية بالشعر، والعناية بالبشرة، ومستحضرات التجميل، والعطور، وإكسسوارات التجميل من أشهر العلامات التجارية العالمية."),
  mk(2, C.general, "Are your products authentic?", "هل جميع منتجاتكم أصلية؟",
    "Yes. We guarantee that all products sold on LuvanaParis are 100% genuine and sourced directly from manufacturers, brand owners, or authorized distributors.",
    "نعم، نضمن أن جميع المنتجات المعروضة في LuvanaParis أصلية 100%، ويتم الحصول عليها مباشرةً من الشركات المصنعة أو مالكي العلامات التجارية أو الموزعين المعتمدين."),
  mk(3, C.general, "Where is LuvanaParis located?", "أين يقع مقر LuvanaParis؟",
    "LuvanaParis is operated by Marriott United Company. Address: Al-Arbeed Plaza Complex, Block #4, Street #55, 1st Tower, 4th Floor, Farwaniya, Kuwait.",
    "تُدار LuvanaParis بواسطة Marriott United Company. العنوان: مجمع العريبد بلازا، القطعة رقم 4، شارع 55، البرج الأول، الطابق الرابع، الفروانية، الكويت."),
  mk(4, C.orders, "How do I place an order?", "كيف يمكنني تقديم طلب؟",
    "Simply browse our website, add your desired products to the shopping cart, proceed to checkout, enter your shipping information, choose your preferred payment method, and confirm your order.",
    "يمكنك تصفح الموقع، وإضافة المنتجات التي ترغب بها إلى سلة التسوق، ثم الانتقال إلى صفحة الدفع، وإدخال بيانات الشحن، واختيار طريقة الدفع المناسبة، وأخيرًا تأكيد الطلب."),
  mk(5, C.orders, "Can I modify or cancel my order?", "هل يمكنني تعديل أو إلغاء طلبي؟",
    "Orders can only be modified or cancelled before they have been processed for shipment. Please contact our Customer Support as soon as possible after placing your order.",
    "يمكن تعديل أو إلغاء الطلب فقط قبل بدء إجراءات الشحن. يرجى التواصل مع خدمة العملاء في أقرب وقت ممكن بعد إتمام الطلب."),
  mk(6, C.orders, "How do I know if my order has been confirmed?", "كيف أعرف أن طلبي قد تم تأكيده؟",
    "Once your order is successfully placed, you will receive an order confirmation by email or SMS (where available).",
    "بعد إتمام الطلب بنجاح، ستتلقى رسالة تأكيد عبر البريد الإلكتروني أو رسالة نصية (عند توفر الخدمة)."),
  mk(7, C.orders, "Can I order without creating an account?", "هل يمكنني الطلب دون إنشاء حساب؟",
    "Guest checkout may be available. However, creating an account allows you to track orders, save addresses, and enjoy a faster checkout experience.",
    "قد تتوفر إمكانية الشراء كضيف. ومع ذلك، فإن إنشاء حساب يتيح لك تتبع الطلبات، وحفظ عناوين التوصيل، والاستفادة من تجربة شراء أسرع."),
  mk(8, C.payments, "What payment methods do you accept?", "ما هي وسائل الدفع التي تقبلونها؟",
    "We accept secure online payment methods available at checkout, including major credit and debit cards and other supported payment options. Available payment methods may vary depending on your country.",
    "نقبل وسائل الدفع الإلكترونية الآمنة المتاحة عند إتمام عملية الشراء، بما في ذلك بطاقات الائتمان، وبطاقات الخصم، وغيرها من وسائل الدفع المدعومة. قد تختلف وسائل الدفع المتاحة حسب الدولة."),
  mk(9, C.payments, "Is my payment information secure?", "هل معلومات الدفع الخاصة بي آمنة؟",
    "Yes. All online payments are processed through secure, encrypted payment gateways. LuvanaParis does not store your complete payment card information.",
    "نعم، تتم جميع عمليات الدفع عبر بوابات دفع إلكترونية مشفرة وآمنة، ولا تقوم LuvanaParis بالاحتفاظ ببيانات بطاقات الدفع الكاملة الخاصة بك."),
  mk(10, C.shipping, "Which countries do you deliver to?", "إلى أي الدول تقومون بالشحن؟",
    "We currently deliver throughout Kuwait and selected GCC and international destinations. Available shipping locations will be displayed during checkout.",
    "نقوم حاليًا بالتوصيل داخل دولة الكويت، بالإضافة إلى عدد من دول مجلس التعاون الخليجي وبعض الوجهات الدولية. وستظهر الدول المتاحة أثناء إتمام الطلب."),
  mk(11, C.shipping, "How long does delivery take?", "كم تستغرق مدة التوصيل؟",
    "Estimated delivery times are:",
    "مدة التوصيل التقديرية هي:",
    {
      list: ["Kuwait: 1–3 Business Days", "GCC Countries: 3–7 Business Days", "International: 5–14 Business Days"],
      listAr: ["داخل الكويت: من يوم إلى 3 أيام عمل.", "دول مجلس التعاون الخليجي: من 3 إلى 7 أيام عمل.", "الشحن الدولي: من 5 إلى 14 يوم عمل."],
      note: "Delivery times may vary depending on customs clearance, courier operations, and local conditions.",
      noteAr: "قد تختلف مدة التوصيل حسب إجراءات التخليص الجمركي، وشركات الشحن، والظروف المحلية.",
    }),
  mk(12, C.shipping, "How can I track my order?", "كيف يمكنني تتبع طلبي؟",
    "Once your order has been shipped, you will receive tracking details by email or SMS (where available).",
    "بعد شحن الطلب، سيتم إرسال رقم التتبع عبر البريد الإلكتروني أو رسالة نصية (عند توفر الخدمة)."),
  mk(13, C.shipping, "Do you offer free shipping?", "هل توفرون شحنًا مجانيًا؟",
    "Free shipping promotions may be available on selected orders or during promotional campaigns. Please refer to our website for current offers.",
    "قد تتوفر عروض الشحن المجاني لبعض الطلبات أو خلال الحملات الترويجية. يرجى مراجعة موقعنا الإلكتروني للاطلاع على أحدث العروض."),
  mk(14, C.returns, "Can I return a product?", "هل يمكنني إرجاع المنتج؟",
    "Yes, eligible products may be returned according to our Return & Refund Policy. For hygiene and safety reasons, opened or used cosmetic, skincare, haircare, fragrance, and personal care products cannot be returned unless they are defective or delivered incorrectly.",
    "نعم، يمكن إرجاع المنتجات المؤهلة وفقًا لسياسة الإرجاع واسترداد الأموال الخاصة بنا. ولأسباب تتعلق بالنظافة والسلامة، لا يمكن إرجاع مستحضرات التجميل، والعناية بالبشرة، والعناية بالشعر، والعطور، ومنتجات العناية الشخصية بعد فتحها أو استخدامها، إلا إذا كانت معيبة أو تم تسليمها بالخطأ."),
  mk(15, C.returns, "What should I do if I receive a damaged product?", "ماذا أفعل إذا استلمت منتجًا تالفًا؟",
    "Please contact our Customer Support within 48 hours of receiving your order and include your order number along with clear photographs of the damaged product and its packaging.",
    "يرجى التواصل مع خدمة العملاء خلال 48 ساعة من استلام الطلب، مع تزويدنا برقم الطلب وصور واضحة للمنتج التالف وعبوته."),
  mk(16, C.returns, "How long do refunds take?", "كم تستغرق عملية استرداد المبلغ؟",
    "Approved refunds are generally processed within 7–14 business days, depending on your payment provider.",
    "عادةً ما تتم معالجة طلبات استرداد الأموال المعتمدة خلال 7 إلى 14 يوم عمل، وذلك حسب مزود خدمة الدفع."),
  mk(17, C.products, "Are product images accurate?", "هل صور المنتجات مطابقة للمنتج الفعلي؟",
    "We make every effort to display product images accurately. However, packaging, labeling, and colors may vary slightly due to manufacturer updates or individual device display settings.",
    "نبذل قصارى جهدنا لعرض صور المنتجات بدقة، إلا أن العبوات أو الملصقات أو الألوان قد تختلف اختلافًا بسيطًا نتيجة تحديثات الشركة المصنعة أو إعدادات شاشة الجهاز المستخدم."),
  mk(18, C.products, "Are your products suitable for sensitive skin?", "هل منتجاتكم مناسبة للبشرة الحساسة؟",
    "Every person's skin is unique. We recommend reviewing the ingredient list and performing a patch test before using any new skincare or cosmetic product. If you have known allergies or skin conditions, consult a healthcare professional before use.",
    "تختلف طبيعة البشرة من شخص لآخر، لذلك ننصح بمراجعة قائمة المكونات وإجراء اختبار حساسية على جزء صغير من الجلد قبل استخدام أي منتج جديد. وفي حال كنت تعاني من حساسية أو مشاكل جلدية معروفة، يُفضل استشارة الطبيب قبل الاستخدام."),
  mk(19, C.products, "What should I do if a product causes irritation?", "ماذا أفعل إذا تسبب المنتج في تهيج البشرة؟",
    "Discontinue use immediately. If irritation persists, seek advice from a qualified healthcare professional.",
    "يجب التوقف عن استخدام المنتج فورًا، وإذا استمر التهيج، يُنصح باستشارة طبيب أو مختص بالرعاية الصحية."),
  mk(20, C.products, "Do your products have expiry dates?", "هل تحمل المنتجات تاريخ انتهاء صلاحية؟",
    "Yes. All cosmetic, skincare, haircare, fragrance, and personal care products carry expiry information or a Period After Opening (PAO) symbol, in accordance with manufacturer requirements.",
    "نعم، جميع منتجات التجميل والعناية بالبشرة والشعر والعطور والعناية الشخصية تحمل تاريخ انتهاء الصلاحية أو رمز مدة الاستخدام بعد الفتح (PAO)، وفقًا لمتطلبات الشركة المصنعة."),
  mk(21, C.account, "How do I reset my password?", "كيف يمكنني إعادة تعيين كلمة المرور؟",
    'Click the "Forgot Password" link on the login page and follow the instructions sent to your registered email address.',
    'اضغط على خيار "نسيت كلمة المرور" في صفحة تسجيل الدخول، ثم اتبع التعليمات التي سيتم إرسالها إلى بريدك الإلكتروني المسجل.'),
  mk(22, C.account, "Can I update my delivery address?", "هل يمكنني تحديث عنوان التوصيل؟",
    "Yes. You can update your saved addresses from your account dashboard before placing a new order.",
    "نعم، يمكنك تحديث عناوين التوصيل المحفوظة من خلال لوحة التحكم الخاصة بحسابك قبل تقديم أي طلب جديد."),
  mk(23, C.promotions, "How do I use a discount code?", "كيف أستخدم رمز الخصم؟",
    "Enter your promotional or discount code during checkout before completing your payment. Only one promotional code may be accepted per order unless otherwise stated.",
    "أدخل رمز الخصم أو الرمز الترويجي أثناء إتمام عملية الشراء قبل إكمال الدفع. ويُسمح عادةً باستخدام رمز ترويجي واحد فقط لكل طلب، ما لم يُذكر خلاف ذلك."),
  mk(24, C.promotions, "Why isn't my discount code working?", "لماذا لا يعمل رمز الخصم الخاص بي؟",
    "A discount code may be invalid because:",
    "قد يكون رمز الخصم غير صالح للأسباب التالية:",
    {
      list: ["It has expired.", "Minimum purchase requirements have not been met.", "It is limited to selected products.", "It has already been used.", "It cannot be combined with another promotion."],
      listAr: ["انتهت صلاحية الرمز.", "لم يتم استيفاء الحد الأدنى لقيمة الشراء.", "الرمز مخصص لمنتجات معينة فقط.", "تم استخدام الرمز مسبقًا.", "لا يمكن دمجه مع عرض ترويجي آخر."],
    }),
  mk(25, C.support, "How can I contact LuvanaParis?", "كيف يمكنني التواصل مع LuvanaParis؟",
    "Our Customer Support team is available to assist you with product enquiries, order updates, returns, and general questions. You can contact us through the contact form on our website or via the email address and telephone number listed on our Contact Us page.",
    "يسعد فريق خدمة العملاء لدينا بمساعدتك في جميع الاستفسارات المتعلقة بالمنتجات، والطلبات، وعمليات الإرجاع، وأي استفسارات عامة. يمكنك التواصل معنا من خلال نموذج الاتصال الموجود على موقعنا الإلكتروني، أو عبر البريد الإلكتروني ورقم الهاتف الموضحين في صفحة اتصل بنا."),
  mk(26, C.support, "How can I stay updated on new products and promotions?", "كيف يمكنني متابعة أحدث المنتجات والعروض؟",
    "Subscribe to our newsletter and follow our official social media channels to receive updates on new arrivals, exclusive offers, beauty tips, and special promotions.",
    "يمكنك الاشتراك في نشرتنا البريدية ومتابعة حساباتنا الرسمية على وسائل التواصل الاجتماعي للحصول على أحدث المنتجات، والعروض الحصرية، ونصائح الجمال، والحملات الترويجية الخاصة."),
];
