import api from "./axios";

// ────────────────────────────────────────────────────────────────────────────
// ORDER SERVICE - Production Ready
// ────────────────────────────────────────────────────────────────────────────

export interface OrderItem {
  variant: string; // variant ID
  quantity: number;
}

export interface CreateOrderRequest {
  items: OrderItem[];
  shippingAddress: string; // address ID
  coupon?: string; // coupon ID (optional)
  shippingCharges?: number;
  tapChargeId: string; // REQUIRED - Tap charge ID after successful payment
  paymentStatus: "paid" | "pending" | "failed"; // REQUIRED - payment status
}

export interface OrderResponse {
  message: string;
  order: {
    orderId: string;
    _id: string;
    status: string;
    paymentStatus: string;
    price: number;
  };
}

export interface UserOrder {
  _id: string;
  orderId: string;
  status: string;
  paymentStatus: string;
  price: number;
  discount: number;
  shippingCharges: number;
  createdAt: string;
  shippingAddress: any;
  orderItem: any[];
  coupon?: any;
}

/**
 * Create order using existing backend createOrder API
 * IMPORTANT: This should ONLY be called after successful Tap payment
 * Backend endpoint: POST /user/orders
 */
export async function createOrder(request: CreateOrderRequest): Promise<OrderResponse> {
  try {
    // Validate payload
    if (!request.items || !Array.isArray(request.items) || request.items.length === 0) {
      throw new Error('Invalid payload: items array is required and cannot be empty');
    }
    if (!request.shippingAddress) {
      throw new Error('Invalid payload: shippingAddress is required');
    }
    if (!request.tapChargeId) {
      throw new Error('Invalid payload: tapChargeId is required');
    }
    // Log request details (excluding sensitive data)
    console.log('[OrderService] 📦 Creating order', {
      tapChargeId: request.tapChargeId,
      itemsCount: request.items.length,
      shippingAddress: request.shippingAddress,
      paymentStatus: request.paymentStatus,
    });

    const response = await api.post('/user/orders', request);
    console.log('[OrderService] ✅ Order created successfully', response.data);
    return response.data;
  } catch (error: any) {
    const errMsg =
      error?.response?.data?.message ||
      error?.message ||
      'Failed to create order';
    console.error('[OrderService] ❌ Error creating order', {
      url: error?.config?.url,
      method: error?.config?.method,
      status: error?.response?.status,
      message: errMsg,
      data: error?.response?.data,
    });
    throw new Error(errMsg);
  }
}

/**
 * Fetch all user orders
 * Backend endpoint: GET /user/orders
 */
export async function fetchUserOrders(): Promise<UserOrder[]> {
  try {
    console.log("[OrderService] 📋 Fetching user orders...");

    const response = await api.get("/user/orders");
    const orders = response.data.orders || [];

    console.log("[OrderService] ✅ Orders fetched", {
      count: orders.length,
      orders: orders.map((o: UserOrder) => ({
        orderId: o.orderId,
        status: o.status,
        paymentStatus: o.paymentStatus,
      })),
    });

    return orders;
  } catch (error: any) {
    const errorMsg =
      error?.response?.data?.message ||
      error?.message ||
      "Failed to fetch orders";

    console.error("[OrderService] ❌ Error fetching orders:", {
      status: error?.response?.status,
      message: errorMsg,
    });

    throw new Error(errorMsg);
  }
}

/**
 * Find order by orderId
 */
export async function findOrderByOrderId(orderId: string): Promise<UserOrder | null> {
  try {
    const orders = await fetchUserOrders();
    return orders.find((o) => o.orderId === orderId) || null;
  } catch (error) {
    console.error("[OrderService] ❌ Error finding order:", error);
    return null;
  }
}

/**
 * Poll for order confirmation (wait for webhook processing)
 * Useful to ensure order appears in user's orders after creation
 */
export async function pollForOrderConfirmation(
  orderId: string,
  maxAttempts: number = 5,
  intervalMs: number = 2000
): Promise<UserOrder | null> {
  console.log("[OrderService] ⏳ Polling for order confirmation...", {
    orderId,
    maxAttempts,
    intervalMs,
  });

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const order = await findOrderByOrderId(orderId);
      if (order) {
        console.log(`[OrderService] ✅ Order confirmed on attempt ${attempt}/${maxAttempts}`, {
          orderId,
          status: order.status,
          paymentStatus: order.paymentStatus,
        });
        return order;
      }

      console.log(`[OrderService] ⏳ Attempt ${attempt}/${maxAttempts} - order not yet visible, retrying...`);

      if (attempt < maxAttempts) {
        await new Promise((resolve) => setTimeout(resolve, intervalMs));
      }
    } catch (error) {
      console.error(`[OrderService] ❌ Poll error on attempt ${attempt}:`, error);
    }
  }

  console.warn("[OrderService] ⚠️ Order not confirmed after polling, but order was created");
  return null;
}
