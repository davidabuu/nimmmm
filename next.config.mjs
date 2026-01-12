/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "nim.ng",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
