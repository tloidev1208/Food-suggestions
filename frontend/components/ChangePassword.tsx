"use client";

import { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const ChangePassword = () => {
  const [userId, setUserId] = useState<string | null>(null);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Lấy userId từ localStorage
  useEffect(() => {
    const userStorage = localStorage.getItem("user");
    if (userStorage) {
      const parsedUser = JSON.parse(userStorage);
      setUserId(parsedUser.id);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) return;

    if (!currentPassword || !newPassword) {
      setMessage("❌ Vui lòng nhập đầy đủ thông tin");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/change-password/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            currentPassword,
            newPassword,
          }),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Đổi mật khẩu thất bại");

      setMessage("✅ Đổi mật khẩu thành công");
      setCurrentPassword("");
      setNewPassword("");
    } catch (error: any) {
      setMessage(`❌ ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (!userId) return <p className="p-6">Không tìm thấy user</p>;

  return (
    <div className="max-w-2xl mx-auto p-10 bg-white rounded-xl shadow space-y-6">
      <h2 className="text-2xl font-semibold">Đổi mật khẩu</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Current Password */}
        <div>
          <label className="text-sm font-medium">
            Mật khẩu hiện tại
          </label>
          <div className="relative mt-2">
            <input
              type={showCurrent ? "text" : "password"}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg pr-12"
            />
            <button
              type="button"
              onClick={() => setShowCurrent(!showCurrent)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showCurrent ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        {/* New Password */}
        <div>
          <label className="text-sm font-medium">
            Mật khẩu mới
          </label>
          <div className="relative mt-2">
            <input
              type={showNew ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg pr-12"
            />
            <button
              type="button"
              onClick={() => setShowNew(!showNew)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 "
            >
              {showNew ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-red-500 text-white rounded-lg text-md font-medium hover:bg-gray-800 disabled:opacity-50"
        >
          {loading ? "Đang xử lý..." : "Đổi mật khẩu"}
        </button>
      </form>

      {message && (
        <p className="text-sm text-center">{message}</p>
      )}
    </div>
  );
};

export default ChangePassword;
