"use client";
import React, { useState } from "react";
import Image from "next/image";
import { FaArrowLeft } from "react-icons/fa";

const PaymentGatewaySelection = () => {
  const [selectedGateway, setSelectedGateway] = useState<string | null>(null);

  const gateways = [
    {
      name: "Interswitch",
      imageSrc: "/inter.png", // Replace with your image path
      value: "interswitch",
    },
    {
      name: "Paystack",
      imageSrc: "/pay.png", // Replace with your image path
      value: "paystack",
    },
  ];

  const handleSelection = (gateway: string) => {
    setSelectedGateway(gateway);
  };

  return (
    <div className="p-8 min-h-screen bg-[#F5F7FA]">
      {/* Back Button */}
      <div className="mb-6">
        <a href="/admin-dashboard">
          {" "}
          <button className="flex items-center text-gray-600 hover:text-gray-800">
            <FaArrowLeft className="mr-2" />
            <span>Back</span>
          </button>
        </a>
      </div>
      <h1 className="text-secondary font-medium my-2">
        {" "}
        Select Payment Gateway
      </h1>
      {/* Payment Gateway Selection */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {gateways.map((gateway) => (
          <div
            key={gateway.value}
            className={`flex justify-between items-center p-6 border rounded-lg transition-all duration-300 cursor-pointer 
              ${
                selectedGateway === gateway.value
                  ? "border-blue-900 ring-2 ring-blue-900"
                  : "border-gray-300"
              }`}
            onClick={() => handleSelection(gateway.value)}
          >
            {/* Payment Gateway Logo */}
            <div className="flex items-center">
              <Image
                src={gateway.imageSrc}
                alt={gateway.name}
                width={100}
                height={50}
                className="w-auto h-auto"
              />
            </div>

            {/* Circle Indicator */}
            <div
              className={`w-6 h-6 rounded-full border-2 flex justify-center items-center 
                ${
                  selectedGateway === gateway.value
                    ? "border-blue-900 bg-blue-900"
                    : "border-gray-300"
                }`}
            >
              {selectedGateway === gateway.value && (
                <div className="w-3 h-3 rounded-full bg-white"></div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentGatewaySelection;
