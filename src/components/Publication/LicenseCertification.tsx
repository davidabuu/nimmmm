import React, { useState } from "react";
import { Modal, Button } from "antd";
import Image from "next/image";

const LicenseCertificate: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Show Modal
  const showModal = () => {
    setIsModalVisible(true);
  };

  // Hide Modal
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] bg-white px-4">
      {/* Header Text */}
      <p className="text-center text-gray-700 font-medium mb-8 max-w-lg">
        This License Certificate Is Valid For A Period Of{" "}
        <span className="font-semibold">3 Years</span> From Date Obtained After
        Which Members Will Pay For A Renewal.
      </p>

      {/* Certificate Placeholder */}
      <div className="relative aspect-square border-2 border-blue-900 rounded-lg flex items-center justify-center bg-white shadow-md mb-8">
        {/* Logo Placeholder */}
        <Image
          src="/nnpc.png"
          alt="Certificate Logo"
          className="w-20 h-20 object-contain"
          width={200}
          height={200}
        />
      </div>

      {/* Download Button */}
      <button
        className="bg-primary text-white py-3 px-8 text-lg font-medium hover:bg-blue-700 transition duration-300 shadow-md"
        onClick={showModal}
      >
        Download Certificate
      </button>

      {/* Modal for Download Options */}
      <Modal
        title="Download Certificate"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null} // Custom buttons for footer
        centered
      >
        <p className="text-gray-600 mb-6">
          Please select a format to download your certificate.
        </p>
        <div className="flex justify-between">
          <Button
            type="primary"
            className="bg-blue-900 hover:bg-blue-700"
            onClick={() => {
              console.log("Download as PDF");
              setIsModalVisible(false);
            }}
          >
            Download as PDF
          </Button>
          <Button
            type="default"
            className="border-blue-900 text-blue-900 hover:bg-gray-100"
            onClick={() => {
              console.log("Download as Image");
              setIsModalVisible(false);
            }}
          >
            Download as Image
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default LicenseCertificate;
