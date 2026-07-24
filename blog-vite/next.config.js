/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone',
  async headers() {
    return [
      {
        source: '/micro-fe/blazor/_framework/:path(.+\\.wasm)',
        headers: [
          { key: 'Content-Type', value: 'application/wasm' },
        ],
      },
    ];
  },
  async rewrites() {
    // Radar Przetargowy: SPA woła /radar/api/* (same-origin), Next przekazuje server-side
    // przez prywatną sieć VCN do backendu FastAPI na A1.Flex (10.0.0.243:8000).
    return [
      {
        source: '/radar/api/:path*',
        destination: 'http://10.0.0.243:8000/api/:path*',
      },
    ];
  },
}

module.exports = nextConfig
