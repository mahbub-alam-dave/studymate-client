import React, { useContext } from "react";
import { IoMdClose } from "react-icons/io";
import { NavLink } from "react-router";
import { ContextValue } from "../../Contextes/AllContexts";
import ToggleIcon from "./ToggleIcon";

const Sidebar = ({ displayMenu, setDisplayMenu, handleLogout }) => {
  const { user} = useContext(ContextValue);

  return (
    <div
      className={`text-gray-200 max-w-[300px] w-full bg-gradient-to-l from-[#A8F1FF] to-[#00b4d8] dark:bg-gradient-to-bl dark:from-[#03045e] dark:to-[#000814] shadow-lg shadow-gray-400 h-screen fixed top-0 transition-all duration-600 ease-in-out block lg:hidden ${
        displayMenu ? "right-0" : "right-[-300px]"
      } z-10`}
    >
      <div className="flex flex-col  gap-4 p-6 mt-10">
        <IoMdClose
          onClick={() => setDisplayMenu((display) => !display)}
          size={22}
        />
        <NavLink
          onClick={() => setDisplayMenu((display) => !display)}
          to={"/"}
          className="font-semibold text-base"
        >
          <span>Home</span>
        </NavLink>
        <NavLink
          onClick={() => setDisplayMenu((display) => !display)}
          to={"/assignments"}
          className="font-semibold text-base"
        >
          <span>Assignments</span>
        </NavLink>
        <div>
        <ToggleIcon />
        </div>
        <div className="flex flex-col gap-4 items-start">
        {user ? (
          <button onClick={handleLogout} className="btn bg-[#FF3F33] dark:bg-[#8E1616] block sm:hidden text-gray-200 border-none shadow-none">
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
