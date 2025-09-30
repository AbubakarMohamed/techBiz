import { Inter } from "next/font/google";
import { Suspense } from "react";

export const metadata = {
  title: "About Techbiz - Enterprise Solutions & Digital Transformation",
  description:
    "Learn about Techbiz's vision, philosophy, and impact in delivering enterprise-grade technology solutions and digital transformation services.",
  openGraph: {
    title: "About Techbiz - Enterprise Solutions & Digital Transformation",
    description:
      "Learn about Techbiz's vision, philosophy, and impact in delivering enterprise-grade technology solutions and digital transformation services.",
    type: "website",
    locale: "en_US",
  },
};

export default function AboutLayout({ children }) {
  return (
    <div className="w-full overflow-x-hidden">
      {/* <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-emerald-500"></div>
        </div> */}

      {children}
      {/* </Suspense> */}
    </div>
  );
}
