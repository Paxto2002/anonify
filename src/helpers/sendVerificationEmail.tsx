import nodemailer from "nodemailer";
import { render } from "@react-email/render";
import VerificationEmail from "../../emails/verificationEmail";

export async function sendVerificationEmail(
  to: string,
  username: string,
  code: string
): Promise<{ success: boolean; message: string }> {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Await render() to get a string instead of Promise<string>
    const html = await render(<VerificationEmail username={username} verifyCode={code} />);

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to,
      subject: "Anonify - Verify your email",
      html,
    });

    return { success: true, message: "Email sent successfully" };
  } catch (error) {
    console.error("Error sending verification email:", error);
    return { success: false, message: "Failed to send verification email" };
  }
}
