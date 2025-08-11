"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HomeHeader() {
  return (
    <section className="max-w-7xl bg-white justify-center mx-auto px-4">
      <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left Content */}
        <div className="space-y-6">
          <p className="uppercase text-sm tracking-wide text-gray-500">
            Xin chào <span className="ml-1">🔥</span>
          </p>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            ENJOY YOUR <span className="text-red-500">DELICIOUS</span> FOOD
          </h1>
          <p className="text-gray-600 max-w-md">
            Điều duy nhất chúng tôi yêu hơn cả đồ ăn chính là bạn! Chúng tôi có
            món ăn dành cho tất cả mọi người.
          </p>

          <div className="flex items-center gap-4">
            <Link href="/recipes">
              <Button className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 text-lg">
                Gợi ý Công Thức
              </Button>
            </Link>
            <div className="relative">
              <Button
                
                className="text-base md:text-lg px-6 py-3 bg-white text-black border border-gray-200 hover:bg-gray-100"
              >
                Phân tích món ăn
              </Button>
              <span className="absolute -top-2 -right-2 bg-yellow-400 text-xs text-black px-2 py-0.5 rounded-full shadow">
                Coming soon
              </span>
            </div>
          </div>
        </div>

        {/* Right Image */}
        <div className="relative flex justify-center lg:justify-end">
          <Image
            src="/images/tasty-burger-isolated-white-background-fresh-hamburger-fastfood-with-beef-cheese.jpg" // Đường dẫn tới ảnh trong thư mục public/images
            alt="Delicious Food"
            width={500}
            height={500}
            className="w-full rounded-xl"
          />
          <div className="absolute bottom-6 left-[-100px] bg-white rounded-lg shadow px-4 py-2 flex items-center gap-2">
            <Image
              src="/images/clock.png"
              alt="Delivery"
              width={36}
              height={36}
            />
            <span className="text-lg font-medium">Gợi ý nhanh chóng</span>
          </div>

          {/* User Card */}
          <div className="absolute top-12 right-[-50px] bg-white rounded-lg shadow px-4 py-2 flex items-center gap-2">
            <Image
              src="/images/fast-food.png"
              alt="Delivery"
              width={36}
              height={36}
            />
            <div>
              <p className="text-lg font-medium">Thức ăn siêu ngon</p>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-10">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-gray-300 text-center">
          <div className="py-8 px-4">
            <h3 className="text-4xl font-bold">500K+</h3>
            <p className="text-base text-gray-500 mt-2">
              Meals served across the country
            </p>
          </div>
          <div className="py-8 px-4">
            <h3 className="text-4xl font-bold">4.9/5</h3>
            <p className="text-base text-gray-500 mt-2">
              Average customer rating
            </p>
          </div>
          <div className="py-8 px-4">
            <h3 className="text-4xl font-bold">200+</h3>
            <p className="text-base text-gray-500 mt-2">
              Curated recipes from top chefs
            </p>
          </div>
          <div className="py-8 px-4">
            <h3 className="text-4xl font-bold">98%</h3>
            <p className="text-base text-gray-500 mt-2">
              Customer satisfaction rate
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
