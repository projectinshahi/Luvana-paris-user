"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2, CheckCircle2 } from "lucide-react";

const GOLD = "#8B5E3C";
const GOLD_DARK = "#714B2F";
const POLL_INTERVAL_MS = 5000;
const POLL_TIMEOUT_MS = 60000;

function PaymentProcessingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const paymentRef = searchParams.get("paymentRef") || "";
  const myfPaymentId = searchParams.get("paymentId") || "";

  const [timedOut, setTimedOut] = useState(false);
  const [retrying, setRetrying] = useState(false);

  useEffect(() => {
    if (!paymentRef) return;

    let stopped = false;
    const deadline = Date.now() + POLL_TIMEOUT_MS;

    const poll = async () => {
      while (!stopped && Date.now() < deadline) {
        try {
          const { default: api } = await import("@/lib/axios");
          const res = await api.get(
            `/user/order/pending/${encodeURIComponent(paymentRef)}`
          );
          const { status, resolvedOrderId } = res.data ?? {};
          if (status === "order_created" && resolvedOrderId) {
            router.replace(
              `/payment/success?orderId=${encodeURIComponent(resolvedOrderId)}`
            );
            return;
          }
        } catch {
          // 404 = no record yet, or network hiccup — keep polling
        }
        if (!stopped && Date.now() + POLL_INTERVAL_MS < deadline) {
          await new Promise<void>((r) => setTimeout(r, POLL_INTERVAL_MS));
        } else {
          break;
        }
      }
      if (!stopped) setTimedOut(true);
    };

    poll();
    return () => { stopped = true; };
  }, [paymentRef, router]);

  const handleRetry = async () => {
    if (retrying || !paymentRef) return;
    setRetrying(true);
    try {
      const { default: api } = await import("@/lib/axios");
      const res = await api.post("/user/order/retry-recovery", {
        paymentReference: paymentRef,
        myfPaymentId,
      });
      if (
        res.data?.status === "order_created" &&
        res.data?.order?.orderId
      ) {
        router.replace(
          `/payment/success?orderId=${encodeURIComponent(res.data.order.orderId)}`
        );
        return;
      }
    } catch {
      // still pending_review — stay on this page
    }
    setRetrying(false);
  };

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
          maxWidth: 520,
          width: "100%",
          background: "#FFFFFF",
          border: "1px solid #E8DED2",
          borderRadius: 14,
          padding: "40px 28px",
          textAlign: "center",
        }}
      >
        {/* Icon */}
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: "50%",
            background: `${GOLD}15`,
            border: `2px solid ${GOLD}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 20px",
          }}
        >
          {timedOut ? (
            <CheckCircle2 size={36} color={GOLD} strokeWidth={1.5} />
          ) : (
            <Loader2
              size={36}
              color={GOLD}
              style={{ animation: "spin 1s linear infinite" }}
            />
          )}
        </div>

        <h1
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 26,
            fontWeight: 700,
            margin: "0 0 10px",
            color: "#2E2A26",
          }}
        >
          Payment Confirmed
        </h1>

        {timedOut ? (
          <>
            <p style={{ color: "#6D665F", fontSize: 14, lineHeight: 1.65, margin: "0 0 20px" }}>
              Your payment was received successfully. We&apos;re still processing your
              order — this can happen when an item availability changed. Our team will
              review it and confirm your order within{" "}
              <strong>24 hours</strong>.
            </p>

            {paymentRef && (
              <div
                style={{
                  background: "#FAF6EF",
                  border: `1px solid ${GOLD}33`,
                  borderRadius: 10,
                  padding: "12px 16px",
                  marginBottom: 20,
                  fontSize: 13,
                  textAlign: "left",
                }}
              >
                <p style={{ margin: 0, fontSize: 11, color: "#918980", letterSpacing: 1 }}>
                  PAYMENT REFERENCE
                </p>
                <p
                  style={{
                    margin: "6px 0 0",
                    fontFamily: "'Courier New', monospace",
                    color: GOLD_DARK,
                    wordBreak: "break-all",
                  }}
                >
                  {paymentRef}
                </p>
              </div>
            )}

            <p style={{ color: "#918980", fontSize: 13, lineHeight: 1.6, margin: "0 0 20px" }}>
              Please keep your payment reference and contact us at{" "}
              <a href="mailto:support@luvanaparis.com" style={{ color: GOLD_DARK }}>
                support@luvanaparis.com
              </a>{" "}
              if you don&apos;t hear from us within 24 hours.
            </p>

            <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
              <button
                onClick={handleRetry}
                disabled={retrying}
                style={{
                  padding: "11px 22px",
                  borderRadius: 8,
                  background: `linear-gradient(135deg, ${GOLD_DARK}, ${GOLD})`,
                  border: "none",
                  color: "#fff",
                  fontWeight: 600,
                  cursor: retrying ? "not-allowed" : "pointer",
                  fontSize: 13,
                  opacity: retrying ? 0.7 : 1,
                }}
              >
                {retrying ? "Checking…" : "Check Again"}
              </button>
              <button
                onClick={() => router.push("/")}
                style={{
                  padding: "11px 22px",
                  borderRadius: 8,
                  background: "#FAF6EF",
                  border: "1px solid #E8DED2",
                  color: "#2E2A26",
                  fontWeight: 600,
                  cursor: "pointer",
                  fontSize: 13,
                }}
              >
                Back to Home
              </button>
            </div>
          </>
        ) : (
          <p style={{ color: "#6D665F", fontSize: 14, lineHeight: 1.65, margin: 0 }}>
            Your payment was received. We&apos;re confirming your order — this
            usually takes just a moment. Please don&apos;t close this page.
          </p>
        )}
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

export default function PaymentProcessingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-cream" />}>
      <PaymentProcessingContent />
    </Suspense>
  );
}
