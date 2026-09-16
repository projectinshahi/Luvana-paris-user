import type { NextConfig } from "next";

// Where the API lives, as seen from the machine running THIS server (server-only,
// never shipped to the browser). A localhost NEXT_PUBLIC_API_URL is correct here
// even though browsers ignore it, so it is honoured as the proxy target. Unset,
// development uses the local API and production keeps the public API the client
// code has always fallen back to.
const API_URL = (
  process.env.API_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  (process.env.NODE_ENV === "production" ? "https://api.luvanaparis.com" : "http://localhost:8000")
).replace(/\/+$/, "");

const nextConfig: NextConfig = {
  /* config options here */
//   images: {
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "static.vecteezy.com",
//       },
//       {
//         protocol: "https",
//         hostname: "img.freepik.com",
//       },
//       { 
//         protocol: "https", 
//         hostname: "www.shutterstock.com" 
//       },
//        {
//         protocol: "https",
//         hostname: "www.jovees.com",
//       },
//        {
//         protocol: "https",
//         hostname: "healthstores.in",
//       },
//       { protocol: "https", hostname: "assets.myntassets.com" },
//        { protocol: "https", hostname: "cdn.thewirecutter.com" },
//        { protocol: "https", hostname: "m.media-amazon.com" },
//       { protocol: "https", hostname: "svashudhi.com" },
//       {
//     protocol: 'https',
//     hostname: 'images.unsplash.com',
//     pathname: '/photo-**'},  
//   {
//     protocol: 'https',
//     hostname: 'your-domain.com',
//     pathname: '/images/**',
//   },
//     ],
//   },
  
//   reactCompiler: true,
// };

// export default nextConfig;

// Drop console.* from the production bundle (keep error/warn for real diagnostics).
  compiler: {
    removeConsole:
      process.env.NODE_ENV === "production"
        ? { exclude: ["error", "warn"] }
        : false,
  },

  images: {
    // Serve AVIF (then WebP) — smaller than JPEG/PNG at equal quality.
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" }, // all Cloudinary-hosted images
      { protocol: "https", hostname: "object.pixocial.com" }, // a few product images
    ],
  },

  reactCompiler: true,

  // Browsers call /api/* on whatever host they loaded the storefront from and this
  // server forwards to the API — see lib/apiBase.ts. This is what lets a phone or
  // another laptop on the network use a storefront whose API is on localhost.
  async rewrites() {
    return [{ source: "/api/:path*", destination: `${API_URL}/:path*` }];
  },
};

export default nextConfig;
