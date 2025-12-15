"use client";

import Image from "next/image";
import { Recipe } from "@/app/types/recipe";
import { Heart } from "lucide-react";
import { useState } from "react";

interface RecipeModalProps {
  recipe: Recipe | null;
  onClose: () => void;
}

export default function RecipeModal({ recipe, onClose }: RecipeModalProps) {
  if (!recipe) return null;

  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(recipe.likes ?? 0);

  const handleLike = () => {
    setLiked(!liked);
    setLikes((prev) => (liked ? prev - 1 : prev + 1));
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 max-w-lg w-full shadow-lg relative">
        {/* Nút đóng */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-black"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-3">{recipe.name}</h2>

        <div className="relative w-full h-64 rounded-xl overflow-hidden mb-4">
          <Image
            src={recipe.image}
            alt={recipe.name}
            fill
            className="object-cover"
          />
        </div>

        <p>
          <strong>⏱ Thời gian nấu:</strong> {recipe.cook_time}
        </p>

        <h3 className="mt-4 font-semibold text-lg">Nguyên liệu</h3>
        <p className="text-gray-700">{recipe.ingredients?.join(", ")}</p>

        <h3 className="mt-4 font-semibold text-lg">Cách làm</h3>
        <p className="text-gray-800 text-sm whitespace-pre-line max-h-40 overflow-y-auto pr-1">
          {recipe.instructions}
        </p>

        <h3 className="mt-4 font-semibold text-lg">Dinh dưỡng</h3>
        <p>
          🔥 Calories: {recipe.nutrition?.calories}, 💪 Protein:{" "}
          {recipe.nutrition?.protein}, 🥑 Fat: {recipe.nutrition?.fat}, 🍞
          Carbs: {recipe.nutrition?.carbs}
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
