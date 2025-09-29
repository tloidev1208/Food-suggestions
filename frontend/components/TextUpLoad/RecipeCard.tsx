// Hiển thị chi tiết một công thức
"use client";

import { useState } from "react";
import Image from "next/image";

type Nutrition = {
  calories: string;
  protein: string;
  fat: string;
  carbs: string;
};

type Recipe = {
  name: string;
  ingredients: string[];
  instructions: string;
  image: string;
  cook_time: string;
  nutrition: Nutrition;
};

type RecipeCardProps = {
  recipe: Recipe;
};

export default function RecipeCard({ recipe }: RecipeCardProps) {
  const [showSaveMenu, setShowSaveMenu] = useState(false);

  const saveToFile = () => {
    const ingredientsList = recipe.ingredients.map((item) => `- ${item}`).join("\n");
    const nutritionInfo = recipe.nutrition
      ? `\n🍽 Thông tin dinh dưỡng:
- Calories: ${recipe.nutrition.calories}
- Protein: ${recipe.nutrition.protein}
- Fat: ${recipe.nutrition.fat}
- Carbs: ${recipe.nutrition.carbs}`
      : "";

    const text = `🍳 Tên món: ${recipe.name}
⏱ Thời gian nấu: ${recipe.cook_time}

🛒 Nguyên liệu:
${ingredientsList}

👩‍🍳 Cách làm:
${recipe.instructions}${nutritionInfo}
`;
    const blob = new Blob([text], {
      type: "text/plain;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `cong-thuc-${recipe.name?.replace(/\s+/g, "-").toLowerCase() || "khong-ten"}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    setShowSaveMenu(false);
  };

  return (
    <div className="border rounded p-4 shadow">
      <h3 className="font-bold text-4xl text-center">{recipe.name}</h3>
      <Image
        src={recipe.image || "https://www.cet.edu.vn/wp-content/uploads/2018/03/ga-nuong-mat-ong.jpg"}
        alt={recipe.name}
        width={800}
        height={320}
        className="w-full h-80 object-cover mt-2 rounded"
        style={{ objectFit: "cover" }}
      />
      {recipe.nutrition && (
        <div className="flex gap-4 mt-4 justify-center">
          {[
            { icon: "🔥", label: "Lượng calo", value: recipe.nutrition.calories },
            { icon: "💪", label: "Chất đạm", value: recipe.nutrition.protein },
            { icon: "🥑", label: "Chất béo", value: recipe.nutrition.fat },
            { icon: "🍞", label: "Carbohydrate", value: recipe.nutrition.carbs },
          ].map(({ icon, label, value }) => (
            <div
              key={label}
              className="flex flex-col items-center bg-gray-50 p-4 rounded-lg w-32 shadow transform hover:-translate-y-1 transition duration-200 ease-in-out"
            >
              <span className="text-orange-500 text-xl">{icon}</span>
              <span className="text-sm text-gray-500">{label}</span>
              <span className="text-lg font-semibold">{value}</span>
            </div>
          ))}
        </div>
      )}
      <div className="p-4">
        <div className="flex items-center gap-2">
          <span className="text-red-500 text-lg">⏱</span>
          <p className="text-gray-700">
            <strong className="text-gray-900 text-xl">Thời gian nấu:</strong>{" "}
            {recipe.cook_time}
          </p>
        </div>
        <hr className="my-4" />
        <div>
          <strong className="text-gray-900 mb-1 text-xl">🛒 Nguyên liệu:</strong>
          <ul className="list-disc list-inside text-gray-700">
            {recipe.ingredients.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
        <hr className="my-4" />
        <div>
          <strong className="text-gray-900 text-xl mb-1">👩‍🍳 Cách làm:</strong>
          <p className="text-gray-700 leading-relaxed">{recipe.instructions}</p>
        </div>
        <div className="flex gap-4 pt-4">
          <button
            onClick={() => window.print()}
            className="flex-1 bg-gray-300 text-gray-900 py-2 px-4 rounded-lg hover:bg-gray-400 transition cursor-pointer"
          >
            🖨 In công thức
          </button>

          <div className="relative flex-1">
            <button
              onClick={() => setShowSaveMenu((v) => !v)}
              className="w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-500 transition cursor-pointer"
            >
              💾 Lưu công thức
            </button>
            {showSaveMenu && (
              <div className="absolute z-10 left-0 right-0 mt-2 bg-white border rounded shadow-lg flex flex-col">
                <button
                  onClick={saveToFile}
                  className="py-2 px-4 hover:bg-gray-100 text-left"
                >
                  💾 Lưu về máy (.txt)
                </button>
                <button
                  onClick={() => setShowSaveMenu(false)}
                  className="py-2 px-4 hover:bg-gray-100 text-left"
                >
                  🗂 Lưu vào tài khoản
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
