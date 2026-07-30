import type { Metadata } from "next";
import LegalTerms from "@/components/LegalTerms";

export const metadata: Metadata = {
  title: "Terms & Conditions | LuvanaParis Kuwait",
  description: "Read the Terms & Conditions governing purchases and website use at LuvanaParis, a brand of Marriott United Company, Kuwait.",
};

export default function TermsPage() {
  return <LegalTerms />;
}
