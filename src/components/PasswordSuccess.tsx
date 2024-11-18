"use client";
import Image from "next/image";

export default function PasswordSuccess() {
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
            <Image
              src="/success.png" // Replace with your logo path
              alt="NIM Logo"
              className="mx-auto"
              width={300}
              height={300}
            />
            <h1 className="md:text-2xl text-lg  text-secondary font-semibold mt-2">
              Your Password has been reset successfully
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}
