import React from "react";
import { FaRegCheckCircle } from "react-icons/fa";

const Congratulations: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      {/* Celebration Icon */}
      <div className="text-yellow-500 mb-6">
        <FaRegCheckCircle size={60} />
      </div>

      {/* Congratulations Message */}
      <div className="text-center">
        <h1 className="text-xl font-semibold text-gray-800 mb-2">
          Congratulations <span className="text-blue-900">VICTOR</span>,
        </h1>
        <p className="text-lg text-gray-600">
          Your License Number Is:{" "}
          <span className="text-red-600 font-bold">NMILM223344</span>
        </p>
      </div>

      {/* Certificate Button */}
      <button className="mt-8 bg-blue-900 text-white py-3 px-8 rounded-lg text-lg font-medium hover:bg-blue-700 transition duration-300 shadow-md">
        License Certificate
      </button>
    </div>
  );
};

export default Congratulations;
