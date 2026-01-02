"use client";

import { useEffect, useState } from "react";
import { Users, UtensilsCrossed, FileText } from "lucide-react";
import Link from "next/link";

interface StatsData {
  users: number;
  recipes: number;
  userPosts: number;
}

interface User {
  _id: string;
  name: string;
  email: string;
}

const StatisticalData = () => {
  const [data, setData] = useState<StatsData | null>(null);
  const [latestUsers, setLatestUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [statsRes, usersRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/stats`, {
            credentials: "include",
          }),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth`),
        ]);

        if (!statsRes.ok) throw new Error("Không thể lấy dữ liệu thống kê");

        const statsResult = await statsRes.json();
        const usersResult: User[] = await usersRes.json();

        // ✅ lấy tối đa 3 user mới nhất
        const newestUsers = usersResult.slice(-3).reverse();

        setData(statsResult.data);
        setLatestUsers(newestUsers);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-500">Đang tải dữ liệu...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="p-6 space-y-10">
      {/* ================== GIỮ NGUYÊN UI CŨ ================== */}
       <hr className="my-10" />
      <div>
        <h2 className="text-2xl font-bold mb-6 text-center">
          📊 NUTRIAI HIỆN CÓ
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatCard
            title="Người dùng"
            value={data?.users ?? 0}
            icon={<Users className="w-8 h-8 text-blue-600" />}
            bg="bg-blue-50"
          />

          <StatCard
            title="Món ăn do AI tạo"
            value={data?.recipes ?? 0}
            icon={<UtensilsCrossed className="w-8 h-8 text-green-600" />}
            bg="bg-green-50"
          />

          <StatCard
            title="Món ăn do người dùng đóng góp"
            value={data?.userPosts ?? 0}
            icon={<FileText className="w-8 h-8 text-purple-600" />}
            bg="bg-purple-50"
          />
        </div>
      </div>
      <hr className="my-10" />
      {/* ================== USER MỚI ================== */}
      <div>
        <h2 className="text-2xl font-bold mb-6 text-center">
          🆕 NGƯỜI DÙNG MỚI
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {latestUsers.map((user) => (
            <div
              key={user._id}
              className="flex flex-col items-center rounded-2xl border p-4 shadow-sm bg-white text-center hover:shadow-md transition h-32"
            >
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-lg mb-2">
                {user.name.charAt(0).toUpperCase()}
              </div>

              <p className="font-medium leading-tight">{user.name}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="max-w-3xl mx-auto text-center space-y-4">
        <h2 className="text-3xl font-extrabold">
          🔥 ĐẾN LƯỢT BẠN!
        </h2>

        <p className="text-lg">
          Hãy cùng <span className="font-semibold">NutriAI</span> xây dựng cộng đồng
          nấu ăn lớn mạnh và bổ ích!
        </p>

        <p className="text-sm opacity-90">
          NutriAI sẽ không để bạn thiệt thòi. Bạn sẽ được thưởng{" "}
          <span className="font-semibold">
            VOUCHER HOẶC THẺ CÀO ĐIỆN THOẠI
          </span>{" "}
          ứng với công sức của mình.
        </p>

        <Link
          href="/blog"
          rel="noopener noreferrer"
          className="inline-block mt-4 px-8 py-3 rounded-full bg-white text-orange-500 font-bold shadow hover:scale-105 hover:shadow-xl transition"
        >
          🍳 Góp món ăn mới ngay
        </Link>
      </div>
    </div>
  );
};

export default StatisticalData;

/* ======================
   Reusable Card (GIỮ NGUYÊN)
====================== */
const StatCard = ({
  title,
  value,
  icon,
  bg,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
  bg: string;
}) => {
  return (
    <div
      className={`rounded-2xl p-5 shadow-sm border flex items-center justify-between ${bg}`}
    >
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-3xl font-bold mt-1">{value}</p>
      </div>
      <div className="p-3 rounded-xl bg-white shadow">{icon}</div>
    </div>
  );
};
