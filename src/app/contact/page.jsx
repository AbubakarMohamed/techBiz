'use client';

import Footer from "@/components/Footer";
import ContactMethod from "@/components/contact/contactMethod";
import OfficeMap from "@/components/contact/OfficeMap";



/* ---------------------- Page ---------------------- */

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white" role="main">
      {/* Skip to main content link for keyboard users */}
      <a
        href="#consultation"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-blue-600 focus:shadow-lg focus:rounded"
      >
        Skip to consultation form
      </a>

{/* <HeroSection {...heroConfig}/> */}
      {/* Main Content Flow with Better Spacing */}
      <div className="relative">
        {/* Contact Methods Section */}
        <ContactMethod />

        {/* Consultation Form Section */}
        {/* <div className="relative z-10">
          <ConsultationBookingForm />
        </div> */}

        {/* Office Location Section */}
        <div className="relative bg-gray-50">
          <OfficeMap />
        </div>

        {/* Social Proof Section */}
        {/* <div className="relative bg-white">
          <Testimonials />
        </div> */}

        {/* FAQ Section */}
        {/* <div className="relative bg-gray-50">
          <FAQ />
        </div> */}
      </div>

      <Footer />
    </main>
  );
}
