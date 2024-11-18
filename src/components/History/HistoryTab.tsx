import React, { useState } from "react";
import GradeHistory from "./GradeHistory";
import PaymentHistory from "./PaymentHistory";

const HistoryTab = () => {
  const [activeTab, setActiveTab] = useState("grade");

  return (
    <div className=" p-4 md:p-8 bg-[#F5F7FA] min-h-screen">
      <h1 className="border-b font-medium text-secondary pb-2 my-2">History</h1>
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
