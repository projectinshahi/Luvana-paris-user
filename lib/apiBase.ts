// The API base URL as the BROWSER must use it.
//
// NEXT_PUBLIC_API_URL is compiled into the client bundle, so it has to mean the
// same thing on every visitor's device. A public address (production:
// https://api.luvanaparis.com) does, and is called directly. A loopback address
// such as http://localhost:8000 does not — on any device but the one running the
// API it points at the visitor's own machine, and every request fails. Unset or
// loopback, the browser calls /api on the storefront's own host instead, which
// next.config.ts forwards to the API from the server, where localhost is right.
//
// Browser-only: every API call in this app runs in an effect or event handler.
// A server-side caller would need the absolute API_URL, not this.
const LOOPBACK_HOST =
  /^(localhost|.+\.localhost|127(\.\d{1,3}){3}|\[::1\]|0\.0\.0\.0)$/i;

const resolveApiBase = (configured: string | undefined): string => {
  const value = configured?.trim().replace(/\/+$/, "");
  if (!value) return "/api";
  try {
    if (LOOPBACK_HOST.test(new URL(value).hostname)) return "/api";
  } catch {
    // Not an absolute URL (a same-origin path) — already device-independent.
  }
  return value;
};

export const API_BASE_URL = resolveApiBase(process.env.NEXT_PUBLIC_API_URL);
