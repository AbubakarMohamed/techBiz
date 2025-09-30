"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const certificates = [
  {
    id: "iso9001",
    src: "/opt/certificates/ISO2015-opt.webp",
    alt: "ISO 9001:2015",
    name: "ISO 9001:2015 Quality Management Systems",
    shortName: "ISO 9001:2015",
  },
  {
    id: "iso27001",
    src: "/opt/certificates/ISO2022-opt.webp",
    alt: "ISO 27001:2022",
    name: "ISO 27001:2022 Information Security Management Systems",
    shortName: "ISO 27001:2022",
  },
  {
    id: "ict",
    src: "/opt/certificates/CTA-opt.webp",
    alt: "ICT Authority",
    name: "ICT Authority",
    shortName: "ICT Authority",
  },
  {
    id: "odpc",
    src: "/opt/certificates/ODPC-opt.webp",
    alt: "ODPC",
    //exact name use this.
    name: "Office of the Data Protection Commissioner",
    shortName: "Office of the Data Protection Commissioner",
  },
];

export default function SimplifiedCertificates({
  showContent,
  isMobile,
  centerContent,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{
        opacity: showContent ? 1 : 0,
        y: showContent ? 0 : 30,
      }}
      transition={{
        duration: 1,
        ease: [0.4, 0, 0.2, 1],
        delay: showContent ? 1.0 : 0,
      }}
      className={`absolute ${isMobile ? "bottom-1" : "bottom-4"} left-0 right-0 flex flex-row items-center ${isMobile ? "gap-1.5" : "gap-3"} ${
        centerContent ? "justify-center" : "justify-start"
      } pointer-events-auto ${isMobile ? "px-2.5" : "px-0"} ${isMobile ? "flex-wrap" : "flex-nowrap"} z-[6]`}
    >
      {/* Certified By Text */}
      <div className="text-[0.55rem] md:text-xs font-semibold text-white/85 uppercase tracking-[0.5px] md:tracking-[1.2px] whitespace-nowrap flex-shrink-0 ml-1 md:ml-8 mr-1 md:mr-8">
        Certified By
      </div>

      {/* Certificate Icons */}
      {certificates.map((cert) => (
        <div
          key={cert.id}
          className={`group relative flex items-center ${
            isMobile
              ? ""
              : "w-14 h-14 lg:w-12 lg:h-12 overflow-hidden rounded-2xl md:rounded-3xl lg:rounded-3xl bg-white/95 border-2 border-white/30 backdrop-blur-sm transition-all duration-300 ease-out hover:w-auto hover:pr-3 hover:bg-white hover:border-white/40 hover:shadow-lg"
          }`}
          role="img"
          aria-label={cert.alt}
          title={isMobile ? cert.shortName : ""}
        >
          {/* Certificate Icon */}
          <div
            className={`${isMobile ? "w-8 h-8" : "w-12 h-14 lg:w-16 lg:h-16"} relative ${isMobile ? "" : "-ml-1 md:-ml-2.5"} flex-shrink-0 transition-transform duration-300 ${isMobile ? "" : "group-hover:scale-90"}`}
          >
            <Image
              src={cert.src}
              alt={cert.alt}
              fill
              sizes="(max-width: 768px) 32px, 56px"
              loading="lazy"
              style={{ objectFit: "contain" }}
            />
          </div>

          {/* Certificate Name - Hidden on mobile, shown on hover for desktop */}
          {!isMobile && (
            <span className="opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 delay-75 text-xs font-semibold text-black/90 whitespace-nowrap ml-2 max-w-0 group-hover:max-w-xs">
              {cert.name}
            </span>
          )}

          {/* Tooltip for mobile */}
          {isMobile && (
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black/90 text-white text-xs rounded-md opacity-0 invisible group-active:opacity-100 group-active:visible transition-all duration-200 whitespace-nowrap z-10 pointer-events-none">
              {cert.shortName}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/90"></div>
            </div>
          )}
        </div>
      ))}
    </motion.div>
  );
}
