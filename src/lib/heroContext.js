"use client";
import React from "react";

// Provides a shared ref for the hero section so Navbar can observe it.
const HeroRefContext = React.createContext(null);

export default HeroRefContext;
