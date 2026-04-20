import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../pages/Home/Shared/Navbar/Navbar';
import Footer from '../pages/Home/Shared/Footer/Footer';

const RootLayout = () => {
    return (
        <div className='min-h-screen bg-white'>
            <Navbar></Navbar>
            <main className="pt-[72px]">
                <Outlet></Outlet>
            </main>
            <Footer></Footer>
        </div>
    );
};

export default RootLayout;
