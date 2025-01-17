import Link from "next/link";
import React from "react";

const PaymentDetails: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] bg-white px-4">
      {/* Payment Details Box */}
      <div className="w-full max-w-md border border-dashed border-gray-300 rounded-lg bg-white shadow-md p-6 mb-8">
        <div className="flex justify-between items-center mb-4">
          <p className="text-gray-500 font-medium">Date</p>
          <p className="text-gray-900 font-semibold">16/09/2024</p>
        </div>
        <div className="flex justify-between items-center mb-4">
          <p className="text-gray-500 font-medium">Payment for</p>
          <p className="text-gray-900 font-semibold">
            Management License Renewal
          </p>
        </div>
        <div className="flex justify-between items-center mb-4">
          <p className="text-gray-500 font-medium">Amount Payable</p>
          <p className="text-red-600 font-bold">N10,000.00</p>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-gray-500 font-medium">Validity</p>
          <p className="text-gray-900 font-semibold">3 Years</p>
        </div>
      </div>

      {/* Proceed to Payment Button */}
      <Link href="/payment-gateway?amount=10000&description=License">
        <button className="bg-primary text-white py-3 px-8 text-lg font-medium hover:bg-blue-700 transition duration-300 shadow-md">
          Proceed to Payment (10,000)
        </button>
      </Link>
    </div>
  );
};

export default PaymentDetails;
