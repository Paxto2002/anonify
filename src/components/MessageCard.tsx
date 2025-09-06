// src/components/MessageCard.tsx
"use client";

import React, { useState } from "react";
import axios, { AxiosError } from "axios";
import dayjs from "dayjs";
import { X, Sparkles } from "lucide-react";
import { Message } from "@/model/User.model";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ApiResponse } from "@/types/ApiResponse";

type MessageCardProps = {
    message: Message;
    onMessageDelete: (messageId: string) => void;
    onGetSuggestions?: () => Promise<string[]>; // ✅ optional for AI
};

export function MessageCard({
    message,
    onMessageDelete,
    onGetSuggestions,
}: MessageCardProps) {
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);

    const handleDeleteConfirm = async () => {
        try {
            const response = await axios.delete<ApiResponse>(
                `/api/delete-message/${message._id}`
            );

            toast.success(response.data.message, {
                description: "Message deleted successfully ✅",
            });

            onMessageDelete(message._id);
        } catch (error) {
            const axiosError = error as AxiosError<ApiResponse>;
            toast.error("Error deleting message", {
                description:
                    axiosError.response?.data.message ??
                    "Something went wrong. Please try again.",
            });
        }
    };

    const handleSuggestionsClick = async () => {
        if (!onGetSuggestions) return;
        setLoading(true);
        try {
            const result = await onGetSuggestions();
            setSuggestions(result);
            if (result.length > 0) {
                toast.info("AI Suggestions generated!", {
                    description: result.join(" | "),
                });
            }
        } catch {
            toast.error("Could not fetch AI suggestions");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="bg-gray-900 border border-gray-700 text-gray-100 shadow-md hover:shadow-lg transition rounded-2xl">
            <CardHeader>
                <div className="flex justify-between items-start">
                    <CardTitle className="text-lg font-semibold leading-snug">
                        {message.content}
                    </CardTitle>

                    <div className="flex gap-2">
                        {/* AI Suggestion Button */}
                        {onGetSuggestions && (
                            <Button
                                size="icon"
                                variant="secondary"
                                onClick={handleSuggestionsClick}
                                disabled={loading}
                                className="rounded-full hover:scale-105 transition"
                            >
                                <Sparkles className="w-5 h-5 text-purple-400" />
                            </Button>
                        )}

                        {/* Delete Button */}
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button
                                    variant="destructive"
                                    size="icon"
                                    className="rounded-full hover:scale-105 transition"
                                >
                                    <X className="w-5 h-5" />
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>
                                        Are you absolutely sure?
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action cannot be undone. This will permanently
                                        delete this message.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={handleDeleteConfirm}>
                                        Delete
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                </div>

                <div className="text-xs text-gray-400 mt-2">
                    {dayjs(message.createdAt).format("MMM D, YYYY • h:mm A")}
                </div>
            </CardHeader>

            <CardContent>
                {suggestions.length > 0 && (
                    <div className="mt-3 space-y-2">
                        {suggestions.map((s, i) => (
                            <p
                                key={i}
                                className="text-sm bg-gray-800 p-2 rounded-lg border border-gray-700"
                            >
                                {s}
                            </p>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
