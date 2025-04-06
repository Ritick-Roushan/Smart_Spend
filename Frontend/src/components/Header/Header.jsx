import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom'; // Added useNavigate
import { motion } from 'framer-motion';

export default function Header() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate(); // For redirect after logout
  const location = useLocation(); // Track route changes

  const checkAuthStatus = () => {
    const session = localStorage.getItem('session');
    if (session) {
      const parsedSession = JSON.parse(session);
      setIsAuthenticated(parsedSession.isAuthenticated || false);
    } else {
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    checkAuthStatus();
    window.addEventListener('storage', checkAuthStatus);
    return () => window.removeEventListener('storage', checkAuthStatus);
  }, []);

  useEffect(() => {
    checkAuthStatus();
  }, [location]);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
    document.documentElement.classList.toggle('dark');
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/v1/users/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Send cookies with the request
      });

      if (!response.ok) {
        const result = await response.json();
        console.error('Logout failed:', result.message);
      }
    } catch (error) {
      console.error('Error during logout:', error);
    } finally {
      localStorage.removeItem('session');
      setIsAuthenticated(false);
      setIsMobileMenuOpen(false);
      navigate('/login'); // Redirect to login page
    }
  };

  const navItemVariants = {
    hover: { scale: 1.1, transition: { duration: 0.3 } },
  };

  const mobileMenuVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { opacity: 1, height: 'auto', transition: { duration: 0.3 } },
  };

  return (
    <header
      className={`sticky z-50 top-0 backdrop-blur-md transition-colors duration-300 ${isDarkMode ? 'bg-gray-900/90 border-gray-800' : 'bg-white/90 border-gray-200'} border-b shadow`}
    >
      <nav className="px-4 lg:px-6 py-3 max-w-screen-xl mx-auto">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <motion.img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBJVwPr9yvbMr7n-Jd6tbI4qHKb6uUNM887w&s"
              className="h-10 w-10 rounded-full object-cover"
              alt="Logo"
              whileHover={{ rotate: 360, transition: { duration: 0.5 } }}
            />
          </Link>

          <div className="hidden lg:flex items-center space-x-8">
            <ul className="flex space-x-6 font-medium">
              {[
                { to: '/', label: 'Home' },
                { to: '#', label: 'About' },
                { to: '/Footer', label: 'Contact' },
                { to: '/CalculateTax', label: 'CalculateTax' },
                { to: '/Finance', label: 'Finance' },
              ].map((item, index) =>
                item.isButton ? (
                  <li key={index}>
                    <button
                      className={`py-2 ${isDarkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-700 hover:text-blue-500'} transition-colors duration-200`}
                    >
                      <motion.span variants={navItemVariants} whileHover="hover">
                        {item.label}
                      </motion.span>
                    </button>
                  </li>
                ) : (
                  <li key={index}>
                    <NavLink
                      to={item.to}
                      className={({ isActive }) =>
                        `py-2 ${isActive ? (isDarkMode ? 'text-blue-400' : 'text-blue-500') : (isDarkMode ? 'text-gray-300' : 'text-gray-700')} hover:${isDarkMode ? 'text-blue-400' : 'text-blue-500'} transition-colors duration-200`
                      }
                    >
                      <motion.span variants={navItemVariants} whileHover="hover">
                        {item.label}
                      </motion.span>
                    </NavLink>
                  </li>
                )
              )}
            </ul>

            <div className="flex space-x-4">
              {isAuthenticated ? (
                <button
                  onClick={handleLogout}
                  className={`${isDarkMode ? 'bg-gradient-to-r from-red-700 to-pink-700 hover:from-red-800 hover:to-pink-800' : 'bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700'} text-white font-semibold py-2 px-5 rounded-full shadow-md transition-all duration-300 transform hover:scale-105`}
                >
                  Log Out
                </button>
              ) : (
                <>
                  <Link
                    to="/Login"
                    state={{ from: location.pathname }}
                    className={`${isDarkMode ? 'bg-gradient-to-r from-blue-700 to-indigo-700 hover:from-blue-800 hover:to-indigo-800' : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700'} text-white font-semibold py-2 px-5 rounded-full shadow-md transition-all duration-300 transform hover:scale-105`}
                  >
                    Log In
                  </Link>
                  <Link
                    to="/Signup"
                    className={`${isDarkMode ? 'bg-gradient-to-r from-orange-700 to-yellow-600 hover:from-orange-800 hover:to-yellow-700' : 'bg-gradient-to-r from-orange-600 to-yellow-500 hover:from-orange-700 hover:to-yellow-600'} text-white font-semibold py-2 px-5 rounded-full shadow-md transition-all duration-300 transform hover:scale-105`}
                  >
                    Sign Up
                  </Link>
                </>
              )}
              <button
                onClick={toggleDarkMode}
                className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-700 text-yellow-400' : 'bg-gray-200 text-gray-700'} focus:outline-none`}
              >
                {isDarkMode ? '☀️' : '🌙'}
              </button>
            </div>
          </div>

          <button
            className={`lg:hidden ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} focus:outline-none`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>

        <motion.div
          variants={mobileMenuVariants}
          initial="hidden"
          animate={isMobileMenuOpen ? 'visible' : 'hidden'}
          className="lg:hidden mt-4"
        >
          <ul className="flex flex-col space-y-4 font-medium">
            {[
              { to: '/', label: 'Home' },
              { to: '#', label: 'About', isButton: true },
              { to: '/Footer', label: 'Contact' },
              { to: '/CalculateTax', label: 'CalculateTax' },
              { to: '/Finance', label: 'Finance' },
            ].map((item, index) =>
              item.isButton ? (
                <li key={index}>
                  <button
                    className={`w-full text-left py-2 ${isDarkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-700 hover:text-blue-500'} transition-colors duration-200`}
                  >
                    {item.label}
                  </button>
                </li>
              ) : (
                <li key={index}>
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      `block py-2 ${isActive ? (isDarkMode ? 'text-blue-400' : 'text-blue-500') : (isDarkMode ? 'text-gray-300' : 'text-gray-700')} hover:${isDarkMode ? 'text-blue-400' : 'text-blue-500'} transition-colors duration-200`
                    }
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </NavLink>
                </li>
              )
            )}
            <li className="flex space-x-4">
              {isAuthenticated ? (
                <button
                  onClick={handleLogout}
                  className={`${isDarkMode ? 'bg-gradient-to-r from-red-700 to-pink-700 hover:from-red-800 hover:to-pink-800' : 'bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700'} text-white font-semibold py-2 px-5 rounded-full shadow-md transition-all duration-300 w-full`}
                >
                  Log Out
                </button>
              ) : (
                <>
                  <Link
                    to="/Login"
                    className={`${isDarkMode ? 'bg-gradient-to-r from-blue-700 to-indigo-700 hover:from-blue-800 hover:to-indigo-800' : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700'} text-white font-semibold py-2 px-5 rounded-full shadow-md transition-all duration-300`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Log In
                  </Link>
                  <Link
                    to="/Signup"
                    className={`${isDarkMode ? 'bg-gradient-to-r from-orange-700 to-yellow-600 hover:from-orange-800 hover:to-yellow-700' : 'bg-gradient-to-r from-orange-600 to-yellow-500 hover:from-orange-700 hover:to-yellow-600'} text-white font-semibold py-2 px-5 rounded-full shadow-md transition-all duration-300`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </li>
            <li>
              <button
                onClick={toggleDarkMode}
                className={`w-full text-left py-2 ${isDarkMode ? 'text-yellow-400' : 'text-gray-700'} transition-colors duration-200`}
              >
                {isDarkMode ? 'Switch to Light Mode ☀️' : 'Switch to Dark Mode 🌙'}
              </button>
            </li>
          </ul>
        </motion.div>
      </nav>
    </header>
  );
}