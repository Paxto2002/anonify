// src/app/api/update-profile/route.ts
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/options";
import { dbConnect } from "@/lib/dbConnect";
import { UserModel } from "@/model/User.model";
import { NextRequest } from "next/server";

export async function PUT(request: NextRequest) {
  await dbConnect();

  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return Response.json(
      { success: false, message: "Not authenticated" },
      { status: 401 }
    );
  }

  try {
    const { username, name } = await request.json();
    const userId = session.user._id;

    // Check if username is already taken by another user
    if (username !== session.user.username) {
      const existingUser = await UserModel.findOne({ 
        username, 
        _id: { $ne: userId } 
      });
      
      if (existingUser) {
        return Response.json(
          { success: false, message: "Username is already taken" },
          { status: 400 }
        );
      }
    }

    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { username, name },
      { new: true }
    );

    if (!updatedUser) {
      return Response.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    return Response.json(
      { 
        success: true, 
        message: "Profile updated successfully",
        user: {
          username: updatedUser.username,
          email: updatedUser.email
        }
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating profile:", error);
    return Response.json(
      { success: false, message: "Error updating profile" },
      { status: 500 }
    );
  }
}