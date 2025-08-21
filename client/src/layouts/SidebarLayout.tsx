import { Sidebar } from "@/components/navigation/Sidebar";

export const SidebarLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="flex min-h-screen">
    <Sidebar />
    <main className="flex-1 max-w-2xl mx-auto px-4 py-6 ">{children}</main>
  </div>
);
