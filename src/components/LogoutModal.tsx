import React, { useState } from "react";
import { Modal, Button } from "antd";
import { LogoutOutlined } from "@ant-design/icons";

const LogoutModal: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    // Logic for logging out goes here
    setIsModalVisible(false);
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
        visible={isModalVisible}
        onOk={handleOk}
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
            className="bg-primary"
            onClick={handleOk}
          >
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
