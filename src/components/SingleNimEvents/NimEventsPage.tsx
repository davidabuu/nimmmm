import React from "react";
import { FaArrowLeft, FaBell } from "react-icons/fa";

import EventsDetails from "./EventSingle";

const NimEventsPage: React.FC = () => {
  return (
    <div className=" mx-4 md:mx-10">
      {/* Notification Icon */}
      <div className="float-right hidden md:flex mr-3 mt-4 bg-blue-900 text-white p-2 rounded-full shadow-lg hover:bg-blue-700 transition duration-300">
        <FaBell size={20} />
      </div>

      <h2 className="text-xl mt-6 px-4 py-2 border-b font-semibold mb-4">
      <button className="flex items-center text-gray-600 hover:text-gray-800">
            <FaArrowLeft className="mr-2" />
            <span>Back</span>
          </button>
      </h2>
      <div>
        <EventsDetails />
      </div>
    </div>
  );
};

export default NimEventsPage;
