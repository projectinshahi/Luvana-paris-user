import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Import translation files
import enCommon from "@/public/locales/en/common.json";
import arCommon from "@/public/locales/ar/common.json";
import frCommon from "@/public/locales/fr/common.json";

const resources = {
  en: { common: enCommon },
  ar: { common: arCommon },
  fr: { common: frCommon },
};

if (!i18next.isInitialized) {
  i18next
    .use(LanguageDetector)
    .use(initReactI18next)
    .init(
      {
        resources,
        fallbackLng: "en",
        defaultNS: "common",
        ns: ["common"],
        interpolation: {
          escapeValue: false,
        },
        detection: {
          order: ["localStorage", "htmlTag"],
          caches: ["localStorage"],
        },
        react: {
          useSuspense: false,
        },
        // Prevent hydration issues
        initImmediate: false,
        // Always start in English so server HTML and the first client render match;
        // app/providers.tsx switches to the visitor's saved language after hydration.
        lng: 'en',
      },
      (err) => {
        if (err) console.error("i18n initialization error:", err);
      }
    );
}

// Handle language changes
i18next.on("languageChanged", (lng) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("language", lng);
    document.documentElement.lang = lng;
    // Layout always stays LTR — only text content is translated to Arabic.
    document.documentElement.dir = "ltr";

    if (lng === "ar") {
      document.body.classList.add("rtl");
      document.body.classList.remove("ltr");
    } else {
      document.body.classList.add("ltr");
      document.body.classList.remove("rtl");
    }
  }
});

export default i18next;

