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
            setTimeout(() => {
                navigate(from, { replace: true });
            }, 100); 
        } catch (err) {
            toast.error(err.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-base-100 text-base-content px-4">
            <div className="card w-full max-w-md shadow-lg bg-base-100 border border-base-300">
                <div className="card-body">
                    <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <input
                            type="email"
                            placeholder="Email"
                            className="input input-bordered w-full"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            className="input input-bordered w-full"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <p className="text-sm text-right text-gray-500">Forget Password?</p>
                        <button type="submit" className="btn btn-primary w-full text-white">
                            Login
                        </button>
                    </form>
                    <div className="mt-4 text-center">
                        <p>
                            Don't have an account?{" "}
                            <Link to="/register" className="text-purple-500 hover:underline">
                                Register
                            </Link>
                        </p>
                        <button
                            onClick={handleGoogleLogin}
                            className="btn btn-outline w-full mt-4"
                        >
                            Continue with Google
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;