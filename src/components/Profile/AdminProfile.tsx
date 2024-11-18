"use client";
import React from "react";
import SideNav from "../SideNav";
import AdminProfilePage from "./AdminProfilePage";


const AdminProfile = () => {
  return (
    <div className="flex flex-col md:flex-row bg-[#F5F7FA]">
      <SideNav />

      <div className="flex w-full ">
        <AdminProfilePage />
      </div>
    </div>
  );
};

export default AdminProfile;
