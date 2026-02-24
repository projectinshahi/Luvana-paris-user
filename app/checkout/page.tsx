"use client";
import { useState } from "react";
import {
  ShieldCheck, Lock, ChevronRight, CreditCard, Landmark,
  Smartphone, Tag, ChevronDown, ChevronUp, Check, ArrowLeft,
  Sparkles, X
} from "lucide-react";
import { useCurrency } from "@/contexts/CurrencyContext";

const GOLD = "#C9A24D";
const GOLD_LIGHT = "#E2C07A";
const GOLD_DARK = "#A07C30";

// ── Type Definitions ─────────────────────────────────────────────────────────
interface InputFieldProps {
  label: string;
  id: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  icon?: React.ReactNode;
  maxLength?: number;
  helper?: string;
}

interface PaymentTabProps {
  id: string;
  label: string;
  icon: React.ReactNode;
  active: boolean;
  onClick: (id: string) => void;
}

interface OrderItemProps {
  name: string;
  variant: string;
  qty: number;
  price: number;
  img: string | null;
  formatPrice: (price: number) => string;
}

interface SuccessScreenProps {
  onBack: () => void;
}

// ── Helpers ──────────────────────────────────────────────────────────────────
function formatCard(val: string): string {
  return val.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
}
function formatExpiry(val: string): string {
  const raw = val.replace(/\D/g, "").slice(0, 4);
  return raw.length >= 3 ? raw.slice(0, 2) + "/" + raw.slice(2) : raw;
}

// ── Sub-components ───────────────────────────────────────────────────────────
function GoldDivider() {
  return (
    <div className="flex items-center gap-3 my-6">
      <div style={{ flex: 1, height: 1, background: `linear-gradient(to right, transparent, ${GOLD}55)` }} />
      <span style={{ color: GOLD, fontSize: 10, letterSpacing: 3 }}>✦</span>
      <div style={{ flex: 1, height: 1, background: `linear-gradient(to left, transparent, ${GOLD}55)` }} />
    </div>
  );
}

function InputField({ label, id, placeholder, value, onChange, type = "text", icon, maxLength, helper }: InputFieldProps) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ position: "relative" }}>
      <label htmlFor={id} style={{
        display: "block", fontSize: 11, fontWeight: 600,
        letterSpacing: 2, textTransform: "uppercase",
        color: focused ? GOLD : "#888", marginBottom: 8,
        transition: "color 0.2s",
        fontFamily: "'Cormorant Garamond', serif",
      }}>
        {label}
      </label>
      <div style={{ position: "relative" }}>
        {icon && (
          <div style={{
            position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)",
            color: focused ? GOLD : "#555", transition: "color 0.2s", pointerEvents: "none",
          }}>
            {icon}
          </div>
        )}
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          maxLength={maxLength}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            width: "100%",
            background: focused ? "#111" : "#0A0A0A",
            border: `1px solid ${focused ? GOLD : "#2A2A2A"}`,
            borderRadius: 8,
            padding: icon ? "13px 14px 13px 42px" : "13px 14px",
            color: "#F5F5F5",
            fontSize: 14,
            outline: "none",
            transition: "all 0.25s",
            boxSizing: "border-box",
            fontFamily: "'DM Sans', sans-serif",
            boxShadow: focused ? `0 0 0 3px ${GOLD}18` : "none",
          }}
        />
      </div>
      {helper && <p style={{ fontSize: 11, color: "#555", marginTop: 5, fontFamily: "'DM Sans', sans-serif" }}>{helper}</p>}
    </div>
  );
}

