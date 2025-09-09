"use client";

import { Sparkles, ArrowRight, Mail, MessageCircle } from "lucide-react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import FloatingParticles from "@/components/FloatingParticles";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqCategories = [
  {
    id: "account",
    title: "Account & Setup",
    questions: [
      {
        question: "How do I create an account?",
        answer:
          "Creating an account is simple. Click on the 'Sign Up' button in the top right corner, enter your email address, choose a password, and you're ready to start chatting anonymously.",
      },
      {
        question: "Is my personal information secure?",
        answer:
          "Yes! We use end-to-end encryption and never store personally identifiable information. Your privacy is our top priority.",
      },
      {
        question: "Can I use Anonify without an account?",
        answer:
          "Yes, you can start chatting immediately without creating an account, but you won't have access to features like message history or customization options.",
      },
    ],
  },
  {
    id: "features",
    title: "Features & Usage",
    questions: [
      {
        question: "How does anonymous chatting work?",
        answer:
          "When you start a chat, we assign you a random anonymous identifier. Other users see only this identifier, not your personal information. Messages are encrypted and not tied to your identity.",
      },
      {
        question: "Can I retrieve my chat history?",
        answer:
          "With a free account, chats are temporary. Pro users can access their chat history for up to 30 days. Enterprise plans offer extended retention options.",
      },
      {
        question: "How do AI reply suggestions work?",
        answer:
          "Our AI analyzes conversation context to provide relevant response suggestions. These improve with usage as the AI learns your communication style.",
      },
    ],
  },
  {
    id: "privacy",
    title: "Privacy & Security",
    questions: [
      {
        question: "What data do you collect?",
        answer:
          "We collect minimal data necessary for service operation: account information (if you create one), device information, and usage statistics. We never collect content of your conversations.",
      },
      {
        question: "Can my chats be traced back to me?",
        answer:
          "No. We use advanced encryption and don't store IP addresses or other identifying information with your chats. Even we cannot trace conversations back to individual users.",
      },
      {
        question: "How secure is the platform?",
        answer:
          "We use industry-standard encryption (AES-256) for all messages and implement regular security audits. Our infrastructure is designed with privacy-by-design principles.",
      },
    ],
  },
  {
    id: "troubleshooting",
    title: "Troubleshooting",
    questions: [
      {
        question: "Why can't I connect to a chat?",
        answer:
          "This is usually due to network issues. Check your internet connection, try refreshing the page, or temporarily disable any VPNs or firewalls that might be blocking the connection.",
      },
      {
        question: "What should I do if I encounter inappropriate content?",
        answer:
          "Use the report feature immediately. We have AI moderation and human review teams that handle reports promptly. Repeat offenders are permanently banned.",
      },
      {
        question: "How do I reset my password?",
        answer:
          "Go to the login page and click 'Forgot Password'. Enter your email address, and we'll send you a secure link to reset your password.",
      },
    ],
  },
];

export default function HelpCenterPage() {
  return (
    <main className="mt-18 relative w-full bg-gradient-to-b from-gray-900 to-black py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-purple-900/20 to-transparent"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl"></div>
      <div className="absolute top-1/4 left-10 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl"></div>

      {/* Floating particles */}
      <FloatingParticles count={15} />

      {/* Header */}
      <section className="max-w-4xl mx-auto text-center mb-16 relative z-10">
        <div className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6">
          <Sparkles className="w-5 h-5 text-purple-400 mr-2" />
          <span className="text-purple-300 text-sm font-medium">Help Center</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
          How can we help you?
        </h1>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
          Find answers to common questions and learn how to get the most out of Anonify.
        </p>
      </section>

      {/* FAQ Section */}
      <section className="max-w-4xl mx-auto relative z-10 mb-16">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Frequently Asked Questions</h2>

        <div className="space-y-6">
          {faqCategories.map((category) => (
            <div key={category.id} className="bg-gray-800/30 backdrop-blur-md rounded-2xl p-6 border border-gray-700">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                <MessageCircle className="w-5 h-5 mr-2 text-purple-400" />
                {category.title}
              </h3>

              <Accordion type="single" collapsible className="w-full">
                {category.questions.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${category.id}-${index}`} className="border-b border-gray-700 last:border-b-0">
                    <AccordionTrigger className="text-left text-white hover:text-purple-300 py-4 font-medium">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-300 pb-4">{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>
      </section>

      <div className="w-full py-8 md:py-12">
        <Separator className="h-0.5 w-3/4 mx-auto bg-gradient-to-r from-transparent via-purple-500/60 to-transparent" />
      </div>

      {/* Contact Support */}
      <section className="max-w-4xl mx-auto text-center mb-16 relative z-10">
        <div className="bg-gradient-to-br from-purple-900/30 to-violet-900/20 rounded-2xl p-8 border border-purple-700/30">
          <Mail className="w-12 h-12 text-purple-400 mx-auto mb-4" />
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Still need help?</h2>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Our support team is here to help you with any questions or issues you might have.
          </p>
          <Link
            href="/contact-support"
            className="inline-flex items-center justify-center group relative h-12 px-6 rounded-full bg-gradient-to-r from-purple-600 to-violet-500 text-white overflow-hidden transition-all duration-300 hover:from-purple-700 hover:to-violet-600 hover:shadow-lg hover:shadow-purple-500/30"
          >
            <span className="relative z-10 font-semibold">Contact Support</span>
            <ArrowRight className="ml-2 h-5 w-5 transition-all duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      <div className="w-full py-8 md:py-12">
        <Separator className="h-0.5 w-3/4 mx-auto bg-gradient-to-r from-transparent via-purple-500/60 to-transparent" />
      </div>

      {/* Additional Resources */}
      <section className="max-w-4xl mx-auto text-center relative z-10">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">Explore More Resources</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/blog" className="group bg-gray-800/50 backdrop-blur-md rounded-2xl p-6 border border-gray-700 hover:border-purple-500 transition-all duration-300 hover:scale-105">
            <div className="bg-purple-500/10 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-500/20 transition-colors">
              <Sparkles className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-white font-semibold mb-2">Blog & Updates</h3>
            <p className="text-gray-400 text-sm">Latest news, tips, and feature announcements</p>
          </Link>

          <Link href="/community" className="group bg-gray-800/50 backdrop-blur-md rounded-2xl p-6 border border-gray-700 hover:border-purple-500 transition-all duration-300 hover:scale-105">
            <div className="bg-purple-500/10 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-500/20 transition-colors">
              <MessageCircle className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-white font-semibold mb-2">Community Forum</h3>
            <p className="text-gray-400 text-sm">Connect with other Anonify users</p>
          </Link>

          <Link href="/video-tutorials" className="group bg-gray-800/50 backdrop-blur-md rounded-2xl p-6 border border-gray-700 hover:border-purple-500 transition-all duration-300 hover:scale-105">
            <div className="bg-purple-500/10 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-500/20 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-purple-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="23 7 16 12 23 17 23 7"></polygon>
                <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
              </svg>
            </div>
            <h3 className="text-white font-semibold mb-2">Video Tutorials</h3>
            <p className="text-gray-400 text-sm">Watch guides to master Anonify</p>
          </Link>
        </div>
      </section>

      <div className="w-full py-8 md:py-12">
        <Separator className="h-0.5 w-3/4 mx-auto bg-gradient-to-r from-transparent via-purple-500/60 to-transparent" />
      </div>

      {/* Global Animations */}
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
    </main>
  );
}
