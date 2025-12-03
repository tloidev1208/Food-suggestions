"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Home,
  Settings,
  Bot,
  Activity,
  BookOpen,
  Mail,
  ChevronLeft,
  ChevronRight,
  Utensils,
  Flame,
  User,
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  toggle: () => void;
}

// định nghĩa kiểu user thay vì dùng `any`
interface UserType {
  id?: string;
  name?: string;
  avatar?: string;
  [key: string]: unknown;
}

const BASE_NAV_ITEMS = [
  { href: "/", icon: Home, label: "Trang chủ" },
  { href: "/services", icon: Bot, label: "Trợ Lý AI", hot: true },
  { href: "/activities", icon: Activity, label: "Vận Động", new: true },
  { href: "/blog", icon: BookOpen, label: "Chia sẻ món ăn" },
  { href: "/contact", icon: Mail, label: "Liên hệ" },
  { href: "/settings", icon: Settings, label: "Settings" },
];

const ADMIN_ID = "692c5eb3fb0fe4bb9623ca2e";

export default function Sidebar({ isOpen, toggle }: SidebarProps) {
  const pathname = usePathname();
  const [currentUser, setCurrentUser] = useState<UserType | null>(null);

  // Load user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setCurrentUser(JSON.parse(storedUser));
  }, []);

  // Tạo mảng menu mới (không làm thay đổi mảng gốc)
  const navItems = [...BASE_NAV_ITEMS];

  // Nếu là Admin thì thêm menu Admin
  if (currentUser?.id === ADMIN_ID) {
    navItems.push({
      href: "/admin",
      icon: User,
      label: "Admin",
    });
  }

  return (
    <aside
      className={`
        fixed left-0 top-0 h-screen 
        bg-white shadow-lg border-r
        flex flex-col justify-between
        transition-all duration-300 z-50
        ${isOpen ? "w-56" : "w-20"}
      `}
    >
      {/* Logo */}
      <div className="flex items-center justify-center py-6">
        <Utensils className="w-10 h-10 text-red-500" />
        {isOpen && (
          <Link href="/" className="text-3xl font-bold">
            <span className="text-gray-900">Nutri</span>
            <span className="text-red-500">AI.</span>
          </Link>
        )}
      </div>

      {/* Menu */}
      <nav className="flex-1 p-4 flex flex-col space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${
                active
                  ? "bg-blue-500 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <div className="relative">
                <Icon className="w-6 h-6" />

                {!isOpen && item.hot && (
                  <span className="absolute -top-1 -right-1">
                    <Flame className="w-3 h-3 text-red-500" />
                  </span>
                )}
              </div>

              {isOpen && (
                <div className="flex items-center gap-2">
                  <span>{item.label}</span>

                  {item.hot && (
                    <span className="flex items-center gap-1 bg-red-50 text-red-600 px-2 py-0.5 rounded-full text-xs font-semibold">
                      <Flame className="w-3 h-3" />
                      Hot
                    </span>
                  )}

                  {item.new && (
                    <span className="flex items-center gap-1 bg-red-50 text-red-600 px-2 py-0.5 rounded-full text-xs font-semibold">
                      <Flame className="w-3 h-3" />
                      New
                    </span>
                  )}
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Toggle */}
      <button
        onClick={toggle}
        className="p-3 text-gray-600 hover:bg-gray-100 flex justify-center"
      >
        {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
      </button>
    </aside>
  );
}
