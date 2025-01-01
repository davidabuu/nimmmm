"use client";
import React from "react";
import SideNav from "../SideNav";
import ManagementUpgradePage from "./ManagementUpgradePage";

const ManagementUpgradeDashboard = () => {
  return (
    <div className="flex flex-col md:flex-row bg-[#F5F7FA]">
      <SideNav />

      <div className="flex flex-col w-full">
        <ManagementUpgradePage />
      </div>
    </div>
  );
};

export default ManagementUpgradeDashboard;
