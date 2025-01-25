/* eslint-disable no-unused-vars */
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";
import { IoMail } from "react-icons/io5";
import { FaLock } from "react-icons/fa";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [touched, setTouched] = useState({
    email: false,
    password: false,
  });
  const navigate = useNavigate();

  const validateEmail = (email) => {
    if (!email.trim()) return "Email is required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) ? "" : "Invalid email format";
  };

  const validatePassword = (password) => {
    if (!password.trim()) return "Password is required";
    return password.length < 6 ? "Password must be at least 6 characters" : "";
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    setTouched({ email: true, password: true });

    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    if (emailError || passwordError) {
      setError(emailError || passwordError);
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (error) {
      setError("Invalid email or password");
    }
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 py-12 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 blur-lg bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500"></div>

      <div className="relative z-10 max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-2xl">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md font-medium space-y-4">
            <div
              className={`flex items-center border rounded-md overflow-hidden ${
                touched.email && validateEmail(email)
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            >
              <div className="bg-gray-100 p-3 border-r border-gray-300">
                <IoMail className="text-gray-500" size={20} />
              </div>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                className="flex-grow px-3 py-2 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => handleBlur("email")}
              />
            </div>
            {touched.email && validateEmail(email) && (
              <p className="text-red-500 text-xs mt-1">
                {validateEmail(email)}
              </p>
            )}

            <div
              className={`flex items-center border rounded-md overflow-hidden ${
                touched.password && validatePassword(password)
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            >
              <div className="bg-gray-100 p-3 border-r border-gray-300">
                <FaLock className="text-gray-500" size={20} />
              </div>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                className="flex-grow px-3 py-2 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={() => handleBlur("password")}
              />
              <div
                className="bg-transparent p-3 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <IoIosEyeOff className="text-gray-500" size={20} />
                ) : (
                  <IoIosEye className="text-gray-500" size={20} />
                )}
              </div>
            </div>
            {touched.password && validatePassword(password) && (
              <p className="text-red-500 text-xs mt-1">
                {validatePassword(password)}
              </p>
            )}
          </div>

          <div>
            <button
              type="submit"
              className="group cursor-pointer relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
