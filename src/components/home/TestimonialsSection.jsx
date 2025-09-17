"use client";

import { Inter } from "next/font/google";
import { useState, useEffect } from "react";
import { MessageSquareQuote } from "lucide-react";
import SectionHeader from '@/components/ui/SectionHeader';
import Section from '@/components/ui/Section';
import { ACCENT } from '@/styles/theme';

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const testimonials = [
  {
    quote:
      "Their ability to align product thinking with technical execution is unmatched.",
    client: "PACE Funding Group",
  },
  {
    quote:
      "They helped us scale quickly without compromising quality or speed.",
    client: "Altura Ventures",
  },
];

export default function ClientTestimonialSection() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Section background="gray" padding="small" id="client-testimonials-section">
      {/* Subtle SVG flow in background */}
      <div
        className="absolute -top-[6%] md:-top-[5%] -right-[12%] md:-right-[6%] w-[160%] md:w-[120%] h-[180px] md:h-[320px] pointer-events-none z-0 opacity-15 transform-gpu"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 2000 600"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full block"
        >
          <path
            d="M2000,20 C1600,90 1200,260 900,380 C650,480 300,560 0,600"
            stroke={ACCENT}
            strokeOpacity="0.12"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Radial soft backing */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(circle at 20% 78%, rgba(15,76,129,0.035), transparent 40%),
            radial-gradient(circle at 84% 22%, rgba(120,119,198,0.03), transparent 40%)
          `
        }}
      />

      <div className="relative z-10">
        <SectionHeader
          title="Trusted by forward-thinking teams"
          badgeIcon={MessageSquareQuote}
        />

        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <div className="text-center relative">
            <h5
              className="text-lg md:text-2xl font-medium text-slate-700 max-w-3xl mx-auto mb-10 text-center leading-relaxed"
              style={{ fontFamily: inter.style.fontFamily }}
            >
              "{testimonials[index].quote}"
            </h5>
            <p
              className="text-sm font-semibold mb-2"
              style={{ 
                fontFamily: inter.style.fontFamily,
                color: ACCENT 
              }}
            >
              — {testimonials[index].client}
            </p>

            {/* Simple Dots for navigation */}
            <div className="flex justify-center gap-6 mt-4">
              {testimonials.map((_, i) => (
                <div
                  key={i}
                  className="w-2.5 h-2.5 rounded-full transition-all duration-300 ease-in-out"
                  style={{
                    backgroundColor: i === index ? ACCENT : "#cbd5e1"
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}