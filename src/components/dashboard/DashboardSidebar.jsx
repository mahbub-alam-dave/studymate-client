import { FaBook, FaPlus, FaList, FaBookmark, FaUser, FaClock } from "react-icons/fa";
import { motion } from "framer-motion";
import { Link, NavLink } from "react-router";

const navItems = [
  { to: "/dashboard/overview", label: "Overview", icon: <FaBook /> },
  { to: "/dashboard/create-assignment", label: "Create Assignment", icon: <FaPlus /> },
  { to: "/dashboard/my-attempted-assignment", label: "Attempted Assignments", icon: <FaList /> },
  { to: "/dashboard/pending-assignments", label: "Pending Assignments", icon: <FaClock /> },
  { to: "/dashboard/my-bookmarked-assignments", label: "Bookmarked", icon: <FaBookmark /> },
  { to: "/dashboard/profile", label: "Profile", icon: <FaUser /> },
];

const DashboardSidebar = ({ isOpen, closeSidebar }) => {
  return (
    <>
      {/* Sidebar for large screens */}
      <div className="hidden lg:flex flex-col w-64 bg-[var(--color-secondary)] dark:bg-[var(--color-secondary-dark)] text-[var(--color-text-primary-dark)] border-r border-[var(--color-border)] dark:border[var(--color-border-dark)]">
        <Link to={'/'}>
        {/* <div className=" text-2xl font-bold ">StudyMate</div> */}
        <div className="p-6 border-b border-[var(--color-border)] dark:border[var(--color-border-dark)]">
          <h2 className="rancho text-2xl text-[var(--color-primary)] dark:text-[var(--color-primary-dark)] font-bold">
            Study <span className="text-[var(--color-text-primary-dark)]">Mate</span>
          </h2>
        </div>
        </Link>
        <nav className="flex-1 p-4 space-y-2">
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
            className="w-64 bg-[var(--color-secondary)] dark:bg-[var(--color-secondary-dark)] text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-dark)] border-r border-[var(--color-border)] dark:border[var(--color-border-dark)] h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <Link to={'/'}><div className="p-6 border-b border-[var(--color-border)] dark:border[var(--color-border-dark)]">
          <h2 className=" rancho text-2xl text-[var(--color-primary)] dark:text-[var(--color-primary-dark)] font-bold">
            Study <span className="text-[var(--color-text-primary-dark)]">Mate</span>
          </h2>
        </div></Link>
            <nav className="space-y-2 px-4">
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
            </nav>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default DashboardSidebar;
