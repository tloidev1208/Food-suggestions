
import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="px-4 py-12 bg-gray-100">
      <div className="">
        {children}
      </div>
    </main>
  );
};

export default Layout;
