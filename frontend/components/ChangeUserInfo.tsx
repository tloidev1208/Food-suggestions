"use client";

import { useEffect, useState } from "react";
import { Pencil, Check, X } from "lucide-react";

interface User {
  id: string;
  name: string;
  email: string;
}

const UpdateUserInfo = () => {
  const [user, setUser] = useState<User | null>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [editingField, setEditingField] = useState<"name" | "email" | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Lấy user từ localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      setUser(parsed);
      setName(parsed.name);
      setEmail(parsed.email);
    }
  }, []);

  if (!user) return <p className="p-6">Không tìm thấy user</p>;

  const hasChanged =
    name !== user.name || email !== user.email;

  // Huỷ chỉnh sửa
  const handleCancel = () => {
    setName(user.name);
    setEmail(user.email);
    setEditingField(null);
    setMessage("");
  };

  // Lưu thay đổi
  const handleSave = async () => {
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch
        (`${process.env.NEXT_PUBLIC_API_URL}/user/update/${user.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email }),
        }
      );

      const data = await res.json();

      if (!res.ok) throw new Error("Cập nhật thất bại");

      const updatedUser = {
        id: data.user._id,
        name: data.user.name,
        email: data.user.email,
      };

      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
      setEditingField(null);
      setMessage("✅ Đã lưu thay đổi");
    } catch (error: any) {
      setMessage(`❌ ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-10 bg-white rounded-lg shadow space-y-5">
      <h2 className="text-2xl font-semibold">
        Thay đổi thông tin cá nhân
      </h2>

      {/* USER ID */}
      <div className="hidden">
        <label className="text-sm font-medium">User ID</label>
        <input
          value={user.id}
          disabled
          className="w-full mt-1 px-3 py-2 border rounded bg-gray-100 text-sm"
        />
      </div>

      {/* NAME */}
      <div>
        <label className="text-sm font-medium">Tên</label>
        <div className="relative mt-1">
          <input
            value={name}
            readOnly={editingField !== "name"}
            onChange={(e) => setName(e.target.value)}
            className={`w-full px-3 py-2 border rounded pr-10 ${
              editingField === "name"
                ? "bg-white"
                : "bg-gray-100 cursor-not-allowed"
            }`}
          />
          <Pencil
            size={16}
            onClick={() => setEditingField("name")}
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-black"
          />
        </div>
      </div>

      {/* EMAIL */}
      <div>
        <label className="text-sm font-medium">Email</label>
        <div className="relative mt-1">
          <input
            value={email}
            readOnly={editingField !== "email"}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full px-3 py-2 border rounded pr-10 ${
              editingField === "email"
                ? "bg-white"
                : "bg-gray-100 cursor-not-allowed"
            }`}
          />
          <Pencil
            size={16}
            onClick={() => setEditingField("email")}
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-black"
          />
        </div>
      </div>

      {/* CONFIRM SAVE */}
      {hasChanged && (
        <div className="flex items-center justify-between bg-yellow-50 p-3 rounded">
          <p className="text-sm">
            Bạn có muốn lưu thay đổi không?
          </p>

          <div className="flex gap-2">
            <button
              onClick={handleSave}
              disabled={loading}
              className="flex items-center gap-1 px-3 py-1 cursor-pointer bg-black text-white rounded text-sm"
            >
              <Check size={14} />
              Lưu
            </button>
            <button
              onClick={handleCancel}
              className="flex items-center cursor-pointer gap-1 px-3 py-1 border rounded text-sm"
            >
              <X size={14} />
              Huỷ
            </button>
          </div>
        </div>
      )}

      {message && (
        <p className="text-sm text-center">{message}</p>
      )}
    </div>
  );
};

export default UpdateUserInfo;
