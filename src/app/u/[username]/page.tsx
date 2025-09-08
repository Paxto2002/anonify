'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import axios from 'axios';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Toaster, toast } from 'sonner';
import FloatingParticles from '@/components/FloatingParticles';

const AnonymousMessageSchema = z.object({
    content: z.string().min(1, 'Message cannot be empty'),
});

export default function PublicMessagePage() {
    const params = useParams<{ username: string }>();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuggesting, setIsSuggesting] = useState(false);
    const [suggestions, setSuggestions] = useState<string[]>([]);

    const form = useForm<z.infer<typeof AnonymousMessageSchema>>({
        resolver: zodResolver(AnonymousMessageSchema),
        defaultValues: { content: '' },
    });

    const onSubmit = async (data: z.infer<typeof AnonymousMessageSchema>) => {
        setIsSubmitting(true);
        try {
            const response = await axios.post('/api/send-message', {
                username: params.username,
                content: data.content,
            });
            toast.success((response.data as any)?.message || 'Message sent!');
            form.reset();
            setSuggestions([]);
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Something went wrong');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleSuggest = async () => {
        const content = form.getValues('content');
        if (!content) return;

        setIsSuggesting(true);
        try {
            const response = await axios.post('/api/suggest-messages', { message: content }, { responseType: 'text' });
            const suggArray = response.data
                .split('||')
                .map((s: string) => s.trim())
                .filter(Boolean);
            setSuggestions(suggArray);
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Failed to generate suggestions');
        } finally {
            setIsSuggesting(false);
        }
    };

    const applySuggestion = (text: string) => form.setValue('content', text);

    return (
        <div className="relative flex justify-center items-center min-h-screen bg-gradient-to-b from-gray-900 to-black overflow-hidden p-4">
            <FloatingParticles count={20} />

            <div className="relative z-10 w-full max-w-md bg-gray-800/50 backdrop-blur-md rounded-2xl border border-gray-700 p-8 space-y-6">
                <h1 className="text-2xl font-bold text-white text-center">
                    Send an Anonymous Message to {params.username}
                </h1>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            name="content"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-gray-300">Message</FormLabel>
                                    <Input
                                        {...field}
                                        placeholder="Type your anonymous message..."
                                        className="bg-gray-700/50 border border-gray-600 text-white"
                                        disabled={isSubmitting}
                                    />
                                    <FormMessage className="text-red-400" />
                                </FormItem>
                            )}
                        />

                        <Button
                            type="button"
                            onClick={handleSuggest}
                            disabled={isSuggesting}
                            className="w-full bg-blue-600 hover:bg-blue-700"
                        >
                            {isSuggesting ? 'Generating...' : 'Get AI Suggestions'}
                        </Button>

                        {suggestions.length > 0 && (
                            <div className="bg-gray-700/40 border border-gray-600 rounded-lg p-3 space-y-2">
                                {suggestions.map((sugg, idx) => (
                                    <div
                                        key={idx}
                                        onClick={() => applySuggestion(sugg)}
                                        className="p-2 bg-gray-600/30 rounded-md cursor-pointer hover:bg-gray-600/50 text-white"
                                    >
                                        {sugg}
                                    </div>
                                ))}
                            </div>
                        )}

                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-purple-600 hover:bg-purple-700"
                        >
                            {isSubmitting ? 'Sending...' : 'Send Message'}
                        </Button>
                    </form>
                </Form>
            </div>

            <Toaster richColors closeButton />
        </div>
    );
}