function PaymentTab({ id, label, icon, active, onClick }: PaymentTabProps) {
  return (
    <button
      onClick={() => onClick(id)}
      style={{
        flex: 1,
        padding: "12px 8px",
        borderRadius: 8,
        border: `1px solid ${active ? GOLD : "#2A2A2A"}`,
        background: active ? `${GOLD}12` : "transparent",
        color: active ? GOLD : "#666",
        fontSize: 12,
        fontWeight: 600,
        letterSpacing: 1,
        textTransform: "uppercase",
        cursor: "pointer",
        transition: "all 0.2s",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 6,
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {icon}
      {label}
    </button>
  );
}

function OrderItem({ name, variant, qty, price, img, formatPrice }: OrderItemProps) {
  return (
    <div style={{ display: "flex", gap: 14, alignItems: "center", padding: "14px 0", borderBottom: "1px solid #1A1A1A" }}>
      <div style={{ position: "relative", flexShrink: 0 }}>
        <div style={{
          width: 58, height: 58, borderRadius: 10,
          background: `linear-gradient(135deg, #1A1A1A 0%, #222 100%)`,
          border: "1px solid #2A2A2A",
          display: "flex", alignItems: "center", justifyContent: "center",
          overflow: "hidden",
        }}>
          {img
            ? <img src={img} alt={name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            : <Sparkles size={20} color={GOLD} />
          }
        </div>
        <div style={{
          position: "absolute", top: -6, right: -6,
          width: 18, height: 18, borderRadius: "50%",
          background: GOLD, color: "#000",
          fontSize: 10, fontWeight: 700,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: "'DM Sans', sans-serif",
        }}>
          {qty}
        </div>
      </div>
      <div style={{ flex: 1 }}>
        <p style={{ margin: 0, fontWeight: 600, color: "#F0F0F0", fontFamily: "'Cormorant Garamond', serif", fontSize: 15 }}>{name}</p>
        <p style={{ margin: "3px 0 0", fontSize: 11, color: "#555", fontFamily: "'DM Sans', sans-serif" }}>{variant}</p>
      </div>
      <p style={{ margin: 0, fontWeight: 700, color: GOLD, fontSize: 14, fontFamily: "'DM Sans', sans-serif" }}>{formatPrice(price)}</p>
    </div>
  );
}

// ── Success Screen ────────────────────────────────────────────────────────────
function SuccessScreen({ onBack }: SuccessScreenProps) {
  return (
    <div style={{
      minHeight: "100vh", background: "#0D0D0D",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: 24, fontFamily: "'DM Sans', sans-serif",
    }}>
      <div style={{ textAlign: "center", maxWidth: 420 }}>
        {/* Animated circle */}
        <div style={{
          width: 100, height: 100, borderRadius: "50%",
          border: `2px solid ${GOLD}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          margin: "0 auto 32px",
          background: `${GOLD}10`,
          animation: "pulse 2s infinite",
        }}>
          <Check size={44} color={GOLD} strokeWidth={2.5} />
        </div>
        <h1 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 36, fontWeight: 700, color: "#F5F5F5",
          margin: "0 0 12px",
        }}>
          Order Confirmed
        </h1>
        <p style={{ color: "#777", fontSize: 14, lineHeight: 1.7, margin: "0 0 8px" }}>
          Thank you for your purchase. Your order has been placed successfully.
        </p>
        <p style={{ color: GOLD, fontSize: 13, margin: "0 0 36px", letterSpacing: 1 }}>
          ORDER #GLD-2024-8821
        </p>
        <div style={{
          background: "#111", border: "1px solid #2A2A2A",
          borderRadius: 12, padding: "20px 24px", marginBottom: 32,
          textAlign: "left",
        }}>
          <p style={{ margin: 0, fontSize: 12, color: "#555", letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 }}>Estimated Delivery</p>
          <p style={{ margin: 0, fontSize: 16, color: "#F0F0F0", fontWeight: 600 }}>3 – 5 Business Days</p>
        </div>
        <button
          onClick={onBack}
          style={{
            width: "100%", padding: "15px", borderRadius: 10,
            background: `linear-gradient(135deg, ${GOLD_DARK}, ${GOLD}, ${GOLD_LIGHT})`,
            border: "none", color: "#0D0D0D",
            fontSize: 13, fontWeight: 700, letterSpacing: 2,
            textTransform: "uppercase", cursor: "pointer",
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          Continue Shopping
        </button>
      </div>
      <style>{`@keyframes pulse { 0%,100%{box-shadow:0 0 0 0 ${GOLD}40} 50%{box-shadow:0 0 0 16px transparent} }`}</style>
    </div>
  );
}

// ── Main Checkout Page ────────────────────────────────────────────────────────
export default function CheckoutPage() {
  const { formatPrice } = useCurrency();
  const [step, setStep] = useState(1); // 1=Info, 2=Payment, 3=Review
  const [payMethod, setPayMethod] = useState("card");
  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [summaryOpen, setSummaryOpen] = useState(false);
  const [success, setSuccess] = useState(false);

  const [info, setInfo] = useState({ name: "", email: "", phone: "", address: "", city: "", state: "", pin: "" });
  const [card, setCard] = useState({ number: "", name: "", expiry: "", cvv: "" });
  const [upiId, setUpiId] = useState("");
  const [saveCard, setSaveCard] = useState(false);

  const items = [
    { name: "Velvet Matte Lipstick", variant: "Berry Pink · Qty 1", qty: 1, price: 899, img: null },
    { name: "Luxury Glow Serum", variant: "30ml · Qty 2", qty: 2, price: 2199, img: null },
  ];
  const subtotal = 3098;
  const shipping = 0;
  const discount = couponApplied ? 310 : 0;
  const total = subtotal - discount + shipping;

  const steps = [
    { n: 1, label: "Information" },
    { n: 2, label: "Payment" },
    { n: 3, label: "Review" },
  ];

  if (success) return <SuccessScreen onBack={() => { setSuccess(false); setStep(1); }} />;

  const canProceed1 = info.name && info.email && info.phone && info.address && info.city && info.pin;
  const canProceed2 =
    payMethod === "card" ? (card.number.length >= 19 && card.name && card.expiry.length === 5 && card.cvv.length === 3) :
    payMethod === "upi"  ? upiId.includes("@") :
    true;

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0D0D0D",
      color: "#F5F5F5",
      fontFamily: "'DM Sans', sans-serif",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=DM+Sans:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; }
        input::placeholder { color: #3A3A3A; }
        input:-webkit-autofill { -webkit-box-shadow: 0 0 0 100px #111 inset !important; -webkit-text-fill-color: #F5F5F5 !important; }
        ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-track { background: #0D0D0D; } ::-webkit-scrollbar-thumb { background: #2A2A2A; border-radius: 2px; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes shimmer { 0%,100%{opacity:1} 50%{opacity:.7} }
        .step-content { animation: fadeIn 0.3s ease; }
        .gold-btn:hover { filter: brightness(1.1); transform: translateY(-1px); box-shadow: 0 8px 30px ${GOLD}44 !important; }
        .gold-btn { transition: all 0.2s !important; }
        .card-flip { perspective: 1000px; }
      `}</style>

      {/* ── Step Indicator ── */}
      <div style={{ padding: "100px 24px 0", maxWidth: 960, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 0 }}>
          {steps.map((s, i) => (
            <div key={s.n} style={{ display: "flex", alignItems: "center" }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                <div style={{
                  width: 34, height: 34, borderRadius: "50%",
                  background: step > s.n ? GOLD : step === s.n ? "transparent" : "transparent",
                  border: `2px solid ${step >= s.n ? GOLD : "#2A2A2A"}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  transition: "all 0.3s",
                }}>
                  {step > s.n
                    ? <Check size={14} color="#000" strokeWidth={3} />
                    : <span style={{ fontSize: 12, fontWeight: 700, color: step === s.n ? GOLD : "#444" }}>{s.n}</span>
                  }
                </div>
                <span style={{ fontSize: 10, letterSpacing: 1.5, textTransform: "uppercase", color: step >= s.n ? GOLD : "#444", fontWeight: 600 }}>
                  {s.label}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div style={{
                  width: 60, height: 1, margin: "0 8px",
                  background: step > s.n ? GOLD : "#2A2A2A",
                  transition: "background 0.3s",
                  marginBottom: 20,
                }} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── Main Layout ── */}
      <div style={{
        maxWidth: 960, margin: "0 auto", padding: "28px 16px 60px",
        display: "grid",
        gridTemplateColumns: "minmax(0,1fr)",
        gap: 24,
      }}>

        {/* Mobile order summary toggle */}
        <div
          onClick={() => setSummaryOpen(!summaryOpen)}
          style={{
            background: "#111", border: "1px solid #2A2A2A",
            borderRadius: 10, padding: "14px 18px",
            cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "space-between",
          }}
          className="lg-hide"
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <ShieldCheck size={16} color={GOLD} />
            <span style={{ fontSize: 13, color: "#ccc" }}>
              {summaryOpen ? "Hide" : "Show"} order summary
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <span style={{ fontWeight: 700, color: GOLD, fontSize: 16 }}>{formatPrice(total)}</span>
            {summaryOpen ? <ChevronUp size={16} color="#555" /> : <ChevronDown size={16} color="#555" />}
          </div>
        </div>

        {/* ── MAIN WRAPPER: form + sidebar ── */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 24 }} id="main-grid">
          <style>{`
            @media (min-width: 768px) {
              #main-grid { grid-template-columns: 1fr 380px !important; }
              .lg-hide { display: none !important; }
              #order-sidebar { display: block !important; }
            }
            @media (min-width: 480px) {
              .sm-show { display: inline !important; }
              .two-col { grid-template-columns: 1fr 1fr !important; }
            }
          `}</style>

          {/* ── LEFT: Form ── */}
          <div>

            {/* ── STEP 1: INFORMATION ── */}
            {step === 1 && (
              <div className="step-content">
                <div style={{
                  background: "#111", border: "1px solid #1E1E1E",
                  borderRadius: 14, padding: "28px 24px",
                }}>
                  <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 24, fontWeight: 700, margin: "0 0 4px", color: "#F5F5F5" }}>
                    Contact & Delivery
                  </h2>
                  <p style={{ margin: "0 0 24px", fontSize: 13, color: "#555" }}>We'll use these details for your order</p>

                  <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                    <InputField label="Full Name" id="name" placeholder="Aisha Sharma"
                      value={info.name} onChange={e => setInfo({ ...info, name: e.target.value })} />

                    <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 18 }} className="two-col">
                      <InputField label="Email Address" id="email" placeholder="aisha@example.com" type="email"
                        value={info.email} onChange={e => setInfo({ ...info, email: e.target.value })} />
                      <InputField label="Phone" id="phone" placeholder="+91 98765 43210" type="tel"
                        value={info.phone} onChange={e => setInfo({ ...info, phone: e.target.value })} />
                    </div>

                    <GoldDivider />

                    <InputField label="Street Address" id="address" placeholder="123, MG Road, Apartment 4B"
                      value={info.address} onChange={e => setInfo({ ...info, address: e.target.value })} />

                    <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 18 }} className="two-col">
                      <InputField label="City" id="city" placeholder="Mumbai"
                        value={info.city} onChange={e => setInfo({ ...info, city: e.target.value })} />
                      <InputField label="State" id="state" placeholder="Maharashtra"
                        value={info.state} onChange={e => setInfo({ ...info, state: e.target.value })} />
                    </div>

                    <InputField label="PIN Code" id="pin" placeholder="400001" maxLength={6}
                      value={info.pin} onChange={e => setInfo({ ...info, pin: e.target.value.replace(/\D/g, "") })} />
                  </div>

                  {/* Shipping badge */}
                  <div style={{
                    marginTop: 22, padding: "12px 16px", borderRadius: 8,
                    background: `${GOLD}0D`, border: `1px solid ${GOLD}33`,
                    display: "flex", alignItems: "center", gap: 10,
                  }}>
                    <ShieldCheck size={16} color={GOLD} />
                    <span style={{ fontSize: 12, color: "#C0A060" }}>Free standard shipping on all orders</span>
                  </div>

                  <button
                    onClick={() => canProceed1 && setStep(2)}
                    className="gold-btn"
                    style={{
                      marginTop: 24, width: "100%",
                      padding: "15px",
                      borderRadius: 10,
                      background: canProceed1
                        ? `linear-gradient(135deg, ${GOLD_DARK}, ${GOLD}, ${GOLD_LIGHT})`
                        : "#1A1A1A",
                      border: canProceed1 ? "none" : `1px solid #2A2A2A`,
                      color: canProceed1 ? "#0D0D0D" : "#444",
                      fontSize: 12, fontWeight: 700, letterSpacing: 2,
                      textTransform: "uppercase",
                      cursor: canProceed1 ? "pointer" : "not-allowed",
                      display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                  >
                    Continue to Payment
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* ── STEP 2: PAYMENT ── */}
            {step === 2 && (
              <div className="step-content">
                <div style={{ background: "#111", border: "1px solid #1E1E1E", borderRadius: 14, padding: "28px 24px" }}>
                  <button onClick={() => setStep(1)} style={{ background: "none", border: "none", color: "#666", cursor: "pointer", display: "flex", alignItems: "center", gap: 6, fontSize: 12, marginBottom: 20, padding: 0 }}>
                    <ArrowLeft size={14} /> Back
                  </button>
                  <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 24, fontWeight: 700, margin: "0 0 4px" }}>Payment Method</h2>
                  <p style={{ margin: "0 0 24px", fontSize: 13, color: "#555" }}>All transactions are encrypted & secure</p>

                  {/* Method tabs */}
                  <div style={{ display: "flex", gap: 10, marginBottom: 28 }}>
                    <PaymentTab id="card"   label="Card"       icon={<CreditCard size={18} />}  active={payMethod === "card"}   onClick={setPayMethod} />
                    <PaymentTab id="upi"    label="UPI"        icon={<Smartphone size={18} />}  active={payMethod === "upi"}    onClick={setPayMethod} />
                    <PaymentTab id="netbank" label="Net Bank"  icon={<Landmark size={18} />}    active={payMethod === "netbank"} onClick={setPayMethod} />
                    <PaymentTab id="cod"    label="COD"        icon={<ShieldCheck size={18} />} active={payMethod === "cod"}    onClick={setPayMethod} />
                  </div>

                  {/* ── Card form ── */}
                  {payMethod === "card" && (
                    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                      {/* Card preview */}
                      <div style={{
                        borderRadius: 14, padding: "24px 22px",
                        background: `linear-gradient(135deg, #181818 0%, #141414 50%, #1C1A14 100%)`,
                        border: `1px solid ${GOLD}33`,
                        position: "relative", overflow: "hidden",
                        minHeight: 130,
                      }}>
                        {/* Decorative circle */}
                        <div style={{ position: "absolute", top: -40, right: -40, width: 140, height: 140, borderRadius: "50%", background: `${GOLD}08`, border: `1px solid ${GOLD}15` }} />
                        <div style={{ position: "absolute", top: -10, right: -10, width: 80, height: 80, borderRadius: "50%", background: `${GOLD}10` }} />
                        <div style={{ position: "relative" }}>
                          <CreditCard size={26} color={GOLD} style={{ marginBottom: 16 }} />
                          <p style={{ margin: "0 0 8px", fontFamily: "monospace", fontSize: 15, letterSpacing: 3, color: card.number ? "#F0F0F0" : "#333" }}>
                            {card.number || "•••• •••• •••• ••••"}
                          </p>
                          <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <span style={{ fontSize: 11, color: card.name ? "#ccc" : "#444", letterSpacing: 1 }}>{card.name || "CARD HOLDER"}</span>
                            <span style={{ fontSize: 11, color: card.expiry ? "#ccc" : "#444", letterSpacing: 1 }}>{card.expiry || "MM/YY"}</span>
                          </div>
                        </div>
                      </div>

                      <InputField label="Card Number" id="cardnum" placeholder="1234 5678 9012 3456"
                        icon={<CreditCard size={16} />} maxLength={19}
                        value={card.number}
                        onChange={e => setCard({ ...card, number: formatCard(e.target.value) })} />
                      <InputField label="Cardholder Name" id="cardname" placeholder="AISHA SHARMA"
                        value={card.name}
                        onChange={e => setCard({ ...card, name: e.target.value.toUpperCase() })} />
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                        <InputField label="Expiry" id="expiry" placeholder="MM/YY" maxLength={5}
                          value={card.expiry}
                          onChange={e => setCard({ ...card, expiry: formatExpiry(e.target.value) })} />
                        <InputField label="CVV" id="cvv" placeholder="•••" type="password" maxLength={3}
                          value={card.cvv}
                          onChange={e => setCard({ ...card, cvv: e.target.value.replace(/\D/g, "").slice(0, 3) })}
                          helper="3 digits on back" />
                      </div>

                      {/* Save card toggle */}
                      <label style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", marginTop: 4 }}>
                        <div
                          onClick={() => setSaveCard(!saveCard)}
                          style={{
                            width: 20, height: 20, borderRadius: 5,
                            border: `2px solid ${saveCard ? GOLD : "#333"}`,
                            background: saveCard ? `${GOLD}20` : "transparent",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            transition: "all 0.2s", flexShrink: 0,
                          }}
                        >
                          {saveCard && <Check size={12} color={GOLD} strokeWidth={3} />}
                        </div>
                        <span style={{ fontSize: 13, color: "#777" }}>Save card for future purchases</span>
                      </label>

                      {/* Security note */}
                      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 14px", background: "#0A0A0A", borderRadius: 8, border: "1px solid #1A1A1A" }}>
                        <Lock size={13} color={GOLD} />
                        <span style={{ fontSize: 11, color: "#555" }}>Your card info is encrypted with 256-bit SSL security</span>
                      </div>
                    </div>
                  )}

                  {/* ── UPI form ── */}
                  {payMethod === "upi" && (
                    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                      <InputField label="UPI ID" id="upi" placeholder="yourname@upi"
                        icon={<Smartphone size={16} />}
                        value={upiId} onChange={e => setUpiId(e.target.value)} />
                      <p style={{ fontSize: 12, color: "#555", margin: 0 }}>Enter your UPI ID (e.g. name@okaxis, name@paytm)</p>
                      {/* UPI apps */}
                      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 8 }}>
                        {["GPay", "PhonePe", "Paytm", "BHIM"].map(app => (
                          <div key={app} style={{
                            padding: "8px 16px", borderRadius: 8,
                            background: "#0A0A0A", border: "1px solid #222",
                            fontSize: 12, color: "#888",
                          }}>{app}</div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* ── Net Banking ── */}
                  {payMethod === "netbank" && (
                    <div>
                      <p style={{ fontSize: 13, color: "#666", marginBottom: 16 }}>Select your bank</p>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                        {["SBI", "HDFC", "ICICI", "Axis", "Kotak", "Other"].map(bank => (
                          <div key={bank} style={{
                            padding: "13px 16px", borderRadius: 8,
                            background: "#0A0A0A", border: "1px solid #1E1E1E",
                            fontSize: 13, color: "#888", cursor: "pointer",
                            transition: "all 0.2s",
                          }}
                            onMouseEnter={e => { e.currentTarget.style.borderColor = GOLD + "66"; e.currentTarget.style.color = GOLD; }}
                            onMouseLeave={e => { e.currentTarget.style.borderColor = "#1E1E1E"; e.currentTarget.style.color = "#888"; }}
                          >
                            {bank}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* ── COD ── */}
                  {payMethod === "cod" && (
                    <div style={{ padding: "24px", background: "#0A0A0A", borderRadius: 10, border: "1px solid #1A1A1A", textAlign: "center" }}>
                      <ShieldCheck size={32} color={GOLD} style={{ marginBottom: 12 }} />
                      <p style={{ margin: "0 0 6px", fontSize: 15, color: "#F0F0F0", fontWeight: 600 }}>Cash on Delivery</p>
                      <p style={{ margin: 0, fontSize: 13, color: "#666" }}>Pay {formatPrice(total)} when your order arrives. No extra charges.</p>
                    </div>
                  )}

                  <button
                    onClick={() => canProceed2 && setStep(3)}
                    className="gold-btn"
                    style={{
                      marginTop: 28, width: "100%",
                      padding: "15px",
                      borderRadius: 10,
                      background: canProceed2
                        ? `linear-gradient(135deg, ${GOLD_DARK}, ${GOLD}, ${GOLD_LIGHT})`
                        : "#1A1A1A",
                      border: canProceed2 ? "none" : `1px solid #2A2A2A`,
                      color: canProceed2 ? "#0D0D0D" : "#444",
                      fontSize: 12, fontWeight: 700, letterSpacing: 2,
                      textTransform: "uppercase",
                      cursor: canProceed2 ? "pointer" : "not-allowed",
                      display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                  >
                    Review Order
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* ── STEP 3: REVIEW ── */}
            {step === 3 && (
              <div className="step-content">
                <div style={{ background: "#111", border: "1px solid #1E1E1E", borderRadius: 14, padding: "28px 24px" }}>
                  <button onClick={() => setStep(2)} style={{ background: "none", border: "none", color: "#666", cursor: "pointer", display: "flex", alignItems: "center", gap: 6, fontSize: 12, marginBottom: 20, padding: 0 }}>
                    <ArrowLeft size={14} /> Back
                  </button>
                  <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 24, fontWeight: 700, margin: "0 0 24px" }}>Review & Place Order</h2>

                  {/* Delivery summary */}
                  <div style={{ background: "#0A0A0A", borderRadius: 10, padding: "16px 18px", border: "1px solid #1A1A1A", marginBottom: 16 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                      <span style={{ fontSize: 11, color: "#555", letterSpacing: 1.5, textTransform: "uppercase" }}>Deliver to</span>
                      <button onClick={() => setStep(1)} style={{ background: "none", border: "none", color: GOLD, fontSize: 12, cursor: "pointer", padding: 0 }}>Edit</button>
                    </div>
                    <p style={{ margin: 0, fontSize: 14, color: "#D0D0D0", lineHeight: 1.6 }}>
                      <strong style={{ color: "#F5F5F5" }}>{info.name || "—"}</strong><br />
                      {info.address}{info.city && `, ${info.city}`}{info.pin && ` - ${info.pin}`}
                    </p>
                  </div>

                  {/* Payment summary */}
                  <div style={{ background: "#0A0A0A", borderRadius: 10, padding: "16px 18px", border: "1px solid #1A1A1A", marginBottom: 24 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                      <span style={{ fontSize: 11, color: "#555", letterSpacing: 1.5, textTransform: "uppercase" }}>Payment via</span>
                      <button onClick={() => setStep(2)} style={{ background: "none", border: "none", color: GOLD, fontSize: 12, cursor: "pointer", padding: 0 }}>Edit</button>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      {payMethod === "card" && <CreditCard size={18} color={GOLD} />}
                      {payMethod === "upi" && <Smartphone size={18} color={GOLD} />}
                      {payMethod === "netbank" && <Landmark size={18} color={GOLD} />}
                      {payMethod === "cod" && <ShieldCheck size={18} color={GOLD} />}
                      <span style={{ fontSize: 14, color: "#D0D0D0" }}>
                        {payMethod === "card" && (card.number ? `•••• •••• •••• ${card.number.slice(-4)}` : "Credit / Debit Card")}
                        {payMethod === "upi" && (upiId || "UPI")}
                        {payMethod === "netbank" && "Net Banking"}
                        {payMethod === "cod" && "Cash on Delivery"}
                      </span>
                    </div>
                  </div>

                  {/* Place order */}
                  <button
                    className="gold-btn"
                    onClick={() => setSuccess(true)}
                    style={{
                      width: "100%", padding: "17px",
                      borderRadius: 10,
                      background: `linear-gradient(135deg, ${GOLD_DARK}, ${GOLD}, ${GOLD_LIGHT})`,
                      border: "none",
                      color: "#0D0D0D",
                      fontSize: 13, fontWeight: 700, letterSpacing: 2,
                      textTransform: "uppercase",
                      cursor: "pointer",
                      display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                      fontFamily: "'DM Sans', sans-serif",
                      boxShadow: `0 4px 24px ${GOLD}33`,
                    }}
                  >
                    <Lock size={15} />
                    Place Order · {formatPrice(total)}
                  </button>

                  <p style={{ textAlign: "center", fontSize: 11, color: "#444", marginTop: 14 }}>
                    By placing your order, you agree to our Terms of Service and Privacy Policy.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* ── RIGHT: Order Summary Sidebar ── */}
          <div
            id="order-sidebar"
            style={{
              display: summaryOpen ? "block" : "none",
            }}
          >
            <div style={{
              background: "#111", border: "1px solid #1E1E1E",
              borderRadius: 14, padding: "24px 20px",
              position: "sticky", top: 80,
            }}>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 700, margin: "0 0 4px" }}>Order Summary</h3>
              <p style={{ margin: "0 0 16px", fontSize: 12, color: "#555" }}>{items.length} items</p>

              {/* Items */}
              <div>
                {items.map((item, i) => <OrderItem key={i} {...item} formatPrice={formatPrice} />)}
              </div>

              {/* Coupon */}
              <div style={{ marginTop: 20 }}>
                <label style={{ fontSize: 11, color: "#555", letterSpacing: 2, textTransform: "uppercase", display: "block", marginBottom: 8, fontFamily: "'Cormorant Garamond', serif" }}>
                  Promo Code
                </label>
                <div style={{ display: "flex", gap: 8 }}>
                  <div style={{ position: "relative", flex: 1 }}>
                    <Tag size={14} color="#444" style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }} />
                    <input
                      placeholder="GLORA10"
                      value={coupon}
                      onChange={e => { setCoupon(e.target.value.toUpperCase()); setCouponApplied(false); }}
                      style={{
                        width: "100%", padding: "10px 10px 10px 34px",
                        background: "#0A0A0A", border: "1px solid #222",
                        borderRadius: 8, color: "#F5F5F5", fontSize: 13,
                        outline: "none", fontFamily: "'DM Sans', sans-serif",
                      }}
                    />
                    {couponApplied && (
                      <div style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)" }}>
                        <Check size={14} color={GOLD} />
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => { if (coupon) setCouponApplied(true); }}
                    style={{
                      padding: "10px 16px", borderRadius: 8,
                      background: couponApplied ? `${GOLD}18` : "#1A1A1A",
                      border: `1px solid ${couponApplied ? GOLD + "66" : "#2A2A2A"}`,
                      color: couponApplied ? GOLD : "#888",
                      fontSize: 12, fontWeight: 600, cursor: "pointer",
                      whiteSpace: "nowrap", fontFamily: "'DM Sans', sans-serif",
                      transition: "all 0.2s",
                    }}
                  >
                    {couponApplied ? "Applied!" : "Apply"}
                  </button>
                </div>
                {couponApplied && (
                  <p style={{ margin: "8px 0 0", fontSize: 12, color: "#7DBF7D" }}>
                    ✓ Coupon applied — you save {formatPrice(discount)}!
                  </p>
                )}
              </div>

              <GoldDivider />

              {/* Price breakdown */}
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {[
                  { label: "Subtotal", val: formatPrice(subtotal) },
                  { label: "Shipping", val: shipping === 0 ? "Free" : formatPrice(shipping), green: true },
                  ...(couponApplied ? [{ label: "Discount (GLORA10)", val: `-${formatPrice(discount)}`, gold: true }] : []),
                ].map(row => (
                  <div key={row.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: 13, color: "#666" }}>{row.label}</span>
                    <span style={{ fontSize: 13, color: row.gold ? GOLD : row.green ? "#7DBF7D" : "#ccc", fontWeight: 600 }}>{row.val}</span>
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
                  <p style={{ margin: 0, fontSize: 11, color: "#555", letterSpacing: 1, textTransform: "uppercase" }}>Total</p>
                  <p style={{ margin: "2px 0 0", fontSize: 11, color: "#444" }}>Including all taxes</p>
                </div>
                <span style={{ fontSize: 24, fontWeight: 700, color: GOLD, fontFamily: "'Cormorant Garamond', serif" }}>
                  {formatPrice(total)}
                </span>
              </div>

              {/* Trust badges */}
              <div style={{
                marginTop: 16, padding: "14px", borderRadius: 10,
                background: "#0A0A0A", border: "1px solid #1A1A1A",
              }}>
                {[
                  { icon: <Lock size={13} color={GOLD} />, text: "256-bit SSL Encryption" },
                  { icon: <ShieldCheck size={13} color={GOLD} />, text: "Secure Payment Gateway" },
                  { icon: <Sparkles size={13} color={GOLD} />, text: "100% Authentic Products" },
                ].map(b => (
                  <div key={b.text} style={{ display: "flex", alignItems: "center", gap: 10, padding: "5px 0" }}>
                    {b.icon}
                    <span style={{ fontSize: 11, color: "#555" }}>{b.text}</span>
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