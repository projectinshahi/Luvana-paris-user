// "use client";

// import { I18nextProvider } from "react-i18next";
// import { ReactNode, useEffect, useState } from "react";
// import i18n from "@/lib/i18n";
// import { CurrencyProvider } from "@/contexts/CurrencyContext";

// export function I18nProvider({ children }: { children: ReactNode }) {
//   const [ready, setReady] = useState(false);
//   const [isMounted, setIsMounted] = useState(false);

//   useEffect(() => {
//     setIsMounted(true);
    
//     const handleI18nInitialized = () => {
//       const savedLanguage = localStorage.getItem("language") || "en";

//       if (i18n.language !== savedLanguage) {
//         i18n.changeLanguage(savedLanguage);
//       }

//       // Set direction
//       document.documentElement.lang = savedLanguage;
//       document.documentElement.dir = savedLanguage === "ar" ? "rtl" : "ltr";
//       document.body.classList.toggle("rtl", savedLanguage === "ar");
//       document.body.classList.toggle("ltr", savedLanguage !== "ar");

//       setReady(true);
//     };

//     if (i18n.isInitialized) {
//       handleI18nInitialized();
//     } else {
//       i18n.on("initialized", handleI18nInitialized);
//       return () => i18n.off("initialized", handleI18nInitialized);
//     }
//   }, []);

//   // Wait for both hydration and i18n to be ready before rendering children
//   if (!isMounted || !ready) {
//     return (
//       <CurrencyProvider>
//         <div suppressHydrationWarning />
//       </CurrencyProvider>
//     );
//   }

//   return (
//     <CurrencyProvider>
//       <I18nextProvider i18n={i18n}>
//         {children}
//       </I18nextProvider>
//     </CurrencyProvider>
//   );
// }

"use client";

import { I18nextProvider } from "react-i18next";
import { ReactNode, useEffect, useState } from "react";
import i18n from "@/lib/i18n";

export function I18nProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") || "en";

    if (i18n.language !== savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    }

    document.documentElement.lang = savedLanguage;
    document.documentElement.dir =
      savedLanguage === "ar" ? "rtl" : "ltr";

    setReady(true);
  }, []);

  if (!ready) return null;

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}