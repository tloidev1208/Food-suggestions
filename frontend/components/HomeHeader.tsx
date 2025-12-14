"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HomeHeader() {
  return (
    <section className="max-w-7xl bg-white justify-center mx-auto px-4 pt-16">
      <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left Content */}
        <div className="space-y-6">
          <p className="uppercase text-sm tracking-wide text-gray-500">
            Xin chào! Chào mừng đến với thế giới ẩm thực tinh tế ✨!{" "}
            <span className="ml-1">🔥</span>
          </p>

          {/* Tiêu đề chính - mỗi cụm từ xuống dòng */}
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            <span className="block">MÓN NGON</span>
            <span className="block text-red-500">GỢI Ý NHANH</span>
            <span className="block">TRỌN SỨC KHỎE</span>
          </h1>
          <div className="flex items-center gap-4">
            <Link href="services">
              <Button className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 text-lg">
                Gợi ý Công Thức
              </Button>
            </Link>
            <div className="relative">
              <Link href="services">
              <Button className="text-base md:text-lg px-6 py-3 bg-white text-black border border-gray-200 hover:bg-gray-100">
                Phân tích món ăn
              </Button>
              </Link>
              <span className="absolute -top-2 -right-2 bg-yellow-400 text-xs text-black px-2 py-0.5 rounded-full shadow">
                Coming soon
              </span>
            </div>
          </div>
        </div>

        {/* Right Image */}
        <div className="relative flex justify-center lg:justify-center items-center">
          <Image
            src="/images/salad.png" // Đường dẫn tới ảnh trong public/images
            alt="Delicious Food"
            width={1200}
            height={1200}
            className="w-full max-w-[500px] rounded-xl object-cover"
          />
        </div>
      </div>
    </section>
  );
}
