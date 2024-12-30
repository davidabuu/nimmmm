"use client";
import Image from "next/image";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { FaSpinner } from "react-icons/fa";
import { message } from "antd";

import { AppDispatch } from "../lib/store";
import { validateMember } from "../redux/auth/memberValidation";
import SignUpPage from "./SignUpPage"; // Import the SignUp component

export default function MemberValidate() {
  const [membership, setMembership] = useState("");
  const [nameOrDob, setnameOrDob] = useState("");
  const [loading, setLoading] = useState(false);
  const [isValidated, setIsValidated] = useState(false); // Track validation state

  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!membership.trim() || !nameOrDob.trim()) {
      message.error("Please fill in both fields!");
      return;
    }

    setLoading(true);
    try {
      const resultAction = await dispatch(
        validateMember({ membership, nameOrDob })
      );

      if (validateMember.fulfilled.match(resultAction)) {
        message.success("Validation successful!");
        setIsValidated(true); // Switch to the SignUp UI
        localStorage.setItem('memberToken', resultAction.payload.accessToken )
      } else if (validateMember.rejected.match(resultAction)) {
        const errorMessage = resultAction.payload as string;
        message.error(errorMessage || "Validation failed. Please try again.");
      }
    } catch {
      message.error("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (isValidated) {
    return <SignUpPage />; // Show SignUp component on successful validation
  }

  return (
    <div className="min-h-screen flex">
      {/* Left side for background image */}
      <div
        className="hidden md:block md:w-1/2 bg-cover bg-center"
        style={{
          backgroundImage: `url('/meeting.png')`,
        }}
      ></div>

      {/* Right side for the validation form */}
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
              Member Validation
            </h1>
            <p className="mt-2 text-sm text-secondary">
              Enter your membership details below to validate your account.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Membership Number Input */}
            <div className="mb-2">
              <label
                htmlFor="membership"
                className="block text-gray-700"
              >
                Membership Number
              </label>
              <input
                type="text"
                id="membership"
                value={membership}
                onChange={(e) => setMembership(e.target.value)}
                placeholder="Enter your membership number"
                className="w-full p-2 border border-gray-300 mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Date of Birth Input */}
            <div className="mb-4">
              <label
                htmlFor="nameOrDob"
                className="block text-gray-700"
              >
                Date of Birth
              </label>
              <input
                type="date"
                id="nameOrDob"
                value={nameOrDob}
                onChange={(e) => setnameOrDob(e.target.value)}
                className="w-full p-2 border border-gray-300 mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
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
                    Validating...
                  </>
                ) : (
                  "Validate"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
