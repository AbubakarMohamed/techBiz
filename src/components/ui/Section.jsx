"use client";

import React from 'react';

const Section = React.forwardRef(({ 
  children, 
  className = '', 
  background = 'white',
  padding = 'default',
  id,
  fullWidth = false 
}, ref) => {
  const backgrounds = {
    white: 'bg-white',
    gray: 'bg-gray-50',
    gradient: 'bg-gradient-to-br from-slate-50 via-blue-50/40 to-purple-50/40',
    dark: 'bg-[#0f1724]'
  };

  const paddings = {
    none: 'py-0',
    compact: 'py-4 md:py-8',
    small: 'py-6 md:py-10',
    default: 'py-8 md:py-12',
    large: 'py-12 md:py-18'
  };

  const containerWidth = fullWidth ? 'w-full' : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8';

  return (
    <section 
      className={`relative ${backgrounds[background]} ${paddings[padding]} overflow-hidden ${className}`}
      id={id}
      ref={ref}
    >
      <div className={`relative z-10 ${containerWidth}`}>
        {children}
      </div>
    </section>
  );
});

Section.displayName = 'Section';

export default Section;