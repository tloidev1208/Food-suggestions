"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import SocialShare from "@/components/SocialShare";

interface FoodDetail {
  _id: string;
  user?: string;
  foodName?: string;
  name?: string;
  imageUrl?: string;
  image?: string;
  content?: string;
  cook_time?: string;
  ingredients?: string[];
  instructions?: string[];
  nutrition?: {
    calories: string;
    protein: string;
    fat: string;
    carbs: string;
  };
}

export default function FoodDetailPage() {
  const { type, id } = useParams();
  const [data, setData] = useState<FoodDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedFoods, setRelatedFoods] = useState<any[]>([]);
  useEffect(() => {
    const raw = sessionStorage.getItem("lastSearchResults");
    if (!raw || !id) return;

    const list = JSON.parse(raw);

    const filtered = list.filter((item: any) => {
      if (item.type === "post") return item.foodId !== id;
      return item._id !== id;
    });

    setRelatedFoods(filtered.slice(0, 6));
  }, [id]);

  useEffect(() => {
    if (!type || !id) return;

    let apiUrl = "";

    if (type === "post") {
      apiUrl = `https://befoodsuggestion-production.up.railway.app/api/posts/food/${id}`;
    } else {
      apiUrl = `https://befoodsuggestion-production.up.railway.app/api/recipes/${id}`;
    }

    fetch(apiUrl)
      .then((res) => res.json())
      .then((res) => {
        setData(res);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [type, id]);

  if (loading) return <p className="p-6">Đang tải...</p>;
  if (!data) return <p className="p-6">Không tìm thấy món ăn</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-20">
      <div className="">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          {/* LEFT - IMAGE */}
          <div className="w-full">
            <img
              src={data.imageUrl || data.image}
              alt={data.foodName || data.name}
              className="w-full h-[420px] object-cover rounded-2xl shadow-lg"
            />
            <SocialShare />
          </div>

          {/* RIGHT - CONTENT */}
          <div className="flex flex-col">
            {/* TITLE */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              {data.foodName || data.name}
            </h1>
            {/* DIVIDER */}
            <div className="w-16 h-1 bg-orange-500 rounded-full my-4" />
            <h1> Tạo bởi: {data.user || "AI"}</h1>
            {/* CONTENT */}
            {type === "post" && (
              <p className="text-gray-700 leading-relaxed text-base">
                {data.content}
              </p>
            )}
            <div className="mt-4">
              <h3 className="font-semibold text-lg mb-2 text-gray-900">
                🛒 Nguyên liệu
              </h3>
              <ul className="list-disc list-inside text-gray-700">
                {data.ingredients &&
                  data.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
              </ul>
            </div>
            {/* RECIPE */}
            {type === "recipe" && data.instructions && (
              <div className="mt-6">
                <h3 className="font-semibold text-lg mb-2 text-gray-900">
                  🍳 Cách làm
                </h3>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {data.instructions}
                </p>
              </div>
            )}

            {/* NUTRITION */}
            {data.nutrition && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
                <div className="bg-gray-100 rounded-xl p-4 text-center">
                  <p className="text-lg font-semibold">🔥</p>
                  <p className="text-sm text-gray-600">
                    {data.nutrition.calories}
                  </p>
                </div>

                <div className="bg-gray-100 rounded-xl p-4 text-center">
                  <p className="text-lg font-semibold">🥩</p>
                  <p className="text-sm text-gray-600">
                    {data.nutrition.protein}
                  </p>
                </div>

                <div className="bg-gray-100 rounded-xl p-4 text-center">
                  <p className="text-lg font-semibold">🥑</p>
                  <p className="text-sm text-gray-600">{data.nutrition.fat}</p>
                </div>

                <div className="bg-gray-100 rounded-xl p-4 text-center">
                  <p className="text-lg font-semibold">🍚</p>
                  <p className="text-sm text-gray-600">
                    {data.nutrition.carbs}
                  </p>
                </div>
              </div>
            )}
            <div className="mt-4 bg-gray-100 rounded-xl p-4 text-center">
              ⏱ Thời gian nấu: {data.cook_time || "N/A"}
            </div>
          </div>
        </div>
      </div>

      <div>
        {relatedFoods.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Món ăn tương tự</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {relatedFoods.map((item, index) => (
                <a
                  key={`${item.type}-${
                    item.type === "post" ? item.foodId : item._id
                  }-${index}`}
                  href={
                    item.type === "post"
                      ? `/food/post/${item.foodId}`
                      : `/food/recipe/${item._id}`
                  }
                  className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
                >
                  <img
                    src={item.type === "post" ? item.imageUrl : item.image}
                    alt={item.foodName || item.name}
                    className="w-full h-40 object-cover"
                  />

                  <div className="p-4">
                    <h3 className="font-semibold text-lg line-clamp-1">
                      {item.foodName || item.name}
                    </h3>

                    <p className="text-gray-600 text-sm line-clamp-2 mt-1">
                      {item.type === "post" ? item.content : item.instructions}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
