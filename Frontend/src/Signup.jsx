import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function Signup() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        console.log('Form Data: ', data);
    };

    // Animation variants for the form card
    const cardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-800 to-purple-900 flex flex-col justify-center items-center overflow-hidden">
            {/* Animated Background Layer */}
            <div className="fixed inset-0 pointer-events-none">
                <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-indigo-500/30"
                    animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
                    transition={{ duration: 15, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
                    style={{ backgroundSize: '200% 200%' }}
                />
            </div>

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>

            {/* Signup Card */}
            <motion.div
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                className="relative bg-white/10 backdrop-blur-md p-8 rounded-3xl shadow-2xl max-w-md w-full border border-white/20 z-10"
            >
                <h2 className="text-3xl font-extrabold mb-6 text-center bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                    Create Your Account
                </h2>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Name Field */}
                    <div>
                        <label className="block text-white font-medium mb-1">Full Name</label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">👤</span>
                            <input
                                {...register("name", { required: "Name is required" })}
                                type="text"
                                className={`w-full pl-10 pr-3 py-2 border rounded-lg bg-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.name ? 'border-red-500' : 'border-gray-400'}`}
                                placeholder="Enter your name"
                            />
                        </div>
                        {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>}
                    </div>

                    {/* Email Field */}
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
                                className={`w-full pl-10 pr-3 py-2 border rounded-lg bg-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.email ? 'border-red-500' : 'border-gray-400'}`}
                                placeholder="Enter your email"
                            />
                        </div>
                        {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>}
                    </div>

                    {/* Password Field */}
                    <div>
                        <label className="block text-white font-medium mb-1">Password</label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">🔒</span>
                            <input
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: {
                                        value: 6,
                                        message: "Password must be at least 6 characters long",
                                    },
                                })}
                                type="password"
                                className={`w-full pl-10 pr-3 py-2 border rounded-lg bg-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.password ? 'border-red-500' : 'border-gray-400'}`}
                                placeholder="Enter your password"
                            />
                        </div>
                        {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>}
                    </div>

                    {/* Confirm Password Field */}
                    <div>
                        <label className="block text-white font-medium mb-1">Confirm Password</label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">🔒</span>
                            <input
                                {...register("confirmPassword", {
                                    required: "Please confirm your password",
                                    validate: (value) => value === watch("password") || "Passwords do not match",
                                })}
                                type="password"
                                className={`w-full pl-10 pr-3 py-2 border rounded-lg bg-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.confirmPassword ? 'border-red-500' : 'border-gray-400'}`}
                                placeholder="Confirm your password"
                            />
                        </div>
                        {errors.confirmPassword && <p className="text-red-400 text-sm mt-1">{errors.confirmPassword.message}</p>}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 rounded-lg shadow-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105"
                    >
                        Sign Up
                    </button>
                </form>

                {/* Login Link */}
                <div className="mt-4 text-center text-white">
                    <p>
                        Already have an account?{' '}
                        <Link to="/Login" className="text-blue-400 hover:underline font-medium">
                            Login
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
}

export default Signup;