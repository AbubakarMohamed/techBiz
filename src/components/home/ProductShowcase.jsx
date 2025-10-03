"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Package, Play, Pause, CheckCircle } from "lucide-react"
import Image from "next/image"
import Section from "@/components/ui/Section"
import SectionHeader from "@/components/ui/SectionHeader"
// import { Button } from "@/components/ui/button"

const products = [
  {
    id: "47payday",
    title: "47PayDay",
    tagline: "Revolutionize Your HR Management",
    description:
      "Simplify HR with smart software that handles payroll and employee self-service—all in one platform.",
    image: "/products/payday1.webp",
    gradient: "from-violet-500 to-purple-600",
    icon: Package,
    features: ["Payroll automation", "Employee portal", "Compliance tracking"],
    href: "/documents/47_PayDay_Brochure_2025.pdf",
  },
  {
    id: "47crm",
    title: "47CRM Alerts",
    tagline: "All-in-One CRM Solution",
    description:
      "Manage your customer relationships with powerful tools designed for modern businesses.",
    image: "/products/crm1.webp",
    gradient: "from-blue-500 to-cyan-600",
    icon: Package,
    features: ["Customer pipelines", "Analytics dashboard", "Sales automation"],
  },
  {
    id: "47pro",
    title: "47Pro",
    tagline: "Revenue Management Excellence",
    description:
      "A flagship revenue management system designed exclusively for county governments.",
    image: "/products/47pro1.webp",
    gradient: "from-slate-900 via-blue-900 to-indigo-900",
    icon: Package,
    features: ["Revenue collection", "Smart reporting", "Integration-ready"],
  },
  {
    id: "crm-alerts",
    title: "CRM Alerts",
    tagline: "Stay Informed, Stay Ahead",
    description:
      "Stay ahead with smart notifications and real-time alerts that keep your clients informed—instantly.",
      icon: Package,
    gradient: "from-gray-900 via-slate-800 to-zinc-900",
    image: "/products/notification-alerts-mobile-interface.webp",
    features: ["Real-time Notifications", "Custom Alert Rules", "Priority Management"],
  },
  {
    id: "analytics",
    title: "Analytics Pro",
    tagline: "Data-Driven Decisions",
    description:
      "Stop guessing—start making smarter decisions with real-time analytics and powerful data visualization.",
      icon: Package,
    gradient: "from-slate-900 via-blue-900 to-indigo-900",
    image: "/products/analytics-dashboard.webp",
    features: [ "Custom Dashboards", "Data Visualization", "Predictive Insights"],
  },
]

export default function ProductShowcase() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [autoPlay, setAutoPlay] = useState(true)

  useEffect(() => {
    if (!autoPlay) return
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % products.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [autoPlay])

  const activeProduct = products[activeIndex]

  return (
    <Section background="white" id="products" padding="small">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Our SaaS Suite Ready to Transform Your Business"
          subtitle="Proven, scalable solutions already delivering results for governments, enterprises, and organizations."
          badgeIcon={Package}
        />

        <div className="grid lg:grid-cols-[280px_1fr] gap-8 mt-8">
          {/* LEFT SIDE NAVIGATION */}
          <div className="flex flex-col justify-between">
            <div className="space-y-3">
              {products.map((product, index) => (
                <button
                  key={product.id}
                  onClick={() => setActiveIndex(index)}
                  className={`w-full flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${
                    activeIndex === index
                      ? `border-transparent bg-gradient-to-r ${product.gradient} text-white shadow-md`
                      : "border-border bg-card hover:border-muted-foreground/30 hover:shadow-sm"
                  }`}
                >
                  <product.icon className="w-5 h-5 flex-shrink-0" />
                  <div  className="text-left">
                    <h3 className="font-semibold text-sm">{product.title}</h3>
                    <p
                      className={`text-xs ${
                        activeIndex === index
                          ? "text-white/90"
                          : "text-muted-foreground"
                      }`}
                    >
                      {product.tagline}
                    </p>
                  </div>
                </button>
              ))}
            </div>

            {/* Pause / Play Toggle */}
            {/* <button
              onClick={() => setAutoPlay(!autoPlay)}
              className="mt-4 flex items-center justify-center gap-2 px-4 py-2 rounded-lg border text-sm text-muted-foreground hover:bg-muted transition"
            >
              {autoPlay ? (
                <>
                  <Pause className="w-4 h-4" /> Pause Auto-Play
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" /> Resume Auto-Play
                </>
              )}
            </button> */}
          </div>

          {/* RIGHT SIDE DETAILS */}
          <motion.div
            key={activeProduct.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className={`rounded-2xl p-8 bg-gradient-to-br ${activeProduct.gradient} text-white flex flex-col lg:flex-row gap-8`}
          >
            {/* Text Content */}
            <div className="flex-1">
              <span className="text-xs uppercase bg-white/20 px-3 py-1 rounded-full mb-3 inline-block">
                Featured
              </span>
              <h2 className="text-3xl font-bold mb-2">{activeProduct.title}</h2>
              <p className="text-lg mb-4">{activeProduct.tagline}</p>
              <p className="text-sm opacity-90 mb-6">{activeProduct.description}</p>

              {/* Key Features */}
              <ul className="space-y-2 mb-6">
                {activeProduct.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-white/80" />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* CTAs */}
              <motion.a
  href={activeProduct.href}
  target="_blank"
  rel="noopener noreferrer"
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
  className="group relative inline-flex items-center gap-3 bg-[#E7B620] hover:bg-[#d4a31d] text-black font-semibold px-8 py-3.5 rounded-2xl text-base transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
>
  <span className="mr-2">Download Brochure</span>
  <ArrowRight className="w-4 h-4" />
</motion.a>

            </div>

            <div className="relative flex-1">
  <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-2xl">
    <img
      src={activeProduct.image || "/placeholder.svg"}
      alt={activeProduct.title}
      className="w-full h-full object-cover"
    />
    <div className={`absolute inset-0 bg-gradient-to-t ${activeProduct.gradient} opacity-10`} />
  </div>
</div>



          </motion.div>
        </div>
      </div>
    </Section>
  )
}
