// src/app/api/send-message/route.ts
import { NextResponse } from 'next/server';
import { UserModel, MessageDocument } from '@/model/User.model';
import { dbConnect } from '@/lib/dbConnect';

export async function POST(request: Request) {
  await dbConnect();

  try {
    const { username, content } = await request.json();

    if (!username || !content) {
      return NextResponse.json(
        { message: 'Username and message content are required', success: false },
        { status: 400 }
      );
    }

    // Convert username to lowercase for case-insensitive search
    const normalizedUsername = username.toLowerCase();
    
    const user = await UserModel.findOne({ 
      username: { $regex: new RegExp(`^${normalizedUsername}$`, 'i') }
    }).exec();

    // Alternative approach if the above doesn't work:
    // const user = await UserModel.findOne({ 
    //   username: normalizedUsername 
    // }).exec();

    if (!user) {
      return NextResponse.json(
        { message: 'User not found', success: false },
        { status: 404 }
      );
    }

    if (!user.isAcceptingMessages) {
      return NextResponse.json(
        { message: 'User is not accepting messages at the moment', success: false },
        { status: 403 }
      );
    }

    const newMessage: Partial<MessageDocument> = {
      content,
      createdAt: new Date(),
      isRead: false,
    };

    user.messages.push(newMessage as MessageDocument);
    await user.save();

    return NextResponse.json(
      { message: 'Message sent successfully', success: true },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error adding message:', error);
    return NextResponse.json(
      { message: 'Internal server error', success: false },
      { status: 500 }
    );
  }
}