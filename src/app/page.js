// pages/index.js
import dynamic from "next/dynamic";
const HeroSection = dynamic(
  () => import("@/components/home/hero/HeroSection"),
  { ssr: true },
);

// Below-fold content is rendered by a client-only wrapper so we can use ssr:false there
import BelowFoldClient from "@/components/home/BelowFoldClient";

export default function Home() {
  return (
    <div className="w-full overflow-x-hidden">
      <main id="content" role="main">
        <HeroSection />
        <BelowFoldClient />
      </main>
    </div>
  );
}
