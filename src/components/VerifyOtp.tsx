/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
; // Adjust the import path as needed
import { message } from "antd";
import { AppDispatch, RootState } from "@/src/lib/store";
import { verifyOTP } from "../redux/auth/verifyOtp";
export default function VerifyOTP() {
  const dispatch = useDispatch<AppDispatch>();
  const { loading,  error } = useSelector(
    (state: RootState) => state.verifyOTP
  );

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);

  const handleChangeOtp = (value: string, index: number) => {
    if (isNaN(Number(value))) return; // Only allow numeric input
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1); // Ensure only one character per input
    setOtp(newOtp);

    // Automatically focus the next input field
    if (value && index < otp.length - 1) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDownOtp = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const otpCode = otp.join("");
    if (!email) {
      message.error("Please enter your email address.");
      return;
    }
    if (otpCode.length < 4) {
      message.error("Please enter the complete OTP.");
      return;
    }

    try {
      await dispatch(verifyOTP({ email, otp: otpCode })).unwrap();
      message.success("OTP verified successfully!");
    } catch (err) {
      message.error(error || "Invalid OTP. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h2 className="text-xl font-semibold text-center text-secondary mb-4">
          Verify OTP
        </h2>
        <p className="text-sm text-center text-gray-600 mb-6">
          Please enter your email address and the 4-digit OTP sent to your email.
        </p>

        <form onSubmit={handleSubmit}>
          {/* Email Input */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 mb-1">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* OTP Input */}
          <div className="flex justify-center space-x-2 mb-4">
            {otp.map((value, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                value={value}
                onChange={(e) => handleChangeOtp(e.target.value, index)}
                onKeyDown={(e) => handleKeyDownOtp(e, index)}
                maxLength={1}
                className="w-12 h-12 text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-xl"
              />
            ))}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full p-3 bg-primary text-white font-semibold hover:bg-blue-800 transition duration-300 flex items-center justify-center"
          >
            {loading ? (
              <span className="animate-spin mr-2">⏳</span>
            ) : (
              "Verify"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
