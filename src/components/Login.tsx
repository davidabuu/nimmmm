/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import Image from "next/image";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaEye, FaEyeSlash, FaSpinner } from "react-icons/fa";
import { message } from "antd";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { loginUser } from "../redux/auth/login";
import { AppDispatch, RootState } from "../lib/store";

export default function LoginForm() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [membershipNumber, setMembershipNumber] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.loginUser);
  const router = useRouter();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!membershipNumber.trim() || !password.trim()) {
      message.error("Please fill in both fields!");
      return;
    }

    try {
      const resultAction = await dispatch(
        loginUser({ email: membershipNumber, password })
      );

      if (loginUser.fulfilled.match(resultAction)) {
        const accessToken = resultAction.payload?.accessToken; // Assuming accessToken is in the payload
    if (accessToken) {
          localStorage.setItem("accessToken", accessToken);
        }
        message.success("Validation successful!");
        router.push("/dashboard");
      } else if (loginUser.rejected.match(resultAction)) {
        const errorMessage = resultAction.payload as string;
        message.error(errorMessage);
      }
    } catch (error) {
      message.error("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side for background image */}
      <div
        className="hidden md:block md:w-1/2 bg-cover bg-center"
        style={{
          backgroundImage: `url('/meeting.png')`,
        }}
      ></div>

      {/* Right side for the login form */}
      <div className="flex justify-center w-full md:w-1/2 p-8">
        <div className="max-w-md w-full bg-white">
          <div className="mb-6">
            <Image
              src="/nnpc.png" // Replace with your logo path
              alt="NIM Logo"
              className="mx-auto h-16"
              width={50}
              height={50}
            />
            <h1 className="md:text-2xl text-lg text-secondary font-semibold mt-2">
              Welcome to Nigerian Institute of Management Membership Portal
            </h1>
            <p className="mt-2 text-sm text-secondary">
              Enter your login details below to access the membership portal
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Membership Number Input */}
            <div className="mb-2">
              <label htmlFor="membershipNumber" className="block text-gray-700">
                Membership Email
              </label>
              <input
                type="text"
                id="membershipNumber"
                value={membershipNumber}
                onChange={(e) => setMembershipNumber(e.target.value)}
                placeholder="Enter your membership number"
                className="w-full p-2 border border-gray-300 mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Password Input with Eye Toggle */}
            <div className="mb-4 relative">
              <label htmlFor="password" className="block text-gray-700">
                Password
              </label>
              <input
                type={passwordVisible ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full p-2 border border-gray-300 mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <div
                className="absolute inset-y-4 translate-y-3 right-0 pr-3 flex items-center cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {passwordVisible ? (
                  <FaEyeSlash className="text-gray-600" />
                ) : (
                  <FaEye className="text-gray-600" />
                )}
              </div>
            </div>

            {/* Forgot Password Link */}
            <div className="text-right mb-4">
              <a
                href="/forgot-password"
                className="text-red-600 hover:underline text-sm font-semibold"
              >
                Forgot Password?
              </a>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full p-3 bg-primary text-white font-semibold hover:bg-blue-800 transition duration-300 flex justify-center items-center"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <FaSpinner className="animate-spin mr-1" />
                    Logging in...
                  </>
                ) : (
                  "Login"
                )}
              </button>
            </div>
          </form>

          {/* Bottom Section for Signup */}
          <div className="mt-4 text-center">
            <div className="text-sm text-gray-700">
              Don’t have an account?{' '}
              <Link href="/member-validate">
                <h3 className="text-primary font-semibold hover:underline">
                  Create Account
                </h3>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
