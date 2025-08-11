import { FaBook, FaPlus, FaList, FaBookmark, FaUser, FaClock } from "react-icons/fa";
import { motion } from "framer-motion";
import { Link, NavLink } from "react-router";
import { PiStudent } from "react-icons/pi";
import ToggleIcon from "../../components/header/ToggleIcon"
import { useContext } from "react";
import { ContextValue } from "../../Contextes/AllContexts";

const navItems = [
  { to: "/dashboard/overview", label: "Overview", icon: <FaBook /> },
  { to: "/dashboard/create-assignment", label: "Create Assignment", icon: <FaPlus /> },
  { to: "/dashboard/pending-assignments", label: "Pending Assignments", icon: <FaClock /> },
  { to: "/dashboard/pending-assignments", label: "My Assignments", icon: <FaClock /> },
  { to: "/dashboard/my-attempted-assignment", label: "Attempted Assignments", icon: <FaList /> },
  { to: "/dashboard/my-bookmarked-assignments", label: "My Bookmarks", icon: <FaBookmark /> },
  { to: "/dashboard/profile", label: "Profile", icon: <FaUser /> },
];

const DashboardSidebar = ({ isOpen, closeSidebar }) => {
  const {logOutUser} = useContext(ContextValue)


  return (
    <>
      {/* Sidebar for large screens */}
      <div className="hidden lg:flex flex-col w-96 bg-[var(--color-primary)] dark:bg-[var(--color-primary-dark)] text-[var(--color-text-primary-dark)] border-r border-[var(--color-border)] dark:border[var(--color-border-dark)] p-8">
        <Link to={'/'}>
            <div className="flex items-center gap-2">
              <PiStudent size={38} className="text-2xl text-[var(--color-text-primary-dark)]"/>
              <span className="rancho font-medium text-3xl text-[var(--color-text-primary-dark)]">Edumate</span>
            </div>
        </Link>
        <nav className="flex-1 flex flex-col space-y-2 mt-8 dashboardNavLink">
          {navItems.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              className="flex items-center gap-3 p-2 rounded hover:bg-white/10"
            >
              {item.icon}
              {item.label}
            </NavLink>
          ))}
          <button onClick={() => logOutUser()} className="btn btn-outline mb-3 text-[var(--color-text-primary-dark)] hover:bg-white/10 ">Logout</button>
          <ToggleIcon />
        </nav>
      </div>

      {/* Mobile Sidebar */}
      {isOpen && (
        <motion.div
          initial={{ x: -300 }}
          animate={{ x: 0 }}
          exit={{ x: -300 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-transparent bg-opacity-40 z-50"
          onClick={closeSidebar}
        >
          <div
            className="w-74 bg-[var(--color-primary)] dark:bg-[var(--color-primary-dark)] text-[var(--color-text-primary-dark)] h-full p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <Link to={'/'}>
<div className="flex items-center gap-2">
              <PiStudent size={38} className="text-2xl text-[var(--color-text-primary-dark)]"/>
              <span className="rancho font-medium text-3xl text-[var(--color-text-primary-dark)]">Edumate</span>
            </div>
        </Link>
            <nav className="space-y-2 flex flex-col mt-6 dashboardNavLink">
              {navItems.map(item => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={closeSidebar}
                  className="flex items-center gap-3 p-2 rounded hover:bg-white/10"
                >
                  {item.icon}
                  {item.label}
                </NavLink>
              ))}

            <button onClick={() => logOutUser()} className=" btn btn-outline mb-3 text-[var(--color-text-primary-dark)] hover:bg-white/10 ">Logout</button>
          <ToggleIcon className="mt-4" />
            </nav>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default DashboardSidebar;
