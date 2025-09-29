import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="py-6 px-0 sm:px-4">
      <div>
        {children}
      </div>
    </main>
  );
};

export default Layout;
