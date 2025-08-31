"use client";

import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";
import FloatingParticles from "@/components/FloatingParticles";
import { Spotlight } from "@/components/ui/spotlight-new";

export default function HeroSection() {
    return (
        <section className="w-full min-h-screen bg-gradient-to-b from-gray-900 to-black relative flex flex-col items-center justify-center text-center overflow-hidden pt-16 sm:pt-20 md:pt-24 lg:pt-28 xl:pt-32 px-4 sm:px-6 lg:px-8">
            {/* Spotlight effect */}
            <Spotlight />

            {/* Background blobs */}
            <div className="absolute top-0 left-0 w-full h-64 flex justify-center gap-10">
                <div className="h-24 w-1/3 bg-purple-700/40 blur-2xl rounded-full animate-pulse-slow" />
                <div className="h-20 w-1/2 bg-violet-700/40 blur-2xl rounded-full animate-pulse-slow delay-1000" />
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2/5 aspect-[2/0.5] bg-gradient-to-br from-purple-600/50 to-violet-500/50 rounded-full opacity-50 blur-2xl animate-pulse-slow delay-500" />

            {/* Floating particles */}
            <FloatingParticles count={15} />

            {/* Hero Content */}
            <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl space-y-6 sm:space-y-7 md:space-y-8">
                <div className="relative inline-block">
                    <h1 className="text-white font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl relative z-10">
                        Anonify — Chat Freely, Stay Anonymous.
                    </h1>
                    <div className="absolute -bottom-2 left-0 right-0 h-3 bg-purple-600/30 blur-xl rounded-full animate-pulse"></div>
                </div>

                <p className="text-gray-300 text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                    Connect, share, and reply anonymously with AI-assisted suggestions —
                    your privacy, your voice, your way.
                </p>

                <div className="flex justify-center gap-4 flex-wrap">
                    <Link
                        href="/sign-up"
                        className="group relative h-12 px-6 rounded-full bg-gradient-to-r from-purple-600 to-violet-500 text-white flex items-center justify-center overflow-hidden transition-all duration-300 hover:from-purple-700 hover:to-violet-600 hover:shadow-lg hover:shadow-purple-500/30"
                    >
                        <span className="relative z-10 font-medium">Get Started</span>
                        <Sparkles className="ml-2 h-4 w-4 transition-all duration-300 group-hover:rotate-12" />
                    </Link>

                    <Link
                        href="/learn-more"
                        className="group relative h-12 px-6 rounded-full bg-gray-800 text-gray-300 border border-gray-700 flex items-center justify-center overflow-hidden transition-all duration-300 hover:border-gray-600 hover:text-white hover:shadow-lg hover:shadow-gray-800/20"
                    >
                        <span className="relative z-10 font-medium">Learn More</span>
                        <ArrowRight className="ml-2 h-4 w-4 transition-all duration-300 group-hover:translate-x-1" />
                    </Link>
                </div>
            </div>

            {/* Global Animations */}
            <style jsx global>{`
        @keyframes float1 {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(5deg);
          }
        }
        @keyframes float2 {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-15px) rotate(-5deg);
          }
        }
        @keyframes float3 {
          0%,
          100% {
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(-10px) scale(1.05);
          }
        }
        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 0.5;
          }
          50% {
            opacity: 0.7;
          }
        }
        .animate-pulse-slow {
          animation: pulse-slow 6s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
        </section>
    );
}