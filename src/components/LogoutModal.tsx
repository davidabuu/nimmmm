/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Modal, Button, message } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { FaSpinner } from "react-icons/fa";

const LogoutModal: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    setLoading(true);
    try {
      // Delete the accessToken from localStorage
      localStorage.removeItem("accessToken");

      // Show a success message
      message.success("You have been logged out successfully!");

      // Redirect to the home page
      router.push("/");
    } catch (error) {
      // Handle any potential errors
      message.error("An error occurred while logging out.");
    } finally {
      setLoading(false);
      setIsModalVisible(false);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div>
      <Button
        type="primary"
        onClick={showModal}
        icon={<LogoutOutlined />}
        className="bg-black text-white"
      >
        Logout
      </Button>

      <Modal
        title={<span className="text-lg font-bold">Logout</span>}
        open={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button
            key="back"
            onClick={handleCancel}
          >
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            className="bg-primary flex items-center"
            onClick={handleOk}
            disabled={loading}
          >
            {loading && <FaSpinner className="animate-spin mr-2" />}
            Logout
          </Button>,
        ]}
      >
        <p className="text-gray-600">
          Are you sure you want to log out of your account?
        </p>
      </Modal>
    </div>
  );
};

export default LogoutModal;
