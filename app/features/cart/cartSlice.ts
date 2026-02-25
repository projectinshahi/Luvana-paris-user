import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartState, CartItem } from "./cartTypes";
import { fetchCart, addToCartDB, removeFromCartDB } from "./cartThunks";

const initialState: CartState = {
  items: [],
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // 🔥 Local Add (for guest users)
    addToCartLocal: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },

    // 🔥 Local Remove
    removeFromCartLocal: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(
        (item) => item.id !== action.payload
      );
    },

    // 🔥 Update Quantity
    updateQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) => {
      const item = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (item) {
        item.quantity = action.payload.quantity;
      }
    },

    // 🔥 Clear Cart
    clearCart: (state) => {
      state.items = [];
    },
  },

  extraReducers: (builder) => {
    builder

      // 🔥 FETCH CART FROM DB
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // 🔥 ADD TO CART (DB)
      .addCase(addToCartDB.fulfilled, (state, action) => {
        state.items = action.payload;
      })

      // 🔥 REMOVE FROM CART (DB)
      .addCase(removeFromCartDB.fulfilled, (state, action) => {
        state.items = action.payload;
      });
  },
});

export const {
  addToCartLocal,
  removeFromCartLocal,
  updateQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;