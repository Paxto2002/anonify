// src/components/LayoutWrapper.tsx
"use client";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
    return (
        <>
            <main className="flex-1 bg-gradient-to-b from-gray-900 to-gray-950">
                {children}
            </main>
        </>
    );
}