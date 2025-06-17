import React from 'react';
import Lottie from "lottie-react";
import emptyAnimation from '../assets/emptyAinmation.json'
import { Link } from 'react-router';

const EmptyComponents = ({message}) => {
    return (
        <div className='flex flex-col gap-4 py-12 justify-center items-center max-w-sm mx-auto'>
            <Lottie animationData={emptyAnimation} loop={true} />
            <h2 className='text-3xl font-bold text-[#FF3F33] dark:text-gray-200'>{message}</h2>
            <Link to={-1}><button className='btn bg-[#FF3F33] text-gray-200'>Go Back</button></Link>
            </div>
    );
};

export default EmptyComponents;