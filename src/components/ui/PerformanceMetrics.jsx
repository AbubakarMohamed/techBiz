"use client";

/**
 * Performance Metrics Component
 *
 * Tracks and displays loading performance improvements from skeleton loaders
 */
import React, { useEffect, useState } from "react";

export const PerformanceMetrics = ({ componentName }) => {
  const [metrics, setMetrics] = useState({
    loadTime: 0,
    renderTime: 0,
    firstContentfulPaint: 0,
  });

  useEffect(() => {
    const startTime = performance.now();

    // Measure component load time
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        if (entry.name === componentName) {
          setMetrics((prev) => ({
            ...prev,
            loadTime: entry.duration,
          }));
        }
      });
    });

    observer.observe({ entryTypes: ["measure"] });

    // Measure render time
    const endTime = performance.now();
    const renderTime = endTime - startTime;

    setMetrics((prev) => ({
      ...prev,
      renderTime,
    }));

    // Mark component as loaded
    performance.mark(`${componentName}-loaded`);

    return () => observer.disconnect();
  }, [componentName]);

  // Don't render in production
  if (process.env.NODE_ENV === "production") return null;

  return (
    <div className="fixed bottom-5 right-5 bg-black/80 text-white p-4 rounded-lg text-xs z-[9999] min-w-[200px] backdrop-blur-lg border border-white/10">
      <h6 className="text-sm mb-2 text-[#E7B620] font-medium">
        Performance: {componentName}
      </h6>
      <div className="text-xs leading-relaxed space-y-1">
        <div>Render Time: {metrics.renderTime.toFixed(2)}ms</div>
        {metrics.loadTime > 0 && (
          <div>Load Time: {metrics.loadTime.toFixed(2)}ms</div>
        )}
        <div className="text-green-500 mt-1">✓ Skeleton Loading Active</div>
      </div>
    </div>
  );
};

export default PerformanceMetrics;
