import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import { Play, Pause, ArrowRight, ArrowLeft, Minus, Route } from "lucide-react";
import { journeyMilestones } from "@/data/journey";
import { ACCENT } from "@/styles/theme";
import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";

// Vertical Timeline Node Component
const VerticalTimelineNode = React.memo(
  ({ milestone, index, currentIndex, goToSlide }) => (
    <div className="relative flex items-center group">
      {/* Timeline Dot */}
      <button
        onClick={() => goToSlide(index)}
        className={`relative z-10 flex-shrink-0 w-4 h-4 rounded-full border-2 transition-all duration-300 focus:outline-none ${
          currentIndex === index
            ? "bg-blue-400 border-blue-400 scale-125"
            : index < currentIndex
              ? "bg-blue-400/20 border-blue-400"
              : "bg-gray-700 border-gray-500 hover:border-blue-400"
        }`}
        role="tab"
        aria-selected={currentIndex === index}
        aria-controls={`milestone-panel-${index}`}
        id={`milestone-tab-${index}`}
        tabIndex={0}
      />

      {/* Content */}
      <div className="ml-6 flex-1">
        <div
          className={`transition-all duration-300 ${
            currentIndex === index
              ? "opacity-100"
              : "opacity-70 hover:opacity-90"
          }`}
        >
          <div
            className={`text-sm font-light mb-1 transition-colors duration-300 ${
              currentIndex === index ? "text-blue-400" : "text-gray-400"
            }`}
          >
            {milestone.year}
          </div>
          <h4
            className={`text-base font-medium transition-colors duration-300 ${
              currentIndex === index
                ? "text-white"
                : "text-gray-300 group-hover:text-white"
            }`}
          >
            {milestone.title}
          </h4>
        </div>
      </div>
    </div>
  ),
);

// Minimal Progress Dots Component
const MinimalProgressDot = React.memo(
  ({ index, currentIndex, goToSlide, milestone }) => (
    <button
      onClick={() => goToSlide(index)}
      className={`transition-all duration-300 focus:outline-none ${
        currentIndex === index
          ? "w-6 h-1 bg-blue-400"
          : "w-1 h-1 bg-gray-500 hover:bg-gray-400"
      }`}
      role="tab"
      aria-selected={currentIndex === index}
      aria-label={`Go to ${milestone.year} - ${milestone.title}`}
    />
  ),
);

const JourneyCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const carouselRef = useRef(null);
  const autoPlayIntervalRef = useRef(null);
  const touchStartRef = useRef({ x: 0, y: 0 });
  const touchEndRef = useRef({ x: 0, y: 0 });
  const MIN_SWIPE_DISTANCE = 50;

  // Memoized current milestone to prevent recalculation
  const currentMilestone = useMemo(
    () => journeyMilestones[currentIndex],
    [currentIndex],
  );

  // Auto-play with interval instead of timeout
  useEffect(() => {
    if (!isAutoPlaying) {
      if (autoPlayIntervalRef.current) {
        clearInterval(autoPlayIntervalRef.current);
        autoPlayIntervalRef.current = null;
      }
      return;
    }

    autoPlayIntervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % journeyMilestones.length);
    }, 6000);

    return () => {
      if (autoPlayIntervalRef.current) {
        clearInterval(autoPlayIntervalRef.current);
        autoPlayIntervalRef.current = null;
      }
    };
  }, [isAutoPlaying, journeyMilestones.length]);

  // Keyboard navigation with useCallback
  const handleKeyDown = useCallback((event) => {
    if (
      event.target.closest('[role="button"]') ||
      event.target.closest("button")
    ) {
      switch (event.key) {
        case "ArrowUp":
        case "ArrowLeft":
          event.preventDefault();
          goToPrevious();
          break;
        case "ArrowDown":
        case "ArrowRight":
          event.preventDefault();
          goToNext();
          break;
        case " ":
        case "Enter":
          event.preventDefault();
          setIsAutoPlaying((prev) => !prev);
          break;
      }
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Navigation handlers with useCallback
  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % journeyMilestones.length);
  }, [journeyMilestones.length]);

  const goToPrevious = useCallback(() => {
    setCurrentIndex(
      (prev) =>
        (prev - 1 + journeyMilestones.length) % journeyMilestones.length,
    );
  }, [journeyMilestones.length]);

  const goToSlide = useCallback((index) => {
    setCurrentIndex(index);
  }, []);

  // Touch/swipe handlers with refs instead of state
  const handleTouchStart = useCallback((e) => {
    setIsDragging(true);
    touchStartRef.current = {
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY,
    };
  }, []);

  const handleTouchMove = useCallback(
    (e) => {
      if (!isDragging) return;
      touchEndRef.current = {
        x: e.targetTouches[0].clientX,
        y: e.targetTouches[0].clientY,
      };
    },
    [isDragging],
  );

  const handleTouchEnd = useCallback(() => {
    if (!isDragging) return;
    setIsDragging(false);

    const deltaX = touchStartRef.current.x - touchEndRef.current.x;
    const deltaY = touchStartRef.current.y - touchEndRef.current.y;
    const isHorizontalSwipe = Math.abs(deltaX) > Math.abs(deltaY);

    if (isHorizontalSwipe && Math.abs(deltaX) > MIN_SWIPE_DISTANCE) {
      if (deltaX > 0) {
        goToNext();
      } else {
        goToPrevious();
      }
    }
  }, [isDragging, goToNext, goToPrevious]);

  // Mouse drag handlers for desktop
  const handleMouseDown = useCallback((e) => {
    setIsDragging(true);
    touchStartRef.current = { x: e.clientX, y: e.clientY };
  }, []);

  const handleMouseMove = useCallback(
    (e) => {
      if (!isDragging) return;
      touchEndRef.current = { x: e.clientX, y: e.clientY };
    },
    [isDragging],
  );

  const handleMouseUp = useCallback(() => {
    if (!isDragging) return;
    setIsDragging(false);

    const deltaX = touchStartRef.current.x - touchEndRef.current.x;
    const deltaY = touchStartRef.current.y - touchEndRef.current.y;
    const isHorizontalSwipe = Math.abs(deltaX) > Math.abs(deltaY);

    if (isHorizontalSwipe && Math.abs(deltaX) > MIN_SWIPE_DISTANCE) {
      if (deltaX > 0) {
        goToNext();
      } else {
        goToPrevious();
      }
    }
  }, [isDragging, goToNext, goToPrevious]);

  // Memoize vertical timeline nodes
  const verticalTimelineNodes = useMemo(
    () =>
      journeyMilestones.map((milestone, index) => (
        <div key={index} className="relative">
          {/* Vertical line connector */}
          {index < journeyMilestones.length - 1 && (
            <div className="absolute left-2 top-4 w-0.5 h-16 bg-gray-600 -translate-x-1/2" />
          )}
          {/* Progress line for completed items */}
          {index < currentIndex && index < journeyMilestones.length - 1 && (
            <div className="absolute left-2 top-4 w-0.5 h-16 bg-blue-400 -translate-x-1/2 transition-all duration-500" />
          )}
          <VerticalTimelineNode
            milestone={milestone}
            index={index}
            currentIndex={currentIndex}
            goToSlide={goToSlide}
          />
        </div>
      )),
    [currentIndex, goToSlide],
  );

  // Memoize progress dots
  const progressDots = useMemo(
    () =>
      journeyMilestones.map((milestone, index) => (
        <MinimalProgressDot
          key={index}
          milestone={milestone}
          index={index}
          currentIndex={currentIndex}
          goToSlide={goToSlide}
        />
      )),
    [currentIndex, goToSlide],
  );

  return (
    <Section background="dark" padding="none" id="journey" fullWidth={true}>
      {/* Diagonal SVG accent */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "0",
          right: "-8%",
          width: "120%",
          height: "100%",
          opacity: 0.14,
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
            strokeOpacity="0.18"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M2200,140 C1700,180 1300,360 900,420 C600,470 300,540 0,640"
            stroke="#6aa0cf"
            strokeOpacity="0.10"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black opacity-95" />

      <div className="relative z-10 py-8 md:py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          //="Our Journey"
          title="The Milestones That Shaped Us"
          subtitle="A look back at the key moments that have defined our path and continue to inspire our future."
          centered={true}
          badgeIcon={Route}
          size="small"
          theme="dark"
        />
        {/* Vertical Timeline Layout */}
        <div className="mt-4 sm:mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Timeline Navigation - Left Column */}
            <div className="lg:col-span-1 hidden md:block">
              <div className="lg:sticky lg:top-8">
                {/* Auto-play Control */}
                <div className="mb-8 text-center lg:text-left">
                  <button
                    onClick={() => setIsAutoPlaying((prev) => !prev)}
                    className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-blue-400 transition-colors"
                    aria-label={
                      isAutoPlaying ? "Pause autoplay" : "Start autoplay"
                    }
                  >
                    {isAutoPlaying ? (
                      <>
                        <Pause className="w-3 h-3" />
                        <span>Pause</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-3 h-3" />
                        <span>Play</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Vertical Timeline */}
                <div
                  className="space-y-8"
                  role="tablist"
                  aria-label="Journey milestones"
                >
                  {verticalTimelineNodes}
                </div>

                {/* Progress Indicator */}
                <div className="mt-8 flex lg:justify-start justify-center">
                  <div
                    className="flex items-center gap-1"
                    aria-label="Journey progress"
                  >
                    {progressDots}
                  </div>
                </div>
              </div>
            </div>

            {/* Content Area - Right Column */}
            <div className="lg:col-span-2">
              <div
                className="bg-gray-800/50 backdrop-blur-sm p-4 md:p-6 lg:p-8 transition-all duration-500 cursor-grab active:cursor-grabbing border border-white/5 rounded-lg"
                style={{ minHeight: "350px" }} // Reduced height on mobile
                ref={carouselRef}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={() => setIsDragging(false)}
                role="tabpanel"
                id={`milestone-panel-${currentIndex}`}
                aria-labelledby={`milestone-tab-${currentIndex}`}
              >
                <div className="h-full flex flex-col justify-center">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center h-full">
                    {/* Content */}
                    <div className="space-y-4 flex flex-col justify-center">
                      <div className="space-y-2">
                        <div className="text-sm font-light text-blue-400 tracking-wider">
                          {currentMilestone.year}
                        </div>
                        <h3 className="text-lg md:text-xl lg:text-2xl font-light text-white leading-tight min-h-[2rem] md:min-h-[2.5rem]">
                          {currentMilestone.title}
                        </h3>
                      </div>

                      <div className="min-h-[2.5rem] md:min-h-[3rem] flex items-start">
                        <p className="text-gray-300 leading-relaxed text-xs md:text-sm">
                          {currentMilestone.description}
                        </p>
                      </div>

                      {/* Navigation Controls */}
                      <div className="flex items-center gap-4 pt-4">
                        <button
                          onClick={goToPrevious}
                          className="p-2 text-gray-400 hover:text-blue-400 transition-colors focus:outline-none"
                          aria-label="Previous milestone"
                        >
                          <ArrowLeft className="w-5 h-5" />
                        </button>

                        <span className="text-sm text-gray-400">
                          {currentIndex + 1} of {journeyMilestones.length}
                        </span>

                        <button
                          onClick={goToNext}
                          className="p-2 text-gray-400 hover:text-blue-400 transition-colors focus:outline-none"
                          aria-label="Next milestone"
                        >
                          <ArrowRight className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    {/* Image with fixed dimensions */}
                    <div className="order-first md:order-last flex items-center justify-center">
                      <div className="w-full max-w-md">
                        <div className="aspect-[4/3] bg-gray-700/50 overflow-hidden group relative rounded-lg">
                          {/* Loading skeleton */}
                          <div className="absolute inset-0 bg-gray-600/50 animate-pulse" />

                          <img
                            src={currentMilestone.image}
                            alt={`${currentMilestone.title} - ${currentMilestone.year}`}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 relative z-10"
                            loading="lazy"
                            onLoad={(e) => {
                              // Hide skeleton when image loads
                              const skeleton = e.target.previousElementSibling;
                              if (skeleton) skeleton.style.display = "none";
                            }}
                            onError={(e) => {
                              e.target.style.display = "none";
                              e.target.nextElementSibling.style.display =
                                "flex";
                            }}
                          />
                          <div className="hidden w-full h-full  items-center justify-center bg-gray-800/90 absolute inset-0 z-10">
                            <span className="text-2xl font-light text-gray-300">
                              {currentMilestone.year}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Progress Indicator - Bottom */}
          <div className="mt-6 lg:hidden flex justify-center">
            <div
              className="flex items-center gap-2"
              aria-label="Journey progress"
            >
              {journeyMilestones.map((milestone, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`transition-all duration-300 focus:outline-none rounded-full ${
                    currentIndex === index
                      ? "w-8 h-2 bg-blue-400 shadow-lg shadow-blue-400/20"
                      : "w-2 h-2 bg-gray-500 hover:bg-gray-400"
                  }`}
                  role="tab"
                  aria-selected={currentIndex === index}
                  aria-label={`Go to ${milestone.year} - ${milestone.title}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default React.memo(JourneyCarousel);
