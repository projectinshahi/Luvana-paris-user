"use server";

export async function initiateTapPayment(payload: any) {
  try {
    // Basic payload validation
    if (!payload || typeof payload.amount !== 'number' || payload.amount <= 0) {
      throw new Error('Invalid payload: amount must be a positive number');
    }
    if (!payload.currency) {
      payload.currency = 'KWD';
    }
    // Ensure required Tap fields are present
    payload.threeDSecure = payload.threeDSecure ?? true;
    payload.save_card = payload.save_card ?? false;
    payload.metadata = payload.metadata ?? {};
    if (!payload.customer) {
      throw new Error('Invalid payload: customer information required');
    }
    const res = await fetch("https://api.tap.company/v2/charges", {

      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.TAP_SECRET_KEY}`,
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    console.log('Tap charge creation response:', data);

    if (!res.ok) {
      console.error('Tap charge creation failed:', data);
      // Return detailed error information for the frontend
      return {
        success: false,
        error: data.errors?.[0]?.description || data.message || "Payment initiation failed",
        raw: data,
      };
    }

    // Return the full charge object for downstream processing
    return {
      success: true,
      chargeId: data.id,
      transactionUrl: data.transaction?.url,
      raw: data,
    };
  } catch (error: any) {
    console.error("Tap payment error:", error);
    return {
      success: false,
      error: error.message || "Something went wrong",
    };
  }
}

export async function verifyTapPayment(chargeId: string) {
  try {
    const res = await fetch(`https://api.tap.company/v2/charges/${chargeId}`, {
      headers: {
        "Authorization": `Bearer ${process.env.TAP_SECRET_KEY}`,
        "Accept": "application/json"
      },
      // Disable caching for this fetch so we get the fresh status
      cache: "no-store"
    });
    const data = await res.json();
    console.log('Tap verification response:', data);
    return { success: true, charge: data };
  } catch (error: any) {
    console.error("Tap verify error:", error);
    return { success: false, status: null };
  }
}
