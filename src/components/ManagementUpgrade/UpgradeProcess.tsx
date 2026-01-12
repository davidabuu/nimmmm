import React, { useState, useEffect } from "react";
import {
  FaFileAlt,
  FaClipboardCheck,
  FaCheckCircle,
  FaCreditCard,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { FaFile } from "react-icons/fa6";
import { AppDispatch, RootState } from "@/src/lib/store";
import { getDecryptedMember } from "@/src/service/utils";
import { getGradeName } from "@/src/redux/nimUpgrade/getGrade";

import CriteriaInstructions from "./CriteriaInstructions";
import UpgradeForm from "./UpgradeForm";
import AdditionalInformation from "./AdditionalInformation";
import Confirmation from "./Confirmation";
import { MembershipForm, submitMembershipForm } from "@/src/redux/nimUpgrade/membershipSlice";

const steps = [
  { id: 1, label: "Criteria/Instructions", icon: FaFileAlt },
  { id: 2, label: "Upgrade Form", icon: FaClipboardCheck },
  { id: 3, label: "Additional Information", icon: FaFile },
  { id: 4, label: "Confirmation", icon: FaCheckCircle },
  { id: 5, label: "Payment", icon: FaCreditCard },
];

export default function UpgradeProcess() {
  const dispatch = useDispatch<AppDispatch>();
  const [activeStep, setActiveStep] = useState(1);
  const [loading, setLoading] = useState(true);

  // Form state management
  const [upgradeFormData, setUpgradeFormData] = useState<Partial<MembershipForm>>({
    institutions: [],
    work_experience: [],
  });

  const [additionalInfoData, setAdditionalInfoData] = useState({
    institutions: [{ name: "", qualification: "", year: "" }],
    workExp: [{ organization: "", address: "", position: "", year: "" }],
    prevWorkExp: [{ organization: "", address: "", position: "", year: "" }],
  });

  // Form validation state
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const { data: gradeData, loading: gradeLoading } = useSelector(
    (state: RootState) => state.getGradeName
  );

  const { loading: submitLoading, error: submitError, success } = useSelector(
    (state: RootState) => state.setMembershipForm
  );

  useEffect(() => {
    const member = getDecryptedMember();
    if (member) {
      dispatch(getGradeName(member.grade));
    }
    setTimeout(() => setLoading(false), 1000);
  }, [dispatch]);

  // Validate upgrade form
  const validateUpgradeForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!upgradeFormData.membership_number) {
      errors.membership_number = "Membership number is required";
    }
    if (!upgradeFormData.current_grade) {
      errors.current_grade = "Current grade is required";
    }
    if (!upgradeFormData.expected_new_grade) {
      errors.expected_new_grade = "Expected new grade is required";
    }
    if (!upgradeFormData.surname) {
      errors.surname = "Surname is required";
    }
    if (!upgradeFormData.othernames) {
      errors.othernames = "Other names are required";
    }
    if (!upgradeFormData.email) {
      errors.email = "Email is required";
    }
    if (!upgradeFormData.mobile_phone) {
      errors.mobile_phone = "Mobile phone is required";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Validate additional info
  const validateAdditionalInfo = (): boolean => {
    const errors: Record<string, string> = {};

    if (!additionalInfoData.institutions[0]?.name) {
      errors.institutions = "At least one institution is required";
    }
    if (!additionalInfoData.workExp[0]?.organization) {
      errors.workExp = "Current work experience is required";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle next button
  const handleNext = async () => {
    if (activeStep === 2) {
      if (!validateUpgradeForm()) {
        return;
      }
    }
    if (activeStep === 3) {
      if (!validateAdditionalInfo()) {
        return;
      }
    }

    setActiveStep(activeStep + 1);
  };

  // Handle save and submit
  const handleSaveAndSubmit = async () => {
    // Combine all form data
    const completeFormData: MembershipForm = {
      ...upgradeFormData,
      institutions: additionalInfoData.institutions.map(inst => ({
        name: inst.name,
        qualification: inst.qualification,
        year: parseInt(inst.year) || new Date().getFullYear(),
      })),
      work_experience: additionalInfoData.workExp.map(exp => ({
        name: exp.organization,
        position: exp.position,
        address: exp.address,
        year: parseInt(exp.year) || new Date().getFullYear(),
      })),
    } as MembershipForm;

    // Dispatch submit action
    await dispatch(submitMembershipForm(completeFormData));
  };

  // Check if next button should be disabled
  const isNextDisabled = (): boolean => {
    if (activeStep === 2) {
      return !upgradeFormData.membership_number || !upgradeFormData.email;
    }
    if (activeStep === 3) {
      return !additionalInfoData.institutions[0]?.name || !additionalInfoData.workExp[0]?.organization;
    }
    return false;
  };

  const renderContent = () => {
    switch (activeStep) {
      case 1:
        return <CriteriaInstructions />;
      case 2:
        return (
          <UpgradeForm
            formData={upgradeFormData}
            setFormData={setUpgradeFormData}
            errors={formErrors}
          />
        );
      case 3:
        return (
          <AdditionalInformation
            data={additionalInfoData}
            setData={setAdditionalInfoData}
            onSave={handleSaveAndSubmit}
            isLoading={submitLoading}
            errors={formErrors}
          />
        );
      case 4:
        return <Confirmation />;
      default:
        return <div className="p-4 bg-white">Invalid Step</div>;
    }
  };

  return (
    <div className="p-4 bg-white min-h-screen">
      {/* Stepper */}
      <div className="flex flex-wrap md:flex-nowrap items-center bg-white p-4 rounded-md shadow-md whitespace-nowrap mb-6 overflow-x-auto">
        <div className="flex w-full md:grid md:grid-cols-5 gap-2 md:gap-4">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.id}
                className={`flex flex-col md:flex-row items-center justify-center space-x-0 md:space-x-2 cursor-pointer p-2 md:p-4 rounded-lg transition duration-300 ${
                  activeStep === step.id ? "bg-primary/10" : ""
                }`}
                onClick={() => {
                  if (activeStep > step.id) {
                    setActiveStep(step.id);
                  }
                }}
              >
                <Icon
                  className={`text-2xl md:text-xl ${
                    activeStep === step.id
                      ? "text-primary"
                      : activeStep > step.id
                      ? "text-green-500"
                      : "text-gray-400"
                  }`}
                />
                <span
                  className={`text-xs md:text-sm font-medium ${
                    activeStep === step.id
                      ? "text-primary"
                      : activeStep > step.id
                      ? "text-green-500"
                      : "text-gray-400"
                  }`}
                >
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Upgrade Information */}
      {activeStep === 1 && (
        <div className="flex flex-col items-center my-4">
          {gradeLoading || loading ? (
            <Skeleton width={200} height={30} />
          ) : (
            <h2 className="text-xl font-bold text-primary">
              Upgrade from: {gradeData?.name} → {gradeData?.nextGrade?.name}
            </h2>
          )}
        </div>
      )}

      {/* Content */}
      <div>{renderContent()}</div>

      {/* Error Message */}
      {submitError && (
        <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {submitError}
        </div>
      )}

      {/* Success Message */}
      {success && (
        <div className="mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
          Form submitted successfully!
        </div>
      )}

      {/* Bottom Navigation */}
      <div className="mt-8 flex justify-between">
        {activeStep > 1 && (
          <button
            className="bg-gray-400 text-white px-6 py-2 rounded-md shadow hover:bg-gray-600 transition duration-300 disabled:opacity-50"
            onClick={() => setActiveStep(activeStep - 1)}
          >
            Previous
          </button>
        )}

        <div className="flex gap-4 ml-auto">
          {activeStep === 3 && (
            <button
              className={`text-white px-6 py-2 rounded-md shadow transition duration-300 flex items-center gap-2 ${
                submitLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-primary hover:opacity-90"
              }`}
              onClick={handleSaveAndSubmit}
              disabled={submitLoading}
            >
              {submitLoading && (
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
              )}
              {submitLoading ? "Submitting..." : "Save & Submit"}
            </button>
          )}

          {activeStep < 4 && activeStep !== 3 && (
            <button
              className={`text-white px-6 py-2 rounded-md shadow transition duration-300 ${
                isNextDisabled()
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-primary hover:opacity-90"
              }`}
              onClick={handleNext}
              disabled={isNextDisabled()}
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
}