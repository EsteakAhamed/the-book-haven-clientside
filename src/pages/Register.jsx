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
        <div className="min-h-screen flex items-center justify-center bg-base-100 text-base-content px-4">
            <div className="card w-full max-w-md shadow-lg bg-base-100 border border-base-300">
                <div className="card-body">
                    <h2 className="text-2xl font-bold text-center mb-4">Register</h2>
                    <form onSubmit={handleRegister} className="space-y-4">
                        <input
                            type="text"
                            placeholder="Name"
                            className="input input-bordered w-full"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                        <input
                            type="text"
                            placeholder="Photo URL"
                            className="input input-bordered w-full"
                            value={photoURL}
                            onChange={(e) => setPhotoURL(e.target.value)}
                        />
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
                        <button type="submit" className="btn btn-primary w-full text-white">
                            Register
                        </button>
                    </form>
                    <div className="mt-4 text-center">
                        <p>
                            Already have an account?{" "}
                            <Link to="/login" className="text-purple-500 hover:underline">
                                Login
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

export default Register;