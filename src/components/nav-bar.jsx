"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [showIndustriesMobile, setShowIndustriesMobile] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { name: "About", href: "/about" },
    { name: "Services", href: "/#services" },
    { name: "Products", href: "/#products" },
    { name: "Industries", href: "/#industries" },
    {
      name: "Testimonials",
      href: "/#client-testimonials-section",
    },
    {
      name: "Contact",
      href: "/contact",
    },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    const handleActiveSection = () => {
      if (pathname !== "/") {
        setActiveSection("");
        return;
      }

      const sections = navItems
        .filter((item) => item.href.includes("#"))
        .map((item) => {
          const hash = item.href.split("#")[1];
          const selector = hash ? `#${hash}` : null;
          const el = selector ? document.querySelector(selector) : null;
          return { name: item.name, top: el?.offsetTop || 0 };
        })
        .filter((section) => section.top > 0); // Only track sections that exist

      if (sections.length === 0) return;

      const scrollPos = window.scrollY + 100;
      const current = sections
        .sort((a, b) => b.top - a.top) // Sort by position, closest to top first
        .find((section) => scrollPos >= section.top);

      setActiveSection(current ? current.name : "");
    };

    const throttledScroll = () => {
      if (!window.requestAnimationFrame) {
        handleScroll();
        handleActiveSection();
      } else {
        requestAnimationFrame(() => {
          handleScroll();
          handleActiveSection();
        });
      }
    };

    window.addEventListener("scroll", throttledScroll);

    // Initial check
    handleScroll();
    handleActiveSection();

    return () => window.removeEventListener("scroll", throttledScroll);
  }, [pathname, navItems]);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const handleNavClick = (e, href) => {
    try {
      // Parse the href into base path and hash
      const [basePath = "", hash = ""] = href.split("#");
      const targetPath = basePath || "/";

      // Case 1: Hash link on current page
      if (href.includes("#") && pathname === targetPath) {
        e.preventDefault();
        const el = document.getElementById(hash);
        if (el) {
          el.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
          setIsOpen(false);
          // Update URL without reload
          window.history.pushState({}, "", href);
        }
        return;
      }

      // Case 2: Same page, no hash - scroll to top
      if (pathname === href) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
        setIsOpen(false);
        return;
      }

      // Case 3: Different page - just close menu and let navigation happen
      setIsOpen(false);
    } catch (err) {
      console.error("Navigation error:", err);
      setIsOpen(false);
    }
  };

  const isActive = (href) => {
    // Hash anchors are only considered active when on the home page and the activeSection matches.
    if (href.includes("#")) {
      const found = navItems.find((i) => i.href === href);
      return pathname === "/" && found && activeSection === found.name;
    }

    return pathname === href;
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900 border-b border-slate-700 shadow-md">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            onClick={(e) => {
              if (pathname === "/") {
                e.preventDefault();
                scrollToTop();
              }
              setIsOpen(false);
            }}
            className="flex items-center space-x-2"
          >
            <Image
              src="/branding/Artboard 2.webp"
              alt="Techbiz Logo"
              width={130}
              height={30}
              priority
              className="h-8  sm:h-6 md:h-9 lg:h-8"
            />
          </Link>

          {/* Desktop Navigation */}
          <div
            className="hidden md:flex items-center justify-end flex-1 ml-4 md:ml-6 font-sans space-x-0.5 md:space-x-1 lg:space-x-2"
            role="navigation"
            aria-label="Main navigation"
          >
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`flex items-center space-x-1 text-xs md:text-sm font-medium transition-colors duration-200 px-1.5 md:px-2 py-1 md:py-1.5 rounded ${
                  isActive(item.href)
                    ? "text-blue-400 bg-blue-900/20"
                    : "text-gray-300 hover:text-white hover:bg-slate-800/40"
                }`}
                aria-current={isActive(item.href) ? "page" : undefined}
              >
                {item.icon && item.icon}
                <span className="whitespace-nowrap">{item.name}</span>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-3">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white"
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? (
                <X className="w-6 h-6" aria-hidden="true" />
              ) : (
                <Menu className="w-6 h-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {/* Mobile menu: use CSS transition driven by max-height to avoid framer-motion bundle */}
        <div
          id="mobile-menu"
          className={`md:hidden absolute top-full left-0 right-0 bg-slate-900 border-b border-slate-700 overflow-hidden transition-[max-height,opacity] duration-300 ${
            isOpen ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0"
          }`}
          role="navigation"
          aria-label="Mobile navigation"
        >
          <div className="px-6 py-6 space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`flex items-center space-x-1 text-sm font-medium transition-colors duration-200 ${
                  isActive(item.href)
                    ? "text-blue-400"
                    : "text-gray-300 hover:text-white"
                }`}
                aria-current={isActive(item.href) ? "page" : undefined}
              >
                {item.icon && item.icon}
                <span>{item.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
