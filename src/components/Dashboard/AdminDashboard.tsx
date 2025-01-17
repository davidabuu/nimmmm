"use client";
import React  from "react";

import AdminDashboardPage from "./AdminDashboardPage";
import SideNav from "../SideNav";

const AdminDashboard = () => {
 
  return (
    <div className="flex flex-col md:flex-row bg-[#F5F7FA]">
        <SideNav />
       <div className="flex flex-col w-full">
        <AdminDashboardPage />
        </div>
    </div>
  );
};

export default AdminDashboard;
