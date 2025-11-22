"use client";
import React, { useState } from "react";
import { User, Moon, Sun, LogOut, Settings, Lock, Globe } from "lucide-react";
import Image from "next/image";

const SettingPage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState("vi");
  const [user, setUser] = useState({
    name: "Nguyễn Văn A",
    email: "nva@example.com",
    avatar: "/images/avatar-default.png",
  });
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const handleThemeToggle = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark", !darkMode);
  };

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Cập nhật thông tin thành công!");
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setUser({ ...user, avatar: imageURL });
    }
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwords.new !== passwords.confirm) {
      alert("Mật khẩu xác nhận không khớp!");
      return;
    }
    alert("Đổi mật khẩu thành công!");
    setPasswords({ current: "", new: "", confirm: "" });
  };

  const handleLogout = () => {
    alert("Đăng xuất thành công!");
  };

  return (
    <div
      className={`flex flex-col items-center justify-start min-h-screen px-6 py-10 mt-24 transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-white" : " text-gray-800"
      }`}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <Settings className="w-7 h-7 text-red-500" />
        <h1 className="text-3xl font-bold text-red-500">Cài đặt</h1>
      </div>

      {/* Thông tin tài khoản */}
      <div
        className={`w-full max-w-2xl rounded-2xl shadow-md p-6 mb-8 ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
          <User className="w-5 h-5 text-red-500" />
          Thông tin tài khoản
        </h2>

        <form onSubmit={handleUpdateProfile} className="space-y-4">
          <div className="flex items-center gap-6">
            <div className="relative">
              <Image
                src={user.avatar}
                alt="Avatar"
                width={90}
                height={90}
                className="rounded-full border border-gray-300 object-cover"
              />
              <label className="absolute bottom-0 right-0 bg-red-500 text-white text-xs px-2 py-1 rounded cursor-pointer">
                Đổi
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
              </label>
            </div>

            <div className="flex-1 space-y-3">
              <div>
                <label className="block text-sm font-medium mb-1">Họ tên</label>
                <input
                  type="text"
                  value={user.name}
                  onChange={(e) => setUser({ ...user, name: e.target.value })}
                  className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400 ${
                    darkMode
                      ? "bg-gray-700 border-gray-600"
                      : "border-gray-300"
                  }`}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400 ${
                    darkMode
                      ? "bg-gray-700 border-gray-600"
                      : "border-gray-300"
                  }`}
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-4 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
          >
            Cập nhật thông tin
          </button>
        </form>
      </div>

      {/* Đổi mật khẩu */}
      <div
        className={`w-full max-w-2xl rounded-2xl shadow-md p-6 mb-8 ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
          <Lock className="w-5 h-5 text-red-500" />
          Thay đổi mật khẩu
        </h2>

        <form onSubmit={handleChangePassword} className="space-y-3">
          <input
            type="password"
            placeholder="Mật khẩu hiện tại"
            value={passwords.current}
            onChange={(e) =>
              setPasswords({ ...passwords, current: e.target.value })
            }
            className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400 ${
              darkMode ? "bg-gray-700 border-gray-600" : "border-gray-300"
            }`}
          />

          <input
            type="password"
            placeholder="Mật khẩu mới"
            value={passwords.new}
            onChange={(e) =>
              setPasswords({ ...passwords, new: e.target.value })
            }
            className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400 ${
              darkMode ? "bg-gray-700 border-gray-600" : "border-gray-300"
            }`}
          />

          <input
            type="password"
            placeholder="Xác nhận mật khẩu mới"
            value={passwords.confirm}
            onChange={(e) =>
              setPasswords({ ...passwords, confirm: e.target.value })
            }
            className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400 ${
              darkMode ? "bg-gray-700 border-gray-600" : "border-gray-300"
            }`}
          />

          <button
            type="submit"
            className="w-full mt-2 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
          >
            Đổi mật khẩu
          </button>
        </form>
      </div>

      {/* Ngôn ngữ */}
      <div
        className={`w-full max-w-2xl rounded-2xl shadow-md p-6 mb-8 ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
          <Globe className="w-5 h-5 text-red-500" />
          Ngôn ngữ
        </h2>

        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400 ${
            darkMode ? "bg-gray-700 border-gray-600" : "border-gray-300"
          }`}
        >
          <option value="vi">Tiếng Việt</option>
          <option value="en">English</option>
        </select>
      </div>

      {/* Chế độ sáng / tối */}
      <div
        className={`w-full max-w-2xl rounded-2xl shadow-md p-6 mb-8 ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
          {darkMode ? (
            <Moon className="w-5 h-5 text-yellow-400" />
          ) : (
            <Sun className="w-5 h-5 text-yellow-400" />
          )}
          Giao diện
        </h2>

        <div className="flex items-center justify-between">
          <span>Chế độ tối</span>
          <button
            onClick={handleThemeToggle}
            className={`w-14 h-7 rounded-full flex items-center transition-all ${
              darkMode
                ? "bg-gray-600 justify-end"
                : "bg-gray-300 justify-start"
            }`}
          >
            <span className="w-5 h-5 bg-white rounded-full shadow transform transition-transform"></span>
          </button>
        </div>
      </div>

      {/* Đăng xuất */}
      <div
        className={`w-full max-w-2xl rounded-2xl shadow-md p-6 text-center ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <button
          onClick={handleLogout}
          className="flex items-center justify-center gap-2 text-red-500 hover:text-red-600 font-medium"
        >
          <LogOut className="w-5 h-5" /> Đăng xuất
        </button>
      </div>
    </div>
  );
};

export default SettingPage;
