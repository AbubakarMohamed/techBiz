"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, useReducedMotion, useSpring, useTransform } from "framer-motion"
import { ArrowRight, Package } from "lucide-react"
import Section from '@/components/ui/Section'
import SectionHeader from '@/components/ui/SectionHeader'

// Enhanced Animation Constants for Subtle Professional Feel
const EASING = {
  // Smooth, natural easing curves for professional feel
  smooth: [0.16, 1, 0.3, 1], // Enhanced easeOutExpo for smooth exits
  gentle: [0.25, 0.46, 0.45, 0.94], // Smooth easeOutQuart
  bounce: [0.34, 1.56, 0.64, 1], // Subtle bounce without overdoing it
  elastic: [0.175, 0.885, 0.32, 1.275], // Very subtle elastic
}

const TIMING = {
  quick: 0.2,
  normal: 0.4,
  smooth: 0.6,
  layout: 0.5,
}

const STAGGER = {
  cards: 0.08, // Refined stagger timing for cards
  content: 0.05, // Subtle content stagger
  micro: 0.02, // Micro-delays for polish
}

const products = [
  {
    id: "47payday",
    title: "47PayDay",
    description: "An all-in-one solution for streamlined and efficient Human Resource Management.",
    detailedDescription: " From seamless payroll processing to intuitive employee self-service, this solution revolutionizes how you handle your HR tasks. With 47Payday, it's not just about managing HR; it's about empowering your team with intuitive tools, elevating your HR game and transforming processes effortlessly",
    image: "/products/47payday2.webp",
    mobileImage: "/products/47paydayMob.webp",
    logo: "/products/147payday.webp",
    gradient: "from-slate-900 via-slate-800 to-slate-700",
    radialGradient: "radial-gradient(ellipse at top right, rgba(59, 130, 246, 0.15), transparent 60%)",
  },
  {
    id: "47pro",
    title: "47Pro", 
    description: "A flagship revenue management system designed exclusively for county governments.",
    detailedDescription: "From streamlined tax collection to comprehensive financial reporting, this sophisticated solution is crafted to optimize fiscal workflows, providing county officials with a powerful tool to navigate the complexities of financial governance seamlessly.",
    image: "/products/47proImage.webp",
    mobileImage: "/products/47proMob.webp",
    logo: "/products/47pro.webp",
    gradient: "from-slate-900 via-blue-900 to-indigo-900",
    radialGradient: "radial-gradient(ellipse at bottom left, rgba(34, 197, 94, 0.12), transparent 50%)",
  },
  {
    id: "crm-alerts",
    title: "CRM Alerts",
    description: "A dynamic solution that keeps your clients in the know.",
    detailedDescription: " Designed to sync seamlessly with your ERP, this innovative solution sends instant notifications whenever invoices or credit notes are generated empowering your clients with real-time updates that enhances transparency and builds lasting trust.",
    image: "/products/47crm.webp",
    mobileImage: "/products/47crmMob.webp",
    logo: "/products/crm.webp",
    gradient: "from-gray-900 via-slate-800 to-zinc-900",
    radialGradient: "radial-gradient(ellipse at center, rgba(168, 85, 247, 0.1), transparent 55%)",
  },
]

