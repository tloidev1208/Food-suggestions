"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HowItWorks() {
  const steps = [
    {
      title: "📸 Chụp ảnh món ăn",
      desc: "Người dùng tải lên tối đa 3 ảnh món ăn hoặc nguyên liệu có sẵn trong nhà bếp.",
      image: "/images/1.avif",
    },
    {
      title: "🧠 AI nhận diện nguyên liệu",
      desc: "Hệ thống AI phân tích hình ảnh và trích xuất tên các nguyên liệu có thể có.",
      image: "/images/2.avif",
    },
    {
      title: "👨‍🍳 Gợi ý công thức phù hợp",
      desc: "Dựa trên nguyên liệu đã nhận diện, AI đề xuất các công thức món ăn phù hợp, dễ nấu.",
      image: "/images/3.avif",
    },
  ];

  return (
    <section className="bg-white py-16 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold">
          Ống kính công thức hoạt động như thế nào?
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mt-4">
          Từ hình ảnh thực phẩm bạn có – chúng tôi dùng trí tuệ nhân tạo để biến
          chúng thành những món ăn ngon miệng và dễ thực hiện.
        </p>
      </div>

      {/* Steps */}
      <div className="space-y-12">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`flex flex-col md:flex-row items-center gap-8 ${
              index % 2 !== 0 ? "md:flex-row-reverse" : ""
            }`}
          >
            {/* Image */}
            <div className="md:w-1/2 relative transform hover:-translate-y-2 transition duration-300 ease-in-out">
              <Image
                src={step.image}
                alt={step.title}
                width={600}
                height={400}
                className="rounded-xl shadow-lg object-cover"
              />
              {/* Badge overlay */}
              <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow px-4 py-2 flex items-center gap-2">
                <span className="text-sm font-medium">{step.title}</span>
              </div>
            </div>

            {/* Text */}
            <div className="md:w-1/2 space-y-4">
              <h3 className="text-3xl md:text-4xl font-semibold">{step.title}</h3>
              <p className="text-gray-700 text-lg">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Khám phá ngay button */}
      <div className="mt-16 text-center">
        <Link href="/recipes">
          <Button className="text-lg px-10 py-4 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-md transform hover:-translate-y-1 transition duration-200 ease-in-out">
            Khám phá ngay
          </Button>
        </Link>
      </div>
    </section>
  );
}
