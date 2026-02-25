import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "@/app/features/auth";
import { cartReducer } from "@/app/features/cart";
import { wishlistReducer } from "@/app/features/wishlist";
import { orderReducer } from "@/app/features/orders";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    orders: orderReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
