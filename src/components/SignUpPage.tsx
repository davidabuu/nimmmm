"use client";
import Image from "next/image";
import { useState } from "react";
import { FaSpinner, FaEye, FaEyeSlash } from "react-icons/fa";
import { message } from "antd";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AppDispatch } from "../lib/store";
import { signUpUser } from "../redux/auth/signUp";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim() || !username.trim() || !password.trim()) {
      message.error("Please fill in all fields!");
      return;
    }

    setLoading(true);
    try {
      const resultAction = await dispatch(
        signUpUser({ email, username, password })
      );

      if (signUpUser.fulfilled.match(resultAction)) {
        message.success("Signup successful! Redirecting to login page.");
        router.push("/");
      } else if (signUpUser.rejected.match(resultAction)) {
        const errorMessage = resultAction.payload as string;
        message.error(errorMessage || "Signup failed. Please try again.");
      }
    } catch {
      message.error("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
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

      {/* Right side for the signup form */}
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
              Sign Up
            </h1>
            <p className="mt-2 text-sm text-secondary">
              Create your account to access the membership portal.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Email Input */}
            <div className="mb-2">
              <label
                htmlFor="email"
                className="block text-gray-700"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full p-2 border border-gray-300 mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Username Input */}
            <div className="mb-2">
              <label
                htmlFor="username"
                className="block text-gray-700"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                className="w-full p-2 border border-gray-300 mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Password Input with Eye Toggle */}
            <div className="mb-4 relative">
              <label
                htmlFor="password"
                className="block text-gray-700"
              >
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
                    Signing up...
                  </>
                ) : (
                  "Sign Up"
                )}
              </button>
            </div>
          </form>

          {/* Login Prompt */}
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link href="/">
                <p className="font-semibold text-indigo-600 hover:underline">
                  Login
                </p>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
