# Deployment Guide for Vercel

## Environment Variables Setup

When deploying to Vercel, you MUST set the environment variable for the API URL.

### Steps to Configure on Vercel:

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add the following variable:

   **Key:** `NEXT_PUBLIC_API_URL`
   
   **Value:** Your backend API URL (e.g., `https://your-backend-api.com`)
   
   **Environments:** Select all (Production, Preview, Development)

4. Click **Save**
5. Redeploy your application

### Important Notes:

- ✅ All API calls now use `process.env.NEXT_PUBLIC_API_URL`
- ✅ Falls back to `http://localhost:8000` for local development
- ✅ The `NEXT_PUBLIC_` prefix is required for client-side access in Next.js
- ⚠️ Without this variable, the app will try to connect to localhost (which won't work in production)

### Local Development:

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Update the value if your backend runs on a different port:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:YOUR_PORT
   ```

### Testing Before Deployment:

Test with your production API URL locally:
```bash
NEXT_PUBLIC_API_URL=https://your-backend-api.com npm run dev
```

### Files Updated:

All hardcoded `http://localhost:8000` URLs have been replaced with environment variables in:

- ✅ `lib/axios.ts` - Main API client
- ✅ `app/features/auth/authThunks.ts` - Authentication
- ✅ `app/features/wishlist/wishlistThunks.ts` - Wishlist
- ✅ `components/Navbar.tsx` - Promotion strip
- ✅ `components/SearchSidebar.tsx` - Product search
- ✅ `components/BestSellers.tsx` - Featured products
- ✅ `components/ExploreBrandsSection.tsx` - Brands
- ✅ `components/ExploreMoreSection.tsx` - Categories
- ✅ `components/ImageSection.tsx` - Home data
- ✅ `components/Categorybar.tsx` - Categories
- ✅ `app/brands/page.tsx` - Products listing
- ✅ `app/brands/[id]/page.tsx` - Product details

### Troubleshooting:

**Issue:** API calls fail after deployment

**Solution:** 
1. Check Vercel environment variables are set correctly
2. Ensure your backend API is accessible from the internet
3. Check CORS settings on your backend to allow requests from your Vercel domain
4. Verify the backend URL doesn't have a trailing slash

**Issue:** Works locally but not on Vercel

**Solution:**
1. Make sure you've set `NEXT_PUBLIC_API_URL` in Vercel dashboard
2. Redeploy after adding environment variables
3. Check Vercel deployment logs for errors
