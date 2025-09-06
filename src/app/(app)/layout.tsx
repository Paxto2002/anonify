// app/(app)/layout.tsx
import DashboardNavbar from '@/components/DashboardNavbar';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
            <main className="flex-1">
                {children}
            </main>
        </div>
    );
}