import Meal from "@/components/Meal";
import React from "react";

const MealPlanner = () => {
  return (
    <div className="flex flex-col items-center justify-between py-12 px-6">
      <header className="text-center space-y-4 max-w-4xl">
        <h1 className="text-4xl font-bold text-gray-800">
          🍽️ Lập kế hoạch bữa ăn theo mục tiêu dinh dưỡng
        </h1>
        <p className="text-lg text-gray-600">
          Nhập số ngày và mục tiêu dinh dưỡng của bạn, chúng tôi sẽ tạo kế hoạch
          bữa ăn hoàn hảo cho bạn. Dễ dàng điều chỉnh và tùy chỉnh theo sở thích
          cá nhân.
        </p>
      </header>

      <section className="mt-12 w-full max-w-7xl bg-white p-6 rounded-xl shadow-md border">
        <Meal/>
      </section>
    </div>
  );
};

export default MealPlanner;
