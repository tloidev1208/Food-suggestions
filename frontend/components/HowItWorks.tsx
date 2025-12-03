"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { RefreshCw, Sparkles } from "lucide-react";

interface Post {
  _id?: string;
  user: string;
  foodId: string;
  foodName: string;
  content?: string;
  createdAt?: string;
  imageUrl?: string;
}

export default function HowItWorks() {
  const [foodPosts, setFoodPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [suggestion, setSuggestion] = useState<Post | null>(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        setLoading(true);
        const res = await fetch("http://localhost:5000/api/posts");
        if (!res.ok) throw new Error("Fetch posts failed");
        const data = (await res.json()) as Post[];
        setFoodPosts(data || []);
        // pick initial random suggestion
        if (data && data.length > 0) {
          setSuggestion(data[Math.floor(Math.random() * data.length)]);
        }
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  const handleRandomize = () => {
    if (!foodPosts || foodPosts.length === 0) return;
    const next = foodPosts[Math.floor(Math.random() * foodPosts.length)];
    setSuggestion(next);
  };

  return (
    <div className="py-2 px-4 md:px-8 text-black max-w-7xl mx-auto">
      <div className="col-span-4 p-6 rounded-2xl bg-gradient-to-r from-orange-300 to-orange-100 flex flex-col gap-4 relative overflow-hidden">
        <h2 className="text-3xl font-bold">Nấu gì hôm nay?</h2>

        {/* gợi ý món */}
        <div className="flex items-center gap-4">
          <div className="relative w-32 h-32 rounded-xl overflow-hidden">
            {loading ? (
              <div className="w-full h-full bg-gray-200 animate-pulse" />
            ) : suggestion?.imageUrl ? (
              <Image
                src={suggestion.imageUrl}
                fill
                alt={suggestion.foodName}
                className="object-cover"
              />
            ) : (
              <Image
                src="/2.avif"
                fill
                alt="suggestion"
                className="object-cover"
              />
            )}
          </div>

          <div className="flex-grow flex flex-col">
            <p className="text-xl font-semibold leading-tight">
              Gợi ý:{" "}
              {loading
                ? "Đang tải..."
                : suggestion?.foodName || "Không có dữ liệu"}
            </p>

            {/* content mô tả món ăn */}
            {suggestion?.content && (
              <p className="text-sm text-gray-700 mt-1 line-clamp-2">
                {suggestion.content}
              </p>
            )}

            {/* người đăng */}
            {suggestion?.user && (
              <p className="text-xs text-gray-600 mt-1 italic">
                Đăng bởi: {suggestion.user}
              </p>
            )}
          </div>

          {/* button đổi món */}
          <button
            onClick={handleRandomize}
            className="px-4 py-2 flex items-center gap-2 rounded-lg cursor-pointer bg-black text-white hover:bg-gray-800 transition"
          >
            <RefreshCw size={18} /> Đổi món
          </button>
        </div>
      </div>
      <div className="grid grid-cols-4 grid-rows-1 gap-4">
        {/* ========================== THẺ 2 (dọc) ========================== */}
        <div
          className="row-span-2 row-start-2 flex flex-col items-center justify-center 
  bg-gradient-to-b from-purple-400 to-purple-200 rounded-2xl p-4 shadow-md"
        >
          <div className="flex flex-col items-center gap-1 text-white font-bold text-xl">
            <div className="flex items-center gap-2">
              <Sparkles size={20} />
              <span>Lựa</span>
            </div>
            <span>chọn</span>
            <span>bởi</span>
            <span>NutriAI</span>
          </div>
        </div>

        {/* ========================== THẺ 3 ========================== */}
        <div className="col-span-3 row-start-2 p-4">
          <FoodGrid foods={foodPosts} />
        </div>

        {/* ========================== THẺ 5 (dọc) ========================== */}
        <div
          className="row-span-2 col-start-4 row-start-4 flex flex-col items-center justify-center 
  bg-gradient-to-b from-green-400 to-green-200 rounded-2xl p-4 shadow-md"
        >
          <div className="flex flex-col items-center gap-1 text-white font-bold text-xl">
            <div className="flex items-center gap-2">
              <Sparkles size={20} />
              <span>Món</span>
            </div>
            <span>ăn</span>
            <span>mới</span>
            <span>nhất</span>
          </div>
        </div>

        {/* ========================== THẺ 6 ========================== */}
        <div className="col-span-3 col-start-1 row-start-4 p-4">
          <FoodGrid foods={foodPosts} />
        </div>
      </div>
    </div>
  );
}

/* ------------------ COMPONENT GRID MÓN ĂN ------------------- */
function FoodGrid({ foods, gridKey = "g" }: { foods: Post[]; gridKey?: string }) {
  return (
    <div>
      <div className="grid grid-cols-4 gap-4">
        {foods.map((food, idx) => {
          const stableId = food._id ?? food.foodId ?? `${food.foodName ?? "food"}-${idx}`;
          const key = `${stableId}-${gridKey}-${idx}`;
          return (
            <div key={key} className="flex flex-col items-center text-center">
              <div className="relative w-full h-48 rounded-xl overflow-hidden shadow">
                <Image
                  src={food.imageUrl || "/placeholder.jpg"}
                  fill
                  alt={food.foodName || "food"}
                  className="object-cover"
                />
              </div>

              <p className="mt-2 text-base font-semibold text-orange-700">
                {food.foodName}
              </p>

              {food.user && (
                <p className="mt-1 text-[11px] text-gray-500 italic">
                  Đăng bởi: {food.user}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
