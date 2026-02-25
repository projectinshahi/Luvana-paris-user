import { createSlice } from "@reduxjs/toolkit";
import { OrderState } from "./orderTypes";
import {
  createOrder,
  fetchUserOrders,
  fetchOrderById,
  updateOrderStatus,
} from "./orderThunks";

const initialState: OrderState = {
  orders: [],
  selectedOrder: null,
  loading: false,
  error: null,
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    clearSelectedOrder: (state) => {
      state.selectedOrder = null;
    },
  },
  extraReducers: (builder) => {
    builder

      // 🔥 FETCH USER ORDERS
      .addCase(fetchUserOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // 🔥 CREATE ORDER
      .addCase(createOrder.fulfilled, (state, action) => {
        state.orders.unshift(action.payload);
      })

      // 🔥 FETCH SINGLE ORDER
      .addCase(fetchOrderById.fulfilled, (state, action) => {
        state.selectedOrder = action.payload;
      })

      // 🔥 UPDATE STATUS
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        const index = state.orders.findIndex(
          (order) => order._id === action.payload._id
        );

        if (index !== -1) {
          state.orders[index] = action.payload;
        }

        if (state.selectedOrder?._id === action.payload._id) {
          state.selectedOrder = action.payload;
        }
      });
  },
});

export const { clearSelectedOrder } = orderSlice.actions;
export default orderSlice.reducer;