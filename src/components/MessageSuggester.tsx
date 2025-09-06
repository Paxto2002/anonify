// src/components/MessageSuggester.tsx
"use client";

import { useState } from "react";

interface Props {
    message: string;
}

export default function MessageSuggester({ message }: Props) {
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);

    const generateSuggestions = async () => {
        setLoading(true);
        setSuggestions([]);

        try {
            const res = await fetch("/api/suggest-messages", {
                method: "POST",
                body: JSON.stringify({ message }),
            });

            if (!res.body) throw new Error("No response body");

            const reader = res.body.getReader();
            const decoder = new TextDecoder();
            let buffer = "";

            while (true) {
                const { value, done } = await reader.read();
                if (done) break;

                // Decode incoming chunk
                buffer += decoder.decode(value, { stream: true });

                // Split by newline and update suggestions incrementally
                const lines = buffer.split("\n");
                buffer = lines.pop() || ""; // Keep incomplete line in buffer

                setSuggestions((prev) => {
                    const newLines = lines.filter(Boolean);
                    // Append only new lines without duplicates
                    return [...prev, ...newLines].slice(0, 3);
                });
            }

            // Add remaining buffer if any
            if (buffer.trim()) {
                setSuggestions((prev) => [...prev, buffer.trim()].slice(0, 3));
            }
        } catch (err) {
            console.error("Failed to generate suggestions:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mt-4">
            <button
                onClick={generateSuggestions}
                disabled={loading}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
                {loading ? "Generating..." : "Suggest Reply"}
            </button>

            <div className="mt-3 space-y-2">
                {suggestions.map((s, i) => (
                    <div
                        key={i}
                        className="p-3 border rounded shadow hover:bg-gray-100 transition"
                    >
                        {s}
                    </div>
                ))}
            </div>
        </div>
    );
}
