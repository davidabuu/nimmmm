"use client";
import React from "react";
import SideNav from "../SideNav";
import AdminDashboardPage from "./AdminDashboardPage";

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
