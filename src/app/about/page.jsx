"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";
import Footer from "@/components/Footer";

// Lazy load heavy components
const MissionVisionValues = dynamic(
  () => import("@/components/about/MissionVisionValues"),
  {
    loading: () => <div className="min-h-[600px] bg-white animate-pulse" />,
    ssr: false,
  },
);

const WhyChooseTechBiz = dynamic(
  () => import("@/components/about/WhyChooseUS"),
  {
    loading: () => <div className="min-h-[400px] bg-gray-50 animate-pulse" />,
    ssr: false,
  },
);

const JourneyCarousel = dynamic(
  () => import("@/components/about/JourneyFeature"),
  {
    loading: () => <div className="min-h-[600px] bg-gray-100 animate-pulse" />,
    ssr: false,
  },
);

export default function AboutPage() {
  return (
    <div className="w-full overflow-x-hidden">
      <div className="pt-16 pb-0 md:pt-20 md:pb-0">
        <Suspense
          fallback={<div className="min-h-[600px] bg-white animate-pulse" />}
        >
          <MissionVisionValues />
        </Suspense>
      </div>

      <Suspense
        fallback={<div className="min-h-[600px] bg-gray-100 animate-pulse" />}
      >
        <JourneyCarousel />
      </Suspense>

      <Suspense
        fallback={<div className="min-h-[400px] bg-gray-50 animate-pulse" />}
      >
        <WhyChooseTechBiz />
      </Suspense>

      <Footer />
    </div>
  );
}

// Vision & Mission (but framed through enterprise software lens — not fluff)

// Our DNA / Core Philosophy (how we think and work, not just what we do)

// Timeline / Journey (only if it visually adds — no pointless year-by-year filler)

// Our Team (Minimalist headshots or animated tiles) (only if they're key to your pitch)

// Map of Client Impact / Footprint (if global or regional operations matter)

// Why Us / Differentiation Module (as proof, not just talk)

// Call to Action — Strategy Call / Consultation (CTA baked into each section subtly)
