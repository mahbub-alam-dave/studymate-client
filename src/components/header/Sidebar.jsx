import React, { useContext } from "react";
import { IoMdClose } from "react-icons/io";
import { NavLink } from "react-router";
import { ContextValue } from "../../Contextes/AllContexts";
import ToggleIcon from "./ToggleIcon";

const Sidebar = ({ displayMenu, setDisplayMenu, handleLogout }) => {
  const { user } = useContext(ContextValue);

  return (
    <div
      className={` max-w-[300px] w-full bg-[var(--color-bg-card)] dark:bg-[var(--color-bg-card-dark)] text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-dark)] shadow-sm shadow-gray-200 h-screen fixed top-0 transition-all duration-600 ease-in-out block lg:hidden  ${
        displayMenu ? "right-0" : "right-[-300px]"
      } z-10`}
    >
      <div className="flex flex-col  gap-4 px-3 py-6 mt-10">
        <IoMdClose
          onClick={() => setDisplayMenu((display) => !display)}
          size={22}
          className="mx-3"
        />
        <NavLink
          onClick={() => setDisplayMenu((display) => !display)}
          to={"/"}
          className="hover:bg-[#00b4d8] dark:hover:bg-[#03045e] px-3"
        >
          <span>Home</span>
        </NavLink>
        <NavLink
          onClick={() => setDisplayMenu((display) => !display)}
          to={"/assignments"}
          className="hover:bg-[#00b4d8] dark:hover:bg-[#03045e] px-3"
        >
          <span>Assignments</span>
        </NavLink>
        <NavLink
          onClick={() => setDisplayMenu((display) => !display)}
          to={"/About"}
          className="h-full flex items-center hover:bg-[#c9c9c965] dark:hover:bg-[#c2c2c21c] px-3"
        >
          <span>About</span>
        </NavLink>
        <NavLink
          onClick={() => setDisplayMenu((display) => !display)}
          to={"/blogs"}
          className="h-full flex items-center hover:bg-[#c9c9c965] dark:hover:bg-[#c2c2c21c] px-3"
        >
          <span>Blogs</span>
        </NavLink>
        {user && (
          <NavLink
            onClick={() => setDisplayMenu((display) => !display)}
            to="/dashboard"
            className="hover:bg-[#00b4d8] dark:hover:bg-[#03045e] px-3"
          >
            <span>Dashboard</span>
          </NavLink>
        )}
        <div className="px-3">
          <ToggleIcon
            setDisplayMenu={setDisplayMenu}
            displayMenu={displayMenu}
          />
        </div>
        <div className="flex flex-col gap-4 items-start px-3">
          {user ? (
            <button
              onClick={handleLogout}
              className="btn bg-[#FF3F33] dark:bg-[#8E1616] block sm:hidden text-gray-200 border-none shadow-none"
            >
              Logout
            </button>
          ) : (
            <NavLink to={"/login"}>
              <button
                onClick={() => setDisplayMenu((display) => !display)}
                className="btn sm:hidden bg-[#4ED7F1] dark:bg-[#03045e] text-gray-200 hover:bg-transparent hover:font-bold transition-colors hover:border-2 duration-100"
              >
                Login
              </button>
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
