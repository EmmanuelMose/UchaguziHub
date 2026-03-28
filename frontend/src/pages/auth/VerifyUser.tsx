import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { ApiDomain } from "../../utils/APIDomain";

type VerifyFormData = {
  code: string;
};

const VerifyUser = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = (location.state as any)?.email;
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<VerifyFormData>();

  const onSubmit = async (data: VerifyFormData) => {
    setLoading(true);
    try {
      const res = await axios.post(`${ApiDomain}/api/auth/verify`, {
        email,
        code: data.code,
      });

      if (res.data.success) {
        navigate("/login");
      } else {
        setServerError(res.data.message || "Invalid code");
      }
    } catch (error: any) {
      setServerError(error.response?.data?.message || "Server error");
    }
    setLoading(false);
  };

  if (!email) return <p className="text-center mt-20">Invalid access. Please register first.</p>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md animate-fade-in">
        <h2 className="text-2xl font-bold text-center text-blue-800 mb-4">Verify Your Account</h2>
        <p className="text-center mb-6">
          We sent a 6-digit verification code to <strong>{email}</strong>
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block mb-1 text-blue-700 font-semibold">Verification Code</label>
            <input
              type="text"
              {...register("code", {
                required: "Code is required",
                pattern: { value: /^\d{6}$/, message: "Code must be 6 digits" },
              })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.code && <p className="text-red-500 text-sm">{errors.code.message}</p>}
          </div>

          {serverError && <p className="text-red-500 text-center">{serverError}</p>}

          <button
            type="submit"
            className={`w-full py-2 rounded-lg bg-blue-700 text-white font-semibold hover:bg-blue-800 transition-all ${
              loading ? "cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Verifying..." : "Verify"}
          </button>
        </form>

        <div className="mt-4 text-center text-sm">
          <p>
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

export default VerifyUser;
