import React, { useState, useEffect } from "react";
import {
  FaFileAlt,
  FaClipboardCheck,
  FaCheckCircle,
  FaCreditCard,
} from "react-icons/fa";
import { FaFile } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { AppDispatch, RootState } from "@/src/lib/store";
import { getDecryptedMember } from "@/src/service/utils";
import { getGradeName } from "@/src/redux/nimUpgrade/getGrade";
import {
  MembershipForm,
  submitMembershipForm,
} from "@/src/redux/nimUpgrade/membershipSlice";

import CriteriaInstructions from "./CriteriaInstructions";
import UpgradeForm from "./UpgradeForm";
import AdditionalInformation from "./AdditionalInformation";
import Confirmation from "./Confirmation";

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

  /** ===========================
   * FORM STATE
   ============================ */
  const [upgradeFormData, setUpgradeFormData] = useState<
    Partial<MembershipForm>
  >({
    institutions: [],
    work_experience: [],
  });

  const [additionalInfoData, setAdditionalInfoData] = useState({
    institutions: [{ name: "", qualification: "", year: "" }],
    workExp: [{ organization: "", address: "", position: "", year: "" }],
    prevWorkExp: [{ organization: "", address: "", position: "", year: "" }],
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  /** ===========================
   * REDUX STATE
   ============================ */
  const { data: gradeData, loading: gradeLoading } = useSelector(
    (state: RootState) => state.getGradeName
  );

  const {
    loading: submitLoading,
    error: submitError,
    success,
  } = useSelector((state: RootState) => state.setMembershipForm);

  /** ===========================
   * EFFECTS
   ============================ */
  useEffect(() => {
    const member = getDecryptedMember();
    if (member) {
      dispatch(getGradeName(member.grade));
    }
    setTimeout(() => setLoading(false), 1000);
  }, [dispatch]);

  // 👉 MOVE TO CONFIRMATION AFTER SUCCESSFUL SUBMIT
  useEffect(() => {
    if (success) {
      setActiveStep(4);
    }
  }, [success]);

  /** ===========================
   * VALIDATIONS
   ============================ */
  const validateUpgradeForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!upgradeFormData.membership_number)
      errors.membership_number = "Membership number is required";

    if (!upgradeFormData.current_grade)
      errors.current_grade = "Current grade is required";

    if (!upgradeFormData.expected_new_grade)
      errors.expected_new_grade = "Expected new grade is required";

    if (!upgradeFormData.surname)
      errors.surname = "Surname is required";

    if (!upgradeFormData.othernames)
      errors.othernames = "Other names are required";

    if (!upgradeFormData.email)
      errors.email = "Email is required";

    if (!upgradeFormData.profession)
      errors.profession = "Profession is required";

    if (!upgradeFormData.mobile_phone)
      errors.mobile_phone = "Mobile phone is required";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateAdditionalInfo = (): boolean => {
    const errors: Record<string, string> = {};

    if (!additionalInfoData.institutions[0]?.name)
      errors.institutions = "At least one institution is required";

    if (!additionalInfoData.workExp[0]?.organization)
      errors.workExp = "Current work experience is required";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  /** ===========================
   * NAVIGATION
   ============================ */
  const handleNext = () => {
    if (activeStep === 2 && !validateUpgradeForm()) return;
    if (activeStep === 3 && !validateAdditionalInfo()) return;

    setActiveStep((prev) => prev + 1);
  };

  const handleSaveAndSubmit = async () => {
    const completeFormData: MembershipForm = {
      ...upgradeFormData,
      institutions: additionalInfoData.institutions.map((inst) => ({
        name: inst.name,
        qualification: inst.qualification,
        year: parseInt(inst.year) || new Date().getFullYear(),
      })),
      work_experience: additionalInfoData.workExp.map((exp) => ({
        name: exp.organization,
        position: exp.position,
        address: exp.address,
        year: parseInt(exp.year) || new Date().getFullYear(),
      })),
    } as MembershipForm;

    await dispatch(submitMembershipForm(completeFormData));
  };

  const isNextDisabled = (): boolean => {
    if (activeStep === 2)
      return !upgradeFormData.membership_number || !upgradeFormData.email;

    if (activeStep === 3)
      return (
        !additionalInfoData.institutions[0]?.name ||
        !additionalInfoData.workExp[0]?.organization
      );

    return false;
  };

  /** ===========================
   * RENDER CONTENT
   ============================ */
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
      {/* STEPPER */}
      <div className="flex items-center bg-white p-4 rounded-md shadow mb-6 overflow-x-auto">
        <div className="grid grid-cols-5 gap-4 w-full">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.id}
                className={`flex flex-col items-center cursor-pointer p-3 rounded-lg ${
                  activeStep === step.id ? "bg-primary/10" : ""
                }`}
                onClick={() => activeStep > step.id && setActiveStep(step.id)}
              >
                <Icon
                  className={`text-xl ${
                    activeStep === step.id
                      ? "text-primary"
                      : activeStep > step.id
                      ? "text-green-500"
                      : "text-gray-400"
                  }`}
                />
                <span className="text-xs font-medium mt-1">
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* HEADER */}
      {activeStep === 1 && (
        <div className="text-center my-4">
          {gradeLoading || loading ? (
            <Skeleton width={250} height={30} />
          ) : (
            <h2 className="text-xl font-bold text-primary">
              Upgrade from: {gradeData?.name} → {gradeData?.nextGrade?.name}
            </h2>
          )}
        </div>
      )}

      {/* MAIN CONTENT */}
      {renderContent()}

      {/* ERROR */}
      {submitError && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded">
          {submitError}
        </div>
      )}

      {/* NAVIGATION */}
      <div className="mt-8 flex justify-between">
        {activeStep > 1 && activeStep < 4 && (
          <button
            className="bg-gray-400 text-white px-6 py-2 rounded"
            onClick={() => setActiveStep((prev) => prev - 1)}
          >
            Previous
          </button>
        )}

        <div className="ml-auto flex gap-4">
          {activeStep === 3 && (
            <button
              onClick={handleSaveAndSubmit}
              disabled={submitLoading || success}
              className={`px-6 py-2 rounded text-white ${
                submitLoading
                  ? "bg-gray-400"
                  : "bg-primary hover:opacity-90"
              }`}
            >
              {submitLoading ? "Submitting..." : "Save & Submit"}
            </button>
          )}

          {activeStep < 4 && activeStep !== 3 && (
            <button
              onClick={handleNext}
              disabled={isNextDisabled()}
              className={`px-6 py-2 rounded text-white ${
                isNextDisabled()
                  ? "bg-gray-400"
                  : "bg-primary hover:opacity-90"
              }`}
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
