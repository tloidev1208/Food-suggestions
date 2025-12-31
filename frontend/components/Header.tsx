"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import SearchBar from "./Search";

const Header = () => {
  const router = useRouter();
  const [user, setUser] = useState<{ name: string; avatar?: string } | null>(null);
 
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);



 const handleLogout = async () => {
  try {
    const token = localStorage.getItem("token");

    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Xóa client state
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);

    router.push("/sign-in");
  } catch (error) {
    console.error("Logout thất bại:", error);

    // fallback: vẫn logout client-side
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    router.push("/sign-in");
  }
};


  return (
    <nav className="bg-gray-50 py-2 fixed top-0 left-0 w-full z-50">
      <div className="relative flex justify-between items-center max-w-7xl mx-auto px-4">
        {/* Logo bên trái */}
        <Link href="/" className="text-3xl font-bold z-20">
          <span className="text-gray-50">NutriAI</span>
        </Link>
        <SearchBar />
        {/* User info bên phải */}
        <div className="hidden lg:flex gap-4 z-10 items-center">
          <div className="bg-white border border-gray-200 rounded-xl px-4 py-2 flex items-center gap-3 shadow">
            {user ? (
              <>
                <Avatar>
                  <AvatarImage
                    src={user.avatar || "https://randomuser.me/api/portraits/men/32.jpg"}
                    alt={user.name}
                  />
                  <AvatarFallback>{user.name?.[0] || "U"}</AvatarFallback>
                </Avatar>
                <p className="text-red-500 font-semibold">Xin chào, {user.name}!</p>
                <button
                  className="px-2 py-1 border border-red-500 text-red-500 rounded cursor-pointer hover:bg-red-50 flex items-center gap-2"
                  onClick={handleLogout} // <-- gọi hàm logout ở đây
                >
                  <LogOut className="w-5 h-5" />
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
      </div>
    </nav>
  );
};

export default Header;
