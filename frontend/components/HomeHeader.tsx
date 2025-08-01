'use client';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const HomeHeader = () => {
  return (
    <div
      className="w-full h-[600px] bg-cover bg-center relative flex items-center justify-center"
      style={{ backgroundImage: "url('/bg.avif')" }}
    >
      <div className="bg-black/50 absolute inset-0" />
      <div className="relative z-10 text-center text-white px-4">
        <h1 className="text-4xl md:text-7xl font-bold mb-4">FOOD AI</h1>
        <p className="text-lg md:text-2xl mb-6">
          Biến ảnh thành công thức nấu ăn ngon với AI
        </p>

       <div className="flex justify-center gap-4 flex-wrap">
  <Link href="/recipes">
    <Button
      className="text-base md:text-lg px-8 py-3 bg-[#FF4400] hover:bg-green-700 text-white cursor-pointer"
    >
      Gợi ý Công Thức
    </Button>
  </Link>

  <div className="relative">
    <Button
      disabled
      className="text-base md:text-lg px-8 py-3 bg-[#70997C] text-white cursor-not-allowed"
    >
      Phân tích món ăn
    </Button>
    <span className="absolute -top-2 -right-2 bg-yellow-400 text-xs text-black px-2 py-0.5 rounded-full shadow">
      Coming soon
    </span>
  </div>
</div>
      </div>
    </div>
  );
};

export default HomeHeader;
