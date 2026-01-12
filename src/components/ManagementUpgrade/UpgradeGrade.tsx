import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/src/lib/store";
import { upgradeUserGrade } from "@/src/redux/nimUpgrade/upgradeSlice";
import { FaSpinner, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { getDecryptedMember } from "@/src/service/utils"; // Ensure correct path

const EligibilityCheck = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, data:eligibility } = useSelector((state: RootState) => state.upgradeUserGrade);
  const [memberId, setMemberId] = useState<string | null>(null);

  useEffect(() => {
    const member = getDecryptedMember();
    if (member) {
      setMemberId(member.id); // Store member ID
    }
  }, []);

  const handleCheckEligibility = () => {
    if (!memberId) return; // Ensure member ID exists before making request
    dispatch(upgradeUserGrade(memberId )); // Pass memberId as payload
  };

  return (
    <div>
      {/* Button to check eligibility */}
      <button
        className="bg-primary text-white px-4 py-2 flex items-center"
        onClick={handleCheckEligibility}
        disabled={loading || !memberId}
      >
        {loading ? <FaSpinner className="animate-spin mr-2" /> : "Check Eligibility"}
      </button>

      {/* Show eligibility results after API call */}
      {eligibility && (
        <div className="mt-4">
          <h3 className="font-semibold">Eligibility Criteria</h3>
          <ul className="mt-2 space-y-2">
            <li className="flex items-center">
              {eligibility.yearCriteria ? (
                <FaCheckCircle className="text-green-500 mr-2" />
              ) : (
                <FaTimesCircle className="text-red-500 mr-2" />
              )}
              Must have spent 3 years as a Graduate
            </li>

            <li className="flex items-center">
              {eligibility.outstnd.length === 0 ? (
                <FaCheckCircle className="text-green-500 mr-2" />
              ) : (
                <FaTimesCircle className="text-red-500 mr-2" />
              )}
              Be financially up to date (no outstanding subscriptions)
            </li>

            <li className="flex items-center">
              {eligibility.cumulativeCp ? (
                <FaCheckCircle className="text-green-500 mr-2" />
              ) : (
                <FaTimesCircle className="text-red-500 mr-2" />
              )}
              Must have 15 credit points
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default EligibilityCheck;
