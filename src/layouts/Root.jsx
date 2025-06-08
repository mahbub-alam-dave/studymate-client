import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../components/header/Navbar';
import Footer from '../components/Footer';

const Root = () => {
    return (
        <div>
            <Navbar />
            <div className='min-h-[73vh]'>
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default Root;