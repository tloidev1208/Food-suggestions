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
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data?.message || "Đăng nhập thất bại");
    }

    localStorage.setItem("token", data.token); 
    localStorage.setItem("user", JSON.stringify(data.user)); 

    alert("Đăng nhập thành công!");
    router.push("/");
 } catch (err: unknown) {
  if (err instanceof Error) {
    alert(err.message);
  } else {
    alert("Lỗi không xác định");
  }
} finally {
  setLoading(false);
}
};


  return (
    <div className="h-screen w-screen overflow-hidden flex">
      <div
        className="hidden md:flex w-1/2 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/auth.avif')" }}
      ></div>

      <div className="w-full md:w-1/2 flex items-center justify-center bg-white">
        <div className="w-full max-w-md px-6">
          <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
            Đăng nhập
          </h2>

          <input
            type="email"
            placeholder="Nhập email của bạn"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="password"
            placeholder="Nhập mật khẩu của bạn"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <button
            onClick={handleLogin}
            disabled={loading}
            className={`w-full py-3 bg-green-600 text-white font-semibold rounded-lg transition duration-300 hover:bg-green-700 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Đang đăng nhập..." : "Tiếp tục"}
          </button>

          <p className="mt-4 text-sm text-gray-500 text-center">
            Bạn chưa có tài khoản?{" "}
            <Link href="/sign-up" className="text-green-600 hover:underline">
              Đăng ký
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signin;
