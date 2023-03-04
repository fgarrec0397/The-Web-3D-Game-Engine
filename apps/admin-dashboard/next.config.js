/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true,
  },
  async rewrites() {
    return [
      {
        source: '/server/:path*',
        destination: 'http://localhost:5000'
      },
      // {
      //   source: '/:path*',
      //   destination: 'http://localhost:3000/:path*'
      // },
    ]
  }
};

module.exports = nextConfig;
