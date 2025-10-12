import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    devtoolSegmentExplorer: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "egeac.pt",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "agendaculturalporto.org",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.cm-faro.pt",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
