import { RootState } from "@/redux/store";

export const selectOrders = (state: RootState) =>
  state.orders.orders;

export const selectSelectedOrder = (state: RootState) =>
  state.orders.selectedOrder;

export const selectOrderLoading = (state: RootState) =>
  state.orders.loading;

export const selectOrderError = (state: RootState) =>
  state.orders.error;