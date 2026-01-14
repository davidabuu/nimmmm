import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaSpinner } from "react-icons/fa";

import OutstandingPayments from "./OutstandingPayment";
import PaymentDetails from "./PaymentDetails";
import LicenseCertificate from "./LicenseCertification";

interface UserDetails {
  firstName: string;
  lastName: string;
}

const LicensePage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [licenseValid, setLicenseValid] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showRenewal, setShowRenewal] = useState(false);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);

  useEffect(() => {
    const fetchLicense = async () => {
      try {
        setLoading(true);

        const id = localStorage.getItem("userId");
        const accessToken = localStorage.getItem("accessToken");

        if (!id) throw new Error("User ID not found.");
        if (!accessToken) throw new Error("Access token not found.");

        const response = await axios.get(
          `https://api.nimportal.ng/license/user/${id}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (response.status === 200) {
          const member = response.data?.login_id?.member;

          if (member?.first_name && member?.last_name) {
            setUserDetails({
              firstName: member.first_name,
              lastName: member.last_name,
            });
          }

          setLicenseValid(true);
        }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        if (err.response?.status === 404) {
          setLicenseValid(false);
        } else {
          setError(err.message || "An error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchLicense();
  }, []);

  return (
    <div className="md:mx-10">
      <h2 className="text-xl mt-6 px-4 py-2 border-b font-semibold mb-4">
        Management License
      </h2>

      {loading ? (
        <div className="flex justify-center items-center mt-6">
          <FaSpinner className="animate-spin text-blue-900" size={30} />
          <span className="ml-2">Loading...</span>
        </div>
      ) : error ? (
        <div className="text-red-500 text-center mt-6">{error}</div>
      ) : licenseValid === false ? (
        showRenewal ? (
          <PaymentDetails />
        ) : (
          <OutstandingPayments
            message="Kindly Pay Up All Outstandings To Get Your Management License"
            buttonText="Outstanding Payments"
            onButtonClick={() => setShowRenewal(true)}
          />
        )
      ) : (
        userDetails && (
          <LicenseCertificate
            firstName={userDetails.firstName}
            lastName={userDetails.lastName}
          />
        )
      )}
    </div>
  );
};

export default LicensePage;
