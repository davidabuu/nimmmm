import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaBell, FaSpinner } from "react-icons/fa";
import OutstandingPayments from "./OutstandingPayment";
import PaymentDetails from "./PaymentDetails";
import LicenseCertificate from "./LicenseCertification";

const LicensePage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [licenseValid, setLicenseValid] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showRenewal, setShowRenewal] = useState<boolean>(false); // State to toggle UI
  const [userDetails, setUserDetails] = useState<{ firstName: string; lastName: string } | null>(null); // State to store user details

  useEffect(() => {
    const fetchLicense = async () => {
      try {
        setLoading(true);

        // Get ID and accessToken from localStorage
        const id = localStorage.getItem("userId");
        const accessToken = localStorage.getItem("accessToken");

        if (!id) {
          throw new Error("User ID not found in localStorage.");
        }
        if (!accessToken) {
          throw new Error("Access token not found in localStorage.");
        }

        // Set Authorization header with the accessToken
        const response = await axios.get(
          `https://nigerian-institute-of-management-be.onrender.com/license/user/${id}`,
          {
            headers: {
              Authorization: `${accessToken}`,
            },
          }
        );

        if (response.status === 200) {
          const { firstName, lastName } = response.data?.login?.member || {};
          if (firstName && lastName) {
            setUserDetails({ firstName, lastName });
          }
          setLicenseValid(true); // License is valid
        }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        if (err.response && err.response.status === 404) {
          setLicenseValid(false); // License not found
        } else {
          setError(err.message || "An error occurred.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchLicense();
  }, []);

  return (
    <div className="md:mx-10">
      <div className="float-right hidden md:flex mr-3 mt-4 bg-blue-900 text-white p-2 rounded-full shadow-lg hover:bg-blue-700 transition duration-300">
        <FaBell size={20} />
      </div>
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
            onButtonClick={() => setShowRenewal(true)} // Set showRenewal to true
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
