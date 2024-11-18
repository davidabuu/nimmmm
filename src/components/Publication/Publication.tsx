"use client";
import React from "react";
import SideNav from "../SideNav";
import PublicationPage from "./PublicationPage";

const Publication = () => {
  return (
    <div className="flex flex-col md:flex-row bg-[#F5F7FA]">
      <SideNav />

      <div className="flex flex-col w-full">
        <PublicationPage />
      </div>
    </div>
  );
};

export default Publication;
