/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: {
      displayName: true,
      ssr: false,
      fileName: false,
    },
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
};

module.exports = nextConfig;