const ProductCard = ({ product, isActive, onHover, index, isMobile }) => {
  const shouldReduceMotion = useReducedMotion()

  // Enhanced animation variants for better control
  const cardVariants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 40,
      scale: shouldReduceMotion ? 1 : 0.95,
      rotateY: shouldReduceMotion ? 0 : (isMobile ? 0 : 3)
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateY: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : TIMING.smooth,
        delay: shouldReduceMotion ? 0 : index * STAGGER.cards,
        ease: EASING.smooth,
        staggerChildren: shouldReduceMotion ? 0 : STAGGER.content,
        delayChildren: shouldReduceMotion ? 0 : STAGGER.micro
      }
    }
  }

  const contentVariants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 12,
      filter: shouldReduceMotion ? 'blur(0px)' : 'blur(0.5px)'
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: shouldReduceMotion ? 0 : TIMING.normal,
        ease: EASING.smooth
      }
    }
  }

  // For mobile, we'll use a simplified layout without active states
  if (isMobile) {
    return (
      <motion.div
        className="relative rounded-3xl overflow-hidden group h-auto min-h-[500px] w-full"
        style={{ willChange: shouldReduceMotion ? 'auto' : 'transform, opacity' }}
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px", amount: 0.1 }}
        whileHover={shouldReduceMotion ? {} : {
          y: -2,
          scale: 1.002,
          transition: { duration: TIMING.quick, ease: EASING.gentle }
        }}
        whileTap={shouldReduceMotion ? {} : { scale: 0.998 }}
      >
        {/* Enhanced Background with Texture */}
        <div className={`absolute inset-0 bg-gradient-to-b ${product.gradient}`} />
        {/* Noise Texture Overlay */}
        <div 
          className="absolute inset-0 opacity-20 mix-blend-multiply"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
          }}
        />
        {/* Radial Gradient Overlay */}
        <div 
          className="absolute inset-0"
          style={{ background: product.radialGradient }}
        />
        
        {/* Content Container - Column layout for mobile */}
        <div className="relative h-full flex flex-col">
          {/* Image at TOP for mobile - landscape style */}
          <div className="relative w-full h-48 flex-shrink-0 overflow-hidden rounded-t-3xl">
            <motion.div
              variants={contentVariants}
              className="relative w-full h-full"
              whileHover={shouldReduceMotion ? {} : {
                scale: 1.05,
                transition: { duration: TIMING.smooth, ease: EASING.gentle }
              }}
            >
              <Image
                src={product.mobileImage}
                alt={product.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                priority={index === 0}
              />
            </motion.div>
          </div>

          {/* Content Area */}
          <div className="relative z-10 p-6 flex-1 flex flex-col">
            {/* Title and Description */}
            <motion.div
              className="flex-1"
              variants={contentVariants}
            >
              <motion.h3
                variants={contentVariants}
                className="text-3xl font-bold text-white leading-tight mb-4"
              >
                {product.title}
              </motion.h3>

              <motion.p
                variants={contentVariants}
                className="text-white/90 text-lg leading-relaxed mb-4 text-left"
              >
                {product.description}
              </motion.p>

              <motion.p
                variants={contentVariants}
                className="text-white/80 text-sm leading-relaxed mb-6 text-left"
              >
                {product.detailedDescription}
              </motion.p>
            </motion.div>

            {/* Bottom section with CTA and Logo at bottom right */}
            <motion.div
              className="flex justify-between items-end"
              variants={contentVariants}
            >
              <motion.button
                variants={contentVariants}
                whileHover={shouldReduceMotion ? {} : {
                  scale: 1.03,
                  y: -2,
                  boxShadow: "0 8px 32px rgba(6, 182, 212, 0.3)",
                  transition: { duration: TIMING.quick, ease: EASING.gentle }
                }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
                className="group inline-flex items-center bg-gradient-to-r from-cyan-500/90 to-cyan-400/90 backdrop-blur-sm hover:from-cyan-400/95 hover:to-cyan-300/95 px-5 py-2.5 rounded-xl font-semibold transition-all duration-300 ease-out shadow-lg hover:shadow-cyan-500/25"
              >
                <span className="mr-2 text-sm">Download Brochure</span>
                <motion.div
                  animate={shouldReduceMotion ? {} : { x: [0, 3, 0] }}
                  transition={{
                    duration: 2,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatDelay: 3
                  }}
                >
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
                </motion.div>
              </motion.button>

              {/* Logo at bottom right for mobile */}
              <motion.div
                variants={contentVariants}
                className="w-12 h-12 rounded-2xl p-2 flex items-center justify-center"
                whileHover={shouldReduceMotion ? {} : {
                  scale: 1.05,
                  rotate: 5,
                  transition: { duration: TIMING.quick, ease: EASING.gentle }
                }}
              >
                <Image
                  src={product.logo}
                  alt={`${product.title} logo`}
                  width={32}
                  height={32}
                  className="object-contain"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    )
  }

  // Enhanced Desktop Active Card
  if (isActive) {
    return (
      <motion.div
        onHoverStart={() => onHover(product.id)}
        className="relative rounded-3xl overflow-hidden cursor-pointer group h-[550px] md:h-[550px]"
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px", amount: 0.1 }}
        whileHover={shouldReduceMotion ? {} : {
          scale: 1.008,
          y: -3,
          boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
          transition: { duration: TIMING.normal, ease: EASING.gentle }
        }}
        layout
        layoutTransition={{
          duration: shouldReduceMotion ? 0 : TIMING.layout,
          ease: EASING.smooth
        }}
        style={{
          willChange: shouldReduceMotion ? 'auto' : 'transform, opacity, flex',
          flex: isActive ? '2 1 0%' : '1 1 0%',
          transition: shouldReduceMotion ? 'none' : `flex ${TIMING.layout}s cubic-bezier(0.25, 0.46, 0.45, 0.94)`
        }}
      >
        {/* Enhanced Background with Texture */}
        <div className={`absolute inset-0 bg-gradient-to-r ${product.gradient}`} />
        {/* Noise Texture Overlay */}
        <div 
          className="absolute inset-0 opacity-25 mix-blend-multiply"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
          }}
        />
        {/* Radial Gradient Overlay */}
        <div 
          className="absolute inset-0"
          style={{ background: product.radialGradient }}
        />
        {/* Glass Morphism Effect */}
        <div className="absolute inset-0 bg-white/[0.02] backdrop-blur-[0.5px]" />
        
        {/* Content Container */}
        <div className="relative h-full flex flex-col md:flex-row">
          {/* Left Content Area */}
          <motion.div
            className="relative z-10 p-8 md:p-12 flex-1 flex flex-col justify-center text-white max-w-md text-left"
            variants={contentVariants}
          >
            {/* Logo Icon */}
            <motion.div
              className="w-16 h-16 rounded-2xl p-2 mb-6 flex items-center justify-center"
              variants={contentVariants}
              whileHover={shouldReduceMotion ? {} : {
                scale: 1.1,
                rotate: 8,
                transition: { duration: TIMING.quick, ease: EASING.bounce }
              }}
            >
              <Image
                src={product.logo}
                alt={`${product.title} logo`}
                width={48}
                height={48}
                className="object-contain"
              />
            </motion.div>

            {/* Title */}
            <motion.h3
              variants={contentVariants}
              className="text-4xl md:text-4xl font-bold leading-tight mb-6"
            >
              {product.title}
            </motion.h3>

            {/* Description */}
            <motion.p
              variants={contentVariants}
              className="text-white/90 text-lg leading-relaxed mb-4 text-left"
            >
              {product.description}
            </motion.p>

            <motion.p
              variants={contentVariants}
              className="text-white/80 text-sm leading-relaxed mb-8 text-left"
            >
              {product.detailedDescription}
            </motion.p>

            {/* Enhanced CTA Button */}
            <motion.button
              variants={contentVariants}
              whileHover={shouldReduceMotion ? {} : {
                scale: 1.05,
                y: -3,
                boxShadow: "0 12px 40px rgba(6, 182, 212, 0.4)",
                transition: { duration: TIMING.quick, ease: EASING.gentle }
              }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
              className={`group inline-flex items-center bg-gradient-to-r from-cyan-500/90 to-cyan-400/90 backdrop-blur-sm hover:from-cyan-400/95 hover:to-cyan-300/95 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ease-out self-start shadow-lg hover:shadow-cyan-500/30 ${product.id==="47payday"?"-mt-6":""} ${product.id==="crm-alerts"?"mt-5":""}`}
            >
              <span className="mr-2">Download Brochure</span>
              <motion.div
                animate={shouldReduceMotion ? {} : { x: [0, 4, 0] }}
                transition={{
                  duration: 2.5,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatDelay: 4
                }}
              >
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
              </motion.div>
            </motion.button>
          </motion.div>

          {/* Right Image Area - Desktop Only */}
          <div className="hidden md:flex relative flex-1 items-center p-4 justify-center overflow-hidden">
            <motion.div
              variants={contentVariants}
              className="relative w-full h-full rounded-2xl overflow-hidden"
              whileHover={shouldReduceMotion ? {} : {
                scale: 1.02,
                rotate: 0.5,
                transition: { duration: TIMING.smooth, ease: EASING.gentle }
              }}
            >
    <Image
      src={product.image}
      alt={product.title}
      fill
      sizes="(max-width: 768px) 100vw, 50vw"
      className="object-cover transition-all duration-700 ease-out"
      priority={index === 0}
    />
      </motion.div>
      </div>
        </div>
      </motion.div>
    )
  }

  // Enhanced Inactive Card for Desktop
  return (
    <motion.div
      onHoverStart={() => onHover(product.id)}
      className="relative rounded-3xl overflow-hidden cursor-pointer group h-[550px] md:h-[550px]"
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px", amount: 0.1 }}
      whileHover={shouldReduceMotion ? {} : {
        scale: 1.012,
        y: -4,
        boxShadow: "0 16px 32px rgba(0,0,0,0.12)",
        transition: { duration: TIMING.normal, ease: EASING.gentle }
      }}
      layout
      layoutTransition={{
        duration: shouldReduceMotion ? 0 : TIMING.layout,
        ease: EASING.smooth
      }}
      style={{
        willChange: shouldReduceMotion ? 'auto' : 'transform, opacity, flex',
        flex: '0.8 1 0%',
        transition: shouldReduceMotion ? 'none' : `flex ${TIMING.smooth}s cubic-bezier(0.25, 0.46, 0.45, 0.94)`
      }}
    >
      {/* Enhanced Background with Texture */}
      <div className={`absolute inset-0 bg-gradient-to-br ${product.gradient}`} />
      {/* Noise Texture Overlay */}
      <div 
        className="absolute inset-0 opacity-20 mix-blend-multiply"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />
      {/* Radial Gradient Overlay */}
      <div 
        className="absolute inset-0"
        style={{ background: product.radialGradient }}
      />
      {/* Geometric Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Ccircle cx='30' cy='30' r='1.5'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      />
      
      {/* Content */}
      <motion.div
        className="relative z-10 p-8 h-full flex flex-col text-white text-left"
        variants={contentVariants}
      >
        {/* Logo Icon */}
        <motion.div
          className="w-16 h-16 rounded-2xl p-2 mb-6 flex items-center justify-center"
          variants={contentVariants}
          whileHover={shouldReduceMotion ? {} : {
            scale: 1.08,
            rotate: 3,
            transition: { duration: TIMING.quick, ease: EASING.gentle }
          }}
        >
          <Image
            src={product.logo}
            alt={`${product.title} logo`}
            width={48}
            height={48}
            className="object-contain"
          />
        </motion.div>

        {/* Title */}
        <motion.h3
          variants={contentVariants}
          className="text-3xl font-bold leading-tight mb-4"
        >
          {product.title}
        </motion.h3>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Bottom Content */}
        <motion.div className="space-y-6" variants={contentVariants}>
          <motion.p
            variants={contentVariants}
            className="text-white/80 text-lg leading-relaxed text-left"
          >
            {product.description}
          </motion.p>

          <motion.button
            variants={contentVariants}
            whileHover={shouldReduceMotion ? {} : {
              scale: 1.03,
              y: -2,
              boxShadow: "0 8px 24px rgba(6, 182, 212, 0.25)",
              transition: { duration: TIMING.quick, ease: EASING.gentle }
            }}
            whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
            className="group inline-flex items-center bg-gradient-to-r from-cyan-500/90 to-cyan-400/90 backdrop-blur-sm hover:from-cyan-400/95 hover:to-cyan-300/95 px-5 py-2.5 rounded-xl font-semibold transition-all duration-300 ease-out self-start text-sm shadow-md hover:shadow-cyan-500/20"
          >
            <span className="mr-2">Download Brochure</span>
            <motion.div
              animate={shouldReduceMotion ? {} : { x: [0, 2, 0] }}
              transition={{
                duration: 2,
                ease: "easeInOut",
                repeat: Infinity,
                repeatDelay: 5
              }}
            >
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
            </motion.div>
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-out" />
    </motion.div>
  )
}

