"use client";

import { useEffect } from "react";
import PWAInstaller from "@/components/PWAInstaller";

export default function ClientLayout({ children }) {
  useEffect(() => {
    function setVH() {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    }
    setVH();
    window.addEventListener("resize", setVH);
    return () => window.removeEventListener("resize", setVH);
  }, []);

  return (
    <>
      <PWAInstaller />
      {children}
    </>
  );
}
