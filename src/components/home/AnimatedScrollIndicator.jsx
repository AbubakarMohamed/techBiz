"use client";

import React, { useEffect, useRef } from "react";

export default function AnimatedScrollIndicator() {
  const dotRef = useRef(null);

  useEffect(() => {
    const el = dotRef.current;
    if (!el || !("animate" in el)) return;

    const keyframes = [
      { transform: "translate(-50%, 0)", opacity: 1 },
      { transform: "translate(-50%, 24px)", opacity: 0.35 },
      { transform: "translate(-50%, 0)", opacity: 1 },
    ];

    const anim = el.animate(keyframes, {
      duration: 2000,
      iterations: Infinity,
    });
    return () => anim.cancel();
  }, []);

  return (
    <div style={{ position: "absolute", bottom: 16, right: 16, zIndex: 3 }}>
      <div
        className="hidden md:block"
        style={{
          width: 38,
          height: 64,
          borderRadius: 4,
          border: "1px solid rgba(255,255,255,0.18)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <span
          ref={dotRef}
          style={{
            display: "block",
            position: "absolute",
            top: 8,
            left: "50%",
            transform: "translateX(-50%)",
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.9)",
          }}
        />
      </div>
    </div>
  );
}
