// app/(auth)/layout.tsx
import AuthProvider from "@/context/AuthProvider";
import LayoutWrapper from "../(app)/LayoutWrapper";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <LayoutWrapper>{children}</LayoutWrapper>
    </AuthProvider>
  );
}
