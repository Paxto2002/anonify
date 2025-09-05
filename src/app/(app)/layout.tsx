import DashboardNavbar from "@/components/DashboardNavbar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
    return <div className="flex flex-col min-h-screen">
        <DashboardNavbar />
        {children}</div>;
}

