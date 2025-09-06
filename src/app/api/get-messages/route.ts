// app/api/get-messages/route.ts
import { dbConnect } from "@/lib/dbConnect";
import { UserModel } from "@/model/User.model";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/options";
import { NextResponse } from "next/server";

// Define the message type (adjust according to your schema)
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

    // Cast messages to Message[]
    const messages: Message[] = (user.messages || []) as Message[];

    // Sort messages by createdAt in descending order
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
