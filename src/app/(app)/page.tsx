"use client"
// app/page.tsx
import FeaturesSection from "@/components/FeaturesSection";
import HeroSection from "@/components/HeroSection";
import CTA from "@/components/CTA"
import { Separator } from "@/components/ui/separator";
export default function Home() {
  return (
    <>
      <HeroSection />

      <div className="w-full py-8 md:py-12">
        <Separator className="h-0.5 w-3/4 mx-auto bg-gradient-to-r from-transparent via-purple-500/60 to-transparent" />
      </div>

      <FeaturesSection />
      <div className="w-full py-8 md:py-12">
        <Separator className="h-0.5 w-3/4 mx-auto bg-gradient-to-r from-transparent via-purple-500/60 to-transparent" />
      </div>
      <CTA />
      <div className="w-full py-8 md:py-12">
        <Separator className="h-0.5 w-3/4 mx-auto bg-gradient-to-r from-transparent via-purple-500/60 to-transparent" />
      </div>
    </>
  );
}