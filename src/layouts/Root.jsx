import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../components/header/Navbar';
import Footer from '../components/Footer';

const Root = () => {
    return (
        <div className='bg-gray-100 dark:bg-[#000814] w-full min-height-[100vh]'>
            <Navbar />
            <div className='min-h-[80vh] w-full'>
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default Root;