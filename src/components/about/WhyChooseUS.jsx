"use client";

import { Inter } from "next/font/google";
import { motion, useReducedMotion } from "framer-motion";
import { Clock, Users, Database, Shield, ThumbsUp, Trophy } from "lucide-react";
import Section from '@/components/ui/Section';
import SectionHeader from '@/components/ui/SectionHeader';

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const reasons = [
  {
    title: "A TEAM OF EXPERT ENGINEERS",
    description: "Our engineers make sure that the product is well designed and developed.",
    icon: Users,
  },
  {
    title: "TIMELY DELIVERY",
    description: "We deliver your solution within the agreed-upon time frame.",
    icon: Clock,
  },
  {
    title: "PROFESSIONALISM",
    description: "We provide professional services to all of our clients, whether they are small, medium, or large.",
    icon: Users,
  },
  {
    title: "DATA INTEGRITY AND SECURITY",
    description: "We make certain that your data is safe, accurate, up to date, and complete.",
    icon: Database,
  },
  {
    title: "RELIABILITY",
    description: "We ensure that your solution is up and running at all times, with minimal downtime.",
    icon: Shield,
  },
  {
    title: "100% CUSTOMER SATISFACTION",
    description: "We keep our promises.",
    icon: ThumbsUp,
  },
];

const colorPalette = [
  { bg: "#0f4c81", shadow: "rgba(15,76,129,0.18)" }, // blue
  { bg: "#E7B620", shadow: "rgba(231,182,32,0.18)" }, // yellow
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.8, 0.25, 1] },
  },
};

export default function WhyChooseTechBiz() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <Section background="white" padding="small" id="why-choose-us">
      <SectionHeader
             //Our Advantage"
             title="Why Choose Us"
             subtitle="Partner with industry leaders who transform your vision into powerful, scalable software solutions"
             badgeIcon={Trophy }
     
           />

      <motion.div
        initial="hidden"
        whileInView={shouldReduceMotion ? {} : "visible"}
        variants={containerVariants}
        viewport={{ once: true, amount: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 max-w-6xl mx-auto"
      >
        {reasons.map((reason, idx) => {
          const IconComponent = reason.icon;
          const palette = colorPalette[idx % 2];

          return (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="flex items-start gap-6 p-4 md:p-6 rounded-lg transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg hover:shadow-black/8"
            >
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center flex-shrink-0"
                style={{
                  backgroundColor: palette.bg,
                  boxShadow: `0 4px 20px ${palette.shadow}`,
                }}
              >
                <IconComponent size={32} color="#ffffff" />
              </div>

              <div className="flex-1">
                <h3
                  className="text-sm md:text-base font-bold text-gray-600 mb-2 leading-tight"
                  style={{ fontFamily: inter.style.fontFamily }}
                >
                  {reason.title}
                </h3>
                <p
                  className="text-gray-500 text-sm md:text-base leading-relaxed"
                  style={{ fontFamily: inter.style.fontFamily }}
                >
                  {reason.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </Section>
  );
}
