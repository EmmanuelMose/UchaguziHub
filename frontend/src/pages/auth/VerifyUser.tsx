import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

type VerifyFormData = {
  code: string;
};

const VerifyUser = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = (location.state as any)?.email;
  const [serverError, setServerError] = useState("");

  const { register, handleSubmit, formState: { errors } } = useForm<VerifyFormData>();

  if (!email) return <p>Invalid access. Please register first.</p>;

  const onSubmit = async (data: VerifyFormData) => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/verify`, {
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
  };

  return (
    <div className="form-container">
      <h2>Verify Your Account</h2>
      <p>We sent a 6-digit verification code to <strong>{email}</strong></p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Verification Code</label>
          <input
            type="text"
            {...register("code", {
              required: "Code is required",
              pattern: { value: /^\d{6}$/, message: "Code must be 6 digits" },
            })}
          />
          {errors.code && <p className="error">{errors.code.message}</p>}
        </div>

        {serverError && <p className="error">{serverError}</p>}

        <button type="submit">Verify</button>
      </form>
    </div>
  );
};

export default VerifyUser;
