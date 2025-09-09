"use client";

import { useState } from "react";
import {
  Sparkles,
  ArrowRight,
  Code,
  BookOpen,
  MessageCircle,
  Zap,
  Shield,
  Clock,
} from "lucide-react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import FloatingParticles from "@/components/FloatingParticles";

export default function DocumentationPage() {
  const [activeSection, setActiveSection] = useState("overview");

  return (
    <main className="mt-18 relative w-full bg-gradient-to-b from-gray-900 to-black py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-purple-900/20 to-transparent"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl"></div>
      <div className="absolute top-1/4 left-10 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl"></div>

      {/* Floating particles */}
      <FloatingParticles count={15} />

      {/* Header */}
      <section className="text-center mb-16 max-w-4xl mx-auto relative z-10">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Anonify{" "}
          <span className="bg-gradient-to-r from-purple-400 to-violet-300 bg-clip-text text-transparent">
            Documentation
          </span>
        </h1>
        <p className="text-gray-400 text-xl max-w-3xl mx-auto">
          Everything you need to know about using and integrating with Anonify,
          the anonymous messaging platform.
        </p>
      </section>

      <div className="w-full py-8 md:py-12">
        <Separator className="h-0.5 w-3/4 mx-auto bg-gradient-to-r from-transparent via-purple-500/60 to-transparent" />
      </div>

      {/* Documentation Content */}
      <div className="max-w-6xl mx-auto relative z-10 mb-16 flex flex-col lg:flex-row gap-8">
        {/* Sidebar Navigation */}
        <div className="lg:w-1/4">
          <div className="bg-gray-800/30 backdrop-blur-md rounded-2xl p-6 border border-gray-700 sticky top-24">
            <h2 className="text-lg font-semibold text-white mb-4">
              Documentation
            </h2>
            <nav className="space-y-2">
              {[
                "overview",
                "getting-started",
                "features",
                "ai-suggestions",
                "best-practices",
                "technical",
              ].map((section) => (
                <button
                  key={section}
                  onClick={() => setActiveSection(section)}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                    activeSection === section
                      ? "bg-purple-600 text-white"
                      : "text-gray-300 hover:bg-gray-700/50"
                  }`}
                >
                  {section
                    .split("-")
                    .map((word) => word[0].toUpperCase() + word.slice(1))
                    .join(" ")}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:w-3/4">
          {/* Overview Section */}
          {activeSection === "overview" && (
            <div className="bg-gray-800/30 backdrop-blur-md rounded-2xl p-8 border border-gray-700">
              <div className="flex items-center gap-3 mb-6">
                <BookOpen className="w-8 h-8 text-purple-400" />
                <h2 className="text-2xl font-bold text-white">Overview</h2>
              </div>
              <p className="text-gray-300 mb-6">
                Anonify is an anonymous social messaging platform that lets you
                send messages without revealing your identity. With AI-powered
                assistance, it provides smart, friendly suggestions to help you
                craft meaningful, engaging messages.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                {[
                  {
                    icon: Shield,
                    title: "Complete Anonymity",
                    desc: "Your identity is fully protected with end-to-end encryption.",
                  },
                  {
                    icon: Sparkles,
                    title: "AI-Powered",
                    desc: "Smart suggestions help you craft better messages.",
                  },
                  {
                    icon: Zap,
                    title: "Instant Delivery",
                    desc: "Messages reach recipients in real-time.",
                  },
                  {
                    icon: MessageCircle,
                    title: "User-Friendly",
                    desc: "Clean, modern interface with intuitive design.",
                  },
                ].map(({ icon: Icon, title, desc }) => (
                  <div
                    key={title}
                    className="bg-gray-800/50 p-5 rounded-xl border border-gray-700"
                  >
                    <div className="bg-purple-500/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-purple-400" />
                    </div>
                    <h3 className="text-white font-semibold mb-2">{title}</h3>
                    <p className="text-gray-400 text-sm">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Getting Started Section */}
          {activeSection === "getting-started" && (
            <div className="bg-gray-800/30 backdrop-blur-md rounded-2xl p-8 border border-gray-700">
              <div className="flex items-center gap-3 mb-6">
                <Zap className="w-8 h-8 text-purple-400" />
                <h2 className="text-2xl font-bold text-white">
                  Getting Started
                </h2>
              </div>

              <div className="space-y-8">
                {[
                  {
                    step: 1,
                    title: "Access a User Page",
                    desc: "Visit a user's Anonify page using their username:",
                    code: "http://localhost:3000/u/username",
                  },
                  {
                    step: 2,
                    title: "Type Your Message",
                    desc: 'Enter your thoughts in the "Your Message" text area.',
                  },
                  {
                    step: 3,
                    title: "Use AI Suggestions (Optional)",
                    desc: 'Click "Get AI Suggestions" to receive 3 personalized message ideas. Click any suggestion to apply it directly to your message box.',
                  },
                  {
                    step: 4,
                    title: "Send Your Message",
                    desc: 'Click "Send Message Anonymously". Your message will be delivered instantly without revealing your identity.',
                  },
                ].map(({ step, title, desc, code }) => (
                  <div key={step}>
                    <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
                      <span className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center mr-3 text-sm">
                        {step}
                      </span>
                      {title}
                    </h3>
                    <p className="text-gray-300 mb-3">{desc}</p>
                    {code && (
                      <div className="bg-gray-900 p-4 rounded-lg border border-gray-700 mb-4">
                        <code className="text-purple-300">{code}</code>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Key Features Section */}
          {activeSection === "features" && (
            <div className="bg-gray-800/30 backdrop-blur-md rounded-2xl p-8 border border-gray-700">
              <div className="flex items-center gap-3 mb-6">
                <Sparkles className="w-8 h-8 text-purple-400" />
                <h2 className="text-2xl font-bold text-white">Key Features</h2>
              </div>

              <div className="space-y-6">
                {[
                  {
                    title: "100% Anonymous",
                    desc: "Your identity is fully protected. We never store personally identifiable information, and messages are encrypted end-to-end.",
                  },
                  {
                    title: "AI-Powered Suggestions",
                    desc: "Receive helpful, context-aware replies generated by advanced AI models to improve your communication.",
                  },
                  {
                    title: "Instant Delivery",
                    desc: "Messages reach recipients in real-time with minimal latency, ensuring timely communication.",
                  },
                  {
                    title: "Clean and Modern UI",
                    desc: "Enjoy a smooth interface with floating particles and intuitive design that makes messaging pleasant and straightforward.",
                  },
                ].map(({ title, desc }) => (
                  <div
                    key={title}
                    className="bg-gray-800/50 p-5 rounded-xl border border-gray-700"
                  >
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {title}
                    </h3>
                    <p className="text-gray-300">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* AI Suggestions Section */}
          {activeSection === "ai-suggestions" && (
            <div className="bg-gray-800/30 backdrop-blur-md rounded-2xl p-8 border border-gray-700">
              <div className="flex items-center gap-3 mb-6">
                <MessageCircle className="w-8 h-8 text-purple-400" />
                <h2 className="text-2xl font-bold text-white">
                  AI Suggestions
                </h2>
              </div>

              <div className="space-y-6">
                {[
                  {
                    title: "How It Works",
                    desc: "Our AI suggestions are generated using advanced language models that analyze conversation context to provide relevant response ideas.",
                  },
                  {
                    title: "Unique Responses",
                    desc: "Each click produces unique, varied, and context-sensitive responses, ensuring you always have fresh ideas for your messages.",
                  },
                  {
                    title: "Tone & Style",
                    desc: "Suggestions are designed to improve engagement while remaining polite, positive, and friendly, matching the tone of your conversation.",
                  },
                  {
                    title: "Learning Capabilities",
                    desc: "The AI improves with usage as it learns your communication style, providing more personalized suggestions over time.",
                  },
                ].map(({ title, desc }) => (
                  <div
                    key={title}
                    className="bg-gray-800/50 p-5 rounded-xl border border-gray-700"
                  >
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {title}
                    </h3>
                    <p className="text-gray-300">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Best Practices Section */}
          {activeSection === "best-practices" && (
            <div className="bg-gray-800/30 backdrop-blur-md rounded-2xl p-8 border border-gray-700">
              <div className="flex items-center gap-3 mb-6">
                <Shield className="w-8 h-8 text-purple-400" />
                <h2 className="text-2xl font-bold text-white">
                  Best Practices
                </h2>
              </div>

              <div className="space-y-6">
                {[
                  {
                    title: "Message Composition",
                    desc: "Keep messages concise and focused to ensure clarity and effectiveness. Use AI suggestions when you need help expressing your thoughts or want to improve your message's impact.",
                  },
                  {
                    title: "Privacy Protection",
                    desc: "Avoid including personal identifiers such as emails, phone numbers, or full names in your messages. Remember that while Anonify protects your identity, you should still be mindful of the content you share.",
                  },
                  {
                    title: "Respectful Communication",
                    desc: "Even in anonymous communication, maintain respect and kindness toward others. Report any inappropriate content encountered through the platform's reporting features.",
                  },
                ].map(({ title, desc }) => (
                  <div
                    key={title}
                    className="bg-gray-800/50 p-5 rounded-xl border border-gray-700"
                  >
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {title}
                    </h3>
                    <p className="text-gray-300">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Technical Notes Section */}
          {activeSection === "technical" && (
            <div className="bg-gray-800/30 backdrop-blur-md rounded-2xl p-8 border border-gray-700">
              <div className="flex items-center gap-3 mb-6">
                <Code className="w-8 h-8 text-purple-400" />
                <h2 className="text-2xl font-bold text-white">
                  Technical Notes
                </h2>
              </div>

              <div className="space-y-6">
                <div className="bg-gray-800/50 p-5 rounded-xl border border-gray-700">
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Tech Stack
                  </h3>
                  <p className="text-gray-300 mb-3">
                    Anonify is built with a modern, robust tech stack for
                    scalability and developer-friendly integration:
                  </p>
                  <ul className="text-gray-300 list-disc pl-5 space-y-1">
                    <li>
                      Next.js - React framework for production-ready web apps
                    </li>
                    <li>
                      Tailwind CSS - Utility-first styling for fast UI
                      development
                    </li>
                    <li>ShadCN - Pre-built UI components and patterns</li>
                    <li>
                      Zod & Zod Resolver - Schema validation and TypeScript type
                      safety
                    </li>
                    <li>Mongoose & MongoDB - Database modeling and storage</li>
                    <li>
                      Google Gemini API - AI-powered suggestions and smart
                      responses
                    </li>
                    <li>
                      Various other modern web technologies and integrations
                    </li>
                  </ul>
                </div>

                <div className="bg-gray-800/50 p-5 rounded-xl border border-gray-700">
                  <h3 className="text-xl font-semibold text-white mb-2">
                    AI Integration
                  </h3>
                  <p className="text-gray-300">
                    Message suggestions are generated using Google Gemini API,
                    which provides context-aware, friendly, and varied
                    suggestions tailored to user conversations.
                  </p>
                </div>

                <div className="bg-gray-800/50 p-5 rounded-xl border border-gray-700">
                  <h3 className="text-xl font-semibold text-white mb-2">
                    APIs
                  </h3>
                  <p className="text-gray-300 mb-2">
                    Anonify exposes endpoints for messaging and AI suggestions:
                  </p>
                  <div className="bg-gray-900 p-4 rounded-lg border border-gray-700 mb-3">
                    <code className="text-purple-300">/api/send-message</code> -
                    Sends anonymous messages
                  </div>
                  <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
                    <code className="text-purple-300">
                      /api/suggest-messages
                    </code>{" "}
                    - Generates AI message suggestions using Gemini API
                  </div>
                </div>

                <div className="bg-gray-800/50 p-5 rounded-xl border border-gray-700">
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Edge Runtime
                  </h3>
                  <p className="text-gray-300">
                    AI suggestions are executed on Vercel Edge Functions for
                    low-latency, fast responses.
                  </p>
                </div>

                <div className="bg-gray-800/50 p-5 rounded-xl border border-gray-700">
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Caching
                  </h3>
                  <p className="text-gray-300">
                    Suggestions are generated fresh on each request to ensure
                    unique, personalized responses every time.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="w-full py-8 md:py-12">
        <Separator className="h-0.5 w-3/4 mx-auto bg-gradient-to-r from-transparent via-purple-500/60 to-transparent" />
      </div>

      {/* Footer CTA */}
      <section className="text-center mt-20 relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Ready to Get Started?
        </h2>
        <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
          Join Anonify today and experience anonymous messaging with AI-powered
          suggestions.
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
            href="/api-docs"
            className="group relative h-14 px-8 rounded-full bg-gray-800/50 backdrop-blur-md text-gray-200 border border-gray-700 flex items-center justify-center overflow-hidden transition-all duration-300 hover:border-gray-600 hover:text-white hover:shadow-lg hover:shadow-gray-800/20"
          >
            <span className="relative z-10 font-semibold text-lg">
              API Documentation
            </span>
            <Code className="ml-3 h-5 w-5 transition-all duration-300 group-hover:rotate-12" />
          </Link>
        </div>
      </section>

      <div className="w-full py-8 md:py-12">
        <Separator className="h-0.5 w-3/4 mx-auto bg-gradient-to-r from-transparent via-purple-500/60 to-transparent" />
      </div>

      {/* Global Animations */}
      <style jsx>{`
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
    </main>
  );
}
