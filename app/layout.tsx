import type { Metadata } from "next";
import { Geist, Cactus_Classical_Serif } from "next/font/google";
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

const cactusSerif = Cactus_Classical_Serif({
  variable: "--font-cactus-serif",
  subsets: ["latin"],
  weight: "400",
});

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
        {/* Only Noto Sans Arabic actually renders (.font-arabic first family); the other 3
            families + weights 100–900 were render-blocking dead weight. Kept 300–700 (the used weights). */}
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>

      <body
        className={`${geistSans.variable} ${cactusSerif.variable} antialiased w-full overflow-x-clip bg-cream text-ink`}
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