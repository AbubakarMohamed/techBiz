"use client";

import dynamic from 'next/dynamic';
import React from 'react';

const HeroClient = dynamic(() => import('./HeroClient'), { ssr: false, loading: () => null });

export default function HeroClientWrapper({ heroId, showScrollIndicator = true }) {
  // simple client boundary that mounts the scroll indicator
  return <HeroClient heroId={heroId} showScrollIndicator={showScrollIndicator} />;
}
