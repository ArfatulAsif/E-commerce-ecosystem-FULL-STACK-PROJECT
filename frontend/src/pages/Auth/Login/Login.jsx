import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PrimaryButton from "../../../components/shared/PrimaryButton/PrimaryButton";
import axiosInstance from "../../../utils/axiosInstance";
import toast from "react-hot-toast";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email:", email, "Password:", password);

    setIsLoading(true);
    axiosInstance
      .post("/auth/login", { email, password })
      .then((res) => {
        if (res?.data?.token) {
          toast.success("Login successful");
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("userType", res.data.userType);
          setEmail("");
          setPassword("");
          navigate("/");
        }
      })
      .catch((err) => {
        toast.error(
          err?.response?.data?.message || "Error! Please try again later."
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-semibold text-center mb-6">
          Welcome Back
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input input-bordered w-full mt-1"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input input-bordered w-full mt-1"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Submit Button */}
          <div>
            <PrimaryButton
              loading={isLoading}
              title="Log in"
              classNames="w-full"
            />
          </div>
        </form>

        {/* Additional Options */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/auth/register"
              className="font-medium text-orange-500 hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
