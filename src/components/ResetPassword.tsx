/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
// Adjust import paths as necessary
import { useState } from "react";
import { message } from "antd";
import { FaSpinner } from "react-icons/fa"; // Import the spinner icon
import { requestOTP } from "../redux/auth/requestOtp";
import { AppDispatch, RootState } from "@/src/lib/store";

export default function ResetPassword() {
  const dispatch = useDispatch<AppDispatch>();
  const { loading,  error } = useSelector(
    (state: RootState) => state.requestOTP
  );

  const [email, setEmail] = useState("");

  const handleRequestOTP = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      message.error("Please enter your email address.");
      return;
    }

    try {
      await dispatch(requestOTP({ email })).unwrap();
      message.success("OTP has been sent to your email.");
    } catch (err) {
      message.error(error || "An error occurred while requesting OTP.");
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
              Reset your Password
            </h1>
            <p className="mt-2 text-sm text-secondary">
              Please enter the email associated with your account to reset your
              password
            </p>
          </div>

          <form onSubmit={handleRequestOTP}>
            {/* Email Input */}
            <div className="mb-2">
              <label htmlFor="email" className="block text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your membership email"
                className="w-full p-2 border border-gray-300 mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Submit Button */}
            <div className="mt-3">
              <button
                type="submit"
                disabled={loading}
                className="w-full p-3 bg-primary text-white font-semibold hover:bg-blue-800 transition duration-300 flex items-center justify-center"
              >
                {loading ? (
                  <FaSpinner className="animate-spin mr-2" />
                ) : (
                  "Continue"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
