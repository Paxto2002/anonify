'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { useDebounceValue } from 'usehooks-ts';
import * as z from 'zod';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Loader2, Eye, EyeOff, Sparkles, MessageCircle, User, Mail } from 'lucide-react';
import { Toaster, toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Form, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { signUpSchema } from '@/schemas/signUpSchema';
import { ApiResponse } from '@/types/ApiResponse';

export default function SignUpPage() {
    const router = useRouter();

    const [username, setUsername] = useState('');
    const [usernameMessage, setUsernameMessage] = useState('');
    const [isCheckingUsername, setIsCheckingUsername] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const [debouncedUsername] = useDebounceValue(username, 300);

    const form = useForm<z.infer<typeof signUpSchema>>({
        resolver: zodResolver(signUpSchema),
        defaultValues: { username: '', email: '', password: '' },
    });

    // Check username uniqueness
    useEffect(() => {
        const checkUsername = async () => {
            if (!debouncedUsername) {
                setUsernameMessage('');
                return;
            }

            setIsCheckingUsername(true);
            setUsernameMessage('');

            try {
                const response = await axios.get<ApiResponse>(
                    `/api/check-username-unique?username=${encodeURIComponent(debouncedUsername)}`
                );
                setUsernameMessage(response.data.message);
            } catch (error) {
                const err = error as AxiosError<ApiResponse>;
                setUsernameMessage(err.response?.data.message ?? 'Error checking username');
            } finally {
                setIsCheckingUsername(false);
            }
        };

        checkUsername();
    }, [debouncedUsername]);

    // Submit form
    const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
        setIsSubmitting(true);
        try {
            const response = await axios.post<ApiResponse>('/api/sign-up', data);
            toast.success(response.data.message);
            router.replace(`/verify/${data.username}`); // tutorial-style redirect
        } catch (error) {
            const err = error as AxiosError<ApiResponse>;
            toast.error(err.response?.data.message || 'Sign-up failed. Try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center p-4 py-15 relative overflow-hidden mx-5 my-20">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-600 via-violet-500 to-purple-600"></div>
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-purple-600 rounded-full opacity-10 blur-3xl animate-pulse-slow"></div>
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-violet-600 rounded-full opacity-10 blur-3xl animate-pulse-slow delay-1000"></div>

            <div className="w-full max-w-md z-10">
                <div className="bg-gray-800/30 backdrop-blur-md rounded-2xl border border-gray-700/50 shadow-2xl overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-purple-600 to-violet-500 p-6 text-center">
                        <h1 className="text-3xl font-bold text-white flex items-center justify-center">
                            <Sparkles className="mr-2" />
                            Join Anonify
                        </h1>
                        <p className="text-gray-100 mt-2">
                            Sign up to start your anonymous adventure
                        </p>
                    </div>

                    <div className="p-8">
                        <Toaster position="top-right" richColors theme="dark" />

                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                {/* Username */}
                                <FormField
                                    name="username"
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-gray-300 flex items-center">
                                                <User size={16} className="mr-2 text-purple-400" />
                                                Username
                                            </FormLabel>
                                            <Input
                                                {...field}
                                                onChange={(e) => {
                                                    field.onChange(e);
                                                    setUsername(e.target.value);
                                                }}
                                                className="bg-gray-800/50 border-gray-700 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent w-full"
                                                placeholder="Enter your username"
                                                maxLength={20}
                                                disabled={isSubmitting}
                                            />
                                            <div className="mt-1 w-full">
                                                {isCheckingUsername && (
                                                    <div className="flex items-center">
                                                        <Loader2 className="h-4 w-4 animate-spin text-purple-400 mr-2" />
                                                        <span className="text-gray-400 text-sm">
                                                            Checking availability...
                                                        </span>
                                                    </div>
                                                )}
                                                {!isCheckingUsername && usernameMessage && (
                                                    <Badge
                                                        variant={
                                                            usernameMessage.toLowerCase().includes('available')
                                                                ? 'outline'
                                                                : 'destructive'
                                                        }
                                                        className="mt-1 bg-gray-800/80 text-gray-200 border-gray-700 w-full text-left break-words"
                                                    >
                                                        {usernameMessage}
                                                    </Badge>
                                                )}
                                            </div>
                                            <FormMessage className="text-red-400 break-words" />
                                        </FormItem>
                                    )}
                                />

                                {/* Email */}
                                <FormField
                                    name="email"
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-gray-300 flex items-center">
                                                <Mail size={16} className="mr-2 text-purple-400" />
                                                Email
                                            </FormLabel>
                                            <Input
                                                {...field}
                                                type="email"
                                                className="bg-gray-800/50 border-gray-700 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent w-full"
                                                placeholder="Enter your email"
                                                disabled={isSubmitting}
                                            />
                                            <p className="text-sm text-gray-400 mt-1">
                                                We will send you a verification code
                                            </p>
                                            <FormMessage className="text-red-400 break-words" />
                                        </FormItem>
                                    )}
                                />

                                {/* Password */}
                                <FormField
                                    name="password"
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem className="relative">
                                            <FormLabel className="text-gray-300 flex items-center">
                                                <MessageCircle size={16} className="mr-2 text-purple-400" />
                                                Password
                                            </FormLabel>
                                            <Input
                                                {...field}
                                                type={showPassword ? 'text' : 'password'}
                                                className="bg-gray-800/50 border-gray-700 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent pr-10 w-full"
                                                placeholder="Enter your password"
                                                disabled={isSubmitting}
                                            />
                                            <button
                                                type="button"
                                                className="absolute right-3 top-9 text-gray-400 hover:text-purple-400 transition-colors"
                                                onClick={() => setShowPassword(!showPassword)}
                                                disabled={isSubmitting}
                                            >
                                                {showPassword ? (
                                                    <EyeOff className="h-5 w-5" />
                                                ) : (
                                                    <Eye className="h-5 w-5" />
                                                )}
                                            </button>
                                            <FormMessage className="text-red-400 break-words" />
                                        </FormItem>
                                    )}
                                />

                                {/* Submit */}
                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-gradient-to-r from-purple-600 to-violet-500 hover:from-violet-500 hover:to-purple-600 text-white font-semibold py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] disabled:opacity-70"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="h-4 w-4 animate-spin mr-2" />
                                            Please wait
                                        </>
                                    ) : (
                                        'Sign Up'
                                    )}
                                </Button>
                            </form>

                            {/* Footer */}
                            <div className="text-center mt-6 pt-6 border-t border-gray-700/50">
                                <p className="text-gray-400">
                                    Already a member?{' '}
                                    <Link
                                        href="/sign-in"
                                        className="text-purple-400 font-medium hover:text-violet-300 transition-colors"
                                    >
                                        Sign In
                                    </Link>
                                </p>
                            </div>
                        </Form>
                    </div>
                </div>

                {/* Quote */}
                <div className="mt-8 p-4 bg-gray-800/30 rounded-lg border border-gray-700/50 text-center">
                    <p className="text-sm text-gray-400 italic">
                        &quot;Privacy isn&apos;t an option, and it shouldn&apos;t be the price we accept for just getting on the internet.&quot;
                    </p>
                </div>
            </div>
        </div>
    );
}
