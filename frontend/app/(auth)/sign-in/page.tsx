"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Signin = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include", // 🔐 cookie
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Đăng nhập thất bại");
      }

      // ✅ chỉ lưu user
      localStorage.setItem("user", JSON.stringify(data.user));

      router.push("/");
    } catch (err: unknown) {
      if (err instanceof Error) alert(err.message);
      else alert("Lỗi không xác định");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-white px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Chào mừng trở lại 👋
        </h2>
        <p className="text-center text-gray-500 mb-8">
          Đăng nhập để tiếp tục sử dụng NutriAI
        </p>

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400"
          />

          <input
            type="password"
            placeholder="Mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400"
          />
        </div>

        <button
          onClick={handleLogin}
          disabled={loading}
          className={`w-full mt-6 py-3 rounded-xl bg-red-500 text-white font-semibold transition hover:bg-red-600 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Đang đăng nhập..." : "Đăng nhập"}
        </button>

        <p className="mt-6 text-center text-sm text-gray-500">
          Chưa có tài khoản?{" "}
          <Link href="/sign-up" className="text-red-500 font-medium hover:underline">
            Đăng ký ngay
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signin;