export default function ProductShowcase() {
  const [activeProduct, setActiveProduct] = useState(products[0].id)
  const [isMobile, setIsMobile] = useState(false)
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Initial check
    checkMobile()

    // Add event listener for window resize
    window.addEventListener('resize', checkMobile)

    // Clean up
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <Section background="white" id="products" padding="small" className="overflow-hidden relative">
      {/* Professional Background Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M50 50c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zM10 10c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zM90 90c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zM90 10c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zM10 90c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Our SaaS Suite Ready to Transform Your Business"
          subtitle="We've created a suite of ready-to-use SaaS products proven, scalable, and already delivering results for governments, enterprises, and organizations. With our SaaS solutions, you get impact from day one."
          badgeIcon={Package}
        />

        {/* Enhanced Products Layout */}
        <motion.div
          className={`gap-6 items-stretch ${isMobile ? 'flex flex-col space-y-6' : 'flex flex-col md:flex-row'}`}
          initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
          whileInView={shouldReduceMotion ? false : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px", amount: 0.1 }}
          transition={{
            duration: shouldReduceMotion ? 0 : TIMING.smooth,
            delay: shouldReduceMotion ? 0 : 0.1,
            ease: EASING.smooth,
            staggerChildren: shouldReduceMotion ? 0 : STAGGER.content,
            delayChildren: shouldReduceMotion ? 0 : STAGGER.micro
          }}
          layout={!shouldReduceMotion}
          layoutDependency={activeProduct}
        >
          {products.map((product, index) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              index={index}
              isActive={activeProduct === product.id}
              onHover={setActiveProduct}
              isMobile={isMobile}
            />
          ))}
        </motion.div>
      </div>
    </Section>
  )
}