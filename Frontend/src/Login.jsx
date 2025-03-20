import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Added loading state
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true); // Show loading state
    setError(null); // Clear previous errors

    try {
      // Simulated API call (replace with real API in production)
      const dummyUser = {
        email: "test@example.com",
        password: "password123", // In reality, this would be hashed
      };

      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (data.email !== dummyUser.email) {
        throw new Error("Email not found");
      }
      if (data.password !== dummyUser.password) {
        throw new Error("Incorrect password");
      }

      // Store minimal user data (avoid sensitive info like password)
      const userSession = { email: data.email, isAuthenticated: true };
      localStorage.setItem("session", JSON.stringify(userSession)); // Use a session key instead of "user"

      navigate("/dashboard");
    } catch (err) {
      setError(err.message); // Specific error messages
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  // Animation variants for the form card
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-800 to-purple-900 flex flex-col justify-center items-center overflow-hidden">
      <div className="fixed inset-0 pointer-events-none">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-indigo-500/30"
          animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
          transition={{ duration: 15, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          style={{ backgroundSize: "200% 200%" }}
        />
      </div>
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        className="relative bg-white/10 backdrop-blur-md p-8 rounded-3xl shadow-2xl max-w-md w-full border border-white/20 z-10"
      >
        <h2 className="text-3xl font-extrabold mb-6 text-center bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
          Welcome Back
        </h2>

        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-red-400 text-center mb-4 font-medium"
          >
            {error}
          </motion.p>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-white font-medium mb-1">Email</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">✉️</span>
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Enter a valid email address",
                  },
                })}
                type="email"
                className={`w-full pl-10 pr-3 py-2 border rounded-lg bg-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.email ? "border-red-500" : "border-gray-400"}`}
                placeholder="Enter your email"
                disabled={isLoading} // Disable during submission
              />
            </div>
            {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-white font-medium mb-1">Password</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">🔒</span>
              <input
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                type="password"
                className={`w-full pl-10 pr-3 py-2 border rounded-lg bg-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.password ? "border-red-500" : "border-gray-400"}`}
                placeholder="Enter your password"
                disabled={isLoading} // Disable during submission
              />
            </div>
            {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 rounded-lg shadow-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading} // Disable button while loading
          >
            {isLoading ? "Logging In..." : "Login"}
          </button>
        </form>

        <div className="mt-4 text-center text-white">
          <p>
            Don’t have an account?{" "}
            <Link to="/signup" className="text-blue-400 hover:underline font-medium">
              Sign Up
            </Link>
          </p>
          <p className="mt-2">
            <Link to="/forgot-password" className="text-blue-400 hover:underline font-medium">
              Forgot Password?
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default Login;