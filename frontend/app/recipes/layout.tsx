import Header from "@/components/Header";
import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="">
        <Header />
      <div className="flex min-h-screen flex-col items-center justify-between py-24">
        {children}
      </div>
    </main>
  );
};

export default Layout;
