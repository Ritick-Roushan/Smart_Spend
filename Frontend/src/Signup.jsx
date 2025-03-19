import React from 'react';
import { useForm } from 'react-hook-form';

function Signup() {
    // Use the useForm hook from react-hook-form
    const { register, handleSubmit, formState: { errors } } = useForm();

    // Submit handler
    const onSubmit = (data) => {
        console.log('Form Data: ', data);
    };

    return (
        <div className="min-h-screen bg-gray-600 flex flex-col justify-center items-center">
            <div className="bg-red-500 bg-opacity-30 backdrop-blur-md p-8 rounded-3xl shadow-lg max-w-md w-full">
                <h2 className="text-2xl font-bold mb-6 text-center text-white">Sign Up</h2>
                
                {/* Form starts */}
                <form onSubmit={handleSubmit(onSubmit)}>

                    {/* Name Field */}
                    <div className="mb-4">
                        <label className="block text-white">Full Name</label>
                        <input
                            {...register("name", { required: "Name is required" })}
                            type="text"
                            className={`w-full px-3 py-2 border rounded-lg  ${
                                errors.name ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="Enter your name"
                        />
                        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                    </div>

                    {/* Email Field */}
                    <div className="mb-4">
                        <label className="block text-white">Email</label>
                        <input
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                    message: "Enter a valid email address",
                                },
                            })}
                            type="email"
                            className={`w-full px-3 py-2 border rounded-lg ${
                                errors.email ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="Enter your email"
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                    </div>

                    {/* Password Field */}
                    <div className="mb-4">
                        <label className="block text-white">Password</label>
                        <input
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 6,
                                    message: "Password must be at least 6 characters long",
                                },
                            })}
                            type="password"
                            className={`w-full px-3 py-2 border rounded-lg ${
                                errors.password ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="Enter your password"
                        />
                        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                    </div>

                    {/* Confirm Password Field */}
                    <div className="mb-4">
                        <label className="block text-white">Confirm Password</label>
                        <input
                            {...register("confirmPassword", {
                                required: "Please confirm your password",
                                validate: (value) =>
                                    value === watch("password") || "Passwords do not match",
                            })}
                            type="password"
                            className={`w-full px-3 py-2 border rounded-lg ${
                                errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="Confirm your password"
                        />
                        {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>}
                    </div>

                    {/* Submit Button */}
                    <div className="mt-6">
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-500 transition duration-200"
                        >
                            Sign Up
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Signup;
