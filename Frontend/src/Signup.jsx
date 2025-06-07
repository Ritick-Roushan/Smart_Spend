import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom'; // Added useNavigate
import { motion } from 'framer-motion';

function Signup() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const navigate = useNavigate(); // For redirecting after success
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state for user feedback

  const onSubmit = async (data) => {
    setIsLoading(true);
    setError(null);
  
    try {
      const response = await fetch('http://localhost:8000/api/v1/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          fullname: data.name.trim(),
          email: data.email.trim(),
          username: data.username.trim(),
          password: data.password,
        }),
      });
  
      const text = await response.text();
      console.log('Raw response:', text); // Debug
  
      let result;
      try {
        result = JSON.parse(text);
      } catch {
        throw new Error(`Server returned invalid response (${response.status}): ${text.slice(0, 50)}`);
      }
  
      if (!response.ok) {
        throw new Error(result.message || `Registration failed with status ${response.status}`);
      }
  
      console.log('Registration successful:', result);
      alert('Registration successful!');
      navigate('/Login');
    } catch (error) {
      console.error('Error during registration:', error);
      setError(error.message || 'An error occurred. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };


  // Animation variants for the form card
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  return (
    <div className="h-screen bg-gradient-to-br from-blue-900 via-indigo-800 to-purple-900 flex flex-col justify-center items-center py-4 overflow-auto">
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
        className="relative bg-white/10 backdrop-blur-md p-4 rounded-3xl shadow-2xl max-w-md w-full border border-white/20 z-10 max-h-[90vh] overflow-y-auto"
      >
        <h2 className="text-2xl font-extrabold mb-3 text-center bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
          Create Your Account
        </h2>

        {/* Error Message */}
        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-red-400 text-center mb-3 text-sm"
          >
            {error}
          </motion.p>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          {/* Username */}
          <div>
            <label className="block text-white font-medium mb-1 text-sm">Username</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">👤</span>
              <input
                {...register('username', { required: 'Username is required' })}
                type="text"
                className={`w-full pl-10 pr-3 py-1 border rounded-lg bg-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm ${errors.username ? 'border-red-500' : 'border-gray-400'}`}
                placeholder="Enter your username"
                disabled={isLoading}
              />
            </div>
            {errors.username && <p className="text-red-400 text-xs mt-1">{errors.username.message}</p>}
          </div>

          {/* Full Name Field */}
          <div>
            <label className="block text-white font-medium mb-1 text-sm">Full Name</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">👤</span>
              <input
                {...register('name', { required: 'Full name is required' })} // Still using 'name' in form, mapped to 'fullname' in fetch
                type="text"
                className={`w-full pl-10 pr-3 py-1 border rounded-lg bg-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm ${errors.name ? 'border-red-500' : 'border-gray-400'}`}
                placeholder="Enter your full name"
                disabled={isLoading}
              />
            </div>
            {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-white font-medium mb-1 text-sm">Email</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">✉️</span>
              <input
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: 'Enter a valid email address',
                  },
                })}
                type="email"
                className={`w-full pl-10 pr-3 py-1 border rounded-lg bg-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm ${errors.email ? 'border-red-500' : 'border-gray-400'}`} // Fixed typo 'border-gray400'
                placeholder="Enter your email"
                disabled={isLoading}
              />
            </div>
            {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-white font-medium mb-1 text-sm">Password</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">🔒</span>
              <input
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters long',
                  },
                })}
                type="password"
                className={`w-full pl-10 pr-3 py-1 border rounded-lg bg-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm ${errors.password ? 'border-red-500' : 'border-gray-400'}`}
                placeholder="Enter your password"
                disabled={isLoading}
              />
            </div>
            {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>}
          </div>

          {/* Confirm Password Field */}
          <div>
            <label className="block text-white font-medium mb-1 text-sm">Confirm Password</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">🔒</span>
              <input
                {...register('confirmPassword', {
                  required: 'Please confirm your password',
                  validate: (value) => value === watch('password') || 'Passwords do not match',
                })}
                type="password"
                className={`w-full pl-10 pr-3 py-1 border rounded-lg bg-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm ${errors.confirmPassword ? 'border-red-500' : 'border-gray-400'}`}
                placeholder="Confirm your password"
                disabled={isLoading}
              />
            </div>
            {errors.confirmPassword && <p className="text-red-400 text-xs mt-1">{errors.confirmPassword.message}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-2 rounded-lg shadow-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? 'Registering...' : 'Sign Up'}
          </button>
        </form>

        {/* Login Link */}
        <div className="mt-3 text-center text-white text-sm">
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