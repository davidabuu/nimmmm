import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { IoArrowBack } from "react-icons/io5";

export default function Reports() {
  const [currentPage, setCurrentPage] = useState(1);

  const reports = [
    { date: "29th Dec 2025", type: "Financial Report" },
    { date: "28th Dec 2024", type: "Financial Report" },
    { date: "30th Dec 2023", type: "Financial Report" },
    { date: "31st Dec 2022", type: "Financial Report" },
    { date: "29th Dec 2021", type: "Financial Report" },
    { date: "30th Dec 2020", type: "Financial Report" },
    { date: "28th Dec 2019", type: "Financial Report" },
    { date: "29th Dec 2018", type: "Financial Report" },
    { date: "30th Dec 2017", type: "Financial Report" },
  ];

  const itemsPerPage = 9;
  const totalPages = Math.ceil(reports.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentReports = reports.slice(startIdx, startIdx + itemsPerPage);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="flex items-center gap-4 border-b border-gray-200 text-white p-4 mb-6">
        <Link href="/history">
          {" "}
          <button className="bg-primary rounded-full p-2">
            <IoArrowBack className="w-6 h-6" />
          </button>
        </Link>
        <h1 className="text-xl text-primary font-medium">Reports</h1>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 pb-12">
        {/* Reports Grid - 3 columns */}
        <div className="grid grid-cols-3 gap-8 mb-12">
          {currentReports.map((report, idx) => (
            <div
              key={idx}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              {/* Flex Container - Image Left, Content Right */}
              <div className="flex">
                {/* Logo Section - Left */}
                <div className="w-1/3 flex items-center justify-center bg-gray-50 border-r border-gray-200 p-4">
                  <Image
                    src="/nnpc.png"
                    alt="NNPC Logo"
                    width={100}
                    height={100}
                    className="h-20 w-auto object-contain"
                  />
                </div>

                {/* Text Content - Right */}
                <div className="w-2/3 p-6 flex flex-col justify-between">
                  <div>
                    <p className="text-gray-600 text-sm mb-2">{report.date}</p>
                    <h3 className="text-base font-bold text-gray-900">
                      {report.type}
                    </h3>
                  </div>

                  {/* Go to Report Button */}
                  <button
                    className="w-full py-2 text-white font-semibold flex items-center justify-center gap-2 transition-opacity hover:opacity-90 text-sm mt-4"
                    style={{ backgroundColor: "#0A0057" }}
                  >
                    <span>Go to report</span>
                    <span className="text-lg">→</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-3">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-lg bg-white hover:bg-gray-100 disabled:opacity-50 transition-colors"
          >
            <FiChevronLeft className="w-5 h-5 text-gray-900" />
          </button>

          <div className="flex gap-2">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-8 h-8 rounded-lg font-semibold transition-all ${
                  currentPage === i + 1
                    ? "text-white bg-gray-700"
                    : "text-gray-900 bg-white hover:bg-gray-200"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <button
            onClick={() =>
              setCurrentPage(Math.min(totalPages, currentPage + 1))
            }
            disabled={currentPage === totalPages}
            className="p-2 rounded-lg bg-white hover:bg-gray-100 disabled:opacity-50 transition-colors"
          >
            <FiChevronRight className="w-5 h-5 text-gray-900" />
          </button>
        </div>
      </div>
    </div>
  );
}