import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import SocialLogin from "../SocialLogin/SocialLogin";
import useAuth from "../../../hooks/useAuth";

const Register = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const navigate = useNavigate(); // ✅ get navigate hook
    const { registerUser } = useAuth();

    const onSubmit = (data) => {
        console.log("Register Data:", data);
        // 👉 Call your registration API here
        registerUser(data.email, data.password)
            .then(result => {
                console.log(result.user)
                navigate("/")
            })
            .catch(error => {
                console.log(error)
            })
    };

    const password = watch("password");

    return (
        <div className="flex w-full items-center justify-center px-4 py-8">
            <div className="card max-w-md w-full shadow-xl border border-blue-100 bg-white">
                <div className="px-6 pt-6">
                    <h1 className="text-2xl sm:text-3xl mb-1 font-bold text-slate-900">Create an Account</h1>
                    <p className="text-gray-600">Register with ProFast</p>
                </div>

                <div className="card-body">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        {/* Name */}
                        <div>
                            <label className="label font-medium">Name</label>
                            <input
                                type="text"
                                placeholder="Name"
                                className="input input-bordered w-full focus:outline-none focus:border-blue-500"
                                {...register("name", { required: "Name is required" })}
                            />
                            {errors.name && (
                                <p className="text-blue-500 text-sm">{errors.name.message}</p>
                            )}
                        </div>

                        {/* Email */}
                        <div>
                            <label className="label font-medium">Email</label>
                            <input
                                type="email"
                                placeholder="Email"
                                className="input input-bordered w-full focus:outline-none focus:border-blue-500"
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                        message: "Invalid email address",
                                    },
                                })}
                            />
                            {errors.email && (
                                <p className="text-blue-500 text-sm">{errors.email.message}</p>
                            )}
                        </div>

                        {/* Password */}
                        <div>
                            <label className="label font-medium">Password</label>
                            <input
                                type="password"
                                placeholder="Password"
                                className="input input-bordered w-full focus:outline-none focus:border-blue-500"
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: {
                                        value: 6,
                                        message: "Password must be at least 6 characters",
                                    },
                                })}
                            />
                            {errors.password && (
                                <p className="text-blue-500 text-sm">{errors.password.message}</p>
                            )}
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label className="label font-medium">Confirm Password</label>
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                className="input input-bordered w-full focus:outline-none focus:border-blue-500"
                                {...register("confirmPassword", {
                                    required: "Please confirm your password",
                                    validate: (value) =>
                                        value === password || "Passwords do not match",
                                })}
                            />
                            {errors.confirmPassword && (
                                <p className="text-blue-500 text-sm">
                                    {errors.confirmPassword.message}
                                </p>
                            )}
                        </div>

                        {/* Forgot Password */}
                        <div className="mt-2 text-right">
                            <a className="link link-hover text-blue-600">Forgot password?</a>
                        </div>

                        {/* Register Button */}
                        <button type="submit" className="btn bg-blue-600 hover:bg-blue-700 border-blue-600 text-white w-full">
                            Register
                        </button>

                        {/* Login Link */}
                        <div className="flex items-center gap-2 opacity-70 ">
                            <span>Already have an Account?</span>
                            <Link to="/login" className="link link-hover text-blue-600">
                                Login
                            </Link>
                        </div>

                        {/* Or */}
                        <div>
                            <h1 className="text-center opacity-50">Or</h1>
                        </div>
                        <div>
                            <SocialLogin></SocialLogin>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
