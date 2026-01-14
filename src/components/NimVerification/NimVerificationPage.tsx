import React, { useState } from "react";

import { Modal, Button } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";

const NimVerificationPage: React.FC = () => {
  const [showForm, setShowForm] = useState(false); // State to toggle UI
  const [isModalVisible, setIsModalVisible] = useState(false); // State to handle modal visibility

  const handleContinue = () => {
    setShowForm(true); // Switch to the next UI
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsModalVisible(true); // Show success modal
  };

  const handleCloseModal = () => {
    setIsModalVisible(false); // Close modal
  };

  return (
    <div className="mx-10">
    
      <h2 className="text-xl mt-6 px-4 py-2 border-b font-semibold mb-4">
        NIM Verification
      </h2>

      {showForm ? (
        // Second UI: Enter Generated NIM
        <div className="flex flex-col items-center justify-center min-h-[70vh] bg-white px-4">
          <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-6 text-center">
            Enter Your Generated NIM
          </h2>
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-md space-y-4"
          >
            <input
              type="text"
              placeholder="Enter your NIM"
              className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="submit"
              className="mt-4 bg-primary text-white py-3 px-8 text-base font-medium  hover:bg-blue-700 transition duration-300"
            >
              Submit
            </button>
          </form>
        </div>
      ) : (
        // First UI: Instructions on How to Generate VNIM
        <div className="flex flex-col items-center justify-center min-h-[70vh] bg-white px-4">
          <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-6 text-center">
            How to Generate VNIM using USSD Code
          </h2>
          <ul className="text-gray-700 text-sm md:text-base list-disc space-y-4 pl-5 max-w-xl">
            <li>
              Dial <span className="font-bold">*</span>346
              <span className="font-bold">*</span>3
              <span className="font-bold">*</span>Your NIM
              <span className="font-bold">*</span>AgentCode
              <span className="font-bold">#</span>. (Use Youverify’s agent code{" "}
              <span className="font-bold">471335</span>). <br />
              i.e. dial{" "}
              <span className="font-bold">*346*3*Your NIM*471335#</span>
            </li>
            <li>
              You will receive an SMS contaiNIMg the virtual NIM generated for
              you to the line registered with your NIM.
            </li>
          </ul>
          <button
            onClick={handleContinue}
            className="mt-8 bg-primary text-white py-3 px-8 text-base font-medium  hover:bg-blue-700 transition duration-300"
          >
            Continue
          </button>
        </div>
      )}

      {/* Ant Design Modal */}
      <Modal
        title={null}
        open={isModalVisible}
        footer={null}
        onCancel={handleCloseModal}
        centered
      >
        <div className="text-center">
          <CheckCircleOutlined
            className="text-green-500 mb-4"
            style={{ fontSize: "3rem" }}
          />
          <h2 className="text-lg font-semibold mb-2">Submission Successful</h2>
          <p className="text-gray-600">
            Your NIM has been successfully submitted for verification.
          </p>
          <Button
            type="primary"
            className="mt-4 bg-blue-900 hover:bg-blue-700"
            onClick={handleCloseModal}
          >
            View Details
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default NimVerificationPage;
