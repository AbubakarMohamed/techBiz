"use client"
import React, { useRef } from 'react'
import Navbar from '@/components/nav-bar'
import HeroRefContext from '@/lib/heroContext'
import BackToTopButton from '@/components/BackToTopButton'

export default function Providers({ children }) {
  const heroRef = useRef(null)

  return (
    <HeroRefContext.Provider value={heroRef}>
      <Navbar />
      {children}
      <BackToTopButton />
    </HeroRefContext.Provider>
  )
}
