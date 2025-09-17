'use client';

/**
 * Advanced Skeleton Loader System
 * 
 * Provides sophisticated skeleton loading with shimmer effects for various content types
 */
import React from 'react';
import { motion } from 'framer-motion';

// Base skeleton component with shimmer effect
export const SkeletonBase = ({ 
  width = '100%', 
  height = '20px', 
  borderRadius = '4px',
  className = '',
  delay = 0,
  prefersReducedMotion = false
}) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay, duration: 0.3 }}
    style={{
      width,
      height,
      borderRadius,
      position: 'relative',
      overflow: 'hidden',
      backgroundColor: 'rgba(0, 0, 0, 0.08)',
      border: '1px solid rgba(0, 0, 0, 0.06)',
    }}
    className={className}
  >
    {/* Shimmer overlay */}
    <div
      className={`
        absolute top-0 -left-full w-full h-full
        ${prefersReducedMotion 
          ? '' 
          : 'animate-[shimmer_2s_ease-in-out_infinite]'
        }
      `}
      style={{
        background: prefersReducedMotion 
          ? 'rgba(0, 0, 0, 0.04)'
          : 'linear-gradient(90deg, transparent 0%, rgba(0, 0, 0, 0.12) 50%, transparent 100%)'
      }}
    />
    <style jsx>{`
      @keyframes shimmer {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(400%); }
      }
    `}</style>
  </motion.div>
);

// Card-based skeleton for sections with multiple items
export const SkeletonCard = ({ 
  showImage = true, 
  showTitle = true, 
  showDescription = true,
  showActions = true,
  delay = 0,
  prefersReducedMotion = false 
}) => (
  <motion.div
    initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.4 }}
    style={{
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      borderRadius: '12px',
      padding: '24px',
      border: '1px solid rgba(0, 0, 0, 0.08)',
      backdropFilter: 'blur(8px)',
    }}
  >
    {showImage && (
      <SkeletonBase 
        width="100%" 
        height="200px" 
        borderRadius="8px" 
        delay={delay + 0.1}
        prefersReducedMotion={prefersReducedMotion}
      />
    )}
    <div className={`${showImage ? 'mt-6' : ''} flex flex-col gap-4`}>
      {showTitle && (
        <SkeletonBase 
          width="70%" 
          height="28px" 
          delay={delay + 0.2}
          prefersReducedMotion={prefersReducedMotion}
        />
      )}
      {showDescription && (
        <div className="flex flex-col gap-2">
          <SkeletonBase 
            width="100%" 
            height="16px" 
            delay={delay + 0.3}
            prefersReducedMotion={prefersReducedMotion}
          />
          <SkeletonBase 
            width="85%" 
            height="16px" 
            delay={delay + 0.35}
            prefersReducedMotion={prefersReducedMotion}
          />
          <SkeletonBase 
            width="60%" 
            height="16px" 
            delay={delay + 0.4}
            prefersReducedMotion={prefersReducedMotion}
          />
        </div>
      )}
      {showActions && (
        <div className="flex gap-4 mt-4">
          <SkeletonBase 
            width="120px" 
            height="36px" 
            borderRadius="6px"
            delay={delay + 0.5}
            prefersReducedMotion={prefersReducedMotion}
          />
          <SkeletonBase 
            width="100px" 
            height="36px" 
            borderRadius="6px"
            delay={delay + 0.55}
            prefersReducedMotion={prefersReducedMotion}
          />
        </div>
      )}
    </div>
  </motion.div>
);

// Grid skeleton for multiple cards
export const SkeletonGrid = ({ 
  columns = 3, 
  rows = 1, 
  gap = 3,
  cardProps = {},
  className = '',
  prefersReducedMotion = false 
}) => (
  <div
    className={`${className} grid w-full`}
    style={{
      gridTemplateColumns: 
        `repeat(1, 1fr)` + // xs
        ` sm:repeat(${columns >= 2 ? 2 : 1}, 1fr)` + // sm  
        ` md:repeat(${Math.min(columns, 3)}, 1fr)` + // md
        ` lg:repeat(${columns}, 1fr)`, // lg+
      gap: `${gap * 0.25}rem`
    }}
  >
    {Array.from({ length: columns * rows }).map((_, index) => (
      <SkeletonCard
        key={index}
        delay={index * 0.1}
        prefersReducedMotion={prefersReducedMotion}
        {...cardProps}
      />
    ))}
  </div>
);

