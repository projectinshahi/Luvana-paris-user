import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { I18nProvider } from "./providers";
import { CurrencyProvider } from "@/contexts/CurrencyContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ReduxProvider } from "../redux/ReduxProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});


const GOOGLE_FONTS_URL =
  "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700&family=DM+Sans:wght@300;400;500;600;700&family=Montserrat:wght@300;400;500;600&family=Noto+Sans+Arabic:wght@300;400;500;600;700&display=swap";

export const metadata: Metadata = {
  metadataBase: new URL("https://luvanaparis.com"),
  title: {
    default: "Luvana Paris — Luxury Beauty, Fragrance & Cosmetics",
    template: "%s | Luvana Paris",
  },
  description:
    "Luvana Paris — a curated luxury destination for premium beauty, skincare, fragrance and cosmetics from iconic brands.",
  applicationName: "Luvana Paris",
  keywords: [
    "Luvana Paris",
    "luxury beauty",
    "fragrance",
    "perfume",
    "skincare",
    "makeup",
    "cosmetics",
    "premium beauty",
  ],
  authors: [{ name: "Luvana Paris" }],
  openGraph: {
    type: "website",
    siteName: "Luvana Paris",
    title: "Luvana Paris — Luxury Beauty, Fragrance & Cosmetics",
    description:
      "A curated luxury destination for premium beauty, skincare, fragrance and cosmetics.",
    images: [{ url: "/images/final.png", alt: "Luvana Paris" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Luvana Paris — Luxury Beauty, Fragrance & Cosmetics",
    description:
      "A curated luxury destination for premium beauty, skincare, fragrance and cosmetics.",
    images: ["/images/final.png"],
  },
  robots: { index: true, follow: true },
  icons: { icon: "/images/final.png" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* Runs before first paint:
            1. Visitors with a saved non-English language stay hidden until it is applied
               after hydration (app/providers.tsx), so English never flashes for them.
               The hero banner's ratio from a previous visit sizes its placeholder
               (components/ImageSection.tsx), so it does not shift when the banner loads.
            2. Loads the Google Fonts stylesheet without blocking the first paint. One request
               covers every family the pages use (it replaces per-page @imports); files only
               download for glyphs actually rendered. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var d=document.documentElement;try{var l=localStorage.getItem("language");if(l&&l!=="en")d.setAttribute("data-i18n-pending","");var m=localStorage.getItem("heroRatio-m"),k=localStorage.getItem("heroRatio-d");if(+m>0)d.style.setProperty("--hero-ratio-m",m);if(+k>0)d.style.setProperty("--hero-ratio-d",k)}catch(e){}var f=document.createElement("link");f.rel="stylesheet";f.href=${JSON.stringify(GOOGLE_FONTS_URL)};document.head.appendChild(f)})();`,
          }}
        />
        <noscript>
          <link href={GOOGLE_FONTS_URL} rel="stylesheet" />
        </noscript>
      </head>

      <body
        className={`${geistSans.variable} antialiased w-full overflow-x-clip bg-cream text-ink`}
        suppressHydrationWarning
      >
        <ReduxProvider>
        <I18nProvider>
          <CurrencyProvider>
            <Navbar />
            {children}
            <Footer />
            <ToastContainer position="top-right" autoClose={3000} />
          </CurrencyProvider>
        </I18nProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}