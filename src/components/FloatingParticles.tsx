'use client';

import { useEffect, useState } from 'react';

interface ParticleProps {
    count?: number;
    className?: string;
}

export default function FloatingParticles({ count = 15, className = '' }: ParticleProps) {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        // Return empty container during SSR to maintain layout
        return <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`} />;
    }

    return (
        <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
            {[...Array(count)].map((_, i) => {
                const width = Math.random() * 20 + 5;
                const height = Math.random() * 20 + 5;
                const top = Math.random() * 100;
                const left = Math.random() * 100;
                const floatType = Math.ceil(Math.random() * 3);
                const duration = 15 + Math.random() * 15;
                const delay = Math.random() * 5;

                return (
                    <div
                        key={i}
                        className="absolute rounded-full bg-gradient-to-br from-purple-500/20 to-violet-400/20"
                        style={{
                            width: `${width}px`,
                            height: `${height}px`,
                            top: `${top}%`,
                            left: `${left}%`,
                            animation: `float${floatType} ${duration}s infinite ease-in-out ${delay}s`,
                        }}
                    />
                );
            })}
        </div>
    );
}