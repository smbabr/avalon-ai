import Hero from "@/components/sections/Hero";
import WhatWeDo from "@/components/sections/WhatWeDo";
import Principles from "@/components/sections/Principles";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-avalon-base selection:bg-avalon-accent selection:text-avalon-base">
      <Hero />
      <WhatWeDo />
      <Principles />
      <Footer />
    </main>
  );
}
