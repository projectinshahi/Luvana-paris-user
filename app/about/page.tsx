import type { Metadata } from "next";
import AboutView from "@/components/AboutView";

export const metadata: Metadata = {
  title: "About Us | LuvanaParis",
  description:
    "LuvanaParis — a premium beauty destination operated by Marriott United Company, Kuwait, bringing authentic, high-quality beauty and personal care products across Kuwait and the GCC.",
};

export default function AboutPage() {
  return <AboutView />;
}
