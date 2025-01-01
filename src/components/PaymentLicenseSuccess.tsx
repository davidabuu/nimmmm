"use client";
import React from "react";
import { FaCheckCircle } from "react-icons/fa";

const PaymentLicenseSuccess: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-green-50">
      <div className="text-center p-8 bg-white rounded-lg shadow-md animate-fade-in">
        <div className="flex items-center justify-center mb-4 animate-bounce">
          <FaCheckCircle className="text-green-500 text-6xl" />
        </div>
        <h1 className="text-2xl font-bold text-green-600">
          Payment Successful!
        </h1>
        <p className="mt-2 text-gray-600">
          Your payment for the license has been processed successfully.
        </p>
        <button
          className="mt-6 px-6 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition duration-300"
          onClick={() => (window.location.href = "/")}
        >
          Go to Home Page
        </button>
      </div>
    </div>
  );
};

export default PaymentLicenseSuccess;
