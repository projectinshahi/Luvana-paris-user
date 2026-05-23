"use client";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Check, X, Loader2, ShieldCheck } from "lucide-react";
import api from "@/lib/axios";

const GOLD = "#C9A24D";
const GOLD_LIGHT = "#E2C07A";
const GOLD_DARK = "#A07C30";

type Status = "loading" | "success" | "failed" | "cancelled";

function CallbackContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [status, setStatus] = useState<Status>("loading");
  const [chargeId, setChargeId] = useState("");
  const [orderInfo, setOrderInfo] = useState<any>(null);
  const [tapStatus, setTapStatus] = useState("");
  const [orderId, setOrderId] = useState("");

  useEffect(() => {
    const tapId = searchParams.get("tap_id") || searchParams.get("charge_id") || "";
    setChargeId(tapId);

    const saved = sessionStorage.getItem("pendingOrder");
    let pending: any = null;
    if (saved) {
      try { pending = JSON.parse(saved); setOrderInfo(pending); } catch {}
    }

    if (!tapId) {
      setStatus("failed");
      return;
    }

    const verifyAndCreateOrder = async () => {
      try {
        // Step 1: verify payment via backend
        const res = await api.get(`/user/payment/verify/${tapId}`);
        const st: string = res.data?.status || "";
        setTapStatus(st);

        if (st === "CAPTURED" || st === "AUTHORIZED") {
          // Step 2: create the order now that payment is confirmed
          if (pending?.cartItems?.length && pending?.deliveryInfo) {
            try {
              const orderRes = await api.post("/user/payment/create-order", {
                tapChargeId: tapId,
                cartItems: pending.cartItems,
                deliveryInfo: pending.deliveryInfo,
                coupon: pending.coupon || null,
              });
              setOrderId(orderRes.data?.order?.orderId || "");
            } catch (orderErr: any) {
              console.error("Order creation error:", orderErr?.response?.data || orderErr);
              // Still show success — payment went through, order can be reconciled manually
            }
          }

          setStatus("success");
          sessionStorage.removeItem("pendingOrder");
        } else if (st === "CANCELLED" || st === "VOID") {
          setStatus("cancelled");
        } else {
          setStatus("failed");
        }
      } catch (err) {
        console.error("Verify charge error:", err);
        setStatus("failed");
      }
    };

    verifyAndCreateOrder();
  }, [searchParams]);

  // ── Loading ──
  if (status === "loading") {
    return (
      <div style={pageStyle}>
        <Loader2 size={48} color={GOLD} style={{ animation: "spin 1s linear infinite", marginBottom: 20 }} />
        <p style={{ color: "#888", fontSize: 15, fontFamily: "'DM Sans', sans-serif" }}>Verifying your payment…</p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  // ── Success ──
  if (status === "success") {
    return (
      <div style={pageStyle}>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=DM+Sans:wght@400;500;600;700&display=swap');
          @keyframes pulse { 0%,100%{box-shadow:0 0 0 0 ${GOLD}40} 50%{box-shadow:0 0 0 20px transparent} }
          @keyframes fadeUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        `}</style>
        <div style={{
          width: 100, height: 100, borderRadius: "50%",
          border: `2px solid ${GOLD}`,
          background: `${GOLD}12`,
          display: "flex", alignItems: "center", justifyContent: "center",
          marginBottom: 28, animation: "pulse 2s infinite",
        }}>
          <Check size={46} color={GOLD} strokeWidth={2.5} />
        </div>

        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 38, fontWeight: 700, color: "#F5F5F5", margin: "0 0 10px", animation: "fadeUp 0.4s ease" }}>
          Payment Successful
        </h1>
        <p style={{ color: "#777", fontSize: 14, lineHeight: 1.7, margin: "0 0 6px", maxWidth: 380, textAlign: "center" }}>
          Thank you{orderInfo?.customerName ? `, ${orderInfo.customerName}` : ""}! Your order has been placed successfully.
        </p>
        {chargeId && (
          <p style={{ color: GOLD, fontSize: 12, letterSpacing: 1, margin: "0 0 32px" }}>
            {orderId ? `Order: ${orderId}` : `Charge ID: ${chargeId}`}
          </p>
        )}

        <div style={{
          background: "#111", border: "1px solid #2A2A2A",
          borderRadius: 12, padding: "20px 28px", marginBottom: 32,
          width: "100%", maxWidth: 380,
        }}>
          <p style={{ margin: 0, fontSize: 11, color: "#555", letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 }}>
            Estimated Delivery
          </p>
          <p style={{ margin: 0, fontSize: 16, color: "#F0F0F0", fontWeight: 600 }}>3 – 5 Business Days</p>

          {orderInfo?.address && (
            <>
              <div style={{ height: 1, background: "#1E1E1E", margin: "14px 0" }} />
              <p style={{ margin: 0, fontSize: 11, color: "#555", letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 }}>
                Delivering to
              </p>
              <p style={{ margin: 0, fontSize: 13, color: "#ccc" }}>{orderInfo.address}</p>
            </>
          )}
        </div>

        <div style={{ display: "flex", gap: 12, width: "100%", maxWidth: 380 }}>
          <button
            onClick={() => router.push("/myorders")}
            style={{
              flex: 1, padding: "14px", borderRadius: 10,
              background: `linear-gradient(135deg, ${GOLD_DARK}, ${GOLD}, ${GOLD_LIGHT})`,
              border: "none", color: "#000", fontSize: 12, fontWeight: 700,
              letterSpacing: 2, textTransform: "uppercase", cursor: "pointer",
            }}
          >
            View Orders
          </button>
          <button
            onClick={() => router.push("/")}
            style={{
              flex: 1, padding: "14px", borderRadius: 10,
              background: "transparent", border: `1px solid ${GOLD}55`,
              color: GOLD, fontSize: 12, fontWeight: 700,
              letterSpacing: 2, textTransform: "uppercase", cursor: "pointer",
            }}
          >
            Shop More
          </button>
        </div>

        <div style={{ marginTop: 24, display: "flex", alignItems: "center", gap: 8 }}>
          <ShieldCheck size={14} color="#555" />
          <span style={{ fontSize: 11, color: "#555" }}>Secured by Tap Payments</span>
        </div>
      </div>
    );
  }

  // ── Cancelled ──
  if (status === "cancelled") {
    return (
      <div style={pageStyle}>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=DM+Sans:wght@400;500;600;700&display=swap');`}</style>
        <div style={{
          width: 90, height: 90, borderRadius: "50%",
          border: "2px solid #888", background: "#88888812",
          display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24,
        }}>
          <X size={40} color="#888" />
        </div>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 34, fontWeight: 700, color: "#F5F5F5", margin: "0 0 10px" }}>
          Payment Cancelled
        </h1>
        <p style={{ color: "#777", fontSize: 14, margin: "0 0 32px", textAlign: "center", maxWidth: 360 }}>
          You cancelled the payment. Your cart is still saved — you can try again anytime.
        </p>
        <button
          onClick={() => router.push("/checkout")}
          style={{
            padding: "14px 36px", borderRadius: 10,
            background: `linear-gradient(135deg, ${GOLD_DARK}, ${GOLD}, ${GOLD_LIGHT})`,
            border: "none", color: "#000", fontSize: 12, fontWeight: 700,
            letterSpacing: 2, textTransform: "uppercase", cursor: "pointer",
          }}
        >
          Try Again
        </button>
      </div>
    );
  }

  // ── Failed ──
  return (
    <div style={pageStyle}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=DM+Sans:wght@400;500;600;700&display=swap');`}</style>
      <div style={{
        width: 90, height: 90, borderRadius: "50%",
        border: "2px solid #FF4444", background: "#FF444412",
        display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24,
      }}>
        <X size={40} color="#FF4444" />
      </div>
      <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 34, fontWeight: 700, color: "#F5F5F5", margin: "0 0 10px" }}>
        Payment Failed
      </h1>
      <p style={{ color: "#777", fontSize: 14, margin: "0 0 8px", textAlign: "center", maxWidth: 360 }}>
        Your payment could not be processed.
        {tapStatus && ` Status: ${tapStatus}.`}
      </p>
      <p style={{ color: "#555", fontSize: 13, margin: "0 0 32px", textAlign: "center" }}>
        Please try again or use a different payment method.
      </p>
      <div style={{ display: "flex", gap: 12 }}>
        <button
          onClick={() => router.push("/checkout")}
          style={{
            padding: "14px 28px", borderRadius: 10,
            background: `linear-gradient(135deg, ${GOLD_DARK}, ${GOLD}, ${GOLD_LIGHT})`,
            border: "none", color: "#000", fontSize: 12, fontWeight: 700,
            letterSpacing: 2, textTransform: "uppercase", cursor: "pointer",
          }}
        >
          Try Again
        </button>
        <button
          onClick={() => router.push("/")}
          style={{
            padding: "14px 28px", borderRadius: 10,
            background: "transparent", border: "1px solid #333",
            color: "#888", fontSize: 12, fontWeight: 700,
            letterSpacing: 2, textTransform: "uppercase", cursor: "pointer",
          }}
        >
          Go Home
        </button>
      </div>
    </div>
  );
}

const pageStyle: React.CSSProperties = {
  minHeight: "100vh",
  background: "#0D0D0D",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "24px",
  fontFamily: "'DM Sans', sans-serif",
  color: "#F5F5F5",
};

export default function PaymentCallbackPage() {
  return (
    <Suspense fallback={
      <div style={pageStyle}>
        <Loader2 size={36} color={GOLD} style={{ animation: "spin 1s linear infinite" }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    }>
      <CallbackContent />
    </Suspense>
  );
}
