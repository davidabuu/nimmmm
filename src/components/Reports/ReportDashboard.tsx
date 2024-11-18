"use client";
import React from "react";
import SideNav from "../SideNav";
import Reports from "./Reports";


const ReportDashboard = () => {
  return (
    <div className="flex flex-col md:flex-row bg-[#F5F7FA]">
      <SideNav />

      <div className="flex flex-col w-full">
        
        <Reports/>
      </div>
    </div>
  );
};

export default ReportDashboard;
