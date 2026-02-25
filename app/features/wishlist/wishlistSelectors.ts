import { RootState } from "@/redux/store";

export const selectWishlistItems = (state: RootState) =>
  state.wishlist.items;

export const selectWishlistLoading = (state: RootState) =>
  state.wishlist.loading;

export const selectWishlistError = (state: RootState) =>
  state.wishlist.error;

export const selectWishlistCount = (state: RootState) =>
  state.wishlist.items.length;