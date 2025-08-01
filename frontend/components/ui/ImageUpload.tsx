"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import SuggestionResult from "@/components/Result";

type Recipe = {
  name: string;
  ingredients: string[];
  instructions: string;
  image: string;
};

export default function ImageUploader() {
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    ingredients: string[];
    recipes: Recipe[];
  } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newImages = [...images, ...files].slice(0, 3);
    const newPreviews = newImages.map((file) => URL.createObjectURL(file));

    setImages(newImages);
    setPreviews(newPreviews);
    setResult(null);
  };

  const handleUpload = async () => {
    if (images.length === 0) return;

    const formData = new FormData();
    images.forEach((img) => formData.append("images", img));

    try {
      setLoading(true);
      const res = await fetch(
        "http://localhost:5000/api/food-recipes/suggest",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Upload failed");

      setResult({
        ingredients: data.ingredients,
        recipes: data.recipes,
      });
    } catch (err: any) {
      alert("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-2xl mx-auto p-4">
      <Input
        type="file"
        accept="image/*"
        multiple
        onChange={handleChange}
        disabled={images.length >= 3}
      />

      <div className="grid grid-cols-3 gap-4 mt-4 w-full">
        {previews.map((src, index) => (
          <div
            key={index}
            className="w-full aspect-square border rounded overflow-hidden"
          >
            <img
              src={src}
              alt={`Preview ${index + 1}`}
              className="object-cover w-full h-full"
            />
          </div>
        ))}
      </div>

      <Button onClick={handleUpload} disabled={images.length === 0 || loading}>
        {loading ? "Đang xử lý..." : "Upload & Gợi ý món ăn"}
      </Button>
      <div className="flex flex-col items-center gap-4 w-full max-w-2xl mx-auto p-4">{result && <SuggestionResult result={result} />}</div>
    </div>
  );
}
