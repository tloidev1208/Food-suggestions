"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Post } from "@/app/types/post";

interface PostModalProps {
  post: Post | null;
  onClose: () => void;
}

export default function PostModal({ post, onClose }: PostModalProps) {
  const router = useRouter();

  if (!post) return null;

  const handleViewDetail = () => {
    onClose();
    router.push(`/food/post/${post.foodId}`);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md p-5 rounded-xl shadow-xl relative">
        {/* ❌ CLOSE */}
        <button
          onClick={onClose}
          className="absolute right-3 top-3 text-gray-600 hover:text-black text-xl"
        >
          ✕
        </button>

        {/* 🖼 IMAGE */}
        <div className="relative w-full h-48 rounded-lg overflow-hidden mb-4">
          <Image
            src={post.imageUrl || "/images/placeholder-food.jpg"}
            alt={post.foodName || "food"}
            fill
            className="object-cover"
          />
        </div>

        {/* 🏷 TITLE */}
        <h2 className="text-xl font-bold mb-1">{post.foodName}</h2>

        {/* 👤 USER */}
        <p className="text-sm italic text-gray-600 mb-2">
          Đăng bởi: {post.user}
        </p>

        {/* 🧄 INGREDIENT */}
        <div className="text-gray-800 text-sm mb-2">
          <strong>Nguyên liệu:</strong> {post.ingredient}
        </div>

        {/* 📝 CONTENT */}
        <div className="text-gray-800 text-sm whitespace-pre-line max-h-40 overflow-y-auto pr-1">
          {post.content}
        </div>

        {/* 🕒 DATE */}
        <p className="text-[11px] text-gray-500 mt-3">
          Ngày đăng:{" "}
          {post.createdAt
            ? new Date(post.createdAt).toLocaleString()
            : "—"}
        </p>

        <hr className="my-4" />

        {/* 👉 VIEW DETAIL */}
        <button
          onClick={handleViewDetail}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition cursor-pointer"
        >
          Xem chi tiết
        </button>
      </div>
    </div>
  );
}
