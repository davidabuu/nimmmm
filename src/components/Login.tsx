"use client";
import Image from "next/image";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function LoginForm() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [password, setPassword] = useState("");

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
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
      <div className="flex  justify-center w-full md:w-1/2 p-8">
        <div className="max-w-md w-full bg-white ">
          <div className=" mb-6">
            <Image
              src="/nnpc.png" // Replace with your logo path
              alt="NIM Logo"
              className="mx-auto h-16"
              width={50}
              height={50}
            />
            <h1 className="md:text-2xl text-lg  text-secondary font-semibold mt-2">
              Welcome to Nigerian Institute of Management Membership Portal
            </h1>
            <p className="mt-2 text-sm  text-secondary">
              Enter your login details below to access the membership portal
            </p>
          </div>

          <form>
            {/* Membership Number Input */}
            <div className="mb-2">
              <label
                htmlFor="membershipNumber"
                className="block text-gray-700"
              >
                Membership Number
              </label>
              <input
                type="text"
                id="membershipNumber"
                placeholder="Enter your membership number"
                className="w-full p-2 border border-gray-300  mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
                className="w-full p-2 border border-gray-300  mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
                className="w-full p-3 bg-primary text-white  font-semibold hover:bg-blue-800 transition duration-300"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
