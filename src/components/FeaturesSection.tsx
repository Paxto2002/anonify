"use client";

import {
    Lock,
    Eye,
    Brain,
    Zap,
    Heart,
    Users,
    Globe,
    Clock,
    Bell,
} from "lucide-react";

export default function FeaturesSection() {
    const features = [
        {
            icon: <Lock className="w-8 h-8" />,
            title: "Complete Anonymity",
            description:
                "Chat without ever revealing your identity. No phone numbers, no email addresses, just pure conversation.",
            gradient: "from-purple-500 to-pink-500",
        },
        {
            icon: <Brain className="w-8 h-8" />,
            title: "AI-Powered Suggestions",
            description:
                "Get intelligent reply suggestions tailored to your conversation context, making chatting effortless.",
            gradient: "from-blue-500 to-cyan-500",
        },
        {
            icon: <Eye className="w-8 h-8" />,
            title: "No Message History",
            description:
                "Messages disappear after they're read. No logs, no records, no traces left behind.",
            gradient: "from-green-500 to-teal-500",
        },
        {
            icon: <Zap className="w-8 h-8" />,
            title: "Lightning Fast",
            description:
                "Experience real-time messaging with minimal latency. Connect instantly with anyone, anywhere.",
            gradient: "from-yellow-500 to-orange-500",
        },
        {
            icon: <Globe className="w-8 h-8" />,
            title: "Global Reach",
            description:
                "Connect with people across the world without borders or restrictions.",
            gradient: "from-indigo-500 to-purple-500",
        },
        {
            icon: <Heart className="w-8 h-8" />,
            title: "User-Friendly",
            description:
                "Beautiful, intuitive interface designed for seamless anonymous communication.",
            gradient: "from-red-500 to-pink-500",
        },
    ];

    return (
        <section className="w-full py-20 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden px-4 sm:px-6 lg:px-8">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-purple-900/20 to-transparent"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl"></div>
            <div className="absolute top-1/4 left-10 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl"></div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Powerful Features for{" "}
                        <span className="bg-gradient-to-r from-purple-400 to-violet-300 bg-clip-text text-transparent">
                            Private Communication
                        </span>
                    </h2>
                    <p className="text-gray-400 text-xl max-w-3xl mx-auto">
                        Discover all the ways Anonify protects your privacy while enhancing
                        your chatting experience.
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="group relative bg-gray-800/50 backdrop-blur-md rounded-2xl p-8 border border-gray-700 hover:border-transparent transition-all duration-500 hover:scale-105"
                        >
                            {/* Hover gradient border */}
                            <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl p-px">
                                <div
                                    className={`bg-gradient-to-r ${feature.gradient} w-full h-full rounded-2xl`}
                                ></div>
                            </div>

                            <div className="relative z-10">
                                {/* Icon */}
                                <div
                                    className={`inline-flex rounded-2xl p-3 bg-gradient-to-r ${feature.gradient} mb-6`}
                                >
                                    {feature.icon}
                                </div>

                                <h3 className="text-xl font-semibold text-white mb-3">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-400">{feature.description}</p>

                                {/* Underline */}
                                <div className="mt-6 w-0 group-hover:w-16 h-0.5 bg-gradient-to-r from-purple-500 to-violet-400 transition-all duration-500"></div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Stats */}
                <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                    <div className="text-center p-6 bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700">
                        <Users className="w-10 h-10 text-purple-400 mx-auto mb-3" />
                        <div className="text-3xl font-bold text-white">500K+</div>
                        <div className="text-gray-400">Active Users</div>
                    </div>
                    <div className="text-center p-6 bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700">
                        <Globe className="w-10 h-10 text-blue-400 mx-auto mb-3" />
                        <div className="text-3xl font-bold text-white">120+</div>
                        <div className="text-gray-400">Countries</div>
                    </div>
                    <div className="text-center p-6 bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700">
                        <Clock className="w-10 h-10 text-green-400 mx-auto mb-3" />
                        <div className="text-3xl font-bold text-white">24/7</div>
                        <div className="text-gray-400">Availability</div>
                    </div>
                    <div className="text-center p-6 bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700">
                        <Bell className="w-10 h-10 text-yellow-400 mx-auto mb-3" />
                        <div className="text-3xl font-bold text-white">10M+</div>
                        <div className="text-gray-400">Messages Daily</div>
                    </div>
                </div>
            </div>
        </section>
    );
}
