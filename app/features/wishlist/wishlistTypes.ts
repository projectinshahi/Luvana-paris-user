export interface WishlistItem {
  productId: string;
  name: string;
  price: number;
  image?: string;
}

export interface WishlistState {
  items: WishlistItem[];
  loading: boolean;
  error: string | null;
}