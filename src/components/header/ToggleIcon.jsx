import React, { useContext } from 'react';
import { MdDarkMode } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";
import { ContextValue } from '../../Contextes/AllContexts';

const ToggleIcon = () => {
    const {mode, setMode}= useContext(ContextValue)
    return (

        <div
          onClick={() => setMode(!mode)}
          className={`tooltip tooltip-right transition-colors duration-300 cursor-pointer ${mode ? "text-yellow-500" : "text-white"}`}
          data-tip={mode ? "toggle to light" :"toggle to dark" }
        >
          {mode ? <MdDarkMode size={28}/> : <MdOutlineLightMode size={28}/>}
        </div>
    );
};

export default ToggleIcon;