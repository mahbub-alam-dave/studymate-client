import React, { useContext } from 'react';
import { NavLink } from 'react-router';
import { ContextValue } from '../Contextes/AllContexts';

const Navbar = () => {

    const {user} = useContext(ContextValue)
    const navLinks = <>
    <NavLink to='/'><span>Home</span></NavLink>
    <NavLink to='/assignments'><span>Assignments</span></NavLink>
    </>

    return (
<div className='bg-base-100 w-full shadow-sm'>
<div className="navbar max-w-11/12 mx-auto flex justify-between gap-4">
  <div className="f">
    <a className="btn btn-ghost text-2xl text-pink-600">Study <span className='text-blue-600'>Mate</span></a>
  </div>
  <div className='flex gap-4 sm:gap-5 md:gap-6 lg:gap-8'>
    {navLinks}
  </div>
  <div className="flex-none">
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
          {
            user ?
        <div className="w-10 rounded-full">
            <img
            alt="user Profile"
            src={user.photoURL || 'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp'} />
          
        </div>
            :
            <button className='btn'>Login</button>
          }
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        {navLinks}
      </ul>
    </div>
  </div>
</div>
</div>
    );
};

export default Navbar;