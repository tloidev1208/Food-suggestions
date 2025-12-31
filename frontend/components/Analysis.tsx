"use client";

import { useState } from "react";
import { ImageUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
interface Recipe {
  name?: string;
  description?: string;
  image?: string;

  ingredients?: string[];
  instructions?: string[];

  cook_time?: string;
  servings?: string;

  nutrition?: {
    calories?: string;
    protein?: string;
    fat?: string;
    carbs?: string;
  };
}

export default function Analysis() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<{
    label: string;
    confidence: number;
  } | null>(null);
  const [loading, setLoading] = useState(false);

  // Công thức gợi ý từ API backend
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loadingRecipe, setLoadingRecipe] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
      setResult(null);
      setRecipe(null);
    }
  };

  const handleSubmit = async () => {
    if (!file) return;
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch(
        `${process.env.}/predict`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      setResult(data);
    } catch (error) {
      console.error("Upload failed:", error);
      setResult({ label: "Lỗi phân tích ảnh", confidence: 0 });
    } finally {
      setLoading(false);
    }
  };

  // 👉 GỌI API GỢI Ý CÔNG THỨC
  const fetchRecipe = async () => {
    if (!result?.label) return;
    setLoadingRecipe(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/recipes/food-detail`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: result.label }),
      });

      const data = await res.json();
      setRecipe(data.recipe);
    } catch (error) {
      console.error("Recipe fetch failed:", error);
    } finally {
      setLoadingRecipe(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-between py-20 px-6 max-w-6xl">
      {/* Header */}
      <header className="text-center space-y-4 max-w-3xl">
        <h1 className="text-4xl font-bold text-gray-800">
          🔍 Nhận diện món ăn bằng hình ảnh
        </h1>
        <p className="text-lg text-gray-600">
          Tải lên hình ảnh món ăn và hệ thống AI sẽ tự động nhận diện tên món.
        </p>
      </header>

      {/* Upload area */}
      <section className="mt-6 w-full max-w-7xl bg-white p-6 rounded-xl shadow-md border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <ImageUp className="text-blue-500" />
            <h2 className="text-xl font-semibold text-gray-800">
              Tải lên ảnh món ăn
            </h2>
          </div>
        </div>

        <div className="flex flex-col items-center gap-4">
          <Input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="cursor-pointer"
          />

          {preview && (
            <div className="flex justify-center mt-2">
              <Image
                src={preview}
                alt="Preview"
                width={350}
                height={250}
                className="rounded-lg border shadow-sm object-cover"
              />
            </div>
          )}

          <Button
            onClick={handleSubmit}
            className="bg-gray-500 hover:bg-gray-600 text-white mt-3"
            disabled={!file || loading}
          >
            {loading ? "Đang phân tích..." : "Phân tích hình ảnh"}
          </Button>

          {loading && (
            <div className="w-full max-w-xs mt-2">
              <Progress value={60} />
            </div>
          )}

          {/* KẾT QUẢ NHẬN DIỆN */}
          {result && (
            <div className="mt-6 w-full max-w-md bg-blue-50 border border-blue-200 rounded-xl p-5 text-center shadow-sm">
              <p className="text-lg font-semibold text-gray-800">
                Kết quả: <span className="text-blue-600">{result.label}</span>
              </p>
              <p className="text-sm text-gray-600 mt-1">
                Độ tin cậy: {(result.confidence * 100).toFixed(2)}%
              </p>

              {/* 👉 BUTTON GỢI Ý CÔNG THỨC */}
              <Button
                onClick={fetchRecipe}
                className="mt-4 bg-green-600 hover:bg-green-700 text-white"
                disabled={loadingRecipe}
              >
                {loadingRecipe ? "Đang gợi ý..." : "Gợi ý công thức"}
              </Button>
            </div>
          )}

          {/* HIỂN THỊ CÔNG THỨC */}
          {recipe && (
            <div className="mt-6 w-full max-w-2xl bg-white border p-6 rounded-xl shadow-sm">
              <h2 className="text-2xl font-bold text-gray-800">
                {recipe.name}
              </h2>
              <p className="text-gray-600 mt-1">{recipe.description}</p>

              {recipe.image && (
                <Image
                  src={recipe.image}
                  alt={recipe?.name ?? "Recipe Image"}
                  width={400}
                  height={300}
                  className="rounded-lg mt-4"
                />
              )}

              <h3 className="text-xl font-semibold mt-4">Nguyên liệu:</h3>
              <ul className="list-disc ml-6 mt-1 text-gray-700">
                {recipe?.ingredients?.map((i: string, idx: number) => (
                  <li key={idx}>{i}</li>
                ))}
              </ul>

              <h3 className="text-xl font-semibold mt-4">Cách làm:</h3>
              <ol className="list-decimal ml-6 mt-1 text-gray-700">
                {recipe?.instructions?.map((s: string, idx: number) => (
                  <li key={idx}>{s}</li>
                ))}
              </ol>

              <p className="mt-4 text-sm text-gray-600">
                ⏳ Thời gian nấu: {recipe.cook_time}
              </p>
              <p className="text-sm text-gray-600">
                🍽 Khẩu phần: {recipe.servings}
              </p>

              <h3 className="text-xl font-semibold mt-4">Dinh dưỡng:</h3>
              <p className="text-sm text-gray-700">
                Calories: {recipe?.nutrition?.calories}
              </p>
              <p className="text-sm text-gray-700">
                Protein: {recipe?.nutrition?.protein}
              </p>
              <p className="text-sm text-gray-700">
                Fat: {recipe?.nutrition?.fat}
              </p>
              <p className="text-sm text-gray-700">
                Carbs: {recipe?.nutrition?.carbs}
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
