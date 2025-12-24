import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

type RegisterFormData = {
  email: string;
  password: string;
  confirmPassword: string;
};

const Register = () => {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");
  const { register, handleSubmit, formState: { errors }, watch } = useForm<RegisterFormData>();

  const onSubmit = async (data: RegisterFormData) => {
    try {
      if (data.password !== data.confirmPassword) {
        setServerError("Passwords do not match");
        return;
      }

      const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, {
        email: data.email,
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
  };

  return (
    <div className="form-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Email</label>
          <input
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email" },
            })}
          />
          {errors.email && <p className="error">{errors.email.message}</p>}
        </div>

        <div>
          <label>Password</label>
          <input
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: { value: 8, message: "Minimum 8 characters" },
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
                message: "Password must include uppercase, lowercase, number & special char",
              },
            })}
          />
          {errors.password && <p className="error">{errors.password.message}</p>}
        </div>

        <div>
          <label>Confirm Password</label>
          <input
            type="password"
            {...register("confirmPassword", { required: "Confirm your password" })}
          />
          {errors.confirmPassword && <p className="error">{errors.confirmPassword.message}</p>}
        </div>

        {serverError && <p className="error">{serverError}</p>}

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
