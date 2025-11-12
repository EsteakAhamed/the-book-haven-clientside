import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-base-100 px-4">
            <img
                src="/assets/error.png"
                alt="Error Illustration"
                className="w-64 h-64 object-contain mb-8"
            />
            <h1 className="text-6xl font-extrabold text-primary mb-4">Oops!</h1>
            <p className="text-xl md:text-2xl text-gray-600 text-center mb-6">
                Something went wrong. The page you are looking for doesn't exist
                or an unexpected error occurred.
            </p>
            <Link
                to="/"
                className="btn btn-primary btn-lg text-white px-8 py-3 shadow-lg hover:shadow-xl transition-all"
            >
                Go Back Home
            </Link>
        </div>
    );
};

export default ErrorPage;
