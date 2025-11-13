// src/components/Navbar.jsx
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const [isDark, setIsDark] = useState(false);

    // Load saved theme on mount
    useEffect(() => {
        const savedTheme = localStorage.getItem("theme") || "light";
        document.documentElement.setAttribute("data-theme", savedTheme);
        setIsDark(savedTheme === "dark");
    }, []);

    // Toggle theme
    const handleThemeToggle = (e) => {
        const theme = e.target.checked ? "dark" : "light";
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
        setIsDark(e.target.checked);
    };

    const handleLogout = async () => {
        try {
            await logout();
            toast.success("Logged out successfully");
        } catch (err) {
            toast.error("Logout failed");
        }
    };

    const navLinks = (
        <>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/all-books">All Books</Link></li>
            <li><Link to="/add-book">Add Book</Link></li>
            <li><Link to="/my-books">My Books</Link></li>
        </>
    );

    return (
        <div className="navbar bg-base-100 shadow-sm sticky top-0 z-50 text-base-content">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 z-[999]">
                        {navLinks}
                        {!user ? (
                            <>
                                <li><Link to="/login">Login</Link></li>
                                <li><Link to="/register">Register</Link></li>
                            </>
                        ) : (
                            <li>
                                <button onClick={handleLogout} className="text-red-500">Logout</button>
                            </li>
                        )}
                    </ul>
                </div>
                <Link to="/" className="btn btn-ghost normal-case text-xl text-purple-600 font-bold">📚 Book Haven</Link>
            </div>

            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navLinks}
                </ul>
            </div>

            <div className="navbar-end flex items-center gap-4">
                {/* Theme Toggle */}
                <label className="flex items-center gap-2 cursor-pointer">
                    <span className="text-sm">🌞</span>
                    <input
                        type="checkbox"
                        className="toggle"
                        onChange={handleThemeToggle}
                        checked={isDark}
                    />
                    <span className="text-sm">🌙</span>
                </label>

                {/* Auth Buttons */}
                {!user ? (
                    <div className="hidden lg:flex gap-2">
                        <Link to="/login" className="btn btn-sm btn-outline">Login</Link>
                        <Link to="/register" className="btn btn-sm btn-primary text-white">Register</Link>
                    </div>
                ) : (
                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full ring ring-purple-500 ring-offset-base-100 ring-offset-2">
                                <img src={user.photoURL} alt="User" />
                            </div>
                        </label>
                        <ul tabIndex={0} className="mt-3 z-[999] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                            <li className="text-sm px-2 py-1 font-medium">{user.displayName}</li>
                            <li>
                                <button onClick={handleLogout} className="text-red-500 hover:text-red-600">Logout</button>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;