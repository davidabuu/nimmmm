"use client";
import React from "react";
import SideNav from "../SideNav";
import NimEventsPage from "./NimEventsPage";

const SingleEventDashboard= () => {
  return (
    <div className="flex flex-col md:flex-row bg-[#F5F7FA]">
      <SideNav />

      <div className="flex flex-col w-full">
        <NimEventsPage />
      </div>
    </div>
  );
};

export default SingleEventDashboard;
