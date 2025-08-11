"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X, LogOut } from "lucide-react"; // Icon hamburger và close
import { usePathname } from "next/navigation";
import Image from "next/image";
const Header = () => {
  const [user, setUser] = useState<{ name: string } | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [serviceOpen, setServiceOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <nav className="bg-white pt-4 fixed top-0 left-0 w-full z-50">
      <div className="relative flex justify-between items-center max-w-7xl mx-auto px-4">
        {/* Logo bên trái */}
        <Link href="/" className="text-3xl font-bold z-20">
          <span className="text-gray-900">🍜SnapTo</span>
          <span className="text-red-500">Eat.</span>
        </Link>
        <button
          className="lg:hidden z-20"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
        <div className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2 gap-20 z-10">
          <Link
            href="/"
            className={`text-lg font-normal hover:text-red-500 ${
              pathname === "/" ? "text-red-500 font-bold  " : ""
            }`}
          >
            Trang chủ
          </Link>
          <div className="relative">
            <button
              className={`text-lg font-normal hover:text-red-500 flex items-center gap-1 cursor-pointer ${
                pathname.startsWith("/services") ? "text-red-500 font-bold" : ""
              }`}
              type="button"
              onClick={() => setServiceOpen((v) => !v)} // Chỉ dùng click để mở/đóng
              aria-haspopup="true"
              aria-expanded={serviceOpen}
            >
              <Image
                src="/images/ai-technology.png"
                alt="Trợ lý AI"
                width={20}
                height={20}
              />
              Trợ lý AI
              <svg width="16" height="16" fill="currentColor" className="ml-1">
                <path d="M4 6l4 4 4-4" />
              </svg>
            </button>
            {serviceOpen && (
              <div
                className="absolute left-0 top-full mt-2 bg-white border rounded shadow-lg min-w-[200px] z-20"
                onMouseLeave={() => setServiceOpen(false)}
              >
                <Link
                  href="/recipes"
                  className="block px-4 py-2 hover:bg-gray-100"
                  onClick={() => setServiceOpen(false)}
                >
                  Nhận diện món ăn
                </Link>
                <hr className="border-gray-200" />
                <Link
                  href="/services/ke-hoach-bua-an"
                  className="block px-4 py-2 hover:bg-gray-100"
                  onClick={() => setServiceOpen(false)}
                >
                  Phân tích món ăn
                </Link>
                 <hr className="border-gray-200" />
                <Link
                  href="/services/tu-van-dinh-duong"
                  className="block px-4 py-2 hover:bg-gray-100"
                  onClick={() => setServiceOpen(false)}
                >
                  Tư vấn dinh dưỡng
                </Link>
                 <hr className="border-gray-200" />
                <Link
                  href="/meal"
                  className="block px-4 py-2 hover:bg-gray-100"
                  onClick={() => setServiceOpen(false)}
                >
                  Lập kế hoạch bữa ăn
                </Link>
              </div>
            )}
          </div>
          <Link
            href="/blog"
            className={`text-lg font-normal hover:text-red-500 ${
              pathname.startsWith("/blog") ? "text-red-500 font-bold  " : ""
            }`}
          >
            Blog
          </Link>
          <Link
            href="/contact"
            className={`text-lg font-normal hover:text-red-500 ${
              pathname.startsWith("/contact") ? "text-red-500 font-bold  " : ""
            }`}
          >
            Về chúng tôi
          </Link>
        </div>

        {/* Bên phải (desktop) */}
        <div className="hidden lg:flex gap-4 z-10 items-center">
          {user ? (
            <>
              <p className="text-red-500 font-semibold">
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
                <button className="px-4 py-2 border border-red-600 text-red-500 rounded-full hover:bg-green-50">
                  Đăng nhập
                </button>
              </Link>
              <Link href="/sign-up">
                <button className="px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600">
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
            className={`block text-lg font-medium hover:text-red-500 ${
              pathname === "/" ? "text-red-500 font-bold  " : ""
            }`}
            onClick={() => setMenuOpen(false)}
          >
            Trang chủ
          </Link>
          <Link
            href="/recipes"
            className={`block text-lg font-medium hover:text-red-500 ${
              pathname.startsWith("/recipes") ? "text-red-500 font-bold  " : ""
            }`}
            onClick={() => setMenuOpen(false)}
          >
            Gợi ý công thức
          </Link>
          <Link
            href="/blog"
            className={`block text-lg font-medium hover:text-red-500 ${
              pathname.startsWith("/blog") ? "text-red-500 font-bold  " : ""
            }`}
            onClick={() => setMenuOpen(false)}
          >
            Blog
          </Link>
          <div className="relative">
            <button
              className={`text-lg font-normal hover:text-red-500 flex items-center gap-1 ${
                pathname.startsWith("/services") ? "text-red-500 font-bold" : ""
              }`}
              type="button"
              onClick={() => setServiceOpen((v) => !v)}
            >
              Dịch vụ
              <svg width="16" height="16" fill="currentColor" className="ml-1">
                <path d="M4 6l4 4 4-4" />
              </svg>
            </button>
            {serviceOpen && (
              <div className="pl-4 mt-2 space-y-2 ">
                <Link
                  href="/services/nhan-dien-anh"
                  className="block py-2 hover:text-red-500"
                  onClick={() => {
                    setServiceOpen(false);
                    setMenuOpen(false);
                  }}
                >
                  Nhận diện ảnh món ăn
                </Link>
                <Link
                  href="/services/tu-van-dinh-duong"
                  className="block py-2 hover:text-red-500"
                  onClick={() => {
                    setServiceOpen(false);
                    setMenuOpen(false);
                  }}
                >
                  Tư vấn dinh dưỡng
                </Link>
                <Link
                  href="/services/ke-hoach-bua-an"
                  className="block py-2 hover:text-red-500"
                  onClick={() => {
                    setServiceOpen(false);
                    setMenuOpen(false);
                  }}
                >
                  Kế hoạch bữa ăn
                </Link>
              </div>
            )}
          </div>

          {user ? (
            <>
              <div className="flex items-center justify-between">
                <p className="text-red-500 font-semibold">
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
                <button className="w-full text-left px-4 py-2 border border-green-600 text-red-500 rounded hover:bg-green-50">
                  Đăng nhập
                </button>
              </Link>
              <Link href="/sign-up" onClick={() => setMenuOpen(false)}>
                <button className="w-full text-left px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
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
