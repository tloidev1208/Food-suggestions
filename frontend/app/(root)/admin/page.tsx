"use client";

import React, { useEffect, useState } from "react";

interface Post {
  user: string;
  foodId: string;
  foodName: string;
  content: string;
  createdAt: string;
  imageUrl: string;
}

export default function AdminPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch dữ liệu từ API
  const fetchPosts = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setPosts(data);
    } catch (error) {
      console.error("Lỗi fetch posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Xóa bài viết
  const handleDelete = async (foodId: string) => {
   alert("Chức năng xóa sẽ làm sau\nFood ID: " + foodId);

  };

  // Sửa bài viết
  const handleEdit = (foodId: string) => {
    alert("Chức năng sửa sẽ làm sau\nFood ID: " + foodId);
  };

  return (
    <div className="p-8 mt-12">
      <h1 className="text-3xl font-bold mb-6 text-gray-700">Quản lý bài đăng</h1>

      {loading ? (
        <p className="text-gray-500">Đang tải dữ liệu...</p>
      ) : posts.length === 0 ? (
        <p className="text-gray-500">Không có dữ liệu.</p>
      ) : (
        <div className="overflow-x-auto bg-white shadow rounded-lg">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left text-gray-700">
                <th className="p-3 border">Ảnh</th>
                <th className="p-3 border">Tên món</th>
                <th className="p-3 border">Nội dung</th>
                <th className="p-3 border">Người đăng</th>
                <th className="p-3 border">Ngày tạo</th>
                <th className="p-3 border text-center">Hành động</th>
              </tr>
            </thead>

            <tbody>
              {posts.map((post) => (
                <tr key={post.foodId} className="hover:bg-gray-50">
                  <td className="p-3 border">
                    <img
                      src={post.imageUrl}
                      alt={post.foodName}
                      className="w-20 h-20 object-cover rounded-md"
                    />
                  </td>
                  <td className="p-3 border font-semibold">{post.foodName}</td>
                  <td className="p-3 border">{post.content}</td>
                  <td className="p-3 border">{post.user}</td>
                  <td className="p-3 border">
                    {new Date(post.createdAt).toLocaleString()}
                  </td>
                  <td className="p-3 border text-center">
                    <button
                      className="px-3 py-1 bg-blue-500 text-white rounded-md mr-2 hover:bg-blue-600"
                      onClick={() => handleEdit(post.foodId)}
                    >
                      Sửa
                    </button>

                    <button
                      className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                      onClick={() => handleDelete(post.foodId)}
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
