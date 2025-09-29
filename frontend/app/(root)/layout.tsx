"use client";

import Footer from "@/components/Footer";
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
          className={`transition-all duration-300 flex-1 px-6 ${
            isOpen ? "ml-64" : "ml-20"
          }`}
        >
          {children}
        </div>
      </div>

      <Footer />
    </main>
  );
};

export default Layout;
