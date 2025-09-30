"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Package } from "lucide-react";
import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";

const products = [
  {
    id: "47payday",
    title: "47PayDay",
    description:
      "An all-in-one solution for streamlined and efficient Human Resource Management.",
    detailedDescription:
      " From seamless payroll processing to intuitive employee self-service, this solution revolutionizes how you handle your HR tasks. With 47Payday, it's not just about managing HR; it's about empowering your team with intuitive tools, elevating your HR game and transforming processes effortlessly",
    image: "/products/47PAYDAY2.webp",
    mobileImage: "/products/47paydayMob.webp",
    logo: "/products/147payday.webp",
    gradient: "from-slate-900 via-slate-800 to-slate-700",
    href: "/documents/47_PayDay_Brochure_2025.pdf",
    radialGradient:
      "radial-gradient(ellipse at top right, rgba(59, 130, 246, 0.15), transparent 60%)",
    download: true,
  },
  {
    id: "47pro",
    title: "47Pro",
    description:
      "A flagship revenue management system designed exclusively for county governments.",
    detailedDescription:
      "From streamlined tax collection to comprehensive financial reporting, this sophisticated solution is crafted to optimize fiscal workflows, providing county officials with a powerful tool to navigate the complexities of financial governance seamlessly.",
    image: "/products/47proImage.webp",
    mobileImage: "/products/47proMob.webp",
    logo: "/products/47pro.webp",
    gradient: "from-slate-900 via-blue-900 to-indigo-900",
    radialGradient:
      "radial-gradient(ellipse at bottom left, rgba(34, 197, 94, 0.12), transparent 50%)",
  },
  {
    id: "crm-alerts",
    title: "CRM Alerts",
    description: "A dynamic solution that keeps your clients in the know.",
    detailedDescription:
      " Designed to sync seamlessly with your ERP, this innovative solution sends instant notifications whenever invoices or credit notes are generated empowering your clients with real-time updates that enhances transparency and builds lasting trust.",
    image: "/products/47crm.webp",
    mobileImage: "/products/47crmMob.webp",
    logo: "/products/crm.webp",
    gradient: "from-gray-900 via-slate-800 to-zinc-900",
    radialGradient:
      "radial-gradient(ellipse at center, rgba(168, 85, 247, 0.1), transparent 55%)",
  },
  {
    id: "crm-alerts1",
    title: "CRM Alerts",
    description: "A dynamic solution that keeps your clients in the know.",
    detailedDescription:
      " Designed to sync seamlessly with your ERP, this innovative solution sends instant notifications whenever invoices or credit notes are generated empowering your clients with real-time updates that enhances transparency and builds lasting trust.",
    image: "/products/47crm.webp",
    mobileImage: "/products/47crmMob.webp",
    logo: "/products/crm.webp",
    gradient: "from-gray-900 via-slate-800 to-zinc-900",
    radialGradient:
      "radial-gradient(ellipse at center, rgba(168, 85, 247, 0.1), transparent 55%)",
  },
];

