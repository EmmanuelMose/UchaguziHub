import { useForm } from "react-hook-form";
import axios from "axios";
import { ApiDomain } from "../../utils/APIDomain";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

type ResetData = {
  password: string;
  confirmPassword: string;
};

const ResetPassword = () => {
  const { state } = useLocation();
  const email = state?.email;
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const { register, handleSubmit, watch, formState: { errors } } = useForm<ResetData>();

  if (!email) {
    navigate("/forgot-password"); // redirect if email not passed
    return null;
  }

  const onSubmit = async (data: ResetData) => {
    setError("");
    if (data.password !== data.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      await axios.post(`${ApiDomain}/api/auth/reset-password`, {
        email,
        password: data.password, // send plain password
      });
      navigate("/login");
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to reset password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-blue-800 mb-6">
          Reset Password
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            type="password"
            placeholder="New Password"
            {...register("password", {
              required: "Password is required",
              minLength: { value: 8, message: "Minimum 8 characters" },
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])/,
                message: "Password must include uppercase, number & special char",
              },
            })}
            className="w-full px-4 py-2 border rounded-lg"
          />

          <input
            type="password"
            placeholder="Confirm Password"
            {...register("confirmPassword", {
              validate: value =>
                value === watch("password") || "Passwords do not match",
            })}
            className="w-full px-4 py-2 border rounded-lg"
          />

          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
          {error && <p className="text-red-500 text-center">{error}</p>}

          <button className="w-full bg-blue-700 text-white py-2 rounded-lg hover:bg-blue-800">
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
