// src/app/(app)/dashboard/loading.tsx
import { Loader2 } from 'lucide-react';

export default function Loading() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-black">
            <div className="text-center">
                <Loader2 className="w-12 h-12 animate-spin text-purple-500 mx-auto mb-4" />
                <p className="text-gray-400">Loading your dashboard...</p>
            </div>
        </div>
    );
}