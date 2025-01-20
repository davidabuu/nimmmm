import React, { useState } from "react";
import GradeHistory from "./GradeHistory";
import PaymentHistory from "./PaymentHistory";
import { IoArrowBack } from "react-icons/io5";
import Link from "next/link";

const HistoryTab = () => {
  const [activeTab, setActiveTab] = useState("grade");

  return (
    <div className=" p-4 md:p-8 bg-[#F5F7FA] min-h-screen">
      <div className="flex items-center gap-4 border-b border-gray-200 text-white p-4 mb-6">
        <Link href="/dashboard">
          {" "}
          <button className="bg-primary rounded-full p-2">
            <IoArrowBack className="w-6 h-6" />
          </button>
        </Link>
        <h1 className="text-xl text-primary font-medium">History</h1>
      </div>
      {/* Tab Navigation */}
      <div className="flex border-b bg-white">
        <button
          className={`p-4 ${
            activeTab === "grade"
              ? "border-b-2 border-blue-900 font-semibold text-blue-900"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("grade")}
        >
          Grade
        </button>
        <button
          className={`p-4 ${
            activeTab === "payments"
              ? "border-b-2 border-blue-900 font-semibold text-blue-900"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("payments")}
        >
          Payments
        </button>
      </div>

      {/* Content based on the active tab */}
      <div className="">
        {activeTab === "grade" && <GradeHistory />}
        {activeTab === "payments" && <PaymentHistory />}
      </div>
    </div>
  );
};

export default HistoryTab;