const ProductCard = ({ product, isActive, onHover, index, isMobile }) => {
  // For mobile, we'll use a simplified layout without active states
  if (isMobile) {
    return (
      <motion.div
        className="relative rounded-3xl overflow-hidden group h-auto min-h-[500px] w-full"
        style={{ willChange: "transform, opacity" }}
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{
          duration: 0.6,
          delay: index * 0.06,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
      >
        {/* Enhanced Background with Texture */}
        <div
          className={`absolute inset-0 bg-gradient-to-b ${product.gradient}`}
        />
        {/* Noise Texture Overlay */}
        <div
          className="absolute inset-0 opacity-20 mix-blend-multiply"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
        {/* Radial Gradient Overlay */}
        <div
          className="absolute inset-0"
          style={{ background: product.radialGradient }}
        />

        {/* Content Container - Column layout for mobile */}
        <div className="relative h-full flex flex-col">
          {/* Image at TOP for mobile - landscape style */}
          <div className="relative w-full h-48 flex-shrink-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.1, ease: "easeOut" }}
              className="relative w-full h-full"
            >
              <Image
                src={product.mobileImage}
                alt={product.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                priority={index === 0}
              />
            </motion.div>
          </div>

          {/* Content Area */}
          <div className="relative z-10 p-6 flex-1 flex flex-col">
            {/* Title and Description */}
            <div className="flex-1">
              <motion.h3
                initial={{ opacity: 0, y: 16, filter: "blur(1px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  duration: 0.4,
                  delay: 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="text-3xl font-bold text-white leading-tight mb-4"
              >
                {product.title}
              </motion.h3>

              <motion.p
                initial={{ opacity: 0, y: 12, filter: "blur(0.5px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  duration: 0.4,
                  delay: 0.2,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="text-white/90 text-lg leading-relaxed mb-4 text-left"
              >
                {product.description}
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 8, filter: "blur(0.5px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  duration: 0.4,
                  delay: 0.3,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="text-white/80 text-sm leading-relaxed mb-6 text-left"
              >
                {product.detailedDescription}
              </motion.p>
            </div>

            {/* Bottom section with CTA and Logo at bottom right */}
            <div className="flex justify-between items-end">
              <motion.a
                href={product.href} // Link to the brochure
                target="_blank" // ✅ works on mobile & desktop
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 8, filter: "blur(0.5px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  duration: 0.3,
                  delay: 0.4,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{
                  scale: isMobile ? 1 : 1.05,
                  y: -2,
                  transition: { duration: 0.2, ease: "easeOut" },
                }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center bg-gradient-to-r from-cyan-500/90 to-cyan-400/90 backdrop-blur-sm hover:bg-blue-500 px-5 py-2.5 rounded-xl font-semibold transition-all duration-500 ease-out"
              >
                <span className="mr-2 text-sm">Download Brochure</span>
                <ArrowRight className="w-4 h-4" />
              </motion.a>

              {/* Logo at bottom right for mobile */}
              <motion.div
                className="w-12 h-12 rounded-2xl p-2 flex items-center justify-center "
                whileHover={{ scale: isMobile ? 1 : 1.05 }}
              >
                <Image
                  src={product.logo}
                  alt={`${product.title} logo`}
                  width={32}
                  height={32}
                  className="object-contain"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  // Desktop version remains the same as before
  if (isActive) {
    return (
      <motion.div
        onHoverStart={() => onHover(product.id)}
        className="relative rounded-3xl overflow-hidden cursor-pointer group h-[650px] md:h-[650px]"
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-30px" }}
        whileHover={{
          scale: 1.005,
          y: -1,
          transition: { duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] },
        }}
        transition={{
          duration: 0.5,
          delay: index * 0.04,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
        layout
        layoutTransition={{
          duration: 0.3,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
        style={{
          willChange: "transform, opacity, flex",
          flex: isActive ? "2 1 0%" : "1 1 0%",
          transition: "flex 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        }}
      >
        {/* Enhanced Background with Texture */}
        <div
          className={`absolute inset-0 bg-gradient-to-r ${product.gradient}`}
        />
        {/* Noise Texture Overlay */}
        <div
          className="absolute inset-0 opacity-25 mix-blend-multiply"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
        {/* Radial Gradient Overlay */}
        <div
          className="absolute inset-0"
          style={{ background: product.radialGradient }}
        />
        {/* Glass Morphism Effect */}
        <div className="absolute inset-0 bg-white/[0.02] backdrop-blur-[0.5px]" />

        {/* Content Container */}
        <div className="relative h-full flex flex-col md:flex-row">
          {/* Left Content Area */}
          <div className="relative z-10 p-8 md:p-12 flex-1 flex flex-col justify-center text-white max-w-md text-left">
            {/* Logo Icon */}
            <motion.div
              className="w-16 h-16 rounded-2xl p-2 mb-6 flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{
                duration: 0.3,
                delay: 0.02,
                ease: "easeOut",
              }}
              whileHover={{
                scale: 1.1,
                rotate: 5,
                transition: { duration: 0.15, ease: [0.22, 1, 0.36, 1] },
              }}
            >
              <Image
                src={product.logo}
                alt={`${product.title} logo`}
                width={48}
                height={48}
                className="object-contain"
              />
            </motion.div>

            {/* Title */}
            <motion.h3
              initial={{ opacity: 0, y: 20, filter: "blur(1px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{
                duration: 0.5,
                delay: 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="text-4xl md:text-4xl font-bold leading-tight mb-6"
            >
              {product.title}
            </motion.h3>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 16, filter: "blur(0.5px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{
                duration: 0.5,
                delay: 0.25,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="text-white/90 text-lg leading-relaxed mb-4 text-left"
            >
              {product.description}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 12, filter: "blur(0.5px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{
                duration: 0.5,
                delay: 0.35,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="text-white/80 text-sm leading-relaxed mb-8 text-left"
            >
              {product.detailedDescription}
            </motion.p>

            {/* CTA Button */}
            <motion.a
              href={product.href} // Link to the brochure
              target="_blank" // ✅ works on mobile & desktop
              rel="noopener noreferrer"
              className={`inline-flex items-center bg-gradient-to-r from-cyan-500/90 to-cyan-400/90 backdrop-blur-sm hover:bg-blue-500 px-6 py-3 rounded-xl font-semibold transition-all duration-500 ease-out self-start ${product.id === "47payday" ? "-mt-6" : ""} ${product.id === "crm-alerts" ? "mt-5" : ""}`}
              initial={{ opacity: 0, y: 12, filter: "blur(0.5px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{
                duration: 0.4,
                delay: 0.45,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{
                scale: 1.05,
                y: -2,
                transition: { duration: 0.15, ease: "easeOut" },
              }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="mr-2">Download Brochure</span>
              <ArrowRight className="w-5 h-5" />
            </motion.a>
          </div>

          {/* Right Image Area - Desktop Only */}
          {/* Right Image Area - Desktop Only */}
          <div className="hidden md:flex relative flex-1 items-center p-4 justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
              className="relative w-full h-full rounded-2xl overflow-hidden"
            >
              <Image
                src={product.image}
                alt={product.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-all duration-700 ease-out"
                priority={index === 0}
              />
            </motion.div>
          </div>
        </div>
      </motion.div>
    );
  }

  // Inactive Card for Desktop
  return (
    <motion.div
      onHoverStart={() => onHover(product.id)}
      className="relative rounded-3xl overflow-hidden cursor-pointer group h-[650px] md:h-[650px]"
      initial={{ opacity: 0, y: 35, scale: 0.95, rotateY: 5 }}
      whileInView={{ opacity: 1, y: 0, scale: 1, rotateY: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      whileHover={{
        scale: 1.008,
        y: -2,
        transition: { duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] },
      }}
      transition={{
        duration: 0.5,
        delay: index * 0.04,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      layout
      layoutTransition={{
        duration: 0.3,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      style={{
        willChange: "transform, opacity, flex",
        flex: "0.8 1 0%",
        transition: "flex 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      }}
    >
      {/* Enhanced Background with Texture */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${product.gradient}`}
      />
      {/* Noise Texture Overlay */}
      <div
        className="absolute inset-0 opacity-20 mix-blend-multiply"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
      {/* Radial Gradient Overlay */}
      <div
        className="absolute inset-0"
        style={{ background: product.radialGradient }}
      />
      {/* Geometric Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Ccircle cx='30' cy='30' r='1.5'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Content */}
      <div className="relative z-10 p-8 h-full flex flex-col text-white text-left">
        {/* Logo Icon */}
        <motion.div
          className="w-16 h-16 rounded-2xl p-2 mb-6 flex items-center justify-center"
          whileHover={{ scale: 1.05 }}
        >
          <Image
            src={product.logo}
            alt={`${product.title} logo`}
            width={48}
            height={48}
            className="object-contain"
          />
        </motion.div>

        {/* Title */}
        <motion.h3
          initial={{ opacity: 0, y: 12, filter: "blur(0.5px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{
            duration: 0.4,
            delay: 0.1,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="text-3xl font-bold leading-tight mb-4"
        >
          {product.title}
        </motion.h3>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Bottom Content */}
        <div className="space-y-6">
          <motion.p
            initial={{ opacity: 0, y: 8, filter: "blur(0.5px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{
              duration: 0.4,
              delay: 0.2,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="text-white/80 text-lg leading-relaxed text-left"
          >
            {product.description}
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 6, filter: "blur(0.5px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{
              duration: 0.3,
              delay: 0.3,
              ease: [0.16, 1, 0.3, 1],
            }}
            whileHover={{
              scale: 1.03,
              y: -1,
              transition: { duration: 0.15, ease: "easeOut" },
            }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center bg-gradient-to-r from-cyan-500/90 to-cyan-400/90 backdrop-blur-sm hover:bg-blue-500 px-5 py-2.5 rounded-xl font-semibold transition-all duration-400 ease-out self-start text-sm"
          >
            <span className="mr-2">Download Brochure</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>
      </div>

      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-out" />
    </motion.div>
  );
};

export default function ProductShowcase() {
  const [activeProduct, setActiveProduct] = useState(products[0].id);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkMobile();

    // Add event listener for window resize
    window.addEventListener("resize", checkMobile);

    // Clean up
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <Section
      background="white"
      id="products"
      padding="small"
      className="overflow-hidden relative"
    >
      {/* Professional Background Pattern */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M50 50c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zM10 10c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zM90 90c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zM90 10c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zM10 90c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Our SaaS Suite Ready to Transform Your Business"
          subtitle="We've created a suite of ready-to-use SaaS products proven, scalable, and already delivering results for governments, enterprises, and organizations. With our SaaS solutions, you get impact from day one."
          badgeIcon={Package}
        />

        {/* Products Layout */}
        <motion.div
          className={`gap-6 items-stretch ${isMobile ? "flex flex-col space-y-6" : "flex flex-col md:flex-row"}`}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            delay: 0.15,
            ease: [0.25, 0.46, 0.45, 0.94],
            staggerChildren: 0.04,
            delayChildren: 0.08,
          }}
          layout
        >
          {products.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              index={index}
              isActive={activeProduct === product.id}
              onHover={setActiveProduct}
              isMobile={isMobile}
            />
          ))}
        </motion.div>
      </div>
    </Section>
  );
}
