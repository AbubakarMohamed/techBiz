"use client";

import React from "react";
import { motion } from "framer-motion";

const SectionHeader = ({
  badge,
  title,
  subtitle,
  centered = true,
  size = "default",
  gradient = false,
  badgeIcon: BadgeIcon,
  theme = "light",
}) => {
  const sizeStyles = {
    small: {
      title: "text-2xl md:text-3xl",
      subtitle: "text-sm",
      spacing: "mb-6",
    },
    default: {
      title: "text-3xl md:text-4xl",
      subtitle: "text-sm",
      spacing: "mb-8",
    },
    large: {
      title: "text-4xl md:text-5xl",
      subtitle: "text-sm",
      spacing: "mb-10",
    },
  };

  const style = sizeStyles[size];
  const alignment = centered ? "text-center" : "text-left";
  const maxWidth = centered ? "max-w-3xl mx-auto" : "max-w-4xl";

  const themeStyles = {
    light: {
      badgeText: "text-[#0f4c81]",
      badgeBg: "bg-[#0f4c81]/8",
      badgeBorder: "border-[#0f4c81]/10",
      titleText: "text-[#0f1724]",
      subtitleText: "text-gray-600",
    },
    dark: {
      badgeText: "text-blue-400",
      badgeBg: "bg-blue-400/10",
      badgeBorder: "border-blue-400/20",
      titleText: "text-white",
      subtitleText: "text-gray-300",
    },
  };

  const colors = themeStyles[theme];

  return (
    <motion.div
      className={`${alignment} ${style.spacing}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      viewport={{ once: true }}
    >
      {badge && (
        <motion.div
          className="mb-4"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <span
            className={`inline-flex items-center gap-2 text-xs font-bold tracking-[0.25em] uppercase px-4 py-2 rounded-full border ${colors.badgeText} ${colors.badgeBg} ${colors.badgeBorder}`}
          >
            {BadgeIcon && <BadgeIcon className="w-3 h-3" />}
            {badge}
          </span>
        </motion.div>
      )}

      <motion.h2
        className={`${style.title} font-bold ${colors.titleText} mb-4 leading-tight tracking-tight`}
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
      >
        {gradient ? (
          <>
            {title.split(" ").slice(0, -1).join(" ")}{" "}
            <span className="bg-gradient-to-r from-[#0f4c81] to-purple-600 bg-clip-text text-transparent">
              {title.split(" ").slice(-1)}
            </span>
          </>
        ) : (
          title
        )}
      </motion.h2>

      {subtitle && (
        <motion.p
          className={`${style.subtitle} ${colors.subtitleText} ${maxWidth} leading-relaxed`}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
};

export default SectionHeader;
