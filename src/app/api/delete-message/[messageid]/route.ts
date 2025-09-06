// src/app/api/delete-message/[messageid]/route.ts
import { UserModel } from "@/model/User.model";
import { getServerSession } from "next-auth/next";
import { dbConnect } from "@/lib/dbConnect";
import { NextRequest } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/options";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { messageid: string } }
) {
  const messageId = params.messageid;

  await dbConnect();

  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return Response.json(
      { success: false, message: "Not authenticated" },
      { status: 401 }
    );
  }

  try {
    const updateResult = await UserModel.updateOne(
      { _id: session.user._id },
      { $pull: { messages: { _id: messageId } } }
    );

    if (updateResult.modifiedCount === 0) {
      return Response.json(
        { success: false, message: "Message not found or already deleted" },
        { status: 404 }
      );
    }

    return Response.json(
      { success: true, message: "Message deleted" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting message:", error);
    return Response.json(
      { success: false, message: "Error deleting message" },
      { status: 500 }
    );
  }
}
