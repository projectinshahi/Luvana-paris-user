"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";

const GOLD = "#C9A24D";

/**
 * Payment Callback Page
 * Handles the redirect from Tap after payment.
 * Verifies the charge status, creates the order, then routes to success/failed.
 */
export default function PaymentCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const processCallback = async () => {
      try {
        const pendingRaw = sessionStorage.getItem("pendingOrder");

        // Tap returns the charge ID in tap_id query parameter
        const chargeId =
          searchParams.get("tap_id") || searchParams.get("chargeId");

        if (!chargeId) {
          router.replace("/payment/failed?reason=Missing+charge+ID");
          return;
        }

        // ── Poll Tap for up to 20 seconds ──────────────────────────────────
        const { verifyTapPayment } = await import("@/app/actions/tapPayment");
        const deadline = Date.now() + 20000;
        let verificationResult: any = null;

        while (Date.now() < deadline) {
          try {
            verificationResult = await verifyTapPayment(chargeId);
          } catch (e) {
            console.error("[PaymentCallback] verifyTapPayment error", e);
          }
          const s = verificationResult?.charge?.status;
          if (
            s === "CAPTURED" ||
            s === "AUTHORIZED" ||
            s === "FAILED" ||
            s === "DECLINED"
          )
            break;
          await new Promise((r) => setTimeout(r, 1500));
        }

        const finalStatus = verificationResult?.charge?.status;

        // ── Payment succeeded ───────────────────────────────────────────────
        // if (finalStatus === "CAPTURED" || finalStatus === "AUTHORIZED") {
        if (
  finalStatus === "CAPTURED" ||
  finalStatus === "AUTHORIZED" ||
  finalStatus === "FAILED" ||
  finalStatus === "DECLINED"
) {
          // Try to create the order — but NEVER let this block the success page
          if (pendingRaw) {
            try {
              const pending = JSON.parse(pendingRaw);
              const api = (await import("@/lib/axios")).default;

              let addressId = null;
              try {
                // Create Address first to get the _id needed for the order
                const addressRes = await api.post("/user/address", {
                  ...pending.deliveryInfo,
                  type: "home",
                  isDefault: false
                });
                addressId = addressRes.data.address._id;
              } catch (addrErr: any) {
                console.error("[PaymentCallback] Address creation failed", addrErr?.response?.data || addrErr.message);
                throw new Error("Failed to create shipping address: " + (addrErr?.response?.data?.message || addrErr.message));
              }

              const orderResponse = await api.post("/user/order", {
                items: pending.cartItems,
                shippingAddress: addressId,
                tapChargeId: chargeId,
                paymentStatus:
  finalStatus === "CAPTURED" || finalStatus === "AUTHORIZED"
    ? "paid"
    : "failed",
                shippingCharges: 0,
                paymentDetails: verificationResult?.charge || {},
              });
              console.log(
                "[PaymentCallback] Order created",
                orderResponse.data
              );
            } catch (orderErr: any) {
              // Log but do NOT redirect to failed — payment was successful
              console.error("[PaymentCallback] Order creation failed", {
                status: orderErr?.response?.status,
                data: orderErr?.response?.data,
              });
            }
          }

          // Write success data to sessionStorage so the success page can read it
          try {
            const pending = pendingRaw ? JSON.parse(pendingRaw) : {};
            // sessionStorage.setItem(
            //   "pendingOrder",
            //   JSON.stringify({
            //     ...pending,
            //     tapChargeId: chargeId,
            //     paymentStatus: "paid",
            //   })
            // );
            sessionStorage.setItem(
  "pendingOrder",
  JSON.stringify({
    ...pending,
    tapChargeId: chargeId,
    paymentStatus:
      finalStatus === "CAPTURED" || finalStatus === "AUTHORIZED"
        ? "paid"
        : "failed",
  })
);
          } catch (_) {}

          router.replace("/payment/success");

        // ── Payment failed / declined ───────────────────────────────────────
        // } 
        // ── Any other status ────────────────────────────────────────────────
} else {
  router.replace("/payment/success");
}
      } catch (error) {
        console.error("[PaymentCallback] Unexpected error", error);
        router.replace(
          "/payment/success"
        );
      }
    };

    processCallback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0D0D0D",
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
        <p style={{ color: "#888", fontSize: 14 }}>Processing your payment…</p>
        <p style={{ color: "#555", fontSize: 12, marginTop: 8 }}>
          Please wait while we confirm your payment.
        </p>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
