import React from "react";
import { FaBell } from "react-icons/fa";
import Events from "./Events";

const NimEventsPage: React.FC = () => {
  return (
    <div className="mx-10">
      {/* Notification Icon */}
      <div className="float-right hidden md:flex mr-3 mt-4 bg-blue-900 text-white p-2 rounded-full shadow-lg hover:bg-blue-700 transition duration-300">
        <FaBell size={20} />
      </div>

      <h2 className="text-xl mt-6 px-4 py-2 border-b font-semibold mb-4">
        NIM Events
      </h2>
      <div>
        <div className=" ">
          <div className="bg-white  p-4">
            <Events />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NimEventsPage;
