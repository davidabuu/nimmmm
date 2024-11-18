import type { Metadata } from "next";
import SetPassword from "@/src/components/SetPassword";
import React from "react";
export const metadata: Metadata = {
  title: "Set Password | NIM",
  description: "Generated by create next app",
};

const page = () => {
  return (
    <div>
      <SetPassword />
    </div>
  );
};

export default page;