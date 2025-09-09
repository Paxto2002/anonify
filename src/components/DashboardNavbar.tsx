'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { User, Settings, LogOut, Home, Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function DashboardNavbar() {
    const { data: session } = useSession();
    const pathname = usePathname();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [displayName, setDisplayName] = useState('');

    // Keep displayName in sync with session
    useEffect(() => {
        if (session?.user) {
            setDisplayName(session.user.name ?? session.user.username ?? '');
        } else {
            setDisplayName('');
        }
    }, [session?.user]);

    const navigation = [
        { name: 'Dashboard', href: '/dashboard', icon: Home, current: pathname === '/dashboard' },
        { name: 'Profile', href: '/dashboard/profile', icon: User, current: pathname === '/dashboard/profile' },
        { name: 'Settings', href: '/dashboard/settings', icon: Settings, current: pathname === '/dashboard/settings' },
    ];

    return (
        <nav className="bg-gray-800/60 backdrop-blur-md border-b border-gray-700 py-5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link href="/dashboard" className="flex items-center group">
                            <div className="relative">
                                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#4e5efe] to-[#8a2be2] rounded blur opacity-30 group-hover:opacity-70 transition duration-300"></div>
                                <div className="relative flex items-center bg-gray-900 rounded-md px-2 py-1.5">
                                    <Image src="/Annonify_Logo.png" alt="Anonify Logo" width={50} height={22} priority />
                                </div>
                            </div>
                        </Link>
                        <div className="hidden md:ml-6 md:flex md:space-x-2">
                            {navigation.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${item.current ? 'bg-gray-700/60 text-white' : 'text-gray-300 hover:bg-gray-700/40 hover:text-white'
                                            }`}
                                    >
                                        <Icon className="h-4 w-4 mr-2" /> {item.name}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>

                    <div className="flex items-center space-x-3">
                        {displayName && <span className="text-gray-300 text-xs hidden md:block">Welcome, {displayName}</span>}
                        {session?.user && (
                            <Button
                                onClick={() => signOut()}
                                variant="outline"
                                className="bg-gray-700/50 border-gray-600 text-gray-300 hover:bg-gray-600/50 hover:text-white py-1 h-8"
                                size="sm"
                            >
                                <LogOut className="h-3 w-3 mr-1" /> Sign Out
                            </Button>
                        )}
                        <button
                            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                        </button>
                    </div>
                </div>

                {mobileMenuOpen && (
                    <div className="md:hidden border-t border-gray-700 bg-gray-900">
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            {navigation.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className={`flex items-center px-3 py-2 rounded-md text-base font-medium transition-all duration-200 ${item.current ? 'bg-gray-700/60 text-white' : 'text-gray-300 hover:bg-gray-700/40 hover:text-white'
                                            }`}
                                    >
                                        <Icon className="h-4 w-4 mr-3" /> {item.name}
                                    </Link>
                                );
                            })}
                            {session?.user && (
                                <Button
                                    onClick={() => signOut()}
                                    variant="outline"
                                    className="w-full bg-gray-700/50 border-gray-600 text-gray-300 hover:bg-gray-600/50 hover:text-white mt-2 py-1.5 cursor-pointer transition-all"
                                    size="sm"
                                >
                                    <LogOut className="h-3 w-3 mr-2" /> Sign Out
                                </Button>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}
