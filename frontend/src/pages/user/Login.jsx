import React, { useState } from "react";
import { MdOutlineAlternateEmail, MdOutlineRemoveRedEye } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";
import GoogleLogin from "../../components/Social/GoogleLogin";
import useAuth from "../../hooks/useAuth";
import Scroll from "../../hooks/useScroll";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const location = useLocation();
  const { login, error, setError, loader, setLoader } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    setError(""); // Clear any previous error
    e.preventDefault();

    const data = new FormData(e.target);
    const formData = Object.fromEntries(data);

    setLoader(true); // Show loader when submitting
    login(formData.email, formData.password)
      .then(() => {
        setLoader(false); // Hide loader after successful login
        navigate(location.state?.from || "/dashboard");
      })
      .catch((err) => {
        setError("Invalid email or password. Please try again.");
        setLoader(false); // Hide loader after error
      });
  };

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      <Scroll />
      <h1 className="text-2xl font-bold text-secondary sm:text-3xl text-center">
        Log In to Your Account
      </h1>
      <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
        Welcome back! Please sign in to continue.
      </p>

      <div className="mx-auto max-w-lg mb-0 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8 dark:bg-slate-800">
        <form onSubmit={handleSubmit} className="space-y-4">
        
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <div className="relative">
              <input
                type="email"
                name="email"
                placeholder="Enter email"
                className="w-full border outline-none rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
              />
              <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                <MdOutlineAlternateEmail className="h-4 w-4 text-gray-400" />
              </span>
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter password"
                className="w-full border outline-none rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 end-0 grid place-content-center px-4"
              >
                <MdOutlineRemoveRedEye className="h-4 w-4 text-gray-400 cursor-pointer" />
              </span>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <p className="text-center text-red-500 font-medium">
              {error}
            </p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="block w-full rounded-lg bg-secondary px-5 py-3 text-sm font-medium text-white hover:scale-105 duration-300"
            disabled={loader} // Disable button when loading
          >
            {loader ? "Signing in..." : "Sign in"}
          </button>

          {/* Registration Link */}
          <p className="text-center text-sm text-gray-500">
            No account?{" "}
            <Link className="underline" to="/register">
              Sign Up
            </Link>
          </p>
        </form>

        <GoogleLogin />
      </div>
    </div>
  );
};

export default Login;
