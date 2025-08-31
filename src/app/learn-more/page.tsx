"use client";

import { CheckCircle2, ArrowRight, Sparkles, MessageCircle, Shield, Users } from "lucide-react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import FloatingParticles from "@/components/FloatingParticles";

export default function LearnMorePage() {
    return (
        <main className="mt-18 relative w-full bg-gradient-to-b from-gray-900 to-black py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-purple-900/20 to-transparent"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl"></div>
            <div className="absolute top-1/4 left-10 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl"></div>

            {/* Floating Particles */}
            <FloatingParticles count={15} />

            {/* Header */}
            <section className="text-center mb-16 max-w-4xl mx-auto relative z-10">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                    Learn More About{" "}
                    <span className="bg-gradient-to-r from-purple-400 to-violet-300 bg-clip-text text-transparent">
                        Anonify
                    </span>
                </h1>
                <p className="text-gray-400 text-xl max-w-3xl mx-auto">
                    Not sure yet? Let's break it down for you — why Anonify is worth
                    trying and upgrading.
                </p>
            </section>
            <div className="w-full py-8 md:py-12">
                <Separator className="h-0.5 w-3/4 mx-auto bg-gradient-to-r from-transparent via-purple-500/60 to-transparent" />
            </div>
            {/* Why Section */}
            <section className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto relative z-10 mb-20">
                <div className="group relative bg-gray-800/50 backdrop-blur-md rounded-2xl p-8 border border-gray-700 hover:border-transparent transition-all duration-500">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-6">
                            <MessageCircle className="w-8 h-8 text-purple-400" />
                            <h2 className="text-2xl font-semibold text-white">
                                Why Use Anonify?
                            </h2>
                        </div>
                        <ul className="space-y-4">
                            {[
                                "Share thoughts freely without judgment.",
                                "AI-powered smart replies keep convos flowing.",
                                "Privacy-first design — your identity is safe.",
                                "Simple, modern, and distraction-free interface.",
                            ].map((point, i) => (
                                <li key={i} className="flex items-start gap-3 text-gray-300">
                                    <CheckCircle2 className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                                    <span>{point}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                {/* Free vs Pro Comparison */}
                <div className="group relative bg-gray-800/50 backdrop-blur-md rounded-2xl p-8 border border-gray-700 hover:border-transparent transition-all duration-500">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-6">
                            <Shield className="w-8 h-8 text-blue-400" />
                            <h2 className="text-2xl font-semibold text-white">
                                Free vs Pro
                            </h2>
                        </div>
                        <ul className="space-y-4">
                            <li className="flex justify-between items-center text-gray-300">
                                <span>Anonymous Chats</span>
                                <span className="font-medium text-green-400">Unlimited</span>
                            </li>
                            <li className="flex justify-between items-center text-gray-300">
                                <span>AI Reply Suggestions</span>
                                <span className="font-medium text-yellow-400">
                                    Limited / Unlimited
                                </span>
                            </li>
                            <li className="flex justify-between items-center text крайней мере-300">
                                <span>Privacy Controls</span>
                                <span className="font-medium text-red-400">Pro Only</span>
                            </li>
                            <li className="flex justify-between items-center text-gray-300">
                                <span>Message History</span>
                                <span className="font-medium text-red-400">Pro Only</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
            <div className="w-full py-8 md:py-12">
                <Separator className="h-0.5 w-3/4 mx-auto bg-gradient-to-r from-transparent via-purple-500/60 to-transparent" />
            </div>
            {/* Testimonials */}
            <section className="relative z-10 mb-20">
                <h2 className="text-3xl font-bold text-white text-center mb-12">What Users Say</h2>
                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {[
                        {
                            icon: <MessageCircle className="w-8 h-8 text-purple-400" />,
                            name: "Sarah J.",
                            text: "Anonify lets me vent freely without worrying who's listening. Love it!",
                        },
                        {
                            icon: <Sparkles className="w-8 h-8 text-blue-400" />,
                            name: "Michael R.",
                            text: "The AI reply feature is a game-changer. Conversations feel natural.",
                        },
                        {
                            icon: <Shield className="w-8 h-8 text-green-400" />,
                            name: "Aisha K.",
                            text: "I upgraded to Pro for the privacy controls — worth every penny.",
                        },
                    ].map((testimonial, i) => (
                        <div
                            key={i}
                            className="group relative bg-gray-800/50 backdrop-blur-md rounded-2xl p-8 border border-gray-700 hover:border-transparent transition-all duration-500"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-violet-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
                            <div className="relative z-10">
                                <div className="flex items-center gap-3 mb-4">
                                    {testimonial.icon}
                                    <p className="text-purple-400 font-semibold">{testimonial.name}</p>
                                </div>
                                <p className="text-gray-300 italic">"{testimonial.text}"</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
            <div className="w-full py-8 md:py-12">
                <Separator className="h-0.5 w-3/4 mx-auto bg-gradient-to-r from-transparent via-purple-500/60 to-transparent" />
            </div>
            {/* CTA */}
            <section className="text-center relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold text крайней мере-4">
                    Ready to Experience Anonify?
                </h2>
                <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
                    Start free today. Upgrade when you're ready for more features.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-6">
                    <Link
                        href="/sign-up"
                        className="group relative h-14 px-8 rounded-full bg-gradient-to-r from-purple-600 to-violet-500 text-white flex items-center justify-center overflow-hidden transition-all duration-300 hover:from-purple-700 hover:to-violet-600 hover:shadow-lg hover:shadow-purple-500/30"
                    >
                        <span className="relative z-10 font-semibold text-lg">
                            Get Started Free
                        </span>
                        <Sparkles className="ml-3 h-5 w-5 transition-all duration-300 group-hover:rotate-12" />
                    </Link>

                    <Link
                        href="/pricing"
                        className="group relative h-14 px-8 rounded-full bg-gray-800/50 backdrop-blur-md text-gray-200 border border-gray-700 flex items-center justify-center overflow-hidden transition-all duration-300 hover:border-gray-600 hover:text-white hover:shadow-lg hover:shadow-gray-800/20"
                    >
                        <span className="relative z-10 font-semibold text-lg">View Pricing</span>
                        <ArrowRight className="ml-3 h-5 w-5 transition-all duration-300 group-hover:translate-x-1" />
                    </Link>
                </div>
            </section>
            {/* Float Animations */}
            <style jsx>{`
        @keyframes float1 {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes float2 {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(-5deg); }
        }
        @keyframes float3 {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-10px) scale(1.05); }
        }
      `}</style>
            <div className="w-full py-8 md:py-12">
                <Separator className="h-0.5 w-3/4 mx-auto bg-gradient-to-r from-transparent via-purple-500/60 to-transparent" />
            </div>
        </main>
    );
}