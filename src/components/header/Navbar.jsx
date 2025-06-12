import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router";
import { ContextValue } from "../../Contextes/AllContexts";
import Sidebar from "./Sidebar";
import { CiMenuFries } from "react-icons/ci";
import User from "../../components/header/User";

const Navbar = () => {
  const { user, logOutUser, mode, setMode } = useContext(ContextValue);
  const [displayMenu, setDisplayMenu] = useState(false);
  const sidebarRef = useRef(null);
  const menuButtonRef = useRef(null);

  console.log(mode)

  const handleLogout = () => {
    logOutUser();
  };

  const navLinks = (
    <>
      <NavLink to="/create-assignment">
        <span>Create Assignment</span>
      </NavLink>
      <NavLink to="/pending-assignments">
        <span>Pending Assignments</span>
      </NavLink>
      <NavLink to="/my-attempted-assignment">
        <span>Attempted Assignments</span>
      </NavLink>
    </>
  );

  const navLinks2 = (
    <>
      <NavLink to={"/"} className='text-white'>
        <span>Home</span>
      </NavLink>
      <NavLink to={"/assignments"} className='text-white'>
        <span>Assignments</span>
      </NavLink>
    </>
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        displayMenu &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        !menuButtonRef.current.contains(event.target)
      ) {
        setDisplayMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [displayMenu]);

  const handleMenuBtn = () => {
    setDisplayMenu((prev) => !prev);
  };

  return (
    <div className="bg-gradient-to-br from-[#00b4d8] to-[#03045e] dark:bg-gradient-to-br dark:from-[#03045e] dark:to-[#000814] w-full">
      <div className="p-5 w-full max-w-[1440px] mx-auto flex justify-between items-center gap-4 px-4 sm:px-5 md:px-6">
        <div className="">
          <h2 className="rancho text-2xl text-[var(--logo-text)] font-bold">
            Study <span className="text-white">Mate</span>
          </h2>
        </div>
        <div className=" hidden lg:flex gap-4 sm:gap-5 md:gap-6 lg:gap-8">
          {navLinks2}
        </div>
        <div className="flex  items-center gap-2">
          {user ? (
            <div className="flex gap-3 items-center">
            <User
              handleLogout={handleLogout}
              navLinks={navLinks}
            />
            <button onClick={handleLogout} className="btn hidden sm:block text-white bg-gradient-to-br from-[#00b4d8] to-[#03045e] dark:bg-gradient-to-br dark:from-[#03045e] dark:to-[#000814] border-none shadow-none">Logout</button>
            </div>
          ) : (
            <Link to="/login">
              <button className="btn text-white bg-gradient-to-br from-[#00b4d8] to-[#03045e] dark:bg-gradient-to-br dark:from-[#03045e] dark:to-[#000814]">Login</button>
            </Link>
          )}

          <CiMenuFries
            onClick={handleMenuBtn}
            className={`text-3xl font-bold block lg:hidden`}
          />
          {/* <input type="checkbox" value="cupcake" className="toggle theme-controller" /> */}
          <button onClick={() => setMode(!mode)} className="btn btn-sm">{mode ? "Dark" : "Light"}</button>
        </div>
      </div>
      <Sidebar displayMenu={displayMenu} setDisplayMenu={setDisplayMenu} handleLogout={handleLogout} />
    </div>
  );
};

export default Navbar;
