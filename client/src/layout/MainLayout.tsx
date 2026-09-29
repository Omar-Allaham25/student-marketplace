import { Outlet } from "react-router-dom";
import { Footer } from "./footer";
import { Navbar } from "./Navbar";

export const MainLayout = () => {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50 text-gray-900">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
