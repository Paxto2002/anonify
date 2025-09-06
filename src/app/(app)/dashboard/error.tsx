// src/app/(app)/dashboard/error.tsx
'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error('Dashboard Error:', error);
    }, [error]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-black">
            <div className="text-center max-w-md mx-4">
                <h2 className="text-2xl font-bold text-white mb-4">Something went wrong!</h2>
                <p className="text-gray-400 mb-6">
                    {error.message || 'An unexpected error occurred on the dashboard.'}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                        onClick={reset}
                        className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700"
                    >
                        Try again
                    </Button>
                    <Button
                        onClick={() => window.location.href = '/'}
                        variant="outline"
                        className="border-gray-600 text-gray-300 hover:bg-gray-800"
                    >
                        Go to Home
                    </Button>
                </div>
            </div>
        </div>
    );
}