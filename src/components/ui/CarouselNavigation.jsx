"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { ACCENT } from '@/styles/theme';

export default function CarouselNavigation({ 
  currentPage, 
  totalPages, 
  onPaginate, 
  onGoToPage,
  theme = "light",
  showDots = true,
  showArrows = true 
}) {
  const themeStyles = {
    light: {
      arrow: `p-3 rounded-full border bg-white hover:bg-blue-50 hover:border-blue-400 transition-all duration-300 backdrop-blur-sm group shadow-md hover:shadow-lg`,
      arrowBorder: `${ACCENT}40`,
      arrowIcon: ACCENT,
      dotActive: { backgroundColor: ACCENT, boxShadow: `0 10px 25px ${ACCENT}30` },
      dotInactive: 'bg-gray-400 hover:bg-gray-500'
    },
    dark: {
      arrow: `p-3 rounded-full border border-gray-700/50 bg-gray-800/50 hover:bg-blue-500/20 hover:border-blue-400/50 transition-all duration-300 backdrop-blur-sm group`,
      arrowBorder: 'gray-700/50',
      arrowIcon: 'text-gray-400 group-hover:text-blue-400',
      dotActive: { backgroundColor: '#3B82F6', boxShadow: '0 10px 25px rgba(59, 130, 246, 0.3)' },
      dotInactive: 'bg-gray-600 hover:bg-gray-500'
    }
  };

  const currentTheme = themeStyles[theme];

  return (
    <div className="flex items-center justify-center mt-4 sm:mt-6">
      {/* Desktop arrows */}
      {showArrows && (
        <div className="hidden md:flex gap-4">
          <button
            onClick={() => onPaginate(-1)}
            className={currentTheme.arrow}
            style={theme === 'light' ? { borderColor: currentTheme.arrowBorder } : {}}
            aria-label="Previous item"
          >
            <ArrowLeft 
              className="h-5 w-5 transition-colors duration-300" 
              style={theme === 'light' ? { color: currentTheme.arrowIcon } : {}}
              {...(theme === 'dark' && { className: `h-5 w-5 ${currentTheme.arrowIcon} transition-colors duration-300` })}
            />
          </button>
          <button
            onClick={() => onPaginate(1)}
            className={currentTheme.arrow}
            style={theme === 'light' ? { borderColor: currentTheme.arrowBorder } : {}}
            aria-label="Next item"
          >
            <ArrowRight 
              className="h-5 w-5 transition-colors duration-300" 
              style={theme === 'light' ? { color: currentTheme.arrowIcon } : {}}
              {...(theme === 'dark' && { className: `h-5 w-5 ${currentTheme.arrowIcon} transition-colors duration-300` })}
            />
          </button>
        </div>
      )}
      
      {/* Mobile dots */}
      {showDots && (
        <div className="flex md:hidden gap-2">
          {Array.from({ length: totalPages }, (_, idx) => (
            <button
              key={idx}
              onClick={() => onGoToPage(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === currentPage 
                  ? 'w-8 shadow-lg' 
                  : `${currentTheme.dotInactive} w-2 hover:w-3`
              }`}
              style={idx === currentPage ? currentTheme.dotActive : {}}
              aria-label={`Go to item ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}