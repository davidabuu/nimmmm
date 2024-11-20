"use client";
import React from "react";
import SideNav from "../SideNav";
import NewsArticle from "./SingleNews";

const SingleNewsDashboard = () => {
  return (
    <div className="flex flex-col md:flex-row bg-[#F5F7FA]">
      <SideNav />

      <div className="flex flex-col w-full">
        <NewsArticle />
      </div>
    </div>
  );
};

export default SingleNewsDashboard;
