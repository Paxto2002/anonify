// emails/VerificationEmail.tsx
import * as React from "react";

interface VerificationEmailProps {
    username: string;
    verifyCode: string;
}

export default function VerificationEmail({ username, verifyCode }: VerificationEmailProps) {
    return (
        <div style={{ fontFamily: "Arial, sans-serif", lineHeight: 1.5 }}>
            <h2>Welcome to Anonify, {username}!</h2>
            <p>Here is your verification code:</p>
            <div
                style={{
                    fontSize: "22px",
                    fontWeight: "bold",
                    padding: "10px",
                    background: "#f0f0f0",
                    border: "1px dashed #6C63FF",
                    textAlign: "center",
                }}
            >
                {verifyCode}
            </div>
            <p>This code will expire in 1 hour.</p>
            <p>If you did not request this, please ignore this email.</p>
        </div>
    );
}
