"use client";

import React, { useState } from "react";
import { Rocket, Shield, TrendingUp, Zap, Sparkles } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";

/* --- tokens & data --- */
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
    color: TOKENS.blue,
  },
  {
    number: "02",
    title: "A Partnership, Not Just a Project",
    subtitle: "Long-Term Partnership Support",
    benefits: [
      "From kickoff to long after launch, clients experience a team that listens, adapts, and stays committed to their success.",
    ],
    icon: Shield,
    color: TOKENS.emerald,
  },
  {
    number: "03",
    title: "Growth Without Roadblocks",
    subtitle: "Scalable System Architecture",
    benefits: [
      "Businesses tell us they appreciate how our systems scale with them, eliminating the fear of outgrowing their technology.",
    ],
    icon: TrendingUp,
    color: TOKENS.violet,
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
  },
];

/* --- motion variants --- */
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.4 }, // slower reveal
  },
};
const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

export default function FeaturesSection() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const shouldReduceMotion = useReducedMotion();

  return (
    <Section background="white" padding="large" id="capabilities">
      <SectionHeader
        title="What Our Clients Experience"
        subtitle="When organizations partner with Techbiz, it feels different. Here’s what clients actually experience:"
        badgeIcon={Sparkles}
      />

      <motion.div
        initial="hidden"
        whileInView={shouldReduceMotion ? {} : "visible"}
        variants={containerVariants}
        viewport={{ once: true, amount: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-8"
      >
        {FEATURES.map((feature, idx) => {
          const isHovered = hoveredIndex === idx;
          const Icon = feature.icon;

          return (
            <motion.article
              key={feature.number}
              variants={itemVariants}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              tabIndex={0}
              className="group relative rounded-2xl bg-white border border-slate-200 p-6 shadow-sm transition-all duration-500 hover:shadow-xl flex flex-col items-center text-center"
            >
              {/* Icon */}
              <div
                className="w-14 h-14 flex items-center justify-center rounded-full mb-2"
                style={{
                  background: `${feature.color}15`,
                }}
              >
                <Icon size={28} strokeWidth={2} color={feature.color} />
              </div>

              {/* Title */}
<h3 className="text-lg font-semibold text-slate-900 tracking-tight mb-8">
  {feature.title}
</h3>

{/* Benefit */}
<ul className="mt-4 text-slate-600 text-sm leading-relaxed space-y-1 text-left w-full">

  {feature.benefits.map((benefit, benefitIndex) => (
    <li key={benefitIndex} className="leading-relaxed">
      {benefit}
    </li>
  ))}
</ul>

            </motion.article>
          );
        })}
      </motion.div>
    </Section>
  );
}
