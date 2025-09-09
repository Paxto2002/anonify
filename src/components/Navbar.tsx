// src/components/Navbar.tsx
"use client";
import { useState, useEffect } from "react";
import { X, Menu, MessageCircle, Sparkles, User, LogIn, LogOut, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { data: session } = useSession();
    const toggleMenu = () => setIsOpen(!isOpen);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleSignOut = async () => {
        await signOut({ callbackUrl: '/' });
    };

    // Navigation links for unauthenticated users
    const unauthenticatedLinks = [
        { name: "Home", href: "/", icon: <Sparkles size={18} className="mr-1" /> },
        { name: "About Us", href: "/about", icon: <MessageCircle size={18} className="mr-1" /> },
        { name: "Pricing", href: "/pricing", icon: <User size={18} className="mr-1" /> },
        { name: "Sign In", href: "/sign-in", icon: <LogIn size={18} className="mr-1" /> },
        { name: "Sign Up", href: "/sign-up", icon: <LogIn size={18} className="mr-1" /> },
    ];

    // Navigation links for authenticated users
    const authenticatedLinks = [
        { name: "Home", href: "/", icon: <Sparkles size={18} className="mr-1" /> },
        { name: "About Us", href: "/about", icon: <MessageCircle size={18} className="mr-1" /> },
        { name: "Pricing", href: "/pricing", icon: <User size={18} className="mr-1" /> },
        { name: "Dashboard", href: "/dashboard", icon: <LayoutDashboard size={18} className="mr-1" /> },
    ];

    // Use appropriate links based on authentication status
    const navLinks = session ? authenticatedLinks : unauthenticatedLinks;

    return (
        <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? "bg-gray-900/95 backdrop-blur-md py-2 shadow-xl" : "bg-gray-900 py-3"} border-b ${scrolled ? "border-gray-700" : "border-transparent"}`}>
            {/* Gradient bottom border */}
            <div className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#4e5efe] via-[#8a2be2] to-[#4e5efe] transition-opacity duration-500 ${scrolled ? "opacity-100" : "opacity-0"}`}></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    {/* Logo  */}
                    <Link href="/" className="flex items-center group">
                        <div className="relative">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#4e5efe] to-[#8a2be2] rounded blur opacity-30 group-hover:opacity-70 transition duration-300"></div>
                            <div className="relative flex items-center bg-gray-900 rounded-sm">
                                <Image
                                    src="/Annonify_Logo.png"
                                    alt="Anonify Logo"
                                    width={70}
                                    height={21}
                                    className="transition-transform duration-300 group-hover:scale-105"
                                    priority
                                />
                            </div>
                        </div>
                    </Link>

                    {/* Desktop Links */}
                    <div className="hidden md:flex items-center space-x-1 font-medium">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="relative flex items-center px-4 py-2 rounded-lg transition-all duration-300 text-gray-300 hover:text-white group/navlink"
                            >
                                {link.icon}
                                <span className="bg-gradient-to-r from-[#4e5efe] to-[#8a2be2] bg-clip-text text-transparent group-hover/navlink:from-[#8a2be2] group-hover/navlink:to-[#4e5efe] transition-all duration-300">
                                    {link.name}
                                </span>
                                {/* Animated underline */}
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#4e5efe] to-[#8a2be2] transition-all duration-300 group-hover/navlink:w-full"></span>
                            </Link>
                        ))}

                        {/* Sign Out button for authenticated users */}
                        {session && (
                            <button
                                onClick={handleSignOut}
                                className="relative flex items-center px-4 py-2 rounded-lg transition-all duration-300 text-gray-300 hover:text-white group/navlink cursor-pointer"
                            >
                                <LogOut size={18} className="mr-1" />
                                <span className="bg-gradient-to-r from-[#4e5efe] to-[#8a2be2] bg-clip-text text-transparent group-hover/navlink:from-[#8a2be2] group-hover/navlink:to-[#4e5efe] transition-all duration-300">
                                    Sign Out
                                </span>
                                {/* Animated underline */}
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#4e5efe] to-[#8a2be2] transition-all duration-300 group-hover/navlink:w-full"></span>
                            </button>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={toggleMenu}
                            className="focus:outline-none p-2 rounded-md bg-gray-800/50 backdrop-blur-sm border border-gray-700 text-white hover:bg-gray-700 transition-all duration-300 hover:scale-105"
                            aria-label="Toggle menu"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <div className="md:hidden bg-gray-800/95 backdrop-blur-lg rounded-lg mt-3 border border-gray-700 shadow-xl animate-fade-in">
                        <div className="px-2 pt-2 pb-4 space-y-1 flex flex-col">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="relative flex items-center px-4 py-3 rounded-lg transition-all duration-300 text-gray-300 hover:text-white hover:bg-gray-700/50 group/mobilelink"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {link.icon}
                                    <span className="bg-gradient-to-r from-[#4e5efe] to-[#8a2be2] bg-clip-text text-transparent group-hover/mobilelink:from-[#8a2be2] group-hover/mobilelink:to-[#4e5efe]">
                                        {link.name}
                                    </span>
                                    {/* Mobile underline effect */}
                                    <span className="absolute bottom-2 left-4 right-4 h-0.5 bg-gradient-to-r from-[#4e5efe] to-[#8a2be2] scale-x-0 transition-transform duration-300 group-hover/mobilelink:scale-x-100 origin-left"></span>
                                </Link>
                            ))}

                            {/* Sign Out button for authenticated users in mobile */}
                            {session && (
                                <button
                                    onClick={() => {
                                        handleSignOut();
                                        setIsOpen(false);
                                    }}
                                    className="relative flex items-center px-4 py-3 rounded-lg transition-all duration-300 text-gray-300 hover:text-white hover:bg-gray-700/50 group/mobilelink cursor-pointer w-full text-left"
                                >
                                    <LogOut size={18} className="mr-1" />
                                    <span className="bg-gradient-to-r from-[#4e5efe] to-[#8a2be2] bg-clip-text text-transparent group-hover/mobilelink:from-[#8a2be2] group-hover/mobilelink:to-[#4e5efe]">
                                        Sign Out
                                    </span>
                                    {/* Mobile underline effect */}
                                    <span className="absolute bottom-2 left-4 right-4 h-0.5 bg-gradient-to-r from-[#4e5efe] to-[#8a2be2] scale-x-0 transition-transform duration-300 group-hover/mobilelink:scale-x-100 origin-left"></span>
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}