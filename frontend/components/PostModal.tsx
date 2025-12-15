"use client";
import Image from "next/image";
import { Post } from "@/app/types/post";
import { Heart } from "lucide-react";
import { useState } from "react";
export default function PostModal({
  post,
  onClose,
}: {
  post: Post | null;
  onClose: () => void;
}) {
  if (!post) return null;
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(post.likes ?? 0);

  const handleLike = () => {
    setLiked(!liked);
    setLikes((prev) => (liked ? prev - 1 : prev + 1));
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md p-5 rounded-xl shadow-xl relative">
        <button
          onClick={onClose}
          className="absolute right-3 top-3 text-gray-600 hover:text-black"
        >
          ✕
        </button>

        <div className="relative w-full h-48 rounded-lg overflow-hidden mb-4">
          <Image
            src={post.imageUrl}
            alt={post.foodName || "food"}
            fill
            className="object-cover"
          />
        </div>

        <h2 className="text-xl font-bold mb-1">{post.foodName}</h2>

        <p className="text-sm italic text-gray-600 mb-2">
          Đăng bởi: {post.user}
        </p>

        <div className="text-gray-800 text-sm whitespace-pre-line max-h-40 overflow-y-auto pr-1">
          {post.content}
        </div>

        <p className="text-[11px] text-gray-500 mt-3">
         Ngày đăng: {new Date(post.createdAt ?? "").toLocaleString()}

        </p>
                <hr className="my-1" />
        {/* ❤️ Footer like */}
        <div className="mt-1 flex items-center justify-between">
          {/* Lượt thích */}
          <span className="text-gray-700 font-medium">
            Lượt thích: {likes} 
          </span>

          {/* Nút tim */}
          <button
            onClick={handleLike}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"
          >
            <Heart
              className={`w-7 h-7 transition-all duration-200 ${
                liked
                  ? "fill-red-500 stroke-red-500 scale-110"
                  : "fill-white stroke-gray-400"
              }`}
            />
          </button>
        </div>  
      </div>
    </div>
  );
}
