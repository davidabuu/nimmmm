"use client";
import React from "react";
import SideNav from "../SideNav";
import News from "./News";

const NewsDashboard = () => {
  return (
    <div className="flex flex-col md:flex-row bg-[#F5F7FA]">
      <SideNav />

      <div className="flex flex-col w-full">
        <News />
      </div>
    </div>
  );
};

export default NewsDashboard;
