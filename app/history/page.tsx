import AdminHistory from "@/src/components/History/AdminHistory";

import { Metadata } from "next/types";
import React from "react";
export const metadata: Metadata = {
  title: "History | NIM",
  description: "Generated by create next app",
};

const page = () => {
  return (
    <div className="bg-[#F5F7FA]">
      <AdminHistory />
    </div>
  );
};

export default page;
