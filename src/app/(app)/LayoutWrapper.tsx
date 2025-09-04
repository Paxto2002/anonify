"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Navbar />
            <main className="flex-1 bg-gradient-to-b from-gray-900 to-gray-950">
                {children}
            </main>
            <Footer />
        </>
    );
}