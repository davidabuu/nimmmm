import React, { useState } from "react";
import {
  FaFileAlt,
  FaClipboardCheck,
  FaInfoCircle,
  FaCheckCircle,
  FaCreditCard,
} from "react-icons/fa";
import CriteriaInstructions from "./CriteriaInstructions";
import UpgradeForm from "./UpgradeForm";
import InstitutionsAdded from "./InstitutionsAdded";
import Confirmation from "./Confirmation";

const steps = [
  { id: 1, label: "Criteria/Instructions", icon: FaFileAlt },
  { id: 2, label: "Upgrade Form", icon: FaClipboardCheck },
  { id: 3, label: "Additional Information", icon: FaInfoCircle },
  { id: 4, label: "Confirmation", icon: FaCheckCircle },
  { id: 5, label: "Payment", icon: FaCreditCard },
];

export default function UpgradeProcess() {
  const [activeStep, setActiveStep] = useState(1);

  const renderContent = () => {
    switch (activeStep) {
      case 1:
        return <CriteriaInstructions />;
      case 2:
        return <UpgradeForm />;
      case 3:
        return <InstitutionsAdded />;
      case 4:
        return <Confirmation/>;
      case 5:
        return <div className="p-4 bg-white">Payment Step</div>;
      default:
        return <div className="p-4 bg-white">Invalid Step</div>;
    }
  };

  return (
    <div className="p-4 bg-white min-h-screen">
      {/* Top Proceed Button */}

      {/* Stepper */}
      <div className="flex flex-wrap md:flex-nowrap items-center bg-white p-4 rounded-md shadow-md mb-6">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <div
              key={step.id}
              className={`flex items-center space-x-2 cursor-pointer ${
                index < steps.length - 1 ? "flex-1" : ""
              }`}
              onClick={() => setActiveStep(step.id)}
            >
              <Icon
                className={`text-xl ${
                  activeStep === step.id
                    ? "text-blue-500"
                    : activeStep > step.id
                    ? "text-green-500"
                    : "text-gray-400"
                }`}
              />
              <span
                className={`${
                  activeStep === step.id
                    ? "text-blue-500"
                    : activeStep > step.id
                    ? "text-green-500"
                    : "text-gray-400"
                } text-sm font-medium`}
              >
                {step.label}
              </span>
              {index < steps.length - 1 && (
                <div
                  className={`hidden md:block h-0.5 flex-1 ${
                    activeStep > step.id ? "bg-green-500" : "bg-gray-300"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
      <div className="mb-6 border-b p-2 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-primary text-center">
          {activeStep === 1
            ? "Criteria and Instructions"
            : activeStep === 2
            ? "Upgrade Form"
            : activeStep === 3
            ? "Additional Information"
            : activeStep === 4
            ? "Confirmation"
            : activeStep === 5
            ? "Payment"
            : "Upgrade Process"}
        </h2>
        {activeStep === 1 ? (
          <div className="flex justify-end mb-3">
            <button
              className="flex font-medium bg-[#CADDFF69] text-primary px-6 py-2 hover:bg-blue-400 hover:text-white transition duration-300"
              onClick={() =>
                setActiveStep(Math.min(activeStep + 1, steps.length))
              }
            >
              Proceed
            </button>
          </div>
        ) : (
          <div className="flex justify-end mb-3">
            <button
              className="flex font-medium bg-[#CADDFF69] text-primary px-6 py-2 hover:bg-blue-400 hover:text-white transition duration-300"
              onClick={() => {
                // Save logic here
                setActiveStep(Math.min(activeStep + 1, steps.length));
              }}
            >
              Save
            </button>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="">{renderContent()}</div>

      {/* Bottom Navigation Buttons */}
      <div className="mt-6 flex justify-between">
        <button
          className={`${
            activeStep === 1 ? "hidden" : "block"
          } bg-gray-400 text-white px-6 py-2 rounded-md shadow hover:bg-gray-600 transition duration-300`}
          onClick={() => setActiveStep(Math.max(activeStep - 1, 1))}
        >
          Previous
        </button>
        <button
          className={`${
            activeStep === steps.length ? "hidden" : "block"
          } bg-primary text-white px-6 py-2  hover:bg-blue-800 transition duration-300`}
          onClick={() => setActiveStep(Math.min(activeStep + 1, steps.length))}
        >
          Next
        </button>
      </div>
    </div>
  );
}
