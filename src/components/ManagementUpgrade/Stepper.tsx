import React from "react";
import {
  FaFileAlt,
  FaClipboardCheck,
  FaCheckCircle,
  FaCreditCard,
} from "react-icons/fa";

// Define the steps with their respective types
const steps: { id: number; label: string; icon: React.ElementType }[] = [
  { id: 1, label: "Criteria/Instructions", icon: FaFileAlt },
  { id: 2, label: "Eligibility Check", icon: FaClipboardCheck },
 
  { id: 4, label: "Confirmation", icon: FaCheckCircle },
  { id: 5, label: "Payment", icon: FaCreditCard },
];

type StepperProps = {
  activeStep: number;
  setActiveStep: (step: number) => void;
};

export default function Stepper({ activeStep, setActiveStep }: StepperProps) {
  return (
    <div className="flex flex-wrap md:flex-nowrap justify-between items-center bg-white p-4 space-y-4 md:space-y-0 md:space-x-4">
      {steps.map((step, index) => {
        const Icon = step.icon; // Extract the icon component
        return (
          <div
            key={step.id}
            className="flex items-center space-x-2 cursor-pointer w-full md:w-auto"
            onClick={() => setActiveStep(step.id)} // Set active step on click
          >
            {/* Render the icon */}
            <Icon
              className={`text-xl ${
                activeStep === step.id
                  ? "text-blue-500"
                  : activeStep > step.id
                  ? "text-green-500"
                  : "text-gray-400"
              }`}
            />
            {/* Render the label */}
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
            {/* Render the connector line */}
            {index < steps.length - 1 && (
              <div
                className={`hidden md:block flex-1 h-0.5 ${
                  activeStep > step.id ? "bg-green-500" : "bg-gray-300"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
