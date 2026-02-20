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

images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "static.vecteezy.com",
      },
      {
        protocol: "https",
        hostname: "img.freepik.com",
      },
      {
        protocol: "https",
        hostname: "www.shutterstock.com",
      },
      {
        protocol: "https",
        hostname: "www.jovees.com",
      },
      {
        protocol: "https",
        hostname: "healthstores.in",
      },
      {
        protocol: "https",
        hostname: "assets.myntassets.com",
      },
      {
        protocol: "https",
        hostname: "cdn.thewirecutter.com",
      },
      {
        protocol: "https",
        hostname: "m.media-amazon.com",
      },
      {
        protocol: "https",
        hostname: "svashudhi.com",
      },
      {
  protocol: "https",
  hostname: "**",  // ← allows ALL https domains (dev only!)
},
      {
        protocol: "https",
        hostname: "images.unsplash.com",   // ← keep this
        // Remove or change pathname to allow everything (including query params)
        // pathname: '/**',                // ← this is the correct way
      },
     {
        protocol: "https",
        hostname: "media.gettyimages.com",
      },
      // Optional: also allow the main domain if you use preview/thumbnail links from there
      {
        protocol: "https",
        hostname: "www.gettyimages.com",
      },
    ],
  },

  reactCompiler: true,
};

export default nextConfig;
