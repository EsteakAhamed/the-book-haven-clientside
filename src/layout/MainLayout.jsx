// src/layout/MainLayout.jsx
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Toaster } from "react-hot-toast";

const MainLayout = () => {
    return (
        <div className="flex flex-col min-h-screen bg-base-100 text-base-content">
            <Navbar />
            <main className="flex-grow container mx-auto px-4 py-6">
                <Outlet />
            </main>
            <Footer />
            <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
        </div>
    );
};

export default MainLayout;