/** @type {import('next').NextConfig} */
import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true'
});

const nextConfig = {
  // Image optimization
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Enable compression
  compress: true,
  
  // Performance optimizations
  experimental: {
    optimizePackageImports: ['framer-motion', '@mui/material', '@mui/icons-material', 'lucide-react']
  },

  // Security headers
  async headers() {
    const securityHeaders = [
      {
        key: 'X-DNS-Prefetch-Control',
        value: 'on'
      },
      {
        key: 'Strict-Transport-Security',
        value: 'max-age=63072000; includeSubDomains; preload'
      },
      {
        key: 'X-Frame-Options',
        value: 'DENY'
      },
      {
        key: 'X-Content-Type-Options',
        value: 'nosniff'
      },
      {
        key: 'Referrer-Policy',
        value: 'strict-origin-when-cross-origin'
      },
      {
        key: 'Permissions-Policy',
        value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), magnetometer=(), gyroscope=()'
      },
      {
        key: 'Content-Security-Policy',
        value: [
          "default-src 'self'",
          "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://assets.calendly.com https://www.googletagmanager.com",
          "style-src 'self' 'unsafe-inline' https://assets.calendly.com https://fonts.googleapis.com",
          "img-src 'self' data: https: blob:",
          "font-src 'self' https://fonts.gstatic.com https://assets.calendly.com",
          "connect-src 'self' https://api.calendly.com https://www.google-analytics.com",
          "frame-src 'self' https://calendly.com https://www.google.com https://maps.google.com",
          "media-src 'self' data: blob:",
          "object-src 'none'",
          "base-uri 'self'",
          "form-action 'self'",
          "frame-ancestors 'none'",
        ].join('; ')
      }
    ];

    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      }
    ];
  }
};

export default withBundleAnalyzer(nextConfig);