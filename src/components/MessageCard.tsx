// src/components/MessageCard.tsx
'use client';

import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';
import dayjs from 'dayjs';
import { X, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
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
import { Badge } from '@/components/ui/badge';

type MessageCardProps = {
    message: Message;
    onMessageDelete: (messageId: string) => void;
};

export function MessageCard({ message, onMessageDelete }: MessageCardProps) {
    const [isReadMoreOpen, setIsReadMoreOpen] = useState(false);
    const maxPreviewLength = 120;

    const handleDeleteConfirm = async () => {
        try {
            const res = await axios.delete<{ message: string }>(`/api/delete-message/${message._id}`);
            toast.success(res.data.message || 'Message deleted');
            onMessageDelete(message._id);
        } catch (error) {
            const axiosError = error as AxiosError<{ message: string }>;
            toast.error(axiosError.response?.data?.message || 'Failed to delete message');
        }
    };

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -2 }}
                transition={{ type: 'spring', stiffness: 100, damping: 15 }}
                className="h-full" // Ensure motion div takes full height
            >
                <Card className="bg-gray-900 border border-gray-700 text-gray-100 shadow-md hover:shadow-lg transition-all duration-300 rounded-xl overflow-hidden h-full flex flex-col">
                    <CardHeader className="p-4 pb-2 relative">
                        {/* Delete button moved to top right */}
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="absolute top-3 right-3 h-8 w-8 text-gray-400 bg-gray-800/50 hover:text-red-400 
                                        hover:bg-red-400/15 rounded-full transition-all duration-300
                                        shadow-sm hover:shadow-md hover:shadow-red-400/5
                                        transform hover:scale-105 group"
                                    title="Delete message"
                                >
                                    <X className="w-4 h-4 transition-transform group-hover:scale-110 group-hover:rotate-90" />
                                    <span className="absolute inset-0 rounded-full bg-red-400/0 
                                        group-hover:bg-red-400/5 transition-colors duration-300" />
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent className="bg-gray-800 border border-gray-700 text-gray-100 rounded-xl shadow-lg">
                                <AlertDialogHeader>
                                    <AlertDialogTitle className="text-white">Delete Message?</AlertDialogTitle>
                                    <AlertDialogDescription className="text-gray-300">
                                        Are you sure you want to delete this message? This action cannot be undone.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel className="text-white hover:text-white border border-gray-600 transition-all cursor-pointer hover:bg-gray-700 bg-gray-800 rounded-lg">
                                        Cancel
                                    </AlertDialogCancel>
                                    <AlertDialogAction
                                        className="bg-red-600 hover:bg-red-700 text-white rounded-lg px-4 py-2 transition-all cursor-pointer"
                                        onClick={handleDeleteConfirm}
                                    >
                                        Delete
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>

                        <div className="flex items-center gap-2">
                            <MessageSquare className="w-4 h-4 text-purple-400 flex-shrink-0" />
                            <CardTitle className="text-sm font-medium text-gray-300">
                                Message
                            </CardTitle>
                        </div>
                    </CardHeader>

                    <CardContent className="p-4 pt-0 flex-grow flex flex-col">
                        <div className="mb-3 flex-grow">
                            <p className="text-gray-100 text-sm line-clamp-3">
                                {message.content.length > maxPreviewLength
                                    ? message.content.slice(0, maxPreviewLength) + '...'
                                    : message.content}
                            </p>
                        </div>

                        {/* Footer with date and read more button */}
                        <div className="flex justify-between items-center pt-3 mt-auto border-t border-gray-700/50">
                            <div className="text-xs text-gray-400">
                                {dayjs(message.createdAt).format('MMM D, YYYY • h:mm A')}
                            </div>

                            {message.content.length > maxPreviewLength && (
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setIsReadMoreOpen(true)}
                                    className="text-xs text-purple-400 hover:text-purple-300 hover:bg-purple-900/20 p-1 h-7"
                                >
                                    Read full message
                                </Button>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </motion.div>

            <AnimatePresence>
                {isReadMoreOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70"
                        onClick={() => setIsReadMoreOpen(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="bg-gray-900 border border-gray-700 text-gray-100 rounded-xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto p-6 relative flex flex-col"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex items-center gap-2 mb-4">
                                <MessageSquare className="w-5 h-5 text-purple-400" />
                                <h3 className="text-lg font-semibold">Message</h3>
                                <button
                                    onClick={() => setIsReadMoreOpen(false)}
                                    className="ml-auto text-gray-400 hover:text-white transition p-1 rounded-full hover:bg-gray-800 flex items-center justify-center h-8 w-8"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="bg-gray-800/50 p-4 rounded-lg mb-4 flex-grow">
                                <p className="whitespace-pre-wrap text-gray-100">{message.content}</p>
                            </div>

                            <div className="flex justify-between items-center pt-3 border-t border-gray-700/50">
                                <Badge variant="outline" className="text-xs text-gray-400 bg-gray-800">
                                    {dayjs(message.createdAt).format('MMM D, YYYY • h:mm A')}
                                </Badge>

                                <Button
                                    onClick={() => setIsReadMoreOpen(false)}
                                    className="bg-purple-600 hover:bg-purple-700 text-white px-4"
                                >
                                    Close
                                </Button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}