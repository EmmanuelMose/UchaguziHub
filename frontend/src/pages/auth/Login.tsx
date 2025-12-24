import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

type LoginFormData = {
  email: string;
  password: string;
};

const Login = () => {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, data);

      if (res.data.success) {
        const role = res.data.role;
        // Redirect based on role
        if (role === "Admin") navigate("/admin-dashboard");
        else if (role === "User") navigate("/user-dashboard");
        else if (role === "Election Officer") navigate("/officer-dashboard");
        else navigate("/dashboard");
      } else {
        setServerError(res.data.message);
      }
    } catch (error: any) {
      setServerError(error.response?.data?.message || "Server error");
    }
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
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
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && <p className="error">{errors.password.message}</p>}
        </div>

        {serverError && <p className="error">{serverError}</p>}

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
