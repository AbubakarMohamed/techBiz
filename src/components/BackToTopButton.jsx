"use client";

import { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";

export default function BackToTopButton() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  if (!scrolled) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 w-12 h-12 bg-gray-800 hover:bg-gray-700 text-white flex items-center justify-center rounded-full shadow-lg z-50 focus:outline-none transition-transform duration-150 transform-gpu hover:scale-105 active:scale-95"
      aria-label="Back to top"
    >
      <ChevronUp className="w-6 h-6" aria-hidden="true" />
    </button>
  );
}
