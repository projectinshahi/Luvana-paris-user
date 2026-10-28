"use server";

// Server Actions for MyFatoorah — API keys stay on the server, never in browser bundles.
// Requires MYFATOORAH_API_TOKEN and MYFATOORAH_BASE_URL in the Next.js environment.

const MYF_BASE = () =>
  process.env.MYFATOORAH_BASE_URL || "https://apitest.myfatoorah.com";
const MYF_TOKEN = () => {
  const t = process.env.MYFATOORAH_API_TOKEN;
  if (!t) throw new Error("MYFATOORAH_API_TOKEN not configured");
  return t;
};
const MYF_HEADERS = () => ({
  Authorization: `Bearer ${MYF_TOKEN()}`,
  "Content-Type": "application/json",
});

// KWD/BHD/OMR → 3 decimal places; SAR/AED → 2
function roundForCurrency(amount: number, currency: string): number {
  if (!Number.isFinite(amount) || amount <= 0) {
    throw new Error(`Invalid charge amount: ${amount}. Must be a positive finite number.`);
  }
  const dp = ["KWD", "BHD", "OMR"].includes(currency) ? 3 : 2;
  return parseFloat(amount.toFixed(dp));
}

// Shared fetch helper — throws with ValidationErrors included in message on API failure
async function myfetchServer(path: string, body: unknown) {
  const url = `${MYF_BASE()}${path}`;
  const res = await fetch(url, {
    method: "POST",
    headers: MYF_HEADERS(),
    body: JSON.stringify(body),
  });

  let data: any;
  try {
    data = await res.json();
  } catch {
    // MYF returned a non-JSON body (HTML error page, plain-text 404, etc.)
    console.error(
      "[MYF]",
      path,
      "HTTP",
      res.status,
      "non-JSON response. URL:",
      url,
    );
    throw new Error(
      `MyFatoorah ${path} returned HTTP ${res.status} (non-JSON body). ` +
        `Verify MYFATOORAH_BASE_URL is correct ("${MYF_BASE()}").`,
    );
  }

  if (!data.IsSuccess) {
    const fieldErrors =
      Array.isArray(data.ValidationErrors) && data.ValidationErrors.length > 0
        ? ` (${data.ValidationErrors.map(
            (e: { Name: string; Error: string }) => `${e.Name}: ${e.Error}`,
          ).join("; ")})`
        : "";
    console.error(
      "[MYF]",
      path,
      "HTTP",
      res.status,
      "failed:",
      data.Message,
      data.ValidationErrors,
    );
    throw new Error((data.Message || `MYF error at ${path}`) + fieldErrors);
  }
  return data.Data;
}

export async function initiateMyFatoorahPayment(payload: {
  amount: number;
  currency: string;
  callbackUrl: string;
  errorUrl: string;
  customerName: string;
  customerRef: string; // UUID generated at checkout — also stored as paymentReference
  customerEmail?: string;
  customerMobile?: string; // digits only, no country code
  mobileCountryCode?: string; // e.g. "965" for Kuwait
}) {
  try {
    const chargeAmount = roundForCurrency(payload.amount, payload.currency);

    // Step 1: Discover which payment methods are actually available on this account
    // for the given amount and currency. PaymentMethodId: 0 ("all methods") requires
    // the UCP feature which is not enabled on every sandbox account — so we always
    // call InitiatePayment first and use the real ID from the response.
    const methodsData = await myfetchServer("/v2/InitiatePayment", {
      InvoiceAmount: chargeAmount,
      CurrencyIso: payload.currency,
    });

    const methods: Array<{ PaymentMethodId: number; PaymentMethodEn: string }> =
      methodsData?.PaymentMethods ?? [];

    if (methods.length === 0) {
      return {
        success: false,
        error: `No payment methods available for ${payload.currency}. Please contact support.`,
      };
    }

    // For KWD prefer KNET (the primary Kuwait gateway); fall back to first available.
    // ponytail: add a method-selector step when UCP is enabled and multiple methods apply.
    const preferred =
      payload.currency === "KWD"
        ? methods.find((m) => /knet/i.test(m.PaymentMethodEn))
        : null;
    const selectedMethod = preferred ?? methods[0];
    const methodId = selectedMethod.PaymentMethodId;
    console.log(
      `[MYF] currency=${payload.currency} methods=[${methods.map((m) => `${m.PaymentMethodEn}(${m.PaymentMethodId})`).join(",")}] selected=${selectedMethod.PaymentMethodEn}(${methodId})`
    );

    // Step 2: Create the invoice using the real PaymentMethodId
    const body: Record<string, unknown> = {
      PaymentMethodId: methodId,
      CustomerName: payload.customerName || "Customer",
      InvoiceValue: chargeAmount,
      DisplayCurrencyIso: payload.currency,
      CallBackUrl: payload.callbackUrl,
      ErrorUrl: payload.errorUrl,
      Language: "en",
      CustomerReference: payload.customerRef,
      SourceInfo: "Luvana Paris",
      NotificationOption: "LNK",
    };
    if (payload.customerEmail) body.CustomerEmail = payload.customerEmail;
    if (payload.customerMobile) {
      body.CustomerMobile = payload.customerMobile;
      body.MobileCountryCode = payload.mobileCountryCode || "965";
    }

    const payData = await myfetchServer("/v2/ExecutePayment", body);
    // MYF response uses PaymentURL (current API) or InvoiceURL (older API versions) —
    // accept either so the integration works regardless of sandbox/live API version.
    const invoiceUrl: string | undefined =
      payData.PaymentURL || payData.InvoiceURL;
    if (!invoiceUrl) {
      throw new Error(
        "MyFatoorah did not return a payment URL. " +
          "Verify the API token is active and ExecutePayment succeeded.",
      );
    }
    return {
      success: true,
      invoiceId: String(payData.InvoiceId),
      invoiceUrl,
      paymentMethodId: methodId,
      paymentMethodName: selectedMethod.PaymentMethodEn,
    };
  } catch (error: any) {
    console.error("[MYF] initiatePayment error:", error);
    return {
      success: false,
      error: error.message || "Payment initiation failed",
    };
  }
}

export async function verifyMyFatoorahPayment(paymentId: string) {
  try {
    const data = await myfetchServer("/v2/GetPaymentStatus", {
      KeyType: "PaymentId",
      Key: paymentId,
    });
    const tx = Array.isArray(data.InvoiceTransactions)
      ? data.InvoiceTransactions[0]
      : null;
    return {
      success: true,
      invoiceStatus: data.InvoiceStatus as string,
      invoiceValue: Number(data.InvoiceValue),
      customerReference: data.CustomerReference as string,
      invoiceId: String(data.InvoiceId),
      currency: tx?.Currency || "",
    };
  } catch (error: any) {
    console.error("[MYF] verifyPayment error:", error);
    return { success: false, error: error.message || "Verification failed" };
  }
}
