// src/components/SendMessageForm.tsx
"use client";

import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function SendMessageForm({ username }: { username: string }) {
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!content.trim()) return toast.error("Message cannot be empty");

        setLoading(true);
        try {
            const res = await axios.post("/api/send-message", {
                username,
                content,
            });

            if (res.data.success) {
                toast.success("Message sent!");
                setContent("");
            } else {
                toast.error(res.data.message || "Failed to send message");
            }
        } catch {
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSend} className="space-y-4 w-full">
            <Textarea
                placeholder="Write your anonymous message..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="bg-gray-800/50 border-gray-600 text-white"
            />
            <Button type="submit" disabled={loading} className="w-full">
                {loading ? "Sending..." : "Send Message"}
            </Button>
        </form>
    );
}
