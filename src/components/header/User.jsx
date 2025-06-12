import React, { useContext } from 'react';
import { ContextValue } from '../../Contextes/AllContexts';
import { Link } from 'react-router';
import { CiMenuFries } from "react-icons/ci";

const User = ({navLinks}) => {
    const {user} = useContext(ContextValue)
    return ( 
            <div className="dropdown dropdown-end ">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
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

              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-white dark:bg-gray-500 dark:text-gray-200 rounded-box z-1 mt-4 max-w-[420px] p-4 shadow flex flex-col gap-4"
              >
                {navLinks}
                
              </ul>
            </div>
    );
};

export default User;