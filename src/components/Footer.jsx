"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Linkedin,
  Instagram,
  Twitter,
  Facebook,
  Youtube,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";

export default function Footer() {
  return (
    <footer
      className="relative bg-slate-900 text-white overflow-hidden"
      role="contentinfo"
    >
      {/* Hexagonal Pattern Background with Smooth Fade Effect */}
      <div className="absolute inset-0 pointer-events-none">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 800"
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full"
          style={{
            zIndex: 1,
          }}
        >
          <defs>
            {/* Enhanced gradient with smoother transitions */}
            <linearGradient
              id="hexagonGradient"
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#0F4C81" stopOpacity="0.25" />
              <stop offset="30%" stopColor="#1E88E5" stopOpacity="0.20" />
              <stop offset="60%" stopColor="#42A5F5" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#64B5F6" stopOpacity="0.10" />
            </linearGradient>

            {/* Smooth fade mask for entire section */}
            <radialGradient id="smoothFadeMask" cx="50%" cy="80%" r="80%">
              <stop offset="0%" stopColor="white" stopOpacity="1" />
              <stop offset="40%" stopColor="white" stopOpacity="0.8" />
              <stop offset="70%" stopColor="white" stopOpacity="0.4" />
              <stop offset="90%" stopColor="white" stopOpacity="0.15" />
              <stop offset="100%" stopColor="white" stopOpacity="0.05" />
            </radialGradient>

            {/* Vertical fade mask for top-to-bottom gradient */}
            <linearGradient id="verticalFade" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="white" stopOpacity="0.05" />
              <stop offset="20%" stopColor="white" stopOpacity="0.15" />
              <stop offset="50%" stopColor="white" stopOpacity="0.4" />
              <stop offset="80%" stopColor="white" stopOpacity="0.7" />
              <stop offset="100%" stopColor="white" stopOpacity="1" />
            </linearGradient>

            {/* Combined mask for smooth overall fade */}
            <mask id="combinedFadeMask">
              <rect width="100%" height="100%" fill="url(#verticalFade)" />
            </mask>

            <filter id="softGlow">
              <feGaussianBlur stdDeviation="1" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <g fill="none" mask="url(#combinedFadeMask)">
            {/* Hexagonal paths with enhanced styling and fade mask */}
            <path
              d="M130.86 194.75L195.81 232.25L195.81 307.25L130.86 344.75L65.9 307.25L65.9 232.25zM195.81 307.25L260.76 344.75L260.76 419.75L195.81 457.25L130.86 419.75L130.86 344.75zM325.72 82.25L390.67 119.75L390.67 194.75L325.72 232.25L260.76 194.75L260.76 119.75zM260.76 194.75L325.72 232.25L325.72 307.25L260.76 344.75L195.81 307.25L195.81 232.25zM325.72 307.25L390.67 344.75L390.67 419.75L325.72 457.25L260.76 419.75L260.76 344.75zM260.76 419.75L325.72 457.25L325.72 532.25L260.76 569.75L195.81 532.25L195.81 457.25zM455.63 82.25L520.58 119.75L520.58 194.75L455.63 232.25L390.67 194.75L390.67 119.75zM390.67 419.75L455.63 457.25L455.63 532.25L390.67 569.75L325.72 532.25L325.72 457.25zM520.58 -30.25L585.53 7.25L585.53 82.25L520.58 119.75L455.63 82.25L455.63 7.25zM585.53 307.25L650.49 344.75L650.49 419.75L585.53 457.25L520.58 419.75L520.58 344.75zM585.53 532.25L650.49 569.75L650.49 644.75L585.53 682.25L520.58 644.75L520.58 569.75zM650.49 194.75L715.44 232.25L715.44 307.25L650.49 344.75L585.53 307.25L585.53 232.25zM715.44 307.25L780.4 344.75L780.4 419.75L715.44 457.25L650.49 419.75L650.49 344.75zM845.35 532.25L910.3 569.75L910.3 644.75L845.35 682.25L780.39 644.75L780.39 569.75zM910.3 194.75L975.26 232.25L975.26 307.25L910.3 344.75L845.35 307.25L845.35 232.25zM975.26 532.25L1040.21 569.75L1040.21 644.75L975.26 682.25L910.3 644.75L910.3 569.75zM1040.21 -30.25L1105.16 7.25L1105.16 82.25L1040.21 119.75L975.26 82.25L975.26 7.25zM1235.07 82.25L1300.02 119.75L1300.02 194.75L1235.07 232.25L1170.12 194.75L1170.12 119.75zM1170.12 194.75L1235.07 232.25L1235.07 307.25L1170.12 344.75L1105.16 307.25L1105.16 232.25zM1170.12 419.75L1235.07 457.25L1235.07 532.25L1170.12 569.75L1105.16 532.25L1105.16 457.25zM1300.03 419.75L1364.98 457.25L1364.98 532.25L1300.03 569.75L1235.07 532.25L1235.07 457.25zM1364.98 532.25L1429.93 569.75L1429.93 644.75L1364.98 682.25L1300.03 644.75L1300.03 569.75zM1429.93 -30.25L1494.89 7.25L1494.89 82.25L1429.93 119.75L1364.98 82.25L1364.98 7.25zM1429.93 419.75L1494.89 457.25L1494.89 532.25L1429.93 569.75L1364.98 532.25L1364.98 457.25z"
              stroke="url(#hexagonGradient)"
              strokeWidth="1.2"
              filter="url(#softGlow)"
            />

            {/* Hexagonal nodes/dots with smooth fade */}
            <g fill="url(#hexagonGradient)">
              <circle cx="130.86" cy="194.75" r="2" />
              <circle cx="195.81" cy="232.25" r="2" />
              <circle cx="325.72" cy="82.25" r="2" />
              <circle cx="455.63" cy="82.25" r="2" />
              <circle cx="585.53" cy="307.25" r="2" />
              <circle cx="715.44" cy="307.25" r="2" />
              <circle cx="845.35" cy="532.25" r="2" />
              <circle cx="975.26" cy="532.25" r="2" />
              <circle cx="1105.16" cy="82.25" r="2" />
              <circle cx="1235.07" cy="232.25" r="2" />
              <circle cx="1364.98" cy="457.25" r="2" />
            </g>

            {/* Additional decorative larger hexagons with fade */}
            <g stroke="url(#hexagonGradient)" strokeWidth="0.8" fill="none">
              <path d="M138.1 47.87L181.4 72.87L181.4 122.87L138.1 147.87L94.8 122.87L94.8 72.87z" />
              <path d="M441.22 -27.13L484.52 -2.13L484.52 47.87L441.22 72.87L397.91 47.87L397.91 -2.13z" />
              <path d="M744.33 497.87L787.64 522.87L787.64 572.87L744.33 597.87L701.03 572.87L701.03 522.87z" />
              <path d="M1177.36 497.87L1220.66 522.87L1220.66 572.87L1177.36 597.87L1134.06 572.87L1134.06 522.87z" />
            </g>
          </g>
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-10 md:py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-6 md:gap-8 mb-10">
          {/* Brand & Contact Section - Takes more space */}
          <div className="md:col-span-2 lg:col-span-2 space-y-5">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/logos/techbizlogo.webp"
                alt="Techbiz Logo"
                width={130}
                height={30}
                priority
                className="h-8 sm:h-6 md:h-9 lg:h-8"
              />
            </Link>

            <p className="text-slate-300 text-base leading-relaxed max-w-md">
              Your Digital Partner - Empowering businesses with innovative
              technology solutions since 2005.
            </p>

            <address className="not-italic text-slate-300 space-y-4">
              <a
                href="tel:+254711377232"
                className="flex items-center gap-2 font-medium text-white hover:underline focus:outline-none rounded text-base"
              >
                <Phone className="w-4 h-4 text-slate-400" />
                +254 711 377 232
              </a>
              <a
                href="mailto:info@techbizafrica.com"
                className="flex items-center gap-2 font-medium text-white hover:underline focus:outline-none rounded text-base"
              >
                <Mail className="w-4 h-4 text-slate-400" />
                info@techbizafrica.com
              </a>
              <div className="text-sm leading-relaxed pt-2">
                <div className="flex justify-between gap-4">
                  {/* Nairobi Branch */}
                  <div className="mb-2 w-1/2">
                    <p className="font-medium text-white mb-1">
                      Nairobi Branch
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <MapPin className="w-4 h-4 text-slate-400" />
                      <p>Parklands Road</p>
                    </div>
                    <div className="ml-6">
                      <p>Office Suits, 2nd Floor, Block B</p>
                      <p>P.O BOX 49459 - 00100</p>
                      <span>Nairobi, Kenya</span>
                    </div>
                  </div>

                  {/* Mombasa Branch */}
                  <div className="mb-4 w-1/2">
                    <p className="font-medium text-white mb-1">
                      Mombasa Branch
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <MapPin className="w-4 h-4 text-slate-400" />
                      <p>Dr Rashid Ali Road, Kizingo</p>
                    </div>
                    <div className="ml-6">
                      <p>P.O BOX 86966 - 80100</p>
                      <span>Mombasa, Kenya</span>
                    </div>
                  </div>
                </div>
              </div>
            </address>

            {/* Social Icons */}
            <div className="flex items-center space-x-4 pt-2">
              <SocialLink
                href="https://www.linkedin.com/company/techbiz-ltd/"
                label="LinkedIn"
              >
                <Linkedin className="w-6 h-6" />
              </SocialLink>
              <SocialLink
                href="https://www.facebook.com/Techbizltd"
                label="Facebook"
              >
                <Facebook className="w-6 h-6" />
              </SocialLink>
              <SocialLink
                href="https://www.instagram.com/techbizlimited/"
                label="Instagram"
              >
                <Instagram className="w-6 h-6" />
              </SocialLink>
              <SocialLink href="https://x.com/techbizltd" label="Twitter">
                <Twitter className="w-6 h-6" />
              </SocialLink>
              <SocialLink
                href="https://www.youtube.com/@techbizltd"
                label="YouTube"
              >
                <Youtube className="w-6 h-6" />
              </SocialLink>
            </div>
          </div>

          {/* Services Column */}
          <FooterColumn title="Services">
            <FooterLink href="/#services">Software Development</FooterLink>
            <FooterLink href="/#services">Cloud & AI Solutions</FooterLink>
            <FooterLink href="/#services">Resource Augmentation</FooterLink>
            <FooterLink href="/#services">DevOps Services</FooterLink>
            <FooterLink href="/#services">USSD Development</FooterLink>
            <FooterLink href="/#services">Payment Integration</FooterLink>
          </FooterColumn>

          {/* Company Column */}
          <FooterColumn title="Company">
            <FooterLink href="/about">About Us</FooterLink>
            <FooterLink href="/#products">Our Products</FooterLink>
            <FooterLink href="/#industries">Industries</FooterLink>
            <FooterLink href="/contact">Contact</FooterLink>
            <FooterLink href="/#testimonials">Testimonials</FooterLink>
            <FooterLink href="https://www.techbizafrica.com">
              Website
            </FooterLink>
          </FooterColumn>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-slate-700 pt-5">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            {/* Copyright */}
            <div className="text-center lg:text-left">
              <p className="text-slate-500 text-base">
                © {new Date().getFullYear()} Techbiz Limited. All rights
                reserved.
              </p>
              {/* <p className="text-slate-500 text-sm mt-2">ISO 9001:2015 & ISO 27001:2022 Certified | Leading technology solutions provider in East Africa since 2005</p> */}
            </div>

            {/* Legal Links */}
            <nav
              aria-label="Legal"
              className="flex flex-wrap items-center justify-center lg:justify-end gap-6 text-slate-400"
            >
              <FooterLegal href="#">Privacy Policy</FooterLegal>
              <FooterLegal href="#">Terms & Conditions</FooterLegal>
              <FooterLegal href="#">Cookie Policy</FooterLegal>
              {/* <FooterLegal href="#">Accessibility Statement</FooterLegal> */}
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* Helper subcomponents - small, accessible, reusable */

function FooterColumn({ title, children }) {
  return (
    <div className="space-y-3">
      <h3 className="text-lg  font-semibold text-white">{title}</h3>
      <ul className="space-y-2 mt-4 text-slate-300">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }) {
  return (
    <li>
      <Link
        href={href}
        className="block hover:text-white transition-colors focus:outline-none rounded text-base"
      >
        {children}
      </Link>
    </li>
  );
}

function FooterLegal({ href, children }) {
  return (
    <Link
      href={href}
      className="hover:text-white transition-colors focus:outline-none rounded text-sm"
    >
      {children}
    </Link>
  );
}

function SocialLink({ href, children, label }) {
  return (
    <Link
      href={href}
      aria-label={label}
      className="text-slate-400 hover:text-white transition-colors focus:outline-none rounded p-1"
    >
      <span className="sr-only">{label}</span>
      {children}
    </Link>
  );
}
