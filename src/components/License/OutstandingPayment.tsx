import React from "react";
import { FaMoneyBillAlt } from "react-icons/fa";

interface OutstandingPaymentsProps {
  message: string; // Text for the paragraph
  buttonText: string; // Text for the button
  onButtonClick: () => void; // Handler for button click
}

const OutstandingPayments: React.FC<OutstandingPaymentsProps> = ({
  message,
  buttonText,
  onButtonClick,
}) => {
  return (
    <div className="flex mx-4 md:mx-0 flex-col items-center justify-center min-h-[70vh] bg-white px-4">
      {/* Icon */}
      <div className="text-black mb-6">
        <FaMoneyBillAlt size={60} />
      </div>

      {/* Text */}
      <p className="text-center text-lg font-medium text-gray-800 mb-6">
        {message}
      </p>

      {/* Button */}
      <button
        onClick={onButtonClick}
        className="bg-primary text-white py-3 px-6 hover:bg-blue-700 transition duration-300"
      >
        {buttonText}
      </button>
    </div>
  );
};

export default OutstandingPayments;
