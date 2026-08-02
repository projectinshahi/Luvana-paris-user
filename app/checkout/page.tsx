"use client";
import { useState, useEffect } from "react";
import {
  ShieldCheck, Lock, ChevronRight, CreditCard,
  Tag, ChevronDown, ChevronUp, Check, ArrowLeft,
  Sparkles, Loader2,
} from "lucide-react";
import { useCurrency } from "@/contexts/CurrencyContext";
import api from "@/lib/axios";
import { useRouter } from "next/navigation";

const GOLD = "#8B5E3C";
const GOLD_LIGHT = "#A0724C";
const GOLD_DARK = "#714B2F";

// Tap calls go through our backend to avoid CORS

// ── Types ────────────────────────────────────────────────────────────────────
interface CartItem {
  _id: string;
  product?: { _id: string; nameEnglish: string; nameArabic?: string };
  variant: {
    _id: string;
    nameEnglish: string;
    nameArabic?: string;
    price: number;
    mrp: number;
    imageUrlEnglish?: { imageUrl: string }[];
    imageUrlArabic?: { imageUrl: string }[];
  };
  quantity: number;
  itemPrice: number;
}

interface CartSummary {
  itemCount: number;
  subtotal: number;
  discount: number;
  couponDiscount: number;
  tax: number;
  total: number;
}

interface InputFieldProps {
  label: string;
  id: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  icon?: React.ReactNode;
  maxLength?: number;
}

// ── Helpers ──────────────────────────────────────────────────────────────────
function GoldDivider() {
  return (
    <div className="flex items-center gap-3 my-6">
      <div style={{ flex: 1, height: 1, background: `linear-gradient(to right, transparent, ${GOLD}55)` }} />
      <span style={{ color: GOLD, fontSize: 10, letterSpacing: 3 }}>✦</span>
      <div style={{ flex: 1, height: 1, background: `linear-gradient(to left, transparent, ${GOLD}55)` }} />
    </div>
  );
}

function InputField({ label, id, placeholder, value, onChange, type = "text", icon, maxLength }: InputFieldProps) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ position: "relative" }}>
      <label htmlFor={id} style={{
        display: "block", fontSize: 11, fontWeight: 600,
        letterSpacing: 2, textTransform: "uppercase",
        color: focused ? GOLD : "#918980", marginBottom: 8,
        transition: "color 0.2s", fontFamily: "'Cormorant Garamond', serif",
      }}>
        {label}
      </label>
      <div style={{ position: "relative" }}>
        {icon && (
          <div style={{
            position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)",
            color: focused ? GOLD : "#918980", transition: "color 0.2s", pointerEvents: "none",
          }}>
            {icon}
          </div>
        )}
        <input
          id={id} type={type} placeholder={placeholder} value={value}
          onChange={onChange} maxLength={maxLength}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          style={{
            width: "100%",
            background: focused ? "#FFFFFF" : "#FAF6EF",
            border: `1px solid ${focused ? GOLD : "#E8DED2"}`,
            borderRadius: 8,
            padding: icon ? "13px 14px 13px 42px" : "13px 14px",
            color: "#2E2A26", fontSize: 14, outline: "none",
            transition: "all 0.25s", boxSizing: "border-box",
            fontFamily: "'DM Sans', sans-serif",
            boxShadow: focused ? `0 0 0 3px ${GOLD}18` : "none",
          }}
        />
      </div>
    </div>
  );
}

