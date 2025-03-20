import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';

function Home() {
  // Animation variants for sections
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  return (
    <div 
      className="relative flex flex-col items-center justify-start min-h-screen bg-gradient-to-br from-blue-900 via-indigo-800 to-purple-900 bg-cover bg-center overflow-hidden"
    >
      {/* Animated Background Layer */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-indigo-500/30"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
          }}
          style={{ backgroundSize: '200% 200%' }}
        />
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      <div className="relative w-full flex flex-col items-center justify-center text-white p-8 z-10">
        {/* Hero Section */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
          className="text-center mb-16 pt-20"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent drop-shadow-lg mb-4">
            Master Your Income, Shape Your Future
          </h1>
          <p className="text-lg md:text-xl mb-6 max-w-2xl mx-auto font-light">
            Take control of your finances with tools and insights designed for wealth-building and peace of mind.
          </p>
          <Link
            to="/Signup"
            className="inline-block bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 px-10 rounded-full shadow-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105"
          >
            Start Your Journey
          </Link>
        </motion.section>

        {/* About Section */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionVariants}
          className="text-center mb-16 max-w-4xl mx-auto p-6 rounded-xl backdrop-blur-md bg-white/10 shadow-xl border border-white/20"
        >
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-300 to-indigo-300 bg-clip-text text-transparent mb-4">
            Why Financial Mastery Matters
          </h2>
          <p className="text-lg mb-6 font-light">
            At Smart Spend, we empower you to transform your income into a foundation for success with cutting-edge tools and strategies.
          </p>
          <ul className="list-none text-left max-w-lg mx-auto space-y-4 mb-6">
            <li className="flex items-center">
              <span className="text-blue-400 mr-2">🌟</span>
              <span><strong>Reduce Stress:</strong> Plan your spending with confidence.</span>
            </li>
            <li className="flex items-center">
              <span className="text-blue-400 mr-2">🌟</span>
              <span><strong>Achieve Dreams:</strong> Save for what matters most.</span>
            </li>
            <li className="flex items-center">
              <span className="text-blue-400 mr-2">🌟</span>
              <span><strong>Grow Wealth:</strong> Invest smarter for tomorrow.</span>
            </li>
          </ul>
          <Link
            to="/Finance"
            className="inline-block bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105"
          >
            Discover Our Services
          </Link>
        </motion.section>

        {/* Budgeting and Saving Section */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionVariants}
          className="text-center mb-16 max-w-4xl mx-auto p-6 rounded-xl backdrop-blur-md bg-white/10 shadow-xl border border-white/20"
        >
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-300 to-indigo-300 bg-clip-text text-transparent mb-4">
            Budget with Confidence
          </h2>
          <p className="text-lg mb-6 font-light">
            Build a strong financial base with intuitive budgeting tools that help you track, save, and spend wisely.
          </p>
          <ul className="list-none text-left max-w-lg mx-auto space-y-4 mb-6">
            <li className="flex items-center"><span className="text-blue-400 mr-2">✓</span> Track expenses effortlessly</li>
            <li className="flex items-center"><span className="text-blue-400 mr-2">✓</span> Save for your goals</li>
            <li className="flex items-center"><span className="text-blue-400 mr-2">✓</span> Stay debt-free</li>
          </ul>
          <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105">
            Explore Budgeting Tools
          </button>
        </motion.section>

        {/* Investment Guidance Section */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionVariants}
          className="text-center mb-16 max-w-4xl mx-auto p-6 rounded-xl backdrop-blur-md bg-white/10 shadow-xl border border-white/20"
        >
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-300 to-indigo-300 bg-clip-text text-transparent mb-4">
            Invest for a Brighter Future
          </h2>
          <p className="text-lg mb-6 font-light">
            Unlock the power of smart investing with expert guidance tailored to your goals—beginner or pro.
          </p>
          <ul className="list-none text-left max-w-lg mx-auto space-y-4 mb-6">
            <li className="flex items-center"><span className="text-blue-400 mr-2">✓</span> Balance risk and reward</li>
            <li className="flex items-center"><span className="text-blue-400 mr-2">✓</span> Diversify your portfolio</li>
            <li className="flex items-center"><span className="text-blue-400 mr-2">✓</span> Grow wealth long-term</li>
          </ul>
          <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105">
            Learn How to Invest
          </button>
        </motion.section>

        {/* Tools and Resources Section */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionVariants}
          className="text-center mb-16 max-w-4xl mx-auto p-6 rounded-xl backdrop-blur-md bg-white/10 shadow-xl border border-white/20"
        >
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-300 to-indigo-300 bg-clip-text text-transparent mb-4">
            Tools for Financial Success
          </h2>
          <p className="text-lg mb-6 font-light">
            Simplify your financial journey with our powerful suite of calculators and planners.
          </p>
          <ul className="list-none text-left max-w-lg mx-auto space-y-4 mb-6">
            <li className="flex items-center"><span className="text-blue-400 mr-2">✓</span> Budget planner</li>
            <li className="flex items-center"><span className="text-blue-400 mr-2">✓</span> Investment calculator</li>
            <li className="flex items-center"><span className="text-blue-400 mr-2">✓</span> Goal tracker</li>
          </ul>
          <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105">
            Start Using Our Tools
          </button>
        </motion.section>
      </div>
    </div>
  );
}

export default Home;