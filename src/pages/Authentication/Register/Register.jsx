import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";

const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const { registerUser } = useAuth();

  const onSubmit = async (data) => {
    try {
      await registerUser(data.name, data.email, data.password);
      Swal.fire({
        icon: "success",
        title: "Account created",
        text: "Admin account saved in MongoDB. You can login now.",
        timer: 2200,
        showConfirmButton: false,
      });
      navigate("/login");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Registration failed",
        text: error?.response?.data?.message || "Could not create account",
      });
    }
  };

  const password = watch("password");

  return (
    <div className="flex w-full items-center justify-center px-4 py-8">
      <div className="card max-w-md w-full shadow-xl border border-blue-100 bg-white">
        <div className="px-6 pt-6">
          <h1 className="text-2xl sm:text-3xl mb-1 font-bold text-slate-900">Create Admin Account</h1>
          <p className="text-gray-600">Register once with your admin email</p>
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
              <label className="label font-medium">Email</label>
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
              Register
            </button>

            <div className="flex items-center gap-2 opacity-70">
              <span>Already have an account?</span>
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
