"use client";
import { Settings } from "lucide-react";
import ChangePassword from "@/components/ChangePassword";
import ChangeUserInfo from "@/components/ChangeUserInfo";

const SettingPage = () => {
 
  return (
    <div
      className="flex flex-col items-center justify-start min-h-screen px-6 py-10 transition-colors duration-300 "
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-8 mt-24">
        <Settings className="w-7 h-7 text-red-500" />
        <h1 className="text-3xl font-bold text-red-500">Cài đặt</h1>
      </div>
      <div className="w-full max-w-4xl space-y-12">
          <ChangeUserInfo/>
        <ChangePassword/>
      </div>
      
    </div>
  );
};

export default SettingPage;
