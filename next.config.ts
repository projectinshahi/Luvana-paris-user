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
      { protocol: "https", hostname: "www.shutterstock.com" },
    ],
  },
  
  reactCompiler: true,
};

export default nextConfig;
