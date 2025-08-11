import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "example.com", // Domain chứa ảnh
        pathname: "/**", // Cho phép tất cả đường dẫn
      },
    ],
  },
};

export default nextConfig;
