// src/components/Navbar.jsx
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);

    return (
        <header className="bg-white shadow-md sticky top-0 z-50">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold text-purple-600">📚 Book Haven</Link>

                <nav className="flex gap-4 items-center">
                    <Link to="/" className="hover:text-purple-600">Home</Link>
                    <Link to="/all-books" className="hover:text-purple-600">All Books</Link>
                    <Link to="/add-book" className="hover:text-purple-600">Add Book</Link>
                    <Link to="/my-books" className="hover:text-purple-600">My Books</Link>

                    {!user ? (
                        <>
                            <Link to="/login" className="hover:text-purple-600">Login</Link>
                            <Link to="/register" className="hover:text-purple-600">Register</Link>
                        </>
                    ) : (
                        <div className="relative group">
                            <img
                                src={user.photoURL}
                                alt="User"
                                className="w-8 h-8 rounded-full border-2 border-purple-500"
                            />
                            <div className="absolute top-10 left-0 bg-white shadow-lg p-2 rounded hidden group-hover:block">
                                <p className="text-sm font-medium">{user.displayName}</p>
                                <button
                                    onClick={logout}
                                    className="mt-2 text-xs text-red-500 hover:underline"
                                >
                                    Log Out
                                </button>
                            </div>
                        </div>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Navbar;