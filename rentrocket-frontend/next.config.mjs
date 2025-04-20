/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'backend.lockshield.online',
        pathname: '/**',
      },
    ],
  },
  // i18n: {
  //   // Список поддерживаемых локалей
  //   locales: ['en', 'ru'],
  //   // Локаль по умолчанию
  //   defaultLocale: 'en',
  // },
}

export default nextConfig;