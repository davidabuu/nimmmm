import React from "react";


import Home from "./Home";
import Link from "next/link";
import { IoArrowBack } from "react-icons/io5";


const ManagementUpgradePage: React.FC = () => {
  return (
    <div className="mx-3 lg:mx-10">
      {/* Notification Icon */}
     <div className="flex items-center gap-4 border-b border-gray-200 text-white p-4 mb-6">
             <Link href="/reports">
               {" "}
               <button className="bg-primary rounded-full p-2">
                 <IoArrowBack className="w-6 h-6" />
               </button>
             </Link>
             <h1 className="text-xl text-primary font-medium">    Membership Upgrade</h1>
           </div>
    
   <Home/>
    </div>
  );
};

export default ManagementUpgradePage;
