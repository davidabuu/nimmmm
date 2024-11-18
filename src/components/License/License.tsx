"use client";
import React from "react";
import SideNav from "../SideNav";
import LicensePage from "./LicensePage";

const License = () => {
  return (
    <div className="flex flex-col md:flex-row bg-[#F5F7FA]">
      <SideNav />

      <div className="flex flex-col w-full">
        <LicensePage />
      </div>
    </div>
  );
};

export default License;