function OrderItemRow({ name, qty, price, img, formatPrice }: {
  name: string; qty: number; price: number; img: string | null;
  formatPrice: (n: number) => string;
}) {
  return (
    <div style={{ display: "flex", gap: 14, alignItems: "center", padding: "14px 0", borderBottom: "1px solid #E8DED2" }}>
      <div style={{ position: "relative", flexShrink: 0 }}>
        <div style={{
          width: 58, height: 58, borderRadius: 10,
          background: "linear-gradient(135deg, #F6F1E8 0%, #FAF6EF 100%)",
          border: "1px solid #E8DED2", overflow: "hidden",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          {img ? <img src={img} alt={name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            : <Sparkles size={20} color={GOLD} />}
        </div>
        <div style={{
          position: "absolute", top: -6, right: -6,
          width: 18, height: 18, borderRadius: "50%",
          background: GOLD, color: "#FFFDF9", fontSize: 10, fontWeight: 700,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>{qty}</div>
      </div>
      <div style={{ flex: 1 }}>
        <p style={{ margin: 0, fontWeight: 600, color: "#2E2A26", fontFamily: "'Cormorant Garamond', serif", fontSize: 15 }}>{name}</p>
        <p style={{ margin: "3px 0 0", fontSize: 11, color: "#918980" }}>Qty: {qty}</p>
      </div>
      <p style={{ margin: 0, fontWeight: 700, color: GOLD, fontSize: 14 }}>{formatPrice(price)}</p>
    </div>
  );
}

// ── Main Checkout Page ────────────────────────────────────────────────────────
export default function CheckoutPage() {
  const { formatPrice } = useCurrency();
  const router = useRouter();

  // ── steps ──
  const [step, setStep] = useState(1); // 1=Info, 2=Review & Pay

  // ── cart data from backend ──
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [summary, setSummary] = useState<CartSummary>({
    itemCount: 0, subtotal: 0, discount: 0,
    couponDiscount: 0, tax: 0, total: 0,
  });
  const [cartLoading, setCartLoading] = useState(true);

  // ── contact / delivery form ──
  const [info, setInfo] = useState({
    name: "", email: "", phone: "",
    address: "", city: "", state: "", pin: "",
  });

  // ── coupon ──
  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);

  // ── mobile summary toggle ──
  const [summaryOpen, setSummaryOpen] = useState(false);

  // ── payment loading / error ──
  const [paying, setPaying] = useState(false);
  const [payError, setPayError] = useState("");

  // ── fetch cart on mount ──
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await api.get("/user/cart");
        setCartItems(res.data.items || []);
        setSummary(res.data.summary || {});
      } catch (err) {
        console.error("Cart fetch error:", err);
      } finally {
        setCartLoading(false);
      }
    };
    fetchCart();
  }, []);

  const discount = couponApplied ? Math.round(summary.subtotal * 0.1) : 0;
  const total = summary.subtotal ;

  const canProceed1 =
    info.name.trim() &&
    info.email.trim() &&
    info.phone.trim() &&
    info.address.trim() &&
    info.city.trim() &&
    info.pin.trim();

  // ── CREATE TAP CHARGE via backend (avoids CORS) ──────────────────────────
  const handlePlaceOrder = async () => {
    if (paying) return;
    setPaying(true);
    setPayError("");

    try {
      const origin =
        typeof window !== "undefined" ? window.location.origin : "http://luvanaparis.com";

      const redirectUrl = `${origin}/payment/callback`;
      const cleanPhone = info.phone.replace(/\D/g, "");

      if (!cleanPhone) {
        setPayError("Please enter a valid phone number");
        setPaying(false);
        return;
      }

      // Call Tap Payments via Next.js Server Action to avoid CORS
      const { initiateTapPayment } = await import("@/app/actions/tapPayment");
      const tapResponse = await initiateTapPayment({
        amount: total > 0 ? parseFloat(total.toFixed(3)) : 1,
        currency: "KWD",
        customer: {
          first_name: info.name,
          email: info.email,
          phone: {
            country_code: "965",
            // number: info.phone
            number: info.phone.replace(/\D/g, "")
          }
        },
        source: { id: "src_all" },
        redirect: { url: redirectUrl },
        description: `Luvana Paris Order — ${info.name}`,
      });

      if (!tapResponse.success) {
        throw new Error(tapResponse.error);
      }

      const chargeId = tapResponse.chargeId;
      const transactionUrl = tapResponse.transactionUrl;

      // Save pending order info for the callback page — include full cart data
      sessionStorage.setItem(
        "pendingOrder",
        JSON.stringify({
          tapChargeId: chargeId,
          customerName: info.name,
          customerEmail: info.email,
          address: `${info.address}, ${info.city} - ${info.pin}`,
          total,
          // Full cart items with variant IDs needed to create the order after payment
          cartItems: cartItems.map((i) => ({
            variant: i.variant._id,
            quantity: i.quantity,
          })),
          // Delivery info to create address on the fly
          deliveryInfo: {
            name: info.name,
            phone: info.phone,
            email: info.email,
            addressLine1: info.address,
            city: info.city,
            state: info.state,
            postalCode: info.pin,
            country: "Kuwait",
          },
        })
      );

      if (transactionUrl) {
        window.location.href = transactionUrl;
      } else {
        setPayError("Could not get payment URL from Tap. Please try again.");
        setPaying(false);
      }
    } catch (err: any) {
      console.error("Payment error:", err);
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.tapError?.errors?.[0]?.description ||
        "Payment initiation failed. Please try again.";
      setPayError(msg);
      setPaying(false);
    }
  };

  const steps = [
    { n: 1, label: "Information" },
    { n: 2, label: "Review & Pay" },
  ];

  if (cartLoading) {
    return (
      <div style={{
        minHeight: "100vh", background: "#FFFDF9",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <div style={{ textAlign: "center" }}>
          <Loader2 size={36} color={GOLD} style={{ animation: "spin 1s linear infinite", marginBottom: 12 }} />
          <p style={{ color: "#6D665F", fontSize: 13, fontFamily: "'DM Sans', sans-serif" }}>Loading your cart…</p>
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div style={{
        minHeight: "100vh", background: "#FFFDF9",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: "'DM Sans', sans-serif",
      }}>
        <div style={{ textAlign: "center" }}>
          <p style={{ color: "#6D665F", fontSize: 16, marginBottom: 20 }}>Your cart is empty.</p>
          <button
            onClick={() => router.push("/")}
            style={{
              padding: "12px 28px", borderRadius: 8,
              background: `linear-gradient(135deg, ${GOLD_DARK}, ${GOLD}, ${GOLD_LIGHT})`,
              border: "none", color: "#FFFDF9", fontWeight: 700, cursor: "pointer",
            }}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: "100vh", background: "#FFFDF9",
      color: "#2E2A26", fontFamily: "'DM Sans', sans-serif",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=DM+Sans:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; }
        input::placeholder { color: #918980; }
        input:-webkit-autofill { -webkit-box-shadow: 0 0 0 100px #FFFFFF inset !important; -webkit-text-fill-color: #2E2A26 !important; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #F6F1E8; }
        ::-webkit-scrollbar-thumb { background: #E8DED2; border-radius: 2px; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        .step-content { animation: fadeIn 0.3s ease; }
        .gold-btn:hover:not(:disabled) { filter: brightness(1.1); transform: translateY(-1px); box-shadow: 0 8px 30px ${GOLD}44 !important; }
        .gold-btn { transition: all 0.2s !important; }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>

      {/* ── Step Indicator ── */}
      <div style={{ padding: "100px 24px 0", maxWidth: 960, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          {steps.map((s, i) => (
            <div key={s.n} style={{ display: "flex", alignItems: "center" }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                <div style={{
                  width: 34, height: 34, borderRadius: "50%",
                  background: step > s.n ? GOLD : "transparent",
                  border: `2px solid ${step >= s.n ? GOLD : "#E8DED2"}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  transition: "all 0.3s",
                }}>
                  {step > s.n
                    ? <Check size={14} color="#FFFDF9" strokeWidth={3} />
                    : <span style={{ fontSize: 12, fontWeight: 700, color: step === s.n ? GOLD : "#918980" }}>{s.n}</span>
                  }
                </div>
                <span style={{ fontSize: 10, letterSpacing: 1.5, textTransform: "uppercase", color: step >= s.n ? GOLD : "#918980", fontWeight: 600 }}>
                  {s.label}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div style={{
                  width: 60, height: 1, margin: "0 8px", marginBottom: 20,
                  background: step > s.n ? GOLD : "#E8DED2", transition: "background 0.3s",
                }} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── Main Layout ── */}
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "28px 16px 60px" }}>

        {/* Mobile summary toggle */}
        <div
          onClick={() => setSummaryOpen(!summaryOpen)}
          style={{
            background: "#FFFFFF", border: "1px solid #E8DED2", borderRadius: 10,
            padding: "14px 18px", cursor: "pointer", marginBottom: 20,
            display: "flex", alignItems: "center", justifyContent: "space-between",
          }}
          className="lg-hide"
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <ShieldCheck size={16} color={GOLD} />
            <span style={{ fontSize: 13, color: "#6D665F" }}>{summaryOpen ? "Hide" : "Show"} order summary</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <span style={{ fontWeight: 700, color: GOLD, fontSize: 16 }}>{formatPrice(total)}</span>
            {summaryOpen ? <ChevronUp size={16} color="#918980" /> : <ChevronDown size={16} color="#918980" />}
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 24 }} id="main-grid">
          <style>{`
            @media (min-width: 768px) {
              #main-grid { grid-template-columns: 1fr 380px !important; }
              .lg-hide { display: none !important; }
              #order-sidebar { display: block !important; }
            }
            @media (min-width: 480px) { .two-col { grid-template-columns: 1fr 1fr !important; } }
          `}</style>

          {/* ── LEFT: Form ── */}
          <div>

            {/* STEP 1 — Contact & Delivery */}
            {step === 1 && (
              <div className="step-content">
                <div style={{ background: "#FFFFFF", border: "1px solid #E8DED2", borderRadius: 14, padding: "28px 24px" }}>
                  <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 24, fontWeight: 700, margin: "0 0 4px" }}>
                    Contact & Delivery
                  </h2>
                  <p style={{ margin: "0 0 24px", fontSize: 13, color: "#6D665F" }}>We'll use these details for your order</p>

                  <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                    <InputField label="Full Name" id="name" placeholder="Aisha Al-Rashid"
                      value={info.name} onChange={e => setInfo({ ...info, name: e.target.value })} />

                    <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 18 }} className="two-col">
                      <InputField label="Email Address" id="email" placeholder="aisha@example.com" type="email"
                        value={info.email} onChange={e => setInfo({ ...info, email: e.target.value })} />
                      <InputField label="Phone" id="phone" placeholder="+965 9999 9999" type="tel"
                        value={info.phone} onChange={e => setInfo({ ...info, phone: e.target.value })} />
                    </div>

                    <GoldDivider />

                    <InputField label="Street Address" id="address" placeholder="Block 5, Street 12, House 3"
                      value={info.address} onChange={e => setInfo({ ...info, address: e.target.value })} />

                    <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 18 }} className="two-col">
                      <InputField label="City" id="city" placeholder="Kuwait City"
                        value={info.city} onChange={e => setInfo({ ...info, city: e.target.value })} />
                      <InputField label="State / Region" id="state" placeholder="Hawalli"
                        value={info.state} onChange={e => setInfo({ ...info, state: e.target.value })} />
                    </div>

                    <InputField label="Postal Code" id="pin" placeholder="12345" maxLength={10}
                      value={info.pin} onChange={e => setInfo({ ...info, pin: e.target.value })} />
                  </div>

                  <div style={{
                    marginTop: 22, padding: "12px 16px", borderRadius: 8,
                    background: `${GOLD}0D`, border: `1px solid ${GOLD}33`,
                    display: "flex", alignItems: "center", gap: 10,
                  }}>
                    <ShieldCheck size={16} color={GOLD} />
                    <span style={{ fontSize: 12, color: "#714B2F" }}>Free standard shipping on all orders</span>
                  </div>

                  <button
                    onClick={() => canProceed1 && setStep(2)}
                    className="gold-btn"
                    style={{
                      marginTop: 24, width: "100%", padding: "15px", borderRadius: 10,
                      background: canProceed1 ? `linear-gradient(135deg, ${GOLD_DARK}, ${GOLD}, ${GOLD_LIGHT})` : "#F6F1E8",
                      border: canProceed1 ? "none" : `1px solid #E8DED2`,
                      color: canProceed1 ? "#FFFDF9" : "#918980",
                      fontSize: 12, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase",
                      cursor: canProceed1 ? "pointer" : "not-allowed",
                      display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                    }}
                  >
                    Continue to Review
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2 — Review & Pay via Tap */}
            {step === 2 && (
              <div className="step-content">
                <div style={{ background: "#FFFFFF", border: "1px solid #E8DED2", borderRadius: 14, padding: "28px 24px" }}>
                  <button onClick={() => setStep(1)} style={{ background: "none", border: "none", color: "#6D665F", cursor: "pointer", display: "flex", alignItems: "center", gap: 6, fontSize: 12, marginBottom: 20, padding: 0 }}>
                    <ArrowLeft size={14} /> Back
                  </button>
                  <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 24, fontWeight: 700, margin: "0 0 24px" }}>
                    Review & Place Order
                  </h2>

                  {/* Delivery summary */}
                  <div style={{ background: "#FAF6EF", borderRadius: 10, padding: "16px 18px", border: "1px solid #E8DED2", marginBottom: 16 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                      <span style={{ fontSize: 11, color: "#918980", letterSpacing: 1.5, textTransform: "uppercase" }}>Deliver to</span>
                      <button onClick={() => setStep(1)} style={{ background: "none", border: "none", color: GOLD, fontSize: 12, cursor: "pointer", padding: 0 }}>Edit</button>
                    </div>
                    <p style={{ margin: 0, fontSize: 14, color: "#6D665F", lineHeight: 1.6 }}>
                      <strong style={{ color: "#2E2A26" }}>{info.name}</strong><br />
                      {info.address}{info.city && `, ${info.city}`}{info.pin && ` — ${info.pin}`}
                    </p>
                    <p style={{ margin: "6px 0 0", fontSize: 13, color: "#918980" }}>{info.email} · {info.phone}</p>
                  </div>

                  {/* Tap payment info */}
                  <div style={{
                    background: "#FAF6EF", borderRadius: 10, padding: "16px 18px",
                    border: `1px solid ${GOLD}33`, marginBottom: 24,
                    display: "flex", alignItems: "center", gap: 14,
                  }}>
                    <div style={{
                      width: 42, height: 42, borderRadius: 10,
                      background: `${GOLD}15`, border: `1px solid ${GOLD}40`,
                      display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                    }}>
                      <CreditCard size={20} color={GOLD} />
                    </div>
                    <div>
                      <p style={{ margin: 0, fontSize: 14, color: "#2E2A26", fontWeight: 600 }}>Pay via Tap Payments</p>
                      <p style={{ margin: "3px 0 0", fontSize: 12, color: "#6D665F" }}>
                        You'll be redirected to Tap's secure page to complete payment with card, KNET, or other methods.
                      </p>
                    </div>
                  </div>

                  {/* Error message */}
                  {payError && (
                    <div style={{
                      marginBottom: 16, padding: "12px 16px", borderRadius: 8,
                      background: "#FBECEA", border: "1px solid #C14B4933",
                      fontSize: 13, color: "#C14B49",
                    }}>
                      {payError}
                    </div>
                  )}

                  {/* Place Order button */}
                  <button
                    className="gold-btn"
                    onClick={handlePlaceOrder}
                    disabled={paying}
                    style={{
                      width: "100%", padding: "17px", borderRadius: 10,
                      background: paying ? "#F6F1E8" : `linear-gradient(135deg, ${GOLD_DARK}, ${GOLD}, ${GOLD_LIGHT})`,
                      border: paying ? `1px solid #E8DED2` : "none",
                      color: paying ? "#918980" : "#FFFDF9",
                      fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase",
                      cursor: paying ? "not-allowed" : "pointer",
                      display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                      boxShadow: paying ? "none" : `0 4px 24px ${GOLD}33`,
                    }}
                  >
                    {paying ? (
                      <>
                        <Loader2 size={16} style={{ animation: "spin 1s linear infinite" }} />
                        Redirecting to Tap…
                      </>
                    ) : (
                      <>
                        <Lock size={15} />
                        Pay {formatPrice(total)} via Tap
                      </>
                    )}
                  </button>

                  <p style={{ textAlign: "center", fontSize: 11, color: "#918980", marginTop: 14 }}>
                    Secured by Tap Payments · 256-bit SSL encryption
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* ── RIGHT: Order Summary Sidebar ── */}
          <div id="order-sidebar" style={{ display: summaryOpen ? "block" : "none" }}>
            <div style={{
              background: "#FFFFFF", border: "1px solid #E8DED2",
              borderRadius: 14, padding: "24px 20px", position: "sticky", top: 80,
            }}>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 700, margin: "0 0 4px" }}>
                Order Summary
              </h3>
              <p style={{ margin: "0 0 16px", fontSize: 12, color: "#918980" }}>{summary.itemCount} item{summary.itemCount !== 1 ? "s" : ""}</p>

              {/* Items */}
              <div>
                {cartItems.map((item) => {
                  const img = item.variant?.imageUrlEnglish?.[0]?.imageUrl || item.variant?.imageUrlArabic?.[0]?.imageUrl || null;
                  const name = item.variant?.nameEnglish || item.product?.nameEnglish || "Product";
                  return (
                    <OrderItemRow
                      key={item._id}
                      name={name} qty={item.quantity}
                      price={item.itemPrice} img={img}
                      formatPrice={formatPrice}
                    />
                  );
                })}
              </div>

              {/* Coupon */}
              <div style={{ marginTop: 20 }}>
                {/* <label style={{ fontSize: 11, color: "#918980", letterSpacing: 2, textTransform: "uppercase", display: "block", marginBottom: 8, fontFamily: "'Cormorant Garamond', serif" }}>
                  Promo Code
                </label> */}
                <div style={{ display: "flex", gap: 8 }}>
                  {/* <div style={{ position: "relative", flex: 1 }}> */}
                    {/* <Tag size={14} color="#918980" style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }} /> */}
                    {/* <input
                      placeholder="LUVANA10"
                      value={coupon}
                      onChange={e => { setCoupon(e.target.value.toUpperCase()); setCouponApplied(false); }}
                      style={{
                        width: "100%", padding: "10px 10px 10px 34px",
                        background: "#FAF6EF", border: "1px solid #E8DED2",
                        borderRadius: 8, color: "#2E2A26", fontSize: 13,
                        outline: "none", fontFamily: "'DM Sans', sans-serif",
                      }}
                    /> */}
                    {/* {couponApplied && ( */}
                      {/* // <div style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)" }}>
                      //   <Check size={14} color={GOLD} />
                      // </div>
                  //   )}
                  // </div> */}
                  {/* <button
                    onClick={() => { if (coupon) setCouponApplied(true); }}
                    style={{
                      padding: "10px 16px", borderRadius: 8,
                      background: couponApplied ? `${GOLD}18` : "#F6F1E8",
                      border: `1px solid ${couponApplied ? GOLD + "66" : "#E8DED2"}`,
                      color: couponApplied ? GOLD : "#6D665F",
                      fontSize: 12, fontWeight: 600, cursor: "pointer",
                      whiteSpace: "nowrap", transition: "all 0.2s",
                    }}
                  >
                    {couponApplied ? "Applied!" : "Apply"}
                  </button> */}
                </div>
                {couponApplied && (
                  <p style={{ margin: "8px 0 0", fontSize: 12, color: "#3B7B48" }}>
                    ✓ 10% discount applied!
                  </p>
                )}
              </div>

              <GoldDivider />

              {/* Price breakdown */}
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {[
                  { label: "Subtotal", val: formatPrice(summary.subtotal) },
                  // { label: "Shipping", val: "Free", green: true },
                  // ...(summary.tax > 0 ? [{ label: "Tax", val: formatPrice(summary.tax) }] : []),
                  ...(couponApplied ? [{ label: "Promo Discount", val: `-${formatPrice(discount)}`, gold: true }] : []),
                ].map(row => (
                  <div key={row.label} style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ fontSize: 13, color: "#6D665F" }}>{row.label}</span>
                    <span style={{ fontSize: 13, color: (row as any).gold ? GOLD : (row as any).green ? "#3B7B48" : "#2E2A26", fontWeight: 600 }}>{row.val}</span>
                  </div>
                ))}
              </div>

              {/* Total */}
              <div style={{
                marginTop: 16, padding: "16px 0",
                borderTop: `1px solid ${GOLD}33`,
                display: "flex", justifyContent: "space-between", alignItems: "center",
              }}>
                <div>
                  <p style={{ margin: 0, fontSize: 11, color: "#918980", letterSpacing: 1, textTransform: "uppercase" }}>Total</p>
                  <p style={{ margin: "2px 0 0", fontSize: 11, color: "#918980" }}>Including all taxes</p>
                </div>
                <span style={{ fontSize: 24, fontWeight: 700, color: GOLD, fontFamily: "'Cormorant Garamond', serif" }}>
                  {formatPrice(total)}
                </span>
              </div>

              {/* Trust badges */}
              <div style={{ marginTop: 16, padding: "14px", borderRadius: 10, background: "#FAF6EF", border: "1px solid #E8DED2" }}>
                {[
                  { icon: <Lock size={13} color={GOLD} />, text: "256-bit SSL Encryption" },
                  { icon: <ShieldCheck size={13} color={GOLD} />, text: "Secured by Tap Payments" },
                  { icon: <Sparkles size={13} color={GOLD} />, text: "100% Authentic Products" },
                ].map(b => (
                  <div key={b.text} style={{ display: "flex", alignItems: "center", gap: 10, padding: "5px 0" }}>
                    {b.icon}
                    <span style={{ fontSize: 11, color: "#918980" }}>{b.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}