// src/app/api/validate-user/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { UserModel } from '@/model/User.model';
import { dbConnect } from '@/lib/dbConnect';

export async function GET(request: NextRequest) {
  await dbConnect();

  try {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get('username');

    if (!username) {
      return NextResponse.json(
        { exists: false, acceptsMessages: false, error: 'Username is required' },
        { status: 400 }
      );
    }

    // Convert to lowercase for case-insensitive search
    const normalizedUsername = username.toLowerCase();
    
    const user = await UserModel.findOne({ 
      username: { $regex: new RegExp(`^${normalizedUsername}$`, 'i') }
    }).exec();

    // Alternative approach:
    // const user = await UserModel.findOne({ 
    //   username: normalizedUsername 
    // }).exec();

    if (!user) {
      return NextResponse.json(
        { exists: false, acceptsMessages: false },
        { status: 200 }
      );
    }

    return NextResponse.json({
      exists: true,
      acceptsMessages: user.isAcceptingMessages,
      username: user.username // Return the actual username from DB
    });

  } catch (error) {
    console.error('Error validating user:', error);
    return NextResponse.json(
      { exists: false, acceptsMessages: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}