"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  AlertCircle,
  ArrowLeft,
  RefreshCw,
  HelpCircle,
  Phone,
  Mail,
} from "lucide-react";

const GOLD = "#8B5E3C";
const GOLD_LIGHT = "#9A6A44";
const GOLD_DARK = "#714B2F";

interface FailureDetails {
  reason?: string;
  chargeId?: string;
  timestamp?: string;
}

function PaymentFailedPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [failureDetails, setFailureDetails] = useState<FailureDetails>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get failure reason from URL params
    const reason = searchParams.get("reason") || "Payment was declined";
    const chargeId = searchParams.get("chargeId");

    setFailureDetails({
      reason,
      chargeId: chargeId || undefined,
      timestamp: new Date().toLocaleString(),
    });

    setLoading(false);
  }, [searchParams]);

  const handleRetry = () => {
    // Clear any pending order data
    sessionStorage.removeItem("pendingOrder");
    // Redirect back to checkout
    router.push("/checkout");
  };

  const handleBackHome = () => {
    sessionStorage.removeItem("pendingOrder");
    router.push("/");
  };

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
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              border: `3px solid #E8DED2`,
              borderTopColor: GOLD,
              animation: "spin 1s linear infinite",
              margin: "0 auto 16px",
            }}
          />
          <p style={{ color: "#918980", fontSize: 14 }}>Loading...</p>
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
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
        * { box-sizing: border-box; }
        @keyframes slideIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .error-card { animation: slideIn 0.5s ease; }
        .pulse { animation: pulse 2s infinite; }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
      `}</style>

      <div style={{ maxWidth: 600, margin: "0 auto" }}>
        {/* Error Header */}
        <div
          className="error-card"
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
              background: "#FBEAEA",
              border: "2px solid #E9B8B8",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 20px",
            }}
          >
            <AlertCircle size={40} color="#C14B49" strokeWidth={1.5} />
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
            Payment Failed
          </h1>

          <p style={{ color: "#918980", fontSize: 14, margin: "0 0 24px" }}>
            Unfortunately, your payment could not be processed.
          </p>

          <div
            style={{
              padding: "16px",
              background: "#FAF6EF",
              borderRadius: 10,
              border: "1px solid #E9B8B8",
            }}
          >
            <p style={{ margin: 0, fontSize: 12, color: "#918980", letterSpacing: 1 }}>
              REASON
            </p>
            <p
              style={{
                margin: "6px 0 0",
                fontSize: 14,
                color: "#C14B49",
                fontWeight: 600,
              }}
            >
              {failureDetails.reason}
            </p>
          </div>
        </div>

        {/* Failure Details */}
        <div
          className="error-card"
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
            What Happened?
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              {
                icon: "💳",
                title: "Card Declined",
                desc: "Your card was declined by the bank. Please check your card details.",
              },
              {
                icon: "🔒",
                title: "Security Check",
                desc: "Your bank may have blocked the transaction for security reasons.",
              },
              {
                icon: "⏱️",
                title: "Session Expired",
                desc: "Your payment session may have expired. Please try again.",
              },
            ].map((item, i) => (
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
                <span style={{ fontSize: 20 }}>{item.icon}</span>
                <div>
                  <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: "#2E2A26" }}>
                    {item.title}
                  </p>
                  <p style={{ margin: "4px 0 0", fontSize: 12, color: "#918980" }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Troubleshooting */}
        <div
          className="error-card"
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
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <HelpCircle size={18} color={GOLD} />
            Try These Steps
          </h3>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              "Check your card details (number, expiry, CVV)",
              "Ensure you have sufficient funds",
              "Try a different payment method",
              "Contact your bank to verify the transaction",
              "Clear your browser cache and try again",
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
                <span
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: "50%",
                    background: `${GOLD}15`,
                    border: `1px solid ${GOLD}40`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 12,
                    fontWeight: 700,
                    color: GOLD_DARK,
                    flexShrink: 0,
                  }}
                >
                  {i + 1}
                </span>
                <p style={{ margin: 0, fontSize: 13, color: "#6D665F", lineHeight: 1.5 }}>
                  {step}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div
          className="error-card"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 12,
            marginBottom: 24,
          }}
        >
          <button
            onClick={handleRetry}
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
            <RefreshCw size={16} />
            Try Again
          </button>

          <button
            onClick={handleBackHome}
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
            <ArrowLeft size={16} />
            Back Home
          </button>
        </div>

        {/* Support Section */}
        <div
          className="error-card"
          style={{
            background: "#FFFFFF",
            border: "1px solid #E8DED2",
            borderRadius: 14,
            padding: "28px 24px",
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
            Still Need Help?
          </h3>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <a
              href="mailto:support@luvanaparis.com"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "12px 16px",
                background: "#FAF6EF",
                borderRadius: 8,
                border: `1px solid ${GOLD}33`,
                textDecoration: "none",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor = GOLD;
                (e.currentTarget as HTMLAnchorElement).style.background = `${GOLD}08`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor = `${GOLD}33`;
                (e.currentTarget as HTMLAnchorElement).style.background = "#0A0A0A";
              }}
            >
              <Mail size={18} color={GOLD} />
              <div>
                <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: "#2E2A26" }}>
                  Email Support
                </p>
                <p style={{ margin: "2px 0 0", fontSize: 12, color: "#918980" }}>
                  support@luvanaparis.com
                </p>
              </div>
            </a>

            <a
              href="tel:+96599999999"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "12px 16px",
                background: "#FAF6EF",
                borderRadius: 8,
                border: `1px solid ${GOLD}33`,
                textDecoration: "none",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor = GOLD;
                (e.currentTarget as HTMLAnchorElement).style.background = `${GOLD}08`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor = `${GOLD}33`;
                (e.currentTarget as HTMLAnchorElement).style.background = "#0A0A0A";
              }}
            >
              <Phone size={18} color={GOLD} />
              <div>
                <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: "#2E2A26" }}>
                  Call Us
                </p>
                <p style={{ margin: "2px 0 0", fontSize: 12, color: "#918980" }}>
                  +965 9999 9999
                </p>
              </div>
            </a>
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            textAlign: "center",
            marginTop: 32,
            padding: "20px",
            borderTop: "1px solid #E8DED2",
          }}
        >
          <p style={{ margin: 0, fontSize: 12, color: "#918980" }}>
            Your cart has been saved. You can continue shopping anytime.
          </p>
        </div>
      </div>
    </div>
  );
}

// This page reads the URL's search params, which on a statically generated page must
// sit inside a Suspense boundary (the build fails otherwise). The fallback holds the
// page's height so the footer does not jump while the content hydrates.
export default function PaymentFailedPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-cream" />}>
      <PaymentFailedPageContent />
    </Suspense>
  );
}
