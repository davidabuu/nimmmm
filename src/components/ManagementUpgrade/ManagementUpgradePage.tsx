import React from "react";
import { FaBell } from "react-icons/fa";

import Home from "./Home";


const ManagementUpgradePage: React.FC = () => {
  return (
    <div className="mx-3 lg:mx-10">
      {/* Notification Icon */}
      <div className="float-right hidden md:flex mr-3 mt-4 bg-blue-900 text-white p-2 rounded-full shadow-lg hover:bg-blue-700 transition duration-300">
        <FaBell size={20} />
      </div>

      <h2 className="text-xl mt-6 px-4 py-2 border-b font-semibold mb-4">
        Membership Upgrade
      </h2>
   <Home/>
    </div>
  );
};

export default ManagementUpgradePage;
