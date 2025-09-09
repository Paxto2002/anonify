// src/app/(app)/dashboard/profile/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Save, Loader2 } from 'lucide-react';
import { Toaster, toast } from 'sonner';
import axios, { AxiosError } from 'axios';
import { ApiResponse } from '@/types/ApiResponse';

export default function ProfilePage() {
    const { data: session } = useSession();

    const [isLoading, setIsLoading] = useState(false);
    const [showSignOutModal, setShowSignOutModal] = useState(false);

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        name: '',
    });

    // Sync form with session data
    useEffect(() => {
        if (session?.user) {
            setFormData({
                username: session.user.username ?? '',
                email: session.user.email ?? '',
                name: session.user.name ?? '',
            });
        }
    }, [session]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await axios.put<ApiResponse>('/api/update-profile', formData);

            if (response.data.success) {
                // Show modal to sign out
                setShowSignOutModal(true);
            }
        } catch (error) {
            const axiosError = error as AxiosError<ApiResponse>;
            toast.error(axiosError.response?.data?.message || 'Failed to update profile');
        } finally {
            setIsLoading(false);
        }
    };

    if (!session?.user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-black">
                <div className="text-center text-white">
                    <p>Please sign in to view your profile</p>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-8">
                        <div className="flex justify-center mb-4">
                            <div className="p-3 bg-gradient-to-r from-purple-600 to-violet-600 rounded-2xl">
                                <User className="w-8 h-8 text-white" />
                            </div>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Profile Settings</h1>
                        <p className="text-gray-400">Manage your personal information</p>
                    </div>

                    <Card className="bg-gray-800/50 backdrop-blur-md border border-gray-700">
                        <CardHeader>
                            <CardTitle className="text-white">Personal Information</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="username" className="text-white">Username</Label>
                                    <Input
                                        id="username"
                                        name="username"
                                        value={formData.username}
                                        onChange={handleInputChange}
                                        className="bg-gray-700/50 border-gray-600 text-white"
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-white">Email</Label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        disabled
                                        className="bg-gray-700/50 border-gray-600 text-white"
                                        required
                                    />
                                    <p className="text-gray-400 text-sm">Email cannot be changed</p>
                                </div>

                                <Button
                                    type="submit"
                                    disabled={isLoading}
                                    className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 flex items-center"
                                >
                                    {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
                                    Save Changes
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Centered Sign-Out Modal */}
            {showSignOutModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <div className="bg-gray-800 rounded-2xl p-6 max-w-md w-full text-center border border-gray-700">
                        <h2 className="text-xl font-bold text-white mb-4">Profile Updated!</h2>
                        <p className="text-gray-300 mb-6">
                            To apply the changes, you need to sign out and sign in again.
                        </p>
                        <div className="flex justify-center gap-4">
                            <Button
                                className="bg-red-600 hover:bg-red-700"
                                onClick={() => {
                                    signOut({ callbackUrl: '/' });
                                }}
                            >
                                Sign Out Now
                            </Button>
                            <Button
                                className="bg-gray-600 hover:bg-gray-700"
                                onClick={() => setShowSignOutModal(false)}
                            >
                                Later
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            <Toaster richColors closeButton />
        </>
    );
}
