'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, X } from 'lucide-react'
import Particles, { initParticlesEngine } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'
import ModalInlineCalendly from '@/components/ui/CalendlyModal'

const ConversionBlock = () => {
  const [isHovered, setIsHovered] = useState(false)
  const [init, setInit] = useState(false)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine)
    }).then(() => setInit(true))

    // Preload Calendly script for smoother modal experience
    const scriptId = 'calendly-widget-script';
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://assets.calendly.com/assets/external/widget.js';
      script.async = true;
      document.head.appendChild(script);
    }
  }, [])

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setShowModal(false)
      }
    }

    if (showModal) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [showModal])

  if (!init) return null


  return (
    <section className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" style={{ minHeight: '25vh' }}>
      {/* Subtle outer glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-transparent to-blue-500/5 rounded-3xl blur-xl transform scale-105" />
      
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-800 via-slate-900 to-gray-950 border border-slate-700/50  flex items-center justify-center" style={{ height: 'calc(100vh - 300px)', minHeight: '400px' }}>
        
        {/* Simple Particles Background */}
        <div className="absolute inset-0 h-full overflow-hidden">
          <Particles
            id="conversionParticles"
            className="absolute inset-0 z-0 max-w-[100vw]"
            options={{
              fullScreen: { enable: false },
              background: { color: "transparent" },
              fpsLimit: 120,
              particles: {
                number: { value: 50, density: { enable: true, area: 1000 } },
                color: { value: "#67E8F9" },
                links: { 
                  enable: true, 
                  color: "#67E8F9", 
                  distance: 150, 
                  opacity: 0.4,
                  width: 1
                },
                move: { 
                  enable: true, 
                  speed: 2,
                  direction: "none",
                  random: false,
                  straight: false,
                  outModes: {
                    default: "bounce"
                  },
                  attract: {
                    enable: false,
                    rotateX: 600,
                    rotateY: 1200
                  }
                },
                opacity: { 
                  value: 0.4,
                  random: true,
                  animation: {
                    enable: true,
                    speed: 1,
                    minimumValue: 0.1,
                    sync: false
                  }
                },
                size: { 
                  value: { min: 1, max: 3 },
                  random: true,
                  animation: {
                    enable: true,
                    speed: 2,
                    minimumValue: 0.5,
                    sync: false
                  }
                },
              },
              interactivity: {
                detectsOn: "canvas",
                events: { 
                  onHover: { enable: true, mode: "grab" },
                  onClick: { enable: true, mode: "push" },
                  resize: true
                },
                modes: { 
                  grab: {
                    distance: 140,
                    links: {
                      opacity: 1
                    }
                  },
                  push: {
                    particles_nb: 4
                  }
                },
              },
              detectRetina: true,
            }}
          />
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
                  fontFamily: 'Inter, system-ui, sans-serif',
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
                  Want to{' '}
                  <motion.span
                    className="relative inline-block"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4, duration: 0.7, ease: "easeOut" }}
                  >
                    <span className="relative z-10 font-normal bg-gradient-to-r from-cyan-300 via-cyan-200 to-cyan-400 bg-clip-text text-transparent">
                      discuss
                    </span>
                    
                    {/* Elegant underline with refined animation */}
                    <motion.div
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400/0 via-cyan-400/60 to-cyan-400/0 rounded-full"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: 0.8, duration: 0.6, ease: "easeOut" }}
                    />
                  </motion.span>
                  {' '}a Project
                </motion.div>
              </motion.h2>
              
              {/* Refined subtitle with modern spacing */}
              <motion.p 
                className="text-base sm:text-lg leading-relaxed max-w-lg mx-auto font-light text-slate-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0, duration: 0.6 }}
                style={{
                  fontFamily: 'Inter, system-ui, sans-serif',
                  letterSpacing: '0.01em',
                }}
              >
                Get in touch with us so that we{' '}
                <span className="text-cyan-300 font-medium">
                  help you achieve
                </span>
                {' '}your goals.
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
                className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-cyan-500/90 to-cyan-400/90 backdrop-blur-sm text-white font-medium px-8 py-3.5 rounded-2xl text-base transition-all duration-300 border border-cyan-400/20"
                whileHover={{
                  scale: 1.02,
                  y: -1,
                }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  console.log('Button clicked, setting showModal to true');
                  setShowModal(true);
                }}
                style={{
                  fontFamily: 'Inter, system-ui, sans-serif',
                  fontWeight: 500,
                }}
              >
               
                
                {/* Button text */}
                <span className="relative z-10">
                  Get in touch
                </span>
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
      {console.log('ConversionBlock render - showModal:', showModal)}
      <ModalInlineCalendly
        url={"https://calendly.com/techbizlimited0/30min?hide_event_type_details=1&hide_gdpr_banner=1"}
        isOpen={showModal}
        onClose={() => {
          console.log('Modal close called');
          setShowModal(false);
        }}
      />

    </section>
  )
}

export default ConversionBlock