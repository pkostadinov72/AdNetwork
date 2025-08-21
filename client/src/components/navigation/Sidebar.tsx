import { Link, useLocation } from "react-router-dom";
import { Home, PlusSquare, Search, User } from "lucide-react";
import { useAppSelector } from "@/store/redux-hooks/useAppSelector";

export const Sidebar = () => {
  const location = useLocation();
  const username = useAppSelector((state) => state.auth.user?.username);

  const navItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: Search, label: "Search", path: "/search" },
    { icon: PlusSquare, label: "Create", path: "/posts/create" },
    { icon: User, label: "Profile", path: `/profile/${username}` }
  ];

  return (
    <>
      <div className="hidden md:block w-[275px] border-r border-gray-200 bg-white h-screen sticky top-0">
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-8">AdNetwork</h1>
          <nav className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-4 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? "bg-gray-100 text-black"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <Icon size={24} />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 md:hidden">
        <nav className="flex justify-around p-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center text-xs transition-colors ${
                  isActive ? "text-black" : "text-gray-500"
                }`}
              >
                <Icon size={22} />
                <span className="mt-1">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
};
