import { useState } from "react";
import DashboardNavbar from "../components/dashboard/DashboardNavbar";
import DashboardSidebar from "../components/dashboard/DashboardSidebar";
import { Outlet } from "react-router";

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="bg-[var(--color-bg)] dark:bg-[var(--color-bg-dark)]">
    <div className="max-w-[1440px] mx-auto flex h-screen ">
      {/* Sidebar for lg+ */}
      <DashboardSidebar isOpen={isSidebarOpen} closeSidebar={closeSidebar} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Mobile Navbar */}
        <DashboardNavbar openSidebar={() => setIsSidebarOpen(true)} />
        
        {/* Page Content */}
        <div
          onClick={closeSidebar}
          className="flex-1 p-4 overflow-y-auto bg-[var(--color-bg-card)] dark:bg-gray-900"
        >
          <Outlet />
        </div>
      </div>
    </div>
    </div>
  );
};

export default DashboardLayout;
