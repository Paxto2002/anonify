'use client';

import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Loader2, Sparkles, Send, MessageCircle, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { CardHeader, CardContent, Card } from '@/components/ui/card';
import { useCompletion } from '@ai-sdk/react'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import * as z from 'zod';
import { ApiResponse } from '@/types/ApiResponse';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { messageSchema } from '@/schemas/messageSchema';

const specialChar = '||';

const parseStringMessages = (messageString: string): string[] => {
    return messageString.split(specialChar);
};

const initialMessageString =
    "What's your favorite movie?||Do you have any pets?||What's your dream job?";

export default function SendMessage() {
    const params = useParams<{ username: string }>();
    const username = params.username;
    const [isLoading, setIsLoading] = useState(false);

    const {
        complete,
        completion,
        isLoading: isSuggestLoading,
        error,
    } = useCompletion({
        api: '/api/suggest-messages',
        initialCompletion: initialMessageString,
    });

    const form = useForm<z.infer<typeof messageSchema>>({
        resolver: zodResolver(messageSchema),
    });

    const messageContent = form.watch('content');

    const handleMessageClick = (message: string) => {
        form.setValue('content', message);
    };

    const onSubmit = async (data: z.infer<typeof messageSchema>) => {
        setIsLoading(true);
        try {
            const response = await axios.post<ApiResponse>('/api/send-message', {
                ...data,
                username,
            });

            toast.success(response.data.message);
            form.reset({ ...form.getValues(), content: '' });
        } catch (error) {
            const axiosError = error as AxiosError<ApiResponse>;
            toast.error(
                axiosError.response?.data.message ?? 'Failed to send message'
            );
        } finally {
            setIsLoading(false);
        }
    };

    const fetchSuggestedMessages = async () => {
        try {
            complete('');
        } catch (error) {
            console.error('Error fetching messages:', error);
            toast.error('Failed to fetch suggested messages');
        }
    };

    return (
        <div className="relative min-h-screen bg-gradient-to-b from-gray-900 to-black py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-purple-900/20 to-transparent"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl"></div>
            <div className="absolute top-1/4 left-10 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl"></div>

            <div className="relative z-10 max-w-4xl mx-auto bg-gray-800/50 backdrop-blur-md rounded-2xl border border-gray-700 p-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="flex justify-center mb-4">
                        <div className="p-3 bg-gradient-to-r from-purple-600 to-violet-600 rounded-2xl">
                            <MessageCircle className="w-8 h-8 text-white" />
                        </div>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                        Send Anonymous Message
                    </h1>
                    <p className="text-gray-400">
                        Send an anonymous message to @{username}
                    </p>
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="content"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-white">Your Message</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Write your anonymous message here"
                                            className="resize-none bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                            rows={4}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage className="text-red-400" />
                                </FormItem>
                            )}
                        />
                        <div className="flex justify-center">
                            {isLoading ? (
                                <Button
                                    disabled
                                    className="w-full h-12 bg-gradient-to-r from-purple-600 to-violet-600"
                                >
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Sending...
                                </Button>
                            ) : (
                                <Button
                                    type="submit"
                                    disabled={isLoading || !messageContent}
                                    className="w-full h-12 bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700"
                                >
                                    <Send className="mr-2 h-4 w-4" />
                                    Send Anonymously
                                </Button>
                            )}
                        </div>
                    </form>
                </Form>

                <Separator className="my-8 bg-gray-600" />

                {/* Suggested Messages */}
                <div className="space-y-4">
                    <div className="text-center">
                        <Button
                            onClick={fetchSuggestedMessages}
                            disabled={isSuggestLoading}
                            className="bg-gray-700/50 border border-gray-600 text-gray-300 hover:bg-gray-600/50"
                        >
                            {isSuggestLoading ? (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                                <Sparkles className="mr-2 h-4 w-4" />
                            )}
                            Suggest Messages
                        </Button>
                        <p className="text-gray-400 mt-2 text-sm">
                            Click on any message below to select it
                        </p>
                    </div>

                    <Card className="bg-gray-700/30 backdrop-blur-sm border border-gray-600">
                        <CardHeader>
                            <h3 className="text-xl font-semibold text-white">Suggested Messages</h3>
                        </CardHeader>
                        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {error ? (
                                <p className="text-red-400 col-span-full text-center">
                                    Failed to load suggestions
                                </p>
                            ) : (
                                parseStringMessages(completion).map((message, index) => (
                                    <Button
                                        key={index}
                                        variant="outline"
                                        className="h-auto py-3 bg-gray-600/50 border-gray-500 text-gray-200 hover:bg-gray-500/50 hover:text-white text-left whitespace-normal"
                                        onClick={() => handleMessageClick(message)}
                                    >
                                        {message}
                                    </Button>
                                ))
                            )}
                        </CardContent>
                    </Card>
                </div>

                <Separator className="my-8 bg-gray-600" />

                <div className="text-center">
                    <div className="mb-4 text-gray-300">Get Your Own Message Board</div>
                    <Link href={'/sign-up'}>
                        <Button className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700">
                            <User className="mr-2 h-4 w-4" />
                            Create Your Account
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}