"use client";

import { useState } from "react";
import IngredientInput from "./IngredientInput";
import RecipeCard from "./RecipeCard";
import Pagination from "./Pagination";
import SocialShare from "../SocialShare";
import LoadingBar from "../ui/loadingbar";
import { Button } from "../ui/button";

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

export default function TextUpload() {
  const [ingredientInput, setIngredientInput] = useState("");
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const fetchRecipes = async () => {
    if (ingredients.length === 0) {
      setError("Vui lòng thêm ít nhất một nguyên liệu.");
      return;
    }

    setLoading(true);
    setError("");
    setRecipes([]);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/recipes/food-suggest`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ingredients }),
        }
      );

      const data = await res.json();

      if (Array.isArray(data?.recipes) && !data?.recipes?.[0]?.raw) {
        setRecipes(data.recipes);
        setCurrentPage(0);
        return;
      }

      if (data?.recipes?.[0]?.raw) {
        const raw = data.recipes[0].raw;
        const match = raw.match(/```json\n([\s\S]+?)\n```/);

        if (match && match[1]) {
          const parsed: Recipe[] = JSON.parse(match[1]);
          setRecipes(parsed);
          setCurrentPage(0);
          return;
        }
      }
      setError("Không thể phân tích dữ liệu trả về.");
    } catch (err) {
      console.error(err);
      setError("Lỗi khi gọi API.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-12">
      <IngredientInput
        ingredientInput={ingredientInput}
        setIngredientInput={setIngredientInput}
        ingredients={ingredients}
        setIngredients={setIngredients}
      />

      <Button
        onClick={fetchRecipes}
        disabled={loading || ingredients.length === 0}
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
