import React, { useContext } from 'react';
import { MdDarkMode } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";
import { ContextValue } from '../../Contextes/AllContexts';
import { useLocation } from 'react-router';

const ToggleIcon = ({setDisplayMenu, displayMenu, color}) => {
    const {mode, setMode}= useContext(ContextValue)
    const handleChangeMode = () => {
      setMode(!mode)
      setDisplayMenu(!displayMenu)
    }

  const location = useLocation();
  const isDashboard = location.pathname.startsWith("/dashboard");

  const colorClass = isDashboard
    ? mode
      ? "text-white"
      : "text-gray-400"
    : mode
      ? "text-white" 
      : "text-black"; 


    return (

        <div
          onClick={handleChangeMode}
          className={`tooltip tooltip-right transition-colors duration-300 cursor-pointer ${colorClass}`}
          data-tip={mode ? "toggle to light" :"toggle to dark" }
        >
          {mode ? <MdDarkMode size={28}/> : <MdOutlineLightMode size={28}/>}
        </div>
    );
};

export default ToggleIcon;