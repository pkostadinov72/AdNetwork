import ProfileCard from "@/components/profile/ProfileCard";
import { Sidebar } from "@/components/navigation/Sidebar";

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex flex-1">
        <main className="flex-1 max-w-2xl mx-auto px-4 py-6">{children}</main>
        <ProfileCard />
      </div>
    </div>
  );
};
