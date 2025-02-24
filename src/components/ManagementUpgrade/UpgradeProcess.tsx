import React, { useState, useEffect } from "react";
import {
  FaFileAlt,
  FaClipboardCheck,
  FaInfoCircle,
  FaCheckCircle,
  FaCreditCard,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import CriteriaInstructions from "./CriteriaInstructions";
import UpgradeForm from "./UpgradeForm";
import InstitutionsAdded from "./InstitutionsAdded";
import Confirmation from "./Confirmation";
import { AppDispatch, RootState } from "@/src/lib/store";
import { getDecryptedMember } from "@/src/service/utils";
import { getGradeName } from "@/src/redux/nimUpgrade/getGrade"; 

const steps = [
  { id: 1, label: "Criteria/Instructions", icon: FaFileAlt },
  { id: 2, label: "Upgrade Form", icon: FaClipboardCheck },
  { id: 3, label: "Additional Information", icon: FaInfoCircle },
  { id: 4, label: "Confirmation", icon: FaCheckCircle },
  { id: 5, label: "Payment", icon: FaCreditCard },
];

export default function UpgradeProcess() {
  const dispatch = useDispatch<AppDispatch>();
  const [activeStep, setActiveStep] = useState(1);
  const [loading, setLoading] = useState(true);
  
  const { data, loading: gradeLoading } = useSelector(
    (state: RootState) => state.getGradeName
  );

  useEffect(() => {
    const member = getDecryptedMember();
    if (member) {
      dispatch(getGradeName(member));
    }
    setTimeout(() => setLoading(false), 1000);
  }, [dispatch]);

  const renderContent = () => {
    switch (activeStep) {
      case 1:
        return <CriteriaInstructions />;
      case 2:
        return <UpgradeForm />;
      case 3:
        return <InstitutionsAdded />;
      case 4:
        return <Confirmation />;
      case 5:
        return <div className="p-4 bg-white">Payment Step</div>;
      default:
        return <div className="p-4 bg-white">Invalid Step</div>;
    }
  };

  return (
    <div className="p-4 bg-white min-h-screen">
      {/* Top Previous Button */}
      {activeStep > 1 && (
        <button
          className="mb-4 bg-gray-400 text-white px-6 py-2 rounded-md shadow hover:bg-gray-600 transition duration-300"
          onClick={() => setActiveStep(activeStep - 1)}
        >
          Previous
        </button>
      )}

      {/* Stepper */}
      <div className="flex flex-wrap md:flex-nowrap items-center bg-white p-4 rounded-md shadow-md whitespace-nowrap mb-6 overflow-x-auto">
  <div className="flex w-full md:grid md:grid-cols-5 gap-2 md:gap-4">
    {steps.map((step, index) => {
      const Icon = step.icon;
      return (
        <div
          key={step.id}
          className={`flex flex-col md:flex-row items-center justify-center space-x-0 md:space-x-2 cursor-pointer p-2 md:p-4 rounded-lg transition duration-300 ${
            activeStep === step.id ? "bg-blue-100" : "bg-transparent"
          }`}
          onClick={() => setActiveStep(step.id)}
        >
          <Icon
            className={`text-2xl md:text-xl ${
              activeStep === step.id
                ? "text-blue-500"
                : activeStep > step.id
                ? "text-green-500"
                : "text-gray-400"
            }`}
          />
          <span
            className={`text-xs md:text-sm font-medium ${
              activeStep === step.id
                ? "text-blue-500"
                : activeStep > step.id
                ? "text-green-500"
                : "text-gray-400"
            }`}
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
</div>


      {/* Upgrade Information (ONLY on "Criteria/Instructions" tab) */}
      {activeStep === 1 && (
        <div className="flex flex-col items-center my-4">
          {gradeLoading || loading ? (
            <Skeleton width={200} height={30} />
          ) : (
            <h2 className="text-xl font-bold text-primary">
              Upgrade from: {data?.name} → {data?.nextGrade?.name}
            </h2>
          )}
        </div>
      )}

      {/* Content */}
      <div>{renderContent()}</div>

      {/* Bottom Navigation */}
      <div className="mt-6 flex justify-between">
        {activeStep > 1 && (
          <button
            className="bg-gray-400 text-white px-6 py-2 rounded-md shadow hover:bg-gray-600 transition duration-300"
            onClick={() => setActiveStep(activeStep - 1)}
          >
            Previous
          </button>
        )}
        {activeStep < steps.length && (
          <button
            className="bg-primary text-white px-6 py-2 hover:bg-blue-800 transition duration-300"
            onClick={() => setActiveStep(activeStep + 1)}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}
