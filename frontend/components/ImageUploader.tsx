"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import ImageInput from "./ImageInput";
import RecipeCard from "@/components/TextUpLoad/RecipeCard";
import Pagination from "@/components/TextUpLoad/Pagination";
import SocialShare from "@/components/SocialShare";
import LoadingBar from "./ui/loadingbar";

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

export default function ImageUploader() {
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [error, setError] = useState("");

  const handleUpload = async () => {
    if (images.length === 0) {
      setError("Vui lòng chọn ít nhất 1 ảnh.");
      return;
    }
    setError("");
    setLoading(true);
    setRecipes([]);

    const formData = new FormData();
    images.forEach((img) => formData.append("images", img));

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/food-recipes/suggest`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");

      setRecipes(data.recipes);
      setCurrentPage(0);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Lỗi không xác định");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <ImageInput
        images={images}
        setImages={setImages}
        previews={previews}
        setPreviews={setPreviews}
      />

      <Button
        onClick={handleUpload}
        disabled={images.length === 0 || loading}
        className="w-full"
      >
        {loading ? <LoadingBar /> : "Gợi ý món ăn"}
      </Button>
      {error && <p className="text-red-500">{error}</p>}

      {recipes.length > 0 && (
        <>
          <RecipeCard recipe={recipes[currentPage]} />
          <Pagination
            currentPage={currentPage}
            totalPages={recipes.length}
            onPageChange={setCurrentPage}
          />
          <div className="mt-8">
            <SocialShare />
          </div>
        </>
      )}
    </div>
  );
}
