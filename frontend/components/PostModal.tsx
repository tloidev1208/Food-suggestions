"use client";

import React from "react";
import Image from "next/image";
import { Post } from "@/app/types/post";
export default function PostModal({
  post,
  onClose,
}: {
  post: Post | null;
  onClose: () => void;
}) {
  if (!post) return null;

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
      </div>
    </div>
  );
}
