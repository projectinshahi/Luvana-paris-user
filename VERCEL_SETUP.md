# 🚀 Quick Vercel Setup Guide

## For Your Friend's Laptop / New Deployment

### Step 1: Clone & Install
```bash
git clone <your-repo>
cd Luvana-paris-user
npm install
```

### Step 2: Create Local Environment File
```bash
cp .env.example .env.local
```

Edit `.env.local` and set your backend URL:
```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### Step 3: Run Locally
```bash
npm run dev
```

---

## 🌐 Deploying to Vercel

### Option A: Via Vercel Dashboard (Recommended)

1. **Push your code to GitHub/GitLab/Bitbucket**

2. **Go to [vercel.com](https://vercel.com) and login**

3. **Click "Add New Project"**

4. **Import your repository**

5. **IMPORTANT: Add Environment Variable**
   - Click on "Environment Variables" section
   - Add:
     - **Name:** `NEXT_PUBLIC_API_URL`
     - **Value:** `https://your-backend-api.com` (your production backend URL)
     - **Select:** Production, Preview, Development (all three)
   - Click "Add"

6. **Click "Deploy"**

7. **Wait for deployment to complete** ✅

### Option B: Via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Set environment variable
vercel env add NEXT_PUBLIC_API_URL
# Enter your backend URL when prompted
# Select all environments

# Redeploy
vercel --prod
```

---

## ⚠️ Common Issues & Solutions

### Issue: "Cannot connect to API" after deployment

**Cause:** Environment variable not set

**Fix:**
1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add `NEXT_PUBLIC_API_URL` with your backend URL
3. Redeploy (Settings → Deployments → Click "..." → Redeploy)

### Issue: Works on your laptop but not friend's

**Cause:** Missing `.env.local` file

**Fix:**
```bash
cp .env.example .env.local
# Edit .env.local with correct backend URL
```

### Issue: CORS errors in production

**Cause:** Backend not allowing requests from Vercel domain

**Fix:** Update backend CORS settings to allow your Vercel domain:
```javascript
// In your backend
cors({
  origin: [
    'http://localhost:3000',
    'https://your-app.vercel.app',
    'https://your-custom-domain.com'
  ]
})
```

---

## 📋 Checklist Before Deployment

- [ ] Backend API is deployed and accessible
- [ ] Backend has CORS configured for your frontend domain
- [ ] `.env.local` exists locally (for development)
- [ ] `NEXT_PUBLIC_API_URL` is set in Vercel dashboard (for production)
- [ ] All code is pushed to Git repository
- [ ] Test locally with production API URL first

---

## 🔍 Testing Production API Locally

Before deploying, test with your production backend:

```bash
NEXT_PUBLIC_API_URL=https://your-backend-api.com npm run dev
```

If this works, your Vercel deployment will work too!

---

## 📞 Need Help?

1. Check Vercel deployment logs: Dashboard → Deployments → Click on deployment → View Logs
2. Check browser console for errors (F12)
3. Verify environment variable is set: Dashboard → Settings → Environment Variables
