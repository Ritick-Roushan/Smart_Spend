import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';

function CalculateTax() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [data, setData] = useState(null);

    const onSubmit = (formData) => {
        let annualIncome = parseFloat(formData.income);
        const { age, resident, taxpayer, employee } = formData;

        // Apply standard deduction for salaried Indian individuals
        let deductionAmount = 0;
        if (resident === "indian" && taxpayer === "individual" && employee === "salaried") {
            deductionAmount = 75000;
            annualIncome -= deductionAmount;
        }

        let totalTax = 0;
        let rebateAmount = 0;
        let marginalRelief = 0;
        let healthAndEducationCess = 0;
        let taxPayable = 0;

        // Tax calculation based on income slabs
        if (annualIncome <= 400000) {
            totalTax = 0;
        } else if (annualIncome <= 800000) {
            const amount = annualIncome - 400000;
            totalTax = amount * 0.05;
            rebateAmount = totalTax;
        } else if (annualIncome <= 1200000) {
            const amount = annualIncome - 800000;
            totalTax = 20000 + (amount * 0.1);
            rebateAmount = totalTax;
        } else if (annualIncome <= 1600000) {
            const amount = annualIncome - 1200000;
            totalTax = 60000 + (amount * 0.15);
            if (totalTax > amount) {
                marginalRelief = totalTax - amount;
                totalTax = amount;
            }
            taxPayable = totalTax;
        } else if (annualIncome <= 2000000) {
            const amount = annualIncome - 1600000;
            totalTax = 120000 + (amount * 0.2);
            taxPayable = totalTax;
        } else if (annualIncome <= 2400000) {
            const amount = annualIncome - 2000000;
            totalTax = 200000 + (amount * 0.25);
            taxPayable = totalTax;
        } else {
            const amount = annualIncome - 2400000;
            totalTax = 300000 + (amount * 0.3);
            taxPayable = totalTax;
        }

        if (taxPayable > 0) {
            healthAndEducationCess = taxPayable * 0.04;
            taxPayable += healthAndEducationCess;
        }

        setData({
            originalIncome: parseFloat(formData.income),
            taxableIncome: annualIncome,
            age,
            resident,
            taxpayer,
            employee,
            deductionAmount,
            totalTax,
            rebateAmount,
            marginalRelief,
            healthAndEducationCess,
            taxPayable: Math.max(0, taxPayable)
        });
    };

    return (
        <div className="min-h-screen p-6 bg-gradient-to-br from-blue-50 via-indigo-100 to-purple-100 text-gray-900">
            <motion.div
                className="fixed inset-0 opacity-20"
                animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
                transition={{ duration: 15, repeat: Infinity, repeatType: "reverse" }}
                style={{
                    background: 'radial-gradient(circle, rgba(147,197,253,0.2) 0%, rgba(196,181,253,0.2) 100%)',
                    backgroundSize: '200% 200%'
                }}
            />

            <div className="relative max-w-4xl mx-auto mt-12">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-3xl md:text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
                >
                    Income Tax Calculator (FY 2025-26)
                </motion.h1>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white/95 backdrop-blur-sm p-6 md:p-8 rounded-2xl shadow-xl border border-gray-100"
                >
                    <p className="text-center mb-6 text-gray-600 text-sm md:text-base">
                        Calculate your tax liability with precision
                    </p>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                                Annual Income (₹)
                            </label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">₹</span>
                                <input
                                    type="number"
                                    placeholder="Enter your annual income"
                                    className={`w-full pl-8 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${errors.income ? 'border-red-300' : 'border-gray-300'}`}
                                    {...register("income", {
                                        required: "Income is required",
                                        min: { value: 0, message: "Income cannot be negative" }
                                    })}
                                />
                            </div>
                            {errors.income && <p className="text-red-500 text-xs">{errors.income.message}</p>}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-3">
                                <label className="block text-sm font-medium text-gray-700">Age Range</label>
                                <div className="space-y-2">
                                    {[
                                        { label: "Below 60", value: "below-60" },
                                        { label: "60-80", value: "60-80" },
                                        { label: "Above 80", value: "above-80" }
                                    ].map((option) => (
                                        <label key={option.value} className="flex items-center p-2 hover:bg-gray-50 rounded cursor-pointer">
                                            <input
                                                type="radio"
                                                value={option.value}
                                                className="form-radio text-blue-600 focus:ring-blue-500 h-4 w-4"
                                                {...register("age", { required: "Please select an age range" })}
                                            />
                                            <span className="ml-2 text-sm text-gray-700">{option.label}</span>
                                        </label>
                                    ))}
                                </div>
                                {errors.age && <p className="text-red-500 text-xs">{errors.age.message}</p>}
                            </div>

                            <div className="space-y-3">
                                <label className="block text-sm font-medium text-gray-700">Residency Status</label>
                                <div className="space-y-2">
                                    {[
                                        { label: "Indian", value: "indian" },
                                        { label: "Non-Indian", value: "non-indian" }
                                    ].map((option) => (
                                        <label key={option.value} className="flex items-center p-2 hover:bg-gray-50 rounded cursor-pointer">
                                            <input
                                                type="radio"
                                                value={option.value}
                                                className="form-radio text-blue-600 focus:ring-blue-500 h-4 w-4"
                                                {...register("resident", { required: "Please select residency status" })}
                                            />
                                            <span className="ml-2 text-sm text-gray-700">{option.label}</span>
                                        </label>
                                    ))}
                                </div>
                                {errors.resident && <p className="text-red-500 text-xs">{errors.resident.message}</p>}
                            </div>

                            <div className="space-y-3">
                                <label className="block text-sm font-medium text-gray-700">Taxpayer Type</label>
                                <div className="space-y-2">
                                    {[
                                        { label: "Individual", value: "individual" },
                                        { label: "HUF", value: "huf" }
                                    ].map((option) => (
                                        <label key={option.value} className="flex items-center p-2 hover:bg-gray-50 rounded cursor-pointer">
                                            <input
                                                type="radio"
                                                value={option.value}
                                                className="form-radio text-blue-600 focus:ring-blue-500 h-4 w-4"
                                                {...register("taxpayer", { required: "Please select taxpayer type" })}
                                            />
                                            <span className="ml-2 text-sm text-gray-700">{option.label}</span>
                                        </label>
                                    ))}
                                </div>
                                {errors.taxpayer && <p className="text-red-500 text-xs">{errors.taxpayer.message}</p>}
                            </div>

                            <div className="space-y-3">
                                <label className="block text-sm font-medium text-gray-700">Income Type</label>
                                <div className="space-y-2">
                                    {[
                                        { label: "Salaried", value: "salaried" },
                                        { label: "Non-Salaried", value: "non-salaried" }
                                    ].map((option) => (
                                        <label key={option.value} className="flex items-center p-2 hover:bg-gray-50 rounded cursor-pointer">
                                            <input
                                                type="radio"
                                                value={option.value}
                                                className="form-radio text-blue-600 focus:ring-blue-500 h-4 w-4"
                                                {...register("employee", { required: "Please select income type" })}
                                            />
                                            <span className="ml-2 text-sm text-gray-700">{option.label}</span>
                                        </label>
                                    ))}
                                </div>
                                {errors.employee && <p className="text-red-500 text-xs">{errors.employee.message}</p>}
                            </div>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md"
                        >
                            Calculate Tax
                        </motion.button>
                    </form>

                    {/* Improved Results Display */}
                    <AnimatePresence>
                        {data && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                                transition={{ duration: 0.3 }}
                                className="mt-8 bg-white rounded-xl shadow-lg overflow-hidden border border-blue-100"
                            >
                                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4">
                                    <h3 className="text-xl font-semibold text-white">Tax Calculation Summary</h3>
                                    <p className="text-blue-100 text-sm mt-1">Detailed breakdown of your tax liability</p>
                                </div>
                                <div className="p-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-4">
                                            <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                                <span className="text-gray-600 font-medium">Original Income</span>
                                                <span className="text-gray-800 font-semibold">₹{data.originalIncome.toLocaleString()}</span>
                                            </div>
                                            <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                                <span className="text-gray-600 font-medium">Standard Deduction</span>
                                                <span className="text-gray-800 font-semibold">₹{data.deductionAmount.toLocaleString()}</span>
                                            </div>
                                            <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                                <span className="text-gray-600 font-medium">Taxable Income</span>
                                                <span className="text-gray-800 font-semibold">₹{data.taxableIncome.toLocaleString()}</span>
                                            </div>
                                            <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                                <span className="text-gray-600 font-medium">Basic Tax</span>
                                                <span className="text-gray-800 font-semibold">₹{data.totalTax.toLocaleString()}</span>
                                            </div>
                                        </div>
                                        <div className="space-y-4">
                                            <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                                <span className="text-gray-600 font-medium">Rebate Amount</span>
                                                <span className="text-gray-800 font-semibold">₹{data.rebateAmount.toLocaleString()}</span>
                                            </div>
                                            <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                                <span className="text-gray-600 font-medium">Marginal Relief</span>
                                                <span className="text-gray-800 font-semibold">₹{data.marginalRelief.toLocaleString()}</span>
                                            </div>
                                            <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                                <span className="text-gray-600 font-medium">Health & Edu. Cess</span>
                                                <span className="text-gray-800 font-semibold">₹{data.healthAndEducationCess.toLocaleString()}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                                        <div className="flex justify-between items-center">
                                            <span className="text-blue-800 text-lg font-medium">Total Tax Payable</span>
                                            <span className="text-blue-900 text-2xl font-bold">₹{data.taxPayable.toLocaleString()}</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </div>
    );
}

export default CalculateTax;