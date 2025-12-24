import { useForm } from "react-hook-form";
import axios from "axios";
import { ApiDomain } from "../../utils/APIDomain";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

type CodeData = {
  code: string;
};

const VerifyResetCode = () => {
  const { state } = useLocation();
  const email = state?.email;
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<CodeData>();
  const [error, setError] = useState("");

  const onSubmit = async (data: CodeData) => {
    try {
      await axios.post(`${ApiDomain}/api/auth/verify-reset-code`, {
        email,
        code: data.code,
      });
      navigate("/reset-password", { state: { email } });
    } catch (err: any) {
      setError("Invalid or expired code");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-blue-800 mb-6">
          Verify Code
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            type="text"
            maxLength={6}
            {...register("code", { required: "Code required" })}
            placeholder="Enter 6-digit code"
            className="w-full px-4 py-2 border rounded-lg text-center tracking-widest"
          />
          {errors.code && <p className="text-red-500 text-sm">{errors.code.message}</p>}
          {error && <p className="text-red-500 text-center">{error}</p>}

          <button className="w-full bg-blue-700 text-white py-2 rounded-lg hover:bg-blue-800">
            Verify
          </button>
        </form>

        <p
          className="text-center mt-4 text-blue-600 cursor-pointer"
          onClick={() => navigate("/register")}
        >
          Back to Register
        </p>
      </div>
    </div>
  );
};

export default VerifyResetCode;
