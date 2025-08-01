import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="">
        <Header />
      <div className="py-12">
        {children}
      </div>
      <Footer/>
    </main>
  );
};

export default Layout;
