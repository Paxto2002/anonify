"use client";
import Link from "next/link";
import { Sparkles, ArrowRight, Shield, MessageCircle, Users, Globe } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import FloatingParticles from "@/components/FloatingParticles";

export default function AboutPage() {
    return (
        <main className="relative w-full bg-gradient-to-b from-gray-900 to-black min-h-screen overflow-hidden mt-18">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-purple-900/20 to-transparent"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl"></div>
            <div className="absolute top-1/4 left-10 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl"></div>

            {/* Floating particles */}
            <FloatingParticles count={15} />

            {/* Hero Section */}
            <section className="relative text-center py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto z-10">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                    About{" "}
                    <span className="bg-gradient-to-r from-purple-400 to-violet-300 bg-clip-text text-transparent">
                        Anonify
                    </span>
                </h1>
                <p className="text-gray-400 text-xl max-w-2xl mx-auto">
                    Anonify is built for people who want to{" "}
                    <strong className="text-purple-300">
                        share freely, stay anonymous, and connect without fear
                    </strong>. Our mission is to empower authentic conversations while
                    protecting your privacy.
                </p>
            </section>
            <div className="w-full py-8 md:py-12">
                <Separator className="h-0.5 w-3/4 mx-auto bg-gradient-to-r from-transparent via-purple-500/60 to-transparent" />
            </div>

            {/* Mission + Vision */}
            <section className="relative grid md:grid-cols-2 gap-8 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 z-10">
                <div className="group relative bg-gray-800/50 backdrop-blur-md rounded-2xl p-8 border border-gray-700 hover:border-transparent transition-all duration-500">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-4">
                            <Globe className="w-8 h-8 text-blue-400" />
                            <h2 className="text-2xl font-semibold text-white">Our Mission</h2>
                        </div>
                        <p className="text-gray-400">
                            To create a safe, anonymous platform where anyone can speak freely,
                            seek feedback, and build deeper connections — without compromising
                            their identity or privacy.
                        </p>
                    </div>
                </div>

                <div className="group relative bg-gray-800/50 backdrop-blur-md rounded-2xl p-8 border border-gray-700 hover:border-transparent transition-all duration-500">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-4">
                            <Sparkles className="w-8 h-8 text-purple-400" />
                            <h2 className="text-2xl font-semibold text-white">Our Vision</h2>
                        </div>
                        <p className="text-gray-400">
                            To become the world's most trusted space for anonymous communication,
                            enhanced by AI that helps conversations flow naturally and positively.
                        </p>
                    </div>
                </div>
            </section>

            <div className="w-full py-8 md:py-12">
                <Separator className="h-0.5 w-3/4 mx-auto bg-gradient-to-r from-transparent via-purple-500/60 to-transparent" />
            </div>

            {/* Core Values */}
            <section className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 z-10">
                <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
                    Our Core Values
                </h2>
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                    {[
                        {
                            icon: <Shield className="w-8 h-8 text-purple-400" />,
                            title: "Privacy First",
                            desc: "Your conversations are encrypted and never tracked. Privacy is at the heart of everything we build.",
                            gradient: "from-purple-500/10 to-pink-500/10",
                        },
                        {
                            icon: <MessageCircle className="w-8 h-8 text-blue-400" />,
                            title: "Freedom of Expression",
                            desc: "We believe everyone deserves a safe space to share their thoughts and ideas — without fear.",
                            gradient: "from-blue-500/10 to-cyan-500/10",
                        },
                        {
                            icon: <Sparkles className="w-8 h-8 text-green-400" />,
                            title: "AI Assistance",
                            desc: "Our AI suggests replies to help you communicate better, faster, and more meaningfully.",
                            gradient: "from-green-500/10 to-teal-500/10",
                        },
                        {
                            icon: <Users className="w-8 h-8 text-yellow-400" />,
                            title: "Community",
                            desc: "We're building a respectful, supportive space where users can connect and grow together.",
                            gradient: "from-yellow-500/10 to-orange-500/10",
                        },
                    ].map((value, i) => (
                        <div
                            key={i}
                            className="group relative bg-gray-800/50 backdrop-blur-md rounded-2xl p-6 border border-gray-700 hover:border-transparent transition-all duration-500"
                        >
                            <div
                                className={`absolute inset-0 bg-gradient-to-br ${value.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl`}
                            ></div>
                            <div className="relative z-10">
                                <div className="flex items-center gap-3 mb-4">
                                    {value.icon}
                                    <h3 className="font-semibold text-lg text-white">
                                        {value.title}
                                    </h3>
                                </div>
                                <p className="text-gray-400 text-sm">{value.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <div className="w-full py-8 md:py-12">
                <Separator className="h-0.5 w-3/4 mx-auto bg-gradient-to-r from-transparent via-purple-500/60 to-transparent" />
            </div>

            {/* Call to Action */}
            <section className="relative bg-gradient-to-r from-purple-600 to-violet-600 text-white py-20 mt-12 z-10">
                <div className="max-w-3xl mx-auto text-center px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Join the Movement</h2>
                    <p className="text-lg text-purple-100 mb-8 max-w-2xl mx-auto">
                        Be part of a platform where conversations are free, safe, and
                        anonymous. Start your journey today.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-6">
                        <Link
                            href="/sign-up"
                            className="group relative h-14 px-8 rounded-full bg-white text-purple-700 flex items-center justify-center overflow-hidden transition-all duration-300 hover:bg-gray-100 hover:shadow-lg hover:shadow-white/20"
                        >
                            <span className="relative z-10 font-semibold text-lg">Get Started</span>
                            <Sparkles className="ml-3 h-5 w-5 transition-all duration-300 group-hover:rotate-12" />
                        </Link>

                        <Link
                            href="/learn-more"
                            className="group relative h-14 px-8 rounded-full bg-purple-700/50 backdrop-blur-md text-white border border-purple-500 flex items-center justify-center overflow-hidden transition-all duration-300 hover:border-purple-400 hover:bg-purple-600/70 hover:shadow-lg hover:shadow-purple-500/20"
                        >
                            <span className="relative z-10 font-semibold text-lg">Learn More</span>
                            <ArrowRight className="ml-3 h-5 w-5 transition-all duration-300 group-hover:translate-x-1" />
                        </Link>
                    </div>
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
