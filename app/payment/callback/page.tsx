"use client";

import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";

const GOLD = "#8B5E3C";

/**
 * Payment Callback Page
 * Handles the redirect from Tap after payment.
 * Verifies the charge status, creates the order, then routes to success/failed.
 */
function PaymentCallbackPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const processCallback = async () => {
      try {
        const pendingRaw = sessionStorage.getItem("pendingOrder");
        const pending = pendingRaw ? JSON.parse(pendingRaw) : null;
        const provider = pending?.provider || "tap";

        if (provider === "myfatoorah") {
          // ── MyFatoorah path ───────────────────────────────────────────────
          // MYF appends ?paymentId=<txn_id> to the callback URL on success.
          // Failures go to ErrorUrl (/payment/failed) so this page = success only.
          const myfPaymentId = searchParams.get("paymentId");
          if (!myfPaymentId) {
            router.replace("/payment/failed?reason=Missing+MyFatoorah+payment+ID");
            return;
          }

          // Poll MYF until the invoice status settles — MYF sometimes redirects to
          // CallBackUrl before the status transitions from Pending → Paid.
          // Max 15 seconds, 2-second intervals, matching the Tap polling approach.
          const { verifyMyFatoorahPayment } = await import("@/app/actions/myfatoorahPayment");
          const myfDeadline = Date.now() + 15000;
          let myfResult: any = null;
          while (Date.now() < myfDeadline) {
            try {
              myfResult = await verifyMyFatoorahPayment(myfPaymentId);
            } catch (e) {
              console.error("[MYF Callback] verifyMyFatoorahPayment error", e);
            }
            const s = myfResult?.invoiceStatus;
            if (s === "Paid" || s === "DuplicatePayment") break;
            // Terminal failures — stop immediately
            if (s === "Failed" || s === "Cancelled" || s === "Expired") break;
            // Pending / InProgress — wait and retry
            if (Date.now() + 2000 < myfDeadline) {
              await new Promise<void>((r) => setTimeout(r, 2000));
            } else {
              break;
            }
          }

          const myfStatus = myfResult?.invoiceStatus;
          const myfSucceeded = myfStatus === "Paid" || myfStatus === "DuplicatePayment";
          console.log(`[MYF Callback] final status after polling: ${myfStatus}`);

          if (!myfSucceeded) {
            console.error("[MYF Callback] Payment not confirmed, status:", myfStatus);
            router.replace("/payment/failed");
            return;
          }

          if (pending) {
            try {
              const api = (await import("@/lib/axios")).default;

              const alreadyProcessed = sessionStorage.getItem(`order_${pending.paymentReference}`);
              if (alreadyProcessed) {
                router.replace("/payment/success");
                return;
              }

              let addressId: string | null = null;
              try {
                const addressRes = await api.post("/user/address", {
                  ...pending.deliveryInfo,
                  type: "home",
                  isDefault: false,
                });
                addressId = addressRes.data.address._id;
              } catch (addrErr: any) {
                console.error(`[MYF Callback] ❌ Address creation failed — ${addrErr?.response?.data?.message || addrErr.message}`);
                throw new Error("Failed to create shipping address: " + (addrErr?.response?.data?.message || addrErr.message));
              }

              const orderRes = await api.post("/user/order", {
                items: pending.cartItems,
                shippingAddress: addressId,
                paymentReference: pending.paymentReference,  // checkoutRef UUID
                myfPaymentId,                                // transaction ID for verification
                paymentProvider: "myfatoorah",
                ...(pending.couponId ? { coupon: pending.couponId } : {}),
                shippingCharges: pending.shippingCharges ?? 0,
              });

              // 202 = payment confirmed but items unavailable → route to processing page
              if (orderRes.status === 202 || orderRes.data?.status === "pending_review") {
                router.replace(
                  `/payment/processing?paymentRef=${encodeURIComponent(pending.paymentReference)}&paymentId=${encodeURIComponent(myfPaymentId)}`
                );
                return;
              }

              // Persist the DB order ID for the success page to display
              const createdOrderId: string | undefined = orderRes.data?.order?.orderId;
              if (createdOrderId) {
                try { sessionStorage.setItem("lastOrderId", createdOrderId); } catch (_) {}
              }

              try { sessionStorage.setItem(`order_${pending.paymentReference}`, "1"); } catch (_) {}

              // Tell CartSidebar the cart changed so it refetches on next open
              if (typeof window !== "undefined") {
                window.dispatchEvent(new CustomEvent("cart-refresh"));
              }
            } catch (orderErr: any) {
              // Payment confirmed by MYF but order creation returned an error.
              // Route to the processing page — it polls for PendingPayment and lets
              // the customer trigger retryRecovery rather than silently landing on success.
              const status = orderErr?.response?.status ?? "no status";
              const msg = orderErr?.response?.data?.message || orderErr.message;
              console.error(`[MYF Callback] ❌ Order creation failed — ${status} — ${msg}`);
              router.replace(
                `/payment/processing?paymentRef=${encodeURIComponent(pending.paymentReference)}&paymentId=${encodeURIComponent(myfPaymentId)}`
              );
              return;
            }
          }

          const createdOrderId = (() => {
            try { return sessionStorage.getItem("lastOrderId") || ""; } catch { return ""; }
          })();

          try {
            sessionStorage.setItem("pendingOrder", JSON.stringify({
              ...pending,
              paymentStatus: "paid",
              myfPaymentId,
            }));
          } catch (_) {}

          // Include orderId in the URL so the success page can recover without sessionStorage
          const successUrl = createdOrderId
            ? `/payment/success?orderId=${encodeURIComponent(createdOrderId)}`
            : "/payment/success";
          router.replace(successUrl);
          return;
        }

        // ── Tap path (original) ───────────────────────────────────────────
        const chargeId =
          searchParams.get("tap_id") || searchParams.get("paymentId") || searchParams.get("chargeId");

        if (!chargeId) {
          router.replace("/payment/failed?reason=Missing+charge+ID");
          return;
        }

        // Poll Tap for up to 20 seconds
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
          if (s === "CAPTURED" || s === "AUTHORIZED" || s === "FAILED" || s === "DECLINED") break;
          await new Promise((r) => setTimeout(r, 1500));
        }

        const finalStatus = verificationResult?.charge?.status;

        if (finalStatus === "CAPTURED" || finalStatus === "AUTHORIZED") {
          if (pending) {
            try {
              const api = (await import("@/lib/axios")).default;

              const alreadyProcessed = sessionStorage.getItem(`order_${chargeId}`);
              if (alreadyProcessed) {
                router.replace("/payment/success");
                return;
              }

              let addressId = null;
              try {
                const addressRes = await api.post("/user/address", {
                  ...pending.deliveryInfo,
                  type: "home",
                  isDefault: false,
                });
                addressId = addressRes.data.address._id;
              } catch (addrErr: any) {
                console.error("[PaymentCallback] Address creation failed", addrErr?.response?.data || addrErr.message);
                throw new Error("Failed to create shipping address: " + (addrErr?.response?.data?.message || addrErr.message));
              }

              const orderResponse = await api.post("/user/order", {
                items: pending.cartItems,
                shippingAddress: addressId,
                paymentReference: chargeId,
                ...(pending.couponId ? { coupon: pending.couponId } : {}),
                shippingCharges: pending.shippingCharges ?? 0,
                paymentDetails: verificationResult?.charge || {},
              });
              console.log("[PaymentCallback] Order created", orderResponse.data);
              try { sessionStorage.setItem(`order_${chargeId}`, "1"); } catch (_) {}
            } catch (orderErr: any) {
              // Log but do NOT redirect to failed — payment was successful
              console.error("[PaymentCallback] Order creation failed", {
                status: orderErr?.response?.status,
                data: orderErr?.response?.data,
              });
            }
          }

          try {
            sessionStorage.setItem("pendingOrder", JSON.stringify({
              ...pending,
              paymentReference: chargeId,
              paymentStatus:
                finalStatus === "CAPTURED" ? "paid" :
                finalStatus === "AUTHORIZED" ? "authorized" :
                "failed",
            }));
          } catch (_) {}

          router.replace("/payment/success");
        } else {
          router.replace("/payment/failed");
        }
      } catch (error) {
        console.error("[PaymentCallback] Unexpected error", error);
        router.replace("/payment/failed");
      }
    };

    processCallback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        <p style={{ color: "#6D665F", fontSize: 14 }}>Processing your payment…</p>
        <p style={{ color: "#918980", fontSize: 12, marginTop: 8 }}>
          Please wait while we confirm your payment.
        </p>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

// This page reads the URL's search params, which on a statically generated page must
// sit inside a Suspense boundary (the build fails otherwise). The fallback holds the
// page's height so the footer does not jump while the content hydrates.
export default function PaymentCallbackPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-cream" />}>
      <PaymentCallbackPageContent />
    </Suspense>
  );
}
