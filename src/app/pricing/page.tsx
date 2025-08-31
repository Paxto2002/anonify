"use client";

import { useState } from "react";
import { CheckCircle2, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import FloatingParticles from "@/components/FloatingParticles";

const plans = [
    {
        id: "free",
        name: "Free",
        price: "$0",
        description: "Perfect for casual users who want to chat anonymously.",
        features: [
            "Unlimited anonymous chats",
            "Basic AI reply suggestions",
            "Community support",
        ],
        button: "Get Started",
        gradient: "from-purple-600 to-violet-600",
    },
    {
        id: "pro",
        name: "Pro",
        price: "$9.99/mo",
        description: "For power users who want advanced AI features & security.",
        features: [
            "Everything in Free",
            "Unlimited AI reply suggestions",
            "Advanced privacy controls",
            "Message history & bookmarks",
            "Priority support",
        ],
        button: "Upgrade Now",
        gradient: "from-purple-600 to-violet-600",
    },
    {
        id: "enterprise",
        name: "Enterprise",
        price: "Custom",
        description: "For teams & organizations needing secure, large-scale chat.",
        features: [
            "All Pro features",
            "Dedicated servers",
            "Custom AI moderation",
            "Team management tools",
            "24/7 enterprise support",
        ],
        button: "Contact Sales",
        gradient: "from-purple-600 to-violet-600",
    },
];

export default function PricingPage() {
    const [selectedPlan, setSelectedPlan] = useState<string>("pro"); // Default to Pro

    return (
        <main className="mt-18 relative w-full bg-gradient-to-b from-gray-900 to-black py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
            {/* Background elements matching other sections */}
            <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-purple-900/20 to-transparent"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl"></div>
            <div className="absolute top-1/4 left-10 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl"></div>

            {/* Floating particles */}
            <FloatingParticles count={15} />

            {/* Header */}
            <section className="text-center mb-16 max-w-4xl mx-auto relative z-10">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                    Simple,{" "}
                    <span className="bg-gradient-to-r from-purple-400 to-violet-300 bg-clip-text text-transparent">
                        Transparent Pricing
                    </span>
                </h1>
                <p className="text-gray-400 text-xl max-w-3xl mx-auto">
                    Choose the plan that fits your needs. No hidden fees. Cancel anytime.
                </p>
            </section>
            <div className="w-full py-8 md:py-12">
                <Separator className="h-0.5 w-3/4 mx-auto bg-gradient-to-r from-transparent via-purple-500/60 to-transparent" />
            </div>

            {/* Pricing Grid */}
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto relative z-10">
                {plans.map((plan) => {
                    const isSelected = selectedPlan === plan.id;
                    const isPopular = plan.id === "pro";

                    return (
                        <div
                            key={plan.id}
                            role="button"
                            tabIndex={0}
                            aria-pressed={isSelected}
                            onClick={() => setSelectedPlan(plan.id)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                    e.preventDefault();
                                    setSelectedPlan(plan.id);
                                }
                            }}
                            className={`group relative rounded-2xl p-8 transition-all duration-500 outline-none cursor-pointer
                                ${isSelected
                                    ? "bg-gradient-to-br from-purple-600 to-violet-600 scale-105 ring-2 ring-white/70 shadow-xl shadow-purple-500/30"
                                    : "bg-gray-800/50 backdrop-blur-md border border-gray-700 hover:scale-105"
                                }`}
                        >
                            {/* Hover effect overlay */}
                            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-purple-500 to-violet-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>

                            <div className="relative z-10 h-full flex flex-col justify-between">
                                <div>
                                    {/* Popular Badge - Only show on Pro plan */}
                                    {isPopular && (
                                        <span
                                            className={`text-xs px-3 py-1 rounded-full mb-4 inline-block ${isSelected
                                                ? "bg-white/30 text-white"
                                                : "bg-white/20 text-white"
                                                }`}
                                        >
                                            Most Popular
                                        </span>
                                    )}

                                    <h2 className="text-2xl font-bold text-white">{plan.name}</h2>
                                    <p className="mt-2 text-3xl font-semibold text-white">
                                        {plan.price}
                                    </p>
                                    <p className="mt-4 text-gray-200/90 text-sm">
                                        {plan.description}
                                    </p>

                                    {/* Features */}
                                    <ul className="mt-6 space-y-3">
                                        {plan.features.map((feature, i) => (
                                            <li
                                                key={i}
                                                className="flex items-center gap-2 text-sm text-gray-200"
                                            >
                                                <CheckCircle2 className="w-5 h-5 text-purple-300 flex-shrink-0" />
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* CTA Button */}
                                <Link
                                    href={isSelected ? "/sign-up" : "#"}
                                    className={`mt-8 group relative w-full h-12 rounded-full flex items-center justify-center overflow-hidden transition-all duration-300 ${isSelected
                                        ? "bg-white text-purple-700 shadow-lg hover:shadow-white/20"
                                        : "bg-gray-700/50 text-white border border-gray-600 hover:border-gray-500 hover:bg-gray-700/70"
                                        }`}
                                >
                                    <span className="relative z-10 font-semibold">{plan.button}</span>
                                    {isSelected && (
                                        <Sparkles className="ml-2 h-4 w-4 transition-all duration-300 group-hover:rotate-12" />
                                    )}
                                </Link>
                            </div>
                        </div>
                    );
                })}
            </section>

            <div className="w-full py-8 md:py-12">
                <Separator className="h-0.5 w-3/4 mx-auto bg-gradient-to-r from-transparent via-purple-500/60 to-transparent" />
            </div>

            {/* Footer CTA */}
            <section className="text-center mt-20 relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    Still Not Sure?
                </h2>
                <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
                    Try Anonify for free. Upgrade anytime if you love it.
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
                        href="/learn-more"
                        className="group relative h-14 px-8 rounded-full bg-gray-800/50 backdrop-blur-md text-gray-200 border border-gray-700 flex items-center justify-center overflow-hidden transition-all duration-300 hover:border-gray-600 hover:text-white hover:shadow-lg hover:shadow-gray-800/20"
                    >
                        <span className="relative z-10 font-semibold text-lg">
                            Learn More
                        </span>
                        <ArrowRight className="ml-3 h-5 w-5 transition-all duration-300 group-hover:translate-x-1" />
                    </Link>
                </div>
            </section>

            <div className="w-full py-8 md:py-12">
                <Separator className="h-0.5 w-3/4 mx-auto bg-gradient-to-r from-transparent via-purple-500/60 to-transparent" />
            </div>

            {/* Global Animations */}
            <style jsx>{`
                @keyframes float1 {
                    0%, 100% {
                        transform: translateY(0) rotate(0deg);
                    }
                    50% {
                        transform: translateY(-20px) rotate(5deg);
                    }
                }
                @keyframes float2 {
                    0%, 100% {
                        transform: translateY(0) rotate(0deg);
                    }
                    50% {
                        transform: translateY(-15px) rotate(-5deg);
                    }
                }
                @keyframes float3 {
                    0%, 100% {
                        transform: translateY(0) scale(1);
                    }
                    50% {
                        transform: translateY(-10px) scale(1.05);
                    }
                }
            `}</style>
        </main>
    );
}
