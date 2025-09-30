"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, X } from "lucide-react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import ModalInlineCalendly from "@/components/ui/CalendlyModal";

const ConversionBlock = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [init, setInit] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setInit(true));

    // Preload Calendly script for smoother modal experience
    const scriptId = "calendly-widget-script";
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://assets.calendly.com/assets/external/widget.js";
      script.async = true;
      document.head.appendChild(script);
    }
  }, []);

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        setShowModal(false);
      }
    };

    if (showModal) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [showModal]);

  if (!init) return null;

  return (
    <section
      className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
      style={{ minHeight: "25vh" }}
    >
      {/* Subtle outer glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-transparent to-blue-500/5 rounded-3xl blur-xl transform scale-105" />

      <div
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-800 via-slate-900 to-gray-950 border border-slate-700/50  flex items-center justify-center"
        style={{ height: "calc(100vh - 300px)", minHeight: "400px" }}
      >
        {/* Hexagonal Pattern Background with Smooth Fade Effect */}
        <div className="absolute inset-0 pointer-events-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 800"
            preserveAspectRatio="none"
            className="absolute inset-0 w-full h-full"
            style={{ zIndex: 1 }}
          >
            <defs>
              <linearGradient
                id="hexagonGradient"
                x1="0%"
                y1="0%"
                x2="0%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#0F4C81" stopOpacity="0.25" />
                <stop offset="30%" stopColor="#1E88E5" stopOpacity="0.20" />
                <stop offset="60%" stopColor="#42A5F5" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#64B5F6" stopOpacity="0.10" />
              </linearGradient>

              <linearGradient
                id="verticalFade"
                x1="0%"
                y1="0%"
                x2="0%"
                y2="100%"
              >
                <stop offset="0%" stopColor="white" stopOpacity="0.05" />
                <stop offset="20%" stopColor="white" stopOpacity="0.15" />
                <stop offset="50%" stopColor="white" stopOpacity="0.4" />
                <stop offset="80%" stopColor="white" stopOpacity="0.7" />
                <stop offset="100%" stopColor="white" stopOpacity="1" />
              </linearGradient>

              <mask id="combinedFadeMask">
                <rect width="100%" height="100%" fill="url(#verticalFade)" />
              </mask>

              <filter id="softGlow">
                <feGaussianBlur stdDeviation="1" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <g fill="none" mask="url(#combinedFadeMask)">
              {/* Existing hexagonal paths */}
              <path
                d="M130.86 194.75L195.81 232.25L195.81 307.25L130.86 344.75L65.9 307.25L65.9 232.25zM195.81 307.25L260.76 344.75L260.76 419.75L195.81 457.25L130.86 419.75L130.86 344.75zM325.72 82.25L390.67 119.75L390.67 194.75L325.72 232.25L260.76 194.75L260.76 119.75zM260.76 194.75L325.72 232.25L325.72 307.25L260.76 344.75L195.81 307.25L195.81 232.25zM325.72 307.25L390.67 344.75L390.67 419.75L325.72 457.25L260.76 419.75L260.76 344.75zM260.76 419.75L325.72 457.25L325.72 532.25L260.76 569.75L195.81 532.25L195.81 457.25zM455.63 82.25L520.58 119.75L520.58 194.75L455.63 232.25L390.67 194.75L390.67 119.75z"
                stroke="url(#hexagonGradient)"
                strokeWidth="1.2"
                filter="url(#softGlow)"
              />

              {/* Existing hexagonal nodes */}
              <g fill="url(#hexagonGradient)">
                <circle cx="130.86" cy="194.75" r="2" />
                <circle cx="195.81" cy="232.25" r="2" />
                <circle cx="325.72" cy="82.25" r="2" />
                <circle cx="455.63" cy="82.25" r="2" />
                <circle cx="585.53" cy="307.25" r="2" />
                <circle cx="715.44" cy="307.25" r="2" />
                <circle cx="845.35" cy="532.25" r="2" />
                <circle cx="975.26" cy="532.25" r="2" />
                <circle cx="1105.16" cy="82.25" r="2" />
                <circle cx="1235.07" cy="232.25" r="2" />
                <circle cx="1364.98" cy="457.25" r="2" />
              </g>

              {/* Decorative larger hexagons */}
              <g stroke="url(#hexagonGradient)" strokeWidth="0.8" fill="none">
                <path d="M138.1 47.87L181.4 72.87L181.4 122.87L138.1 147.87L94.8 122.87L94.8 72.87z" />
                <path d="M441.22 -27.13L484.52 -2.13L484.52 47.87L441.22 72.87L397.91 47.87L397.91 -2.13z" />
                <path d="M744.33 497.87L787.64 522.87L787.64 572.87L744.33 597.87L701.03 572.87L701.03 522.87z" />
                <path d="M1177.36 497.87L1220.66 522.87L1220.66 572.87L1177.36 597.87L1134.06 572.87L1134.06 522.87z" />
              </g>

              {/* New hexagons in the middle */}
              <path
                d="M700 300L765 337L765 412L700 450L635 412L635 337zM765 412L830 450L830 525L765 562L700 525L700 450z"
                stroke="url(#hexagonGradient)"
                strokeWidth="1.2"
                filter="url(#softGlow)"
              />
              <g fill="url(#hexagonGradient)">
                <circle cx="700" cy="300" r="2" />
                <circle cx="765" cy="337" r="2" />
                <circle cx="830" cy="450" r="2" />
              </g>

              {/* Existing new hexagons on the right */}
              <path
                d="M1200 200L1265 237L1265 312L1200 350L1135 312L1135 237zM1265 312L1330 350L1330 425L1265 462L1200 425L1200 350z"
                stroke="url(#hexagonGradient)"
                strokeWidth="1.2"
                filter="url(#softGlow)"
              />
              <g fill="url(#hexagonGradient)">
                <circle cx="1200" cy="200" r="2" />
                <circle cx="1265" cy="237" r="2" />
                <circle cx="1330" cy="350" r="2" />
              </g>
            </g>
          </svg>
        </div>

        {/* Main Content */}
        <div className="relative z-10 text-center px-6 py-8 max-w-4xl mx-auto">
          <motion.div
            className="space-y-4 md:space-y-6"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Refined Typography - Modern & Elegant */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.h2
                className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight leading-[1.2] mb-6"
                style={{
                  fontFamily: "Inter, system-ui, sans-serif",
                  fontWeight: 300,
                }}
              >
                {/* Single line: Want to discuss a Project */}
                <motion.div
                  className="text-white/90"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                >
                  Want to Discuss a Project
                </motion.div>
              </motion.h2>

              {/* Refined subtitle with modern spacing */}
              <motion.p
                className="text-base sm:text-lg leading-relaxed max-w-lg mx-auto font-light text-slate-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0, duration: 0.6 }}
                style={{
                  fontFamily: "Inter, system-ui, sans-serif",
                  letterSpacing: "0.01em",
                }}
              >
                Get in touch with us so that we help you achieve your goals.
              </motion.p>
            </motion.div>

            {/* Modern CTA Button - Designer's Touch */}
            <motion.div
              className="pt-4"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <motion.button
                className="group relative inline-flex items-center gap-3 bg-[#E7B620] hover:bg-[#d4a31d] text-black font-semibold px-8 py-3.5 rounded-2xl text-base transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
                whileHover={{
                  scale: 1.02,
                  y: -1,
                }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  console.log("Button clicked, setting showModal to true");
                  setShowModal(true);
                }}
                style={{
                  fontFamily: "Inter, system-ui, sans-serif",
                  fontWeight: 500,
                }}
              >
                {/* Button text */}
                <span className="relative z-10">Book A Strategy Call</span>
                {/* Arrow with smooth animation */}
                <motion.div
                  className="relative z-10 flex items-center justify-center"
                  animate={{
                    x: isHovered ? 1 : 0,
                  }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  <ArrowRight className="w-4 h-4" />
                </motion.div>
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Calendly Modal */}
      {console.log("ConversionBlock render - showModal:", showModal)}
      <ModalInlineCalendly
        url={
          "https://calendly.com/techbizlimited0/30min?hide_event_type_details=1&hide_gdpr_banner=1"
        }
        isOpen={showModal}
        onClose={() => {
          console.log("Modal close called");
          setShowModal(false);
        }}
      />
    </section>
  );
};

export default ConversionBlock;
