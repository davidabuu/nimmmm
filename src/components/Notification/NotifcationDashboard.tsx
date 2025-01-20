"use client";
import React  from "react";

import Inbox from "./Inbox";
import SideNav from "../SideNav";

const NotificationDashboard = () => {
 
  return (
    <div className="flex flex-col md:flex-row bg-[#F5F7FA]">
        <SideNav />
       <div className="flex flex-col w-full">
        <Inbox />
        </div>
    </div>
  );
};

export default NotificationDashboard;
