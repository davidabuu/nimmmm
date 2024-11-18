import React from "react";
import { FaFaceFrownOpen } from "react-icons/fa6";

const Renewal: React.FC = () => {
  return (
    <div className="flex mx-4 md:mx-0 flex-col items-center justify-center min-h-[70vh] bg-white px-4">
      {/* Icon */}
      <div className="text-black mb-6">
        <FaFaceFrownOpen size={60} />
      </div>

      {/* Text */}
      <p className="text-center text-lg font-medium text-gray-800 mb-6">
        Unfortunately, Your Management License has expired
      </p>

      {/* Button */}
      <button className="bg-primary text-white py-3 px-6  hover:bg-blue-700 transition duration-300">
        Pay for renewal
      </button>
    </div>
  );
};

export default Renewal;
