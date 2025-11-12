// src/components/Footer.jsx
const Footer = () => {
    return (
        <footer className="bg-gray-100 text-center py-4 mt-10 border-t">
            <p className="text-sm text-gray-600">
                &copy; {new Date().getFullYear()} The Book Haven. All rights reserved.
            </p>
        </footer>
    );
};

export default Footer;