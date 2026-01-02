"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Recipe } from "@/app/types/recipe";

interface RecipeModalProps {
  recipe: Recipe | null;
  onClose: () => void;
}

export default function RecipeModal({ recipe, onClose }: RecipeModalProps) {
  const router = useRouter();

  if (!recipe) return null;

  const handleViewDetail = () => {
    onClose();
    router.push(`/food/recipe/${recipe._id}`);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 max-w-lg w-full shadow-lg relative">
        {/* ❌ CLOSE */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-black text-xl"
        >
          ✕
        </button>

        {/* 🏷 TITLE */}
        <h2 className="text-2xl font-bold mb-3">{recipe.name}</h2>

        {/* 🖼 IMAGE */}
        <div className="relative w-full h-64 rounded-xl overflow-hidden mb-4">
          <Image
            src={recipe.image || "/images/placeholder-food.jpg"}
            alt={recipe.name}
            fill
            className="object-cover"
          />
        </div>

        {/* ⏱ COOK TIME */}
        <p className="text-gray-700">
          <strong>⏱ Thời gian nấu:</strong> {recipe.cook_time}
        </p>

        {/* 🧄 INGREDIENTS */}
        <h3 className="mt-4 font-semibold text-lg">Nguyên liệu</h3>
        <p className="text-gray-700 text-sm">
          {recipe.ingredients?.join(", ")}
        </p>

        {/* 👩‍🍳 INSTRUCTIONS */}
        <h3 className="mt-4 font-semibold text-lg">Cách làm</h3>
        <p className="text-gray-800 text-sm whitespace-pre-line max-h-40 overflow-y-auto pr-1">
          {recipe.instructions}
        </p>

        {/* 🍎 NUTRITION */}
        {recipe.nutrition && (
          <>
            <h3 className="mt-4 font-semibold text-lg">Dinh dưỡng</h3>
            <p className="text-sm text-gray-700">
              🔥 {recipe.nutrition.calories} · 💪{" "}
              {recipe.nutrition.protein} · 🥑 {recipe.nutrition.fat} · 🍞{" "}
              {recipe.nutrition.carbs}
            </p>
          </>
        )}

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
