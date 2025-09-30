import React from "react";
import { motion } from "framer-motion";
import { Target, Eye, Shield, Lightbulb, Users, Star } from "lucide-react";
import Section from "@/components/ui/Section";

const MissionVisionValues = () => {
  return (
    <Section background="white" padding="small">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6 md:mb-8"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 tracking-wider px-4">
            MISSION, VISION AND VALUES
          </h2>
        </motion.div>

        {/* Vision and Mission Cards at Top */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-8 md:mb-12 max-w-5xl mx-auto px-2">
          {/* Vision Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-center"
          >
            <div className="flex justify-center mb-4 md:mb-6">
              <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center shadow-lg">
                <Target className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white" />
              </div>
            </div>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-700 mb-3 md:mb-4">
              Vision
            </h3>
            <p className="text-gray-600 leading-relaxed text-base sm:text-lg">
              To emerge as the preeminent choice for delivering inventive
              technological solutions and services across both public and
              private sectors, setting the benchmark for excellence and
              innovation in every aspect of our operations.
            </p>
          </motion.div>

          {/* Mission Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center"
          >
            <div className="flex justify-center mb-6 md:mb-8">
              <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center shadow-lg">
                <Eye className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white" />
              </div>
            </div>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-700 mb-4 md:mb-6">
              Mission
            </h3>
            <p className="text-gray-600 leading-relaxed text-base sm:text-lg">
              Transform ideas into reality by using smart & innovative
              technology solutions.
            </p>
          </motion.div>
        </div>

        {/* Core Values Section - Responsive layout */}
        <div className="px-4">
          <div className="hidden lg:block relative max-w-6xl mx-auto min-h-[500px]">
            {/* Central Circle */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.8,
                delay: 0.4,
                type: "spring",
                stiffness: 200,
              }}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
            >
              <div className="w-40 h-40 bg-white rounded-full shadow-2xl flex items-center justify-center border-6 border-gray-100">
                <h3 className="text-3xl font-bold text-[#0f4c81] text-center">
                  Core Values
                </h3>
              </div>
            </motion.div>

            {/* --- CONNECTING LINES (Animated) --- */}
            {/* Top Left Line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="absolute top-[32%] left-[37%] w-[120px] h-[2px] bg-gradient-to-r from-[#0f4c81] to-transparent origin-left rotate-[-25deg]"
            />

            {/* Top Right Line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="absolute top-[32%] right-[37%] w-[120px] h-[2px] bg-gradient-to-l from-[#1a5c96] to-transparent origin-right rotate-[25deg]"
            />

            {/* Bottom Left Line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="absolute bottom-[32%] left-[37%] w-[120px] h-[2px] bg-gradient-to-r from-[#2a6ba8] to-transparent origin-left rotate-[25deg]"
            />

            {/* Bottom Right Line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="absolute bottom-[32%] right-[37%] w-[120px] h-[2px] bg-gradient-to-l from-yellow-500 to-transparent origin-right rotate-[-25deg]"
            />

            {/* Top Left - Integrity */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              className="absolute top-16 left-[15%] w-64 text-right"
            >
              <div className="flex items-start justify-end gap-3">
                <div className="flex-1">
                  <h4 className="text-xl font-bold text-[#0f4c81] mb-1">
                    Integrity
                  </h4>
                  <p className="text-gray-600 text-sm leading-snug">
                    Integrity is our digital DNA. We code with trust, ensuring
                    the security and ethical use of technology in all our
                    endeavors.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Top Right - Innovation */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 1.1 }}
              className="absolute top-16 right-[15%] w-64"
            >
              <div className="flex items-start gap-3">
                <div className="flex-1">
                  <h4 className="text-xl font-bold text-[#1a5c96] mb-1">
                    Innovation
                  </h4>
                  <p className="text-gray-600 text-sm leading-snug">
                    We are the architects of change, constantly innovating and
                    pushing the boundaries of technology to pioneer new
                    solutions.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Bottom Left - Customer Centricity */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="absolute bottom-16 left-[15%] w-64 text-right"
            >
              <div className="flex items-start justify-end gap-3">
                <div className="flex-1">
                  <h4 className="text-xl font-bold text-[#2a6ba8] mb-1">
                    Customer Centricity
                  </h4>
                  <p className="text-gray-600 text-sm leading-snug">
                    Our clients are at the heart of every line of code. We craft
                    tech solutions with a keen understanding of their needs.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Bottom Right - Excellence */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 1.3 }}
              className="absolute bottom-16 right-[15%] w-64"
            >
              <div className="flex items-start gap-3">
                <div className="flex-1">
                  <h4 className="text-xl font-bold text-yellow-600 mb-1">
                    Excellence
                  </h4>
                  <p className="text-gray-600 text-sm leading-snug">
                    Excellence isn't just a goal; it's our tech mantra. Every
                    line of code reflects our commitment to delivering top-tier
                    solutions.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Mobile Layout - Shown on mobile and tablet */}
          <div className="block lg:hidden">
            {/* Core Values Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center mb-8"
            >
              <h3 className="text-2xl sm:text-3xl font-bold text-[#0f4c81]">
                Core Values
              </h3>
            </motion.div>

            {/* Mobile Core Values Grid */}
            <div className="space-y-4">
              {/* Integrity */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-white rounded-xl p-4 shadow-lg border border-gray-100"
              >
                <div className="flex items-start gap-4">
                  <div className="w-1 h-16 bg-gradient-to-b from-[#0f4c81] to-[#0a3a65] rounded-full flex-shrink-0 mt-1"></div>
                  <div className="flex-1">
                    <h4 className="text-lg sm:text-xl font-bold text-[#0f4c81] mb-2">
                      Integrity
                    </h4>
                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                      Integrity is our digital DNA. We code with trust, ensuring
                      the security and ethical use of technology in all our
                      endeavors.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Innovation */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
              >
                <div className="flex items-start gap-4">
                  <div className="w-1 h-16 bg-gradient-to-b from-[#1a5c96] to-[#0f4c81] rounded-full flex-shrink-0 mt-1"></div>
                  <div className="flex-1">
                    <h4 className="text-lg sm:text-xl font-bold text-[#1a5c96] mb-2">
                      Innovation
                    </h4>
                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                      We are the architects of change, constantly innovating and
                      pushing the boundaries of technology to pioneer new
                      solutions.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Customer Centricity */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
              >
                <div className="flex items-start gap-4">
                  <div className="w-1 h-16 bg-gradient-to-b from-[#2a6ba8] to-[#0f4c81] rounded-full flex-shrink-0 mt-1"></div>
                  <div className="flex-1">
                    <h4 className="text-lg sm:text-xl font-bold text-[#2a6ba8] mb-2">
                      Customer Centricity
                    </h4>
                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                      Our clients are at the heart of every line of code. We
                      craft tech solutions with a keen understanding of their
                      needs, making functionality and user-friendliness our top
                      priorities.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Excellence */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
              >
                <div className="flex items-start gap-4">
                  <div className="w-1 h-16 bg-gradient-to-b from-yellow-400 to-yellow-600 rounded-full flex-shrink-0 mt-1"></div>
                  <div className="flex-1">
                    <h4 className="text-lg sm:text-xl font-bold text-yellow-600 mb-2">
                      Excellence
                    </h4>
                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                      Excellence isn't just a goal; it's our tech mantra. Every
                      line of code reflects our commitment to delivering
                      top-tier, efficient, and reliable tech solutions.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default MissionVisionValues;
