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

import { I18nextProvider, useTranslation } from "react-i18next";
import { ReactNode, useEffect } from "react";
import i18n from "@/lib/i18n";

// Applies a visitor's saved language right after hydration. The server and the
// first client render are both English (lib/i18n.ts) so they match; visitors with
// another saved language are kept hidden until it is on screen (app/layout.tsx).
function ApplySavedLanguage() {
  const { i18n: instance } = useTranslation("common");

  useEffect(() => {
    const saved = localStorage.getItem("language") || "en";
    document.documentElement.lang = saved;
    // Layout always stays LTR — only text content is translated to Arabic.
    document.documentElement.dir = "ltr";
    if (instance.language !== saved) instance.changeLanguage(saved);
  }, [instance]);

  useEffect(() => {
    const saved = localStorage.getItem("language") || "en";
    if (instance.language === saved) {
      requestAnimationFrame(() => document.documentElement.removeAttribute("data-i18n-pending"));
    }
  }, [instance.language]);

  return null;
}

// Renders its children immediately. It used to return null until an effect had run,
// so every page's server HTML was empty and first paint waited for all the JavaScript.
export function I18nProvider({ children }: { children: ReactNode }) {
  return (
    <I18nextProvider i18n={i18n}>
      <ApplySavedLanguage />
      {children}
    </I18nextProvider>
  );
}
