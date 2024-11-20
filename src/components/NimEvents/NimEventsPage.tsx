import React from "react";
import { FaBell } from "react-icons/fa";
import Events from "./Events";

const NimEventsPage: React.FC = () => {
  const events = [
    {
      imageUrl: "/nnpc.png",
      title: "2024 Management Day",
      date: "Tuesday, November 19, 2024",
      mode: "HYBRID",
      time: "11:00am",
      price: { amount: null, label: "Free" },
      registrationLink: "/single-events",
    },
    {
      imageUrl: "/nnpc.png",
      title: "2024 Management Day",
      date: "Tuesday, November 19, 2024",
      mode: "HYBRID",
      time: "11:00am",
      price: { amount: 30000, label: "N30,000" },
      registrationLink: "single-events",
    },
    {
      imageUrl: "/nnpc.png",
      title: "2024 Management Day",
      date: "Tuesday, November 19, 2024",
      mode: "HYBRID",
      time: "11:00am",
      price: { amount: null, label: "Free" },
      registrationLink: "/single-events",
    },
    {
      imageUrl: "/nnpc.png",
      title: "2024 Management Day",
      date: "Tuesday, November 19, 2024",
      mode: "HYBRID",
      time: "11:00am",
      price: { amount: 30000, label: "N30,000" },
      registrationLink: "/single-events",
    },
  ];
  return (
    <div className="mx-10">
      {/* Notification Icon */}
      <div className="float-right hidden md:flex mr-3 mt-4 bg-blue-900 text-white p-2 rounded-full shadow-lg hover:bg-blue-700 transition duration-300">
        <FaBell size={20} />
      </div>

      <h2 className="text-xl mt-6 px-4 py-2 border-b font-semibold mb-4">
        NIN Events
      </h2>
      <div>
        <div className=" ">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Upcoming Management Events
          </h1>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2  ">
            {events.map((event, index) => (
              <Events
                key={index}
                {...event}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NimEventsPage;
