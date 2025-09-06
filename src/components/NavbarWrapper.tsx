"use client";

import { useSession } from "next-auth/react";
import Navbar from "./Navbar";
import DashboardNavbar from "./DashboardNavbar";

export default function NavbarWrapper() {
    const { data: session, status } = useSession();

    if (status === "loading") return null;

    return session ? <DashboardNavbar /> : <Navbar />;
}
