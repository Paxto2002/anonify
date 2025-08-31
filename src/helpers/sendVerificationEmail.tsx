import * as React from "react";
import { resend } from "@/lib/resend";
import { VerificationEmail } from "../../emails/verificationEmail";
import { render } from "@react-email/render";
import { ApiResponse } from "@/types/ApiResponse";

export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string
): Promise<ApiResponse> {
  try {
    // Convert React component → HTML string
    const emailHtml = await render(
      <VerificationEmail username={username} verifyCode={verifyCode} />
    );

    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Annonify | Verification Code",
      html: emailHtml, // ✅ now it's a string
    });

    return { success: true, message: "Succeeded to send verification email" };
  } catch (emailError) {
    console.error("Error sending verification email", emailError);
    return { success: false, message: "Failed to send verification email" };
  }
}
