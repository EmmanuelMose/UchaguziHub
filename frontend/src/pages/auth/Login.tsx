import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../../Features/userSlice"; 
import { ApiDomain } from "../../utils/APIDomain";
import { Eye, EyeOff } from "lucide-react";

type LoginFormData = {
  email: string;
  password: string;
};

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);
    setServerError("");

    try {
      const payload = {
        email: data.email.trim(),
        password: data.password.trim()
      };

      const res = await axios.post(`${ApiDomain}/api/auth/login`, payload);

      if (res.data.success && res.data.token) {
        // Save full user info from backend response
        const user = {
          userId: res.data.userId,
          role: res.data.role,
          email: res.data.email
        };

        // Save to Redux
        dispatch(setUser(user));

        // Save to localStorage
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", res.data.token);

        // Navigate based on role
        const role = res.data.role.trim();
        if (role === "Admin") navigate("/admin-dashboard");
        else if (role === "ElectionOfficer") navigate("/officer-dashboard");
        else if (role === "Student") navigate("/user-dashboard"); // For students
        else navigate("/user-dashboard"); // Default fallback
      } else {
        setServerError(res.data.message || "Invalid login credentials");
      }
    } catch (error: any) {
      console.error("Login error:", error.response?.data?.message || error.message);
      setServerError(error.response?.data?.message || "Server error");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md animate-fade-in">
        <h2 className="text-2xl font-bold text-center text-blue-800 mb-6">Login</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email */}
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
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div className="relative">
            <label className="block mb-1 text-blue-700 font-semibold">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              {...register("password", {
                required: "Password is required",
                minLength: { value: 8, message: "Minimum 8 characters" },
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

          {/* Server Error */}
          {serverError && <p className="text-red-500 text-center">{serverError}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full py-2 rounded-lg bg-blue-700 text-white font-semibold hover:bg-blue-800 transition-all ${loading ? "cursor-not-allowed" : ""}`}
            disabled={loading}
          >
            {loading ? "Verifying..." : "Login"}
          </button>
        </form>

        {/* Links */}
        <div className="mt-4 text-center text-sm">
          <p>
            Forgot your password?{" "}
            <span
              onClick={() => navigate("/forgot-password")}
              className="text-blue-600 hover:text-blue-800 cursor-pointer transition-colors"
            >
              Click here
            </span>
          </p>
          <p className="mt-2">
            Don't have an account?{" "}
            <span
              onClick={() => navigate("/register")}
              className="text-blue-600 hover:text-blue-800 cursor-pointer transition-colors"
            >
              Register
            </span>
          </p>
          <p className="mt-2">
            <span
              onClick={() => navigate("/")}
              className="text-black hover:text-blue-600 cursor-pointer transition-colors"
            >
              Back to Home
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
