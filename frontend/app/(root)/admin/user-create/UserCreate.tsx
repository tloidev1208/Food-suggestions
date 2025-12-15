"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
interface Post {
  _id?: string;
  user: string;
  foodId: string;
  foodName: string;
  content: string;
  createdAt: string;
  imageUrl: string;
}

export default function UserCreate() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  // --- STATE CHO SỬA BÀI VIẾT ---
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [editFoodName, setEditFoodName] = useState("");
  const [editContent, setEditContent] = useState("");
  const [editImage, setEditImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

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

      // dedupe by _id if available, otherwise by composite key foodId+createdAt
      const map = new Map<string, Post>();
      (data || []).forEach((p: Post) => {
        const key = p._id ?? `${p.foodId}-${p.createdAt}`;
        if (!map.has(key)) map.set(key, p);
      });
      const unique = Array.from(map.values());
      setPosts(unique);
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
    if (!confirm("Bạn có chắc muốn xóa bài viết này?")) return;

    try {
      const res = await fetch(
         `${process.env.NEXT_PUBLIC_API_URL}/posts/food/${foodId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!res.ok) {
        alert("Xóa thất bại!");
        return;
      }

      setPosts((prev) => prev.filter((p) => p.foodId !== foodId));
      alert("Xóa bài viết thành công!");
    } catch (err) {
      console.error(err);
      alert("Lỗi kết nối server!");
    }
  };

  // ---------------------------
  // MỞ POPUP SỬA BÀI VIẾT
  // ---------------------------
  const handleEdit = (foodId: string) => {
    const post = posts.find((p) => p.foodId === foodId);
    if (!post) return;

    setEditingPost(post);
    setEditFoodName(post.foodName);
    setEditContent(post.content);
    setPreviewImage(post.imageUrl);
    setEditImage(null);
  };

  // ---------------------------
  // GỬI API CẬP NHẬT
  // ---------------------------
  const submitEdit = async () => {
    if (!editingPost) return;

    const formData = new FormData();
    formData.append("foodName", editFoodName);
    formData.append("content", editContent);

    if (editImage) {
      formData.append("image", editImage);
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/posts/food/${editingPost.foodId}`,
        {
          method: "PUT",
          body: formData,
        }
      );

      if (!res.ok) {
        alert("Cập nhật thất bại!");
        return;
      }

      alert("Cập nhật thành công!");

      // Load lại danh sách
      fetchPosts();
      setEditingPost(null);
    } catch (error) {
      console.error("Lỗi khi cập nhật:", error);
      alert("Lỗi kết nối server!");
    }
  };

  return (
    <div className="">

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
              {posts.map((post, idx) => {
                const rowKey =
                  post._id ?? `${post.foodId}-${post.createdAt ?? idx}`;
                return (
                  <tr key={rowKey} className="hover:bg-gray-50">
                    <td className="p-3 border">
                      <Image
                       src={post.imageUrl}
                        alt={post.foodName}
                        width={300}
                        height={200}
                         className="w-20 h-20 object-cover rounded-md"
                      />
                    </td>
                    <td className="p-3 border font-semibold">
                      {post.foodName}
                    </td>
                    <td className="p-3 border max-w-[200px] truncate">
                      {post.content}
                    </td>
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
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* ----------------------- */}
      {/* FORM SỬA BÀI VIẾT (POPUP) */}
      {/* ----------------------- */}
      {editingPost && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-[450px] shadow-lg">
            <h2 className="text-xl font-bold mb-4">Sửa bài viết</h2>

            <label className="block mb-2 font-semibold">Tên món</label>
            <input
              className="w-full border px-3 py-2 rounded mb-4"
              value={editFoodName}
              onChange={(e) => setEditFoodName(e.target.value)}
            />

            <label className="block mb-2 font-semibold">Nội dung</label>
            <textarea
              className="w-full border px-3 py-2 rounded mb-4"
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
            />

            <label className="block mb-2 font-semibold">Ảnh mới</label>
            <input
              type="file"
              className="mb-4"
              onChange={(e) => {
                const file = e.target.files?.[0] || null;
                setEditImage(file);
                if (file) setPreviewImage(URL.createObjectURL(file));
              }}
            />

            {previewImage && (
              <Image
                alt="Preview"
                width={400}
                height={160}
                src={previewImage}
                className="w-full h-40 object-cover rounded mb-4"
              />
            )}

            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 bg-gray-300 rounded"
                onClick={() => setEditingPost(null)}
              >
                Hủy
              </button>

              <button
                className="px-4 py-2 bg-blue-600 text-white rounded"
                onClick={submitEdit}
              >
                Lưu thay đổi
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
