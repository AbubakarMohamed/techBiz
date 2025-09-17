"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Building } from "lucide-react";
import Image from "next/image";
import { Inter } from "next/font/google";
import { industries } from "@/data/industries";
import { ACCENT } from "@/styles/theme";
import Section from '@/components/ui/Section';
import SectionHeader from '@/components/ui/SectionHeader';
import CarouselNavigation from '@/components/ui/CarouselNavigation';

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });


const variants = {
  enter: (direction) => ({
    x: direction > 0 ? 100 : -100,
    opacity: 0,
    scale: 0.95,
    rotateY: direction > 0 ? 15 : -15,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    rotateY: 0,
    transition: { 
      duration: 0.8, 
      ease: [0.22, 1, 0.36, 1],
      scale: { duration: 0.6 },
      rotateY: { duration: 0.7 }
    },
  },
  exit: (direction) => ({
    x: direction > 0 ? -100 : 100,
    opacity: 0,
    scale: 0.95,
    rotateY: direction > 0 ? -15 : 15,
    transition: { 
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1]
    },
  }),
};

const textVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1 + 0.3,
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1]
    }
  })
};

export default function IndustriesCarousel() {
  const [[page, direction], setPage] = useState([0, 0]);
  const [isPaused, setIsPaused] = useState(false);
  const len = industries.length;

  const paginate = (newDirection) => {
    setIsPaused(true);
    setPage(([p]) => [ (p + newDirection + len) % len, newDirection ]);
    // Resume auto-play after 6 seconds of user interaction
    setTimeout(() => setIsPaused(false), 6000);
  };

  const goToIndustry = (index) => {
    setIsPaused(true);
    const newDirection = index > page ? 1 : -1;
    setPage([index, newDirection]);
    // Resume auto-play after 6 seconds of user interaction
    setTimeout(() => setIsPaused(false), 6000);
  };

  // Auto-play: updates via functional state to avoid stale closures.
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setPage(([p]) => [ (p + 1) % len, 1 ]);
    }, 4000); // 4s per slide
    
    return () => clearInterval(interval);
  }, [len, isPaused]);

  const active = industries[page];

  return (
    <Section background="white" padding="small" id="industries">

      <div className="relative z-10">
        <SectionHeader
          title="Expertise Across Industries"
          subtitle="We deliver tailored solutions to industries that demand security, scale, and innovation."
          badgeIcon={Building}
          theme="light"
          size="small"
        />

        {/* Carousel */}
        <div className="relative overflow-hidden mt-2 sm:mt-4 md:mt-6">
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={page}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              className="grid lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-16 items-center"
            >
              {/* Enhanced Image with Texture Overlay */}
              <div className="order-1 lg:order-1">
                <motion.div 
                  className="relative aspect-[16/9] sm:aspect-[4/3] lg:aspect-[16/9] overflow-hidden rounded-lg sm:rounded-xl shadow-xl group"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  {/* Texture overlay behind image */}
                  <div 
                    className="absolute inset-0 opacity-30 mix-blend-overlay"
                    style={{
                      background: `
                        url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M20 20c0 11.046-8.954 20-20 20s-20-8.954-20-20 8.954-20 20-20 20 8.954 20 20zm-20-10c-5.523 0-10 4.477-10 10s4.477 10 10 10 10-4.477 10-10-4.477-10-10-10z'/%3E%3C/g%3E%3C/svg%3E")
                      `,
                      backgroundSize: "40px 40px"
                    }}
                  />
                  
                  <Image
                    src={active.image}
                    alt={active.title}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                    width={1200}
                    height={700}
                    sizes="(max-width: 640px) 100vw, 50vw"
                    priority={false}
                  />
                  
                  {/* Multi-layered gradients for depth */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-gray-900/20 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-blue-800/30 opacity-80" />
                  
                  {/* Texture overlay on top */}
                  <div 
                    className="absolute inset-0 opacity-20 mix-blend-soft-light"
                    style={{
                      background: `
                        radial-gradient(circle at 30% 30%, rgba(255,255,255,0.3) 1px, transparent 1px),
                        radial-gradient(circle at 70% 70%, rgba(255,255,255,0.2) 1px, transparent 1px)
                      `,
                      backgroundSize: "20px 20px, 30px 30px"
                    }}
                  />
                  
                  {/* Premium border effect */}
                  <div className="absolute inset-0 rounded-2xl border border-white/20 group-hover:border-white/30 transition-colors duration-300" />
                  
             
                </motion.div>
              </div>

              {/* Elegant Text Section with Refined Right-Side Texture */}
              <div className="order-2 lg:order-2 relative">
                {/* Elegant texture background - subtly contained to right side */}
                <div className="absolute -inset-2 overflow-hidden rounded-xl opacity-40">
                  {/* Ultra-subtle geometric grid */}
                  <div 
                    className="absolute inset-0 opacity-[0.015]"
                    style={{
                      background: `
                        url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23${ACCENT.slice(1)}' stroke-width='0.3' stroke-opacity='0.08'%3E%3Cpath d='M0 60h120M60 0v120'/%3E%3C/g%3E%3C/svg%3E")
                      `,
                      backgroundSize: "120px 120px"
                    }}
                  />
                  
                  {/* Refined gradient whisper */}
                  <div 
                    className="absolute inset-0 opacity-60"
                    style={{
                      background: `
                        linear-gradient(150deg, rgba(15, 76, 129, 0.008) 0%, transparent 35%, rgba(15, 76, 129, 0.012) 100%),
                        radial-gradient(ellipse at 75% 25%, rgba(106, 160, 207, 0.006) 0%, transparent 50%)
                      `
                    }}
                  />
                </div>
                
                {/* Content container */}
                <div className="relative z-10 px-1 py-4 sm:px-2 sm:py-6">
           

                  {/* Professional title */}
                  <motion.h3 
                    className={`${inter.className} text-left text-xl sm:text-2xl md:text-3xl lg:text-4xl text-gray-900 mb-4 sm:mb-6 md:mb-8 font-bold leading-tight relative pb-2 sm:pb-4`}
                    variants={textVariants}
                    initial="hidden"
                    animate="visible"
                    custom={1}
                  >
                    <span className="relative z-10">
                      {active.title}
                    </span>
                  </motion.h3>
                  
                  {/* Professional description */}
                  <motion.div
                    className="relative mb-6 sm:mb-8 md:mb-10"
                    variants={textVariants}
                    initial="hidden"
                    animate="visible"
                    custom={2}
                  >
                    <p className={`${inter.className} text-gray-700 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed font-medium pl-3 sm:pl-4 border-l-2 border-blue-500/25`}>
                      {active.description}
                    </p>
                  </motion.div>

                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <CarouselNavigation
          currentPage={page}
          totalPages={industries.length}
          onPaginate={paginate}
          onGoToPage={goToIndustry}
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
                  setPage(([p]) => [(p - 1 + len) % len, -1]);
                } else {
                  setPage(([p]) => [(p + 1) % len, 1]);
                }
                // Resume auto-play after 6 seconds of user interaction
                setTimeout(() => setIsPaused(false), 6000);
                cleanup();
              }
            };
            
            const cleanup = () => {
              document.removeEventListener('touchmove', handleTouchMove);
              document.removeEventListener('touchend', cleanup);
            };
            
            document.addEventListener('touchmove', handleTouchMove);
            document.addEventListener('touchend', cleanup);
          }}
        />
      </div>
    </Section>
  );
}
