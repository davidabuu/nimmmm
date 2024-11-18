import AdminDashboard from "@/src/components/Dashboard/AdminDashboard";
import Publication from "@/src/components/Publication/Publication";

import { Metadata } from "next/types";
import React from "react";
export const metadata: Metadata = {
  title: "Admin Dashboard | NIM",
  description: "Generated by create next app",
};

const page = () => {
  return (
    <div>
    <Publication/>
    </div>
  );
};

export default page;
