import React, { useContext } from 'react';
import { IoMdClose } from "react-icons/io";
import { NavLink } from 'react-router';
import { ContextValue } from '../../Contextes/AllContexts';

const Sidebar = ({displayMenu, setDisplayMenu, handleLogout}) => {

    const {user} = useContext(ContextValue)
    
    return (
        <div
          className={`max-w-[300px] w-full bg-white shadow-lg h-screen fixed top-0 transition-all duration-600 ease-in-out block lg:hidden ${
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
            {user ? 
            <button onClick={handleLogout} className="btn block sm:hidden">Logout</button>
            :
            (
              <NavLink to={"/login"}>
                <button onClick={() => setDisplayMenu((display) => !display)} className='btn font-semibold text-base'>Login</button>
              </NavLink>
            )}
            {/* <div className="md:hidden">{getNavItems()}</div> */}
          </div>
        </div>
    );
};

export default Sidebar;