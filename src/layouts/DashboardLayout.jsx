import { useState } from "react";
import DashboardNavbar from "../components/dashboard/DashboardNavbar";
import DashboardSidebar from "../components/dashboard/DashboardSidebar";
import { Outlet } from "react-router";

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [openNavbar, setOpenNavbar] = useState(false)

  const closeSidebar = () => {
    setIsSidebarOpen(false)
    setOpenNavbar(false)
  };
  const openSidebar = () => {
    setIsSidebarOpen(true)
  }

  return (
    <div className="bg-[var(--color-bg)] dark:bg-[var(--color-bg-dark)]">
    <div className=" flex h-screen ">
      {/* Sidebar for lg+ */}
      <DashboardSidebar isOpen={isSidebarOpen} closeSidebar={closeSidebar} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Mobile Navbar */}
        <DashboardNavbar openSidebar={openSidebar} openNavbar={openNavbar} setOpenNavbar={setOpenNavbar} />
        
        {/* Page Content */}
        <div
          onClick={closeSidebar}
          className="flex-1 px-4 sm:px-5 md:px-6 overflow-y-auto bg-[var(--color-bg)] dark:bg-[var(--color-bg-dark)] "
        >
          <Outlet />
        </div>
      </div>
    </div>
    </div>
  );
};

export default DashboardLayout;
