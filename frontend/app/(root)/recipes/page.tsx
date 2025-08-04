import ImageUploader from "@/components/ui/ImageUpload";
import Worksteps from "@/components/Worksteps";
import { ImageUp } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-between py-12 px-6 max-w-4xl">
      {/* Header */}
      <header className="text-center space-y-4 max-w-3xl">
        <h1 className="text-4xl font-bold text-gray-800">
          🍽️ Gợi ý bất kì món ăn nào từ hình ảnh ảnh
        </h1>
        <p className="text-lg text-gray-600">
         Tải lên ảnh của bất kỳ món ăn nào và AI của chúng tôi sẽ xác định công thức, bao gồm thành phần, hướng dẫn và thông tin dinh dưỡng.
        </p>
      </header>

      {/* Upload area */}
      <section className="mt-12 w-full max-w-7xl bg-white p-6 rounded-xl shadow-md border">
        <div className="flex items-center gap-2 mb-4">
          <ImageUp className="text-blue-500" />
          <h2 className="text-xl font-semibold text-gray-800">Tải lên nguyên liệu của bạn</h2>
        </div>
        <ImageUploader />
      </section>
      <div>
        <Worksteps />
      </div>
    </div>
  );
}
