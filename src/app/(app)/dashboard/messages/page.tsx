'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Loader2, RefreshCcw, MessageCircle, Calendar, ToggleLeft, ToggleRight } from 'lucide-react';
import axios, { AxiosError } from 'axios';
import { MessageCard } from '@/components/MessageCard';
import { Toaster, toast } from 'sonner';
import { ApiResponse } from '@/types/ApiResponse';
import { Message } from '@/model/User.model';

export default function MessagesPage() {
    const { data: session, status } = useSession();
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [filter, setFilter] = useState<'all' | 'recent'>('all');
    const [accepting, setAccepting] = useState(true); // message acceptance state

    // 📩 Fetch messages
    const fetchMessages = useCallback(async (refresh = false) => {
        setIsLoading(true);
        try {
            const response = await axios.get<ApiResponse>('/api/get-messages');
            const allMessages = response.data.messages || [];

            let filteredMessages = allMessages;
            if (filter === 'recent') {
                const sevenDaysAgo = new Date();
                sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
                filteredMessages = allMessages.filter(
                    (msg) => new Date(msg.createdAt) >= sevenDaysAgo
                );
            }

            setMessages(filteredMessages);
            if (refresh) toast.success('Messages refreshed successfully');
        } catch (error) {
            const axiosError = error as AxiosError<ApiResponse>;
            toast.error(axiosError.response?.data.message || 'Failed to fetch messages');
        } finally {
            setIsLoading(false);
        }
    }, [filter]);

    // 🗑️ Delete message
    const handleDeleteMessage = async (messageId: string) => {
        try {
            await axios.delete(`/api/delete-message/${messageId}`);
            setMessages((prev) => prev.filter((msg) => msg._id !== messageId));
            toast.success('Message deleted successfully');
        } catch (error) {
            const axiosError = error as AxiosError<ApiResponse>;
            toast.error(axiosError.response?.data.message || 'Failed to delete message');
        }
    };

    // ✨ Get AI suggestions
    const handleGetSuggestions = async (messageId: string) => {
        try {
            const res = await axios.post<ApiResponse>('/api/suggest-messages', { messageId });
            const suggestions = res.data.suggestions || [];
            return suggestions;
        } catch {
            toast.error('Failed to get suggestions');
            return [];
        }
    };

    // 🔘 Toggle accepting messages
    const handleToggleAccepting = async () => {
        try {
            const res = await axios.post<ApiResponse>('/api/accept-messages', {
                accepting: !accepting,
            });
            if (typeof res.data.accepting === "boolean") {
                setAccepting(res.data.accepting);
            }
            toast.success(
                `Now ${res.data.accepting ? 'accepting' : 'not accepting'} new messages`
            );
        } catch {
            toast.error('Failed to update settings');
        }
    };


    useEffect(() => {
        if (status === 'authenticated' && session?.user) {
            fetchMessages();
        }
    }, [status, session, fetchMessages]);

    if (status === 'loading') {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-black">
                <Loader2 className="w-8 h-8 animate-spin text-white" />
            </div>
        );
    }

    if (!session?.user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-black">
                <div className="text-center text-white">
                    <p>Please sign in to view your messages</p>
                </div>
            </div>
        );
    }

    const totalMessages = messages.length;
    const unreadMessages = messages.filter((msg) => !msg.isRead).length;

    return (
        <>
            <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="flex justify-center mb-4">
                            <div className="p-3 bg-gradient-to-r from-purple-600 to-violet-600 rounded-2xl">
                                <MessageCircle className="w-8 h-8 text-white" />
                            </div>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                            Your Messages
                        </h1>
                        <p className="text-gray-400">Manage and view all your anonymous messages</p>
                    </div>

                    {/* Stats + Controls */}
                    <div className="bg-gray-800/50 backdrop-blur-md rounded-2xl border border-gray-700 p-6 mb-8">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                            <div className="text-center p-4 bg-gray-700/30 rounded-xl">
                                <div className="text-2xl font-bold text-white">{totalMessages}</div>
                                <div className="text-gray-400 text-sm">Total Messages</div>
                            </div>
                            <div className="text-center p-4 bg-gray-700/30 rounded-xl">
                                <div className="text-2xl font-bold text-purple-400">{unreadMessages}</div>
                                <div className="text-gray-400 text-sm">Unread Messages</div>
                            </div>
                            <div className="text-center p-4 bg-gray-700/30 rounded-xl">
                                <div className="text-2xl font-bold text-green-400">
                                    {totalMessages > 0
                                        ? Math.round(((totalMessages - unreadMessages) / totalMessages) * 100)
                                        : 0}
                                    %
                                </div>
                                <div className="text-gray-400 text-sm">Read Rate</div>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
                            <div className="flex gap-2">
                                <Button
                                    variant={filter === 'all' ? 'default' : 'outline'}
                                    onClick={() => setFilter('all')}
                                    className="bg-gray-700/50 border-gray-600 text-white hover:bg-gray-600/50"
                                >
                                    All Messages
                                </Button>
                                <Button
                                    variant={filter === 'recent' ? 'default' : 'outline'}
                                    onClick={() => setFilter('recent')}
                                    className="bg-gray-700/50 border-gray-600 text-white hover:bg-gray-600/50"
                                >
                                    <Calendar className="w-4 h-4 mr-2" />
                                    Last 7 Days
                                </Button>
                            </div>
                            <div className="flex gap-3">
                                <Button
                                    onClick={() => fetchMessages(true)}
                                    disabled={isLoading}
                                    className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700"
                                >
                                    {isLoading ? (
                                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                                    ) : (
                                        <RefreshCcw className="h-4 w-4 mr-2" />
                                    )}
                                    Refresh
                                </Button>
                                <Button
                                    onClick={handleToggleAccepting}
                                    className="bg-gray-700/50 border-gray-600 text-white hover:bg-gray-600/50"
                                >
                                    {accepting ? (
                                        <>
                                            <ToggleRight className="h-4 w-4 mr-2 text-green-400" />
                                            Accepting
                                        </>
                                    ) : (
                                        <>
                                            <ToggleLeft className="h-4 w-4 mr-2 text-red-400" />
                                            Not Accepting
                                        </>
                                    )}
                                </Button>
                            </div>
                        </div>
                    </div>

                    <Separator className="bg-gray-600 my-6" />

                    {/* Messages Grid */}
                    <div className="bg-gray-800/50 backdrop-blur-md rounded-2xl border border-gray-700 p-6">
                        <h2 className="text-xl font-semibold text-white mb-6">
                            {filter === 'recent' ? 'Recent Messages' : 'All Messages'}
                        </h2>

                        {isLoading ? (
                            <div className="flex justify-center py-12">
                                <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
                            </div>
                        ) : messages.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {messages.map((message) => (
                                    <MessageCard
                                        key={message._id}
                                        message={message}
                                        onMessageDelete={handleDeleteMessage}
                                        onGetSuggestions={() => handleGetSuggestions(message._id)}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <MessageCircle className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                                <p className="text-gray-400 text-lg mb-2">
                                    {filter === 'recent'
                                        ? 'No messages in the last 7 days'
                                        : 'No messages yet'}
                                </p>
                                <p className="text-gray-500 text-sm">
                                    Share your profile link to start receiving anonymous messages!
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <Toaster richColors closeButton />
        </>
    );
}
