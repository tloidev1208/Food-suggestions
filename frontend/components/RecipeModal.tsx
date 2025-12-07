"use client";

import Image from "next/image";

export default function RecipeModal({ recipe, onClose }: any) {
  if (!recipe) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 max-w-lg w-full shadow-lg relative">
        {/* nút đóng */}
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
        <p className=" text-gray-800 text-sm whitespace-pre-line max-h-40 overflow-y-auto pr-1">
          {recipe.instructions}
        </p>

        <h3 className="mt-4 font-semibold text-lg">Dinh dưỡng</h3>
        <p>
          🔥 Calories: {recipe.nutrition?.calories}, 💪 Protein:{" "}
          {recipe.nutrition?.protein}, 🥑 Fat: {recipe.nutrition?.fat}, 🍞
          Carbs: {recipe.nutrition?.carbs}
        </p>
      </div>
    </div>
  );
}
