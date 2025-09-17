"use client";

import { useState } from "react";
import { Inter } from "next/font/google";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { TrendingUp } from "lucide-react";
import Section from '@/components/ui/Section';
import SectionHeader from '@/components/ui/SectionHeader';

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

import { ACCENT } from '@/styles/theme';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.66, ease: [0.25, 0.8, 0.25, 1] },
  },
};

export default function SneakPeekSection() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const stats = [
    {
      number: "20+",
      title: "Years Of Experience",
      description:
        "Two decades of proven expertise in delivering cutting-edge digital solutions.",
    },
    {
      number: "1200+",
      title: "Clients Served",
      description:
        "Trusted partnerships across industries, from startups to enterprise leaders.",
    },
    {
      number: "500+",
      title: "Projects Delivered",
      description:
        "Custom solutions deployed with precision, accountability, and measurable impact.",
    },
    {
      number: "30+",
      title: "Expert Engineers",
      description:
        "Dedicated specialists committed to excellence in every line of code.",
    },
  ];

  return (
    <Section background="white" padding="default"
      className="relative overflow-hidden"
    >
      {/* Responsive map background covering entire section */}
      <div
        className="absolute top-0 left-0 w-full h-full min-h-full pointer-events-none z-0 bg-[url('/map_(2).png')] bg-no-repeat bg-center bg-cover sm:bg-cover md:bg-contain lg:bg-cover xl:bg-cover opacity-[0.08] sm:opacity-[0.10] md:opacity-[0.12] lg:opacity-[0.12] xl:opacity-[0.14] scale-110 sm:scale-105 md:scale-100 lg:scale-100 xl:scale-100 transform-gpu origin-center bg-scroll md:bg-fixed"
        aria-hidden="true"
      />



      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          //Sneak Peek"
          title="Sneak Peek into our Innovative Journey"
          subtitle=" Proven results. Trusted partnerships. Two decades of digital
excellence."
          badgeIcon={TrendingUp}
  
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={containerVariants}
          viewport={{ once: true, amount: 0.18 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-12"
        >
          {stats.map((stat, idx) => {
            const isHovered = hoveredIndex === idx;
            return (
              <motion.div
                key={idx}
                variants={itemVariants}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                tabIndex={0}
                role="button"
                className={`
                  text-center p-4 md:p-6 rounded-3xl outline-none cursor-pointer
                  transition-all duration-[220ms] cubic-bezier-[0.2,0.9,0.3,1]
                  ${isHovered ? 'transform -translate-y-1' : ''}
                  ${isHovered ? 'shadow-[0_8px_28px_rgba(15,76,129,0.06)]' : 'shadow-[0_2px_10px_rgba(15,23,36,0.02)]'}
                  ${isHovered ? 'bg-white/98' : 'bg-transparent'}
                  border border-transparent
                  focus:shadow-[0_10px_30px_rgba(15,76,129,0.08)]
                `}
                style={{
                  borderColor: isHovered ? ACCENT : 'transparent',
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = ACCENT;
                }}
                onBlur={(e) => {
                  if (!isHovered) {
                    e.target.style.borderColor = 'transparent';
                  }
                }}
              >
                <h3
                  className="font-extrabold text-3xl md:text-4xl mb-2"
                  style={{
                    fontFamily: inter.style.fontFamily,
                    color: ACCENT
                  }}
                >
                  {
                    // parse numeric portion and suffix (e.g. "70+")
                    (() => {
                      const numMatch = String(stat.number).match(/[\d,.]+/);
                      const suffix = String(stat.number).replace(/[\d,\.\s]/g, "");
                      const value = numMatch ? Number(numMatch[0].replace(/,/g, "")) : null;
                      if (value === null || Number.isNaN(value)) return stat.number;
                      return (
                        <CountUp
                          end={value}
                          duration={1.4}
                          separator=","
                          suffix={suffix}
                          enableScrollSpy
                          scrollSpyOnce
                        />
                      );
                    })()
                  }
                </h3>
                <h6
                  className="font-bold text-gray-900 mb-2 text-xl"
                  style={{
                    fontFamily: inter.style.fontFamily,
                    color: "#0f1724"
                  }}
                >
                  {stat.title}
                </h6>
                <p
                  className="text-sm text-slate-600 leading-relaxed text-center px-1 min-h-[3rem] flex items-center justify-center"
                  style={{
                    fontFamily: inter.style.fontFamily,
                    lineHeight: '1.6'
                  }}
                >
                  {stat.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-8px) rotate(0.5deg);
          }
        }
      `}</style>
    </Section>
  );
}
