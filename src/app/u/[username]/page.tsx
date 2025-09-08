'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import axios, { AxiosError } from 'axios';
import { Button } from '@/components/ui/button';
import { Form, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Toaster, toast } from 'sonner';
import FloatingParticles from '@/components/FloatingParticles';
import MessageSuggester from '@/components/MessageSuggester';
import { Sparkles, Send, MessageCircle, User } from 'lucide-react';
import Image from 'next/image';

// Zod schema for anonymous message
const AnonymousMessageSchema = z.object({
    content: z.string().min(1, 'Message cannot be empty'),
});

export default function PublicMessagePage() {
    const params = useParams<{ username: string }>();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<z.infer<typeof AnonymousMessageSchema>>({
        resolver: zodResolver(AnonymousMessageSchema),
        defaultValues: { content: '' },
    });

    // Submit message
    const onSubmit = async (data: z.infer<typeof AnonymousMessageSchema>) => {
        setIsSubmitting(true);
        try {
            const response = await axios.post('/api/send-message', {
                username: params.username,
                content: data.content,
            });
            toast.success((response.data as any)?.message || 'Message sent successfully!');
            form.reset();
        } catch (error) {
            const err = error as AxiosError<{ message?: string }>;
            const errorMessage = err.response?.data?.message;

            if (errorMessage === 'User is not accepting messages at the moment') {
                toast.error('This user is not currently accepting messages');
            } else {
                toast.error(errorMessage ?? 'Failed to send message');
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const applySuggestion = (text: string) => form.setValue('content', text);

    return (
        <div className="mt-22 relative min-h-screen bg-gradient-to-b from-gray-900 to-black overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-purple-900/20 to-transparent"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl"></div>
            <div className="absolute top-1/4 left-10 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl"></div>

            {/* Floating particles */}
            <FloatingParticles count={25} />

            <div className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
                <div className="w-full max-w-2xl mx-auto">
                    {/* Header Section */}
                    <div className="text-center mb-12">
                        <div className="flex justify-center">
                            <div className="">
                                <Image
                                    src="/Annonify_Logo.png"
                                    alt="Annonify Logo"
                                    width={200}
                                    height={200}
                                />
                            </div>
                        </div>

                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                            Send Anonymous Message
                        </h1>

                        <div className="flex items-center justify-center gap-2 text-lg text-gray-300 mb-2">
                            <User className="w-5 h-5 text-purple-400" />
                            <span>To @{params.username}</span>
                        </div>

                        <p className="text-gray-400 max-w-md mx-auto">
                            Your message will be completely anonymous. Share your thoughts freely!
                        </p>
                    </div>

                    {/* Message Form Section */}
                    <div className="space-y-8">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                <FormField
                                    name="content"
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-white text-lg font-semibold">
                                                Your Message
                                            </FormLabel>
                                            <textarea
                                                {...field}
                                                placeholder="Type your heartfelt message here..."
                                                className="bg-gray-800/50 backdrop-blur-md border-2 border-gray-600 text-white text-lg p-6 rounded-2xl focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 h-24 resize-none w-full"
                                                disabled={isSubmitting}
                                            />
                                            <FormMessage className="text-red-400 text-sm" />
                                        </FormItem>
                                    )}
                                />

                                {/* AI Suggestion Component */}
                                <div className="bg-gray-800/30 backdrop-blur-md rounded-2xl p-6 border border-gray-700">
                                    <MessageSuggester
                                        message={form.watch('content')}
                                        onSuggestionSelect={applySuggestion}
                                    />
                                </div>

                                {/* Submit button */}
                                <Button
                                    type="submit"
                                    disabled={isSubmitting || !form.watch('content')}
                                    className="w-full h-14 bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white font-semibold text-lg rounded-2xl transition-all duration-300 transform hover:scale-105 disabled:transform-none disabled:opacity-50"
                                >
                                    {isSubmitting ? (
                                        <div className="flex items-center">
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                                            Sending...
                                        </div>
                                    ) : (
                                        <div className="flex items-center">
                                            <Send className="w-5 h-5 mr-3" />
                                            Send Message Anonymously
                                        </div>
                                    )}
                                </Button>
                            </form>
                        </Form>

                        {/* Features Highlight */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                            <div className="text-center p-6 bg-gray-800/30 backdrop-blur-md rounded-2xl border border-gray-700">
                                <div className="inline-flex p-3 bg-purple-600/20 rounded-2xl mb-4">
                                    <Sparkles className="w-6 h-6 text-purple-400" />
                                </div>
                                <h3 className="text-white font-semibold mb-2">100% Anonymous</h3>
                                <p className="text-gray-400 text-sm">Your identity stays completely hidden</p>
                            </div>

                            <div className="text-center p-6 bg-gray-800/30 backdrop-blur-md rounded-2xl border border-gray-700">
                                <div className="inline-flex p-3 bg-blue-600/20 rounded-2xl mb-4">
                                    <MessageCircle className="w-6 h-6 text-blue-400" />
                                </div>
                                <h3 className="text-white font-semibold mb-2">AI Powered</h3>
                                <p className="text-gray-400 text-sm">Smart suggestions for better conversations</p>
                            </div>

                            <div className="text-center p-6 bg-gray-800/30 backdrop-blur-md rounded-2xl border border-gray-700">
                                <div className="inline-flex p-3 bg-green-600/20 rounded-2xl mb-4">
                                    <Send className="w-6 h-6 text-green-400" />
                                </div>
                                <h3 className="text-white font-semibold mb-2">Instant Delivery</h3>
                                <p className="text-gray-400 text-sm">Messages are delivered in real-time</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Toaster
                richColors
                closeButton
                position="top-center"
                toastOptions={{
                    style: {
                        background: 'rgba(31, 41, 55, 0.8)',
                        backdropFilter: 'blur(12px)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        color: 'white',
                    },
                }}
            />
        </div>
    );
}
