import React from 'react';
import Lottie from "lottie-react";
import emptyAnimation from '../assets/emptyAinmation.json'

const EmptyComponents = ({message}) => {
    return (
        <div className='flex flex-col gap-4 py-12 justify-center items-center'>
            <Lottie animationData={emptyAnimation} loop={true} />
            <h2 className='text-3xl font-bold text-gray-200'>{message}</h2>
            </div>
    );
};

export default EmptyComponents;