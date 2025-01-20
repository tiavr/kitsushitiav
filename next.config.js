/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    experimental: {
      // Correction de la configuration turbo
      appDir: true,
    },
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: '**',
        },
      ],
      unoptimized: true,
    },
    webpack: (config) => {
      config.module.rules.push({
        test: /\.(mp3)$/,
        type: 'asset/resource',
        generator: {
          filename: 'static/media/[name][ext]'
        }
      });
      return config;
    },
  }
  
  module.exports = nextConfig