// Logo marquee skeleton
export const SkeletonLogoMarquee = ({ prefersReducedMotion = false }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.4 }}
    style={{
      padding: '60px 0',
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      borderTop: '1px solid rgba(0, 0, 0, 0.08)',
      borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
    }}
  >
    <div className="max-w-6xl mx-auto px-4 md:px-8">
      {/* Title skeleton */}
      <div className="text-center mb-8">
        <SkeletonBase 
          width="300px" 
          height="32px" 
          borderRadius="8px"
          className="mx-auto"
          prefersReducedMotion={prefersReducedMotion}
        />
      </div>
      
      {/* Logo grid skeleton */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-8 items-center justify-items-center">
      
        {Array.from({ length: 12 }).map((_, index) => (
          <SkeletonBase
            key={index}
            width="80px"
            height="40px"
            borderRadius="6px"
            delay={index * 0.05}
            prefersReducedMotion={prefersReducedMotion}
          />
        ))}
      </div>
    </div>
  </motion.div>
);

// Services section skeleton
export const SkeletonServices = ({ prefersReducedMotion = false }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.4 }}
    style={{
      padding: '120px 0',
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
    }}
  >
    <div className="max-w-6xl mx-auto px-4 md:px-8">
      {/* Section header */}
      <div className="text-center mb-16">
        <SkeletonBase 
          width="400px" 
          height="48px" 
          borderRadius="8px"
          className="mx-auto mb-4"
          prefersReducedMotion={prefersReducedMotion}
        />
        <SkeletonBase 
          width="600px" 
          height="20px" 
          borderRadius="6px"
          className="mx-auto"
          delay={0.1}
          prefersReducedMotion={prefersReducedMotion}
        />
      </div>
      
      {/* Services grid */}
      <SkeletonGrid 
        columns={3} 
        rows={2} 
        gap={4}
        cardProps={{ showImage: true, showTitle: true, showDescription: true, showActions: true }}
        prefersReducedMotion={prefersReducedMotion}
      />
    </div>
  </motion.div>
);

// Features section skeleton
export const SkeletonFeatures = ({ prefersReducedMotion = false }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.4 }}
    style={{
      padding: '120px 0',
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
    }}
  >
    <div className="max-w-6xl mx-auto px-4 md:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left side - Content */}
        <div>
          <SkeletonBase 
            width="350px" 
            height="42px" 
            borderRadius="8px"
            className="mb-4"
            prefersReducedMotion={prefersReducedMotion}
          />
          <SkeletonBase 
            width="100%" 
            height="18px" 
            className="mb-2"
            delay={0.1}
            prefersReducedMotion={prefersReducedMotion}
          />
          <SkeletonBase 
            width="90%" 
            height="18px" 
            className="mb-2"
            delay={0.15}
            prefersReducedMotion={prefersReducedMotion}
          />
          <SkeletonBase 
            width="75%" 
            height="18px" 
            className="mb-6"
            delay={0.2}
            prefersReducedMotion={prefersReducedMotion}
          />
          
          {/* Feature list */}
          <div className="flex flex-col gap-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="flex items-center gap-4">
                <SkeletonBase 
                  width="24px" 
                  height="24px" 
                  borderRadius="50%"
                  delay={0.3 + index * 0.05}
                  prefersReducedMotion={prefersReducedMotion}
                />
                <SkeletonBase 
                  width="200px" 
                  height="18px"
                  delay={0.35 + index * 0.05}
                  prefersReducedMotion={prefersReducedMotion}
                />
              </div>
            ))}
          </div>
        </div>
        
        {/* Right side - Visual */}
        <SkeletonBase 
          width="100%" 
          height="400px" 
          borderRadius="12px"
          delay={0.2}
          prefersReducedMotion={prefersReducedMotion}
        />
      </div>
    </div>
  </motion.div>
);

