"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { RefreshCw } from "lucide-react";
import RecipeModal from "@/components/RecipeModal";
import PostModal from "@/components/PostModal";
import { Recipe } from "@/app/types/recipe";
import { Post } from "@/app/types/post";
export default function HowItWorks() {
  const [foodPosts, setFoodPosts] = useState<Post[]>([]);
  const [savedRecipes, setSavedRecipes] = useState<Post[]>([]);
  const [allFoods, setAllFoods] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [suggestion, setSuggestion] = useState<Post | null>(null);

 const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  /* FETCH POSTS */
  useEffect(() => {
    async function fetchPosts() {
      try {
        setLoading(true);
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`);
        const data = (await res.json()) as Post[];
        setFoodPosts(data || []);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  /* FETCH RECIPES */
  useEffect(() => {
    async function fetchRecipes() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/recipes/saved`);
        const data = await res.json();

        const list: Post[] = Array.isArray(data)
          ? (data as Post[])
          : Array.isArray(data.recipes)
          ? (data.recipes as Post[])
          : Array.isArray(data.savedRecipes)
          ? (data.savedRecipes as Post[])
          : [];

        setSavedRecipes(list);
      } catch {
        setSavedRecipes([]);
      }
    }

    fetchRecipes();
  }, []);

  /* GỘP */
  useEffect(() => {
    const combined = [...foodPosts, ...savedRecipes];
    setAllFoods(combined);

    if (combined.length > 0) {
      setSuggestion(combined[Math.floor(Math.random() * combined.length)]);
    }
  }, [foodPosts, savedRecipes]);

  const handleRandomize = () => {
    if (!allFoods.length) return;
    const next = allFoods[Math.floor(Math.random() * allFoods.length)];
    setSuggestion(next);
  };

  /* CLICK MÓN AI */
 const handleClickAIFood = async (id: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/recipes/${id}`);
    const data: Recipe = await res.json();
    setSelectedRecipe(data);
  } catch (err) {
    console.error("Không thể tải recipe:", err);
  }
};


  /* CLICK MÓN USER */
  const handleClickUserFood = async (foodId: string) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/food/${foodId}`);
      const data = await res.json();
      setSelectedPost(data);
    } catch (err) {
      console.error("Không thể tải post user:", err);
    }
  };

  return (
    <div className="py-2 px-4 md:px-8 text-black max-w-7xl mx-auto">
      {/* 2 POPUP */}
      <RecipeModal
        recipe={selectedRecipe}
        onClose={() => setSelectedRecipe(null)}
      />
      <PostModal post={selectedPost} onClose={() => setSelectedPost(null)} />

      <div className="col-span-4 p-6 rounded-2xl bg-gradient-to-r from-orange-300 to-orange-100 flex flex-col gap-4">
        <h2 className="text-3xl font-bold">Nấu gì hôm nay?</h2>

        <div className="flex items-center gap-4">
          {/* IMAGE */}
          <div className="relative w-32 h-32 rounded-xl overflow-hidden">
            <Image
              src={suggestion?.image || suggestion?.imageUrl || "/2.avif"}
              fill
              alt=""
              className="object-cover"
            />
          </div>

          {/* TEXT */}
          <div className="flex-grow flex flex-col">
            <p className="text-xl font-semibold">
              Gợi ý: {suggestion?.foodName || suggestion?.name}
            </p>
            {suggestion?.user ? (
              <p className="text-xs text-gray-600 mt-1 italic">
                Đăng bởi: {suggestion.user}
              </p>
            ) : (
              <p className="text-xs text-gray-600 mt-1 italic">Tạo bởi AI</p>
            )}
          </div>

          <button
            onClick={handleRandomize}
            className="px-4 py-2 flex items-center gap-2 rounded-lg bg-black text-white hover:bg-gray-800"
          >
            <RefreshCw size={18} /> Đổi món
          </button>
        </div>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-4 grid-rows-1 gap-4">
        {/* label */}
        <div className="row-span-2 row-start-2 flex flex-col items-center justify-center bg-gradient-to-b from-purple-400 to-purple-200 rounded-2xl p-4 shadow-md">
          <div className="text-white font-bold text-xl">
            Lựa chọn bởi NutriAI
          </div>
        </div>

        <div className="col-span-3 row-start-2 p-4">
          <FoodGrid
            foods={savedRecipes}
            onAIClick={handleClickAIFood}
            onUserClick={handleClickUserFood}
          />
        </div>

        <div className="row-span-2 col-start-4 row-start-4 flex flex-col items-center justify-center bg-gradient-to-b from-green-400 to-green-200 rounded-2xl p-4 shadow-md">
          <div className="text-white font-bold text-xl">Món ăn mới nhất</div>
        </div>

        <div className="col-span-3 col-start-1 row-start-4 p-4">
          <FoodGrid
            foods={foodPosts}
            onAIClick={handleClickAIFood}
            onUserClick={handleClickUserFood}
          />
        </div>
      </div>
    </div>
  );
}

/* GRID ITEM */
function FoodGrid({
  foods,
  onAIClick,
  onUserClick,
}: {
  foods: Post[];
  onAIClick: (id: string) => void;
  onUserClick: (foodId: string) => void;
}) {
  const ITEMS_PER_PAGE = 8;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(foods.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedFoods = foods.slice(startIndex, endIndex);

  return (
    <div className="space-y-4">
      {/* GRID */}
      <div className="grid grid-cols-4 gap-4">
        {paginatedFoods.map((food, idx) => {
          const key = food._id || idx;
          const isAI = !food.user;
          const foodId = food._id || food.foodId;

          return (
            <div
              key={key}
              className="flex flex-col items-center text-center cursor-pointer"
              onClick={() =>
                isAI ? onAIClick(foodId!) : onUserClick(food.foodId!)
              }
            >
              <div className="relative w-full h-48 rounded-xl overflow-hidden shadow">
                <Image
                  src={food.image || food.imageUrl || "/2.avif"}
                  fill
                  alt={food.name || food.foodName || "food"}
                  className="object-cover"
                />
              </div>

              <p className="mt-2 text-base font-semibold text-orange-700">
                {food.name || food.foodName}
              </p>

              {food.user ? (
                <p className="mt-1 text-[11px] text-gray-500 italic">
                  Đăng bởi: {food.user}
                </p>
              ) : (
                <p className="text-[11px] text-gray-500 italic">Tạo bởi AI</p>
              )}
            </div>
          );
        })}
      </div>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
          >
            ← Trước
          </button>

          <span className="text-sm text-gray-600">
            Trang {currentPage} / {totalPages}
          </span>

          <button
            onClick={() =>
              setCurrentPage((p) => Math.min(p + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
          >
            Sau →
          </button>
        </div>
      )}
    </div>
  );
}

