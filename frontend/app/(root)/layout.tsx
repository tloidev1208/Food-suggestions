"use client";

import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { ReactNode, useState } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <main className="min-h-screen bg-white">
      <Header />

      <div className="flex">
        {/* Sidebar */}
        <Sidebar isOpen={isOpen} toggle={() => setIsOpen(!isOpen)} />

        {/* Nội dung chính */}
        <div
          className={`transition-all duration-300 flex-1 px-1 ${
            isOpen ? "ml-52" : "ml-[75px]"
          }`}
        >
          {children}
        </div>
      </div>

     
    </main>
  );
};

export default Layout;
