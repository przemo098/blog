/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone',
  // Deterministyczne, jednowątkowe "Collecting page data" — obejście flaky bugu
  // Next 14 (PageNotFoundError / ciche pomijanie chunków w buildzie standalone).
  experimental: {
    workerThreads: false,
    cpus: 1,
  },
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
  webpack(config, { dev }) {
    if (dev) {
      // Aplikacje MFE (Angular/Vue/Blazor) generują dziesiątki tysięcy plików w
      // apps/*/{obj,bin,.angular,node_modules,dist}. Bez tego Next dev próbuje je
      // obserwować i przekracza systemowy limit inotify (ENOSPC) → webpack nie
      // kompiluje, strony zwracają 500. Ignorujemy je w trybie watch.
      config.watchOptions = {
        ...config.watchOptions,
        ignored: [
          '**/node_modules/**',
          '**/.next/**',
          '**/src/features/MicroFePage/apps/**',
        ],
      };
    }
    return config;
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
