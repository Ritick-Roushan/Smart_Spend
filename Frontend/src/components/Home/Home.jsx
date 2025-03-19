import React from 'react';
import {Link , NavLink} from 'react-router-dom'

function Home() {
    return (
        <div 
            className="relative flex flex-col items-center justify-start min-h-screen bg-cover bg-center"
            style={{ backgroundImage: `url('https://img.freepik.com/free-photo/bottles-cash-with-coins-saving-money-concept_1150-12564.jpg?t=st=1728151102~exp=1728154702~hmac=bdcbff6e0f844d7cd5c68bcb46af5370326b68b94710b30ee13ab0cc1e82ebdf&w=996')` }}
        >
            {/* Dark Overlay for better text visibility */}
            <div className="absolute inset-0 bg-black bg-opacity-60"></div>

            <div className="relative w-full flex flex-col items-center justify-center text-white p-8">

                {/* Hero Section */}
                <section className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Master Your Income, Invest in Your Future</h1>
                    <p className="text-lg md:text-xl mb-6 max-w-2xl mx-auto">
                        Empowering you to manage your monthly income efficiently and invest wisely for long-term success.
                    </p>
                    <Link
                    to='/Signup' 
                    className="bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:bg-blue-500 transition duration-200">
                        Start Your Journey Today
                    </Link>
                </section>

                {/* About Section */}
                <section className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Effective Financial Management Matters</h2>
                    <p className="text-lg mb-6 max-w-2xl mx-auto">
                        At [ Website Name], we help you take control of your finances by offering tools and strategies for budgeting, saving, and investing. Proper income management today leads to a more secure and prosperous future.
                    </p>
                    <ul className="list-disc list-inside text-left max-w-lg mx-auto space-y-3 mb-6">
                        <li>🌟 <strong>Reduce Financial Stress:</strong> Create a clear plan for your spending.</li>
                        <li>🌟 <strong>Achieve Your Goals:</strong> Save for milestones like buying a home or traveling.</li>
                        <li>🌟 <strong>Build Wealth:</strong> Learn where and how to invest for long-term growth.</li>
                    </ul>
                    <button className="bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:bg-blue-500 transition duration-200">
                        Discover Our Solutions
                    </button>
                </section>

                {/* Budgeting and Saving Section */}
                <section className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Manage Your Monthly Income with Confidence</h2>
                    <p className="text-lg mb-6 max-w-2xl mx-auto">
                        A solid budget is the foundation of financial health. With our intuitive budgeting tools, you can track your income and expenses, prioritize savings, and make smarter spending decisions.
                    </p>
                    <ul className="list-disc list-inside text-left max-w-lg mx-auto space-y-3 mb-6">
                        <li>Track your expenses</li>
                        <li>Save for future goals</li>
                        <li>Stay debt-free</li>
                    </ul>
                    <button className="bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:bg-blue-500 transition duration-200">
                        Explore Our Budgeting Tools
                    </button>
                </section>

                {/* Investment Guidance Section */}
                <section className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Invest Wisely for a Brighter Tomorrow</h2>
                    <p className="text-lg mb-6 max-w-2xl mx-auto">
                        We provide expert guidance on how to grow your wealth through smart investments. Whether you're new to investing or a seasoned pro, our tools will help you make informed decisions based on your financial goals.
                    </p>
                    <ul className="list-disc list-inside text-left max-w-lg mx-auto space-y-3 mb-6">
                        <li>Understand risk vs. reward</li>
                        <li>Diversify your investments</li>
                        <li>Plan for long-term growth</li>
                    </ul>
                    <button className="bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:bg-blue-500 transition duration-200">
                        Learn How to Invest
                    </button>
                </section>

                {/* Tools and Resources Section */}
                <section className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Financial Tools to Help You Succeed</h2>
                    <p className="text-lg mb-6 max-w-2xl mx-auto">
                        From budgeting calculators to investment planners, our suite of financial tools is designed to make managing your money easier and more effective.
                    </p>
                    <ul className="list-disc list-inside text-left max-w-lg mx-auto space-y-3 mb-6">
                        <li>Budget planner</li>
                        <li>Investment calculator</li>
                        <li>Goal tracker</li>
                    </ul>
                    <button className="bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:bg-blue-500 transition duration-200">
                        Start Using Our Tools
                    </button>
                </section>

            </div>
        </div>
    );
}

export default Home;
