"use client";

import Link from "next/link";
import Image from "next/image";
import { X, Mail, Phone, MessageCircle, Sparkles, ArrowUp } from "lucide-react";

export default function Footer() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="bg-gradient-to-b from-gray-900 to-gray-950 text-gray-200 w-full flex flex-col relative overflow-hidden">
            {/* Decorative top border */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#4e5efe] via-[#8a2be2] to-[#4e5efe]"></div>

            <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
                {/* Brand */}
                <div className="flex flex-col items-start space-y-4 md:col-span-1">
                    <div className="flex items-center mb-2">
                        <div className="relative">
                            <div className="absolute -inset-1 bg-gradient-to-r from-[#4e5efe] to-[#8a2be2] rounded-lg blur opacity-30"></div>
                            <div className="relative">
                                <Image
                                    src="/Annonify_Logo.png"
                                    alt="Anonify Logo"
                                    width={100}
                                    height={40}
                                    className="transition-transform duration-300 hover:scale-105"
                                />
                            </div>
                        </div>
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed">
                        Anonify is the premier platform for anonymous feedback and social messaging with AI-assisted replies. Connect freely and securely.
                    </p>
                    <div className="flex space-x-4 mt-2">
                        <Link
                            href="https://x.com/Paxto2002"
                            target="_blank"
                            className="p-2 bg-gray-800 rounded-lg transition-all duration-300 hover:bg-[#4e5efe] hover:scale-110 group"
                            aria-label="Twitter"
                        >
                            <X size={18} className="group-hover:text-white" />
                        </Link>
                        <Link
                            href="https://www.linkedin.com/in/hafiz-waseem-ahmed-50a4b2347/"
                            target="_blank"
                            className="p-2 bg-gray-800 rounded-lg transition-all duration-300 hover:bg-[#4e5efe] hover:scale-110 group"
                            aria-label="LinkedIn"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" className="group-hover:text-white fill-current text-gray-200">
                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                            </svg>
                        </Link>
                        <Link
                            href="https://github.com/Paxto2002"
                            target="_blank"
                            className="p-2 bg-gray-800 rounded-lg transition-all duration-300 hover:bg-[#4e5efe] hover:scale-110 group"
                            aria-label="GitHub"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" className="group-hover:text-white fill-current text-gray-200">
                                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                            </svg>
                        </Link>
                    </div>
                </div>

                {/* Quick Links */}
                <div className="md:col-span-1">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                        <Sparkles size={20} className="mr-2 text-[#8a2be2]" />
                        Quick Links
                    </h3>
                    <ul className="space-y-3">
                        {[
                            { name: "Home", href: "/", icon: <Sparkles size={16} className="mr-2" /> },
                            { name: "About Us", href: "/about", icon: <MessageCircle size={16} className="mr-2" /> },
                            { name: "Pricing", href: "/pricing", icon: <Sparkles size={16} className="mr-2" /> },
                            { name: "Contact", href: "/contact", icon: <MessageCircle size={16} className="mr-2" /> },
                        ].map((link) => (
                            <li key={link.name}>
                                <Link
                                    href={link.href}
                                    className="flex items-center transition-all duration-300 hover:text-white hover:translate-x-1 text-gray-400 group/link"
                                >
                                    {link.icon}
                                    <span className="group-hover/link:text-transparent group-hover/link:bg-clip-text group-hover/link:bg-gradient-to-r group-hover/link:from-[#4e5efe] group-hover/link:to-[#8a2be2]">
                                        {link.name}
                                    </span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Resources */}
                <div className="md:col-span-1">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                        <MessageCircle size={20} className="mr-2 text-[#4e5efe]" />
                        Resources
                    </h3>
                    <ul className="space-y-3">
                        {[
                            { name: "Documentation", href: "/docs" },
                            { name: "API Reference", href: "/api" },
                            { name: "Community", href: "/community" },
                            { name: "Help Center", href: "/help" },
                        ].map((link) => (
                            <li key={link.name}>
                                <Link
                                    href={link.href}
                                    className="transition-all duration-300 hover:text-white hover:translate-x-1 text-gray-400 group/link"
                                >
                                    <span className="group-hover/link:text-transparent group-hover/link:bg-clip-text group-hover/link:bg-gradient-to-r group-hover/link:from-[#4e5efe] group-hover/link:to-[#8a2be2]">
                                        {link.name}
                                    </span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Contact */}
                <div className="md:col-span-1">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                        <MessageCircle size={20} className="mr-2 text-[#8a2be2]" />
                        Contact
                    </h3>
                    <div className="space-y-3">
                        <div className="flex items-center group">
                            <Mail size={16} className="mr-3 text-[#4e5efe] group-hover:text-[#8a2be2] transition-colors" />
                            <a
                                href="mailto:hafizwaseemahmed2002@gmail.com"
                                className="transition-all duration-300 hover:text-white text-gray-400"
                            >
                                hafizwaseemahmed2002@gmail.com
                            </a>
                        </div>
                        <div className="flex items-center group">
                            <Phone size={16} className="mr-3 text-[#4e5efe] group-hover:text-[#8a2be2] transition-colors" />
                            <a
                                href="tel:+923412011877"
                                className="transition-all duration-300 hover:text-white text-gray-400"
                            >
                                +92-3412011877
                            </a>
                        </div>
                    </div>

                    <div className="mt-6 p-4 bg-gray-800/30 rounded-lg border border-gray-700/50">
                        <p className="text-sm text-gray-400 italic">
                            &quote;Privacy isn&apost;t an option, and it shouldn&apos;t be the price we accept for just getting on the internet.&quote;
                        </p>
                    </div>
                </div>
            </div>

            {/* Bottom */}
            <div className="border-t border-gray-800/50 mt-4 py-6 text-center relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-gray-500 text-sm">
                        &copy; {new Date().getFullYear()} Anonify. All rights reserved.
                    </p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <Link href="/privacy" className="text-gray-500 hover:text-white transition-colors text-sm">
                            Privacy Policy
                        </Link>
                        <Link href="/terms" className="text-gray-500 hover:text-white transition-colors text-sm">
                            Terms of Service
                        </Link>
                        <Link href="/cookies" className="text-gray-500 hover:text-white transition-colors text-sm">
                            Cookie Policy
                        </Link>
                    </div>
                </div>

                {/* Scroll to top button */}
                <button
                    onClick={scrollToTop}
                    className="absolute right-6 bottom-6 p-3 bg-gradient-to-r from-[#4e5efe] to-[#8a2be2] rounded-full shadow-lg hover:from-[#8a2be2] hover:to-[#4e5efe] transition-all duration-300 hover:scale-110 group"
                    aria-label="Scroll to top"
                >
                    <ArrowUp size={20} className="group-hover:-translate-y-0.5 transition-transform" />
                </button>
            </div>
        </footer>
    );
}  