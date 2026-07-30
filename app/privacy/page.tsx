import type { Metadata } from "next";
import LegalPrivacy from "@/components/LegalPrivacy";

export const metadata: Metadata = {
  title: "Privacy Policy | LuvanaParis Kuwait",
  description: "Learn how LuvanaParis, operated by Marriott United Company, collects, uses, stores, and protects your personal information.",
};

export default function PrivacyPage() {
  return <LegalPrivacy />;
}
