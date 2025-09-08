// src/components/MessageSuggester.tsx
"use client";

import { useState, useEffect } from "react";

interface Props {
    message: string;
    onSuggestionSelect: (suggestion: string) => void;
}

export default function MessageSuggester({ message, onSuggestionSelect }: Props) {
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [lastMessage, setLastMessage] = useState("");

    // Reset suggestions when message changes significantly
    useEffect(() => {
        if (message !== lastMessage && suggestions.length > 0) {
            setSuggestions([]);
        }
    }, [message, lastMessage, suggestions.length]);

    const generateSuggestions = async () => {
        if (!message) return;

        setLoading(true);
        setLastMessage(message);

        try {
            // Add cache-busting parameter with timestamp
            const timestamp = Date.now();
            const res = await fetch(`/api/suggest-messages?t=${timestamp}&r=${Math.random()}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Cache-Control": "no-cache, no-store, must-revalidate",
                    "Pragma": "no-cache",
                },
                body: JSON.stringify({ message }),
                cache: 'no-store' // Ensure no caching
            });

            if (!res.ok) {
                throw new Error(`Server error: ${res.status}`);
            }

            const text = await res.text();
            const suggArray = text.split('||')
                .map(s => s.trim())
                .filter(s => s.length > 0)
                .slice(0, 3);

            setSuggestions(suggArray);
        } catch (err) {
            console.error("Failed to generate suggestions:", err);
            // Contextual fallback based on message content
            const keywords = message.split(/\s+/).slice(0, 2).join(' ');
            const fallbacks = [
                `I'm curious to know more about ${keywords}. Could you elaborate?`,
                `Your thoughts on ${keywords} are interesting. What else comes to mind?`,
                `Thanks for mentioning ${keywords}. I'd appreciate more details.`
            ];
            setSuggestions(fallbacks);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-4">
            <button
                onClick={generateSuggestions}
                disabled={loading || !message}
                className="w-full px-4 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg flex items-center justify-center gap-2 font-medium"
            >
                {loading ? (
                    <>
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Generating suggestions...
                    </>
                ) : (
                    <>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                        </svg>
                        {suggestions.length > 0 && message === lastMessage ? 'Get New Suggestions' : 'Get AI Suggestions'}
                    </>
                )}
            </button>

            {suggestions.length > 0 && (
                <div className="bg-gradient-to-br from-gray-800/70 to-gray-900/70 backdrop-blur-sm border border-gray-700 rounded-xl p-4 space-y-3 shadow-lg">
                    <div className="flex items-center gap-2 mb-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-400" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                        <p className="text-sm font-medium text-indigo-200">AI Suggestions</p>
                    </div>
                    <div className="space-y-2">
                        {suggestions.map((suggestion, i) => (
                            <div
                                key={i}
                                onClick={() => onSuggestionSelect(suggestion)}
                                className="p-3 bg-gray-700/40 backdrop-blur-sm rounded-lg cursor-pointer hover:bg-gray-700/70 text-white text-sm transition-all duration-200 border border-gray-600/30 hover:border-indigo-500/30 hover:shadow-md group"
                            >
                                <div className="flex items-start gap-2">
                                    <span className="text-xs bg-indigo-500/20 text-indigo-200 rounded-full px-2 py-1 mt-0.5 flex-shrink-0 group-hover:bg-indigo-500/30 transition-colors">
                                        {i + 1}
                                    </span>
                                    <span>{suggestion}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}