'use client';

/**
 * HeroSection Component
 * 
 * A two-video hero section with intro loader and main background video.
 * Features sequential video playback, responsive design, and content reveal after intro.
 * 
 * @component
 */
import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { Button } from '../../ui/button';
import HeroClientWrapper from './HeroClientWrapper';
import VideoSkeletonLoader from '../../ui/VideoSkeletonLoader';
import SimplifiedCertificates from './SimplifiedCertificates';
import { motion } from 'framer-motion';

// Animation constants

// Performance: Memoize cubic bezier for reuse

// Color constants

const defaultConfig = {
  id: 'site-hero',
 heading:"Powering Businesses Across Industries\n with Intelligent Digital Solutions.",
  subheading: 'From custom software to enterprise systems, we deliver technology that\n empowers organizations to innovate, scale, and lead across industries.',
  primaryCTA: {
    text: 'Book A Strategy Call',
    href: '#contact',
    ariaLabel: 'Book A Strategy Call',
  },
  secondaryCTA: {
    text: 'Download Our Company Profile',
    href: '/documents/company-profile.pdf',
    ariaLabel: 'Download Our Company Profile',
    download: true,
  },
};

export default function HeroSection({
  id = defaultConfig.id,
  heading = defaultConfig.heading,
  subheading = defaultConfig.subheading,
  primaryCTA = defaultConfig.primaryCTA,
  secondaryCTA = defaultConfig.secondaryCTA,
  centerContent = false,
}) {
  // Consolidated state to reduce re-renders
  const [heroState, setHeroState] = useState({
    showContent: false,
    introVideoEnded: false,
    mainVideoReady: false,
    isMounted: false,
    isFirstLoad: true,
    introVideoError: false,
    mainVideoError: false,
    introVideoLoaded: false,
    mainVideoLoaded: false,
    isSlowConnection: false,
    isMobile: false,
    videoTransitioning: false,
    prefersReducedMotion: false,
    videoInView: false
  });
  const videoRef = useRef(null);

  // Helper function to update state efficiently
  const updateHeroState = useCallback((updates) => {
    setHeroState(prev => ({ ...prev, ...updates }));
  }, []);

  // Destructure commonly used state values
  const {
    showContent, introVideoEnded, isFirstLoad,
    introVideoError, mainVideoError, introVideoLoaded, mainVideoLoaded,
    isSlowConnection, isMobile, videoTransitioning, prefersReducedMotion, videoInView
  } = heroState;



  /**
   * Get video source based on device and connection
   */
  const getVideoSource = useCallback((videoName) => {
    if (isSlowConnection) return null;

    const quality = isMobile ? '' : ''; // Can add mobile variants later
    return `/videos/${videoName}${quality}.mp4`;
  }, [isMobile, isSlowConnection]);
  /**
   * Check device type, connection quality, and motion preferences
   */
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Check device type
    const checkMobile = () => updateHeroState({ isMobile: window.innerWidth <= 768 });
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Check motion preferences
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    updateHeroState({ prefersReducedMotion: motionQuery.matches });
    const handleMotionChange = (e) => updateHeroState({ prefersReducedMotion: e.matches });
    motionQuery.addEventListener('change', handleMotionChange);

    // Check connection quality
    const checkConnection = () => {
      if ('connection' in navigator) {
        const conn = navigator.connection;
        const slow = conn.effectiveType === '2g' ||
          conn.effectiveType === 'slow-2g' ||
          conn.saveData;
        updateHeroState({ isSlowConnection: slow });
      }
    };
    checkConnection();

    if (navigator.connection) {
      navigator.connection.addEventListener('change', checkConnection);
    }

    // Simplified intersection observer - no heavy preloading
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        updateHeroState({ videoInView: entry.isIntersecting });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      window.removeEventListener('resize', checkMobile);
      motionQuery.removeEventListener('change', handleMotionChange);
      if (navigator.connection) {
        navigator.connection.removeEventListener('change', checkConnection);
      }
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, [getVideoSource, isMobile, isSlowConnection]);

  /**
   * Initialize component - simplified without heavy preloading
   */
  useEffect(() => {
    if (typeof window === 'undefined') return;
    updateHeroState({ isMounted: true });
  }, [updateHeroState]);

  /**
   * Handle slow connection or reduced motion - skip intro if needed
   */
  useEffect(() => {
    if (isSlowConnection || prefersReducedMotion) {
      // Still show intro briefly even on slow connections, then fallback
      if (isFirstLoad && !prefersReducedMotion) {
        setTimeout(() => {
          updateHeroState({ introVideoEnded: true, showContent: true });
        }, 1000);
      } else {
        updateHeroState({ introVideoEnded: true, showContent: true });
      }
    }
  }, [isSlowConnection, prefersReducedMotion, isFirstLoad, updateHeroState]);

  /**
   * Handle intro video end - simplified transition
   */
  const handleIntroVideoEnd = useCallback(() => {
    updateHeroState({ videoTransitioning: true });
    
    setTimeout(() => {
      updateHeroState({ 
        introVideoEnded: true, 
        videoTransitioning: false 
      });
      setTimeout(() => updateHeroState({ showContent: true }), 300);
    }, 200);
  }, [updateHeroState]);

  /**
   * Handle video errors - simplified
   */
  const handleIntroVideoError = useCallback(() => {
    updateHeroState({ 
      introVideoError: true, 
      introVideoEnded: true, 
      showContent: true 
    });
  }, [updateHeroState]);

  const handleMainVideoError = useCallback(() => {
    updateHeroState({ 
      mainVideoError: true, 
      mainVideoReady: true 
    });
  }, [updateHeroState]);

  /**
   * Handle main video ready state
   */
  const handleMainVideoReady = useCallback(() => {
    updateHeroState({ mainVideoReady: true });
  }, [updateHeroState]);




  /** Performance optimizations: Memoized callbacks and styles */

  // Remove unused buttonGradient - it's not being used anywhere

  const contentStyles = useMemo(() => ({
    opacity: showContent ? 1 : 0,
    transform: showContent
      ? 'translateY(0) scale(1)'
      : 'translateY(40px) scale(0.95)',
    transition: 'all 1s cubic-bezier(0.4, 0, 0.2, 1)',
    filter: showContent ? 'blur(0px)' : 'blur(2px)',
  }), [showContent]);

  return (
    <section
      id={id}
      role="region"
      aria-labelledby={`${id}-heading`}
      aria-describedby={`${id}-subhead`}
      className="relative w-full overflow-hidden flex items-center justify-center bg-[#0a0a0a] z-0 box-border"
      style={{
        paddingTop: '64px', // Fixed navbar height
      }}
    >
      {/* Video Background - Two-video System */}
      <div ref={videoRef} className="absolute inset-0 z-0">
        {/* No poster image as per director's requirement - intro video always first */}

        {/* Intro Video - Only on first load, good connection, and motion allowed */}
        {(() => {
          const shouldShowIntro =
            !introVideoEnded && !introVideoError && !isSlowConnection && !prefersReducedMotion && videoInView;
          return shouldShowIntro;
        })() && (
            <>
              {/* Enhanced loading skeleton for intro video */}
              {!introVideoLoaded && (
                <VideoSkeletonLoader 
                  type="intro" 
                  loadingText="Loading Experience..." 
                  showProgress={true}
                  prefersReducedMotion={prefersReducedMotion}
                />
              )}

              <video
                autoPlay={videoInView}
                muted
                playsInline
                preload="metadata"
                onEnded={handleIntroVideoEnd}
                onError={handleIntroVideoError}
                onLoadedData={() => {
                  updateHeroState({ introVideoLoaded: true });
                }}
                onCanPlay={() => {
                  updateHeroState({ introVideoLoaded: true });
                }}
                aria-label="Techbiz company introduction video"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  zIndex: 2,
                  opacity: introVideoLoaded ? 1 : 0,
                  transition: 'opacity 0.4s ease-out',
                  transform: introVideoLoaded ? 'scale(1)' : 'scale(1.02)',
                }}
              >
                <source
                  src={getVideoSource('HeroSectionVideoIntro')}
                  type="video/mp4"
                />
              </video>
            </>
          )}

        {/* Main Video - Shows after intro ends or on subsequent loads */}
        {introVideoEnded && !mainVideoError && !prefersReducedMotion && (
          <>
            {/* Enhanced loading skeleton for main video */}
            {!mainVideoLoaded && videoInView && (
              <VideoSkeletonLoader 
                type="main" 
                showProgress={false}
                prefersReducedMotion={prefersReducedMotion}
              />
            )}

            <video
              autoPlay={videoInView}
              muted
              loop
              playsInline
              preload="metadata"
              onCanPlayThrough={handleMainVideoReady}
              onError={handleMainVideoError}
              onLoadedData={() => {
                updateHeroState({ mainVideoLoaded: true });
              }}
              onCanPlay={() => {
                updateHeroState({ mainVideoLoaded: true });
              }}
              aria-label="Technology solutions background video - decorative"
              role="presentation"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                position: 'absolute',
                top: 0,
                left: 0,
                zIndex: 1,
                opacity: mainVideoLoaded && !videoTransitioning ? 1 : 0,
                transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
                transform: mainVideoLoaded ? 'scale(1)' : 'scale(1.01)',
              }}
            >
              <source
                src={getVideoSource('HeroSectionVideo')}
                type="video/mp4"
              />
            </video>
          </>
        )}

        {/* Intro Video Overlays - Darker overlay for better logo visibility */}
        {(() => {
          const shouldShowIntroOverlay =
            !introVideoEnded && !introVideoError && !isSlowConnection && !prefersReducedMotion && videoInView;
          return shouldShowIntroOverlay;
        })() && (
          <>
            <div
              aria-hidden
              className="absolute inset-0 z-[4] pointer-events-none transition-opacity duration-300 ease-in-out"
              style={{ opacity: 0.95 }}
            />
            <div
              aria-hidden
              className="absolute inset-0 z-[4.5] pointer-events-none transition-opacity duration-300 ease-in-out mix-blend-normal sm:mix-blend-multiply"
              style={{ opacity: 0.9 }}
            />
          </>
        )}

        {/* Main Video Overlays - Lighter overlay for better content readability */}
        {introVideoEnded && !mainVideoError && !prefersReducedMotion && (
          <>
            <div
              aria-hidden
              className="absolute inset-0 z-[4] pointer-events-none transition-opacity duration-[600ms] ease-in-out"
              style={{
                background: 'linear-gradient(135deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.9) 50%, rgba(0,0,0,0.85) 100%)',
                opacity: showContent ? 0.85 : 0.95
              }}
            />
            <div
              aria-hidden
              className="absolute inset-0 z-[4.5] pointer-events-none transition-opacity duration-[600ms] ease-in-out mix-blend-normal sm:mix-blend-multiply"
              style={{
                background: typeof window !== 'undefined' && window?.innerWidth <= 640 
                  ? 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.9) 40%, rgba(0,0,0,0.9) 100%)'
                  : 'radial-gradient(circle at center, rgba(15,76,129,0.4) 0%, rgba(15,76,129,0.9) 70%, rgba(15,76,129,0.85) 100%)',
                opacity: showContent ? 0.75 : 0.9
              }}
            />
          </>
        )}

        {/* Fallback overlay for when videos are disabled/error */}
        {(introVideoError || mainVideoError || isSlowConnection || prefersReducedMotion) && (
          <>
            <div
              aria-hidden
              className="absolute inset-0 z-[4] pointer-events-none transition-opacity duration-[600ms] ease-in-out"
              style={{
                background: 'linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.75) 50%, rgba(0,0,0,0.85) 100%)',
                opacity: 0.9
              }}
            />
            <div
              aria-hidden
              className="absolute inset-0 z-[4.5] pointer-events-none transition-opacity duration-[600ms] ease-in-out mix-blend-normal sm:mix-blend-multiply"
              style={{
                background: typeof window !== 'undefined' && window?.innerWidth <= 640 
                  ? 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.85) 40%, rgba(0,0,0,0.85) 100%)'
                  : 'radial-gradient(circle at center, rgba(15,76,129,0.5) 0%, rgba(15,76,129,0.85) 70%, rgba(15,76,129,0.8) 100%)',
                opacity: 0.8
              }}
            />
          </>
        )}
      </div>
      {/* Video transition overlay */}
      {videoTransitioning && (
        <div
          className="absolute inset-0 z-[5] pointer-events-none"
          style={{
            backgroundColor: 'rgba(0,0,0,0.9)',
            backdropFilter: 'blur(8px)',
          }}
        />
      )}

      {/* Client-side effects - only scroll indicator */}
      <div className="absolute inset-0 z-[6] pointer-events-none">
        <HeroClientWrapper heroId={id} showScrollIndicator={showContent} />
      </div>

      {/* Content */}
      <div
        className={`relative z-[4] w-full h-full flex flex-col box-border ${
          centerContent ? 'items-center text-center md:items-center md:text-center' : 'items-start text-left md:items-start md:text-left'
        } justify-start sm:justify-center md:justify-center gap-1 sm:gap-3 md:gap-4 px-10 sm:px-16 md:px-24 py-2 sm:py-16 md:py-20`}
        style={contentStyles}
      >

        {/* Main content container - fixed height to prevent shifts */}
        <div
          className={`flex-none flex flex-col z-[5] w-full bg-transparent border-none gap-2 sm:gap-4 md:gap-5 pb-10 sm:pb-8 md:pb-4 -mt-4 sm:mt-0 md:mt-0 ${
            centerContent ? 'items-center text-center max-w-none' : 'items-start text-left max-w-full md:max-w-none'
          }`}
        >
          <motion.div
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 50, scale: prefersReducedMotion ? 1 : 0.95 }}
            animate={{
              opacity: showContent ? 1 : 0,
              y: showContent ? 0 : (prefersReducedMotion ? 0 : 50),
              scale: showContent ? 1 : (prefersReducedMotion ? 1 : 0.95)
            }}
            transition={{
              duration: prefersReducedMotion ? 0.3 : 1.2,
              ease: [0.4, 0, 0.2, 1],
              delay: showContent ? (prefersReducedMotion ? 0 : 0.2) : 0
            }}
            style={{
              minHeight: isMobile ? 'auto' : '4rem',
              display: 'flex',
              flexDirection: 'column',
              gap: isMobile ? '0.75rem' : '1.5rem',
              alignItems: centerContent ? 'center' : 'flex-start',
              textAlign: centerContent ? 'center' : 'left',
              marginTop: isMobile ? '0.5rem' : '0',
              marginBottom: isMobile ? '0' : '0',
              width: '100%',
              maxWidth: isMobile ? '100%' : 'none',
              flex: 'none'
            }}
          >
            <motion.h1
              id={`${id}-heading`}
              className="text-xl xs:text-xl sm:text-3xl md:text-3xl lg:text-3xl xl:text-5xl font-bold tracking-tight line-clamp-3 leading-tight"
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 30 }}
              animate={{
                opacity: showContent ? 1 : 0,
                y: showContent ? 0 : (prefersReducedMotion ? 0 : 30)
              }}
              transition={{
                duration: prefersReducedMotion ? 0.2 : 1,
                ease: [0.4, 0, 0.2, 1],
                delay: showContent ? (prefersReducedMotion ? 0 : 0.4) : 0
              }}
              style={{
                margin: 0,
                letterSpacing: isMobile ? '-0.015em' : '-0.025em',
                fontFamily: 'var(--font-inter), var(--font-roboto)',
                textRendering: 'optimizeLegibility',
                background: 'transparent',
                color: 'rgba(255,255,255,1)',
                filter: 'contrast(1.1)',
                lineHeight: isMobile ? '1.05' : '1.2',
                marginTop:isMobile ? '1rem':'0rem',
                marginBottom: isMobile ? '0rem' : '1rem',
  textAlign: 'justify',   // ✅ change this
    textJustify: 'inter-word',               }}
            >
              {isMobile ? (
                heading.replace(/\n/g, ' ')
              ) : (
                heading.split('\n').map((line, i) => (
                  <React.Fragment key={i}>
                    {line}
                    {i < heading.split('\n').length - 1 && <br />}
                  </React.Fragment>
                ))
              )}
            </motion.h1>
            <motion.p
              id={`${id}-subhead`}
              className="text-sm xs:text-sm sm:text-lg md:text-xl line-clamp-3 lg:text-xl font-normal leading-relaxed"
              initial={{ opacity: 0, y: 25 }}
              animate={{
                opacity: showContent ? 1 : 0,
                y: showContent ? 0 : 25
              }}
              transition={{
                duration: 1,
                ease: [0.4, 0, 0.2, 1],
                delay: showContent ? 0.6 : 0
              }}
              style={{
                maxWidth: isMobile ? '95%' : '52ch',
                fontFamily: 'var(--font-inter), system-ui, -apple-system, sans-serif',
                letterSpacing: isMobile ? '-0.005em' : '-0.01em',
                lineHeight: isMobile ? '1.3' : '1.65',
                background: 'transparent',
                color: isMobile ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.95)',
                filter: 'contrast(1.05)',
                  textAlign: 'justify',   // ✅ change this
    textJustify: 'inter-word', 
                marginTop: isMobile ? '0' : '0.5rem',
              }}
            >
              {subheading}
            </motion.p>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, marginTop: 0, scale: 0.9 }}
            animate={{
              opacity: showContent ? 1 : 0,
              marginTop: showContent ? (isMobile ? 1 : 0) : 0, // numbers = px
              scale: showContent ? 1 : 0.9,
            }}
            transition={{
              duration: 0.8,
              ease: [0.4, 0, 0.2, 1],
              delay: showContent ? 0.8 : 0,
            }}
            style={{
              display: "flex",
              padding: "0",
              gap: isMobile ? "0.75rem" : "1.25rem",
              flexWrap: "wrap",
              justifyContent: centerContent ? "center" : "flex-start",
              alignItems: "center",
              width: "100%",
              flex: 'none',
              marginTop: isMobile ? '0.75rem' : '1.5rem'
            }}
          >

            {primaryCTA && (
              <Button
                asChild
                variant="default"
                size={isMobile ? "xs" : "sm"}
                className={`bg-[#E7B620] hover:bg-[#d4a31d] text-black font-semibold transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 ${isMobile ? 'px-4 py-2 text-sm' : 'px-6 py-3'}`}
              >
                <a
                  href={primaryCTA.href}
                  aria-label={primaryCTA.ariaLabel || "Book A Strategy Call"}
                >
                  {primaryCTA.text}
                </a>
              </Button>
            )}

            {secondaryCTA && (
              <Button
                asChild
                variant="link"
                size={isMobile ? "xs" : "sm"}
                className={`text-blue-400 hover:text-blue-300 hover:underline transition-all duration-200 font-medium ${isMobile ? 'p-1 text-xs' : 'p-2'}`}
              >
                <a
                  href={secondaryCTA.href}
                  aria-label={secondaryCTA.ariaLabel || "Download Our Company Profile"}
                  download={secondaryCTA.download}
                  className="flex items-center gap-2"
                >
                  {secondaryCTA.text}
                </a>
              </Button>
            )}
          </motion.div>
        </div>

        {/* Simplified Certificates */}
        <SimplifiedCertificates 
          showContent={showContent}
          isMobile={isMobile}
          centerContent={centerContent}
        />
      </div>
    </section>
  );
}
