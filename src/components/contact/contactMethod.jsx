"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Mail, Phone, Clock, ChevronRight, MessageCircle } from "lucide-react";
import Section from "../ui/Section";
import SectionHeader from "../ui/SectionHeader";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.66, ease: [0.25, 0.8, 0.25, 1] },
  },
};

export default function ContactMethod() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const shouldReduceMotion = useReducedMotion();

  const contactMethods = [
    {
      title: "Email Support",
      description: "Get detailed responses within 2 hours",
      icon: Mail,
      link: "mailto:info@techbizafrica.com",
      linkText: "info@techbizafrica.com",
      color: "blue",
      gradient: "from-blue-50 to-blue-100",
      iconColor: "text-blue-600",
      hoverColor: "hover:text-blue-700",
      focusColor: "focus-within:ring-blue-500/20 focus-within:border-blue-500",
      action: "Send Email",
    },
    {
      title: "Phone Support",
      description: "Direct line for urgent inquiries",
      icon: Phone,
      link: "tel:+254711377232",
      linkText: "+254 711 377 232",
      color: "blue",
      gradient: "from-blue-50 to-blue-100",
      iconColor: "text-blue-600",
      hoverColor: "hover:text-blue-700",
      focusColor: "focus-within:ring-blue-500/20 focus-within:border-blue-500",
      action: "Call Now",
    },
    {
      title: "WhatsApp Chat",
      description: "Quick messaging for immediate assistance",
      icon: MessageCircle,
      link: "https://wa.me/254711377232?text=Hi%20there!%20I'm%20interested%20in%20your%20technology%20solutions.",
      linkText: "Start WhatsApp Chat",
      color: "blue",
      gradient: "from-blue-50 to-blue-100",
      iconColor: "text-blue-600",
      hoverColor: "hover:text-blue-700",
      focusColor: "focus-within:ring-blue-500/20 focus-within:border-blue-500",
      action: "Chat Now",
    },
  ];

  return (
    <Section background="white" padding="small" id="contact-info" className="pt-16 md:pt-12">
      <div className="relative overflow-hidden min-h-screen flex items-center">
      <div className="absolute top-[-10%] md:top-[-8%] right-[-20%] md:right-[-10%] w-[180%] md:w-[140%] h-[180px] md:h-[320px] opacity-[0.16] pointer-events-none" aria-hidden>
        <svg viewBox="0 0 2200 700" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full block">
          <path d="M2200,40 C1800,120 1400,320 1000,420 C700,500 420,580 0,700" stroke="#0f4c81" strokeOpacity="0.28" strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M2200,140 C1700,180 1300,360 900,420 C600,470 300,540 0,640" stroke="#6aa0cf" strokeOpacity="0.12" strokeWidth="2" fill="none" strokeLinecap="round" />
        </svg>
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_82%,rgba(15,76,129,0.04),transparent_40%),radial-gradient(circle_at_82%_18%,rgba(120,119,198,0.03),transparent_40%)] pointer-events-none" aria-hidden />

      <div className="absolute top-[6%] md:top-[10%] right-[-10%] md:right-[-6%] w-[140px] md:w-[220px] h-[140px] md:h-[220px] bg-gradient-to-br from-[rgba(120,119,198,0.14)] to-[rgba(255,119,198,0.1)] rounded-[40%_60%_60%_40%] blur-[30px] pointer-events-none" aria-hidden />

      <div className="absolute bottom-[6%] md:bottom-[10%] left-[-8%] md:left-[-4%] w-[120px] md:w-[200px] h-[120px] md:h-[200px] bg-gradient-to-br from-[rgba(120,200,255,0.1)] to-[rgba(120,119,198,0.08)] rounded-[60%_40%_50%_50%] blur-[28px] pointer-events-none" aria-hidden />

      <div className="relative z-10 w-full">
        <SectionHeader
          //MULTIPLE CHANNELS"
          title="Connect With Us Through Your Preferred Channel"
          subtitle="Choose the communication method that works best for you — we're ready to help you succeed."
          centered={true}
          size="default"
          badgeIcon={MessageCircle}
        />

        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 text-gray-500 text-sm">
            <Clock className="w-4 h-4 text-[#0f4c81]" />
            <span>Available: Mon–Fri, 8am–5pm EAT</span>
          </div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView={shouldReduceMotion ? {} : "visible"}
          viewport={{ once: true, amount: 0.18 }}
        >
          {contactMethods.map((method, idx) => {
            const isHovered = hoveredIndex === idx;
            const IconComponent = method.icon;

            return (
              <motion.div
                key={idx}
                variants={itemVariants}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                onFocus={() => setHoveredIndex(idx)}
                onBlur={() => setHoveredIndex(null)}
                className={`group relative bg-white p-6 rounded-xl border border-gray-100 transition-all duration-300 hover:-translate-y-2 focus-within:ring-2 ${method.focusColor} ${
                  isHovered
                    ? "shadow-xl shadow-blue-500/10 border-blue-200 bg-blue-50/30"
                    : "shadow-lg hover:shadow-xl hover:shadow-blue-500/5"
                }`}
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${method.gradient} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
                  <IconComponent className={`w-8 h-8 ${method.iconColor}`} aria-hidden="true" />
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-3 text-center">{method.title}</h3>

                <p className="text-center text-sm text-gray-500 mb-6 px-2">{method.description}</p>

                {method.isButton ? (
                  <button
                    onClick={method.onClick}
                    className={`w-full inline-flex items-center justify-center gap-2 ${method.iconColor} font-medium ${method.hoverColor} transition-colors group/link bg-gray-50 hover:bg-gray-100 px-3 py-2 rounded-lg text-sm`}
                    aria-label={`${method.action} - ${method.description}`}
                  >
                    {method.action}
                    <ChevronRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" aria-hidden="true" />
                  </button>
                ) : (
                  <a
                    href={method.link}
                    target={method.link.startsWith('https') ? "_blank" : undefined}
                    rel={method.link.startsWith('https') ? "noopener noreferrer" : undefined}
                    className={`w-full inline-flex items-center justify-center gap-2 ${method.iconColor} font-semibold ${method.hoverColor} transition-all duration-300 group/link bg-blue-50 hover:bg-blue-100 hover:shadow-md px-4 py-3 rounded-lg text-sm border border-blue-100 hover:border-blue-200`}
                    aria-label={`${method.action} - ${method.linkText}`}
                  >
                    {method.action}
                    <ChevronRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" aria-hidden="true" />
                  </a>
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </div>
      </div>
    </Section>
  );
}
