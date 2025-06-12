import React from 'react';

const Loader = () => {
    return (
        <div className='flex justify-center items-center min-h-screen  '>
            <span className='loading loading-spinner text-[#00b4d8] dark:text-[#03045e]'></span>
        </div>
    );
};

export default Loader;