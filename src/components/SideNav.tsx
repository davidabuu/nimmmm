"use client";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { HomeOutlined, CloseOutlined, LogoutOutlined } from "@ant-design/icons";
import { Modal, Button } from "antd"; // Import Modal from Ant Design
import { FaBars, FaBell, FaRegAddressCard } from "react-icons/fa"; // Hamburger icon
import Image from "next/image";

import { RxCountdownTimer } from "react-icons/rx";
import { FaFileAlt, FaRegUserCircle } from "react-icons/fa";
import { SlBadge } from "react-icons/sl";
import { FiBarChart, FiSpeaker } from "react-icons/fi";

const SideNav: React.FC = () => {
  const [showSideNav, setShowSideNav] = useState(false); // Control SideNav visibility
  const [isModalVisible, setIsModalVisible] = useState(false); // Control modal visibility
  const router = usePathname();

  const toggleSideNav = () => {
    setShowSideNav((prev) => !prev); // Toggle the side nav
  };

  const isActive = (path: string) => router === path;

  const showModal = () => {
    setIsModalVisible(true); // Show the modal when Logout is clicked
  };

  const handleOk = () => {
    // Add your logout logic here
    setIsModalVisible(false); // Close the modal after logout
  };

  const handleCancel = () => {
    setIsModalVisible(false); // Close the modal if cancelled
  };

  return (
    <>
      {/* Hamburger Menu for smaller screens */}
      <div className="md:hidden flex items-center justify-between w-full p-4">
        <FaBars
          className="text-3xl cursor-pointer justify-start"
          onClick={toggleSideNav}
        />
        <h1 className="text-lg text-primary">NIM</h1>
        <div className="float-end cursor-pointer bg-blue-900 text-white p-2 rounded-full shadow-lg hover:bg-blue-70 transition duration-300">
          <FaBell size={20} />
        </div>
      </div>

      {/* SideNav */}
      <div
        className={`min-h-[100vh] sideNav flex flex-col pt-6 bg-white ${
          showSideNav ? "translate-x-0 showNav" : "-translate-x-fulll"
        } navFix top-0 left-0 transition-transform duration-300 ease-in-out`}
        style={{
          width: "100%",
          maxWidth: "250px",
        }}
      >
        {/* Close Button for Mobile */}
        <div className="flex md:hidden justify-end px-4">
          <CloseOutlined
            style={{ fontSize: "24px", cursor: "pointer", color: "black" }}
            onClick={toggleSideNav}
          />
        </div>

        {/* Logo */}
        <div className="flex justify-center items-center px-4">
          <Image
            src="/nnpc.png"
            alt="Logo"
            width={100}
            height={100}
          />
        </div>

        {/* Side Navigation Links */}
        <div className="flex-1 text-secondary mt-10">
          <ul className="flex flex-col ml-8">
            {/* Dashboard */}
            <li
              className={`flex items-center p-3 my-2 cursor-pointer ${
                isActive("/admin-dashboard")
                  ? "text-white bg-primary border-r-4 border-primary"
                  : ""
              }`}
            >
              <HomeOutlined className="w-6 h-6" />
              <Link href="/admin-dashboard">
                <p className="ml-4">Dashboard</p>
              </Link>
            </li>
            {/* History */}
            <li
              className={`flex p-3 my-2 cursor-pointer items-center ${
                isActive("/history")
                  ? "text-white bg-primary border-r-4 border-primary"
                  : ""
              }`}
            >
              <RxCountdownTimer className="w-6 h-6" />
              <Link href="/history">
                <p className="ml-4">History</p>
              </Link>
            </li>
            <li
              className={`flex p-3 my-2 cursor-pointer items-center ${
                isActive("/reports")
                  ? "text-white bg-primary border-r-4 border-primary"
                  : ""
              }`}
            >
              <FiBarChart className="w-6 h-6" />
              <Link href="/reports">
                <p className="ml-4">Reports</p>
              </Link>
            </li>
            <li
              className={`flex p-3 my-2 cursor-pointer items-center ${
                isActive("/news")
                  ? "text-white bg-primary border-r-4 border-primary"
                  : ""
              }`}
            >
              <FiSpeaker className="w-6 h-6" />
              <Link href="/news">
                <p className="ml-4">News</p>
              </Link>
            </li>
            {/* Publication */}
            <li
              className={`flex p-3 my-2 cursor-pointer items-center ${
                isActive("/admin-publication")
                  ? "text-white bg-primary border-r-4 border-primary"
                  : ""
              }`}
            >
              <FaFileAlt className="w-6 h-6" />
              <Link href="/admin-publication">
                <p className="ml-4">Publication</p>
              </Link>
            </li>
            {/* Apply for License */}
            <li
              className={`flex p-3 my-2 cursor-pointer items-center ${
                isActive("/management-license")
                  ? "text-white bg-primary border-r-4 border-primary"
                  : ""
              }`}
            >
              <SlBadge className="w-6 h-6" />
              <Link href="/management-license">
                <p className="ml-4">Mangement License</p>
              </Link>
            </li>
            <li
              className={`flex p-3 my-2 cursor-pointer items-center ${
                isActive("/nim-verification")
                  ? "text-white bg-primary border-r-4 border-primary"
                  : ""
              }`}
            >
              <FaRegAddressCard className="w-6 h-6" />
              <Link href="/nim-verification">
                <p className="ml-4">NIM Verification</p>
              </Link>
            </li>
            {/* Profile */}
            <li
              className={`flex p-3 my-2 cursor-pointer items-center ${
                isActive("/admin-profile")
                  ? "text-white bg-primary border-r-4 border-primary"
                  : ""
              }`}
            >
              <FaRegUserCircle className="w-6 h-6" />
              <Link href="/admin-profile">
                <p className="ml-4">Profile</p>
              </Link>
            </li>
            {/* Logout */}
            <li
              className="flex p-3 my-2 cursor-pointer items-center text-white bg-black"
              onClick={showModal} // Trigger the modal on click
            >
              <LogoutOutlined className="w-6 h-6" />
              <p className="ml-4">Logout</p>
            </li>
          </ul>
        </div>

        {/* Logout Modal */}
        <Modal
          title={<span className="text-lg font-bold">Logout</span>}
          open={isModalVisible}
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
    </>
  );
};

export default SideNav;