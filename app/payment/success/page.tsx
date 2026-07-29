"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  CheckCircle2,
  Package,
  MapPin,
  Mail,
  Phone,
  Calendar,
  ArrowRight,
  Loader2,
} from "lucide-react";
import { useCurrency } from "@/contexts/CurrencyContext";

const GOLD = "#8B5E3C";
const GOLD_LIGHT = "#9A6A44";
const GOLD_DARK = "#714B2F";

interface OrderDetails {
  customerName: string;
  customerEmail: string;
  address: string;
  total: number;
  tapChargeId: string;
  cartItems: Array<{ variant: string; quantity: number }>;
  paymentStatus: string;
}

export default function PaymentSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { formatPrice } = useCurrency();

  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Retrieve order details from sessionStorage
    const pendingOrder = sessionStorage.getItem("pendingOrder");

    if (!pendingOrder) {
      router.push("/");
      return;
    }

    try {
      const order = JSON.parse(pendingOrder);
      setOrderDetails(order);
      // Clear sessionStorage after reading
      sessionStorage.removeItem("pendingOrder");
    } catch (err) {
      console.error("Error parsing order details:", err);
      setError("Failed to load order details.");
    } finally {
      setLoading(false);
    }
  }, [router]);

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#FFFDF9",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <Loader2
            size={40}
            color={GOLD}
            style={{ animation: "spin 1s linear infinite", marginBottom: 16 }}
          />
          <p style={{ color: "#918980", fontSize: 14 }}>Processing your payment...</p>
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (error || !orderDetails) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#FFFDF9",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "'DM Sans', sans-serif",
          padding: "20px",
        }}
      >
        <div
          style={{
            maxWidth: 500,
            textAlign: "center",
            background: "#FFFFFF",
            border: "1px solid #E8DED2",
            borderRadius: 14,
            padding: "40px 24px",
          }}
        >
          <div
            style={{
              width: 60,
              height: 60,
              borderRadius: "50%",
              background: "#FBEAEA",
              border: "2px solid #E9B8B8",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 20px",
            }}
          >
            <span style={{ fontSize: 28 }}>⚠️</span>
          </div>
          <h1
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 24,
              fontWeight: 700,
              margin: "0 0 12px",
              color: "#2E2A26",
            }}
          >
            Payment Error
          </h1>
          <p style={{ color: "#918980", fontSize: 14, margin: "0 0 24px", lineHeight: 1.6 }}>
            {error}
          </p>
          <button
            onClick={() => router.push("/checkout")}
            style={{
              padding: "12px 28px",
              borderRadius: 8,
              background: `linear-gradient(135deg, ${GOLD_DARK}, ${GOLD}, ${GOLD_LIGHT})`,
              border: "none",
              color: "#000",
              fontWeight: 700,
              cursor: "pointer",
              fontSize: 13,
              letterSpacing: 1,
              textTransform: "uppercase",
            }}
          >
            Return to Checkout
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#FFFDF9",
        color: "#2E2A26",
        fontFamily: "'DM Sans', sans-serif",
        padding: "40px 20px",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=DM+Sans:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; }
        @keyframes slideIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .success-card { animation: slideIn 0.5s ease; }
      `}</style>

      <div style={{ maxWidth: 600, margin: "0 auto" }}>
        {/* Success Header */}
        <div
          className="success-card"
          style={{
            textAlign: "center",
            marginBottom: 40,
            background: "#FFFFFF",
            border: "1px solid #E8DED2",
            borderRadius: 14,
            padding: "40px 24px",
          }}
        >
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              background: `${GOLD}15`,
              border: `2px solid ${GOLD}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 20px",
            }}
          >
            <CheckCircle2 size={40} color={GOLD} strokeWidth={1.5} />
          </div>

          <h1
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 32,
              fontWeight: 700,
              margin: "0 0 8px",
              color: "#2E2A26",
            }}
          >
            Payment Successful
          </h1>

          <p style={{ color: "#918980", fontSize: 14, margin: "0 0 24px" }}>
            Thank you for your order. Your payment has been processed successfully.
          </p>

          <div
            style={{
              padding: "16px",
              background: "#FAF6EF",
              borderRadius: 10,
              border: `1px solid ${GOLD}33`,
            }}
          >
            <p style={{ margin: 0, fontSize: 12, color: "#918980", letterSpacing: 1 }}>
              CHARGE ID
            </p>
            <p
              style={{
                margin: "6px 0 0",
                fontSize: 13,
                color: GOLD_DARK,
                fontFamily: "'Courier New', monospace",
                wordBreak: "break-all",
              }}
            >
              {orderDetails.tapChargeId}
            </p>
          </div>
        </div>

        {/* Order Details */}
        <div
          className="success-card"
          style={{
            background: "#FFFFFF",
            border: "1px solid #E8DED2",
            borderRadius: 14,
            padding: "28px 24px",
            marginBottom: 24,
          }}
        >
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 20,
              fontWeight: 700,
              margin: "0 0 20px",
              color: "#2E2A26",
            }}
          >
            Order Details
          </h2>

          {/* Customer Info */}
          <div style={{ marginBottom: 24 }}>
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 14,
                marginBottom: 16,
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  background: `${GOLD}15`,
                  border: `1px solid ${GOLD}40`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Mail size={18} color={GOLD} />
              </div>
              <div>
                <p style={{ margin: 0, fontSize: 12, color: "#918980", letterSpacing: 1 }}>
                  CUSTOMER NAME
                </p>
                <p style={{ margin: "4px 0 0", fontSize: 14, color: "#2E2A26" }}>
                  {orderDetails.customerName}
                </p>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 14,
                marginBottom: 16,
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  background: `${GOLD}15`,
                  border: `1px solid ${GOLD}40`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Mail size={18} color={GOLD} />
              </div>
              <div>
                <p style={{ margin: 0, fontSize: 12, color: "#918980", letterSpacing: 1 }}>
                  EMAIL
                </p>
                <p style={{ margin: "4px 0 0", fontSize: 14, color: "#2E2A26" }}>
                  {orderDetails.customerEmail}
                </p>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 14,
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  background: `${GOLD}15`,
                  border: `1px solid ${GOLD}40`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <MapPin size={18} color={GOLD} />
              </div>
              <div>
                <p style={{ margin: 0, fontSize: 12, color: "#918980", letterSpacing: 1 }}>
                  DELIVERY ADDRESS
                </p>
                <p style={{ margin: "4px 0 0", fontSize: 14, color: "#2E2A26" }}>
                  {orderDetails.address}
                </p>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div
            style={{
              height: 1,
              background: `linear-gradient(to right, transparent, ${GOLD}55, transparent)`,
              margin: "24px 0",
            }}
          />

          {/* Order Total */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <p style={{ margin: 0, fontSize: 12, color: "#918980", letterSpacing: 1 }}>
                ORDER TOTAL
              </p>
              <p style={{ margin: "4px 0 0", fontSize: 13, color: "#918980" }}>
                Including all taxes & shipping
              </p>
            </div>
            <p
              style={{
                margin: 0,
                fontSize: 28,
                fontWeight: 700,
                color: GOLD_DARK,
                fontFamily: "'Cormorant Garamond', serif",
              }}
            >
              {formatPrice(orderDetails.total)}
            </p>
          </div>
        </div>

        {/* Next Steps */}
        <div
          className="success-card"
          style={{
            background: "#FFFFFF",
            border: "1px solid #E8DED2",
            borderRadius: 14,
            padding: "28px 24px",
            marginBottom: 24,
          }}
        >
          <h3
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 16,
              fontWeight: 700,
              margin: "0 0 16px",
              color: "#2E2A26",
            }}
          >
            What's Next?
          </h3>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              {
                icon: "📧",
                title: "Confirmation Email",
                desc: "You'll receive an order confirmation at your email address",
              },
              {
                icon: "📦",
                title: "Order Processing",
                desc: "Your order will be prepared and shipped within 2-3 business days",
              },
              {
                icon: "🚚",
                title: "Tracking Updates",
                desc: "You'll receive tracking information once your order ships",
              },
            ].map((step, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  gap: 12,
                  padding: "12px",
                  background: "#FAF6EF",
                  borderRadius: 8,
                  border: "1px solid #E8DED2",
                }}
              >
                <span style={{ fontSize: 20 }}>{step.icon}</span>
                <div>
                  <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: "#2E2A26" }}>
                    {step.title}
                  </p>
                  <p style={{ margin: "4px 0 0", fontSize: 12, color: "#918980" }}>
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div
          className="success-card"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 12,
          }}
        >
          <button
            onClick={() => router.push("/myorders")}
            style={{
              padding: "14px 20px",
              borderRadius: 10,
              background: `linear-gradient(135deg, ${GOLD_DARK}, ${GOLD}, ${GOLD_LIGHT})`,
              border: "none",
              color: "#000",
              fontWeight: 700,
              cursor: "pointer",
              fontSize: 13,
              letterSpacing: 1,
              textTransform: "uppercase",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLButtonElement).style.transform = "translateY(-2px)";
              (e.target as HTMLButtonElement).style.boxShadow = `0 8px 24px ${GOLD}44`;
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLButtonElement).style.transform = "translateY(0)";
              (e.target as HTMLButtonElement).style.boxShadow = "none";
            }}
          >
            <Package size={16} />
            My Orders
          </button>

          <button
            onClick={() => router.push("/")}
            style={{
              padding: "14px 20px",
              borderRadius: 10,
              background: "#FAF6EF",
              border: `1px solid #E8DED2`,
              color: "#2E2A26",
              fontWeight: 700,
              cursor: "pointer",
              fontSize: 13,
              letterSpacing: 1,
              textTransform: "uppercase",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLButtonElement).style.borderColor = GOLD;
              (e.target as HTMLButtonElement).style.color = GOLD;
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLButtonElement).style.borderColor = "#E8DED2";
              (e.target as HTMLButtonElement).style.color = "#2E2A26";
            }}
          >
            <ArrowRight size={16} />
            Continue Shopping
          </button>
        </div>

        {/* Support Info */}
        <div
          style={{
            textAlign: "center",
            marginTop: 32,
            padding: "20px",
            borderTop: "1px solid #E8DED2",
          }}
        >
          <p style={{ margin: 0, fontSize: 12, color: "#918980" }}>
            Need help? Contact our support team at{" "}
            <a
              href="mailto:support@luvanaparis.com"
              style={{ color: GOLD_DARK, textDecoration: "none" }}
            >
              support@luvanaparis.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
