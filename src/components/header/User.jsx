import React, { useContext } from 'react';
import { ContextValue } from '../../Contextes/AllContexts';
import { Link } from 'react-router';
import { CiMenuFries } from "react-icons/ci";

const User = () => {

/*   const navLinks = (
    <>
      <NavLink to="/create-assignment">
        <span>Create Assignment</span>
      </NavLink>
      <NavLink to="/my-attempted-assignment">
        <span>Attempted Assignments</span>
      </NavLink>
        <NavLink
          to="/my-bookmarked-assignment"
        >
          <span>Bookmarked Assignments</span>
        </NavLink>
        <NavLink
          to="/dashboard"
        >
          <span>Dashboard</span>
        </NavLink>
    </>
  ); */

    const {user} = useContext(ContextValue)
    return ( 
            <div className="dropdown dropdown-end ">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar tooltip tooltip-left"
                data-tip={user.displayName ? user.displayName : "anonymous" }
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="user Profile"
                    src={
                      user?.photoURL ||
                      "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    }
                  />
                </div>
              </div>

              {/* <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-gradient-to-l from-[#A8F1FF] to-[#00b4d8] dark:bg-gradient-to-br dark:from-[#03045e] dark:to-[#000814] text-gray-200 rounded-box z-1 mt-4 max-w-[420px] p-4 shadow flex flex-col gap-4"
              >
                {navLinks}
                
              </ul> */}
            </div>
    );
};

export default User;