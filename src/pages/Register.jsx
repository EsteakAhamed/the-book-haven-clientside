// src/pages/Register.jsx
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

const Register = () => {
    const { register, updateUser, googleLogin } = useContext(AuthContext);
    const [name, setName] = useState("");
    const [photoURL, setPhotoURL] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const validatePassword = (pass) => {
        const hasUpper = /[A-Z]/.test(pass);
        const hasLower = /[a-z]/.test(pass);
        const isLongEnough = pass.length >= 6;
        return hasUpper && hasLower && isLongEnough;
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        if (!validatePassword(password)) {
            toast.error("Password must include uppercase, lowercase, and be at least 6 characters");
            return;
        }

        try {
            await register(email, password);
            await updateUser({ displayName: name, photoURL });
            toast.success("Registration successful");
            navigate("/");
        } catch (err) {
            toast.error(err.message);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            await googleLogin();
            toast.success("Google login successful");
            navigate("/");
        } catch (err) {
            toast.error(err.message);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded">
            <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
            <form onSubmit={handleRegister} className="space-y-4">
                <input
                    type="text"
                    placeholder="Name"
                    className="w-full border px-3 py-2 rounded"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Photo URL"
                    className="w-full border px-3 py-2 rounded"
                    value={photoURL}
                    onChange={(e) => setPhotoURL(e.target.value)}
                />
                <input
                    type="email"
                    placeholder="Email"
                    className="w-full border px-3 py-2 rounded"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="w-full border px-3 py-2 rounded"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit" className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700">
                    Register
                </button>
            </form>
            <div className="mt-4 text-center">
                <p>
                    Already have an account?{" "}
                    <Link to="/login" className="text-purple-600 hover:underline">
                        Login
                    </Link>
                </p>
                <button
                    onClick={handleGoogleLogin}
                    className="mt-4 w-full border py-2 rounded hover:bg-gray-100"
                >
                    Continue with Google
                </button>
            </div>
        </div>
    );
};

export default Register;