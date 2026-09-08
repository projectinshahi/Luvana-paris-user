import type { NextConfig } from "next";

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
};

export default nextConfig;
