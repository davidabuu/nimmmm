import React from "react";
import OutstandingPayments from "./OutstandingPayment";
import { FaBell } from "react-icons/fa";

const LicensePage = () => {
  return (
    <div className=" md:mx-10">
      <div className="float-right hidden md:flex mr-3 mt-4 bg-blue-900 text-white p-2 rounded-full shadow-lg hover:bg-blue-700 transition duration-300">
        <FaBell size={20} />
      </div>
      <h2 className="text-xl mt-6 px-4 py-2 border-b font-semibold mb-4">
        Management License
      </h2>
      <OutstandingPayments
        message="Kindly Pay Up All Outstandings To Get Your Management License"
        buttonText="Outstanding Payments"
      />

      {/* <Renewal /> */}
      {/* <PaymentDetails/> */}
      {/* <LicenseCertificate/> */}
    </div>
  );
};

export default LicensePage;
