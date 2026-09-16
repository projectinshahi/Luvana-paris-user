// Single shared fetch of /user/home.
// Many homepage sections need this same payload; without sharing, each one fires its own
// identical request (~7 duplicate calls on the homepage). We cache the in-flight promise
// and hand the same one to every caller, so the homepage makes ONE request.
// ponytail: session-lifetime cache, no revalidation — call refreshHome() if you need it fresh.

import { API_BASE_URL } from "@/lib/apiBase";
const API_URL = API_BASE_URL;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let homePromise: Promise<any> | null = null;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getHome(): Promise<any> {
  if (!homePromise) {
    homePromise = fetch(`${API_URL}/user/home`)
      .then((res) => {
        if (!res.ok) throw new Error(`/user/home ${res.status}`);
        return res.json();
      })
      .catch((err) => {
        homePromise = null; // don't cache a failure — let the next caller retry
        throw err;
      });
  }
  return homePromise;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function refreshHome(): Promise<any> {
  homePromise = null;
  return getHome();
}
