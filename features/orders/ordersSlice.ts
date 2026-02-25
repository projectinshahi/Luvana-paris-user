import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface Order {
  id: string;
  date: string;
  status: "delivered" | "shipped" | "processing" | "cancelled";
  total: number;
  items: OrderItem[];
}

interface OrdersState {
  orders: Order[];
  loading: boolean;
}

const initialState: OrdersState = {
  orders: [],
  loading: false,
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setOrders: (state, action: PayloadAction<Order[]>) => {
      state.orders = action.payload;
    },
    addOrder: (state, action: PayloadAction<Order>) => {
      state.orders.unshift(action.payload);
    },
    updateOrderStatus: (
      state,
      action: PayloadAction<{
        id: string;
        status: "delivered" | "shipped" | "processing" | "cancelled";
      }>
    ) => {
      const order = state.orders.find(
        (order) => order.id === action.payload.id
      );
      if (order) {
        order.status = action.payload.status;
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setOrders, addOrder, updateOrderStatus, setLoading } =
  ordersSlice.actions;
export const orderReducer = ordersSlice.reducer;
