import type { NextConfig } from "next";

const nextConfig: NextConfig = {
images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com', // Replace with the actual image domain
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
