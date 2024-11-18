"use client";
import React from "react";
import SideNav from "../SideNav";

import HistoryTab from "./HistoryTab";

const AdminHistory = () => {
  return (
    <div className="flex flex-col md:flex-row bg-[#F5F7FA]">
      <SideNav />

      <div className="flex flex-col w-full">
        <HistoryTab />
      </div>
    </div>
  );
};

export default AdminHistory;
