# Redux Setup and Usage Guide

## ✅ Redux is now fully configured!

### 📁 Project Structure

```
app/
├── redux/
│   ├── store.ts          # Redux store configuration
│   ├── hooks.ts          # Typed Redux hooks
│   └── ReduxProvider.tsx # Redux Provider component
features/
├── auth/
│   ├── authSlice.ts      # Authentication state
│   └── index.ts
├── cart/
│   ├── cartSlice.ts      # Shopping cart state
│   └── index.ts
├── wishlist/
│   ├── wishlistSlice.ts  # Wishlist state
│   └── index.ts
└── orders/
    ├── ordersSlice.ts    # Orders state
    └── index.ts
```

## 🚀 How to Use Redux

### 1. Import the hooks

```typescript
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
```

### 2. Access Redux State

```typescript
"use client";

import { useAppSelector } from "@/app/redux/hooks";

export default function MyComponent() {
  // Access cart state
  const cartItems = useAppSelector((state) => state.cart.items);
  const totalItems = useAppSelector((state) => state.cart.totalItems);
  
  // Access auth state
  const user = useAppSelector((state) => state.auth.user);
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  
  // Access wishlist state
  const wishlistItems = useAppSelector((state) => state.wishlist.items);
  
  // Access orders state
  const orders = useAppSelector((state) => state.orders.orders);

  return (
    <div>
      <p>Cart has {totalItems} items</p>
      {isAuthenticated && <p>Welcome, {user?.name}!</p>}
    </div>
  );
}
```

### 3. Dispatch Actions

```typescript
"use client";

import { useAppDispatch } from "@/app/redux/hooks";
import { addToCart, removeFromCart } from "@/features/cart";
import { setCredentials, logout } from "@/features/auth";
import { addToWishlist } from "@/features/wishlist";

export default function MyComponent() {
  const dispatch = useAppDispatch();

  // Add item to cart
  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: 1,
        name: "Product Name",
        price: 29.99,
        quantity: 1,
        image: "/images/product.jpg",
        brand: "Brand Name",
      })
    );
  };

  // Remove from cart
  const handleRemoveFromCart = (id: number) => {
    dispatch(removeFromCart(id));
  };

  // Login
  const handleLogin = (userData: any, token: string) => {
    dispatch(
      setCredentials({
        user: userData,
        token: token,
      })
    );
  };

  // Logout
  const handleLogout = () => {
    dispatch(logout());
  };

  // Add to wishlist
  const handleAddToWishlist = (product: any) => {
    dispatch(addToWishlist(product));
  };

  return (
    <div>
      <button onClick={handleAddToCart}>Add to Cart</button>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
```

## 📦 Available Actions

### Auth Actions
- `setCredentials({ user, token })` - Login user
- `logout()` - Logout user
- `setLoading(boolean)` - Set loading state

### Cart Actions
- `addToCart(item)` - Add item to cart
- `removeFromCart(id)` - Remove item from cart
- `updateQuantity({ id, quantity })` - Update item quantity
- `clearCart()` - Clear entire cart

### Wishlist Actions
- `addToWishlist(item)` - Add item to wishlist
- `removeFromWishlist(id)` - Remove item from wishlist
- `clearWishlist()` - Clear entire wishlist

### Orders Actions
- `setOrders(orders)` - Set all orders
- `addOrder(order)` - Add new order
- `updateOrderStatus({ id, status })` - Update order status
- `setLoading(boolean)` - Set loading state

## 🎯 Example Component

See `components/ReduxExample.tsx` for a complete working example!

## 💡 Tips

1. **Always use typed hooks**: Use `useAppDispatch` and `useAppSelector` instead of plain `useDispatch` and `useSelector`
2. **Client components only**: Redux hooks only work in client components (add `"use client"` at the top)
3. **State persistence**: Consider adding redux-persist if you want to save state to localStorage
4. **Async actions**: Use Redux Toolkit's `createAsyncThunk` for API calls

## 🔧 Troubleshooting

If you get errors:
1. Make sure your component has `"use client"` at the top
2. Check that you're using `useAppDispatch` and `useAppSelector` (not the plain versions)
3. Verify the Redux Provider is in your layout.tsx
4. Check that all feature slices are properly exported

## 📚 Learn More

- [Redux Toolkit Documentation](https://redux-toolkit.js.org/)
- [React-Redux Hooks](https://react-redux.js.org/api/hooks)
