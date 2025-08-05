'use client';

import { useState } from 'react';
import TextUpload from "@/components/TextUpload";
import ImageUploader from "@/components/ui/ImageUpload";
import Worksteps from "@/components/Worksteps";
import { ImageUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [showTextUpload, setShowTextUpload] = useState(false);

  return (
    <div className="flex flex-col items-center justify-between py-12 px-6 max-w-4xl">
      {/* Header */}
      <header className="text-center space-y-4 max-w-3xl">
        <h1 className="text-4xl font-bold text-gray-800">
          🍽️ Gợi ý bất kì món ăn nào từ hình ảnh
        </h1>
        <p className="text-lg text-gray-600">
          Tải lên ảnh của bất kỳ món ăn nào và AI của chúng tôi sẽ xác định công
          thức, bao gồm thành phần, hướng dẫn và thông tin dinh dưỡng.
        </p>
      </header>

      {/* Upload area */}
      <section className="mt-12 w-full max-w-7xl bg-white p-6 rounded-xl shadow-md border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <ImageUp className="text-blue-500" />
            <h2 className="text-xl font-semibold text-gray-800">
              {showTextUpload ? "Nhập nguyên liệu bằng văn bản" : "Tải lên nguyên liệu của bạn"}
            </h2>
          </div>
          <Button
          className='bg-green-500 text-white hover:bg-green-600 hover:text-white cursor-pointer'
            variant="outline"
            size="sm"
            onClick={() => setShowTextUpload((prev) => !prev)}
          >
            {showTextUpload ? "Upload hình ảnh" : "Nhập bằng văn bản"}
          </Button>
        </div>

        <div>
          {showTextUpload ? <TextUpload /> : <ImageUploader />}
        </div>
      </section>

      <div>
        <Worksteps />
      </div>
    </div>
  );
}
