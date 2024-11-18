import React from "react";
import OutstandingPayments from "./OutstandingPayment";
import { FaBell } from "react-icons/fa";
import PublicationUI from "./PublicationUI";

const PublicationPage = () => {
  return (
    <div className=" md:mx-10">
      <div className="float-right hidden md:flex mr-3 mt-4 bg-blue-900 text-white p-2 rounded-full shadow-lg hover:bg-blue-700 transition duration-300">
        <FaBell size={20} />
      </div>
   
      <OutstandingPayments
        message="Kindly Pay Up all Outstandings to you access publications and materials"
        buttonText="Outstanding Payments"
      />
      <PublicationUI />
    </div>
  );
};

export default PublicationPage;
