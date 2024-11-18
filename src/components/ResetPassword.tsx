"use client";
import Image from "next/image";

export default function ResetPassword() {
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
              Reset your Password
            </h1>
            <p className="mt-2 text-sm  text-secondary">
              Please enter the email associated with your account to reset your
              password
            </p>
          </div>

          <form>
            {/* Membership Number Input */}
            <div className="mb-2">
              <label
                htmlFor="membershipNumber"
                className="block text-gray-700"
              >
                Email Address
              </label>
              <input
                type="email"
                id="membershipNumber"
                placeholder="Enter your membership email"
                className="w-full p-2 border border-gray-300  mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Submit Button */}
            <div className="mt-3">
              <button
                type="submit"
                className="w-full p-3 bg-primary text-white  font-semibold hover:bg-blue-800 transition duration-300"
              >
                Continue
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
