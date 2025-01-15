import { useState } from "react";
import PrimaryButton from "../../../components/shared/PrimaryButton/PrimaryButton";
import { Link } from "react-router-dom";
import axiosInstance from "../../../utils/axiosInstance";
import toast from "react-hot-toast";

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("customer");
  const [bankAccountNumber, setBankAccountNumber] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      email,
      password,
      userType,
      bankAccountNumber,
    };
    console.log("Signup Data:", formData);

    setIsLoading(true);
    axiosInstance
      .post("/auth/signup", formData)
      .then((res) => {
        console.log(res.data);
        toast.success(res?.data?.message || "Registration successful");
        setEmail("");
        setPassword("");
        setBankAccountNumber("");
        setUserType("customer");
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
          Create an Account
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Input */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
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
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
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

          {/* User Type Dropdown */}
          <div>
            <label
              htmlFor="userType"
              className="block text-sm font-medium text-gray-700"
            >
              User Type
            </label>
            <select
              id="userType"
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              className="select select-bordered w-full mt-1"
              required
            >
              <option value="customer">Customer</option>
              <option value="supplier">Supplier</option>
            </select>
          </div>

          {/* Bank Account Number Input */}
          <div>
            <label
              htmlFor="bankAccountNumber"
              className="block text-sm font-medium text-gray-700"
            >
              Bank Account Number
            </label>
            <input
              type="text"
              id="bankAccountNumber"
              value={bankAccountNumber}
              onChange={(e) => setBankAccountNumber(e.target.value)}
              className="input input-bordered w-full mt-1"
              placeholder="Enter your bank account number"
              required
            />
          </div>

          {/* Submit Button */}
          <div>
            <PrimaryButton
              loading={isLoading}
              title={"Sign Up"}
              classNames="w-full"
            />
          </div>
        </form>

        {/* Additional Options */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/auth/login"
              className="font-medium text-orange-500 hover:underline"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
