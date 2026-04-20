import React from "react";
import { useForm } from "react-hook-form";

const ResetPassword = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        console.log("Reset Password Data:", data);
        // 👉 Here you will call your API to reset password
    };

    const newPassword = watch("newPassword");

    return (
        <div className="flex items-center justify-center px-4 py-8 w-full">
            <div className="card max-w-md w-full shadow-xl border border-blue-100 bg-white">

                {/* Header */}
                <div className="px-6 pt-6">
                    <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Reset Password</h1>
                    <p className="text-gray-600">Reset your password</p>
                </div>

                <div className="card-body">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                        {/* New Password */}
                        <div>
                            <label className="label font-medium">New Password</label>
                            <input
                                type="password"
                                placeholder="New Password"
                                className="input input-bordered w-full focus:outline-none focus:border-blue-500"
                                {...register("newPassword", {
                                    required: "Password is required",
                                    minLength: {
                                        value: 6,
                                        message: "Password must be at least 6 characters",
                                    },
                                })}
                            />
                            {errors.newPassword && (
                                <p className="text-blue-500 text-sm">
                                    {errors.newPassword.message}
                                </p>
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
                                        value === newPassword || "Passwords do not match",
                                })}
                            />
                            {errors.confirmPassword && (
                                <p className="text-blue-500 text-sm">
                                    {errors.confirmPassword.message}
                                </p>
                            )}
                        </div>

                        <button className="btn bg-blue-600 hover:bg-blue-700 border-blue-600 text-white w-full mt-4">
                            Reset Password
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
