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

- ✅ The browser's API address is resolved in one place: `lib/apiBase.ts`
- ✅ `NEXT_PUBLIC_API_URL` must be a **public** address (e.g. `https://api.luvanaparis.com`) — it is compiled into the browser bundle and used as-is on every visitor's device
- ✅ A `localhost` value is never sent to browsers (it would point at each visitor's own machine); they call `/api` on the storefront's host instead, which `next.config.ts` forwards to `API_URL`
- ✅ Without either variable, a production build proxies `/api` to `https://api.luvanaparis.com`

### Local Development:

Create `.env.local` (or use `.env`) with the address of the API **as seen from the machine running `npm run dev`**:
```
API_URL=http://localhost:8000
```

Do not set `NEXT_PUBLIC_API_URL` for local development. Browsers — including phones and other laptops opening `http://<your-computer-ip>:4000` — call `/api` on the storefront, and the dev server forwards to `API_URL`.

### Testing Before Deployment:

Test with your production API URL locally:
```bash
NEXT_PUBLIC_API_URL=https://your-backend-api.com npm run dev
```

### Files Updated:

Every API call builds its URL from `API_BASE_URL` in `lib/apiBase.ts` — directly, or through the shared axios client (`lib/axios.ts`) or the shared home-data fetch (`lib/homeData.ts`). Do not read `process.env.NEXT_PUBLIC_API_URL` anywhere else. The `/api` proxy is configured in `next.config.ts`.

### Troubleshooting:

**Issue:** API calls fail after deployment

**Solution:** 
1. Check Vercel environment variables are set correctly
2. Ensure your backend API is accessible from the internet
3. Check CORS settings on your backend to allow requests from your Vercel domain
4. Verify the backend URL doesn't have a trailing slash

**Issue:** Works on the computer running the servers, but not from a phone or another laptop

**Solution:** A `localhost` API address was being compiled into the browser bundle, so other devices called themselves. Use `API_URL=http://localhost:8000` (server-side) and leave `NEXT_PUBLIC_API_URL` unset locally, then restart `npm run dev`.

**Issue:** Works locally but not on Vercel

**Solution:**
1. Make sure you've set `NEXT_PUBLIC_API_URL` in Vercel dashboard
2. Redeploy after adding environment variables
3. Check Vercel deployment logs for errors
