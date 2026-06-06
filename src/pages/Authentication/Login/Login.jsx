import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const { signInUser } = useAuth();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";

  const onSubmit = async (data) => {
    try {
      await signInUser(data.email, data.password);
      navigate(from, { replace: true });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Login failed",
        text: error?.response?.data?.message || "Invalid email or password",
      });
    }
  };

  return (
    <div className="flex w-full items-center justify-center px-4 py-8">
      <div className="card max-w-md w-full shadow-xl border border-blue-100 bg-white">
        <div className="px-6 pt-6">
          <h1 className="text-2xl sm:text-3xl mb-1 font-bold text-slate-900">Welcome Back</h1>
          <p className="text-gray-600">Admin login — email and password from MongoDB</p>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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

            <div>
              <label className="label font-medium">Password</label>
              <input
                type="password"
                placeholder="Password"
                className="input input-bordered w-full focus:outline-none focus:border-blue-500"
                {...register("password", { required: "Password is required" })}
              />
              {errors.password && (
                <p className="text-blue-500 text-sm">{errors.password.message}</p>
              )}
            </div>

            <button
              type="submit"
              className="btn bg-blue-600 hover:bg-blue-700 border-blue-600 text-white w-full"
            >
              Login
            </button>

            <p className="text-center text-xs text-slate-500">
              Only the admin account can access the dashboard.
            </p>

            <p className="text-center text-sm text-slate-600">
              No account yet?{" "}
              <Link to="/register" className="link link-hover text-blue-600">
                Register admin
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
