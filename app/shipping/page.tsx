import type { Metadata } from "next";
import LegalShipping from "@/components/LegalShipping";

export const metadata: Metadata = {
  title: "Shipping & Delivery Policy | LuvanaParis Kuwait",
  description:
    "Learn about LuvanaParis shipping rates, delivery timeframes in Kuwait and GCC, order tracking, and delivery terms.",
};

export default function ShippingPage() {
  return <LegalShipping />;
}
