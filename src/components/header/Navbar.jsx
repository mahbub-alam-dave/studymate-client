import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { ContextValue } from "../../Contextes/AllContexts";
// import Sidebar from "./Sidebar";
import { CiMenuFries } from "react-icons/ci";
import User from "../../components/header/User";
import ToggleIcon from "./ToggleIcon";
import Swal from "sweetalert2";
import { IoMdClose } from "react-icons/io";
import Sidebar from "./Sidebar";

import { PiStudent } from "react-icons/pi";

import logo from "../../assets/world.png"
import logoWhite from "../../assets/world (1).png"

const Navbar = () => {
  const { user, logOutUser, loading } = useContext(ContextValue);
  const [displayMenu, setDisplayMenu] = useState(false);
  const sidebarRef = useRef(null);
  const menuButtonRef = useRef(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    logOutUser()
      .then(() => {
        navigate("/");
        setDisplayMenu((display) => !display)
      })
      .catch((error) => {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: error.message,
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };


  const navLinks = (
    <>
      <NavLink
        to={"/"}
        className="h-full flex items-center hover:bg-[#c9c9c965] dark:hover:bg-[#c2c2c21c] px-3"
      >
        <span>Home</span>
      </NavLink>
      <NavLink
        to={"/assignments"}
        className="h-full flex items-center hover:bg-[#c9c9c965] dark:hover:bg-[#c2c2c21c] px-3"
      >
        <span>Assignments</span>
      </NavLink>
      <NavLink
        to={"/About"}
        className="h-full flex items-center hover:bg-[#c9c9c965] dark:hover:bg-[#c2c2c21c] px-3"
      >
        <span>About</span>
      </NavLink>
      <NavLink
        to={"/blogs"}
        className="h-full flex items-center hover:bg-[#c9c9c965] dark:hover:bg-[#c2c2c21c] px-3"
      >
        <span>Blogs</span>
      </NavLink>
      <NavLink
        to={"/find-tutor"}
        className="h-full flex items-center hover:bg-[#c9c9c965] dark:hover:bg-[#c2c2c21c] px-3"
      >
        <span>Find Tutor</span>
      </NavLink>
      {user && (
        <> 
        <NavLink
        className="h-full flex items-center hover:bg-[#c9c9c965] dark:hover:bg-[#c2c2c21c] px-3"
          to="/dashboard"
        >
          <span>Dashboard</span>
        </NavLink>
        </>
      )}
      
    </>
  );

  // menu hidden code
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

  // navbar shadow 
    const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0); // true if page is scrolled down
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // bg-gradient-to-br from- to-[rgb(3,5,94)] dark:bg-gradient-to-br dark:from-[#03045e] dark:to-[#000814]
  if (loading) return null;
  return (
    <div className={`h-[80px] bg-[var(--color-bg-card)] dark:bg-[var(--color-bg-card-dark)] w-full   px-4 sm:px-5 md:px-6 fixed top-0 z-1000 ${scrolled ? "shadow-sm dark:shadow-gray-800" : ""}`}>
      {/* border-b border-[var(--color-border)] dark:border-[var(--color-border-dark)] shadow-md */}

      <div className="h-full max-w-[1440px] w-full mx-auto flex justify-between items-center gap-4 ">
        <div className="flex items-center gap-2">
          <PiStudent size={38} className="text-2xl text-[var(--color-primary)] dark:text-[var(--color-primary-dark)]"/>
          <span className="rancho font-medium text-3xl text-[var(--color-primary)] dark:text-[var(--color-primary-dark)]">Edumate</span>
        </div>
        <div className="h-full lg:items-center justify-center hidden lg:flex gap-4 sm:gap-5 md:gap-6 xl:gap-8 font-medium text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-dark)]">
          {navLinks}
        </div>
        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex gap-5 items-center">
              <User handleLogout={handleLogout} />
              {/* bg-gradient-to-br from-[#00b4d8] to-[#03045e] dark:bg-gradient-to-br dark:from-[#03045e] dark:to-[#000814] */}
              <button
                onClick={handleLogout}
                className="btn hidden bg-[var(--color-primary)] dark:bg-[var(--color-primary-dark)] text-[var(--color-text-primary-dark)]  transition-colors duration-100 sm:block shadow-none"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login">
              {/* bg-gradient-to-br from-[#00b4d8] to-[#03045e] dark:bg-gradient-to-br dark:from-[#03045e] dark:to-[#000814] */}
              <button className="btn hidden sm:block bg-[var(--color-primary)] dark:bg-[var(--color-primary-dark)] text-[var(--color-text-primary-dark)] transition-colors duration-100">
                Login
              </button>
            </Link>
          )}

          <CiMenuFries
            onClick={handleMenuBtn}
            className={`text-3xl text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-dark)] font-bold block lg:hidden`}
          />
          {/* <input type="checkbox" value="cupcake" className="toggle theme-controller" /> */}
          <div className="hidden lg:flex items-center">
            <ToggleIcon setDisplayMenu={setDisplayMenu} displayMenu={displayMenu}/>
          </div>
        </div>
      </div>
      <Sidebar
        displayMenu={displayMenu}
        setDisplayMenu={setDisplayMenu}
        handleLogout={handleLogout}
      />
    </div>
  );
};

export default Navbar;

/* 
<div
      className={`text-gray-200 max-w-[300px] w-full bg-gradient-to-l from-[#A8F1FF] to-[#00b4d8] dark:bg-gradient-to-bl dark:from-[#03045e] dark:to-[#000814] shadow-lg shadow-gray-400 h-screen fixed top-0 transition-all duration-600 ease-in-out  ${
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
              {user && (
                <NavLink
                  to="/pending-assignments"
                  className="hover:bg-[#00b4d8] dark:hover:bg-[#03045e] px-3"
                >
                  <span>Pending Assignments</span>
                </NavLink>
              )}
        <div className="px-3">
        <ToggleIcon />
        </div>
        <div className="flex flex-col gap-4 items-start px-3">
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
    </div> */