// Product showcase skeleton
export const SkeletonProductShowcase = ({ prefersReducedMotion = false }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.4 }}
    style={{
      padding: '120px 0',
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
    }}
  >
    <div className="max-w-6xl mx-auto px-4 md:px-8">
      {/* Header */}
      <div className="text-center mb-16">
        <SkeletonBase 
          width="450px" 
          height="48px" 
          borderRadius="8px"
          className="mx-auto mb-4"
          prefersReducedMotion={prefersReducedMotion}
        />
        <SkeletonBase 
          width="650px" 
          height="20px" 
          borderRadius="6px"
          className="mx-auto"
          delay={0.1}
          prefersReducedMotion={prefersReducedMotion}
        />
      </div>
      
      {/* Product cards */}
      <SkeletonGrid 
        columns={2} 
        rows={2} 
        gap={4}
        cardProps={{ showImage: true, showTitle: true, showDescription: true, showActions: true }}
        prefersReducedMotion={prefersReducedMotion}
      />
    </div>
  </motion.div>
);

// Industries carousel skeleton
export const SkeletonIndustries = ({ prefersReducedMotion = false }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.4 }}
    style={{
      padding: '120px 0',
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
    }}
  >
    <div className="max-w-6xl mx-auto px-4 md:px-8">
      {/* Header */}
      <div className="text-center mb-16">
        <SkeletonBase 
          width="380px" 
          height="48px" 
          borderRadius="8px"
          className="mx-auto mb-4"
          prefersReducedMotion={prefersReducedMotion}
        />
        <SkeletonBase 
          width="550px" 
          height="20px" 
          borderRadius="6px"
          className="mx-auto"
          delay={0.1}
          prefersReducedMotion={prefersReducedMotion}
        />
      </div>
      
      {/* Carousel container */}
      <div className="relative">
        {/* Navigation arrows */}
        <div className="flex justify-between items-center mb-8">
          <SkeletonBase 
            width="40px" 
            height="40px" 
            borderRadius="50%"
            delay={0.2}
            prefersReducedMotion={prefersReducedMotion}
          />
          <SkeletonBase 
            width="40px" 
            height="40px" 
            borderRadius="50%"
            delay={0.25}
            prefersReducedMotion={prefersReducedMotion}
          />
        </div>
        
        {/* Industry cards */}
        <SkeletonGrid 
          columns={4} 
          rows={1} 
          gap={3}
          cardProps={{ showImage: true, showTitle: true, showDescription: false, showActions: false }}
          prefersReducedMotion={prefersReducedMotion}
        />
        
        {/* Pagination dots */}
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: 5 }).map((_, index) => (
            <SkeletonBase
              key={index}
              width="12px"
              height="12px"
              borderRadius="50%"
              delay={0.5 + index * 0.05}
              prefersReducedMotion={prefersReducedMotion}
            />
          ))}
        </div>
      </div>
    </div>
  </motion.div>
);

// Testimonials skeleton
export const SkeletonTestimonials = ({ prefersReducedMotion = false }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.4 }}
    style={{
      padding: '120px 0',
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
    }}
  >
    <div className="max-w-6xl mx-auto px-4 md:px-8">
      {/* Header */}
      <div className="text-center mb-16">
        <SkeletonBase 
          width="420px" 
          height="48px" 
          borderRadius="8px"
          className="mx-auto mb-4"
          prefersReducedMotion={prefersReducedMotion}
        />
        <SkeletonBase 
          width="580px" 
          height="20px" 
          borderRadius="6px"
          className="mx-auto"
          delay={0.1}
          prefersReducedMotion={prefersReducedMotion}
        />
      </div>
      
      {/* Testimonial cards */}
      <SkeletonGrid 
        columns={3} 
        rows={1} 
        gap={4}
        cardProps={{ 
          showImage: false, 
          showTitle: true, 
          showDescription: true, 
          showActions: false 
        }}
        prefersReducedMotion={prefersReducedMotion}
      />
    </div>
  </motion.div>
);

