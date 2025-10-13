"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Settings, Bot, Activity, BookOpen, Mail, ChevronLeft, ChevronRight, Utensils, Flame } from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  toggle: () => void;
}

const navItems = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/services", icon: Bot, label: "Trợ Lý AI", hot: true },
  { href: "/activities", icon: Activity, label: "Vận Động" },
  { href: "/blog", icon: BookOpen, label: "Blog" },
  { href: "/contact", icon: Mail, label: "Liên hệ" },
  { href: "/settings", icon: Settings, label: "Settings" },
];

export default function Sidebar({ isOpen, toggle }: SidebarProps) {
  const pathname = usePathname();

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
          <Link href="/" className="text-3xl font-bold z-20">
            <span className="text-gray-900">Nutri</span>
            <span className="text-red-500">AI.</span>
          </Link>
        )}
      </div>

      {/* Menu items */}
      <nav className="flex-1 p-4 flex flex-col space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 p-3 rounded-xl transition-colors duration-200 ${
                active
                  ? "bg-blue-500 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <div className="relative">
                <Icon className="w-6 h-6 flex-shrink-0" />
                {/* collapsed view: small flame badge */}
                {!isOpen && item.hot && (
                  <span className="absolute -top-1 -right-1">
                    <Flame className="w-3 h-3 text-red-500" />
                  </span>
                )}
              </div>

              {isOpen && (
                <div className="flex items-center gap-2">
                  <span className="transition-opacity whitespace-nowrap">
                    {item.label}
                  </span>
                  {/* expanded view: flame label for hot item */}
                  {item.hot && (
                    <span className="flex items-center gap-1 bg-red-50 text-red-600 px-2 py-0.5 rounded-full text-xs font-semibold">
                      <Flame className="w-3 h-3" />
                      Hot
                    </span>
                  )}
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Toggle button */}
      <button
        onClick={toggle}
        className="p-3 text-gray-600 hover:bg-gray-100 flex items-center justify-center"
      >
        {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
      </button>
    </aside>
  );
}
