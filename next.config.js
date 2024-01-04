/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/uploads/**",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "1337",
        pathname: "/uploads/**",
      },
      // {
      //   protocol: "http",
      //   hostname: process.env.STRAPI_IP,
      //   pathname: "/uploads/**",
      // },
      // {
      //   protocol: "https",
      //   hostname: process.env.STRAPI_IP,
      //   pathname: "/uploads/**",
      // },
    ],
  },
};

module.exports = nextConfig;
