import React from 'react';
import Lottie from "lottie-react";
import error from '../assets/error.json'
import { Link } from 'react-router';

const NotFound = () => {
    return (
<div className="flex flex-col gap-5 items-center justify-center h-screen bg-white text-black p-4">
     <Lottie animationData={error} loop={true} />
     <Link to={'/'}>
        <button className="btn text-white bg-[#FF3F33] ">
         Go Home
        </button>
        </Link>
    </div>
    );
};

export default NotFound;