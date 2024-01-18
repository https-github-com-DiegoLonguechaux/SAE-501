import React, { useState, useEffect } from 'react';
import Logo from "./Logo.js";
import { Link } from 'react-router-dom';

function Header() {
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userEmail, setUserEmail] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('userToken');
        const email = localStorage.getItem('userEmail');
        if (token && email) {
            setIsLoggedIn(true);
            setUserEmail(email);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('userToken');
        localStorage.removeItem('userEmail');
        setIsLoggedIn(false);
        setUserEmail('');
    };

    return (
        <div className="flex justify-between items-center py-6 px-3">
            <div className="flex-1"></div>

            <div className="flex-1 flex justify-center">
                <Logo/>
            </div>

            <div className="flex-1 flex justify-end">
                {isLoggedIn ? (
                    <div className="flex items-center gap-3">
                        <div className="p-2 text-l">
                            Connect as <b>{userEmail}</b>
                        </div>
                        |
                        <button onClick={handleLogout} className="px-4 py-2 bg-red-500 text-white rounded">
                            Logout
                        </button>
                    </div>
                ) : (
                    <div className="flex justify-center items-center gap-4">
                        <Link to="/login-form">
                            <button className="px-4 py-2 text-black">
                                Log in
                            </button>
                        </Link>
                        |
                        <Link to="/signup-form">
                            <button className="px-4 py-2 bg-green-500 text-black">
                                Register
                            </button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Header;
