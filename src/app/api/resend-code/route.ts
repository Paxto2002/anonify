// src/app/api/resend-code/route.ts
import { dbConnect } from "@/lib/dbConnect";
import { UserModel } from "@/model/User.model";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";

export async function POST(request: Request) {
  await dbConnect();

  try {
    const { username } = await request.json();
    const decodedUsername = decodeURIComponent(username);

    const user = await UserModel.findOne({ username: decodedUsername });

    if (!user) {
      return Response.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    if (user.isVerified) {
      return Response.json(
        { success: false, message: "User is already verified" },
        { status: 400 }
      );
    }

    // Generate new code + expiry
    const code = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit
    const expiry = new Date(Date.now() + 15 * 60 * 1000); // 15 mins

    user.verifyCode = code;
    user.verifyCodeExpiry = expiry;
    await user.save();

    // Pass all 3 arguments
    await sendVerificationEmail(user.email, user.username, code);

    return Response.json(
      { success: true, message: "Verification code resent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error resending code:", error);
    return Response.json(
      { success: false, message: "Failed to resend verification code" },
      { status: 500 }
    );
  }
}
