// Hiển thị chi tiết một công thức
"use client";

import { useEffect, useState } from "react";
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

interface SerpImage {
  title?: string;
  source?: string;
  original?: string;
  thumbnail?: string;
  width?: number;
  height?: number;
  position?: number;
}

interface SerpResponse {
  images?: SerpImage[];
  serpapi_metadata?: Record<string, unknown>;
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
  const [showSaveMenu, setShowSaveMenu] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(recipe.image || null);
  const [loadingImage, setLoadingImage] = useState(false);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    async function fetchImageForRecipe() {
      if (!recipe?.name) return;
      setLoadingImage(true);
      try {
        const q = encodeURIComponent(recipe.name);
        const res = await fetch(
          `https://food-suggestions-production.up.railway.app//api/serp-images/search?query=${q}`
        );
        if (!res.ok) throw new Error(`Image API error ${res.status}`);
        const data = (await res.json()) as SerpResponse;
        const first =
          data?.images && data.images.length > 0 ? data.images[0] : null;
        const src = first?.original || first?.thumbnail || recipe.image || null;
        if (mounted) setImageUrl(src);
      } catch (err) {
        console.error("Failed to fetch image:", err);
        if (mounted) setImageUrl(recipe.image || null);
      } finally {
        if (mounted) setLoadingImage(false);
      }
    }

    fetchImageForRecipe();
    return () => {
      mounted = false;
    };
  }, [recipe.name, recipe.image]);

  const saveToFile = () => {
    const ingredientsList = recipe.ingredients
      .map((item) => `- ${item}`)
      .join("\n");
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
    a.download = `cong-thuc-${
      recipe.name?.replace(/\s+/g, "-").toLowerCase() || "khong-ten"
    }.txt`;
    a.click();
    URL.revokeObjectURL(url);
    setShowSaveMenu(false);
  };

  const contributeRecipe = async () => {
    setSuccessMsg(null);
    setErrorMsg(null);
    setSaving(true);
    try {
      const payload = {
        ...recipe,
        image: imageUrl || recipe.image || "",
      };

      const res = await fetch("https://food-suggestions-production.up.railway.app//api/recipes/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ recipe: payload }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.message || `Server error ${res.status}`);
      }
      setSuccessMsg(data?.message || "Lưu công thức thành công");
    } catch (err: unknown) {
      console.error("Save recipe failed", err);
      const message = err instanceof Error ? err.message : "Lưu thất bại";

      setErrorMsg(message);
    } finally {
      setSaving(false);
      setShowSaveMenu(false);
    }
  };

  const fallbackImage =
    "https://www.cet.edu.vn/wp-content/uploads/2018/03/ga-nuong-mat-ong.jpg";

  return (
    <div className="border rounded p-4 shadow">
      <h3 className="font-bold text-4xl text-center">{recipe.name}</h3>

      <div className="w-full h-80 relative mt-2 rounded overflow-hidden">
        {loadingImage && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/60">
            <span className="text-sm text-gray-600">Đang tải hình...</span>
          </div>
        )}
        <Image
          src={imageUrl || fallbackImage}
          alt={recipe.name}
          width={800}
          height={320}
          className="w-full h-80 object-cover"
          style={{ objectFit: "cover" }}
          unoptimized
        />
      </div>

      {recipe.nutrition && (
        <div className="flex gap-4 mt-4 justify-center">
          {[
            {
              icon: "🔥",
              label: "Lượng calo",
              value: recipe.nutrition.calories,
            },
            { icon: "💪", label: "Chất đạm", value: recipe.nutrition.protein },
            { icon: "🥑", label: "Chất béo", value: recipe.nutrition.fat },
            {
              icon: "🍞",
              label: "Carbohydrate",
              value: recipe.nutrition.carbs,
            },
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
          <strong className="text-gray-900 mb-1 text-xl">
            🛒 Nguyên liệu:
          </strong>
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
              onClick={contributeRecipe}
              disabled={saving}
              className={`w-full py-2 px-4 rounded-lg transition cursor-pointer ${
                saving
                  ? "bg-gray-300 text-gray-700"
                  : "bg-red-500 text-white hover:bg-red-600"
              }`}
            >
              {saving ? "⏳ Đang lưu..." : "💾 Đóng góp công thức"}
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
        {successMsg && <p className="mt-3 text-green-600">{successMsg}</p>}
        {errorMsg && <p className="mt-3 text-red-600">{errorMsg}</p>}
      </div>
    </div>
  );
}
