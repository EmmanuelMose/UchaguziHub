import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ApiDomain } from "../../utils/APIDomain";
import { Eye, EyeOff } from "lucide-react";

type RegisterFormData = {
  fullName: string;
  email: string;
  registrationNumber: string;
  password: string;
  confirmPassword: string;
};

const Register = () => {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormData>();

  const onSubmit = async (data: RegisterFormData) => {
    if (data.password !== data.confirmPassword) {
      setServerError("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post(`${ApiDomain}/api/auth/register`, {
        fullName: data.fullName,
        email: data.email,
        registrationNumber: data.registrationNumber,
        password: data.password,
      });

      if (res.data.success) {
        navigate("/verify-user", { state: { email: data.email } });
      } else {
        setServerError(res.data.message);
      }
    } catch (error: any) {
      setServerError(error.response?.data?.message || "Server error");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md animate-fade-in">
        <h2 className="text-2xl font-bold text-center text-blue-800 mb-6">Register</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block mb-1 text-blue-700 font-semibold">Full Name</label>
            <input
              type="text"
              {...register("fullName", { required: "Full Name is required" })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName.message}</p>}
          </div>

          <div>
            <label className="block mb-1 text-blue-700 font-semibold">Email</label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Invalid email address",
                },
              })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block mb-1 text-blue-700 font-semibold">Registration Number</label>
            <input
              type="text"
              {...register("registrationNumber", { required: "Registration Number is required" })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.registrationNumber && <p className="text-red-500 text-sm">{errors.registrationNumber.message}</p>}
          </div>

          <div className="relative">
            <label className="block mb-1 text-blue-700 font-semibold">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              {...register("password", {
                required: "Password is required",
                minLength: { value: 8, message: "Minimum 8 characters" },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])/,
                  message: "Password must include uppercase, lowercase, number, special char",
                },
              })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <div
              className="absolute right-3 top-9 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </div>
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>

          <div className="relative">
            <label className="block mb-1 text-blue-700 font-semibold">Confirm Password</label>
            <input
              type={showConfirm ? "text" : "password"}
              {...register("confirmPassword", { required: "Confirm your password" })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <div
              className="absolute right-3 top-9 cursor-pointer"
              onClick={() => setShowConfirm(!showConfirm)}
            >
              {showConfirm ? <EyeOff /> : <Eye />}
            </div>
            {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>}
          </div>

          {serverError && <p className="text-red-500 text-center">{serverError}</p>}

          <button
            type="submit"
            className={`w-full py-2 rounded-lg bg-blue-700 text-white font-semibold hover:bg-blue-800 transition-all ${
              loading ? "cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <div className="mt-4 text-center text-sm">
          <p>
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-blue-600 hover:text-blue-800 cursor-pointer transition-colors"
            >
              Back to Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
