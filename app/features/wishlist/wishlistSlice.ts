import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WishlistState, WishlistItem } from "./wishlistTypes";
import {
  fetchWishlist,
  addToWishlistDB,
  removeFromWishlistDB,
} from "./wishlistThunks";

const initialState: WishlistState = {
  items: [],
  loading: false,
  error: null,
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    // 🔥 Local Add (Guest)
    addToWishlistLocal: (state, action: PayloadAction<WishlistItem>) => {
      const exists = state.items.find(
        (item) => item.productId === action.payload.productId
      );

      if (!exists) {
        state.items.push(action.payload);
      }
    },

    // 🔥 Local Remove (Guest)
    removeFromWishlistLocal: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(
        (item) => item.productId !== action.payload
      );
    },

    clearWishlist: (state) => {
      state.items = [];
    },
  },

  extraReducers: (builder) => {
    builder

      // 🔥 FETCH
      .addCase(fetchWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // 🔥 ADD
      .addCase(addToWishlistDB.fulfilled, (state, action) => {
        state.items = action.payload;
      })

      // 🔥 REMOVE
      .addCase(removeFromWishlistDB.fulfilled, (state, action) => {
        state.items = action.payload;
      });
  },
});

export const {
  addToWishlistLocal,
  removeFromWishlistLocal,
  clearWishlist,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;