import Link from 'next/link';
import React from 'react';

const Header = () => {
  return (
    <nav className="bg-white shadow-md py-4 fixed top-0 left-0 w-full z-50">
      <div className="relative flex justify-between items-center max-w-7xl mx-auto px-4">
        {/* Logo bên trái */}
        <Link href="/" className="text-3xl font-bold text-green-600 z-10">🍳 AI FOOD</Link>

        {/* Menu ở giữa */}
        <div className="absolute left-1/2 transform -translate-x-1/2 flex gap-20 z-10">
          <Link href="/" className="text-xl font-medium hover:text-green-600">Trang chủ</Link>
          <Link href="/recipes" className="text-xl font-medium hover:text-green-600">Gợi ý công thức</Link>
          <Link href="/contact" className="text-xl font-medium hover:text-green-600">Blog</Link>
        </div>

        {/* Buttons bên phải */}
        <div className="flex gap-4 z-10">
          <Link href="/login">
            <button className="px-4 py-2 border border-green-600 text-green-600 rounded hover:bg-green-50">Đăng nhập</button>
          </Link>
          <Link href="/register">
            <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">Đăng ký</button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;
