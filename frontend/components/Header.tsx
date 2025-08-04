"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X, LogOut } from "lucide-react"; // Icon hamburger và close
import { usePathname } from "next/navigation";
const Header = () => {
  const [user, setUser] = useState<{ name: string } | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <nav className="bg-white shadow-md py-4 fixed top-0 left-0 w-full z-50">
      <div className="relative flex justify-between items-center max-w-7xl mx-auto px-4">
        {/* Logo bên trái */}
        <Link href="/" className="text-3xl font-bold text-green-600 z-20">
          🍜SnapToEat
        </Link>

        {/* Hamburger icon - hiển thị trên mobile */}
        <button
          className="lg:hidden z-20"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Menu ở giữa (desktop) */}
        <div className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2 gap-20 z-10">
          <Link
            href="/"
            className={`text-xl font-medium hover:text-green-600 ${
              pathname === "/" ? "text-green-600 font-bold  " : ""
            }`}
          >
            Trang chủ
          </Link>
          <Link
            href="/recipes"
            className={`text-xl font-medium hover:text-green-600 ${
              pathname.startsWith("/recipes")
                ? "text-green-600 font-bold  "
                : ""
            }`}
          >
            Gợi ý công thức
          </Link>
          <Link
            href="/blog"
            className={`text-xl font-medium hover:text-green-600 ${
              pathname.startsWith("/blog") ? "text-green-600 font-bold  " : ""
            }`}
          >
            Blog
          </Link>
        </div>

        {/* Bên phải (desktop) */}
        <div className="hidden lg:flex gap-4 z-10 items-center">
          {user ? (
            <>
              <p className="text-green-600 font-semibold">
                Xin chào, {user.name}!
              </p>
              <button
                className="px-1 py-1 border border-red-500 text-red-500 rounded cursor-pointer hover:bg-red-50 ml-2 flex items-center gap-2"
                onClick={() => {
                  localStorage.removeItem("user");
                  setUser(null);
                }}
              >
                <LogOut className="text-lg" />
              </button>
            </>
          ) : (
            <>
              <Link href="/sign-in">
                <button className="px-4 py-2 border border-green-600 text-green-600 rounded hover:bg-green-50">
                  Đăng nhập
                </button>
              </Link>
              <Link href="/sign-up">
                <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                  Đăng ký
                </button>
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {menuOpen && (
        <div className="lg:hidden px-4 pt-4 pb-6 bg-white shadow-md space-y-4">
          <Link
            href="/"
            className={`block text-lg font-medium hover:text-green-600 ${
              pathname === "/" ? "text-green-600 font-bold  " : ""
            }`}
            onClick={() => setMenuOpen(false)}
          >
            Trang chủ
          </Link>
          <Link
            href="/recipes"
            className={`block text-lg font-medium hover:text-green-600 ${
              pathname.startsWith("/recipes")
                ? "text-green-600 font-bold  "
                : ""
            }`}
            onClick={() => setMenuOpen(false)}
          >
            Gợi ý công thức
          </Link>
          <Link
            href="/blog"
            className={`block text-lg font-medium hover:text-green-600 ${
              pathname.startsWith("/blog") ? "text-green-600 font-bold  " : ""
            }`}
            onClick={() => setMenuOpen(false)}
          >
            Blog
          </Link>
          {user ? (
            <>
              <div className="flex items-center justify-between">
                <p className="text-green-600 font-semibold">
                  Xin chào, {user.name}!
                </p>
              </div>

              <button
                className="w-full text-left px-4 py-2 border border-red-500 text-red-500 rounded hover:bg-red-50 mt-2"
                onClick={() => {
                  localStorage.removeItem("user");
                  setUser(null);
                  setMenuOpen(false);
                }}
              >
                Đăng xuất
              </button>
            </>
          ) : (
            <>
              <Link href="/sign-in" onClick={() => setMenuOpen(false)}>
                <button className="w-full text-left px-4 py-2 border border-green-600 text-green-600 rounded hover:bg-green-50">
                  Đăng nhập
                </button>
              </Link>
              <Link href="/sign-up" onClick={() => setMenuOpen(false)}>
                <button className="w-full text-left px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                  Đăng ký
                </button>
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Header;
