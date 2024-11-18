"use client";
import React from "react";
import SideNav from "../SideNav";
import NimVerificationPage from "./NimVerificationPage";


const NimVerification = () => {
  return (
    <div className="flex flex-col md:flex-row bg-[#F5F7FA]">
      <SideNav />

      <div className="flex flex-col w-full">
        
        <NimVerificationPage />
      </div>
    </div>
  );
};

export default NimVerification;
