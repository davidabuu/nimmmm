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

  const [loading, setLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);

  const searchParams = useSearchParams();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const email = isClient ? localStorage.getItem("accountInfo") || "" : "";
  const description = searchParams.get("description") || "N/A";
  const amount = searchParams.get("amount") || "0";


  const handlePayment = async () => {
    setLoading(true);

    try {
      const result = await dispatch(
        initializePayment({
          email,
          description,
          amount: parseInt(amount, 10),
          provider: "paystack",
          currency: "NGN",
          callbackUrl: "Transaction successful",
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
          <button className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-full hover:opacity-90 transition">
            <FaArrowLeft />
            <span>Back</span>
          </button>
        </a>
      </div>

      {/* Title */}
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">
        Payment
      </h1>

      {/* Paystack Card */}
      <div className="max-w-md">
        <div className="flex justify-between items-center p-6 border border-blue-900 bg-blue-50 rounded-lg shadow-md">
          <div className="flex items-center">
            {isClient ? (
              <Image
                src="/pay.png"
                alt="Paystack"
                width={120}
                height={60}
                className="w-auto h-auto"
              />
            ) : (
              <Skeleton width={120} height={60} />
            )}
          </div>

          {/* Selected Indicator */}
          <div className="w-6 h-6 rounded-full border-2 border-blue-900 bg-blue-900 flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-white" />
          </div>
        </div>
      </div>

      {/* Pay Button */}
      <div className="mt-6">
        <button
          onClick={handlePayment}
          disabled={loading}
          className="w-[30%] bg-primary text-white px-6 py-3 hover:bg-blue-800 transition
                     flex items-center justify-center text-lg font-medium disabled:opacity-50"
        >
          {loading && <FaSpinner className="animate-spin mr-2" />}
          {loading ? "Processing..." : "Proceed to Payment"}
        </button>
      </div>
    </div>
  );
};

export default PaymentGatewaySelection;
