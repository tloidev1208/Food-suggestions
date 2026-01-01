"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/dist/client/link";
import Image from "next/image";

interface SearchItem {
  _id?: string; // recipe
  foodId?: string; // post
  type: "post" | "recipe";
  foodName?: string;
  name?: string;
  imageUrl?: string;
  image?: string;
  content?: string;
  instructions?: string;
  nutrition?: {
    calories: string;
    protein: string;
    fat: string;
    carbs: string;
  };
}

export default function SearchClient() {
  const searchParams = useSearchParams();
  const q = searchParams.get("q") || "";

  const [results, setResults] = useState<SearchItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!q) return;

    const fetchData = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/search?q=${encodeURIComponent(q)}`
        );
        const data = await res.json();
        if (data.success) {
          setResults(data.data);

          sessionStorage.setItem(
            "lastSearchResults",
            JSON.stringify(data.data)
          );
        }
      } catch (error) {
        console.error("Search error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [q]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">
        Kết quả tìm kiếm cho: <span className="text-red-500">"{q}"</span>
      </h1>

      {loading && <p>Đang tìm kiếm...</p>}

      {!loading && results.length === 0 && (
        <p className="text-gray-500">Không tìm thấy món ăn phù hợp</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {results.map((item) => (
          <Link
            key={item.type === "post" ? item.foodId : item._id}
            href={
              item.type === "post"
                ? `/food/post/${item.foodId}`
                : `/food/recipe/${item._id}`
            }
          >
            <div className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden cursor-pointer">
              <Image
                src={
                  item.type === "post"
                    ? item.imageUrl || "/images/placeholder-food.jpg"
                    : item.image || "/images/placeholder-food.jpg"
                }
                alt={
                  item.type === "post"
                    ? item.foodName ?? "food"
                    : item.name ?? "recipe"
                }
                width={400}
                height={300}
                className="w-full h-48 object-cover"
              />

              <div className="p-4 space-y-2">
                <h3 className="text-lg font-semibold">
                  {item.type === "post" ? item.foodName : item.name}
                </h3>

                <p className="text-gray-600 text-sm line-clamp-2">
                  {item.type === "post" ? item.content : item.instructions}
                </p>

                {item.type === "recipe" && item.nutrition && (
                  <div className="text-sm text-gray-600 flex gap-2 mt-2">
                    <p>🔥 {item.nutrition.calories}</p>
                    <p>🥩 {item.nutrition.protein}</p>
                  </div>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
