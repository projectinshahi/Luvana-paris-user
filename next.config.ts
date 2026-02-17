import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
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
        hostname: "www.shutterstock.com" 
      },
       {
        protocol: "https",
        hostname: "www.jovees.com",
      },
       {
        protocol: "https",
        hostname: "healthstores.in",
      },
      { protocol: "https", hostname: "assets.myntassets.com" },
       { protocol: "https", hostname: "cdn.thewirecutter.com" },
       { protocol: "https", hostname: "m.media-amazon.com" },
      { protocol: "https", hostname: "svashudhi.com" },
    ],
  },
  
  reactCompiler: true,
};

export default nextConfig;
