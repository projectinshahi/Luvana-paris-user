import type { Metadata } from "next";
import LegalReturns from "@/components/LegalReturns";

export const metadata: Metadata = {
  title: "Return & Refund Policy | LuvanaParis Kuwait",
  description: "Read the LuvanaParis Return & Refund Policy — eligibility, non-returnable items, refunds, exchanges, and return shipping.",
};

export default function ReturnsPage() {
  return <LegalReturns />;
}
