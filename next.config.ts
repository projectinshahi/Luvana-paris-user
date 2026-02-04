import type { NextConfig } from "next";
const { i18n } = require('./next-i18next.config');

const nextConfig: NextConfig = {
  /* config options here */
  i18n,
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
