import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import { fetchSetupStatus } from "../../../services/authService";

const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const { registerUser } = useAuth();
  const navigate = useNavigate();
  const [checkingSetup, setCheckingSetup] = useState(true);
  const [adminRegistered, setAdminRegistered] = useState(false);

  useEffect(() => {
    fetchSetupStatus()
      .then((data) => setAdminRegistered(Boolean(data.adminRegistered)))
      .catch(() => setAdminRegistered(false))
      .finally(() => setCheckingSetup(false));
  }, []);

  const onSubmit = async (data) => {
    try {
      await registerUser(data.name, data.email, data.password);
      Swal.fire({
        icon: "success",
        title: "Admin created",
        text: "One-time setup complete.",
        timer: 1800,
        showConfirmButton: false,
      });
      navigate("/dashboard", { replace: true });
    } catch (error) {
      const message = error?.response?.data?.message || "Could not create account";

      if (error?.response?.status === 409) {
        setAdminRegistered(true);
      }

      Swal.fire({
        icon: error?.response?.status === 409 ? "info" : "error",
        title: error?.response?.status === 409 ? "Admin already exists" : "Registration failed",
        text:
          error?.response?.status === 409
            ? "Only one admin is allowed. Please login instead."
            : message,
      });
    }
  };

  const password = watch("password");

  if (checkingSetup) {
    return (
      <div className="flex min-h-[320px] items-center justify-center">
        <span className="loading loading-dots loading-lg text-blue-600" />
      </div>
    );
  }

  if (adminRegistered) {
    return (
      <div className="flex w-full items-center justify-center px-4 py-8">
        <div className="card max-w-md w-full shadow-xl border border-blue-100 bg-white">
          <div className="card-body text-center">
            <h1 className="text-2xl font-bold text-slate-900">Admin already set up</h1>
            <p className="mt-2 text-sm text-slate-600">
              Registration is one-time only. Use the login page with your admin email.
            </p>
            <Link to="/login" className="btn mt-4 bg-blue-600 text-white hover:bg-blue-700">
              Go to login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full items-center justify-center px-4 py-8">
      <div className="card max-w-md w-full shadow-xl border border-blue-100 bg-white">
        <div className="px-6 pt-6">
          <h1 className="text-2xl sm:text-3xl mb-1 font-bold text-slate-900">One-time admin setup</h1>
          <p className="text-gray-600">Create the only admin account for this portfolio</p>
        </div>

        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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

            <div>
              <label className="label font-medium">Admin email</label>
              <input
                type="email"
                placeholder="Admin email"
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

            <button
              type="submit"
              className="btn bg-blue-600 hover:bg-blue-700 border-blue-600 text-white w-full"
            >
              Create admin account
            </button>

            <div className="flex items-center gap-2 opacity-70">
              <span>Already set up?</span>
              <Link to="/login" className="link link-hover text-blue-600">
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
