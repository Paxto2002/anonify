'use client';

import { MessageCard } from '@/components/MessageCard';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Message } from '@/model/User.model';
import { ApiResponse } from '@/types/ApiResponse';
import { zodResolver } from '@hookform/resolvers/zod';
import axios, { AxiosError } from 'axios';
import { Loader2, RefreshCcw, Copy, User, MessageSquare, Shield } from 'lucide-react';
import { useSession } from 'next-auth/react';
import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AcceptMessageSchema } from '@/schemas/acceptMessageSchema';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

function UserDashboard() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isSwitchLoading, setIsSwitchLoading] = useState(false);
    const { data: session, status } = useSession();
    const router = useRouter();

    const form = useForm({
        resolver: zodResolver(AcceptMessageSchema),
        defaultValues: {
            acceptMessage: false,
        },
    });

    const { register, watch, setValue } = form;
    const acceptMessage = watch('acceptMessage');

    // --- define functions first ---
    const fetchAcceptMessages = useCallback(async () => {
        setIsSwitchLoading(true);
        try {
            const response = await axios.get<ApiResponse>('/api/accept-messages');
            setValue('acceptMessage', response.data.isAcceptingMessages ?? false);
        } catch (error) {
            const axiosError = error as AxiosError<ApiResponse>;
            toast.error(
                axiosError.response?.data.message ?? 'Failed to fetch message settings'
            );
        } finally {
            setIsSwitchLoading(false);
        }
    }, [setValue]);

    const fetchMessages = useCallback(
        async (refresh: boolean = false) => {
            setIsLoading(true);
            try {
                const response = await axios.get<ApiResponse>('/api/get-messages');
                setMessages(response.data.messages || []);
                if (refresh) {
                    toast.success('Refreshed Messages', {
                        description: 'Showing latest messages',
                    });
                }
            } catch (error) {
                const axiosError = error as AxiosError<ApiResponse>;
                toast.error(
                    axiosError.response?.data.message ?? 'Failed to fetch messages'
                );
            } finally {
                setIsLoading(false);
            }
        },
        [setMessages]
    );

    // --- redirect if no session ---
    useEffect(() => {
        if (status === 'loading') return;
        if (!session) {
            router.push('/sign-in');
        }
    }, [session, status, router]);

    // --- fetch data when session exists ---
    useEffect(() => {
        if (session && session.user) {
            fetchMessages();
            fetchAcceptMessages();
        }
    }, [session, fetchMessages, fetchAcceptMessages]);

    // delete handler
    const handleDeleteMessage = (messageId: string) => {
        setMessages(messages.filter((message) => message._id !== messageId));
    };

    // toggle switch handler
    const handleSwitchChange = async () => {
        try {
            const response = await axios.post<ApiResponse>('/api/accept-messages', {
                acceptMessages: !acceptMessage,
            });
            setValue('acceptMessage', !acceptMessage);
            toast.success(response.data.message);
        } catch (error) {
            const axiosError = error as AxiosError<ApiResponse>;
            toast.error(
                axiosError.response?.data.message ?? 'Failed to update message settings'
            );
        }
    };

    if (status === 'loading') {
        return (
            <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-purple-500" />
            </div>
        );
    }

    if (!session || !session.user) {
        return null;
    }

    const { username } = session.user;
    const baseUrl = `${window.location.protocol}//${window.location.host}`;
    const profileUrl = `${baseUrl}/u/${username}`;

    const copyToClipboard = () => {
        navigator.clipboard.writeText(profileUrl);
        toast.success('URL Copied!', {
            description: 'Profile URL has been copied to clipboard.',
        });
    };

    return (
        <div className="relative min-h-screen bg-gradient-to-b from-gray-900 to-black py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
            {/* background blur elements */}
            <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-purple-900/20 to-transparent"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl"></div>
            <div className="absolute top-1/4 left-10 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl"></div>

            <div className="relative z-10 max-w-6xl mx-auto bg-gray-800/50 backdrop-blur-md rounded-2xl border border-gray-700 p-8">
                {/* header */}
                <div className="text-center mb-8">
                    <div className="flex justify-center mb-4">
                        <div className="p-3 bg-gradient-to-r from-purple-600 to-violet-600 rounded-2xl">
                            <User className="w-8 h-8 text-white" />
                        </div>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                        User Dashboard
                    </h1>
                    <p className="text-gray-400">Manage your anonymous messages</p>
                </div>

                {/* profile url */}
                <div className="mb-8 p-6 bg-gray-700/30 rounded-xl border border-gray-600">
                    <div className="flex items-center gap-3 mb-4">
                        <MessageSquare className="w-6 h-6 text-purple-400" />
                        <h2 className="text-lg font-semibold text-white">Your Unique Link</h2>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 items-center">
                        <input
                            type="text"
                            value={profileUrl}
                            disabled
                            className="flex-1 bg-gray-600/50 border border-gray-500 text-white rounded-lg px-4 py-2"
                        />
                        <Button
                            onClick={copyToClipboard}
                            className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700"
                        >
                            <Copy className="w-4 h-4 mr-2" />
                            Copy
                        </Button>
                    </div>
                </div>

                {/* message settings */}
                <div className="mb-8 p-6 bg-gray-700/30 rounded-xl border border-gray-600">
                    <div className="flex items-center gap-3 mb-4">
                        <Shield className="w-6 h-6 text-blue-400" />
                        <h2 className="text-lg font-semibold text-white">Message Settings</h2>
                    </div>
                    <div className="flex items-center gap-3">
                        <Switch
                            {...register('acceptMessage')}
                            checked={acceptMessage}
                            onCheckedChange={handleSwitchChange}
                            disabled={isSwitchLoading}
                        />
                        <span className="text-gray-300">
                            Accept Messages: {acceptMessage ? 'On' : 'Off'}
                        </span>
                        {isSwitchLoading && (
                            <Loader2 className="w-4 h-4 animate-spin text-gray-400" />
                        )}
                    </div>
                </div>

                <Separator className="bg-gray-600 my-8" />

                {/* messages */}
                <div className="mb-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold text-white">Your Messages</h2>
                        <Button
                            onClick={() => fetchMessages(true)}
                            variant="outline"
                            className="bg-gray-700/50 border-gray-600 text-gray-300 hover:bg-gray-600/50"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                                <RefreshCcw className="h-4 w-4" />
                            )}
                            <span className="ml-2">Refresh</span>
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                        {messages.length > 0 ? (
                            messages.map((message) => (
                                <MessageCard
                                    key={message._id}
                                    message={message}
                                    onMessageDelete={handleDeleteMessage}
                                />
                            ))
                        ) : (
                            <div className="col-span-full text-center py-12">
                                <MessageSquare className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                                <p className="text-gray-400">No messages to display yet.</p>
                                <p className="text-gray-500 text-sm mt-2">
                                    Share your link to start receiving anonymous messages!
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserDashboard;