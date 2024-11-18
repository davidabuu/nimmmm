"use client";

import { useState } from "react";
import { FaBell } from "react-icons/fa";
import { FiFileText, FiChevronLeft, FiChevronRight } from "react-icons/fi";

interface ReportItemProps {
  year: string;
  type: "AGM" | "Council";
  onClick: () => void;
}

function ReportItem({ year, type, onClick }: ReportItemProps) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 p-4 bg-pink-50 rounded-lg hover:bg-pink-100 transition-colors group"
    >
      <FiFileText className="w-5 h-5 text-[#0A0057]" />
      <span className="text-[#0A0057] text-left font-medium group-hover:underline">
        {year} NIM {type} Report
      </span>
    </button>
  );
}

export default function Reports() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 7;

  const years = ["2024", "2023", "2022", "2021", "2020", "2019", "2018"];

  const handleDownload = (year: string, type: string) => {
    console.log(`Downloading ${year} ${type} report...`);
  };

  return (
    <div className="mx-10">
      {/* Notification Icon */}
      <div className="float-right hidden md:flex mr-3 mt-4 bg-blue-900 text-white p-2 rounded-full shadow-lg hover:bg-blue-700 transition duration-300">
        <FaBell size={20} />
      </div>

      <h2 className="text-xl mt-6 px-4 py-2 border-b font-semibold mb-4">
        Reports
      </h2>
      <div className="max-w-5xl mx-auto p-6">
        {/* Reports Grid */}
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          {/* AGM Reports Column */}
          <div className="space-y-4">
            {years.map((year) => (
              <ReportItem
                key={`agm-${year}`}
                year={year}
                type="AGM"
                onClick={() => handleDownload(year, "AGM")}
              />
            ))}
          </div>

          {/* Council Reports Column */}
          <div className="space-y-4">
            {years.map((year) => (
              <ReportItem
                key={`council-${year}`}
                year={year}
                type="Council"
                onClick={() => handleDownload(year, "Council")}
              />
            ))}
          </div>
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-2">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50"
          >
            <FiChevronLeft className="w-5 h-5" />
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm
              ${
                currentPage === i + 1
                  ? "bg-gray-900 text-white"
                  : "hover:bg-gray-100 text-gray-700"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() =>
              setCurrentPage(Math.min(totalPages, currentPage + 1))
            }
            disabled={currentPage === totalPages}
            className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50"
          >
            <FiChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
