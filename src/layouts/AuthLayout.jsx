import React from 'react';
import { Link, Outlet } from 'react-router';
import ProFastLogo from '../pages/Home/Shared/Logo/ProFastLogo';

const AuthLayout = () => {
    return (
        <div className="min-h-screen bg-slate-50">
            {/* Logo */}
            <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
                <Link to="/">
                    <ProFastLogo />
                </Link>
            </div>

            {/* Grid layout */}
            <div className="mx-auto grid w-full max-w-7xl grid-cols-1 lg:grid-cols-2 gap-4 px-4 sm:px-6 lg:px-8 pb-8">

                {/* LEFT SIDE */}
                <div className="flex min-h-[calc(100vh-120px)] items-center justify-center rounded-2xl border border-blue-100 bg-white shadow-sm">
                    <Outlet />
                </div>

                {/* RIGHT SIDE - hidden on small screens */}
                <div className="hidden lg:flex rounded-2xl bg-gradient-to-br from-blue-100 via-sky-100 to-indigo-100 items-center justify-center overflow-hidden border border-blue-100">
                    <img src="/src/assets/authImage.png" alt="Authentication visual" className="h-full w-full object-cover" />
                </div>
            </div>
        </div>

    );
};

export default AuthLayout;
