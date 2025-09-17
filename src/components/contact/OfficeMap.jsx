"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Clock, Phone, Mail, Navigation } from "lucide-react";
import SectionHeader from "../ui/SectionHeader";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.8, 0.25, 1] },
  },
};

export default function OfficeMap() {
  const [activeLocation, setActiveLocation] = useState(0);

  const locations = [
    {
      id: "mombasa",
      city: "Mombasa",
      title: "Mombasa Branch",
      address: "Dr Rashid Ali Road ,Mombasa\nKenya\nP.O BOX 86966 - 80100",
      phone: "+254 711 377 232",
      email: "info@techbizafrica.com",
      hours: {
        weekday: "Monday - Friday: 8:00 AM - 5:00 PM (EAT)",
        saturday: "Saturday: 9:00 AM - 1:00 PM (EAT)",
        sunday: "Sunday: Closed",
      },
      coordinates: { lat: -4.04374, lng: 39.658871 },
      mapUrl: "https://maps.google.com/maps?q=Dr+Rashid+Ali+Rd,Mombasa,Kenya&ll=-4.043740,39.658871&z=15",
      gradient: "from-blue-50 to-blue-100",
      iconColor: "text-blue-600",
      embedUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15919.075674783771!2d39.66063077707382!3d-4.067451389731679!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x184013001b6837f5%3A0x855ebc7f52a416af!2sTechbiz%20Limited!5e0!3m2!1sen!2ske!4v1757334493271!5m2!1sen!2ske",
    },
    {
      id: "nairobi",
      city: "Nairobi",
      title: "Nairobi Branch",
      address: "Office Suites, 2nd Floor, Block B ,Parklands Road\n,Kenya\nP.O BOX 49459 - 00100",
      phone: "+254 711 377 232",
      email: "info@techbizafrica.com",
      hours: {
        weekday: "Monday - Friday: 8:00 AM - 5:00 PM (EAT)",
        saturday: "Saturday: 9:00 AM - 1:00 PM (EAT)",
        sunday: "Sunday: Closed",
      },
      coordinates: { lat: -1.286389, lng: 36.817223 },
      mapUrl: "https://maps.google.com/maps?q=Parklands+Road,Nairobi,Kenya&ll=-1.286389,36.817223&z=15",
      gradient: "from-blue-50 to-blue-100",
      iconColor: "text-blue-600",
      embedUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.845803138295!2d36.80948727363142!3d-1.2650815987228756!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f179efa781581%3A0x16b966d156af45da!2sTechbiz%20Infotech%20Limited!5e0!3m2!1sen!2ske!4v1757334458421!5m2!1sen!2ske",
    },
  ];

  const activeLocationData = locations[activeLocation];

  return (
    <section
      id="office-map"
      className="relative py-8 px-4 bg-white overflow-hidden"
      aria-labelledby="office-locations-title"
    >
      <div className="absolute top-[-10%] right-[-20%] w-[180%] h-[320px] opacity-[0.12] pointer-events-none" aria-hidden>
        <svg viewBox="0 0 2200 700" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full block">
          <path d="M2200,40 C1800,120 1400,320 1000,420 C700,500 420,580 0,700" stroke="#0f4c81" strokeOpacity="0.2" strokeWidth="2" fill="none" strokeLinecap="round" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto relative z-10 w-full">
        <SectionHeader
          //OUR LOCATIONS"
          title="Visit Our Offices"
          subtitle="We have offices in key Kenyan cities to serve you better. Schedule an in-person consultation at either location."
          centered={true}
          size="default"
          badgeIcon={MapPin}
        />

        <motion.div className="flex justify-center mb-8" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }} viewport={{ once: true }}>
          <div className="inline-flex bg-gray-100 rounded-lg p-1">
            {locations.map((location, index) => (
              <button
                key={location.id}
                onClick={() => setActiveLocation(index)}
                className={`px-6 py-3 rounded-md font-medium text-sm transition-all duration-200 ${
                  activeLocation === index ? "bg-white text-[#0f4c81] shadow-sm" : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {location.city}
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div className="grid lg:grid-cols-2 gap-8 items-stretch" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
          <motion.div variants={itemVariants} className="flex order-2 lg:order-1">
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-100 shadow-lg w-full">
              <div className="flex items-center gap-3 mb-4">
                {/* <div className={`w-12 h-12 ${activeLocationData.bgColor || 'bg-gray-200'} rounded-lg flex items-center justify-center`}>
                  <MapPin className="w-6 h-6 text-white" />
                </div> */}
                <div>
                  <h3 className="text-2xl font-bold text-[#0f1724]">{activeLocationData.title}</h3>
                </div>
              </div>

              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 bg-gradient-to-br ${activeLocationData.gradient} rounded-lg flex items-center justify-center flex-shrink-0`}>
                    <MapPin className={`w-5 h-5 ${activeLocationData.iconColor}`} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Address</h4>
                    <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">{activeLocationData.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 bg-gradient-to-br ${activeLocationData.gradient} rounded-lg flex items-center justify-center flex-shrink-0`}>
                    <Phone className={`w-5 h-5 ${activeLocationData.iconColor}`} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Contact</h4>
                    <p className="text-gray-600 text-sm mb-1">{activeLocationData.phone}</p>
                    <p className="text-gray-600 text-sm">{activeLocationData.email}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 bg-gradient-to-br ${activeLocationData.gradient} rounded-lg flex items-center justify-center flex-shrink-0`}>
                    <Clock className={`w-5 h-5 ${activeLocationData.iconColor}`} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Office Hours</h4>
                    <div className="text-gray-600 text-sm space-y-1">
                      <p>{activeLocationData.hours.weekday}</p>
                      <p>{activeLocationData.hours.saturday}</p>
                      <p>{activeLocationData.hours.sunday}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mt-6 pt-6 border-t border-gray-200">
                <button onClick={() => window.open(activeLocationData.mapUrl, "_blank")} className="flex-1 bg-[#0f4c81] hover:bg-[#0d3f6b] text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2">
                  <Navigation className="w-4 h-4" />
                  Get Directions
                </button>
                <a href={`tel:${activeLocationData.phone}`} className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 px-4 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2">
                  <Phone className="w-4 h-4" />
                  Call Office
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="min-h-[420px] md:min-h-[520px] order-1 lg:order-2">
            <div className="overflow-hidden rounded-2xl shadow-lg bg-white p-2 border border-gray-100 h-full">
              <div className="relative w-full h-full">
                <iframe
                  key={activeLocationData.id}
                  title={`${activeLocationData.city} office location map`}
                  src={activeLocationData.embedUrl}
                  style={{ border: 0, minHeight: 400 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 w-full h-full rounded-lg block"
                />
                {/* Fallback button for blocked embeds */}
                <div className="absolute bottom-4 right-4 z-10">
                  <button
                    onClick={() => window.open(activeLocationData.mapUrl, "_blank")}
                    className="bg-white hover:bg-gray-50 text-gray-700 px-3 py-2 rounded-lg shadow-md border text-xs font-medium transition-colors duration-200 flex items-center gap-1"
                    title="Open in Google Maps"
                  >
                    <MapPin className="w-3 h-3" />
                    View in Maps
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