// Contact section skeleton
export const SkeletonContact = ({ prefersReducedMotion = false }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.4 }}
    style={{
      padding: '120px 0',
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
    }}
  >
    <div className="max-w-6xl mx-auto px-4 md:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Left side - Contact info */}
        <div>
          <SkeletonBase 
            width="300px" 
            height="42px" 
            borderRadius="8px"
            className="mb-4"
            prefersReducedMotion={prefersReducedMotion}
          />
          <SkeletonBase 
            width="100%" 
            height="18px" 
            className="mb-2"
            delay={0.1}
            prefersReducedMotion={prefersReducedMotion}
          />
          <SkeletonBase 
            width="85%" 
            height="18px" 
            className="mb-6"
            delay={0.15}
            prefersReducedMotion={prefersReducedMotion}
          />
          
          {/* Contact details */}
          <div className="flex flex-col gap-6">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="flex items-center gap-6">
                <SkeletonBase 
                  width="48px" 
                  height="48px" 
                  borderRadius="50%"
                  delay={0.2 + index * 0.05}
                  prefersReducedMotion={prefersReducedMotion}
                />
                <div>
                  <SkeletonBase 
                    width="150px" 
                    height="16px"
                    className="mb-1"
                    delay={0.25 + index * 0.05}
                    prefersReducedMotion={prefersReducedMotion}
                  />
                  <SkeletonBase 
                    width="120px" 
                    height="14px"
                    delay={0.3 + index * 0.05}
                    prefersReducedMotion={prefersReducedMotion}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Right side - Contact form */}
        <div className="bg-black/40 p-8 rounded-xl">
          <SkeletonBase 
            width="200px" 
            height="32px" 
            borderRadius="6px"
            className="mb-6"
            delay={0.2}
            prefersReducedMotion={prefersReducedMotion}
          />
          
          {/* Form fields */}
          <div className="flex flex-col gap-8">
            {Array.from({ length: 5 }).map((_, index) => (
              <SkeletonBase
                key={index}
                width="100%"
                height={index === 4 ? "120px" : "48px"}
                borderRadius="6px"
                delay={0.3 + index * 0.1}
                prefersReducedMotion={prefersReducedMotion}
              />
            ))}
            
            {/* Submit button */}
            <SkeletonBase 
              width="140px" 
              height="48px" 
              borderRadius="6px"
              delay={0.8}
              prefersReducedMotion={prefersReducedMotion}
            />
          </div>
        </div>
      </div>
    </div>
  </motion.div>
);

// Sneak peek skeleton
export const SkeletonSneakPeek = ({ prefersReducedMotion = false }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.4 }}
    style={{
      padding: '120px 0',
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
    }}
  >
    <div className="max-w-6xl mx-auto px-4 md:px-8">
      {/* Header */}
      <div className="text-center mb-16">
        <SkeletonBase 
          width="400px" 
          height="48px" 
          borderRadius="8px"
          className="mx-auto mb-4"
          prefersReducedMotion={prefersReducedMotion}
        />
        <SkeletonBase 
          width="600px" 
          height="20px" 
          borderRadius="6px"
          className="mx-auto"
          delay={0.1}
          prefersReducedMotion={prefersReducedMotion}
        />
      </div>
      
      {/* Video/Media skeleton */}
      <div className="relative mb-12">
        <SkeletonBase 
          width="100%" 
          height="500px" 
          borderRadius="16px"
          delay={0.2}
          prefersReducedMotion={prefersReducedMotion}
        />
        
        {/* Play button overlay */}
        <div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        >
          <SkeletonBase 
            width="80px" 
            height="80px" 
            borderRadius="50%"
            delay={0.4}
            prefersReducedMotion={prefersReducedMotion}
          />
        </div>
      </div>
      
      {/* Feature highlights */}
      <SkeletonGrid 
        columns={3} 
        rows={1} 
        gap={4}
        cardProps={{ 
          showImage: false, 
          showTitle: true, 
          showDescription: true, 
          showActions: false 
        }}
        prefersReducedMotion={prefersReducedMotion}
      />
    </div>
  </motion.div>
);

export default SkeletonBase;