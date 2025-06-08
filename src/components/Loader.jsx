import React from 'react';

const Loader = () => {
    return (
        <div className='flex justify-center items-center max-h-screen bg-gray-400 opacity-5'>
            <span className='loading loading-spinner'></span>
        </div>
    );
};

export default Loader;