"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FaArrowLeft, FaSpinner } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/src/lib/store";
import { useSearchParams } from "next/navigation";
import { initializePayment } from "../redux/payment/initializePayment";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const PaymentGatewaySelection = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [selectedGateway, setSelectedGateway] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [isClient, setIsClient] = useState(false);
  const searchParams = useSearchParams();
  
  useEffect(() => {
    setIsClient(true); // Ensures component is mounted before accessing localStorage
  }, []);

  const email = isClient ? localStorage.getItem("accountInfo") || "" : "";
  const description = searchParams.get("description") || "N/A";
  const amount = searchParams.get("amount") || "0.00";

  const gateways = [
    { name: "Interswitch", imageSrc: "/inter.png", value: "interswitch" },
    { name: "Paystack", imageSrc: "/pay.png", value: "paystack" },
  ];

  const handleSelection = (gateway: string) => setSelectedGateway(gateway);

  const handlePayment = async () => {
    if (!selectedGateway) {
      alert("Please select a payment gateway.");
      return;
    }

    setLoading(true);
    try {
      const result = await dispatch(
        initializePayment({
          email,
          description,
          amount:parseInt(amount),
          provider: selectedGateway,
          currency:'NGN',
          callbackUrl:'Transaction successful'
        })
      );

      if (initializePayment.fulfilled.match(result)) {
   
        const { authorization_url } = result.payload;
        if (authorization_url) {
          window.location.href = authorization_url;
        }
      } else {
        alert(result.payload || "Failed to initialize payment.");
      }
    } catch (error) {
      console.error("Error initializing payment:", error);
      alert("Failed to initialize payment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      {/* Back Button */}
      <div className="mb-6">
        <a href="/dashboard">
          <button className="flex items-center text-gray-600 hover:text-gray-800">
            <FaArrowLeft className="mr-2" />
            <span>Back</span>
          </button>
        </a>
      </div>

      {/* Title */}
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">
        Select Payment Gateway
      </h1>

      {/* Payment Gateways */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {gateways.map((gateway) => (
          <div
            key={gateway.value}
            className={`flex justify-between items-center p-6 border rounded-lg transition-all duration-300 cursor-pointer shadow-md 
              ${
                selectedGateway === gateway.value
                  ? "border-blue-900 ring-2 ring-blue-900 bg-blue-50"
                  : "border-gray-300 bg-white hover:shadow-lg"
              }`}
            onClick={() => handleSelection(gateway.value)}
          >
            {/* Image with Skeleton Loader */}
            <div className="flex items-center">
              {isClient ? (
                <Image
                  src={gateway.imageSrc}
                  alt={gateway.name}
                  width={100}
                  height={50}
                  className="w-auto h-auto"
                />
              ) : (
                <Skeleton width={100} height={50} />
              )}
            </div>

            {/* Selection Indicator */}
            <div
              className={`w-6 h-6 rounded-full border-2 flex justify-center items-center 
                ${
                  selectedGateway === gateway.value
                    ? "border-blue-900 bg-blue-900"
                    : "border-gray-300 bg-white"
                }`}
            >
              {selectedGateway === gateway.value && (
                <div className="w-3 h-3 rounded-full bg-white"></div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Payment Button */}
      {selectedGateway && (
        <div className="mt-6">
          <button
            onClick={handlePayment}
            className="w-[30%] bg-blue-700 text-white px-6 py-3 rounded-lg hover:bg-blue-800 transition flex items-center justify-center text-lg font-medium disabled:opacity-50"
            disabled={loading}
          >
            {loading ? <FaSpinner className="animate-spin mr-2" /> : null}
            {loading ? "Processing..." : "Proceed to Payment"}
          </button>
        </div>
      )}
    </div>
  );
};

export default PaymentGatewaySelection;
