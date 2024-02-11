import React from 'react';
import { Outlet, Link } from "react-router-dom";

const Layout = () => {
    return (
        <div className='nav'>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/profile">Profile</Link>
            </nav>

            <Outlet />
        </div>
        
    )
};

export default Layout;