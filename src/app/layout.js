import { Roboto, Inter } from "next/font/google";
import "@/styles/globals.css";
import "@/styles/performance.css";
import Providers from "./Providers";
import ScrollToHashWrapper from "@/components/ui/ScrollTohashWrapper";
import ClientLayout from "./ClientLayout";
import ErrorBoundary from "@/components/ErrorBoundary";
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-roboto",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-inter",
});

export const metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://techbiz.co.ke",
  ),
  title: {
    template: "%s | Techbiz Limited",
    default: "Techbiz Limited - Enterprise Technology Solutions in Kenya",
  },
  description:
    "Leading technology consultancy providing custom software development, system integration, ERP solutions, and digital transformation services across Kenya and Africa.",
  keywords:
    "technology solutions, software development, system integration, ERP, SAP, digital transformation, Kenya, Africa, enterprise software",
  authors: [{ name: "Techbiz Limited" }],
  creator: "Techbiz Limited",
  publisher: "Techbiz Limited",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_KE",
    url: "/",
    siteName: "Techbiz Limited",
    title: "Techbiz Limited - Enterprise Technology Solutions",
    description:
      "Leading technology consultancy providing custom software development, system integration, and digital transformation services across Kenya and Africa.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Techbiz Limited - Enterprise Technology Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Techbiz Limited - Enterprise Technology Solutions",
    description:
      "Leading technology consultancy in Kenya providing enterprise software solutions and digital transformation services.",
    images: ["/twitter-image.jpg"],
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${roboto.variable} ${inter.variable}`}>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0f4c81" />

        {/* Resource hints for external domains */}
        <link
          rel="preconnect"
          href="https://assets.calendly.com"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="https://assets.calendly.com" />
        <link
          rel="preconnect"
          href="https://calendly.com"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="https://calendly.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* Critical CSS inline */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
            @media (prefers-reduced-motion: reduce) {
              *,::before,::after {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
                scroll-behavior: auto !important;
              }
            }
            #site-hero{position:relative;width:100%;height:50vh;min-height:50vh;overflow:hidden;display:flex;align-items:center;justify-content:center;background-color:#0a0a0a}@media (min-width:768px){#site-hero{height:100vh;min-height:100vh}}
            .hero-content{position:relative;z-index:4;width:100%;height:100%;display:flex;flex-direction:column;justify-content:center;align-items:flex-start;text-align:left;padding:2rem}
            .hero-heading{margin:0;font-weight:900;color:rgba(255,255,255,1);font-size:clamp(2rem,5vw,4rem);line-height:1.1;letter-spacing:-0.02em}
            .hero-subheading{color:rgba(255,255,255,0.9);font-size:clamp(1rem,2.5vw,1.3rem);line-height:1.6;max-width:48ch;margin:1rem 0}
            .layout-stable{contain:layout style paint}
            .sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}
            .focus\\:not-sr-only:focus{position:static;width:auto;height:auto;padding:inherit;margin:inherit;overflow:visible;clip:auto;white-space:normal}
            .btn-primary{background:linear-gradient(135deg,#0f4c81 0%,#0b66a3 100%);color:white;padding:0.75rem 1.5rem;border-radius:0.5rem;font-weight:700;text-decoration:none;display:inline-flex;align-items:center;gap:0.5rem;transition:transform 0.2s ease}
            .btn-primary:hover{transform:translateY(-2px);background:linear-gradient(135deg,#0b66a3 0%,#0f4c81 100%)}
          `,
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Techbiz Limited",
              url: "https://techbiz.co.ke",
              logo: "https://techbiz.co.ke/logo.png",
              description:
                "Leading technology consultancy providing enterprise software solutions and digital transformation services across Kenya and Africa.",
              address: {
                "@type": "PostalAddress",
                addressCountry: "KE",
                addressLocality: "Nairobi",
              },
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "customer service",
                availableLanguage: ["English"],
              },
              sameAs: ["https://www.linkedin.com/company/techbiz-limited"],
            }),
          }}
        />

        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Suppress hydration warnings caused by browser extensions
              if (typeof window !== 'undefined') {
                const originalError = console.error;
                console.error = (...args) => {
                  if (args[0]?.includes?.('hydration') || args[0]?.includes?.('server rendered HTML')) {
                    return; // Suppress hydration warnings in development
                  }
                  originalError.apply(console, args);
                };
              }
            `,
          }}
        />
      </head>
      <body suppressHydrationWarning={true}>
        {/* Skip to content link for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-md focus:font-medium focus:shadow-lg focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Skip to main content
        </a>
        <ClientLayout>
          <ErrorBoundary>
            <Providers>
              <ScrollToHashWrapper />
              <main id="main-content">{children}</main>
            </Providers>
          </ErrorBoundary>
        </ClientLayout>
      </body>
    </html>
  );
}
