"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import ActivityByID from "@/components/Activities"; // Đảm bảo đúng tên file
import { Sun, Moon, CloudSun, CloudMoon } from "lucide-react";
import Image from "next/image";

interface Activity {
  images?: string[]; // hoặc kiểu phù hợp với dữ liệu thực tế
  id: number;
  name: string;
  distance: number;
  moving_time: number;
  sport_type: string;
  start_date_local: string;
}

function getTimeOfDay(name: string) {
  const lower = name.toLowerCase();
  if (lower.includes("morning")) {
    return {
      label: "Sáng",
      color: "bg-yellow-50 border-yellow-400",
      icon: <Sun className="w-6 h-6 text-yellow-500" />,
    };
  }
  if (lower.includes("noon") || lower.includes("afternoon")) {
    return {
      label: "Trưa",
      color: "bg-orange-50 border-orange-400",
      icon: <CloudSun className="w-6 h-6 text-orange-500" />,
    };
  }
  if (lower.includes("evening")) {
    return {
      label: "Chiều",
      color: "bg-blue-50 border-blue-400",
      icon: <CloudMoon className="w-6 h-6 text-blue-500" />,
    };
  }
  if (lower.includes("night")) {
    return {
      label: "Tối",
      color: "bg-gray-100 border-gray-400",
      icon: <Moon className="w-6 h-6 text-gray-600" />,
    };
  }
  return {
    label: "",
    color: "bg-white border-gray-200",
    icon: null,
  };
}

export default function ActivitiesList() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [filtered, setFiltered] = useState<Activity[]>([]);
  const [sportFilter, setSportFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("");

  const [currentPage, setCurrentPage] = useState(0);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const pageSize = 3;

  useEffect(() => {
    async function fetchData() {
      // B1: lấy token
      const tokenRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/strava/token`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          client_id: "177974",
          client_secret: "7092d11e41c2b89bef2b24678d29d27f587aa0b4",
          refresh_token: "0640a4dfef5184406480e3a7ae7bf61f59ccde8d",
        }),
      });
      const tokenData = await tokenRes.json();
      const accessToken = tokenData.access_token;

      // B2: gọi activities
      const actRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/strava/activities?access_token=${accessToken}`
      );
      const activitiesData = await actRes.json();

      setActivities(activitiesData);
      setFiltered(activitiesData);
    }

    fetchData();
  }, []);

  // Lọc khi thay đổi filter
  useEffect(() => {
    let temp = activities;

    if (sportFilter !== "all") {
      temp = temp.filter((a) => a.sport_type === sportFilter);
    }

    if (dateFilter) {
      temp = temp.filter((a) => a.start_date_local.slice(0, 10) === dateFilter);
    }

    setFiltered(temp);
  }, [sportFilter, dateFilter, activities]);

  // Tính toán dữ liệu hiển thị cho trang hiện tại
  const totalPages = Math.ceil(filtered.length / pageSize);
  const pagedData = filtered.slice(
    currentPage * pageSize,
    (currentPage + 1) * pageSize
  );

  return (
    <div className="space-y-10">
      <h2 className="text-2xl font-bold">Hoạt động của tôi</h2>

      {/* Bộ lọc */}
      <div className="flex gap-4 items-center">
        <Select onValueChange={setSportFilter} defaultValue="all">
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Chọn loại hoạt động" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả</SelectItem>
            <SelectItem value="Run">Run</SelectItem>
            <SelectItem value="Ride">Ride</SelectItem>
            <SelectItem value="Walk">Walk</SelectItem>
            <SelectItem value="Swim">Swim</SelectItem>
          </SelectContent>
        </Select>

        <Input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="w-[200px]"
        />
      </div>

      {/* Layout 2 cột */}
      <div className="grid grid-cols-2 md:grid-cols-2 gap-8">
        {/* Bên trái: danh sách card nhỏ + pagination */}
        <div className="space-y-4 p-4 border rounded-xl bg-white shadow">
          {pagedData.map((act) => {
            const timeOfDay = getTimeOfDay(act.name);
            return (
              <Card
                key={act.id}
                className={`shadow-md hover:shadow-lg transition mx-auto cursor-pointer border-2 ${timeOfDay.color} ${
                  selectedId === act.id ? "border-blue-500" : ""
                }`}
                onClick={() => setSelectedId(act.id)}
              >
                <div className="flex items-center gap-4 p-4">
                  <CardHeader className="p-0 flex-1">
                    <CardTitle className="text-base flex items-center gap-2">
                      {timeOfDay.icon}
                      {act.name}
                    </CardTitle>
                    <p className="text-xs text-gray-500">
                      {format(new Date(act.start_date_local), "dd/MM/yyyy HH:mm")}
                    </p>
                    {timeOfDay.label && (
                      <span className="text-xs font-semibold text-gray-500">
                        {timeOfDay.label}
                      </span>
                    )}
                  </CardHeader>
                  <CardContent className="p-0">
                    {act.sport_type === "Walk" && (
                      <div className="w-16 h-16 flex-shrink-0 relative">
                        <Image
                          src="/images/training.png"
                          alt="Training"
                          fill
                          className="object-cover rounded-md"
                          sizes="64px"
                        />
                      </div>
                    )}
                  </CardContent>
                </div>
              </Card>
            );
          })}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-4">
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 0))}
                disabled={currentPage === 0}
                className="px-3 py-1 rounded border bg-white text-gray-700 hover:bg-gray-100"
              >
                Trước
              </button>
              <span>
                Trang {currentPage + 1} / {totalPages}
              </span>
              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(p + 1, totalPages - 1))
                }
                disabled={currentPage === totalPages - 1}
                className="px-3 py-1 rounded border bg-white text-gray-700 hover:bg-gray-100"
              >
                Sau
              </button>
            </div>
          )}
        </div>

        {/* Bên phải: truyền id vào ActivityByID */}
        <ActivityByID id={selectedId} />
      </div>
    </div>
  );
}
