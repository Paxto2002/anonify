// src/app/(app)/dashboard/settings/page.tsx
'use client';

import { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Shield,
    Key,
    Trash2,
    Loader2,
    AlertTriangle,
    Eye,
    EyeOff
} from 'lucide-react';
import { Toaster, toast } from 'sonner';
import axios, { AxiosError } from 'axios';
import { ApiResponse } from '@/types/ApiResponse';

export default function SettingsPage() {
    const { data: session } = useSession();
    const [isLoading, setIsLoading] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    const handlePasswordChange = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        if (passwordData.newPassword !== passwordData.confirmPassword) {
            toast.error('New passwords do not match');
            setIsLoading(false);
            return;
        }

        try {
            const response = await axios.put<ApiResponse>('/api/change-password', {
                currentPassword: passwordData.currentPassword,
                newPassword: passwordData.newPassword,
            });

            if (response.data.success) {
                toast.success('Password changed successfully');
                setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
            }
        } catch (error) {
            const axiosError = error as AxiosError<ApiResponse>;
            toast.error(axiosError.response?.data.message || 'Failed to change password');
        } finally {
            setIsLoading(false);
        }
    };

    const handleAccountDelete = async () => {
        if (!confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
            return;
        }

        setIsDeleting(true);
        try {
            const response = await axios.delete<ApiResponse>('/api/delete-account');

            if (response.data.success) {
                toast.success('Account deleted successfully');
                setTimeout(() => signOut({ callbackUrl: '/' }), 2000);
            }
        } catch (error) {
            const axiosError = error as AxiosError<ApiResponse>;
            toast.error(axiosError.response?.data.message || 'Failed to delete account');
        } finally {
            setIsDeleting(false);
        }
    };

    if (!session?.user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-black">
                <div className="text-center text-white">
                    <p>Please sign in to view settings</p>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto space-y-8">
                    {/* Header */}
                    <div className="text-center">
                        <div className="flex justify-center mb-4">
                            <div className="p-3 bg-gradient-to-r from-purple-600 to-violet-600 rounded-2xl">
                                <Shield className="w-8 h-8 text-white" />
                            </div>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                            Account Settings
                        </h1>
                        <p className="text-gray-400">
                            Manage your account security and preferences
                        </p>
                    </div>

                    {/* Change Password Card */}
                    <Card className="bg-gray-800/50 backdrop-blur-md border border-gray-700">
                        <CardHeader>
                            <CardTitle className="text-white flex items-center">
                                <Key className="w-5 h-5 mr-2" />
                                Change Password
                            </CardTitle>
                            <CardDescription className="text-gray-400">
                                Update your account password
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handlePasswordChange} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="currentPassword" className="text-white">Current Password</Label>
                                    <Input
                                        id="currentPassword"
                                        type="password"
                                        value={passwordData.currentPassword}
                                        onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                                        className="bg-gray-700/50 border-gray-600 text-white"
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="newPassword" className="text-white">New Password</Label>
                                    <div className="relative">
                                        <Input
                                            id="newPassword"
                                            type={showPassword ? "text" : "password"}
                                            value={passwordData.newPassword}
                                            onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                                            className="bg-gray-700/50 border-gray-600 text-white pr-10"
                                            required
                                            minLength={6}
                                        />
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? (
                                                <EyeOff className="h-4 w-4 text-gray-400" />
                                            ) : (
                                                <Eye className="h-4 w-4 text-gray-400" />
                                            )}
                                        </Button>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="confirmPassword" className="text-white">Confirm New Password</Label>
                                    <Input
                                        id="confirmPassword"
                                        type="password"
                                        value={passwordData.confirmPassword}
                                        onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                                        className="bg-gray-700/50 border-gray-600 text-white"
                                        required
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    disabled={isLoading}
                                    className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700"
                                >
                                    {isLoading ? (
                                        <Loader2 className="w-4 h-4 animate-spin mr-2" />
                                    ) : (
                                        <Key className="w-4 h-4 mr-2" />
                                    )}
                                    Change Password
                                </Button>
                            </form>
                        </CardContent>
                    </Card>

                    {/* Delete Account Card */}
                    <Card className="bg-gray-800/50 backdrop-blur-md border border-red-600/50">
                        <CardHeader>
                            <CardTitle className="text-red-400 flex items-center">
                                <AlertTriangle className="w-5 h-5 mr-2" />
                                Danger Zone
                            </CardTitle>
                            <CardDescription className="text-gray-400">
                                Permanent actions that cannot be undone
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <p className="text-gray-300">
                                    Once you delete your account, all your data including messages will be permanently removed.
                                </p>
                                <Button
                                    onClick={handleAccountDelete}
                                    disabled={isDeleting}
                                    variant="destructive"
                                    className="bg-red-600 hover:bg-red-700"
                                >
                                    {isDeleting ? (
                                        <Loader2 className="w-4 h-4 animate-spin mr-2" />
                                    ) : (
                                        <Trash2 className="w-4 h-4 mr-2" />
                                    )}
                                    Delete Account
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
            <Toaster richColors closeButton />
        </>
    );
}