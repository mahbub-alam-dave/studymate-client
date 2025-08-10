import { useState } from "react";
import { FaBars } from "react-icons/fa";
import { PiStudent } from "react-icons/pi";

const DashboardNavbar = ({ openSidebar, openNavbar, setOpenNavbar }) => {
  
  const handleDashboardMenu = ()=> {
openSidebar()
setOpenNavbar(true)
  }
  return (
    <div className={`${openNavbar ? "hidden" : "flex"} lg:hidden flex items-center gap-6 bg-[var(--color-primary)] dark:bg-[var(--color-primary-dark)] text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-dark)] px-4 sm:px-5 md:px-6 py-6 border-b`}>
      <button onClick={handleDashboardMenu}>
        <FaBars size={22} className="text-[var(--color-text-primary-dark)]"/>
      </button>
      {/* <div className="text-xl font-bold p-6 border-b border-[var(--color-border)] dark:border[var(--color-border-dark)]">StudyMate</div> */}
      <div className="flex items-center gap-2">
                    <PiStudent size={38} className="text-2xl text-[var(--color-text-primary-dark)]"/>
                    <span className="rancho font-medium text-3xl text-[var(--color-text-primary-dark)]">Edumate</span>
                  </div>
      <div></div>
    </div>
  );
};

export default DashboardNavbar;
