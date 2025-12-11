"use client";

import React, { useState } from "react";
import UserCreate from "./user-create/UserCreate";
import AiCreate from "./ai-create/AiCreate";

const AdminPage = () => {
  const [tab, setTab] = useState<"user" | "ai">("user");

  return (
    <div className="p-8 mt-12 flex flex-col">
      
      {/* Hàng tiêu đề + nút chuyển tab */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-700">
          Quản lý bài đăng
        </h1>

        {/* Nút chuyển tab */}
        <div className="flex gap-3">
          <button
            onClick={() => setTab("user")}
            className={`px-4 py-2 rounded-lg font-semibold ${
              tab === "user"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            User Create
          </button>

          <button
            onClick={() => setTab("ai")}
            className={`px-4 py-2 rounded-lg font-semibold ${
              tab === "ai"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            AI Create
          </button>
        </div>
      </div>

      {/* Render component theo tab */}
      {tab === "user" ? <UserCreate /> : <AiCreate />}
    </div>
  );
};

export default AdminPage;
