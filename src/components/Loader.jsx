import React from 'react';
import LoadingGif from '../assets/loadingGif.json'
import Lottie from "lottie-react";

const Loader = () => {
    return (
        <div className='flex justify-center items-center min-h-screen  max-w-sm w-full'>
            {/* <span className='loading loading-spinner text-[#00b4d8] dark:text-[#03045e]'></span> */}
            <Lottie animationData={LoadingGif} loop={true} 
            style={{ width: 150, height: 150 }} />;
        </div>
    );
};

export default Loader;