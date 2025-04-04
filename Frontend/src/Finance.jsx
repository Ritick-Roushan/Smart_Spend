import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { Switch } from "@headlessui/react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

const Finance = () => {
    const { register, handleSubmit } = useForm();
    const [data, setData] = useState(null);
    const [darkMode, setDarkMode] = useState(false);
    const [showChart, setShowChart] = useState(false);

    const onSubmit = (formData) => {
        const totalIncome = parseFloat(formData.totalIncome);
        const emi = parseFloat(formData.emi);
        const rent = parseFloat(formData.rent);
        const education = parseFloat(formData.education);
        const otherExpenses = parseFloat(formData.otherExpenses);
        const tax = parseFloat(formData.Tax);

        const totalExpenses = emi + rent + education + otherExpenses + (tax / 12);
        const savings = totalIncome - totalExpenses;
        const mutualFundInvestment = savings * 0.1;
        const emergencyFund = savings * 0.05;

        setData({
            totalIncome,
            emi,
            rent,
            education,
            otherExpenses,
            totalExpenses,
            savings,
            mutualFundInvestment,
            emergencyFund,
        });
        setShowChart(true);
    };

    const chartData = {
        labels: ['Income', 'Expenses', 'Savings', 'Mutual Funds', 'Emergency Fund'],
        datasets: [{
            label: 'Financial Overview',
            data: data ? [data.totalIncome, data.totalExpenses, data.savings, data.mutualFundInvestment, data.emergencyFund] : [],
            borderColor: darkMode ? '#60a5fa' : '#2563eb',
            backgroundColor: darkMode ? 'rgba(96, 165, 250, 0.2)' : 'rgba(37, 99, 235, 0.2)',
            tension: 0.4,
        }]
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: { position: 'top' },
            title: { display: true, text: 'Your Financial Journey' }
        },
        scales: {
            y: { beginAtZero: true }
        }
    };

    const topMutualFunds = [
        "Quant Small Cap Fund",
        "Nippon India Small Cap Fund",
        "Parag Parikh Flexi Cap Fund",
        "ICICI Prudential Bluechip Fund",
        "SBI Small Cap Fund",
        "HDFC Mid-Cap Opportunities Fund",
        "Axis Long Term Equity Fund",
        "Mirae Asset Large Cap Fund",
        "Kotak Emerging Equity Fund",
        "Tata Digital India Fund",
        "Aditya Birla Sun Life Frontline Equity Fund",
        "Canara Robeco Emerging Equities Fund",
        "DSP Midcap Fund",
        "UTI Nifty Index Fund",
        "Franklin India Flexi Cap Fund",
        "Invesco India Contra Fund",
        "L&T Midcap Fund",
        "Motilal Oswal Flexi Cap Fund",
        "PGIM India Midcap Opportunities Fund",
        "Sundaram Rural and Consumption Fund"
    ];

    const marqueeVariants = {
        animate: {
            y: ["0%", "-50%"],
            transition: {
                y: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 15,
                    ease: "linear"
                }
            }
        }
    };

    return (
        <div className={`min-h-screen p-6 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-blue-100 via-indigo-200 to-purple-300 text-gray-900'} transition-colors duration-300 overflow-hidden`}>
            {/* Animated Background Layer */}
            <div className="fixed inset-0 pointer-events-none">
                <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-indigo-500/20"
                    animate={{
                        backgroundPosition: ["0% 0%", "100% 100%"],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut"
                    }}
                    style={{ backgroundSize: "200% 200%" }}
                />
            </div>

            <div className="relative flex max-w-6xl mx-auto gap-6">
                {/* Main Content */}
                <div className="flex-1">
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent drop-shadow-lg">
                            Personal Finance Dashboard
                        </h1>
                        <Switch
                            checked={darkMode}
                            onChange={setDarkMode}
                            className={`${darkMode ? 'bg-blue-600' : 'bg-gray-200'} relative inline-flex h-6 w-11 items-center rounded-full shadow-md`}
                        >
                            <span className={`${darkMode ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform bg-white rounded-full transition`} />
                        </Switch>
                    </div>

                    {/* Form Section */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className={`p-6 rounded-xl shadow-2xl backdrop-blur-md ${darkMode ? 'bg-gray-800/90' : 'bg-white/80'} border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}
                    >
                        <p className="text-center mb-6 text-sm opacity-80 font-medium">
                            Take charge of your financial destiny! Watch your future unfold with every step.
                        </p>
                        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[
                                { name: "totalIncome", placeholder: "Total Monthly Income (₹)", icon: "💰" },
                                { name: "emi", placeholder: "Monthly EMI (₹)", icon: "🏦" },
                                { name: "rent", placeholder: "Monthly Rent (₹)", icon: "🏠" },
                                { name: "education", placeholder: "Education Expenses (₹)", icon: "🎓" },
                                { name: "Tax", placeholder: "Annual Income Tax (₹)", icon: "💰" },
                                { name: "otherExpenses", placeholder: "Other Expenses (₹)", icon: "🛒" },
                            ].map((field) => (
                                <div key={field.name} className="relative">
                                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-lg">{field.icon}</span>
                                    <input
                                        {...register(field.name)}
                                        type="number"
                                        placeholder={field.placeholder}
                                        className={`w-full p-2 pl-10 border rounded-lg focus:ring-2 focus:ring-blue-500 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
                                        required
                                    />
                                </div>
                            ))}
                            <button
                                type="submit"
                                className="md:col-span-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-md"
                            >
                                Unlock My Financial Future
                            </button>
                        </form>
                    </motion.div>

                    {/* Results Section */}
                    <AnimatePresence>
                        {data && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                                className={`mt-8 p-6 rounded-xl shadow-2xl backdrop-blur-md ${darkMode ? 'bg-gray-800/90' : 'bg-white/80'} border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}
                            >
                                <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">Your Financial Victory</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="p-4 bg-opacity-20 bg-blue-500 rounded-lg shadow-sm">
                                        <p className="text-sm opacity-75">Total Expenses</p>
                                        <p className="text-xl font-bold">₹{data.totalExpenses.toLocaleString()}</p>
                                    </div>
                                    <div className="p-4 bg-opacity-20 bg-green-500 rounded-lg shadow-sm">
                                        <p className="text-sm opacity-75">Total Savings</p>
                                        <p className="text-xl font-bold">₹{data.savings.toLocaleString()}</p>
                                    </div>
                                    <div className="p-4 bg-opacity-20 bg-purple-500 rounded-lg shadow-sm">
                                        <p className="text-sm opacity-75">Mutual Fund Investment</p>
                                        <p className="text-xl font-bold">₹{data.mutualFundInvestment.toLocaleString()}</p>
                                    </div>
                                    <div className="p-4 bg-opacity-20 bg-orange-500 rounded-lg shadow-sm">
                                        <p className="text-sm opacity-75">Emergency Fund</p>
                                        <p className="text-xl font-bold">₹{data.emergencyFund.toLocaleString()}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setShowChart(!showChart)}
                                    className="mt-4 text-blue-500 hover:underline"
                                >
                                    {showChart ? 'Hide My Journey' : 'See My Financial Journey'}
                                </button>
                                {showChart && (
                                    <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} className="mt-4">
                                        <Line data={chartData} options={chartOptions} />
                                    </motion.div>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Why It Matters Section */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className={`mt-8 p-6 rounded-xl shadow-2xl backdrop-blur-md ${darkMode ? 'bg-gray-800/90' : 'bg-white/80'} border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}
                    >
                        <h2 className="text-xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">
                            Why It Matters: Your Path to Financial Freedom
                        </h2>
                        <p className="mb-4 text-sm opacity-80">
                            Imagine a life where money works *for you*—where every rupee you save today builds a future of security, freedom, and opportunity...
                        </p>
                        <ul className="list-disc pl-5 space-y-3 text-sm">
                            <li><strong>Build Wealth Over Time:</strong> By investing just 10% of your savings...</li>
                            <li><strong>Shield Yourself from the Unexpected:</strong> An emergency fund isn’t just money...</li>
                            <li><strong>Break Free from Living Paycheck to Paycheck:</strong> Tracking your expenses...</li>
                            <li><strong>Invest in Your Dreams:</strong> Every rupee saved is a step toward...</li>
                            <li><strong>Feel the Power of Control:</strong> Knowledge is power...</li>
                        </ul>
                        <p className="mt-4 text-sm font-semibold text-blue-500">
                            Start today. Small actions now can lead to a lifetime of rewards. You’ve got this!
                        </p>
                    </motion.div>
                </div>

                {/* Sidebar with Animated Top 20 Mutual Funds */}
                <motion.aside
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className={`w-80 p-6 rounded-xl shadow-2xl backdrop-blur-md ${darkMode ? 'bg-gray-800/90' : 'bg-white/80'} h-96 sticky top-6 flex flex-col border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}
                >
                    <h2 className="text-xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">
                        Top 20 Mutual Funds in India (2025)
                    </h2>
                    <div className="flex-1 relative overflow-hidden">
                        <motion.div
                            variants={marqueeVariants}
                            animate="animate"
                            className="absolute w-full space-y-2 text-sm"
                        >
                            {[...topMutualFunds, ...topMutualFunds].map((fund, index) => (
                                <div
                                    key={index}
                                    className={`p-2 rounded-lg ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}
                                >
                                    {(index % topMutualFunds.length) + 1}. {fund}
                                </div>
                            ))}
                        </motion.div>
                    </div>
                    <p className="mt-2 text-xs opacity-70">
                        *Based on performance data as of 2025. Consult our team for better suggestion.
                    </p>
                </motion.aside>
            </div>
        </div>
    );
};

export default Finance;