// src/app/dashboard/page.tsx
'use client';
import { useState, useEffect, useCallback } from 'react';
import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import axios, { AxiosError } from 'axios';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Loader2, RefreshCcw, Copy, User, MessageCircle, Shield } from 'lucide-react';
import { MessageCard } from '@/components/MessageCard';
import FloatingParticles from '@/components/FloatingParticles';
import { Toaster, toast } from 'sonner';
import { Message } from '@/model/User.model';
import { Separator } from "@/components/ui/separator";

// Define the API response types
interface AcceptMessagesResponse {
  success: boolean;
  accepting: boolean;
  message?: string;
}

interface GetMessagesResponse {
  success: boolean;
  messages?: Message[];
  message?: string;
}

export default function UserDashboard() {
    const router = useRouter();
    const { data: session, status, update } = useSession();

    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isSwitchLoading, setIsSwitchLoading] = useState(false);
    const [accepting, setAccepting] = useState<boolean | null>(null);
    const [username, setUsername] = useState(session?.user?.username || '');

    useEffect(() => {
        if (session?.user) setUsername(session.user.username ?? '');
        else setUsername('');
    }, [session?.user]);

    const fetchMessages = useCallback(async (refresh = false) => {
        setIsLoading(true);
        try {
            const { data } = await axios.get<GetMessagesResponse>('/api/get-messages');
            if (!data.success) return toast.error(data.message || 'Failed to fetch messages');

            const allMessages = (data.messages || []).map(msg => ({
                ...msg,
                createdAt: new Date(msg.createdAt).toISOString(),
                updatedAt: new Date(msg.updatedAt ?? msg.createdAt).toISOString(),
            }));

            setMessages(allMessages);
            if (refresh) toast.success('Messages refreshed successfully');
        } catch (err) {
            console.error(err);
            toast.error('Failed to fetch messages');
        } finally {
            setIsLoading(false);
        }
    }, []);

    const fetchAcceptingStatus = useCallback(async () => {
        setIsSwitchLoading(true);
        try {
            const response = await axios.get<AcceptMessagesResponse>('/api/accept-messages');
            if (response.data.success) {
                setAccepting(response.data.accepting);
            } else {
                toast.error('Failed to fetch acceptance status');
                setAccepting(true); // Default to true if there's an error
            }
        } catch (error) {
            console.error('Error fetching acceptance status:', error);
            toast.error('Failed to fetch acceptance status');
            setAccepting(true); // Default to true if there's an error
        } finally {
            setIsSwitchLoading(false);
        }
    }, []);

    const handleToggleAccepting = async () => {
        if (accepting === null) return;
        setIsSwitchLoading(true);
        try {
            const response = await axios.post<AcceptMessagesResponse>('/api/accept-messages', {
                acceptMessages: !accepting
            });

            if (response.data.success) {
                setAccepting(response.data.accepting);
                toast.success(response.data.message || `Now ${response.data.accepting ? 'accepting' : 'not accepting'} new messages`);
            } else {
                toast.error(response.data.message || 'Failed to update settings');
            }
        } catch (error) {
            console.error('Error toggling acceptance:', error);
            
            // Proper error handling without using 'any'
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError<{ message?: string }>;
                toast.error(axiosError.response?.data?.message || 'Failed to update settings');
            } else {
                toast.error('Failed to update settings');
            }
        } finally {
            setIsSwitchLoading(false);
        }
    };

    const handleDeleteMessage = (messageId: string) => {
        setMessages(prev => prev.filter(msg => msg._id !== messageId));
    };

    useEffect(() => {
        if (status !== 'authenticated' || !session?.user) return;
        if (!session.user.isVerified) router.push(`/verify/${session.user.username}`);
        fetchMessages();
        fetchAcceptingStatus();
    }, [session, status, router, fetchMessages, fetchAcceptingStatus]);

    if (status === 'loading') {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-white" />
            </div>
        );
    }

    if (!session?.user) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center text-white">
                <p>You are not signed in.</p>
                <Button onClick={() => signIn()}>Sign In</Button>
            </div>
        );
    }

    const profileUrl = `${window.location.protocol}//${window.location.host}/u/${username}`;
    const totalMessages = messages.length;
    const unreadMessages = messages.filter(msg => !msg.isRead).length;

    return (
        <>
            <div className="relative min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900 to-black overflow-hidden">
                <FloatingParticles count={20} />
                <div className="relative z-10 max-w-6xl mx-auto bg-gray-800/50 backdrop-blur-md rounded-2xl border border-gray-700 p-8">

                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="flex justify-center mb-4">
                            <div className="p-3 bg-gradient-to-r from-purple-600 to-violet-600 rounded-2xl">
                                <User className="w-8 h-8 text-white" />
                            </div>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">User Dashboard</h1>
                        <p className="text-gray-400">Manage your anonymous messages</p>
                    </div>

                    {/* Profile URL */}
                    <div className="mb-8 p-6 bg-gray-700/30 backdrop-blur-sm rounded-xl border border-gray-600 flex flex-col sm:flex-row gap-3 items-center">
                        <input
                            type="text"
                            value={profileUrl}
                            disabled
                            className="flex-1 bg-gray-600/50 border border-gray-500 text-white rounded-lg px-4 py-2"
                        />
                        <Button onClick={() => { navigator.clipboard.writeText(profileUrl); toast.success('Profile URL copied'); }}>
                            <Copy className="w-4 h-4 mr-2" /> Copy
                        </Button>
                    </div>

                    <div className="w-full py-8 md:py-12">
                        <Separator className="h-0.5 w-3/4 mx-auto bg-gradient-to-r from-transparent via-purple-500/60 to-transparent" />
                    </div>

                    {/* Stats + Accepting */}
                    <div className="mb-8 p-6 bg-gray-700/30 rounded-xl border border-gray-600 flex flex-col md:flex-row justify-between gap-6 items-center">
                        <div className="flex items-center gap-3">
                            <Shield className="w-6 h-6 text-blue-400" />
                            <span className="text-gray-300">Accept Messages:</span>
                            {accepting !== null ? (
                                <Switch 
                                    checked={accepting} 
                                    onCheckedChange={handleToggleAccepting} 
                                    disabled={isSwitchLoading} 
                                />
                            ) : (
                                <Loader2 className="w-4 h-4 animate-spin text-gray-400" />
                            )}
                        </div>

                        <div className="flex gap-4 mt-4 md:mt-0">
                            <div className="text-center p-4 bg-gray-700/30 rounded-xl">
                                <div className="text-2xl font-bold text-white">{totalMessages}</div>
                                <div className="text-gray-400 text-sm">Total Messages</div>
                            </div>
                            <div className="text-center p-4 bg-gray-700/30 rounded-xl">
                                <div className="text-2xl font-bold text-purple-400">{unreadMessages}</div>
                                <div className="text-gray-400 text-sm">Unread</div>
                            </div>
                            <div className="text-center p-4 bg-gray-700/30 rounded-xl">
                                <div className="text-2xl font-bold text-green-400">
                                    {totalMessages ? Math.round(((totalMessages - unreadMessages) / totalMessages) * 100) : 0}%
                                </div>
                                <div className="text-gray-400 text-sm">Read Rate</div>
                            </div>
                        </div>
                    </div>

                    {/* Messages */}
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-semibold text-white">Your Messages</h2>
                            <Button onClick={() => fetchMessages(true)} disabled={isLoading}>
                                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCcw className="h-4 w-4" />}
                                <span className="ml-2">Refresh</span>
                            </Button>
                        </div>

                        {messages.length ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {messages.map(msg => (
                                    <MessageCard key={msg._id} message={msg} onMessageDelete={handleDeleteMessage} />
                                ))}
                            </div>
                        ) : (
                            <div className="col-span-full text-center py-12">
                                <MessageCircle className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                                <p className="text-gray-400">No messages yet</p>
                                <p className="text-gray-500 text-sm mt-2">Share your link to start receiving anonymous messages!</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <Toaster richColors closeButton />
        </>
    );
}