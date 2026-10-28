// Server-only — uses the absolute backend URL, not the /api browser proxy.
// Import only in Server Components or server-side utilities.

const serverApiUrl = (): string => {
  const raw =
    process.env.API_URL ||
    process.env.NEXT_PUBLIC_API_URL ||
    (process.env.NODE_ENV === "production"
      ? "https://api.luvanaparis.com"
      : "http://localhost:8000");
  return raw.replace(/\/+$/, "");
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function fetchHomeData(): Promise<any | null> {
  try {
    const res = await fetch(`${serverApiUrl()}/user/home`, {
      next: { revalidate: 300 }, // 5-minute ISR: public, non-personalized data
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    // Backend unavailable at render time → components fall back to client-side fetch
    return null;
  }
}
