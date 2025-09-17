"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";
// Removed MUI components to use Tailwind spacing
import { ACCENT } from '@/styles/theme';

const logos = [
  "/logos/imgi_21_KFM.webp",
  "/logos/imgi_23_KPA.webp",
  "/logos/tma.webp",
  "/logos/invest.webp",
  "/logos/imgi_24_MCG.webp",
  "/logos/imgi_28_NFT.webp",
  "/logos/imgi_29_GL-transformed.webp",
  "/logos/imgi_30_NTSA.webp",
  "/logos/imgi_31_POR.webp",
  "/logos/imgi_33_VIPINGO.webp",
];

/** Make a readable alt from filename */
function makeAlt(src) {
  try {
    const name = src.split("/").pop()?.replace(/\.(webp|png|jpg|jpeg|svg)$/i, "") ?? "logo";
    return name.replace(/[_-]+/g, " ");
  } catch {
    return "client logo";
  }
}

export default function LogoMarquee({
  className = "",
  style = {},
  fade = true,
  speed = 32, // seconds for one full loop
}) {
  const shouldReduceMotion = useReducedMotion();
  const [isPaused, setPaused] = useState(false);

  // duplicate logos for seamless scroll
  const sequence = [...logos, ...logos];

  const handleEnter = () => setPaused(true);
  const handleLeave = () => setPaused(false);
  const handleFocus = () => setPaused(true);
  const handleBlur = () => setPaused(false);

  // If reduced motion is requested, we don't animate.
  const animationStyle = shouldReduceMotion
    ? { animationPlayState: "paused" }
    : { animationDuration: `${speed}s` };

  return (
    <section
      aria-label="Trusted by customers"
      className={`relative w-full mb-10 overflow-hidden ${className}`}
      style={style}
    >
      <div className="text-center mb-4 md:mb-6 mt-4 md:mt-6">
        <p className="font-inter text-xs md:text-sm font-bold tracking-wider uppercase text-[#0f4c81] text-center">
          Trusted by Leading Brands and Organizations.
        </p>
      </div>

      {/* marquee viewport */}
      <div
        className="relative w-full flex items-center"
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        onFocus={handleFocus}
        onBlur={handleBlur}
      >
        {/* marquee content (duplicated list) */}
        <ul
          className={`marquee flex gap-6 md:gap-10 items-center`}
          // paused when either user paused (hover/focus) or reduced motion
          style={{
            ...(isPaused ? { animationPlayState: "paused" } : {}),
            ...animationStyle,
          }}
        >
          {sequence.map((logoSrc, idx) => (
            <li
              key={`${logoSrc}-${idx}`}
              className="logo-box shrink-0 flex items-center justify-center"
              // allow keyboard focus to pause animation for keyboard users
              tabIndex={0}
              onFocus={handleFocus}
              onBlur={handleBlur}
              aria-hidden={idx >= logos.length ? true : false} // duplicates hidden for screen readers
            >
              <div className="relative w-20 h-12 sm:w-24 sm:h-14 md:w-28 md:h-16">
                <Image
                  src={logoSrc}
                  alt={makeAlt(logoSrc)}
                  fill
                  className="object-contain opacity-85 transition-transform duration-300 ease-out hover:scale-105"
                  sizes="(max-width: 640px) 56px, (max-width: 1024px) 72px, 96px"
                  loading={idx < logos.length ? 'eager' : 'lazy'}
                  priority={idx < logos.length}
                />
              </div>
            </li>
          ))}
        </ul>

        {/* gradient overlays - visual only */}
        {fade && (
          <>
            <div className="pointer-events-none absolute left-0 top-0 h-full w-20 md:w-24 bg-gradient-to-r from-white/95 via-white/70 to-transparent z-20" />
            <div className="pointer-events-none absolute right-0 top-0 h-full w-20 md:w-24 bg-gradient-to-l from-white/95 via-white/70 to-transparent z-20" />
          </>
        )}
      </div>
    </section>
  );
}
