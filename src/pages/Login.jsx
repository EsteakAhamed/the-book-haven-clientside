// src/pages/Login.jsx
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useLocation, useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

const Login = () => {
    const { login, googleLogin } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            toast.success("Login successful");
            navigate(from, { replace: true });
        } catch (err) {
            toast.error(err.message);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            await googleLogin();
            toast.success("Google login successful");
            navigate(from, { replace: true });
        } catch (err) {
            toast.error(err.message);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded">
            <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
            <form onSubmit={handleLogin} className="space-y-4">
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
                <p className="text-sm text-right text-gray-500">Forget Password?</p>
                <button type="submit" className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700">
                    Login
                </button>
            </form>
            <div className="mt-4 text-center">
                <p>
                    Don't have an account?{" "}
                    <Link to="/register" className="text-purple-600 hover:underline">
                        Register
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

export default Login;