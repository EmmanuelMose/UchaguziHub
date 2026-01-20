import { useForm } from "react-hook-form";
import axios from "axios";
import { ApiDomain } from "../../utils/APIDomain";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

type ForgotData = {
  email: string;
};

const ForgotPassword = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<ForgotData>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (data: ForgotData) => {
    setLoading(true);
    setError("");
    try {
      await axios.post(`${ApiDomain}/api/auth/forgot-password`, data);
      navigate("/verify-reset-code", { state: { email: data.email } });
    } catch (err: any) {
      setError(err.response?.data?.message || "User not found");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-blue-800 mb-6">
          Forgot Password
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block mb-1 font-semibold text-blue-700">
              Email
            </label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          {error && <p className="text-red-500 text-center">{error}</p>}

          <button
            disabled={loading}
            className="w-full bg-blue-700 text-white py-2 rounded-lg hover:bg-blue-800"
          >
            {loading ? "Sending..." : "Send Code"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
