import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../components/header/Navbar';
import Footer from '../components/Footer';

const Root = () => {
    return (
        <div className='bg-[var(--color-bg)] dark:bg-[var(--color-bg-dark)] w-full min-height-[100vh]'>
            <Navbar />
            <div className='min-h-[80vh] w-full px-4 sm:px-5 md:px-6'>
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default Root;