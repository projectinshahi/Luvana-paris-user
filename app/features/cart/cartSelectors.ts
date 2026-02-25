import { RootState } from "@/redux/store";

// 🔥 Get full cart state
export const selectCartState = (state: RootState) => state.cart;

// 🔥 Get cart items
export const selectCartItems = (state: RootState) =>
  state.cart.items;

// 🔥 Get cart loading state
export const selectCartLoading = (state: RootState) =>
  state.cart.loading;

// 🔥 Get cart error state
export const selectCartError = (state: RootState) =>
  state.cart.error;

// 🔥 Get total quantity (for navbar badge)
export const selectCartTotalQuantity = (state: RootState) =>
  state.cart.items.reduce((total: number, item: any) => total + item.quantity, 0);

// 🔥 Get total price (for checkout page)
export const selectCartTotalPrice = (state: RootState) =>
  state.cart.items.reduce(
    (total: number, item: any) => total + item.price * item.quantity,
    0
  );