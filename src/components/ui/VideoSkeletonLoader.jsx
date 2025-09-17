'use client';

/**
 * VideoSkeletonLoader Component
 * 
 * A sophisticated skeleton loader for video components that provides
 * smooth shimmer effects and progress indication during video loading.
 */
import React from 'react';
import { motion } from 'framer-motion';

const VideoSkeletonLoader = ({ 
  type = 'intro', // 'intro' | 'main'
  loadingText = 'Loading Experience...',
  showProgress = true,
  prefersReducedMotion = false 
}) => {
  const isIntro = type === 'intro';
  
  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-center backdrop-blur-sm"
      style={{
        zIndex: isIntro ? 3 : 2,
        backgroundColor: 'rgba(255, 255, 255, 0.95)', // White background
        gap: isIntro ? '16px' : '12px'
      }}
    >
      {/* Animated skeleton background with shimmer effect */}
      <div
        className="absolute inset-0"
        style={{
          background: isIntro 
            ? 'linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.08) 50%, transparent 100%)'
            : 'linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.05) 50%, transparent 100%)',
          animation: prefersReducedMotion ? 'none' : `skeleton-shimmer ${isIntro ? '2s' : '2.5s'} ease-in-out infinite`
        }}
      />
      <style jsx>{`
        @keyframes skeleton-shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes skeleton-fade {
          0% { opacity: 0.3; }
          100% { opacity: 0.7; }
        }
        @keyframes skeleton-pulse {
          0% { opacity: 0.3; }
          100% { opacity: 0.7; }
        }
      `}</style>
      
      {/* Geometric skeleton patterns */}
      {!prefersReducedMotion && (
        <>
          {/* Corner decorative elements */}
          {[...Array(4)].map((_, i) => (
            <div
              key={`corner-${i}`}
              className="absolute w-15 h-15 md:w-20 md:h-20 border border-gray-300 rounded-xl"
              style={{
                ...(i === 0 && { top: 20, left: 20 }),
                ...(i === 1 && { top: 20, right: 20 }),
                ...(i === 2 && { bottom: 20, left: 20 }),
                ...(i === 3 && { bottom: 20, right: 20 }),
                animation: `skeleton-fade ${2 + i * 0.2}s ease-in-out infinite alternate`
              }}
            />
          ))}
          
          {/* Center grid pattern */}
          <div className="absolute w-3/5 h-2/5 grid grid-cols-3 grid-rows-2 gap-2 opacity-30">
            {[...Array(6)].map((_, i) => (
              <div
                key={`grid-${i}`}
                className="rounded-lg"
                style={{
                  background: 'linear-gradient(135deg, rgba(0,0,0,0.1), transparent)',
                  animation: `skeleton-pulse ${1.5 + i * 0.1}s ease-in-out infinite alternate`
                }}
              />
            ))}
          </div>
        </>
      )}
      
      {/* Loading spinner */}
      <motion.div
        animate={!prefersReducedMotion ? { rotate: 360 } : {}}
        transition={{ 
          duration: isIntro ? 2 : 1.5, 
          repeat: Infinity, 
          ease: 'linear' 
        }}
        style={{
          width: isIntro ? 48 : 36,
          height: isIntro ? 48 : 36,
          border: `${isIntro ? '3px' : '2px'} solid rgba(0,0,0,0.2)`,
          borderTop: `${isIntro ? '3px' : '2px'} solid ${isIntro ? '#E7B620' : 'rgba(0,0,0,0.8)'}`,
          borderRadius: '50%',
          zIndex: 10,
        }}
      />
      
      {/* Loading text - only for intro */}
      {isIntro && loadingText && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          style={{
            color: 'rgba(0,0,0,0.8)',
            fontSize: '14px',
            fontWeight: 500,
            textAlign: 'center',
            letterSpacing: '0.5px',
            zIndex: 10,
          }}
        >
          {loadingText}
        </motion.div>
      )}
      
      {/* Progress dots indicator */}
      {showProgress && isIntro && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          style={{
            display: 'flex',
            gap: '8px',
            marginTop: '8px',
            zIndex: 10,
          }}
        >
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={`dot-${i}`}
              animate={{
                opacity: prefersReducedMotion ? 0.5 : [0.3, 1, 0.3],
                scale: prefersReducedMotion ? 1 : [1, 1.2, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
                ease: 'easeInOut',
              }}
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                backgroundColor: 'rgba(0,0,0,0.6)',
              }}
            />
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default VideoSkeletonLoader;