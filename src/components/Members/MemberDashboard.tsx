"use client";
import React  from "react";


import SideNav from "../SideNav";
import MemberDashboardPage from "./MemberDashboardPage";

const MemberDashboard = () => {
 
  return (
    <div className="flex flex-col md:flex-row bg-[#F5F7FA]">
        <SideNav />
       <div className="flex flex-col w-full ">
        <MemberDashboardPage />
        </div>
    </div>
  );
};

export default MemberDashboard;
