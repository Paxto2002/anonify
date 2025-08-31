'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Toaster, toast } from "sonner";
import Link from "next/link";
import { useState } from "react";
import { Eye, EyeOff, Sparkles, MessageCircle } from "lucide-react";

export const signInSchema = z.object({
    identifier: z.string().min(1, "Email or username is required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function SignInForm() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);

    const form = useForm<z.infer<typeof signInSchema>>({
        resolver: zodResolver(signInSchema),
        defaultValues: { identifier: "", password: "" },
    });

    const onSubmit = async (data: z.infer<typeof signInSchema>) => {
        const result = await signIn("credentials", {
            redirect: false,
            identifier: data.identifier,
            password: data.password,
        });

        if (result?.error) {
            toast.error(
                result.error === "CredentialsSignin"
                    ? "Incorrect username or password"
                    : result.error
            );
            return;
        }

        if (result?.url) {
            router.replace(result.url);
        }
    };

    return (
        <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center p-4 py-15 relative overflow-hidden mx-5 my-20">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-600 via-violet-500 to-purple-600"></div>

            {/* Animated background elements */}
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-purple-600 rounded-full opacity-10 blur-3xl animate-pulse-slow"></div>
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-violet-600 rounded-full opacity-10 blur-3xl animate-pulse-slow delay-1000"></div>

            <div className="w-full max-w-md z-10">
                <div className="bg-gray-800/30 backdrop-blur-md rounded-2xl border border-gray-700/50 shadow-2xl overflow-hidden">
                    {/* Header section with gradient */}
                    <div className="bg-gradient-to-r from-purple-600 to-violet-500 p-6 text-center">
                        <h1 className="text-3xl font-bold text-white flex items-center justify-center">
                            <Sparkles className="mr-2" />
                            Welcome Back
                        </h1>
                        <p className="text-gray-100 mt-2">
                            Sign in to continue your anonymous conversations
                        </p>
                    </div>

                    <div className="p-8">
                        <Toaster position="top-right" richColors theme="dark" />

                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                {/* Identifier */}
                                <FormField
                                    name="identifier"
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-gray-300 flex items-center">
                                                <MessageCircle size={16} className="mr-2 text-purple-400" />
                                                Email / Username
                                            </FormLabel>
                                            <Input
                                                {...field}
                                                className="bg-gray-800/50 border-gray-700 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                                placeholder="Enter your email or username"
                                            />
                                            <FormMessage className="text-red-400" />
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
                                                type={showPassword ? "text" : "password"}
                                                className="bg-gray-800/50 border-gray-700 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent pr-10"
                                                placeholder="Enter your password"
                                            />
                                            <button
                                                type="button"
                                                className="absolute right-3 top-9 text-gray-400 hover:text-purple-400 transition-colors"
                                                onClick={() => setShowPassword(!showPassword)}
                                            >
                                                {showPassword ? (
                                                    <EyeOff className="h-5 w-5" />
                                                ) : (
                                                    <Eye className="h-5 w-5" />
                                                )}
                                            </button>
                                            <FormMessage className="text-red-400" />
                                        </FormItem>
                                    )}
                                />

                                {/* Submit */}
                                <Button
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-purple-600 to-violet-500 hover:from-violet-500 hover:to-purple-600 text-white font-semibold py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02]"
                                >
                                    Sign In
                                </Button>
                            </form>
                        </Form>

                        <div className="text-center mt-6 pt-6 border-t border-gray-700/50">
                            <p className="text-gray-400">
                                Not a member yet?{" "}
                                <Link
                                    href="/sign-up"
                                    className="text-purple-400 font-medium hover:text-violet-300 transition-colors"
                                >
                                    Sign Up Now
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Quote section similar to footer */}
                <div className="mt-8 p-4 bg-gray-800/30 rounded-lg border border-gray-700/50 text-center">
                    <p className="text-sm text-gray-400 italic">
                        "Privacy isn't an option, and it shouldn't be the price we accept for just getting on the internet."
                    </p>
                </div>
            </div>
        </div>
    );
}