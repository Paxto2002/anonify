import * as React from "react";
import {
    Html,
    Head,
    Preview,
    Section,
    Text,
    Heading,
    Font,
} from "@react-email/components";

interface VerificationEmailProps {
    username: string;
    verifyCode: string;
}

export const VerificationEmail: React.FC<VerificationEmailProps> = ({
    username,
    verifyCode,
}) => {
    return (
        <Html lang="en">
            <Head>
                <Font
                    fontFamily="Roboto"
                    fallbackFontFamily="Verdana"
                    webFont={{
                        url: "https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2",
                        format: "woff2",
                    }}
                />
            </Head>

            <Preview>
                Welcome to Anonify, {username}! Complete your registration.
            </Preview>

            {/* Header */}
            <Section
                style={{
                    background: "linear-gradient(90deg, #6C63FF, #00C6FF)",
                    padding: "25px",
                    textAlign: "center",
                    color: "#fff",
                }}
            >
                <Heading style={{ margin: 0, fontSize: "28px" }}>
                    Welcome to Anonify!
                </Heading>
            </Section>

            {/* Body */}
            <Section
                style={{
                    backgroundColor: "#ffffff",
                    padding: "25px",
                    borderRadius: "8px 8px 0 0",
                }}
            >
                <Text style={{ fontSize: "16px", lineHeight: "1.6" }}>
                    Hi <strong>{username}</strong>,
                </Text>

                <Text style={{ fontSize: "16px", lineHeight: "1.6" }}>
                    Thank you for joining <strong>Anonify</strong>, the platform for
                    anonymous feedback.
                </Text>

                <Section
                    style={{
                        backgroundColor: "#f0f0f0",
                        border: "1px dashed #6C63FF",
                        padding: "15px",
                        textAlign: "center",
                        margin: "20px 0",
                        borderRadius: "6px",
                    }}
                >
                    <Text
                        style={{
                            fontSize: "20px",
                            fontWeight: "bold",
                            letterSpacing: "3px",
                        }}
                    >
                        {verifyCode}
                    </Text>
                </Section>

                <Text style={{ fontSize: "16px", lineHeight: "1.6" }}>
                    Use this code to verify your account. It will expire in 1 hour.
                </Text>
            </Section>

            {/* Footer */}
            <Section
                style={{
                    backgroundColor: "#f4f6f8",
                    textAlign: "center",
                    padding: "15px",
                    fontSize: "12px",
                    color: "#888",
                    borderRadius: "0 0 8px 8px",
                }}
            >
                <Text>© {new Date().getFullYear()} Anonify. All rights reserved.</Text>
                <Text>
                    If you did not sign up for this account, please ignore this email.
                </Text>
            </Section>
        </Html>
    );
};
