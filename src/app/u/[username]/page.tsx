// src/app/u/[username]/page.tsx
"use client";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { ApiResponse } from "@/types/ApiResponse";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { verifySchema } from "@/schemas/verifySchema";
import { Sparkles, MailCheck, RefreshCw } from "lucide-react";
import FloatingParticles from "@/components/FloatingParticles";

export default function VerifyAccount() {
    const router = useRouter();
    const params = useParams<{ username: string }>();

    const form = useForm<z.infer<typeof verifySchema>>({
        resolver: zodResolver(verifySchema),
        defaultValues: {
            code: "", // initialize as empty string
        },
    });

    // ✅ Handle Verify Account
    const onSubmit = async (data: z.infer<typeof verifySchema>) => {
        try {
            const response = await axios.post<ApiResponse>(`/api/verify-code`, {
                username: params.username,
                code: data.code,
            });

            toast.success(response.data.message, {
                description: "Your account has been verified ✅",
            });

            router.replace("/sign-in");
        } catch (error) {
            const axiosError = error as AxiosError<ApiResponse>;
            toast.error(
                axiosError.response?.data.message ??
                "An error occurred. Please try again."
            );
        }
    };

    // ✅ Handle Resend Email
    const handleResend = async () => {
        try {
            const res = await axios.post<ApiResponse>("/api/resend-code", {
                username: params.username,
            });
            toast.success(res.data.message, {
                description: "Check your inbox for a new code 🚀",
            });
        } catch (error) {
            const axiosError = error as AxiosError<ApiResponse>;
            toast.error(
                axiosError.response?.data.message ??
                "Failed to resend verification email"
            );
        }
    };

    return (
        <>
            <div className="relative flex justify-center items-center min-h-screen bg-gradient-to-b from-gray-900 to-black overflow-hidden">
                {/* Background elements */}
                <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-purple-900/20 to-transparent"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl"></div>
                <div className="absolute top-1/4 left-10 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl"></div>

                {/* Floating particles */}
                <FloatingParticles count={15} />

                <div className="relative z-10 w-full max-w-md p-8 space-y-8 bg-gray-800/50 backdrop-blur-md rounded-2xl border border-gray-700 shadow-xl">
                    <div className="text-center">
                        <div className="flex justify-center mb-4">
                            <div className="p-3 bg-gradient-to-r from-purple-600 to-violet-600 rounded-2xl">
                                <MailCheck className="w-8 h-8 text-white" />
                            </div>
                        </div>
                        <h1 className="text-3xl font-bold text-white mb-2">
                            Verify Your Account
                        </h1>
                        <p className="text-gray-400">
                            Enter the verification code sent to your email
                        </p>
                    </div>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <FormField
                                name="code"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-white">
                                            Verification Code
                                        </FormLabel>
                                        <Input
                                            {...field}
                                            className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                            placeholder="Enter 6-digit code"
                                        />
                                        <FormMessage className="text-red-400" />
                                    </FormItem>
                                )}
                            />

                            {/* Verify Button */}
                            <Button
                                type="submit"
                                className="w-full h-12 bg-gradient-to-r from-purple-600 to-violet-600 text-white font-semibold hover:from-purple-700 hover:to-violet-700 transition-all duration-300"
                            >
                                <Sparkles className="mr-2 h-4 w-4" />
                                Verify Account
                            </Button>

                            {/* Resend Email Button */}
                            <Button
                                type="button"
                                onClick={handleResend}
                                className="w-full h-12 bg-gray-700/50 border border-gray-600 text-white hover:bg-gray-600/70 transition-all"
                            >
                                <RefreshCw className="mr-2 h-4 w-4" />
                                Resend Verification Email
                            </Button>
                        </form>
                    </Form>
                </div>
            </div>

            {/* Toaster renders globally */}
            <Toaster richColors closeButton />

            {/* Global Animations */}
            <style jsx>{`
        @keyframes float1 {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(5deg);
          }
        }
        @keyframes float2 {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-15px) rotate(-5deg);
          }
        }
        @keyframes float3 {
          0%,
          100% {
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(-10px) scale(1.05);
          }
        }
      `}</style>
        </>
    );
}
