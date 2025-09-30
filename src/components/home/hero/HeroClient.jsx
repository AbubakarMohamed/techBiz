"use client";

import React from "react";
import dynamic from "next/dynamic";
import { useReducedMotion } from "framer-motion";

const AnimatedScrollIndicator = dynamic(
  () => import("../AnimatedScrollIndicator"),
  { ssr: false, loading: () => null },
);

export default function HeroClient({
  heroId = "site-hero",
  showScrollIndicator = true,
}) {
  const prefersReduced = useReducedMotion();

  return (
    <div
      id={`${heroId}-interactive`}
      aria-hidden={false}
      style={{ width: "100%", height: "100%", pointerEvents: "none" }}
    >
      {/* show scroll indicator only when not reduced motion and when allowed */}
      {showScrollIndicator && !prefersReduced ? (
        <AnimatedScrollIndicator />
      ) : null}
    </div>
  );
}
