"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code,
  Smartphone,
  GitMerge,
  CreditCard,
  Bot,
  Phone,
} from "lucide-react";
import Image from "next/image";
import { Inter } from "next/font/google";
import { services } from "@/data/services";
import { ACCENT } from "@/styles/theme";
import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import CarouselNavigation from "@/components/ui/CarouselNavigation";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const variants = {
  enter: (direction) => ({
    x: direction > 0 ? 60 : -60,
    opacity: 0,
    scale: 0.98,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
      scale: { duration: 0.4 },
    },
  },
  exit: (direction) => ({
    x: direction > 0 ? -60 : 60,
    opacity: 0,
    scale: 0.98,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1],
      opacity: { duration: 0.3 },
    },
  }),
};

export default function ServicesSection() {
  const [[page, direction], setPage] = useState([0, 0]);
  const [isPaused, setIsPaused] = useState(false);

  const paginate = (newDirection) => {
    setIsPaused(true);
    setPage([
      (page + newDirection + services.length) % services.length,
      newDirection,
    ]);
    // Resume auto-play after 6 seconds of user interaction
    setTimeout(() => setIsPaused(false), 6000);
  };

  const goToService = (index) => {
    setIsPaused(true);
    const newDirection = index > page ? 1 : -1;
    setPage([index, newDirection]);
    // Resume auto-play after 6 seconds of user interaction
    setTimeout(() => setIsPaused(false), 6000);
  };

  const activeService = services[page];

  // Map services to appropriate icons
  const getServiceIcon = (index) => {
    const icons = [Code, Smartphone, GitMerge, CreditCard, Bot, Phone];
    const IconComponent = icons[index % icons.length];
    return IconComponent;
  };

  // Auto-play logic
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setPage(([currentPage]) => [(currentPage + 1) % services.length, 1]);
    }, 4000); // 4 seconds per slide

    return () => clearInterval(interval);
  }, [isPaused]); // Re-run when pause state changes

  return (
    <Section background="white" padding="small" id="services">
      {/* Diagonal SVG accent */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "0",
          right: "-8%",
          width: "120%",
          height: "100%",
          opacity: 0.08,
          pointerEvents: "none",
          zIndex: 0,
        }}
      >
        <svg
          viewBox="0 0 2200 700"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: "100%", height: "100%", display: "block" }}
        >
          <path
            d="M2200,40 C1800,120 1400,320 1000,420 C700,500 420,580 0,700"
            stroke={ACCENT}
            strokeOpacity="0.25"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M2200,140 C1700,180 1300,360 900,420 C600,470 300,540 0,640"
            stroke="#6aa0cf"
            strokeOpacity="0.15"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Premium gradient overlay with subtle noise texture */}
      {/* <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800/95 to-gray-900 opacity-98">
        <div className="absolute inset-0 bg-[url('/opt/noise-640w.webp')] opacity-[0.03] mix-blend-overlay pointer-events-none" />
      </div> */}

      <div className="relative z-10">
        <SectionHeader
          title="What We Can Build for You"
          subtitle="We deliver technology that works for people. Built around your goals, designed to scale, and trusted to perform."
          badgeIcon={Code}
          theme="light"
          size="small"
        />

        {/* Carousel */}
        <div className="relative overflow-hidden mt-4 sm:mt-6">
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={page}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center"
            >
              {/* Image */}
              <div className="order-1 lg:order-1">
                <div className="relative aspect-[16/9] overflow-hidden rounded-lg sm:rounded-xl shadow-xl">
                  <Image
                    src={activeService.image || "/logos.svg"}
                    alt={activeService.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    width={1200}
                    height={700}
                    sizes="(max-width: 640px) 100vw, 50vw"
                    priority={false}
                    quality={90}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-800/30 via-transparent opacity-60" />
                </div>
              </div>

              {/* Text + Stats */}
              <div className="order-2 lg:order-2 relative">
                {/* Elegant background accent */}
                <div className="absolute -inset-4 bg-gradient-to-br from-blue-50/30 via-white/20 to-gray-50/40 rounded-2xl blur-sm -z-10 opacity-60" />
                {/* <div className="absolute top-0 left-0 w-1 h-16 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full opacity-80" /> */}

                {/* Service icon with elegant styling */}
                {/* <motion.div 
                  className="flex items-center mb-4 sm:mb-6"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="relative mr-4">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                      {(() => {
                        const IconComponent = getServiceIcon(page);
                        return <IconComponent className="w-6 h-6 sm:w-7 sm:h-7 text-white" strokeWidth={1.5} />;
                      })()}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-500 rounded-xl opacity-20 blur-md" />
                  </div>
                  
                </motion.div> */}

                <motion.h3
                  className={`${inter.className} text-left text-xl sm:text-2xl lg:text-3xl text-gray-900 mb-3 sm:mb-4 font-bold leading-tight bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.2,
                    duration: 0.6,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {activeService.title}
                </motion.h3>

                <motion.div
                  className={`${inter.className} text-left text-blue-700 text-sm sm:text-lg mb-3 sm:mb-4 font-semibold relative`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.3,
                    duration: 0.6,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <span className="relative z-10">
                    {activeService.subtitle}
                  </span>
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 via-blue-400 to-transparent opacity-30" />
                </motion.div>

                <motion.div
                  className="relative mb-6 sm:mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.4,
                    duration: 0.6,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <p className="text-justify text-gray-600 text-sm sm:text-base leading-relaxed font-normal tracking-normal relative pl-4">
                    {/* <span className="absolute left-0 top-2 w-2 h-2 bg-blue-400 rounded-full opacity-60" /> */}
                    {activeService.description}
                  </p>
                </motion.div>

                {/* Enhanced stats section */}
                <motion.div
                  className="space-y-3 sm:space-y-4"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.5,
                    duration: 0.6,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {activeService.stats.map((stat, idx) => (
                    <motion.div
                      key={idx}
                      className="group relative bg-gradient-to-r from-white via-blue-50/40 to-white backdrop-blur-sm rounded-xl p-4 sm:p-5 border border-blue-100/80 shadow-sm hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-500 hover:border-blue-200/80 overflow-hidden"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + idx * 0.1, duration: 0.5 }}
                      whileHover={{
                        scale: 1.02,
                        transition: { duration: 0.2 },
                      }}
                    >
                      {/* Animated background accent */}
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                      <div className="relative flex items-center justify-between w-full">
                        <div className="flex items-center space-x-4">
                          <div className="relative">
                            <span className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                              {stat.value}
                            </span>
                            <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                          </div>
                          <div className="w-px h-8 bg-gradient-to-b from-blue-300 to-blue-500 opacity-30" />
                        </div>
                        <span className="text-xs sm:text-sm lg:text-base text-gray-700 leading-snug flex-1 text-justify ml-4 font-medium">
                          {stat.label}
                        </span>
                      </div>

                      {/* Subtle geometric accent */}
                      <div className="absolute top-2 right-2 w-2 h-2 bg-blue-400 rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-300" />
                    </motion.div>
                  ))}
                </motion.div>

                {/* Decorative bottom accent */}
                {/* <motion.div 
                  className="mt-6 sm:mt-8 flex justify-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                >
                  <div className="flex space-x-1">
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="w-1.5 h-1.5 bg-blue-400 rounded-full"
                        animate={{ 
                          scale: [1, 1.2, 1],
                          opacity: [0.4, 0.8, 0.4]
                        }}
                        transition={{
                          duration: 2,
                          delay: i * 0.2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                    ))}
                  </div>
                </motion.div> */}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <CarouselNavigation
          currentPage={page}
          totalPages={services.length}
          onPaginate={paginate}
          onGoToPage={goToService}
          theme="light"
        />

        {/* Touch swipe area */}
        <div
          className="absolute inset-0 z-10 md:hidden"
          onTouchStart={(e) => {
            const touch = e.touches[0];
            const startX = touch.clientX;

            const handleTouchMove = (e) => {
              const touch = e.touches[0];
              const diff = touch.clientX - startX;

              if (Math.abs(diff) > 50) {
                setIsPaused(true);
                if (diff > 0) {
                  setPage([(page - 1 + services.length) % services.length, -1]);
                } else {
                  setPage([(page + 1) % services.length, 1]);
                }
                // Resume auto-play after 6 seconds of user interaction
                setTimeout(() => setIsPaused(false), 6000);
                cleanup();
              }
            };

            const cleanup = () => {
              document.removeEventListener("touchmove", handleTouchMove);
              document.removeEventListener("touchend", cleanup);
            };

            document.addEventListener("touchmove", handleTouchMove);
            document.addEventListener("touchend", cleanup);
          }}
        />
      </div>
    </Section>
  );
}
