"use client";

import React, { useState } from "react";
import { Rocket, Shield, TrendingUp, Zap, Sparkles } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";

/* --- tokens & data (lifted out of component) --- */
const TOKENS = {
  navy: "#0f4c81",
  blue: "#2563eb",
  emerald: "#059669",
  violet: "#7c3aed",
  ink: "#0b1720",
  muted: "#6b7280",
};

const FEATURES = [
  {
    number: "01",
    title: "Solutions That Feel Built Just for Them",
    subtitle: "Tailored Digital Solutions",
    benefits: [
      "Our clients don’t get off-the-shelf tools. They get digital solutions that fit seamlessly into their workflows and solve their exact challenges.",
    ],
    icon: Rocket,
    color: TOKENS.navy,
    tint: "rgba(15,76,129,0.06)",
  },
  {
    number: "02",
    title: "A Partnership, Not Just a Project",
    subtitle: "Long-Term Partnership Support",
    benefits: [
      "From kickoff to long after launch, clients experience a team that listens, adapts, and stays committed to their success.",
    ],
    icon: Shield,
    color: TOKENS.navy,
    tint: "rgba(15,76,129,0.06)",
  },
  {
    number: "03",
    title: "Growth Without Roadblocks",
    subtitle: "Scalable System Architecture",
    benefits: [
      "Businesses tell us they appreciate how our systems scale with them, eliminating the fear of outgrowing their technology.",
    ],
    icon: TrendingUp,
    color: TOKENS.navy,
    tint: "rgba(15,76,129,0.06)",
  },
  {
    number: "04",
    title: "Clarity Instead of Complexity",
    subtitle: "Transparent Communication Process",
    benefits: [
      "Clients value our transparent process, plain-language updates, and ability to make technology feel simple, not overwhelming.",
    ],
    icon: Zap,
    color: TOKENS.navy,
    tint: "rgba(15,76,129,0.06)",
  },
];

/* --- motion variants --- */
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: "easeOut" },
  },
};
const cardHoverVariants = {
  hover: {
    y: -2,
    scale: 1.03,
    transition: { type: "spring", damping: 26, stiffness: 200 },
  },
};
const detailsVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.28, type: "spring", damping: 20 },
  },
};

export default function FeaturesSection() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const shouldReduceMotion = useReducedMotion();

  return (
    <Section background="white" padding="small" id="capabilities">
      {/* subtle noise background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            backgroundSize: "128px 128px",
          }}
        />
        <div
          className="absolute top-0 right-0 w-64 h-64 rounded-full transform translate-x-1/3 -translate-y-1/3 opacity-30"
          style={{
            background:
              "linear-gradient(180deg, rgba(15,76,129,0.03), rgba(15,76,129,0.01))",
          }}
        />
      </div>

      <SectionHeader
        title="What Our Clients Experience"
        subtitle="When organizations partner with Techbiz, they often tell us the same thing: it feels different. Here's what our clients actually experience:"
        badgeIcon={Sparkles}
      />

      {/* grid */}
      <motion.div
        initial="hidden"
        whileInView={shouldReduceMotion ? {} : "visible"}
        variants={containerVariants}
        viewport={{ once: true, amount: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-2 auto-rows-fr"
      >
        {FEATURES.map((feature, idx) => {
          const isHovered = hoveredIndex === idx;
          const Icon = feature.icon;
          const headingId = `feature-${idx}-title`;

          return (
            <motion.article
              key={feature.number}
              variants={itemVariants}
              whileHover={shouldReduceMotion ? {} : "hover"}
              variantsProp={itemVariants}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              onFocus={() => setHoveredIndex(idx)}
              onBlur={() => setHoveredIndex(null)}
              tabIndex={0}
              aria-labelledby={headingId}
              className="group relative focus:outline-none rounded-2xl"
            >
              <motion.div
                variants={cardHoverVariants}
                className="relative h-full p-5 rounded-2xl border transition-all duration-300 ease-out cursor-default flex flex-col overflow-hidden"
                style={{
                  background: feature.tint,
                  borderColor: isHovered
                    ? "rgba(15,76,129,0.12)"
                    : "rgba(11,22,33,0.06)",
                  boxShadow: isHovered
                    ? "0 8px 32px rgba(15,76,129,0.08)"
                    : "0 2px 12px rgba(2,6,23,0.04)",
                }}
              >
                {/* subtle card noise texture */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-[0.02]"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 128 128' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='cardNoise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23cardNoise)'/%3E%3C/svg%3E")`,
                    backgroundSize: "64px 64px",
                  }}
                />
                {/* number */}
                <div
                  className="absolute top-4 left-4 text-sm font-medium"
                  style={{ color: TOKENS.muted }}
                >
                  {feature.number}
                </div>

                {/* icon */}
                <motion.div
                  className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center overflow-hidden"
                  animate={isHovered ? { scale: 1.08 } : { scale: 1 }}
                  transition={{ duration: 0.2, type: "spring", damping: 20 }}
                  style={{
                    background: `linear-gradient(135deg, ${feature.color}, ${feature.color}dd)`,
                    boxShadow: isHovered
                      ? "0 4px 16px rgba(15,76,129,0.25)"
                      : "0 2px 8px rgba(15,76,129,0.15)",
                  }}
                  aria-hidden="true"
                >
                  {/* subtle icon noise */}
                  <div
                    className="absolute inset-0 opacity-[0.08]"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 64 64' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='iconNoise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='2' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23iconNoise)'/%3E%3C/svg%3E")`,
                      backgroundSize: "32px 32px",
                      mixBlendMode: "overlay",
                    }}
                  />
                  <Icon size={18} strokeWidth={1.8} color="#ffffff" />
                </motion.div>

                {/* content */}
                <div className="mt-16 flex-1 flex flex-col">
                  {/* Title section - fixed height */}
                  <div className="flex-shrink-0">
                    <h3
                      id={headingId}
                      className="text-lg font-semibold text-slate-900 mb-3 tracking-tight h-14 flex items-start"
                    >
                      {feature.title}
                    </h3>

                    {/* accent line - between title and description */}
                    <div
                      className="h-0.5 rounded-full transition-all duration-200 mb-4"
                      style={{
                        background: feature.color,
                        width: isHovered ? "100%" : "32px",
                      }}
                    />
                  </div>

                  {/* Description section - takes remaining space */}
                  <div className="flex-1">
                    <motion.div
                      initial="visible"
                      animate={isHovered ? "visible" : "visible"}
                      variants={detailsVariants}
                    >
                      <ul className="text-slate-600 text-sm leading-relaxed space-y-3">
                        {feature.benefits.map((benefit, benefitIndex) => (
                          <li
                            key={benefitIndex}
                            className="flex items-start gap-3"
                          >
                            <span className="leading-relaxed text-justify">
                              {benefit}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </motion.article>
          );
        })}
      </motion.div>
    </Section>
  );
}
