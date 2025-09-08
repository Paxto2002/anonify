// app/api/get-messages/route.ts
import { dbConnect } from "@/lib/dbConnect";
import { UserModel } from "@/model/User.model";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/options";
import { NextResponse } from "next/server";

// Define the type for the response messages
type Message = {
  _id: string;
  content: string;
  createdAt: string | Date;
};

export async function GET() {
  await dbConnect();

  // Get current session
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json(
      { success: false, message: "Not authenticated" },
      { status: 401 }
    );
  }

  try {
    const user = await UserModel.findById(session.user._id);

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    // Map Mongoose documents to plain objects with _id as string
    const messages: Message[] = (user.messages || []).map((msg) => ({
      _id: msg._id.toString(),
      content: msg.content,
      createdAt: msg.createdAt,
    }));

    // Sort messages by createdAt descending
    const sortedMessages = messages.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    return NextResponse.json(
      { success: true, messages: sortedMessages },
      { status: 200 }
    );
  } catch (error) {
    console.error("An unexpected error occurred:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
