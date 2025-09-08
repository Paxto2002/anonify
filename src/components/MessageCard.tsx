'use client';

import React from 'react';
import axios, { AxiosError } from 'axios';
import dayjs from 'dayjs';
import { X } from 'lucide-react';
import { Message } from '@/model/User.model';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

type MessageCardProps = {
    message: Message;
    onMessageDelete: (messageId: string) => void;
};

export function MessageCard({ message, onMessageDelete }: MessageCardProps) {
    const handleDeleteConfirm = async () => {
        try {
            // explicitly type the response
            const res = await axios.delete<{ message: string }>(`/api/delete-message/${message._id}`);
            toast.success(res.data.message || 'Message deleted');
            onMessageDelete(message._id);
        } catch (error) {
            const axiosError = error as AxiosError<{ message: string }>;
            toast.error(axiosError.response?.data?.message || 'Failed to delete message');
        }
    };


    return (
        <Card className="bg-gray-900 border border-gray-700 text-gray-100 shadow-md hover:shadow-lg transition rounded-2xl">
            <CardHeader>
                <div className="flex justify-between items-start">
                    <CardTitle className="text-lg font-semibold">{message.content}</CardTitle>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button
                                variant="destructive"
                                size="icon"
                                className="rounded-full hover:scale-105 transition-all font-extrabold cursor-pointer"
                            >
                                <X className="w-5 h-5" />
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="bg-gray-800 border border-gray-700 text-gray-100 rounded-2xl shadow-lg">
                            <AlertDialogHeader>
                                <AlertDialogTitle className="text-white">Delete Message?</AlertDialogTitle>
                                <AlertDialogDescription className="text-gray-300">
                                    Are you sure you want to delete this message? This action cannot be undone.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel className="text-white hover:text-white border-none transition-all cursor-pointer hover:bg-slate-900 bg-slate-600">Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                    className="bg-red-600 hover:bg-red-800 text-white rounded-lg px-4 py-2 ml-2 transition-all cursor-pointer"
                                    onClick={handleDeleteConfirm}
                                >
                                    Delete
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
                <div className="text-xs text-gray-400 mt-2">
                    {dayjs(message.createdAt).format('MMM D, YYYY • h:mm A')}
                </div>
            </CardHeader>
            <CardContent></CardContent>
        </Card>
    );
}
