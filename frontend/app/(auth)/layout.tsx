import Header from "@/components/Header";
import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="">
      <div className="">
        {children}
      </div>
    </main>
  );
};

export default Layout;
