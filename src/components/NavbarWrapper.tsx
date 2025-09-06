// src/components/NavbarWrapper.tsx
"use client";

import { useSession } from "next-auth/react";
import Navbar from "./Navbar";
import DashboardNavbar from "./DashboardNavbar";
import { usePathname } from "next/navigation";

export default function NavbarWrapper() {
    const { data: session, status } = useSession();
    const pathname = usePathname();

    if (status === "loading") return null;

    // Show dashboard navbar only if user is signed in AND on dashboard pages
    const isDashboardPage = pathname?.startsWith("/dashboard");

    return session && isDashboardPage ? <DashboardNavbar /> : <Navbar />;
}