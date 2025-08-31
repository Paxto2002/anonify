"use client";

import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";
import FloatingParticles from "@/components/FloatingParticles";

export default function CTA() {
    return (
        <section className="relative w-full bg-gradient-to-b from-gray-900 to-black py-20 px-4 sm:px-6 lg:px-8 text-center overflow-hidden">
            {/* Background elements matching FeaturesSection */}
            <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-purple-900/20 to-transparent"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl"></div>
            <div className="absolute top-1/4 left-10 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl"></div>

            {/* Floating particles matching HeroSection */}
            <FloatingParticles count={10} />

            {/* CTA content */}
            <div className="relative z-10 max-w-4xl mx-auto space-y-8">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                    Ready to Experience{" "}
                    <span className="bg-gradient-to-r from-purple-400 to-violet-300 bg-clip-text text-transparent">
                        Anonymous & AI-Powered
                    </span>{" "}
                    Conversations?
                </h2>

                <p className="text-gray-300 text-xl max-w-2xl mx-auto leading-relaxed">
                    Join thousands of people using <span className="text-purple-300 font-medium">Anonify</span>
                    {" "}to chat freely, share openly, and stay truly private.
                </p>

                <div className="flex flex-col sm:flex-row justify-center gap-6 mt-8">
                    <Link
                        href="/sign-up"
                        className="group relative h-14 px-8 rounded-full bg-gradient-to-r from-purple-600 to-violet-500 text-white flex items-center justify-center overflow-hidden transition-all duration-300 hover:from-purple-700 hover:to-violet-600 hover:shadow-lg hover:shadow-purple-500/30"
                    >
                        <span className="relative z-10 font-semibold text-lg">Get Started Free</span>
                        <Sparkles className="ml-3 h-5 w-5 transition-all duration-300 group-hover:rotate-12" />
                    </Link>

                    <Link
                        href="/learn-more"
                        className="group relative h-14 px-8 rounded-full bg-gray-800/50 backdrop-blur-md text-gray-200 border border-gray-700 flex items-center justify-center overflow-hidden transition-all duration-300 hover:border-gray-600 hover:text-white hover:shadow-lg hover:shadow-gray-800/20"
                    >
                        <span className="relative z-10 font-semibold text-lg">Learn More</span>
                        <ArrowRight className="ml-3 h-5 w-5 transition-all duration-300 group-hover:translate-x-1" />
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
      `}</style>
        </section>
    );
}