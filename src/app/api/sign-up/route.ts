
// src/app/api/sign-up/route.ts
import { dbConnect } from "@/lib/dbConnect";
import { UserModel } from "@/model/User.model"; 
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";

// Define POST request handler for user registration
export async function POST(request: Request) {
  await dbConnect(); // Ensure DB connection is established before doing anything
  try {
    // Extract user details (username, email, password) from request body
    const { username, email, password } = await request.json();

    // Check if a verified user already exists with the same username
    const existingUserVerifiedByUsername = await UserModel.findOne({
      username,
      isVerified: true,
    });

    if (existingUserVerifiedByUsername) {
      // If yes → block registration
      return Response.json(
        {
          success: false,
          message: "Username is already taken",
        },
        { status: 400 }
      );
    }

    // Check if a verified user already exists with the same email
    const existingUserVerifiedByEmail = await UserModel.findOne({
      email,
      isVerified: true,
    });

    // Generate a 6-digit verification code (OTP)
    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

    if (existingUserVerifiedByEmail) {
      // If user exists and is already verified → block new registration
      if (existingUserVerifiedByEmail.isVerified) {
        return Response.json(
          {
            success: false,
            message: "User already registered using this email",
          },
          { status: 400 }
        );
      } else {
        // If user exists but is not verified → update details and resend verification
        const hashedPassword = await bcrypt.hash(password, 10); // Hash password
        existingUserVerifiedByEmail.password = hashedPassword;  // Update password
        existingUserVerifiedByEmail.verifyCode = verifyCode;    // Update OTP
        existingUserVerifiedByEmail.verifyCodeExpiry = new Date(Date.now() + 3600 * 1000);  // Set verification code expiry time to 1 hour (3600 seconds * 1000 ms) from now
        await existingUserVerifiedByEmail.save(); // Save changes to DB
      }
    } else {
      // If no user exists with this email → create new unverified account
      const hashedPassword = await bcrypt.hash(password, 10);
      const expiryDate = new Date();
      expiryDate.setHours(expiryDate.getHours() + 1); // Set expiry time (1hr from now)

      const newUser = new UserModel({
        username,
        email,
        password: hashedPassword,
        verifyCode,
        verifyCodeExpiry: expiryDate,
        isVerified: false,
        isAcceptingMessage: true,
        messages: [],
      });
      await newUser.save(); // Save new user in DB
    }

    // Send verification email to user
    const emailResponse = await sendVerificationEmail(
      email,
      username,
      verifyCode
    );

    // If email failed to send → return error
    if (!emailResponse.success) {
      return Response.json(
        {
          success: false,
          message: emailResponse.message,
        },
        { status: 500 }
      );
    }

    // If everything is fine → confirm success
    return Response.json(
      {
        success: true,
        message: "User registered successfully. Please verify your email",
      },
      { status: 200 } // ⚠ should be 200 (OK), not 500
    );
  } catch (error) {
    // Catch any unexpected error in registration flow
    console.error("Error registering the user", error);
    return Response.json(
      {
        success: false,
        message: "Error registering the user",
      },
      {
        status: 500, // Internal server error
      }
    );
  }
}
