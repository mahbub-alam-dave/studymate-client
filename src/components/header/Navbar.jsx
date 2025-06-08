import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router";
import { ContextValue } from "../../Contextes/AllContexts";
import Sidebar from "./Sidebar";
import { CiMenuFries } from "react-icons/ci";
import User from "../../components/header/User";

const Navbar = () => {
  const { user, logOutUser } = useContext(ContextValue);
  const [displayMenu, setDisplayMenu] = useState(false);
  const sidebarRef = useRef(null);
  const menuButtonRef = useRef(null);

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
      <NavLink to={"/"}>
        <span>Home</span>
      </NavLink>
      <NavLink to={"/assignments"}>
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
    <div className="bg-base-100 w-full shadow-sm">
      <div className="navbar w-full  sm:max-w-11/12 mx-auto flex justify-between gap-4">
        <div className="f">
          <h2 className="rancho text-2xl text-pink-600 font-bold">
            Study <span className="text-blue-600">Mate</span>
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
            <button onClick={handleLogout} className="btn hidden sm:block text-white bg-[var(--color-primary)]">Logout</button>
            </div>
          ) : (
            <Link to="/login">
              <button className="btn text-white bg-[var(--color-primary)]">Login</button>
            </Link>
          )}

          <CiMenuFries
            onClick={handleMenuBtn}
            className={`text-3xl font-bold block lg:hidden`}
          />
          <input type="checkbox" value="dark" className="toggle theme-controller" />
        </div>
      </div>
      <Sidebar displayMenu={displayMenu} setDisplayMenu={setDisplayMenu} handleLogout={handleLogout} />
    </div>
  );
};

export default Navbar;
